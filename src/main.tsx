import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import AnalyticsTracker from './analytics/AnalyticsTracker';
import './i18n';
import './styles/theme.css';
import './index.css';
import { initEmailJS } from './services/emailService';

initEmailJS();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AnalyticsTracker />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
