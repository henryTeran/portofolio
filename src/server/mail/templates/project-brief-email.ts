import type { EmailContent, ProjectBriefMessage } from '../types.js';
import { emailLayout, row, section } from './layout.js';

export function projectBriefEmail(message: ProjectBriefMessage): EmailContent {
  const services = [message.hasDesign && 'Design', message.needsHosting && 'Hébergement', message.needsMaintenance && 'Maintenance', message.needsTraining && 'Formation'].filter(Boolean).join(', ');
  const subject = `Nouveau brief projet — ${message.name}`;
  return emailLayout(subject, 'Un nouveau besoin a été transmis depuis le portfolio.',
    section('Contact', row('Nom', message.name) + row('Email', message.email) + row('Téléphone', message.phone ?? '') + row('Entreprise', message.company ?? '')) +
    section('Projet', row('Type', message.projectType) + row('Description', message.projectDescription)) +
    section('Périmètre', row('Fonctionnalités', message.features.join(', ')) + row('Technologies', message.technologies.join(', '))) +
    section('Planning et budget', row('Délai', message.timeline ?? '') + row('Urgence', message.urgency ?? '') + row('Budget', message.budget ?? '')) +
    section('Compléments', row('Services', services) + row('Informations', message.additionalInfo ?? '')) +
    section('Contexte', row('Langue', message.language) + row('Date', message.submittedAt)),
    `${subject}\n\nContact: ${message.name} <${message.email}>\nTéléphone: ${message.phone ?? '—'}\nEntreprise: ${message.company ?? '—'}\nProjet: ${message.projectType}\n${message.projectDescription}\nFonctionnalités: ${message.features.join(', ')}\nTechnologies: ${message.technologies.join(', ')}\nDélai: ${message.timeline ?? '—'}\nUrgence: ${message.urgency ?? '—'}\nBudget: ${message.budget ?? '—'}\nServices: ${services || '—'}\nInformations: ${message.additionalInfo ?? '—'}\nLangue: ${message.language}\nDate: ${message.submittedAt}`);
}
