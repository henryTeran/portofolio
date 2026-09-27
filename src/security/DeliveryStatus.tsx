import type { DeliveryState } from './submissionTracking';
import { verificationCopy } from './verificationCopy';

const labels = {
  fr: { contact: 'Message de contact', brief: 'Demande de projet' },
  en: { contact: 'Contact message', brief: 'Project brief' },
  es: { contact: 'Mensaje de contacto', brief: 'Solicitud de proyecto' },
};

export default function DeliveryStatus({ state, language, kind }: { state: DeliveryState; language: string; kind: 'contact' | 'brief' }) {
  if (state === 'idle') return null;
  const locale = language === 'fr' || language === 'es' ? language : 'en';
  const copy = verificationCopy[locale];
  return <div role="status" aria-live="polite" className="my-5 rounded-xl border border-[var(--v2-accent)] bg-[var(--v2-surface)] p-5 text-[var(--v2-text)]"><p className="mb-2 text-sm">{labels[locale][kind]}</p><p className="font-semibold">{state === 'verified' ? '✓ ' : ''}{copy[state]}</p></div>;
}
