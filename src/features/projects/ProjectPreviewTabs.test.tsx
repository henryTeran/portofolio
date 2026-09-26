import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { featuredProjects } from '../../data/projects';
import ProjectPreviewTabs from './ProjectPreviewTabs';

describe('real project previews', () => {
  it.each(featuredProjects)('switches only the active image for $title', (project) => {
    render(<ProjectPreviewTabs project={project} language="fr" />);
    const visuals = project.visuals!.filter((visual) => visual.featured);
    expect(screen.getAllByRole('img')).toHaveLength(1);
    expect(screen.getByRole('img')).toHaveAttribute('src', visuals[0].src);
    fireEvent.click(screen.getAllByRole('tab')[1]);
    expect(screen.getByRole('img')).toHaveAttribute('src', visuals[1].src);
    expect(screen.getByRole('img')).toHaveAttribute('alt', visuals[1].alt.fr);
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy');
    expect(screen.getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });
  it('supports arrow wrapping, Home and End with roving focus', () => {
    render(<ProjectPreviewTabs project={featuredProjects[0]} language="en" />);
    const tabs = screen.getAllByRole('tab');
    fireEvent.keyDown(tabs[0], { key: 'ArrowLeft' });
    expect(tabs[3]).toHaveFocus();
    fireEvent.keyDown(tabs[3], { key: 'ArrowRight' });
    expect(tabs[0]).toHaveFocus();
    fireEvent.keyDown(tabs[0], { key: 'End' });
    expect(tabs[3]).toHaveFocus();
    fireEvent.keyDown(tabs[3], { key: 'Home' });
    expect(tabs[0]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', tabs[0].id);
  });
  it('marks JobTrace as in development in Spanish', () => {
    render(<ProjectPreviewTabs project={featuredProjects[2]} language="es" eager />);
    expect(screen.getByText('En desarrollo activo')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'eager');
  });
});
