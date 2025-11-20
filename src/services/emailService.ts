import emailjs from '@emailjs/browser';
import i18next from 'i18next';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const TPL_CONTACT = import.meta.env.VITE_EMAILJS_TPL_CONTACT as string;
const TPL_QUOTE = import.meta.env.VITE_EMAILJS_TPL_QUOTE as string;

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  projectDescription: string;
  features: string[];
  technologies: string[];
  timeline?: string;
  budget?: string;
  urgency?: string;
  hasDesign?: boolean;
  needsHosting?: boolean;
  needsMaintenance?: boolean;
  needsTraining?: boolean;
  additionalInfo?: string;
}

const sanitizeString = (value: any): string => {
  if (value === null || value === undefined) return '';
  return String(value).trim();
};

const boolToYesNo = (value?: boolean): string => {
  const lang = getCurrentLang();
  if (lang.startsWith('en')) return value ? 'Yes' : 'No';
  if (lang.startsWith('es')) return value ? 'Sí' : 'No';
  // default french
  return value ? 'Oui' : 'Non';
};

const arrayToString = (arr?: string[]): string => {
  if (!Array.isArray(arr) || arr.length === 0) return '';
  return arr.filter(Boolean).join(', ');
};

const getCurrentTime = (): string => {
  return new Date().toLocaleString('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'short'
  });
};

const getCurrentLang = (): string => {
  return i18next?.language || 'fr';
};

export const initEmailJS = (): void => {
  if (!PUBLIC_KEY) {
    console.warn('[EmailJS] PUBLIC_KEY manquant dans .env');
    return;
  }
  try {
    emailjs.init(PUBLIC_KEY);
    console.log('[EmailJS] Initialisé avec succès');
  } catch (error) {
    console.error('[EmailJS] Erreur lors de l\'initialisation:', error);
  }
};

const normalizeTemplateParams = (params: Record<string, unknown>): Record<string, string> => {
  const out: Record<string, string> = {};
  Object.keys(params).forEach((k) => {
    const v = params[k];
    if (v === null || v === undefined) {
      out[k] = '';
      return;
    }

    // Arrays -> comma-separated
    if (Array.isArray(v)) {
      out[k] = (v as unknown[]).filter(Boolean).join(', ');
      return;
    }

    if (typeof v === 'object') {
      try {
        out[k] = JSON.stringify(v);
      } catch {
        out[k] = String(v);
      }
      return;
    }

    out[k] = String(v);
  });
  return out;
};

export const sendContactEmail = async (
  formData: ContactFormData,
  extras?: {
    sourcePage?: string;
    tags?: string;
  }
): Promise<boolean> => {
  try {
    if (!formData.name || !formData.email || !formData.message) {
      console.error('[EmailJS] Données du formulaire incomplètes');
      return false;
    }

    const templateParams = {
      name: sanitizeString(formData.name),
      email: sanitizeString(formData.email),
      message: sanitizeString(formData.message),
      reply_to: sanitizeString(formData.email),
      time: getCurrentTime(),
      lang: getCurrentLang(),
      source_page: sanitizeString(extras?.sourcePage || window.location.pathname),
      tags: sanitizeString(extras?.tags || '')
    };

    console.log('[EmailJS Contact] Envoi avec les paramètres:', templateParams);

    if (!SERVICE_ID || !TPL_CONTACT) {
      console.error('[EmailJS Contact] SERVICE_ID ou TPL_CONTACT manquant dans .env');
      return false;
    }

    const safeParams = normalizeTemplateParams(templateParams);

    try {
      const response = await emailjs.send(
        SERVICE_ID,
        TPL_CONTACT,
        safeParams,
        PUBLIC_KEY
      );
      console.log('[EmailJS Contact] Succès:', response);
    } catch (err: unknown) {
      console.error('[EmailJS Contact] Erreur lors de l\'envoi (détails):', err);
      if (err && typeof err === 'object') {
        const eObj = err as Record<string, unknown>;
        if (eObj.status) console.error('[EmailJS Contact] status:', eObj.status);
        if (eObj.text) console.error('[EmailJS Contact] body:', eObj.text);
      }
      throw err;
    }
    return true;
  } catch (error) {
    console.error('[EmailJS Contact] Erreur:', error);
    return false;
  }
};

export const sendQuoteEmail = async (formData: QuoteFormData): Promise<boolean> => {
  try {
    if (!formData.name || !formData.email || !formData.projectType || !formData.projectDescription) {
      console.error('[EmailJS] Données du devis incomplètes');
      return false;
    }

    const templateParams = {
      client_name: sanitizeString(formData.name),
      client_email: sanitizeString(formData.email),
      client_phone: sanitizeString(formData.phone || ''),
      client_company: sanitizeString(formData.company || ''),

      project_type: sanitizeString(formData.projectType),
      project_description: sanitizeString(formData.projectDescription),
      project_features: arrayToString(formData.features),
      project_technologies: arrayToString(formData.technologies),

      project_timeline: sanitizeString(formData.timeline || ''),
      project_budget: sanitizeString(formData.budget || ''),
      project_urgency: sanitizeString(formData.urgency || ''),

      needs_design: boolToYesNo(formData.hasDesign),
      needs_hosting: boolToYesNo(formData.needsHosting),
      needs_maintenance: boolToYesNo(formData.needsMaintenance),
      needs_training: boolToYesNo(formData.needsTraining),

      additional_info: sanitizeString(formData.additionalInfo || ''),

      reply_to: sanitizeString(formData.email),
      time: getCurrentTime(),
      lang: getCurrentLang()
    };

    console.log('[EmailJS Quote] Envoi avec les paramètres:', templateParams);

    if (!SERVICE_ID || !TPL_QUOTE) {
      console.error('[EmailJS Quote] SERVICE_ID ou TPL_QUOTE manquant dans .env');
      return false;
    }

    const safeParams = normalizeTemplateParams(templateParams);

    try {
      const response = await emailjs.send(
        SERVICE_ID,
        TPL_QUOTE,
        safeParams,
        PUBLIC_KEY
      );
      console.log('[EmailJS Quote] Succès:', response);
    } catch (err: unknown) {
      console.error('[EmailJS Quote] Erreur lors de l\'envoi (détails):', err);
      if (err && typeof err === 'object') {
        const eObj = err as Record<string, unknown>;
        if (eObj.status) console.error('[EmailJS Quote] status:', eObj.status);
        if (eObj.text) console.error('[EmailJS Quote] body:', eObj.text);
      }
      throw err;
    }
    return true;
  } catch (error) {
    console.error('[EmailJS Quote] Erreur:', error);
    return false;
  }
};

export const validateContactForm = (formData: ContactFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.name || formData.name.trim().length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email.trim())) {
    errors.push('L\'email n\'est pas valide');
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateQuoteForm = (formData: QuoteFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.name || formData.name.trim().length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email.trim())) {
    errors.push('L\'email n\'est pas valide');
  }

  if (!formData.projectType) {
    errors.push('Veuillez sélectionner un type de projet');
  }

  if (!formData.projectDescription || formData.projectDescription.trim().length < 20) {
    errors.push('La description du projet doit contenir au moins 20 caractères');
  }

  if (!formData.timeline) {
    errors.push('Veuillez sélectionner un délai');
  }

  if (!formData.budget) {
    errors.push('Veuillez sélectionner un budget');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
 