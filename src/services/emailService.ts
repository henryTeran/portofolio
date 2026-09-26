import { briefSteps, contactFields, invalidFields } from '../forms/validation';
import { apiCode, type ApiCode } from '../forms/apiErrors';
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

async function submit(path: string, data: Record<string, unknown>, onError?: (code: ApiCode) => void): Promise<boolean> {
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, language: currentLanguage() }),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      onError?.(apiCode(body?.code));
    }
    return response.ok;
  } catch {
    onError?.('server_error');
    return false;
  }
}

export const sendContactEmail = (formData: ContactFormData, protection: FormProtection = {}, onError?: (code: ApiCode) => void): Promise<boolean> =>
  submit('/api/contact', { ...formData, ...protection }, onError);

export const sendQuoteEmail = (formData: QuoteFormData, protection: FormProtection = {}, onError?: (code: ApiCode) => void): Promise<boolean> =>
  submit('/api/project-brief', { ...formData, ...protection }, onError);

export const validateContactForm = (formData: ContactFormData) => {
  const errors = invalidFields(formData, contactFields);
  return { isValid: errors.length === 0, errors };
};
export const validateQuoteForm = (formData: QuoteFormData) => {
  const errors = invalidFields(formData, briefSteps.flat());
  return { isValid: errors.length === 0, errors };
};
