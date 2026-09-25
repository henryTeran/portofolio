import type { LanguageCode } from '../constants/i18n';

export const contactCopy: Record<LanguageCode, {
  eyebrow: string; title: string; intro: string; opportunity: string; opportunityText: string; project: string; projectText: string; brief: string; form: string;
}> = {
  fr: { eyebrow: '05 / COLLABORATION', title: 'Construisons quelque chose d’utile.', intro: 'Une opportunité professionnelle ou un projet précis ? Choisissez le chemin qui vous convient.', opportunity: 'Opportunité & collaboration', opportunityText: 'Recrutement, mission, partenariat ou simple échange : parlons de vos objectifs.', project: 'Un projet concret', projectText: 'Décrivez votre besoin, votre calendrier et votre budget dans le Project Brief.', brief: 'Décrire mon projet', form: 'Envoyer un message' },
  en: { eyebrow: '05 / COLLABORATION', title: 'Let’s build something useful.', intro: 'A career opportunity or a concrete project? Choose the path that fits.', opportunity: 'Opportunity & collaboration', opportunityText: 'Hiring, a project, a partnership or an introduction: let’s discuss your goals.', project: 'A concrete project', projectText: 'Share your needs, timeline and budget in the Project Brief.', brief: 'Describe my project', form: 'Send a message' },
  es: { eyebrow: '05 / COLABORACIÓN', title: 'Construyamos algo útil.', intro: '¿Una oportunidad profesional o un proyecto concreto? Elige el camino adecuado.', opportunity: 'Oportunidad y colaboración', opportunityText: 'Empleo, proyecto, colaboración o conversación: hablemos de tus objetivos.', project: 'Un proyecto concreto', projectText: 'Comparte tus necesidades, plazos y presupuesto en el Project Brief.', brief: 'Describir mi proyecto', form: 'Enviar un mensaje' },
};
