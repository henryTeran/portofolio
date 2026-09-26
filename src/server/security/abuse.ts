import type { ContactMessage, ProjectBriefMessage } from '../mail/types';
import { privateFingerprint } from './rateLimit';
import { securityStore, type SecurityStore } from './store';
// Small server-only vocabulary; single quoted/descriptive words do not trigger rejection.
export const ABUSE_TERMS = ['connard', 'connasse', 'salaud', 'putain', 'fuck', 'fucking', 'asshole', 'bitch', 'idiota', 'cabron', 'mierda', 'gilipollas'];
export const normalizeText = (text: string) => text.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/\s+/g, ' ').trim();
export function abuseScore(text: string, terms: readonly string[] = ABUSE_TERMS): number {
  const normalized = normalizeText(text);
  const words = normalized.match(/[\p{L}\p{N}]+/gu) ?? [];
  const insultCount = words.filter(word => terms.includes(word)).length;
  const links = normalized.match(/https?:\/\/|www\./g) ?? [];
  let score = 0;
  if (links.length > 5) score += 5;
  if (/(.)\1{19,}/u.test(normalized)) score += 3;
  if (words.length > 8 && new Set(words).size <= 2) score += 5;
  if (insultCount >= 3 && insultCount / Math.max(words.length, 1) >= .4) score += 5;
  if ((normalized.match(/\p{L}/gu) ?? []).length < 8) score += 3;
  if (/javascript:|data:text\/html|buy followers|casino bonus/.test(normalized)) score += 2;
  return score;
}
export function messageText(message: ContactMessage | ProjectBriefMessage): string {
  return 'message' in message ? message.message : `${message.projectDescription} ${message.additionalInfo ?? ''}`;
}
export function duplicateKey(message: ContactMessage | ProjectBriefMessage, kind: string): string {
  const fields = Object.entries(message).filter(([key]) => key !== 'submittedAt').sort(([a], [b]) => a.localeCompare(b));
  return `duplicate:${privateFingerprint(kind + normalizeText(JSON.stringify(fields)))}`;
}
export async function reserveSubmission(message: ContactMessage | ProjectBriefMessage, kind: string, store: SecurityStore = securityStore()): Promise<boolean> {
  return store.set(duplicateKey(message, kind), '1', 900, true);
}
