import { afterEach, describe, expect, it, vi } from 'vitest';
import { verifyTurnstile } from './turnstile';
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
describe('Turnstile server verification', () => {
  it('requires valid success, action and hostname', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'test-secret'); vi.stubEnv('CONTACT_PUBLIC_URL', 'https://henryteran.com');
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, action: 'contact', hostname: 'henryteran.com' }) }); vi.stubGlobal('fetch', fetcher);
    expect(await verifyTurnstile('token', 'contact')).toBe(true);
    expect(await verifyTurnstile('token', 'brief')).toBe(false);
    fetcher.mockResolvedValue({ ok: true, json: async () => ({ success: false }) });
    expect(await verifyTurnstile('token', 'contact')).toBe(false);
    fetcher.mockResolvedValue({ ok: true, json: async () => ({ success: true, action: 'contact', hostname: 'attacker.example' }) });
    expect(await verifyTurnstile('token', 'contact')).toBe(false);
  });
  it('fails closed without configuration in production even with the dev flag', async () => {
    vi.stubEnv('NODE_ENV', 'production'); vi.stubEnv('CONTACT_SECURITY_DEV_MODE', 'true'); vi.stubEnv('TURNSTILE_SECRET_KEY', '');
    await expect(verifyTurnstile('development-only', 'contact')).rejects.toThrow();
  });
  it('permits only explicit local development bypass', async () => {
    vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('VERCEL', ''); vi.stubEnv('CONTACT_SECURITY_DEV_MODE', 'true');
    expect(await verifyTurnstile('development-only', 'contact')).toBe(true);
  });
});
