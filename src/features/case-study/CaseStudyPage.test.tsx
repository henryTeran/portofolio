import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProjectRoutePage from '../../pages/ProjectRoutePage';
import { adjacentProjects } from '../../data/projects';
import '../../i18n';

describe('case study routing', () => {
  it('renders a localized known project and its neighboring projects', () => {
    render(<MemoryRouter initialEntries={['/fr/projects/zigoma']}><Routes><Route path="/:lang/projects/:slug" element={<ProjectRoutePage />} /></Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1, name: 'ZIGOMA' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Projet suivant ApplyFlow/i })).toHaveAttribute('href', '/fr/projects/applyflow');
    expect(adjacentProjects('zigoma').previous?.slug).toBe('wellsync');
  });
  it('offers a route back for an unknown slug', () => {
    render(<MemoryRouter initialEntries={['/en/projects/unknown']}><Routes><Route path="/:lang/projects/:slug" element={<ProjectRoutePage />} /></Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1, name: 'Project not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to selected work' })).toHaveAttribute('href', '/en#projects');
  });
});
