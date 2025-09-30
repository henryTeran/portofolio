import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_SERVICE_ID = 'service_portfolio'; // À configurer dans EmailJS
const EMAILJS_TEMPLATE_ID = 'template_contact'; // Template pour contact simple
const EMAILJS_QUOTE_TEMPLATE_ID = 'template_quote'; // Template pour demande de devis
const EMAILJS_PUBLIC_KEY = 'your_public_key'; // À configurer dans EmailJS

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface QuoteFormData {
  // Informations personnelles
  name: string;
  email: string;
  phone: string;
  company: string;
  
  // Détails du projet
  projectType: string;
  projectDescription: string;
  features: string[];
  technologies: string[];
  
  // Timeline et budget
  timeline: string;
  budget: string;
  urgency: string;
  
  // Besoins spécifiques
  hasDesign: boolean;
  needsHosting: boolean;
  needsMaintenance: boolean;
  needsTraining: boolean;
  
  // Informations supplémentaires
  additionalInfo: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'teranhenryc@gmail.com',
      reply_to: formData.email,
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
};

export const sendQuoteEmail = async (formData: QuoteFormData): Promise<boolean> => {
  try {
    const templateParams = {
      // Informations client
      client_name: formData.name,
      client_email: formData.email,
      client_phone: formData.phone,
      client_company: formData.company,
      
      // Projet
      project_type: formData.projectType,
      project_description: formData.projectDescription,
      project_features: formData.features.join(', '),
      project_technologies: formData.technologies.join(', '),
      
      // Planning
      project_timeline: formData.timeline,
      project_budget: formData.budget,
      project_urgency: formData.urgency,
      
      // Services
      needs_design: formData.hasDesign ? 'Oui' : 'Non',
      needs_hosting: formData.needsHosting ? 'Oui' : 'Non',
      needs_maintenance: formData.needsMaintenance ? 'Oui' : 'Non',
      needs_training: formData.needsTraining ? 'Oui' : 'Non',
      
      // Infos supplémentaires
      additional_info: formData.additionalInfo,
      
      // Email de destination
      to_email: 'teranhenryc@gmail.com',
      reply_to: formData.email,
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_QUOTE_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la demande de devis:', error);
    return false;
  }
};

// Initialisation d'EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
};