import nodemailer from 'nodemailer';
import { getMailConfig } from './config';
import type { ContactMessage, MailService, ProjectBriefMessage } from './types';
import { contactEmail } from './templates/contact-email';
import { projectBriefEmail } from './templates/project-brief-email';
import { acknowledgementEmail } from './templates/acknowledgement-email';

export function createMailService(): MailService {
  const config = getMailConfig();
  const transport = nodemailer.createTransport({
    host: config.host, port: config.port, secure: config.secure,
    auth: { user: config.user, pass: config.password },
  });

  async function deliver(message: ContactMessage | ProjectBriefMessage, kind: 'contact' | 'brief') {
    const content = kind === 'contact' ? contactEmail(message as ContactMessage) : projectBriefEmail(message as ProjectBriefMessage);
    await transport.sendMail({ from: config.from, to: config.to, replyTo: message.email, ...content });
    if (config.acknowledgement) {
      try {
        await transport.sendMail({ from: config.from, to: message.email, ...acknowledgementEmail(message.name, message.language, kind) });
      } catch {
        // The visitor submission has already reached Henry. Acknowledgement is best effort.
      }
    }
  }

  return {
    sendContactMessage: (message) => deliver(message, 'contact'),
    sendProjectBrief: (message) => deliver(message, 'brief'),
  };
}
