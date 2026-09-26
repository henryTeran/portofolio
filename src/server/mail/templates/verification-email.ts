import type { PortfolioLanguage } from '../../../types/portfolio';
import { emailLayout, escapeHtml } from './layout';
const copy = {
  fr: { subject: 'Confirmez votre adresse pour envoyer votre demande', intro: 'Confirmez cette adresse email pour transmettre votre demande à Henry Teran.', button: 'Confirmer ma demande', expiry: 'Ce lien est valable 20 minutes et ne peut être utilisé qu’une fois.', ignore: 'Si vous n’êtes pas à l’origine de cette demande, ignorez cet email. Aucun message ne sera transmis à Henry sans confirmation.' },
  en: { subject: 'Confirm your email to send your request', intro: 'Confirm this email address to forward your request to Henry Teran.', button: 'Confirm my request', expiry: 'This link is valid for 20 minutes and can only be used once.', ignore: 'If you did not make this request, ignore this email. Nothing will be forwarded to Henry without confirmation.' },
  es: { subject: 'Confirma tu correo para enviar tu solicitud', intro: 'Confirma esta dirección para transmitir tu solicitud a Henry Teran.', button: 'Confirmar mi solicitud', expiry: 'Este enlace es válido durante 20 minutos y solo puede utilizarse una vez.', ignore: 'Si no has realizado esta solicitud, ignora este email. No se enviará nada a Henry sin confirmación.' },
};
export function verificationEmail(language: PortfolioLanguage, url: string) {
  const t = copy[language];
  return emailLayout(t.subject, t.intro, `<p style="margin:24px 0"><a href="${escapeHtml(url)}" style="display:inline-block;padding:14px 20px;background:#101820;color:#fff;text-decoration:none;border-radius:8px">${escapeHtml(t.button)}</a></p><p>${escapeHtml(t.expiry)}</p><p style="color:#526071">${escapeHtml(t.ignore)}</p>`, `${t.intro}\n\n${t.button}: ${url}\n\n${t.expiry}\n${t.ignore}`);
}
