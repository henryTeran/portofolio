import { completeVerification } from './verification';
import { clientAddress, privateFingerprint } from './rateLimit';
import { securityStore } from './store';

export async function handleVerification(request: Request): Promise<Response> {
  const headers = { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' };
  const reply = (status: string, code = 200) => Response.json({ status }, { status: code, headers });
  if (request.method !== 'POST') return Response.json({ status: 'invalid' }, { status: 405, headers: { ...headers, Allow: 'POST' } });
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply('invalid', 415);
  const origin = request.headers.get('origin');
  if (origin) {
    const localProxy = origin === 'http://localhost:5173' && new URL(request.url).origin === 'http://localhost:3000';
    if (origin !== new URL(request.url).origin && !localProxy) return reply('invalid', 403);
  }
  let token: unknown;
  try {
    const body = await request.text(); if (body.length > 1024) return reply('invalid', 413);
    const data = JSON.parse(body);
    if (!data || typeof data !== 'object' || Object.keys(data).some(key => key !== 'token')) return reply('invalid', 400);
    token = data.token;
  } catch { return reply('invalid', 400); }
  try {
    const store = securityStore();
    if (!await store.limit(`verify-rate:${privateFingerprint(clientAddress(request))}`, 20, 900)) return reply('error', 429);
    return reply(await completeVerification(token, store));
  } catch { return reply('error', 503); }
}
