import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { PortfolioLanguage, PortfolioProject } from '../../types/portfolio';
import ProjectScreenshot from './ProjectScreenshot';
import { showcaseCopy } from './showcaseCopy';
import './showcase.css';

export default function ProductShowcaseSlider({ project, language }: { project: PortfolioProject; language: PortfolioLanguage }) {
  const slides = project.productSlides ?? [];
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const pointer = useRef<{ x: number; y: number }>();
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = showcaseCopy[language];
  const slide = slides[index] ?? slides[0];
  if (!slide) return <p>{copy.empty}</p>;
  const go = (next: number) => {
    clearTimeout(timer.current);
    const target = (next + slides.length) % slides.length;
    if (target === index) { setLeaving(false); return; }
    const update = () => { setIndex(target); setFailed(false); setLeaving(false); };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) update();
    else { setLeaving(true); timer.current = setTimeout(update, 120); }
  };
  return <div className="product-showcase" role="region" aria-label={`${project.title} — ${copy.label}`} tabIndex={0} onKeyDown={(event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); go(index + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(index - 1); }
    if (event.key === 'Home') { event.preventDefault(); go(0); }
    if (event.key === 'End') { event.preventDefault(); go(slides.length - 1); }
  }}>
    <div key={slide.id} className={`showcase-stage${leaving ? ' showcase-stage--leaving' : ''}`} onPointerDown={(event) => {
      if (event.pointerType === 'touch') pointer.current = { x: event.clientX, y: event.clientY };
    }} onPointerCancel={() => { pointer.current = undefined; }} onPointerUp={(event) => {
      const start = pointer.current; pointer.current = undefined;
      if (start && Math.abs(event.clientX - start.x) > 50 && Math.abs(event.clientX - start.x) > Math.abs(event.clientY - start.y)) go(index + (event.clientX < start.x ? 1 : -1));
    }}>
      {failed ? <div className="showcase-error">{copy.failed}</div> : <ProjectScreenshot visual={slide} language={language} onError={() => setFailed(true)} />}
    </div>
    <div className="showcase-controls">
      <button type="button" aria-label={copy.previous} onClick={() => go(index - 1)} disabled={slides.length < 2}><ArrowLeft aria-hidden="true" size={20} /></button>
      <p aria-live="polite" aria-atomic="true"><span>{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span><strong>{slide.label[language]}</strong></p>
      <button type="button" aria-label={copy.next} onClick={() => go(index + 1)} disabled={slides.length < 2}><ArrowRight aria-hidden="true" size={20} /></button>
    </div>
    <p className="showcase-description">{slide.caption[language]}</p>
    <div className="showcase-dots">{slides.map((item, i) => <button type="button" key={item.id} aria-label={`${copy.choose} ${i + 1} : ${item.label[language]}`} aria-current={i === index ? 'true' : undefined} onClick={() => go(i)}><span /></button>)}</div>
  </div>;
}
