import ReactGA from 'react-ga4';
import { hasAnalyticsConsent, subscribeConsent } from '../privacy/consent';

export const MEASUREMENT_ID = 'G-PW4BGPSXK3';
let initialized = false;
export const canTrack = () => initialized && hasAnalyticsConsent() && !location.pathname.endsWith('/verify');

function clearAnalyticsCookies() {
  const names = document.cookie.split(';').map(cookie => cookie.trim().split('=')[0]).filter(name => /^_ga(?:_|$)/.test(name));
  const parts = location.hostname.split('.');
  const domains = ['', ...parts.map((_, index) => parts.slice(index).join('.'))];
  for (const name of names) for (const domain of domains) {
    document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''}`;
  }
}

export function initAnalytics() {
  if (!hasAnalyticsConsent() || location.pathname.endsWith('/verify')) return;
  window[`ga-disable-${MEASUREMENT_ID}`] = false;
  if (initialized) return;
  ReactGA.initialize(MEASUREMENT_ID, { gtagOptions: {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: location.origin + location.pathname,
    page_referrer: document.referrer ? new URL(document.referrer).origin : '',
  } });
  initialized = true;
}

export function syncAnalyticsConsent() {
  if (typeof window === 'undefined') return;
  const allowed = hasAnalyticsConsent();
  window[`ga-disable-${MEASUREMENT_ID}`] = !allowed;
  if (allowed) initAnalytics();
  else clearAnalyticsCookies();
}
// Synchronous revocation also protects events fired before React re-renders.
subscribeConsent(syncAnalyticsConsent);

export const trackPage = (path) => {
  if (!canTrack() || /\/verify(?:[?#]|$)/.test(path)) return;
  ReactGA.send({ hitType: 'pageview', page: path, location: location.origin + location.pathname });
};
