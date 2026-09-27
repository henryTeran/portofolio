export interface ConsentPreferences {
  version: 1;
  necessary: true;
  analytics: boolean;
  updatedAt: string;
}
export const CONSENT_KEY = 'portfolio-consent-v1';
const listeners = new Set<() => void>();
export function parseConsent(raw: string | null): ConsentPreferences | null {
  try {
    const value = raw ? JSON.parse(raw) : null;
    return value?.version === 1 && value.necessary === true && typeof value.analytics === 'boolean' &&
      typeof value.updatedAt === 'string' && Number.isFinite(Date.parse(value.updatedAt)) ? value : null;
  } catch { return null; }
}
function readStoredConsent() {
  try { return parseConsent(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
}
let current = readStoredConsent();
export const getConsent = () => current;
export const hasAnalyticsConsent = () => current?.analytics === true;
export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
export function saveConsent(analytics: boolean) {
  current = { version: 1, necessary: true, analytics, updatedAt: new Date().toISOString() };
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(current)); } catch { /* Choice remains effective in this tab. */ }
  listeners.forEach(listener => listener());
}
if (typeof window !== 'undefined') {
  window.addEventListener('storage', event => {
    if (event.key !== CONSENT_KEY && event.key !== null) return;
    current = readStoredConsent();
    listeners.forEach(listener => listener());
  });
}
export const openCookiePreferences = () => window.dispatchEvent(new Event('portfolio:cookie-preferences'));
