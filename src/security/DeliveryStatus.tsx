import type { DeliveryState } from './submissionTracking';
import { verificationCopy } from './verificationCopy';

export default function DeliveryStatus({ state, language }: { state: DeliveryState; language: string }) {
  if (state === 'idle') return null;
  const copy = verificationCopy[language === 'fr' || language === 'es' ? language : 'en'];
  return <div role="status" aria-live="polite" className="my-5 rounded-xl border border-[var(--v2-accent)] bg-[var(--v2-surface)] p-5 text-[var(--v2-text)]"><p className="font-semibold">{state === 'verified' ? '✓ ' : ''}{copy[state]}</p></div>;
}
