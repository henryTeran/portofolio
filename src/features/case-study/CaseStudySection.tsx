import type { ReactNode } from 'react';

export default function CaseStudySection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <section className="grid gap-6 border-t border-[var(--v2-border)] py-12 sm:py-16 lg:grid-cols-[.38fr_1fr] lg:gap-16">
    <div><span className="font-mono text-xs tracking-widest text-[var(--v2-accent)]">{number}</span><h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2></div>
    <div className="min-w-0 text-base leading-relaxed text-[var(--v2-text-secondary)] sm:text-lg">{children}</div>
  </section>;
}
