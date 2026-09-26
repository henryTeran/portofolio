import i18next from 'i18next';
import type { ProjectBriefData, PortfolioLanguage } from '../types/portfolio';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type QuoteFormData = ProjectBriefData;
export interface FormProtection { website?: string; turnstileToken?: string }

const currentLanguage = (): PortfolioLanguage => {
  const language = i18next.language.split('-')[0];
  return language === 'fr' || language === 'es' ? language : 'en';
};

async function submit(path: string, data: Record<string, unknown>): Promise<boolean> {
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, language: currentLanguage() }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export const sendContactEmail = (formData: ContactFormData, protection: FormProtection = {}): Promise<boolean> =>
  submit('/api/contact', { ...formData, ...protection });

export const sendQuoteEmail = (formData: QuoteFormData, protection: FormProtection = {}): Promise<boolean> =>
  submit('/api/project-brief', { ...formData, ...protection });

export const validateContactForm = (formData: ContactFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!formData.name || formData.name.trim().length < 2) errors.push('Invalid name');
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errors.push('Invalid email');
  if (!formData.message || formData.message.trim().length < 10) errors.push('Invalid message');
  return { isValid: errors.length === 0, errors };
};

export const validateQuoteForm = (formData: QuoteFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!formData.name || formData.name.trim().length < 2) errors.push('Invalid name');
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errors.push('Invalid email');
  if (!formData.projectType) errors.push('Invalid project type');
  if (!formData.projectDescription || formData.projectDescription.trim().length < 20) errors.push('Invalid description');
  if (!formData.timeline) errors.push('Invalid timeline');
  if (!formData.budget) errors.push('Invalid budget');
  return { isValid: errors.length === 0, errors };
};
