import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import ProjectRoutePage from '../../pages/ProjectRoutePage';
import { adjacentProjects, featuredProjects } from '../../data/projects';
import { getCaseStudy } from '../../content/case-studies';
import '../../i18n';

describe('case study routing', () => {
  it.each(featuredProjects)('renders the master followed by curated real screenshots for $title', (project) => {
    render(<HelmetProvider><MemoryRouter initialEntries={[`/en/projects/${project.slug}`]}><Routes><Route path="/:lang/projects/:slug" element={<ProjectRoutePage />} /></Routes></MemoryRouter></HelmetProvider>);
    const images = within(screen.getByRole('main')).getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', project.masterVisual!.src);
    expect(images[0]).toHaveAttribute('loading', 'eager');
    expect(images).toHaveLength(2);
    expect(screen.getByRole('heading', { name: /Inside the product/ })).toBeInTheDocument();
    for (const image of images.slice(1)) expect(image).toHaveAttribute('loading', 'lazy');
    expect(project.productSlides!.length).toBeLessThanOrEqual(project.slug === 'zigoma' ? 6 : 4);
  });
  it.each(['zigoma', 'applyflow', 'jobtrace-ai', 'wellsync'])('resolves %s in all three languages', (slug) => {
    for (const language of ['fr', 'en', 'es'] as const) {
      expect(getCaseStudy(language, slug)?.context).toBeTruthy();
      expect(getCaseStudy(language, slug)?.solution).toBeTruthy();
    }
  });
  it('does not resolve an unknown project', () => {
    expect(getCaseStudy('fr', 'unknown')).toBeUndefined();
  });
  it('renders a localized known project and its neighboring projects', () => {
    render(<HelmetProvider><MemoryRouter initialEntries={['/fr/projects/zigoma']}><Routes><Route path="/:lang/projects/:slug" element={<ProjectRoutePage />} /></Routes></MemoryRouter></HelmetProvider>);
    expect(screen.getByRole('heading', { level: 1, name: 'ZIGOMA' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Projet suivant ApplyFlow/i })).toHaveAttribute('href', '/fr/projects/applyflow');
    expect(adjacentProjects('zigoma').previous?.slug).toBe('wellsync');
  });
  it('offers a route back for an unknown slug', () => {
    render(<HelmetProvider><MemoryRouter initialEntries={['/en/projects/unknown']}><Routes><Route path="/:lang/projects/:slug" element={<ProjectRoutePage />} /></Routes></MemoryRouter></HelmetProvider>);
    expect(screen.getByRole('heading', { level: 1, name: 'Project not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to selected work' })).toHaveAttribute('href', '/en#work');
  });
  it('sets project-specific canonical, alternate languages and OpenGraph metadata', async () => {
    render(<HelmetProvider><MemoryRouter initialEntries={['/es/projects/jobtrace-ai']}><Routes><Route path="/:lang/projects/:slug" element={<ProjectRoutePage />} /></Routes></MemoryRouter></HelmetProvider>);
    await waitFor(() => expect(document.title).toContain('JobTrace AI'));
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://henryteran.com/es/projects/jobtrace-ai');
    expect(document.querySelector('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute('href', 'https://henryteran.com/fr/projects/jobtrace-ai');
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute('content', 'https://henryteran.com/es/projects/jobtrace-ai');
  });
});
