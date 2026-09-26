import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, expect, it } from 'vitest';
import AppRouter from '../router/AppRouter';
import { policies } from './policy';
import '../i18n';

describe('privacy routes', () => {
  it.each(['fr', 'en', 'es'] as const)('renders %s with localized SEO', async language => {
    render(<HelmetProvider><MemoryRouter initialEntries={[`/${language}/privacy`]}><AppRouter /></MemoryRouter></HelmetProvider>);
    expect(await screen.findByRole('heading', { level: 1, name: policies[language].title })).toBeInTheDocument();
    await waitFor(() => expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', `https://henryteran.com/${language}/privacy`));
    expect(document.querySelector('link[hreflang="en"]')).toHaveAttribute('href', 'https://henryteran.com/en/privacy');
  });
});
