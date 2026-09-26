import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ConsentManager from './ConsentManager';
import { CONSENT_KEY, getConsent, openCookiePreferences } from './consent';

describe('consent controls', () => {
  beforeEach(() => {
    localStorage.clear(); window.dispatchEvent(new StorageEvent('storage', { key: CONSENT_KEY }));
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) { this.setAttribute('open', ''); });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) { this.removeAttribute('open'); });
  });
  it('rejects, persists and reopens preferences without checking analytics', async () => {
    const user = userEvent.setup();
    const view = render(<MemoryRouter initialEntries={['/en']}><ConsentManager /></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: 'Reject' }));
    expect(getConsent()?.analytics).toBe(false);
    expect(screen.queryByText('Your privacy')).not.toBeInTheDocument();
    view.unmount(); render(<MemoryRouter initialEntries={['/en']}><ConsentManager /></MemoryRouter>);
    expect(screen.queryByText('Your privacy')).not.toBeInTheDocument();
    act(() => { openCookiePreferences(); });
    expect(screen.getByRole('checkbox', { name: 'Analytics' })).not.toBeChecked();
    await user.click(screen.getByRole('checkbox', { name: 'Analytics' }));
    await user.click(screen.getByRole('button', { name: 'Save my preferences' }));
    expect(getConsent()?.analytics).toBe(true);
    act(() => { openCookiePreferences(); });
    expect(screen.getByRole('checkbox')).toBeChecked();
    await user.click(screen.getByRole('button', { name: 'Reject all' }));
    expect(getConsent()?.analytics).toBe(false);
  });
  it('accepts directly from the banner', async () => {
    render(<MemoryRouter initialEntries={['/fr']}><ConsentManager /></MemoryRouter>);
    await userEvent.click(screen.getByRole('button', { name: 'Accepter' }));
    expect(getConsent()?.analytics).toBe(true);
  });
});
