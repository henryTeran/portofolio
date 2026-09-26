import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { beginVerification, completeVerification, tokenHash, VERIFICATION_TTL } from './verification';
import { MemorySecurityStore } from './store';
import type { MailService } from '../mail/types';
import { verificationEmail } from '../mail/templates/verification-email';

const message = { name: 'Visitor', email: 'visitor@example.com', message: 'A private project request', language: 'en' as const, submittedAt: new Date().toISOString() };
const makeMailer = (): MailService => ({ sendVerificationEmail: vi.fn().mockResolvedValue(undefined), sendContactMessage: vi.fn().mockResolvedValue(undefined), sendProjectBrief: vi.fn().mockResolvedValue(undefined) });
const sentToken = (mailer: MailService) => new URL(vi.mocked(mailer.sendVerificationEmail).mock.calls[0][2]).hash.slice('#token='.length);
beforeEach(() => { vi.stubEnv('CONTACT_PUBLIC_URL', 'https://henryteran.com'); vi.stubEnv('CONTACT_SECURITY_HASH_SECRET', 'x'.repeat(32)); });
afterEach(() => { vi.unstubAllEnvs(); vi.useRealTimers(); });
describe('verification delivery', () => {
  it('only emails the visitor initially, stores a hash, then notifies Henry once even concurrently', async () => {
    const store = new MemorySecurityStore(); const mailer = makeMailer();
    await beginVerification(message, 'contact', store, mailer);
    expect(mailer.sendContactMessage).not.toHaveBeenCalled(); expect(mailer.sendProjectBrief).not.toHaveBeenCalled();
    const token = sentToken(mailer); expect(token).toMatch(/^[A-Za-z0-9_-]{43}$/);
    const pending = await store.get(`pending:${tokenHash(token)}`); expect(pending).not.toContain(token);
    const states = await Promise.all([completeVerification(token, store, () => mailer), completeVerification(token, store, () => mailer)]);
    expect(states).toContain('verified'); expect(mailer.sendContactMessage).toHaveBeenCalledOnce(); expect(mailer.sendContactMessage).toHaveBeenCalledWith(message);
    expect(await completeVerification(token, store, () => mailer)).toBe('already_verified');
    expect(await store.get(`pending:${tokenHash(token)}`)).toBeNull();
  });
  it('expires payloads and never notifies Henry for invalid or expired tokens', async () => {
    vi.useFakeTimers(); const store = new MemorySecurityStore(); const mailer = makeMailer();
    await beginVerification(message, 'contact', store, mailer); const token = sentToken(mailer);
    vi.advanceTimersByTime(VERIFICATION_TTL * 1000 + 1);
    expect(await completeVerification(token, store, () => mailer)).toBe('expired');
    expect(await completeVerification('bad', store, () => mailer)).toBe('invalid');
    expect(await completeVerification('x'.repeat(43), store, () => mailer)).toBe('invalid');
    expect(mailer.sendContactMessage).not.toHaveBeenCalled();
    expect(await store.get(`pending:${tokenHash(token)}`)).toBeNull();
  });
  it('confirms a project brief and does not retry an ambiguous SMTP failure', async () => {
    const store = new MemorySecurityStore(); const mailer = makeMailer();
    const brief = { name: 'Visitor', email: 'visitor@example.com', language: 'fr' as const, submittedAt: '', projectType: 'Web', projectDescription: 'A business application project', features: [], technologies: [] };
    await beginVerification(brief, 'brief', store, mailer); const token = sentToken(mailer);
    expect(await completeVerification(token, store, () => mailer)).toBe('verified'); expect(mailer.sendProjectBrief).toHaveBeenCalledOnce(); expect(mailer.sendProjectBrief).toHaveBeenCalledWith(brief);
    const failed = makeMailer(); vi.mocked(failed.sendContactMessage).mockRejectedValue(new Error('private SMTP details'));
    await beginVerification(message, 'contact', store, failed); const failedToken = sentToken(failed);
    expect(await completeVerification(failedToken, store, () => failed)).toBe('error');
    expect(await completeVerification(failedToken, store, () => failed)).toBe('error'); expect(failed.sendContactMessage).toHaveBeenCalledOnce();
  });
  it('does not include the original message in the verification email', () => {
    for (const language of ['fr', 'en', 'es'] as const) {
      const content = verificationEmail(language, 'https://henryteran.com/en/verify#token=test');
      expect(content.html).toContain('20'); expect(content.html).not.toContain(message.message);
      expect(content.html).toContain('href="https://henryteran.com/en/verify#token=test"');
    }
  });
});

