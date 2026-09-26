import { beforeEach, describe, expect, it, vi } from 'vitest';
import ReactGA from 'react-ga4';
import { CONSENT_KEY, saveConsent } from './consent';
import { initAnalytics, syncAnalyticsConsent, trackPage } from '../analytics/analytics';
import { trackCTA, trackContactSubmit, trackProjectClick, trackScrollDepth } from '../analytics/trackingEvents';
vi.mock('react-ga4', () => ({ default: { initialize: vi.fn(), send: vi.fn(), event: vi.fn() } }));

describe('analytics consent gate', () => {
  beforeEach(() => { localStorage.clear(); window.dispatchEvent(new StorageEvent('storage', { key: CONSENT_KEY })); vi.clearAllMocks(); });
  it('does not initialize, queue or send anything before consent', () => {
    initAnalytics(); syncAnalyticsConsent(); trackPage('/fr'); trackCTA('hero'); trackContactSubmit('contact_section');
    expect(ReactGA.initialize).not.toHaveBeenCalled(); expect(ReactGA.send).not.toHaveBeenCalled(); expect(ReactGA.event).not.toHaveBeenCalled();
  });
  it('initializes on acceptance, preserves events and stops synchronously on withdrawal', () => {
    saveConsent(true);
    expect(ReactGA.initialize).toHaveBeenCalledOnce();
    trackPage('/fr'); trackCTA('hero'); trackProjectClick('ZIGOMA'); trackScrollDepth(25); trackContactSubmit('contact_section');
    expect(ReactGA.send).toHaveBeenCalledOnce(); expect(ReactGA.event).toHaveBeenCalledTimes(4);
    document.cookie = '_ga=test; path=/';
    saveConsent(false); trackPage('/en'); trackCTA('hero');
    expect(ReactGA.send).toHaveBeenCalledOnce(); expect(ReactGA.event).toHaveBeenCalledTimes(4);
    expect(document.cookie).not.toContain('_ga=');
    expect(Reflect.get(window, 'ga-disable-G-PW4BGPSXK3')).toBe(true);
    saveConsent(true); trackCTA('hero');
    expect(ReactGA.event).toHaveBeenCalledTimes(5);
    expect(ReactGA.initialize).toHaveBeenCalledOnce();
  });
});
