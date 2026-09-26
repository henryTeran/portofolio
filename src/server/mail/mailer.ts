import nodemailer from 'nodemailer';
import { getMailConfig } from './config.js';
import type { ContactMessage, MailService, ProjectBriefMessage } from './types.js';
import { contactEmail } from './templates/contact-email.js';
import { projectBriefEmail } from './templates/project-brief-email.js';
import { acknowledgementEmail } from './templates/acknowledgement-email.js';
import { verificationEmail } from './templates/verification-email.js';

export function createMailService(): MailService {
  const config = getMailConfig();
  const transport = nodemailer.createTransport({
    host: config.host, port: config.port, secure: config.secure,
    auth: { user: config.user, pass: config.password },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
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
    sendVerificationEmail: async (email, language, url) => { await transport.sendMail({ from: config.from, to: email, ...verificationEmail(language, url) }); },
    sendContactMessage: (message) => deliver(message, 'contact'),
    sendProjectBrief: (message) => deliver(message, 'brief'),
  };
}
