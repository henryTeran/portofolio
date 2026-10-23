import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import AnalyticsTracker from './analytics/AnalyticsTracker';
import i18n, { ensureLanguageResources } from './i18n';
import { getPreferredLanguage } from './constants/i18n';
import './styles/theme.css';
import './styles/identity.css';
import './index.css';

const renderApp = () => createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AnalyticsTracker />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// Load the page language before the first render so the prerendered HTML is
// replaced by identical content (no flash of English text on /fr or /es).
const initialLanguage = getPreferredLanguage(window.location.pathname.split('/')[1]);
ensureLanguageResources(initialLanguage)
  .then(() => i18n.changeLanguage(initialLanguage))
  .catch(() => undefined)
  .finally(renderApp);
