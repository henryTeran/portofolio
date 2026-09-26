import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AppRouter from '../router/AppRouter';
import { verificationCopy } from './verificationCopy';
import '../i18n';
afterEach(() => { vi.unstubAllGlobals(); window.history.replaceState({}, '', '/'); });
describe('verification page', () => {
  it('preserves the token in memory when changing language before confirmation', async () => {
    const token = 'c'.repeat(43); window.history.replaceState({}, '', `/fr/verify#token=${token}`);
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: 'verified' }) }); vi.stubGlobal('fetch', fetcher);
    render(<HelmetProvider><MemoryRouter initialEntries={['/fr/verify']}><AppRouter /></MemoryRouter></HelmetProvider>);
    await screen.findByRole('heading', { name: verificationCopy.fr.title });
    await userEvent.click(screen.getByRole('button', { name: 'EN' }));
    await userEvent.click(await screen.findByRole('button', { name: verificationCopy.en.action }));
    expect(await screen.findByText(verificationCopy.en.verified)).toBeInTheDocument();
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual({ token });
  });
  it.each(['fr', 'en', 'es'] as const)('requires explicit confirmation in %s and removes the token from the URL', async language => {
    const token = 'a'.repeat(43); window.history.replaceState({}, '', `/${language}/verify#token=${token}`);
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: 'verified' }) }); vi.stubGlobal('fetch', fetcher);
    render(<HelmetProvider><MemoryRouter initialEntries={[`/${language}/verify`]}><AppRouter /></MemoryRouter></HelmetProvider>);
    expect(await screen.findByRole('heading', { name: verificationCopy[language].title })).toBeInTheDocument();
    expect(window.location.hash).toBe(''); expect(fetcher).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: verificationCopy[language].action }));
    expect(await screen.findByText(verificationCopy[language].verified)).toBeInTheDocument();
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual({ token });
    await waitFor(() => expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow'));
  });
  it.each(['expired', 'invalid', 'already_verified', 'error'] as const)('renders the %s response without raw errors', async status => {
    window.history.replaceState({}, '', '/en/verify#token=' + 'b'.repeat(43));
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status }) }));
    render(<HelmetProvider><MemoryRouter initialEntries={['/en/verify']}><AppRouter /></MemoryRouter></HelmetProvider>);
    await userEvent.click(await screen.findByRole('button', { name: verificationCopy.en.action }));
    expect(await screen.findByText(verificationCopy.en[status])).toBeInTheDocument();
  });
});
