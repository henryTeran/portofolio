import { beginVerification } from '../security/verification';
import { validateBrief, validateContact } from './validation';
import { verifyTurnstile } from '../security/turnstile';
import { allowSubmission } from '../security/rateLimit';
import { emailDomainStatus } from '../security/email';
import { abuseScore, messageText, reserveSubmission } from '../security/abuse';

export async function handleMailRequest(request: Request, kind: 'contact' | 'brief'): Promise<Response> {
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } });
  if (!request.headers.get('content-type')?.startsWith('application/json')) return Response.json({ error: 'Invalid request' }, { status: 415 });
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      const source = new URL(origin);
      const destination = new URL(request.url);
      const localViteProxy = source.origin === 'http://localhost:5173' &&
        destination.hostname === 'localhost' && destination.port === '3000';
      if (source.host !== destination.host && !localViteProxy) throw new Error('Cross-origin request');
    } catch {
      return Response.json({ error: 'Invalid request' }, { status: 403 });
    }
  }
  const body = await request.text();
  if (body.length > 20000) return Response.json({ error: 'Invalid request' }, { status: 413 });
  let message;
  let token: unknown;
  try {
    const data: unknown = JSON.parse(body);
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid request');
    if ('website' in data && typeof data.website === 'string' && data.website.trim()) return Response.json({ ok: true, status: 'pending_verification' }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
    token = (data as Record<string, unknown>).turnstileToken;
    message = kind === 'contact' ? validateContact(data as Record<string, unknown>) : validateBrief(data as Record<string, unknown>);
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
  try {
    if (!await verifyTurnstile(token, kind)) return Response.json({ error: 'Unable to process request' }, { status: 403 });
    if (!await allowSubmission(request, kind)) return Response.json({ error: 'Please try again later' }, { status: 429 });
    if (await emailDomainStatus(message.email) === 'invalid') return Response.json({ error: 'Unable to process request' }, { status: 400 });
    if (abuseScore(messageText(message)) >= 5) return Response.json({ error: 'Unable to process request' }, { status: 400 });
    if (!await reserveSubmission(message, kind)) return Response.json({ ok: true, status: 'pending_verification' }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
    await beginVerification(message, kind);
    return Response.json({ ok: true, status: 'pending_verification' }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Unable to send message' }, { status: 503 });
  }
}

