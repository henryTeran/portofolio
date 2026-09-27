import { limits, minimums } from '../../forms/validation.js';
import { PublicFormError } from '../../forms/apiErrors.js';
import type { PortfolioLanguage } from '../../types/portfolio.js';
import type { ContactMessage, ProjectBriefMessage } from './types.js';
import { normalizeEmail } from '../security/email.js';

type Payload = Record<string, unknown>;
const readText = (data: Payload, key: string, max: number, required = false): string => {
  const value = data[key];
  if (value === undefined && !required) return '';
  if (typeof value !== 'string' || value.trim().length > max || (required && !value.trim())) throw new Error('Invalid request');
  return value.trim();
};
const language = (data: Payload): PortfolioLanguage => {
  if (data.language === 'fr' || data.language === 'es' || data.language === 'en') return data.language;
  throw new Error('Invalid request');
};
const assertKeys = (data: Payload, keys: string[]) => {
  if (Object.keys(data).some((key) => !keys.includes(key))) throw new Error('Invalid request');
};
const identity = (data: Payload) => {
  const name = readText(data, 'name', 120, true);
  let email: string;
  try { email = normalizeEmail(readText(data, 'email', limits.email, true)); }
  catch { throw new PublicFormError('invalid_email'); }
  if (name.length < 2) throw new Error('Invalid request');
  return { name, email, language: language(data), submittedAt: new Date().toISOString() };
};
const list = (data: Payload, key: string): string[] => {
  const value = data[key];
  if (!Array.isArray(value) || value.length > 30 || value.some((item) => typeof item !== 'string' || item.length > 100)) throw new Error('Invalid request');
  return value.map((item: string) => item.trim()).filter(Boolean);
};
const bool = (data: Payload, key: string): boolean => {
  if (data[key] === undefined) return false;
  if (typeof data[key] !== 'boolean') throw new Error('Invalid request');
  return data[key];
};

export function validateContact(data: Payload): ContactMessage {
  assertKeys(data, ['name', 'email', 'message', 'intent', 'language', 'website', 'turnstileToken']);
  if (readText(data, 'website', 100)) throw new Error('Spam');
  const message = readText(data, 'message', limits.message, true);
  if (message.length < minimums.message) throw new PublicFormError('message_too_short');
  return { ...identity(data), message, intent: readText(data, 'intent', 100) };
}

export function validateBrief(data: Payload): ProjectBriefMessage {
  assertKeys(data, ['name', 'email', 'phone', 'company', 'projectType', 'projectDescription', 'features', 'technologies', 'timeline', 'budget', 'urgency', 'hasDesign', 'needsHosting', 'needsMaintenance', 'needsTraining', 'additionalInfo', 'language', 'website', 'turnstileToken']);
  if (readText(data, 'website', 100)) throw new Error('Spam');
  const projectDescription = readText(data, 'projectDescription', limits.projectDescription, true);
  if (projectDescription.length < minimums.projectDescription) throw new PublicFormError('description_too_short');
  return {
    ...identity(data), phone: readText(data, 'phone', 50), company: readText(data, 'company', 150),
    projectType: readText(data, 'projectType', 100, true), projectDescription,
    features: list(data, 'features'), technologies: list(data, 'technologies'),
    timeline: readText(data, 'timeline', 100, true), budget: readText(data, 'budget', 100, true),
    urgency: readText(data, 'urgency', 100), hasDesign: bool(data, 'hasDesign'),
    needsHosting: bool(data, 'needsHosting'), needsMaintenance: bool(data, 'needsMaintenance'),
    needsTraining: bool(data, 'needsTraining'), additionalInfo: readText(data, 'additionalInfo', 5000),
  };
}

