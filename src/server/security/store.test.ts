import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemorySecurityStore, RedisSecurityStore, securityStore } from './store';
import { allowSubmission } from './rateLimit';
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.useRealTimers(); });
describe('shared rate limits and storage', () => {
  it('enforces independent rolling limits and releases after expiry', async () => {
    vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('CONTACT_SECURITY_DEV_MODE', 'true'); vi.stubEnv('VERCEL', ''); vi.useFakeTimers();
    const store = new MemorySecurityStore(); const request = new Request('http://localhost/api/contact');
    for (let i = 0; i < 5; i++) expect(await allowSubmission(request, 'contact', store)).toBe(true);
    expect(await allowSubmission(request, 'contact', store)).toBe(false);
    for (let i = 0; i < 3; i++) expect(await allowSubmission(request, 'brief', store)).toBe(true);
    expect(await allowSubmission(request, 'brief', store)).toBe(false);
    vi.advanceTimersByTime(900001); expect(await allowSubmission(request, 'contact', store)).toBe(true);
    expect(await allowSubmission(request, 'brief', store)).toBe(false);
  });
  it('uses atomic Redis scripts and does not fall back when unavailable', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: 1 }) }); vi.stubGlobal('fetch', fetcher);
    const store = new RedisSecurityStore('https://redis.example.com', 'test'); expect(await store.limit('rate:test', 5, 900)).toBe(true);
    expect(JSON.parse(fetcher.mock.calls[0][1].body)[0]).toBe('EVAL');
    fetcher.mockResolvedValue({ ok: false }); await expect(store.limit('rate:test', 5, 900)).rejects.toThrow();
    vi.stubEnv('NODE_ENV', 'production'); vi.stubEnv('CONTACT_SECURITY_DEV_MODE', 'true'); vi.stubEnv('UPSTASH_REDIS_REST_URL', '');
    expect(() => securityStore()).toThrow();
  });
});
