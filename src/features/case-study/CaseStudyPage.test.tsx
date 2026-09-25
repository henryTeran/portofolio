import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import ProjectRoutePage from '../../pages/ProjectRoutePage';
import { adjacentProjects } from '../../data/projects';
import '../../i18n';

describe('case study routing', () => {
  it('renders a localized known project and its neighboring projects', () => {
    render(<HelmetProvider><MemoryRouter initialEntries={['/fr/projects/zigoma']}><Routes><Route path="/:lang/projects/:slug" element={<ProjectRoutePage />} /></Routes></MemoryRouter></HelmetProvider>);
    expect(screen.getByRole('heading', { level: 1, name: 'ZIGOMA' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Projet suivant ApplyFlow/i })).toHaveAttribute('href', '/fr/projects/applyflow');
    expect(adjacentProjects('zigoma').previous?.slug).toBe('wellsync');
  });
  it('offers a route back for an unknown slug', () => {
    render(<HelmetProvider><MemoryRouter initialEntries={['/en/projects/unknown']}><Routes><Route path="/:lang/projects/:slug" element={<ProjectRoutePage />} /></Routes></MemoryRouter></HelmetProvider>);
    expect(screen.getByRole('heading', { level: 1, name: 'Project not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to selected work' })).toHaveAttribute('href', '/en#projects');
  });
  it('sets project-specific canonical, alternate languages and OpenGraph metadata', async () => {
    render(<HelmetProvider><MemoryRouter initialEntries={['/es/projects/jobtrace-ai']}><Routes><Route path="/:lang/projects/:slug" element={<ProjectRoutePage />} /></Routes></MemoryRouter></HelmetProvider>);
    await waitFor(() => expect(document.title).toContain('JobTrace AI'));
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://henryteran.com/es/projects/jobtrace-ai');
    expect(document.querySelector('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute('href', 'https://henryteran.com/fr/projects/jobtrace-ai');
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute('content', 'https://henryteran.com/es/projects/jobtrace-ai');
  });
});
