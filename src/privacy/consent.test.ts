import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CONSENT_KEY, getConsent, hasAnalyticsConsent, parseConsent, saveConsent, subscribeConsent } from './consent';
describe('consent storage', () => {
  beforeEach(() => { localStorage.clear(); window.dispatchEvent(new StorageEvent('storage', { key: CONSENT_KEY })); });
  it('defaults to no decision and no analytics', () => { expect(getConsent()).toBeNull(); expect(hasAnalyticsConsent()).toBe(false); });
  it('persists acceptance and rejection, notifying subscribers', () => {
    const listener = vi.fn(); const unsubscribe = subscribeConsent(listener);
    saveConsent(true); expect(hasAnalyticsConsent()).toBe(true);
    expect(parseConsent(localStorage.getItem(CONSENT_KEY))?.analytics).toBe(true);
    saveConsent(false); expect(hasAnalyticsConsent()).toBe(false);
    expect(listener).toHaveBeenCalledTimes(2); unsubscribe();
  });
  it('rejects malformed and outdated choices', () => {
    expect(parseConsent('{')).toBeNull(); expect(parseConsent('{"analytics":true}')).toBeNull();
  });
  it('applies revocation from another tab', () => {
    saveConsent(true); localStorage.clear(); window.dispatchEvent(new StorageEvent('storage', { key: null }));
    expect(hasAnalyticsConsent()).toBe(false);
  });
});
