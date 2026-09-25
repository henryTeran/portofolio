import type { ProjectBriefData, PortfolioLanguage } from '../../types/portfolio';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  intent?: string;
  language: PortfolioLanguage;
  submittedAt: string;
}

export interface ProjectBriefMessage extends ProjectBriefData {
  language: PortfolioLanguage;
  submittedAt: string;
}

export interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

export interface MailService {
  sendContactMessage(message: ContactMessage): Promise<void>;
  sendProjectBrief(message: ProjectBriefMessage): Promise<void>;
}
