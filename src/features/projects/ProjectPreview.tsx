import type { PortfolioProject } from '../../types/portfolio';

export default function ProjectPreview({ project, label }: { project: PortfolioProject; label: string }) {
  const bars = project.slug === 'zigoma' ? [78, 53, 88, 64, 92, 70] : project.slug === 'applyflow' ? [48, 79, 67, 86, 58, 74] : [62, 84, 45, 71, 56, 89];

  return (
    <div className="relative min-h-[280px] overflow-hidden rounded-xl border border-[var(--v2-border)] bg-[var(--v2-background)] p-4 sm:min-h-[340px] sm:p-6" aria-label={`${project.title} — ${label}`}>
      <div className="flex items-center justify-between border-b border-[var(--v2-border)] pb-4 text-xs text-[var(--v2-text-secondary)]">
        <span className="font-mono uppercase tracking-widest">{project.title} / SYSTEM</span><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[var(--v2-accent)]" />LIVE</span>
      </div>
      <div className="grid grid-cols-[minmax(90px,.38fr)_1fr] gap-4 pt-5 sm:gap-6">
        <div className="space-y-3 border-r border-[var(--v2-border)] pr-3 sm:pr-5">
          {project.capabilities.slice(0, 5).map((capability, index) => <div key={capability} className={`truncate rounded-md px-2 py-2 text-[10px] sm:text-xs ${index === 0 ? 'bg-[var(--v2-surface-raised)] text-[var(--v2-accent)]' : 'text-[var(--v2-text-secondary)]'}`}>{capability}</div>)}
        </div>
        <div className="min-w-0">
          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-[var(--v2-border)] bg-[var(--v2-surface)] p-3"><div className="mb-4 h-2 w-16 rounded bg-[var(--v2-border)]" /><div className="h-5 w-20 rounded bg-[var(--v2-accent)] opacity-70" /></div>
            <div className="rounded-lg border border-[var(--v2-border)] bg-[var(--v2-surface)] p-3"><div className="mb-4 h-2 w-12 rounded bg-[var(--v2-border)]" /><div className="h-5 w-16 rounded bg-[var(--v2-accent-secondary)] opacity-55" /></div>
          </div>
          <div className="flex h-28 items-end gap-2 rounded-lg border border-[var(--v2-border)] bg-[var(--v2-surface)] p-4 sm:h-36">
            {bars.map((height, index) => <div key={index} className="flex-1 rounded-t-sm bg-[var(--v2-accent)]" style={{ height: `${height}%`, opacity: .25 + index * .1 }} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
