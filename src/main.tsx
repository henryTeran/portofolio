import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './i18n';
import { preloadCriticalTranslations } from './i18n';
import './styles/theme.css';
import './index.css';
import { initEmailJS } from './services/emailService';

// Initialiser EmailJS
initEmailJS();
void preloadCriticalTranslations();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
