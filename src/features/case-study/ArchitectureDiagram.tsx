export default function ArchitectureDiagram({ layers, label }: { layers: string[]; label: string }) {
  return <ol className="grid gap-2" aria-label={label}>{layers.map((layer, index) => <li key={layer} className="flex items-center gap-4 rounded-lg border border-[var(--v2-border)] bg-[var(--v2-surface)] px-4 py-3 text-[var(--v2-text)]"><span className="font-mono text-xs text-[var(--v2-accent)]">0{index + 1}</span><span className="font-medium">{layer}</span></li>)}</ol>;
}
