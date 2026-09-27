import { describe, expect, it } from 'vitest';
import { emailDomainStatus, normalizeEmail } from './email';
describe('email validation', () => {
  it('normalizes the domain and preserves the mailbox', () => {
    expect(normalizeEmail(' Name+project@EXAMPLE.COM ')).toBe('Name+project@example.com');
    expect(normalizeEmail('contact@école.fr')).toBe('contact@xn--cole-9oa.fr');
  });
  it.each(['x@localhost', 'a..b@example.com', '.a@example.com', 'a@-bad.com', 'a@@example.com', 'a\r\nBcc:x@example.com', `${'x'.repeat(65)}@example.com`])('rejects %s', email => expect(() => normalizeEmail(email)).toThrow());
  it('checks MX records without mistaking temporary DNS failure for an invalid mailbox', async () => {
    expect(await emailDomainStatus('a@example.com', async () => [{ exchange: 'mx.example.com', priority: 10 }])).toBe('valid');
    expect(await emailDomainStatus('a@example.com', async () => [])).toBe('invalid');
    expect(await emailDomainStatus('a@example.com', async () => [{ exchange: '.', priority: 0 }])).toBe('invalid');
    expect(await emailDomainStatus('a@example.com', async () => { throw { code: 'ENOTFOUND' }; })).toBe('invalid');
    expect(await emailDomainStatus('a@example.com', async () => { throw { code: 'ETIMEOUT' }; })).toBe('unavailable');
  });
});
