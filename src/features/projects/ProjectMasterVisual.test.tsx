import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { featuredProjects } from '../../data/projects';
import ProjectMasterVisual from './ProjectMasterVisual';
import SelectedWork from './SelectedWork';

describe('master project visuals', () => {
  it.each(['fr', 'en', 'es'] as const)('renders localized composites only on the homepage in %s', (language) => {
    render(<MemoryRouter initialEntries={[`/${language}`]}><Routes><Route path="/:lang" element={<SelectedWork />} /></Routes></MemoryRouter>);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(4);
    images.forEach((img, i) => {
      expect(img).toHaveAttribute('src', featuredProjects[i].masterVisual!.src);
      expect(img).toHaveAttribute('alt', featuredProjects[i].masterVisual!.alt[language]);
      expect(img).toHaveAttribute('loading', 'lazy');
      expect(img).toHaveAttribute('width', '1448');
    });
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  });
  it('supports eager case study loading and preserves development status', () => {
    render(<ProjectMasterVisual project={featuredProjects[2]} language="en" eager />);
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'eager');
    expect(screen.getByText('In active development')).toBeInTheDocument();
  });
});
