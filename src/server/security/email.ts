import { Resolver } from 'node:dns/promises';
import { domainToASCII } from 'node:url';
export function normalizeEmail(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length > 254 || /[\s\u0000-\u001f\u007f]/.test(trimmed)) throw new Error('Invalid email');
  const parts = trimmed.split('@');
  if (parts.length !== 2) throw new Error('Invalid email');
  const [local, rawDomain] = parts;
  const domain = domainToASCII(rawDomain).toLowerCase();
  if (!local || local.length > 64 || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local) || local.startsWith('.') || local.endsWith('.') || local.includes('..')) throw new Error('Invalid email');
  const labels = domain.split('.');
  if (labels.length < 2 || labels.some(label => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label)) || `${local}@${domain}`.length > 254) throw new Error('Invalid email');
  return `${local}@${domain}`;
}
type MxLookup = (domain: string) => Promise<{ exchange: string; priority: number }[]>;
export async function emailDomainStatus(email: string, lookup?: MxLookup): Promise<'valid' | 'invalid' | 'unavailable'> {
  const resolver = new Resolver({ timeout: 2000, tries: 1 });
  try {
    const records = await (lookup ?? resolver.resolveMx.bind(resolver))(email.split('@')[1]);
    return records.some(record => record.exchange && record.exchange !== '.') ? 'valid' : 'invalid';
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    return code === 'ENOTFOUND' || code === 'ENODATA' ? 'invalid' : 'unavailable';
  } finally { resolver.cancel(); }
}
