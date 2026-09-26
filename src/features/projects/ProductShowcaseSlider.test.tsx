import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { featuredProjects } from '../../data/projects';
import ProductShowcaseSlider from './ProductShowcaseSlider';

afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });
describe('product showcase', () => {
  it.each(['fr', 'en', 'es'] as const)('navigates, wraps and describes the active slide in %s', (language) => {
    vi.useFakeTimers();
    const project = featuredProjects[0];
    const slides = project.productSlides!;
    const { container } = render(<ProductShowcaseSlider project={project} language={language} />);
    const next = container.querySelectorAll('.showcase-controls button')[1];
    fireEvent.click(next);
    act(() => vi.advanceTimersByTime(150));
    expect(screen.getAllByRole('img')).toHaveLength(1);
    expect(screen.getByRole('img')).toHaveAttribute('src', slides[1].src);
    expect(screen.getByRole('img')).toHaveAttribute('alt', slides[1].alt[language]);
    expect(screen.getByText(slides[1].caption[language])).toBeInTheDocument();
    const region = screen.getByRole('region');
    fireEvent.keyDown(region, { key: 'End' }); act(() => vi.advanceTimersByTime(150));
    expect(screen.getByRole('img')).toHaveAttribute('src', slides[slides.length - 1].src);
    fireEvent.keyDown(region, { key: 'ArrowRight' }); act(() => vi.advanceTimersByTime(150));
    expect(screen.getByRole('img')).toHaveAttribute('src', slides[0].src);
    fireEvent.click(container.querySelectorAll('.showcase-controls button')[0]); act(() => vi.advanceTimersByTime(150));
    expect(screen.getByRole('img')).toHaveAttribute('src', slides[slides.length - 1].src);
  });
  it('switches instantly with reduced motion and handles failed images', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList);
    render(<ProductShowcaseSlider project={featuredProjects[1]} language="en" />);
    fireEvent.click(screen.getByRole('button', { name: 'Next screenshot' }));
    expect(screen.getByRole('img')).toHaveAttribute('src', featuredProjects[1].productSlides![1].src);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('This screenshot is unavailable.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next screenshot' }));
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  it('handles missing slides without broken controls', () => {
    render(<ProductShowcaseSlider project={{ ...featuredProjects[0], productSlides: [] }} language="en" />);
    expect(screen.getByText('Screenshots coming soon.')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

