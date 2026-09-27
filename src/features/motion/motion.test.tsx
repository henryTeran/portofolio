import { render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Hero from '../../components/Hero';
import SectionTransition from './SectionTransition';
import { useSectionMotion } from './useSectionMotion';
function Fixture() { const ref = useSectionMotion(); return <div ref={ref}><SectionTransition /><p data-motion-item>Visible content</p></div>; }
const originalObserver = globalThis.IntersectionObserver;
afterEach(() => { globalThis.IntersectionObserver = originalObserver; vi.unstubAllGlobals(); vi.restoreAllMocks(); });
it('keeps content available and never observes decorations with reduced motion', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  const observer = vi.fn(); globalThis.IntersectionObserver = observer;
  const { container } = render(<Fixture />);
  expect(screen.getByText('Visible content')).toBeVisible(); expect(observer).not.toHaveBeenCalled();
  expect(container.querySelector('[data-section-transition]')).toHaveAttribute('aria-hidden', 'true');
});
it('activates visible decorations once and disconnects on unmount', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  let callback: IntersectionObserverCallback;
  const observe = vi.fn(), unobserve = vi.fn(), disconnect = vi.fn();
  globalThis.IntersectionObserver = vi.fn((cb: IntersectionObserverCallback) => { callback = cb; return { observe, unobserve, disconnect }; }) as unknown as typeof IntersectionObserver;
  const { container, unmount } = render(<Fixture />);
  const target = container.querySelector('[data-motion-item]')!;
  callback!([{ isIntersecting: true, target } as IntersectionObserverEntry], {} as IntersectionObserver);
  expect(target).toHaveAttribute('data-revealed', 'true'); expect(unobserve).toHaveBeenCalledWith(target);
  unmount(); expect(disconnect).toHaveBeenCalled();
});
it('renders the real portrait with reserved dimensions and eager priority', () => {
  render(<MemoryRouter><Hero /></MemoryRouter>);
  const image = screen.getByRole('img', { name: 'Henry Teran' });
  expect(image).toHaveAttribute('src', '/henry-portrait.webp'); expect(image).toHaveAttribute('width', '800');
  expect(image).toHaveAttribute('height', '800'); expect(image).toHaveAttribute('fetchpriority', 'high');
  expect(image).not.toHaveAttribute('loading', 'lazy');
});
