import { PublicFormError } from '../../forms/apiErrors.js';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import type { ContactMessage, MailService, ProjectBriefMessage } from '../mail/types.js';
import { createMailService } from '../mail/mailer.js';
import { publicOrigin } from './config.js';
import { privateFingerprint } from './rateLimit.js';
import { duplicateKey } from './abuse.js';
import { securityStore, type SecurityStore } from './store.js';

export const VERIFICATION_TTL = 20 * 60;
const STATUS_TTL = 24 * 60 * 60;
export type VerificationResult = 'verified' | 'expired' | 'invalid' | 'already_verified' | 'verifying' | 'error';
type Pending = { id: string; email: string; tokenHash: string; createdAt: string; expiresAt: number } &
  ({ type: 'contact'; payload: ContactMessage } | { type: 'brief'; payload: ProjectBriefMessage });
type Marker = { status: 'pending' | 'processing' | 'verified' | 'error'; expiresAt: number };
export const tokenHash = (token: string) => createHash('sha256').update(token).digest('hex');

export async function beginVerification(message: ContactMessage | ProjectBriefMessage, kind: 'contact' | 'brief', store: SecurityStore = securityStore(), mailer: MailService = createMailService()): Promise<void> {
  // Limits mailbox harassment even if submissions come from different IPs.
  if (!await store.limit(`recipient:${privateFingerprint(message.email.toLowerCase())}`, 3, 3600)) return;
  const origin = publicOrigin();
  const token = randomBytes(32).toString('base64url');
  const hash = tokenHash(token);
  const expiresAt = Date.now() + VERIFICATION_TTL * 1000;
  const pending = { id: randomUUID(), email: message.email, type: kind, payload: message, tokenHash: hash, createdAt: new Date().toISOString(), expiresAt };
  let sendingEmail = false;
  try {
    await store.set(`pending:${hash}`, JSON.stringify(pending), VERIFICATION_TTL);
    await store.set(`verification:${hash}`, JSON.stringify({ status: 'pending', expiresAt } satisfies Marker), STATUS_TTL);
    // Fragment keeps the token out of server URL logs and HTTP referrers.
    sendingEmail = true;
    await mailer.sendVerificationEmail(message.email, message.language, `${origin}/${message.language}/verify#token=${token}`);
  } catch {
    await Promise.allSettled([store.delete(`pending:${hash}`), store.delete(`verification:${hash}`), store.delete(duplicateKey(message, kind))]);
    throw new PublicFormError(sendingEmail ? 'smtp_error' : 'server_error');
  }
}

export async function completeVerification(token: unknown, store: SecurityStore = securityStore(), mailerFactory: () => MailService = createMailService): Promise<VerificationResult> {
  if (typeof token !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(token)) return 'invalid';
  const hash = tokenHash(token); const key = `verification:${hash}`;
  const rawMarker = await store.get(key);
  if (!rawMarker) return 'invalid';
  const marker = JSON.parse(rawMarker) as Marker;
  if (marker.status === 'verified') return 'already_verified';
  if (marker.status === 'error') return 'error';
  if (marker.expiresAt <= Date.now()) return 'expired';
  if (marker.status === 'processing') return 'verifying';
  // Atomic GET+DELETE: only one function instance can own the payload.
  const raw = await store.take(`pending:${hash}`);
  if (!raw) return 'verifying';
  const pending = JSON.parse(raw) as Pending;
  if (pending.expiresAt <= Date.now()) return 'expired';
  await store.set(key, JSON.stringify({ ...marker, status: 'processing' }), STATUS_TTL);
  try {
    const mailer = mailerFactory();
    if (pending.type === 'contact') await mailer.sendContactMessage(pending.payload);
    else await mailer.sendProjectBrief(pending.payload);
    await store.set(key, JSON.stringify({ ...marker, status: 'verified' }), STATUS_TTL);
    return 'verified';
  } catch {
    // Never retry ambiguous SMTP delivery automatically: that could notify Henry twice.
    await store.set(key, JSON.stringify({ ...marker, status: 'error' }), STATUS_TTL);
    console.warn('[mail-security] final_delivery_failed');
    return 'error';
  }
}
