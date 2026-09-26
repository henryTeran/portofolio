import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type { LanguageCode } from '../constants/i18n';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { verificationCopy } from '../security/verificationCopy';
import { captureVerificationToken } from '../security/verificationToken';
type State = 'ready' | 'verifying' | 'verified' | 'expired' | 'invalid' | 'already_verified' | 'error';

export default function VerifyPage({ language }: { language: LanguageCode }) {
  const [token, setToken] = useState(captureVerificationToken);
  useEffect(() => {
    const update = () => { const next = captureVerificationToken(); if (next) setToken(next); };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  return <VerifyRequest key={token} token={token} language={language} />;
}

function VerifyRequest({ language, token }: { language: LanguageCode; token: string }) {
  useEffect(() => { window.history.replaceState(window.history.state, '', window.location.pathname); }, []);
  const [state, setState] = useState<State>(token ? 'ready' : 'invalid');
  const busy = useRef(false);
  const started = useRef(false);
  const attempts = useRef(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const t = verificationCopy[language];
  const verify = useCallback(async () => {
    if (busy.current) return;
    attempts.current += 1;
    busy.current = true; setState('verifying');
    try {
      const response = await fetch('/api/verify-contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }), cache: 'no-store', referrerPolicy: 'no-referrer' });
      const data = await response.json() as { status: string };
      const result = response.ok && ['verified', 'expired', 'invalid', 'already_verified', 'verifying'].includes(data.status) ? data.status as State : 'error';
      setState(result);
    } catch { setState('error'); }
    finally { busy.current = false; }
  }, [token]);
  useEffect(() => {
    const start = () => {
      if (!token || started.current || document.visibilityState === 'hidden') return;
      started.current = true;
      void verify();
    };
    start();
    document.addEventListener('visibilitychange', start);
    return () => document.removeEventListener('visibilitychange', start);
  }, [token, verify]);
  // A concurrent confirmation may already own delivery. Check its result, never send twice.
  useEffect(() => {
    if (state !== 'verifying') return;
    const timer = window.setInterval(() => {
      if (busy.current) return;
      if (attempts.current >= 6) setState('error');
      else void verify();
    }, 3000);
    return () => window.clearInterval(timer);
  }, [state, verify]);
  const success = state === 'verified' || state === 'already_verified';
  useEffect(() => {
    if (success && !dismissed) dialog.current?.showModal?.();
  }, [success, dismissed]);
  return <div className="min-h-screen bg-[var(--v2-background)] text-[var(--v2-text)]">
    <Helmet><html lang={language} /><title>{t.title} | Henry Teran</title><meta name="robots" content="noindex,nofollow" /><meta name="referrer" content="no-referrer" /></Helmet>
    <Header />
    <main className="mx-auto flex min-h-[65vh] max-w-2xl flex-col justify-center px-5 py-16">
      <h1 className="text-4xl font-semibold">{t.title}</h1>
      {(!success || dismissed) && <p role="status" className="mt-6 text-lg leading-relaxed">{t[state]}</p>}
      {state === 'error' && <button type="button" onClick={() => { attempts.current = 0; void verify(); }} className="mt-6 min-h-12 self-start rounded-lg border border-[var(--v2-text)] px-5 py-3 font-semibold">{t.action}</button>}
      <Link className="mt-8 inline-block underline" to={`/${language}#contact`}>{t.back}</Link>
      {success && !dismissed && <dialog ref={dialog} aria-labelledby="verification-success-title" aria-describedby="verification-success-message" onClose={() => setDismissed(true)} className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-[var(--v2-accent)] bg-[var(--v2-surface)] p-8 text-[var(--v2-text)] shadow-xl backdrop:bg-black/60">
        <span aria-hidden="true" className="text-4xl text-[var(--v2-accent)]">✓</span>
        <h2 id="verification-success-title" className="mt-4 text-2xl font-semibold">{t.successTitle}</h2>
        <p id="verification-success-message" className="mt-4 leading-relaxed">{t[state]}</p>
        <button type="button" onClick={() => { dialog.current?.close(); setDismissed(true); }} className="mt-6 min-h-12 rounded-lg bg-[var(--v2-accent)] px-5 py-3 font-semibold text-[var(--v2-on-accent)]">{t.close}</button>
      </dialog>}
    </main><Footer />
  </div>;
}
