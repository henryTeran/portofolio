import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage, type LanguageCode } from '../constants/i18n';
import { consentCopy } from './consentCopy';
import { getConsent, saveConsent, subscribeConsent } from './consent';
import './privacy.css';

function Preferences({ language, close }: { language: LanguageCode; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [analytics, setAnalytics] = useState(getConsent()?.analytics ?? false);
  const copy = consentCopy[language];
  useEffect(() => {
    const dialog = ref.current!;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    return () => { dialog.close(); previous?.focus(); };
  }, []);
  const save = (allowed: boolean) => { saveConsent(allowed); close(); };
  return <dialog ref={ref} className="privacy-dialog" aria-labelledby="cookie-preferences-title" onCancel={close} onKeyDown={event => {
    if (event.key !== 'Tab') return;
    const controls = Array.from(ref.current!.querySelectorAll<HTMLElement>('button, input, a[href]'));
    const first = controls[0]; const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }}>
    <div className="privacy-dialog-heading"><h2 id="cookie-preferences-title">{copy.preferences}</h2><button type="button" className="privacy-button" onClick={close}>{copy.close}</button></div>
    <div className="privacy-category"><h3>{copy.necessary}</h3><p>{copy.always}</p></div>
    <div className="privacy-category"><label className="privacy-toggle"><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} aria-describedby="analytics-detail" />{copy.analytics}</label><p id="analytics-detail">{copy.detail}</p></div>
    <Link to={`/${language}/privacy`} onClick={close} className="privacy-link">{copy.privacy}</Link>
    <div className="privacy-actions"><button className="privacy-button" onClick={() => save(false)}>{copy.rejectAll}</button><button className="privacy-button" onClick={() => save(true)}>{copy.acceptAll}</button><button className="privacy-button" onClick={() => save(analytics)}>{copy.save}</button></div>
  </dialog>;
}

export default function ConsentManager() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const lang = pathname.split('/')[1];
  const language = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const copy = consentCopy[language];
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener('portfolio:cookie-preferences', show);
    return () => window.removeEventListener('portfolio:cookie-preferences', show);
  }, []);
  return <>{!consent && !open && <section className="privacy-banner" aria-labelledby="cookie-banner-title"><div><h2 id="cookie-banner-title">{copy.title}</h2><p>{copy.intro} <Link className="privacy-link" to={`/${language}/privacy`}>{copy.privacy}</Link></p></div><div className="privacy-actions"><button className="privacy-button" onClick={() => saveConsent(false)}>{copy.reject}</button><button className="privacy-button" onClick={() => setOpen(true)}>{copy.customize}</button><button className="privacy-button" onClick={() => saveConsent(true)}>{copy.accept}</button></div></section>}{open && <Preferences language={language} close={() => setOpen(false)} />}</>;
}
