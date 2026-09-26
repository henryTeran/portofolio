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
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
describe('protected contact pipeline', () => {
  it.each(['contact', 'brief'] as const)('verifies the %s flow with Preview origin, trusted IP and Siteverify metadata', async kind => {
    const origin = 'https://portofolio-git-portfolio-v2-henryterans-projects.vercel.app';
    vi.stubEnv('NODE_ENV', 'production'); vi.stubEnv('VERCEL', '1'); vi.stubEnv('VERCEL_ENV', 'preview');
    vi.stubEnv('CONTACT_PUBLIC_URL', origin); vi.stubEnv('CONTACT_SECURITY_DEV_MODE', 'true');
    vi.stubEnv('CONTACT_SECURITY_HASH_SECRET', 'x'.repeat(32)); vi.stubEnv('TURNSTILE_SECRET_KEY', 'private-test-fixture');
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, action: kind, hostname: new URL(origin).hostname }) });
    vi.stubGlobal('fetch', fetcher);
    const logs = vi.spyOn(console, 'info').mockImplementation(() => {});
    const request = (path: string, body: unknown) => new Request(origin + path, {
      method: 'POST', headers: { 'content-type': 'application/json', origin, 'x-vercel-forwarded-for': '203.0.113.10' }, body: JSON.stringify(body),
    });
    const payload = kind === 'contact' ? { ...contact, turnstileToken: 'private-token-fixture' } : {
      name: 'Visitor', email: contact.email, language: 'es', turnstileToken: 'private-token-fixture', projectType: 'Web',
      projectDescription: 'A detailed business application request with a customer dashboard', features: [], technologies: [], timeline: '3 months', budget: '10k',
    };
    const response = await handleMailRequest(request(kind === 'contact' ? '/api/contact' : '/api/project-brief', payload), kind);
    expect(response.status).toBe(200); expect(fetcher).toHaveBeenCalledOnce();
    expect(mocks.visitor.mock.calls[0][0]).toBe(contact.email);
    const link = new URL(mocks.visitor.mock.calls[0][2]); expect(link.origin).toBe(origin);
    const token = link.hash.slice(7);
    expect(await (await handleVerification(request('/api/verify-contact', { token }))).json()).toEqual({ status: 'verified' });
    expect(await (await handleVerification(request('/api/verify-contact', { token }))).json()).toEqual({ status: 'already_verified' });
    expect(kind === 'contact' ? mocks.contact : mocks.brief).toHaveBeenCalledOnce();
    const output = JSON.stringify(logs.mock.calls);
    for (const privateValue of [contact.email, contact.message, token, 'private-token-fixture', 'private-test-fixture']) expect(output).not.toContain(privateValue);
    expect(output).toContain(`${kind}:verification_mail_sent`); expect(output).toContain(`${kind}:final_mail_sent`);
  });
  it('sends only verification first, ignores duplicates, and notifies Henry after confirmation once', async () => {
    const response = await handleMailRequest(post(contact), 'contact'); expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, status: 'pending_verification' });
    expect(mocks.visitor).toHaveBeenCalledOnce(); expect(mocks.contact).not.toHaveBeenCalled();
    expect((await handleMailRequest(post(contact), 'contact')).status).toBe(409); expect(mocks.visitor).toHaveBeenCalledOnce();
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
    expect((await handleMailRequest(post({ ...contact, message: 'connard connard connard about this project' }), 'contact')).status).toBe(400);
    expect(mocks.visitor).not.toHaveBeenCalled();
    for (let i = 0; i < 4; i++) await handleMailRequest(post(contact), 'contact');
    expect((await handleMailRequest(post(contact), 'contact')).status).toBe(429);
    expect(mocks.contact).not.toHaveBeenCalled(); expect(mocks.visitor).toHaveBeenCalledOnce();
  });
  it('protects Project Brief identically', async () => {
    const brief = { name: 'Visitor', email: 'visitor@example.com', language: 'es', turnstileToken: 'development-only', projectType: 'Web', projectDescription: 'A detailed business application request with a customer dashboard', features: [], technologies: [], timeline: '3 months', budget: '10k' };
    expect((await handleMailRequest(post(brief, '/api/project-brief'), 'brief')).status).toBe(200);
    expect(mocks.brief).not.toHaveBeenCalled();
    const token = new URL(mocks.visitor.mock.calls[0][2]).hash.slice(7);
    expect(await (await handleVerification(post({ token }, '/api/verify-contact'))).json()).toEqual({ status: 'verified' });
    expect(mocks.brief).toHaveBeenCalledOnce(); expect(mocks.contact).not.toHaveBeenCalled();
  });
});
