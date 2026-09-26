import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import CaseStudyNavigation from './CaseStudyNavigation';
import { adjacentProjects, featuredProjects } from '../../data/projects';
import { caseStudyLabels } from '../../content/case-studies/labels';
import { getProjectCopy } from '../../content/projects';

describe('editorial project navigation', () => {
  it('keeps one circular project order', () => {
    expect(featuredProjects.map(p => p.slug)).toEqual(['zigoma', 'applyflow', 'jobtrace-ai', 'wellsync']);
    expect(adjacentProjects('wellsync').next?.slug).toBe('zigoma');
    expect(adjacentProjects('zigoma').previous?.slug).toBe('wellsync');
  });
  it.each(['fr', 'en', 'es'] as const)('describes both destinations in %s', language => {
    render(<MemoryRouter><CaseStudyNavigation language={language} slug="zigoma" /></MemoryRouter>);
    const labels = caseStudyLabels[language];
    expect(screen.getByRole('link', { name: new RegExp(`${labels.previous} WellSync`) })).toHaveAttribute('href', `/${language}/projects/wellsync`);
    expect(screen.getByRole('link', { name: new RegExp(`${labels.next} ApplyFlow`) })).toHaveAttribute('href', `/${language}/projects/applyflow`);
    expect(screen.getByText(getProjectCopy(language, 'applyflow')!.tagline)).toBeInTheDocument();
  });
});
