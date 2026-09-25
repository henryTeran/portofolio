import type { EmailContent } from '../types';
import type { PortfolioLanguage } from '../../../types/portfolio';
import { emailLayout, escapeHtml } from './layout';

const copy = {
  fr: ['Merci pour votre message', 'Votre message a bien été reçu. Je reviendrai vers vous prochainement.'],
  en: ['Thank you for your message', 'Your message has been received. I will get back to you soon.'],
  es: ['Gracias por tu mensaje', 'He recibido tu mensaje. Te responderé pronto.'],
} as const;

export function acknowledgementEmail(name: string, language: PortfolioLanguage, kind: 'contact' | 'brief'): EmailContent {
  const [subject, intro] = copy[language];
  const detail = kind === 'brief' ? (language === 'fr' ? 'Votre brief projet est enregistré.' : language === 'es' ? 'Tu brief de proyecto está registrado.' : 'Your project brief is recorded.') : '';
  return emailLayout(subject, intro,
    `<p style="margin:24px 0;color:#18212f;line-height:1.6">${escapeHtml(name)}, ${escapeHtml(detail || intro)}</p><p style="margin:0"><a href="https://henryteran.com" style="display:inline-block;background:#101820;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:8px">henryteran.com</a></p>`,
    `${subject}\n\n${name}, ${intro} ${detail}\nhttps://henryteran.com`);
}
