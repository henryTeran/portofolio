import { formLanguage } from './apiErrors';
const copy = {
  en: {
    required: 'This field is required.', name: 'Enter between 2 and 120 characters.', email: 'Please enter a valid email address.', phone: 'Enter a phone number with 6 to 15 digits.', shortMessage: 'Your message must contain at least 30 characters.', shortDescription: 'Describe your project in at least 50 characters.', tooLong: 'The maximum length has been exceeded.',
    valid: 'Valid', optional: 'Optional', minimum: 'characters minimum', maximum: 'maximum', detailedMessage: 'Message is detailed enough', detailedDescription: 'Description is detailed enough',
    missing: 'Complete the following:', security: 'Security verification', contactReady: 'Your message is ready to send.', briefReady: 'Your project brief is ready to send.', stepReady: 'This step is ready. You can continue.', sending: 'Submitting…',
    contactSuccess: 'Check your inbox to confirm your request.', briefSuccess: 'Your project brief has been saved. Check your email to confirm submission.',
    labels: { name: 'Name', email: 'Email format', message: 'Message', phone: 'Phone', company: 'Company', projectType: 'Project type', projectDescription: 'Description', timeline: 'Timeline', budget: 'Budget', additionalInfo: 'Additional information', information: 'Information', project: 'Project', planning: 'Planning' },
  },
  fr: {
    required: 'Ce champ est requis.', name: 'Saisissez entre 2 et 120 caractères.', email: 'Veuillez saisir une adresse email valide.', phone: 'Saisissez un numéro contenant entre 6 et 15 chiffres.', shortMessage: 'Votre message doit contenir au moins 30 caractères.', shortDescription: 'Décrivez votre projet en au moins 50 caractères.', tooLong: 'La longueur maximale est dépassée.',
    valid: 'Valide', optional: 'Facultatif', minimum: 'caractères minimum', maximum: 'maximum', detailedMessage: 'Message suffisamment détaillé', detailedDescription: 'Description suffisamment détaillée',
    missing: 'À compléter :', security: 'Vérification de sécurité', contactReady: 'Votre message est prêt à être envoyé.', briefReady: 'Votre brief est prêt à être envoyé.', stepReady: 'Cette étape est prête. Vous pouvez continuer.', sending: 'Envoi en cours…',
    contactSuccess: 'Vérifiez votre boîte email pour confirmer votre demande.', briefSuccess: 'Votre brief a été enregistré. Vérifiez votre email pour confirmer l’envoi.',
    labels: { name: 'Nom', email: 'Format email', message: 'Message', phone: 'Téléphone', company: 'Entreprise', projectType: 'Type de projet', projectDescription: 'Description', timeline: 'Délai', budget: 'Budget', additionalInfo: 'Informations supplémentaires', information: 'Informations', project: 'Projet', planning: 'Planning' },
  },
  es: {
    required: 'Este campo es obligatorio.', name: 'Introduce entre 2 y 120 caracteres.', email: 'Introduce una dirección de correo válida.', phone: 'Introduce un teléfono de entre 6 y 15 dígitos.', shortMessage: 'Tu mensaje debe contener al menos 30 caracteres.', shortDescription: 'Describe tu proyecto en al menos 50 caracteres.', tooLong: 'Se ha superado la longitud máxima.',
    valid: 'Válido', optional: 'Opcional', minimum: 'caracteres mínimos', maximum: 'máximo', detailedMessage: 'El mensaje tiene suficiente detalle', detailedDescription: 'La descripción tiene suficiente detalle',
    missing: 'Por completar:', security: 'Verificación de seguridad', contactReady: 'Tu mensaje está listo para enviarse.', briefReady: 'Tu brief está listo para enviarse.', stepReady: 'Esta etapa está lista. Puedes continuar.', sending: 'Enviando…',
    contactSuccess: 'Revisa tu correo para confirmar tu solicitud.', briefSuccess: 'Tu brief ha sido registrado. Revisa tu correo para confirmar el envío.',
    labels: { name: 'Nombre', email: 'Formato de correo', message: 'Mensaje', phone: 'Teléfono', company: 'Empresa', projectType: 'Tipo de proyecto', projectDescription: 'Descripción', timeline: 'Plazo', budget: 'Presupuesto', additionalInfo: 'Información adicional', information: 'Información', project: 'Proyecto', planning: 'Planificación' },
  },
};
export const formCopy = (language: string) => copy[formLanguage(language)];
