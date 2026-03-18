/**
 * trackingEvents.js
 * Centralized GA4 event tracking helpers.
 * All functions are no-ops if analytics is not initialized (safe in SSR / test environments).
 */
import ReactGA from 'react-ga4';
import { trackPage } from './analytics';

// ─── Re-export for convenience ────────────────────────────────────────────────
export { trackPage };

// ─── Internal helper ──────────────────────────────────────────────────────────
const send = (eventName, params = {}) => {
  try {
    ReactGA.event(eventName, params);
  } catch {
    // Silently fail — never crash the app because of analytics
  }
};

// ─── CTA Clicks ───────────────────────────────────────────────────────────────
/**
 * @param {'hero_work_together' | 'hero_view_projects' | 'header_contact' | string} location
 */
export const trackCTA = (location) => {
  send('cta_click', { cta_location: location });
};

// ─── Language Change ──────────────────────────────────────────────────────────
/**
 * @param {'fr' | 'en' | 'es'} language
 */
export const trackLanguageChange = (language) => {
  send('language_change', { language });
};

// ─── Project Clicks ───────────────────────────────────────────────────────────
/**
 * @param {string} projectName
 */
export const trackProjectClick = (projectName) => {
  send('project_click', { project_name: projectName });
};

// ─── Contact Form ─────────────────────────────────────────────────────────────
/**
 * @param {'contact_section' | 'quote_modal' | string} source
 */
export const trackContactSubmit = (source) => {
  send('contact_form_submit', { source });
};

// ─── Scroll Depth ─────────────────────────────────────────────────────────────
/**
 * @param {25 | 50 | 75 | 90} percent
 */
export const trackScrollDepth = (percent) => {
  send('scroll_depth', { percent });
};
