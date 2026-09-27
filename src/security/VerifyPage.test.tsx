import { StrictMode } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AppRouter from '../router/AppRouter';
import { verificationCopy } from './verificationCopy';
import '../i18n';
Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value() { this.setAttribute('open', ''); } });
Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value() { this.removeAttribute('open'); } });

afterEach(() => { vi.unstubAllGlobals(); window.history.replaceState({}, '', '/'); });
describe('verification page', () => {
  it('handles a second email link opened in the same tab', async () => {
    window.history.replaceState({}, '', '/en/verify#token=' + 'a'.repeat(43));
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: 'verified' }) });
    vi.stubGlobal('fetch', fetcher);
    render(<HelmetProvider><MemoryRouter initialEntries={['/en/verify']}><AppRouter /></MemoryRouter></HelmetProvider>);
    await screen.findByText(verificationCopy.en.verified);
    act(() => {
      window.history.replaceState({}, '', '/en/verify#token=' + 'b'.repeat(43));
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
    expect(JSON.parse(fetcher.mock.calls[1][1].body)).toEqual({ token: 'b'.repeat(43) });
    expect(window.location.hash).toBe('');
  });
  it('keeps the successful result when changing language without sending again', async () => {
    const token = 'c'.repeat(43); window.history.replaceState({}, '', `/fr/verify#token=${token}`);
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: 'verified' }) }); vi.stubGlobal('fetch', fetcher);
    render(<HelmetProvider><MemoryRouter initialEntries={['/fr/verify']}><AppRouter /></MemoryRouter></HelmetProvider>);
    await screen.findByRole('heading', { name: verificationCopy.fr.title });
    await screen.findByText(verificationCopy.fr.verified);
    await userEvent.click(screen.getByRole('button', { name: verificationCopy.fr.close }));
    await userEvent.click(screen.getByRole('button', { name: 'EN' }));
    expect(await screen.findByText(verificationCopy.en.verified)).toBeInTheDocument();
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual({ token });
  });
  it.each(['fr', 'en', 'es'] as const)('automatically confirms once in %s and shows a success dialog without exposing the token', async language => {
    const token = 'a'.repeat(43); window.history.replaceState({}, '', `/${language}/verify#token=${token}`);
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: 'verified' }) }); vi.stubGlobal('fetch', fetcher);
    render(<StrictMode><HelmetProvider><MemoryRouter initialEntries={[`/${language}/verify`]}><AppRouter /></MemoryRouter></HelmetProvider></StrictMode>);
    expect(await screen.findByRole('heading', { name: verificationCopy[language].title })).toBeInTheDocument();
    expect(window.location.hash).toBe('');
    expect(await screen.findByText(verificationCopy[language].verified)).toBeInTheDocument();
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual({ token });
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'verification-success-title');
    await waitFor(() => expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow'));
  });
  it.each(['expired', 'invalid', 'already_verified', 'error'] as const)('renders the %s response without raw errors', async status => {
    window.history.replaceState({}, '', '/en/verify#token=' + 'b'.repeat(43));
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status }) }));
    render(<HelmetProvider><MemoryRouter initialEntries={['/en/verify']}><AppRouter /></MemoryRouter></HelmetProvider>);
    expect(await screen.findByText(verificationCopy.en[status])).toBeInTheDocument();
  });
});
