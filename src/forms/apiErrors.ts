export const apiCodes = ['invalid_input', 'invalid_email', 'invalid_domain', 'message_too_short', 'description_too_short', 'turnstile_unavailable', 'turnstile_failed', 'rate_limited', 'duplicate_request', 'abusive_content', 'verification_required', 'smtp_error', 'server_error'] as const;
export type ApiCode = typeof apiCodes[number];
export const apiCode = (value: unknown): ApiCode => typeof value === 'string' && apiCodes.includes(value as ApiCode) ? value as ApiCode : 'server_error';
export class PublicFormError extends Error {
  constructor(public readonly code: ApiCode) { super(code); }
}
const messages: Record<'fr' | 'en' | 'es', Record<ApiCode, string>> = {
  fr: {
    invalid_input: 'Vérifiez les champs du formulaire avant de réessayer.', invalid_email: 'Veuillez saisir une adresse email valide.', invalid_domain: 'Ce domaine email ne peut pas recevoir de courrier. Vérifiez votre adresse.',
    message_too_short: 'Votre message doit contenir au moins 30 caractères.', description_too_short: 'La description du projet doit contenir au moins 50 caractères.',
    turnstile_unavailable: 'La vérification de sécurité est indisponible. Réessayez plus tard.', turnstile_failed: 'La vérification de sécurité a échoué. Veuillez réessayer.', rate_limited: 'Trop de tentatives. Réessayez dans quelques minutes.', duplicate_request: 'Cette demande semble avoir déjà été envoyée. Vérifiez votre boîte email.', abusive_content: 'Veuillez reformuler votre demande et limiter les liens.', verification_required: 'Vérifiez votre boîte email pour confirmer votre demande.', smtp_error: 'Le service email est temporairement indisponible. Réessayez plus tard.', server_error: 'Le service est temporairement indisponible. Réessayez plus tard.',
  },
  en: {
    invalid_input: 'Check the form fields before trying again.', invalid_email: 'Please enter a valid email address.', invalid_domain: 'This email domain cannot receive mail. Check your address.',
    message_too_short: 'Your message must contain at least 30 characters.', description_too_short: 'The project description must contain at least 50 characters.',
    turnstile_unavailable: 'Security verification is unavailable. Try again later.', turnstile_failed: 'Security verification failed. Please try again.', rate_limited: 'Too many attempts. Try again in a few minutes.', duplicate_request: 'This request appears to have already been submitted. Check your inbox.', abusive_content: 'Please rephrase your request and limit links.', verification_required: 'Check your inbox to confirm your request.', smtp_error: 'The email service is temporarily unavailable. Try again later.', server_error: 'The service is temporarily unavailable. Try again later.',
  },
  es: {
    invalid_input: 'Revisa los campos del formulario antes de volver a intentarlo.', invalid_email: 'Introduce una dirección de correo válida.', invalid_domain: 'Este dominio no puede recibir correo. Revisa tu dirección.',
    message_too_short: 'Tu mensaje debe contener al menos 30 caracteres.', description_too_short: 'La descripción del proyecto debe contener al menos 50 caracteres.',
    turnstile_unavailable: 'La verificación de seguridad no está disponible. Inténtalo más tarde.', turnstile_failed: 'La verificación de seguridad ha fallado. Vuelve a intentarlo.', rate_limited: 'Demasiados intentos. Vuelve a intentarlo en unos minutos.', duplicate_request: 'Esta solicitud parece haberse enviado ya. Revisa tu correo.', abusive_content: 'Reformula tu solicitud y limita los enlaces.', verification_required: 'Revisa tu correo para confirmar tu solicitud.', smtp_error: 'El servicio de correo no está disponible temporalmente. Inténtalo más tarde.', server_error: 'El servicio no está disponible temporalmente. Inténtalo más tarde.',
  },
};
export const formLanguage = (language: string): 'fr' | 'en' | 'es' => language.startsWith('fr') ? 'fr' : language.startsWith('es') ? 'es' : 'en';
export const apiErrorMessage = (code: unknown, language: string) => messages[formLanguage(language)][apiCode(code)];
