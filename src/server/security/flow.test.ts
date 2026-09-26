import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { handleMailRequest } from '../mail/handler';
import { handleVerification } from './verifyHandler';
import { MemorySecurityStore } from './store';
const mocks = vi.hoisted(() => ({ visitor: vi.fn(), contact: vi.fn(), brief: vi.fn(), store: undefined as unknown }));
vi.mock('../mail/mailer', () => ({ createMailService: () => ({ sendVerificationEmail: mocks.visitor, sendContactMessage: mocks.contact, sendProjectBrief: mocks.brief }) }));
vi.mock('./store', async importOriginal => ({ ...await importOriginal<typeof import('./store')>(), securityStore: () => mocks.store }));
vi.mock('./email', async importOriginal => ({ ...await importOriginal<typeof import('./email')>(), emailDomainStatus: vi.fn().mockResolvedValue('valid') }));
const post = (data: unknown, path = '/api/contact') => new Request('http://localhost:3000' + path, { method: 'POST', headers: { 'content-type': 'application/json', origin: 'http://localhost:5173' }, body: JSON.stringify(data) });
const contact = { name: 'Visitor', email: 'visitor@example.com', message: 'A complete professional project request', language: 'en', website: '', turnstileToken: 'development-only' };
beforeEach(() => {
  vi.clearAllMocks(); mocks.store = new MemorySecurityStore();
  mocks.visitor.mockResolvedValue(undefined); mocks.contact.mockResolvedValue(undefined); mocks.brief.mockResolvedValue(undefined);
  vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('VERCEL', ''); vi.stubEnv('CONTACT_SECURITY_DEV_MODE', 'true'); vi.stubEnv('CONTACT_PUBLIC_URL', 'http://localhost:5173');
});
afterEach(() => { vi.unstubAllEnvs(); });
describe('protected contact pipeline', () => {
  it('sends only verification first, ignores duplicates, and notifies Henry after confirmation once', async () => {
    const response = await handleMailRequest(post(contact), 'contact'); expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, status: 'pending_verification' });
    expect(mocks.visitor).toHaveBeenCalledOnce(); expect(mocks.contact).not.toHaveBeenCalled();
    expect((await handleMailRequest(post(contact), 'contact')).status).toBe(200); expect(mocks.visitor).toHaveBeenCalledOnce();
    const token = new URL(mocks.visitor.mock.calls[0][2]).hash.slice(7);
    expect((await handleVerification(new Request('http://localhost:3000/api/verify-contact?token=' + token))).status).toBe(405);
    expect(mocks.contact).not.toHaveBeenCalled();
    expect(await (await handleVerification(post({ token }, '/api/verify-contact'))).json()).toEqual({ status: 'verified' });
    expect(mocks.contact).toHaveBeenCalledOnce();
    expect(await (await handleVerification(post({ token }, '/api/verify-contact'))).json()).toEqual({ status: 'already_verified' });
    expect(mocks.contact).toHaveBeenCalledOnce();
  });
  it('never sends for bots, invalid security tokens, abuse, or exceeded rate limits', async () => {
    expect((await handleMailRequest(post({ ...contact, website: 'filled' }), 'contact')).status).toBe(200);
    expect(mocks.visitor).not.toHaveBeenCalled();
    vi.stubEnv('TURNSTILE_SECRET_KEY', '');
    expect((await handleMailRequest(post({ ...contact, turnstileToken: '' }), 'contact')).status).toBe(503);
    expect((await handleMailRequest(post({ ...contact, message: 'connard connard connard' }), 'contact')).status).toBe(400);
    expect(mocks.visitor).not.toHaveBeenCalled();
    for (let i = 0; i < 4; i++) await handleMailRequest(post(contact), 'contact');
    expect((await handleMailRequest(post(contact), 'contact')).status).toBe(429);
    expect(mocks.contact).not.toHaveBeenCalled(); expect(mocks.visitor).toHaveBeenCalledOnce();
  });
  it('protects Project Brief identically', async () => {
    const brief = { name: 'Visitor', email: 'visitor@example.com', language: 'es', turnstileToken: 'development-only', projectType: 'Web', projectDescription: 'A detailed business application request', features: [], technologies: [], timeline: '3 months', budget: '10k' };
    expect((await handleMailRequest(post(brief, '/api/project-brief'), 'brief')).status).toBe(200);
    expect(mocks.brief).not.toHaveBeenCalled();
    const token = new URL(mocks.visitor.mock.calls[0][2]).hash.slice(7);
    expect(await (await handleVerification(post({ token }, '/api/verify-contact'))).json()).toEqual({ status: 'verified' });
    expect(mocks.brief).toHaveBeenCalledOnce(); expect(mocks.contact).not.toHaveBeenCalled();
  });
});
