import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
type Widget = { render: (element: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void };
declare global { interface Window { turnstile?: Widget } }
let loading: Promise<Widget> | undefined;
function loadWidget(): Promise<Widget> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!loading) loading = new Promise<Widget>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; script.async = true;
    script.onload = () => window.turnstile ? resolve(window.turnstile) : reject(new Error('Unavailable'));
    script.onerror = () => { script.remove(); reject(new Error('Unavailable')); };
    document.head.appendChild(script);
  }).catch(error => { loading = undefined; throw error; });
  return loading;
}
export default function Turnstile({ action, onToken, resetKey }: { action: 'contact' | 'brief'; onToken: (token: string) => void; resetKey: number }) {
  const { i18n } = useTranslation();
  const language = i18n.language.split('-')[0];
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const dev = import.meta.env.DEV && import.meta.env.VITE_CONTACT_SECURITY_DEV_MODE === 'true';
  const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  useEffect(() => {
    onToken(''); setError(false);
    if (dev) { onToken('development-only'); return; }
    if (!sitekey) { setError(true); return; }
    let cancelled = false; let widget: Widget | undefined; let id: string | undefined;
    void loadWidget().then(api => {
      if (cancelled || !ref.current) return;
      widget = api;
      id = api.render(ref.current, { sitekey, action, language, size: 'flexible', theme: 'auto', callback: (token: string) => { setError(false); onToken(token); }, 'expired-callback': () => onToken(''), 'error-callback': () => { setError(true); onToken(''); } });
    }).catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; if (id) widget?.remove(id); };
  }, [action, dev, sitekey, language, onToken, resetKey]);
  return <div><div ref={ref} />{dev && <p className="text-xs">Security: explicit local development mode</p>}{error && <p role="status" className="text-sm text-[var(--v2-text-secondary)]">{language === 'fr' ? 'Vérification de sécurité indisponible. Réessayez plus tard.' : language === 'es' ? 'Verificación de seguridad no disponible. Inténtalo más tarde.' : 'Security verification unavailable. Please try again later.'}</p>}</div>;
}
