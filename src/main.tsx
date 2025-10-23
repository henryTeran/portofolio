import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/theme.css';
import './index.css';
import { initEmailJS } from './services/emailService';

// Initialiser EmailJS
initEmailJS();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
