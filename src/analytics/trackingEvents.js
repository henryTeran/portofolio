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
export const trackEventSafely = (eventName, params = {}) => {
  console.debug('[GA4] Sending custom event', { eventName, params });

  try {
    ReactGA.event(eventName, params);
    console.debug('[GA4] Custom event sent', { eventName, params });
  } catch (error) {
    console.debug('[GA4] Custom event failed', {
      eventName,
      params,
      error,
    });
  }
};

// ─── CTA Clicks ───────────────────────────────────────────────────────────────
/**
 * @param {'hero_work_together' | 'hero_view_projects' | 'header_contact' | string} location
 */
export const trackCTA = (location) => {
  trackEventSafely('cta_click', { cta_location: location });
};

// ─── Language Change ──────────────────────────────────────────────────────────
/**
 * @param {'fr' | 'en' | 'es'} language
 */
export const trackLanguageChange = (language) => {
  trackEventSafely('language_change', { language });
};

// ─── Project Clicks ───────────────────────────────────────────────────────────
/**
 * @param {string} projectName
 */
export const trackProjectClick = (projectName) => {
  trackEventSafely('project_click', { project_name: projectName });
};

// ─── Contact Form ─────────────────────────────────────────────────────────────
/**
 * @param {'contact_section' | 'quote_modal' | string} source
 */
export const trackContactSubmit = (source) => {
  trackEventSafely('contact_form_submit', { source });
};

// ─── Scroll Depth ─────────────────────────────────────────────────────────────
/**
 * @param {25 | 50 | 75 | 90} percent
 */
export const trackScrollDepth = (percent) => {
  trackEventSafely('scroll_depth', { percent });
};
