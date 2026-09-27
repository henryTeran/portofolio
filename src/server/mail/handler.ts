import { PublicFormError } from '../../forms/apiErrors.js';
import { beginVerification } from '../security/verification.js';
import { validateBrief, validateContact } from './validation.js';
import { verifyTurnstile } from '../security/turnstile.js';
import { allowSubmission } from '../security/rateLimit.js';
import { emailDomainStatus } from '../security/email.js';
import { abuseScore, messageText, reserveSubmission } from '../security/abuse.js';

export async function handleMailRequest(request: Request, kind: 'contact' | 'brief'): Promise<Response> {
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } });
  if (!request.headers.get('content-type')?.startsWith('application/json')) return Response.json({ code: 'invalid_input' }, { status: 415 });
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      const source = new URL(origin);
      const destination = new URL(request.url);
      const localViteProxy = source.origin === 'http://localhost:5173' &&
        destination.hostname === 'localhost' && destination.port === '3000';
      if (source.host !== destination.host && !localViteProxy) throw new Error('Cross-origin request');
    } catch {
      return Response.json({ code: 'invalid_input' }, { status: 403 });
    }
  }
  const body = await request.text();
  if (body.length > 20000) return Response.json({ code: 'invalid_input' }, { status: 413 });
  let message;
  let token: unknown;
  try {
    const data: unknown = JSON.parse(body);
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid request');
    if ('website' in data && typeof data.website === 'string' && data.website.trim()) return Response.json({ ok: true, status: 'pending_verification' }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
    token = (data as Record<string, unknown>).turnstileToken;
    message = kind === 'contact' ? validateContact(data as Record<string, unknown>) : validateBrief(data as Record<string, unknown>);
  } catch (error) {
    return Response.json({ code: error instanceof PublicFormError ? error.code : 'invalid_input' }, { status: 400 });
  }
  let checkingSecurity = true;
  let stage = 'turnstile';
  try {
    if (!await verifyTurnstile(token, kind)) {
      console.info(`[mail-security] ${kind}:turnstile_rejected`);
      return Response.json({ code: 'turnstile_failed' }, { status: 403 });
    }
    console.info(`[mail-security] ${kind}:turnstile_ok`);
    checkingSecurity = false;
    stage = 'rate_limit';
    if (!await allowSubmission(request, kind)) return Response.json({ code: 'rate_limited' }, { status: 429 });
    console.info(`[mail-security] ${kind}:rate_limit_ok`);
    stage = 'email_domain';
    if (await emailDomainStatus(message.email) === 'invalid') return Response.json({ code: 'invalid_domain' }, { status: 400 });
    if (abuseScore(messageText(message)) >= 5) return Response.json({ code: 'abusive_content' }, { status: 400 });
    stage = 'duplicate_check';
    if (!await reserveSubmission(message, kind)) return Response.json({ code: 'duplicate_request' }, { status: 409, headers: { 'Cache-Control': 'no-store' } });
    stage = 'begin_verification';
    const tracking = await beginVerification(message, kind);
    return Response.json({ ok: true, status: 'pending_verification', ...tracking }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.warn(`[mail-security] ${kind}:${stage}_unavailable`);
    return Response.json({ code: checkingSecurity ? 'turnstile_unavailable' : error instanceof PublicFormError ? error.code : 'server_error' }, { status: 503 });
  }
}

