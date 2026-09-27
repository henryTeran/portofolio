import type { ContactMessage, EmailContent } from '../types.js';
import { emailLayout, row, section } from './layout.js';

export function contactEmail(message: ContactMessage): EmailContent {
  const subject = `Nouveau message de ${message.name}`;
  return emailLayout(subject, 'Une personne a utilisé le formulaire de contact du portfolio.',
    section('Contact', row('Nom', message.name) + row('Email', message.email) + row('Intention', message.intent ?? '—')) +
    section('Message', row('Contenu', message.message)) +
    section('Contexte', row('Langue', message.language) + row('Date', message.submittedAt)),
    `${subject}\n\nEmail: ${message.email}\nIntention: ${message.intent ?? '—'}\nMessage: ${message.message}\nLangue: ${message.language}\nDate: ${message.submittedAt}`);
}
