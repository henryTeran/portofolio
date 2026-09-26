import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import FormDisclosure from './FormDisclosure';
import { consentCopy } from './consentCopy';
describe('form disclosures', () => {
  it.each(['fr', 'en', 'es'] as const)('links both disclosures to the %s privacy page', language => {
    render(<MemoryRouter initialEntries={[`/${language}`]}><Routes><Route path="/:lang" element={<><FormDisclosure kind="contact" /><FormDisclosure kind="brief" /></>} /></Routes></MemoryRouter>);
    expect(screen.getByText(consentCopy[language].contact, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(consentCopy[language].brief, { exact: false })).toBeInTheDocument();
    for (const link of screen.getAllByRole('link')) { expect(link).toHaveAttribute('href', `/${language}/privacy`); expect(link).toHaveAttribute('target', '_blank'); }
  });
});
