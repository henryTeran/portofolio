export default function VisualFlow({ steps, label }: { steps: string[]; label: string }) {
  return <ol className="visual-flow" aria-label={label}>{steps.map((step, index) => <li key={step}><span className="visual-step" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{step}</span>{index < steps.length - 1 && <span className="visual-arrow" aria-hidden="true">↓</span>}</li>)}</ol>;
}
