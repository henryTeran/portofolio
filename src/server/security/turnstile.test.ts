import { afterEach, describe, expect, it, vi } from 'vitest';
import { verifyTurnstile } from './turnstile';
import { publicOrigin } from './config';
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
describe('Turnstile server verification', () => {
  it('accepts successful official dummy tokens for both local forms without bypassing Siteverify', async () => {
    vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('VERCEL', '1'); vi.stubEnv('VERCEL_ENV', 'development');
    vi.stubEnv('CONTACT_SECURITY_DEV_MODE', ''); vi.stubEnv('CONTACT_PUBLIC_URL', 'http://localhost:5173');
    vi.stubEnv('TURNSTILE_SECRET_KEY', '1x0000000000000000000000000000000AA');
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, hostname: 'example.com' }) }); vi.stubGlobal('fetch', fetcher);
    for (const action of ['contact', 'brief'] as const) expect(await verifyTurnstile('XXXX.DUMMY.TOKEN.XXXX', action)).toBe(true);
    expect(fetcher).toHaveBeenCalledTimes(2);
    fetcher.mockResolvedValue({ ok: true, json: async () => ({ success: false }) });
    expect(await verifyTurnstile('XXXX.DUMMY.TOKEN.XXXX', 'contact')).toBe(false);
    expect(await verifyTurnstile('real-token', 'contact')).toBe(false);
  });
  it.each(['production', 'preview'])('rejects official test keys on a %s deployment', async deployment => {
    vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('VERCEL', '1'); vi.stubEnv('VERCEL_ENV', deployment);
    vi.stubEnv('CONTACT_PUBLIC_URL', 'https://henryteran.com'); vi.stubEnv('TURNSTILE_SECRET_KEY', '1x0000000000000000000000000000000AA');
    const fetcher = vi.fn(); vi.stubGlobal('fetch', fetcher);
    expect(await verifyTurnstile('XXXX.DUMMY.TOKEN.XXXX', 'contact')).toBe(false);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('allows local HTTP without enabling the security bypass, but rejects it in production', () => {
    vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('VERCEL', ''); vi.stubEnv('CONTACT_SECURITY_DEV_MODE', '');
    vi.stubEnv('CONTACT_PUBLIC_URL', 'http://localhost:5173'); expect(publicOrigin()).toBe('http://localhost:5173');
    vi.stubEnv('CONTACT_PUBLIC_URL', 'http://example.com'); expect(() => publicOrigin()).toThrow();
    vi.stubEnv('NODE_ENV', 'production'); vi.stubEnv('CONTACT_PUBLIC_URL', 'http://localhost:5173'); expect(() => publicOrigin()).toThrow();
  });
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
    vi.stubEnv('VERCEL', '1'); vi.stubEnv('VERCEL_ENV', 'development');
    expect(await verifyTurnstile('development-only', 'contact')).toBe(true);
    vi.stubEnv('VERCEL_ENV', 'preview'); vi.stubEnv('TURNSTILE_SECRET_KEY', '');
    await expect(verifyTurnstile('development-only', 'contact')).rejects.toThrow();
  });
});
