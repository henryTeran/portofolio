export const SUPPORTED_LANGUAGES = ['fr', 'en', 'es'] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export const LANGUAGE_SET = new Set<string>(SUPPORTED_LANGUAGES);

export const isSupportedLanguage = (language: string): language is LanguageCode =>
  LANGUAGE_SET.has(language);

export const getPreferredLanguage = (language?: string | null): LanguageCode => {
  if (!language) {
    return DEFAULT_LANGUAGE;
  }

  const normalizedLanguage = language.toLowerCase().split('-')[0];
  return isSupportedLanguage(normalizedLanguage) ? normalizedLanguage : DEFAULT_LANGUAGE;
};
