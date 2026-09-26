import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type { LanguageCode } from '../constants/i18n';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { verificationCopy } from '../security/verificationCopy';
import { captureVerificationToken } from '../security/verificationToken';
type State = 'ready' | 'verifying' | 'verified' | 'expired' | 'invalid' | 'already_verified' | 'error';

export default function VerifyPage({ language }: { language: LanguageCode }) {
  const [token] = useState(captureVerificationToken);
  useEffect(() => { window.history.replaceState(window.history.state, '', window.location.pathname); }, []);
  const [state, setState] = useState<State>(token ? 'ready' : 'invalid');
  const busy = useRef(false);
  const t = verificationCopy[language];
  const verify = async () => {
    if (busy.current) return;
    busy.current = true; setState('verifying');
    try {
      const response = await fetch('/api/verify-contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }), cache: 'no-store', referrerPolicy: 'no-referrer' });
      const data = await response.json() as { status: string };
      const result = response.ok && ['verified', 'expired', 'invalid', 'already_verified'].includes(data.status) ? data.status as State : 'error';
      setState(result);
    } catch { setState('error'); }
    finally { busy.current = false; }
  };
  return <div className="min-h-screen bg-[var(--v2-background)] text-[var(--v2-text)]"><Helmet><html lang={language} /><title>{t.title} | Henry Teran</title><meta name="robots" content="noindex,nofollow" /><meta name="referrer" content="no-referrer" /></Helmet><Header /><main className="mx-auto flex min-h-[65vh] max-w-2xl flex-col justify-center px-5 py-16"><h1 className="text-4xl font-semibold">{t.title}</h1><p role="status" className="mt-6 text-lg leading-relaxed">{t[state]}</p>{(state === 'ready' || state === 'error') && <button type="button" onClick={verify} className="mt-6 min-h-12 self-start rounded-lg border border-[var(--v2-text)] px-5 py-3 font-semibold">{t.action}</button>}<Link className="mt-8 inline-block underline" to={`/${language}#contact`}>{t.back}</Link></main><Footer /></div>;
}
