import { describe, expect, it, vi } from 'vitest';
import { handleMailRequest } from './handler';

vi.mock('./mailer', () => ({ createMailService: () => ({ sendContactMessage: vi.fn().mockResolvedValue(undefined), sendProjectBrief: vi.fn().mockResolvedValue(undefined) }) }));
vi.mock('../security/turnstile', () => ({ verifyTurnstile: vi.fn().mockResolvedValue(true) }));
vi.mock('../security/rateLimit', () => ({ allowSubmission: vi.fn().mockResolvedValue(true) }));

const request = (data: unknown, origin = 'https://henryteran.com') => new Request('https://henryteran.com/api/contact', {
  method: 'POST', headers: { 'content-type': 'application/json', origin }, body: JSON.stringify(data),
});

describe('public mail endpoint', () => {
  it('returns a neutral success for a filled honeypot in both forms', async () => {
    for (const kind of ['contact', 'brief'] as const) {
      const result = await handleMailRequest(request({ website: 'bot.example' }), kind);
      expect(result.status).toBe(200); expect(await result.json()).toEqual({ ok: true });
    }
  });
  it('accepts a valid contact message', async () => {
    const response = await handleMailRequest(request({ name: 'Visitor', email: 'visitor@example.com', message: 'A useful message', language: 'en' }), 'contact');
    expect(response.status).toBe(200);
  });
  it('rejects unexpected fields and oversized payloads', async () => {
    expect((await handleMailRequest(request({ name: 'Visitor', email: 'visitor@example.com', message: 'A useful message', language: 'en', admin: true }), 'contact')).status).toBe(400);
    expect((await handleMailRequest(request({ name: 'Visitor', email: 'visitor@example.com', message: 'x'.repeat(21000), language: 'en' }), 'contact')).status).toBe(413);
  });
  it('rejects cross origin requests', async () => {
    expect((await handleMailRequest(request({}, 'https://example.org'), 'contact')).status).toBe(403);
  });
  it('allows the configured local Vite proxy origin', async () => {
    const localRequest = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'http://localhost:5173' },
      body: JSON.stringify({ name: 'Visitor', email: 'visitor@example.com', message: 'A useful message', language: 'en' }),
    });
    expect((await handleMailRequest(localRequest, 'contact')).status).toBe(200);
  });
  it('accepts a complete project brief and rejects an incomplete one', async () => {
    const brief = {
      name: 'Visitor', email: 'visitor@example.com', language: 'fr',
      projectType: 'Application métier', projectDescription: 'A detailed business application request',
      features: ['CRM'], technologies: ['React'], timeline: '3 mois', budget: '10–20k',
    };
    expect((await handleMailRequest(request(brief), 'brief')).status).toBe(200);
    expect((await handleMailRequest(request({ ...brief, projectDescription: 'short' }), 'brief')).status).toBe(400);
  });
});
