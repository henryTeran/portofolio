import { describe, expect, it, vi } from 'vitest';
import { handleMailRequest } from './handler';

vi.mock('./mailer', () => ({ createMailService: () => ({ sendContactMessage: vi.fn().mockResolvedValue(undefined), sendProjectBrief: vi.fn().mockResolvedValue(undefined) }) }));

const request = (data: unknown, origin = 'https://henryteran.com') => new Request('https://henryteran.com/api/contact', {
  method: 'POST', headers: { 'content-type': 'application/json', origin }, body: JSON.stringify(data),
});

describe('public mail endpoint', () => {
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
});
