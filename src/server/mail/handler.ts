import { createMailService } from './mailer';
import { validateBrief, validateContact } from './validation';

export async function handleMailRequest(request: Request, kind: 'contact' | 'brief'): Promise<Response> {
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } });
  if (!request.headers.get('content-type')?.startsWith('application/json')) return Response.json({ error: 'Invalid request' }, { status: 415 });
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) throw new Error('Cross-origin request');
    } catch {
      return Response.json({ error: 'Invalid request' }, { status: 403 });
    }
  }
  const body = await request.text();
  if (body.length > 20000) return Response.json({ error: 'Invalid request' }, { status: 413 });
  let message;
  try {
    const data: unknown = JSON.parse(body);
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid request');
    message = kind === 'contact' ? validateContact(data as Record<string, unknown>) : validateBrief(data as Record<string, unknown>);
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
  try {
    const mailer = createMailService();
    if (kind === 'contact') await mailer.sendContactMessage(message as ReturnType<typeof validateContact>);
    else await mailer.sendProjectBrief(message as ReturnType<typeof validateBrief>);
    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ error: 'Unable to send message' }, { status: 503 });
  }
}
