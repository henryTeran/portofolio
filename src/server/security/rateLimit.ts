import { createHmac } from 'node:crypto';
import { isIP } from 'node:net';
import { localDevelopment, localSecurityMode } from './config';
import { securityStore, type SecurityStore } from './store';
export function privateFingerprint(value: string): string {
  const secret = process.env.CONTACT_SECURITY_HASH_SECRET || (localSecurityMode() ? 'explicit-local-development-secret' : '');
  if (secret.length < 32) throw new Error('Security configuration unavailable');
  return createHmac('sha256', secret).update(value).digest('hex');
}
export function clientAddress(request: Request): string {
  if (localDevelopment() && ['localhost', '127.0.0.1', '[::1]'].includes(new URL(request.url).hostname)) return '127.0.0.1';
  // Vercel overwrites this header; arbitrary proxy headers are not trusted.
  const ip = process.env.VERCEL ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim() : undefined;
  if (!ip || !isIP(ip)) throw new Error('Client address unavailable');
  return ip;
}
export async function allowSubmission(request: Request, kind: 'contact' | 'brief', store: SecurityStore = securityStore()) {
  const key = privateFingerprint(clientAddress(request));
  return store.limit(`rate:${kind}:${key}`, kind === 'contact' ? 5 : 3, kind === 'contact' ? 900 : 1800);
}
