import { afterEach, describe, expect, it, vi } from 'vitest';
import { abuseScore, reserveSubmission } from './abuse';
import { MemorySecurityStore } from './store';
afterEach(() => { vi.unstubAllEnvs(); vi.useRealTimers(); });
describe('abuse and duplicate protection', () => {
  it('allows professional criticism and rejects repeated attacks', () => {
    expect(abuseScore('Notre ancien logiciel est vraiment horrible. Nous souhaitons le remplacer.')).toBeLessThan(5);
    expect(abuseScore('The old tool displays the word asshole in a test fixture; can you help fix it?')).toBeLessThan(5);
    for (const message of ['connard connard connard', 'fuck fuck fuck', 'idiota idiota idiota']) expect(abuseScore(message)).toBeGreaterThanOrEqual(5);
    expect(abuseScore('https://spam.example '.repeat(8))).toBeGreaterThanOrEqual(5);
  });
  it('atomically suppresses duplicates despite new submission timestamps and expires the reservation', async () => {
    vi.stubEnv('CONTACT_SECURITY_HASH_SECRET', 'x'.repeat(32)); vi.useFakeTimers(); const store = new MemorySecurityStore();
    const message = { name: 'Visitor', email: 'test@example.com', message: 'A professional project request', language: 'en' as const, submittedAt: 'first' };
    const results = await Promise.all([reserveSubmission(message, 'contact', store), reserveSubmission({ ...message, submittedAt: 'second' }, 'contact', store)]);
    expect(results.sort()).toEqual([false, true]);
    vi.advanceTimersByTime(900001); expect(await reserveSubmission(message, 'contact', store)).toBe(true);
  });
});
