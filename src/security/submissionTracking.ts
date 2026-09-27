import { useEffect, useState } from 'react';

type Kind = 'contact' | 'brief';
type Tracking = { receipt: string; expiresAt: number };
export type DeliveryState = 'idle' | 'pending' | 'verifying' | 'verified' | 'expired' | 'error';
const eventName = 'portfolio-submission';
const key = (kind: Kind) => `portfolio:submission:${kind}`;
const memory = new Map<Kind, Tracking>();

export function clearSubmission(kind: Kind) {
  memory.delete(kind);
  try { sessionStorage.removeItem(key(kind)); } catch { /* Storage unavailable. */ }
  window.dispatchEvent(new CustomEvent(eventName, { detail: kind }));
}

export function trackSubmission(kind: Kind, data: unknown) {
  const value = data as Partial<Tracking> | null;
  if (!value || typeof value.receipt !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(value.receipt) || typeof value.expiresAt !== 'number') return;
  const tracking = value as Tracking;
  memory.set(kind, tracking);
  try { sessionStorage.setItem(key(kind), JSON.stringify(tracking)); } catch { /* Memory fallback. */ }
  window.dispatchEvent(new CustomEvent(eventName, { detail: kind }));
}

function read(kind: Kind): Tracking | null {
  try {
    const value = memory.get(kind) ?? JSON.parse(sessionStorage.getItem(key(kind)) || 'null');
    if (value && typeof value.receipt === 'string' && /^[A-Za-z0-9_-]{43}$/.test(value.receipt) && Number.isFinite(value.expiresAt) && Date.now() < value.expiresAt + 86400000) return value;
    sessionStorage.removeItem(key(kind));
    memory.delete(kind);
  } catch { /* Storage unavailable. */ }
  return null;
}

export function useSubmissionTracking(kind: Kind): DeliveryState {
  const [tracking, setTracking] = useState(() => read(kind));
  const [state, setState] = useState<DeliveryState>(tracking ? 'pending' : 'idle');
  useEffect(() => {
    const update = (event: Event) => {
      if ((event as CustomEvent).detail !== kind) return;
      const next = read(kind);
      setTracking(next); setState(next ? 'pending' : 'idle');
    };
    window.addEventListener(eventName, update);
    return () => window.removeEventListener(eventName, update);
  }, [kind]);
  useEffect(() => {
    if (!tracking) return;
    let disposed = false;
    let busy = false;
    let terminal = false;
    const controller = new AbortController();
    const check = async () => {
      if (disposed || busy || terminal || document.visibilityState === 'hidden') return;
      busy = true;
      try {
        const response = await fetch('/api/verify-contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ receipt: tracking.receipt }), cache: 'no-store', referrerPolicy: 'no-referrer', signal: controller.signal });
        const data = await response.json();
        if (!disposed && response.ok && ['pending', 'verifying', 'verified', 'expired', 'error'].includes(data.status)) {
          setState(data.status);
          terminal = ['verified', 'expired', 'error'].includes(data.status);
        }
      } catch { /* A transient network failure is not a delivery failure. */ }
      finally {
        busy = false;
        if (!terminal && Date.now() > tracking.expiresAt + 60000) terminal = true;
      }
    };
    void check();
    const timer = window.setInterval(() => { void check(); }, 10000);
    document.addEventListener('visibilitychange', check);
    window.addEventListener('focus', check);
    return () => { disposed = true; controller.abort(); window.clearInterval(timer); document.removeEventListener('visibilitychange', check); window.removeEventListener('focus', check); };
  }, [tracking]);
  return state;
}
