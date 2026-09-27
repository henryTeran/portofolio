import { useEffect, useRef } from 'react';

/** Pointer-driven CSS perspective, limited to fine pointers and normal motion. */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      element.style.setProperty('--tilt-x', '0deg'); element.style.setProperty('--tilt-y', '0deg');
      element.removeAttribute('data-tilting');
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType === 'touch') return;
      const rect = element.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - .5) * 2));
      const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - .5) * 2));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.setProperty('--tilt-x', `${-y * 6}deg`); element.style.setProperty('--tilt-y', `${x * 8}deg`);
        element.style.setProperty('--pointer-x', `${(x + 1) * 50}%`);
        element.style.setProperty('--pointer-y', `${(y + 1) * 50}%`);
        element.setAttribute('data-tilting', 'true');
      });
    };
    element.addEventListener('pointermove', move); element.addEventListener('pointerleave', reset); media.addEventListener('change', reset);
    return () => { reset(); element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset); media.removeEventListener('change', reset); };
  }, []);
  return ref;
}
