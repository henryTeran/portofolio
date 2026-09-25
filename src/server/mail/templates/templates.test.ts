import { describe, expect, it } from 'vitest';
import { contactEmail } from './contact-email';

describe('contact email template', () => {
  it('escapes visitor content and includes a text alternative', () => {
    const email = contactEmail({ name: '<Henry>', email: 'visitor@example.com', message: '<script>alert(1)</script>', language: 'fr', submittedAt: '2026-09-25' });
    expect(email.html).toContain('&lt;script&gt;');
    expect(email.html).not.toContain('<script>');
    expect(email.text).toContain('visitor@example.com');
  });
});
