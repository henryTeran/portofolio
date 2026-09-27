import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemorySecurityStore, RedisSecurityStore, securityStore } from './store';
import { allowSubmission, clientAddress } from './rateLimit';
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.useRealTimers(); });
describe('shared rate limits and storage', () => {
  it('identifies Vercel Dev loopback requests without enabling the security bypass', async () => {
    vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('CONTACT_SECURITY_DEV_MODE', ''); vi.stubEnv('VERCEL', '');
    vi.stubEnv('CONTACT_SECURITY_HASH_SECRET', 'test-secret-at-least-32-characters-long');
    const request = new Request('http://localhost:3000/api/contact', { headers: { 'x-forwarded-for': '203.0.113.1' } });
    expect(clientAddress(request)).toBe('127.0.0.1');
    const store = new MemorySecurityStore();
    for (let i = 0; i < 5; i++) expect(await allowSubmission(request, 'contact', store)).toBe(true);
    expect(await allowSubmission(request, 'contact', store)).toBe(false);
    expect(() => clientAddress(new Request('https://example.com/api/contact'))).toThrow();
  });
  it.each(['preview', 'production'])('requires trusted Vercel address on %s deployments', stage => {
    vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('VERCEL', '1'); vi.stubEnv('VERCEL_ENV', stage);
    expect(() => clientAddress(new Request('http://localhost:3000/api/contact'))).toThrow();
    expect(clientAddress(new Request('https://example.com/api/contact', { headers: { 'x-vercel-forwarded-for': '203.0.113.2' } }))).toBe('203.0.113.2');
  });
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
