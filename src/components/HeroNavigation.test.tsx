import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Hero from './Hero';
import Header from './Header';
import { heroCopy } from '../content/hero';
import { navigationCopy } from '../content/navigation';
import '../i18n';

describe('hero and header navigation', () => {
  it.each(['fr', 'en', 'es'] as const)('provides two localized primary destinations in %s', (lang) => {
    render(<MemoryRouter initialEntries={[`/${lang}`]}><Routes><Route path="/:lang" element={<Hero />} /></Routes></MemoryRouter>);
    expect(screen.getByRole('link', { name: heroCopy[lang].work })).toHaveAttribute('href', `/${lang}#work`);
    expect(screen.getByRole('link', { name: heroCopy[lang].contact })).toHaveAttribute('href', `/${lang}#contact`);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heroCopy[lang].lineOne);
  });
  it('closes the mobile menu with Escape and restores trigger focus', () => {
    render(<MemoryRouter initialEntries={['/fr']}><Routes><Route path="/:lang" element={<Header />} /></Routes></MemoryRouter>);
    const trigger = screen.getByRole('button', { name: navigationCopy.fr.menu });
    fireEvent.click(trigger);
    const menu = document.getElementById('mobile-navigation')!;
    const link = within(menu).getByRole('link', { name: 'Projets' });
    expect(link).toHaveAttribute('href', '/fr#work');
    link.focus(); fireEvent.keyDown(window, { key: 'Escape' });
    expect(document.getElementById('mobile-navigation')).toBeNull();
    expect(trigger).toHaveFocus();
  });
});
