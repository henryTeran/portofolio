// src/services/email.service.ts
import emailjs from '@emailjs/browser';
import i18next from 'i18next';

const SERVICE_ID   = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const PUBLIC_KEY   = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const TPL_CONTACT  = import.meta.env.VITE_EMAILJS_TPL_CONTACT as string;
const TPL_QUOTE    = import.meta.env.VITE_EMAILJS_TPL_QUOTE as string;

// Email de réception (utile si tu veux aussi le passer côté template)
const RECEIVER_EMAIL = 'teranhenryc@gmail.com';

/* ----------------------------- Types publics ----------------------------- */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface QuoteFormData {
  // Infos client
  name: string;
  email: string;
  phone?: string;
  company?: string;

  // Projet
  projectType: string;
  projectDescription: string;
  features: string[];      // ex: ["auth","stripe"]
  technologies: string[];  // ex: ["React","Node"]

  // Planning
  timeline?: string;       // ex: "4-6 semaines"
  budget?: string;         // ex: "5-8k€"
  urgency?: string;        // ex: "Haute/Moyenne/Basse"

  // Services
  hasDesign?: boolean;
  needsHosting?: boolean;
  needsMaintenance?: boolean;
  needsTraining?: boolean;

  // Infos sup
  additionalInfo?: string;
}

/* ------------------------------ Utils internes --------------------------- */
const boolToYesNo = (v?: boolean) => (v ? 'Oui' : 'Non');
const safeJoin = (arr?: string[]) =>
  Array.isArray(arr) ? arr.filter(Boolean).join(', ') : '';

const nowString = () => new Date().toLocaleString();

const currentLang = () => (i18next?.language || 'fr');

/* ------------------------------ Initialisation --------------------------- */
export const initEmailJS = () => {
  if (!PUBLIC_KEY) {
    console.warn('[EmailJS] PUBLIC_KEY manquant');
    return;
  }
  emailjs.init(PUBLIC_KEY);
};

/* ------------------------------ Contact simple --------------------------- */
export const sendContactEmail = async (formData: ContactFormData, extras?: {
  sourcePage?: string; // ex: window.location.pathname
  tags?: string;       // ex: "lead, portfolio"
}): Promise<boolean> => {
  try {
    const templateParams = {
      title: 'Portfolio Contact',                 // ajoute si tu veux garder {{title}}
      name: String(formData.name || ''),
      email: String(formData.email || ''),
      message: String(formData.message || ''),
      reply_to: String(formData.email || ''),
      to_email: 'teranhenryc@gmail.com',
      time: new Date().toLocaleString(),
      lang: (i18next.language || 'fr') + '',
      source_page: String(extras?.sourcePage || window.location.pathname || ''),
      tags: String(extras?.tags || '')
    };
    console.log('[EmailJS params]', templateParams);
    await emailjs.send(SERVICE_ID, TPL_CONTACT, templateParams, PUBLIC_KEY);
    return true;
  } catch (error) {
    console.error('[EmailJS] Échec envoi contact :', error);
    return false;
  }
};

/* ------------------------------ Demande de devis ------------------------- */
export const sendQuoteEmail = async (formData: QuoteFormData): Promise<boolean> => {
  try {
    const templateParams = {
      // === INFORMATIONS CLIENT ===
      client_name: formData.name,
      client_email: formData.email,
      client_phone: formData.phone || '',
      client_company: formData.company || '',

      // === PROJET ===
      project_type: formData.projectType,
      project_description: formData.projectDescription,
      project_features: safeJoin(formData.features),
      project_technologies: safeJoin(formData.technologies),

      // === PLANNING ===
      project_timeline: formData.timeline || '',
      project_budget: formData.budget || '',
      project_urgency: formData.urgency || '',

      // === SERVICES SUPPLÉMENTAIRES ===
      needs_design:       boolToYesNo(formData.hasDesign),
      needs_hosting:      boolToYesNo(formData.needsHosting),
      needs_maintenance:  boolToYesNo(formData.needsMaintenance),
      needs_training:     boolToYesNo(formData.needsTraining),

      // === INFORMATIONS SUPPLÉMENTAIRES ===
      additional_info: formData.additionalInfo || '',

      // meta
      to_email: RECEIVER_EMAIL,
      reply_to: formData.email,
      time: nowString(),
      lang: currentLang(),
    };

    await emailjs.send(SERVICE_ID, TPL_QUOTE, templateParams, PUBLIC_KEY);
    return true;
  } catch (error) {
    console.error('[EmailJS] Échec envoi devis :', error);
    return false;
  }
};
