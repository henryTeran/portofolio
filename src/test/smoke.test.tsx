import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, expect, it, vi } from 'vitest';
import i18n from '../i18n';
import LanguageLayout from '../layouts/LanguageLayout';
import Contact from '../components/Contact';
vi.mock('../security/Turnstile', async () => {
  const { useEffect } = await import('react');
  return { default: function MockTurnstile({ onToken }: { onToken: (token: string) => void }) { useEffect(() => { onToken('test-token'); }, [onToken]); return null; } };
});

vi.mock('../services/emailService', () => ({
  sendContactEmail: vi.fn().mockResolvedValue(true),
  validateContactForm: vi.fn(() => ({ isValid: true, errors: [] })),
  sendQuoteEmail: vi.fn().mockResolvedValue(true),
  validateQuoteForm: vi.fn(() => ({ isValid: true, errors: [] })),
}));

describe('Smoke tests', () => {
  it('renders language route /fr', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/fr']}>
          <Routes>
            <Route path="/:lang" element={<LanguageLayout />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.documentElement.lang).toBe('fr');
    });
    for (const id of ['projects', 'expertise', 'approach', 'contact']) {
      expect(document.getElementById(id)).toBeInTheDocument();
      expect(document.querySelector(`footer a[href="/fr#${id}"]`)).toBeInTheDocument();
    }
  });

  it('opens quote wizard modal from contact section', async () => {
    const user = userEvent.setup();
    await i18n.changeLanguage('en');

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/en']}>
          <Contact />
        </MemoryRouter>
      </HelmetProvider>
    );

    await user.click(
      screen.getByRole('button', { name: /describe my project|describir mi proyecto|décrire mon projet/i })
    );

    expect(
      screen.getByText(/custom quote request|solicitud de presupuesto personalizado|demande de devis personnalisé/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('submits contact form successfully', async () => {
    const user = userEvent.setup();
    await i18n.changeLanguage('en');

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/en']}>
          <Contact />
        </MemoryRouter>
      </HelmetProvider>
    );

    const nameInput = document.querySelector<HTMLInputElement>('input#name');
    const emailInput = document.querySelector<HTMLInputElement>('input#email');
    const messageInput = document.querySelector<HTMLTextAreaElement>('textarea#message');

    expect(nameInput).not.toBeNull();
    expect(emailInput).not.toBeNull();
    expect(messageInput).not.toBeNull();

    await user.type(nameInput!, 'Henry Teran');
    await user.type(emailInput!, 'henry@example.com');
    await user.type(messageInput!, 'Hello, I would like to discuss a project with you.');

    await user.click(screen.getByRole('button', { name: /send message|enviar mensaje|envoyer le message/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/check your inbox|confirmer votre demande|confirmar tu solicitud/i)
      ).toBeInTheDocument();
    });
  });
});

