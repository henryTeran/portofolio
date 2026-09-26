import { afterEach, describe, expect, it, vi } from 'vitest';
const read = vi.hoisted(() => vi.fn());
vi.mock('node:fs', async original => {
  const fs = await original<typeof import('node:fs')>();
  return { ...fs, readFileSync: read, default: { ...fs, readFileSync: read } };
});
afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); read.mockReset(); });
describe('local API environment', () => {
  it('loads local overrides without changing runtime guards', async () => {
    vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('VERCEL', '1'); vi.stubEnv('VERCEL_ENV', 'development');
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'base'); vi.stubEnv('CONTACT_PUBLIC_URL', '');
    read.mockReturnValue('TURNSTILE_SECRET_KEY=local-test\nCONTACT_PUBLIC_URL="http://localhost:5173"\nNODE_ENV=production\nVERCEL_ENV=preview');
    await import('./localEnv');
    expect(process.env.TURNSTILE_SECRET_KEY).toBe('local-test');
    expect(process.env.CONTACT_PUBLIC_URL).toBe('http://localhost:5173');
    expect(process.env.NODE_ENV).toBe('development'); expect(process.env.VERCEL_ENV).toBe('development');
  });
  it.each(['preview', 'production'])('never reads local files on %s', async stage => {
    vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('VERCEL', '1'); vi.stubEnv('VERCEL_ENV', stage);
    await import('./localEnv'); expect(read).not.toHaveBeenCalled();
  });
  it('never reads local files in a production runtime', async () => {
    vi.stubEnv('NODE_ENV', 'production'); vi.stubEnv('VERCEL', '');
    await import('./localEnv'); expect(read).not.toHaveBeenCalled();
  });
  it('allows a missing optional local file', async () => {
    vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('VERCEL', '');
    read.mockImplementation(() => { throw Object.assign(new Error(), { code: 'ENOENT' }); });
    await expect(import('./localEnv')).resolves.toBeDefined();
  });
});
