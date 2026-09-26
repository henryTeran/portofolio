export const limits = { name: 120, email: 254, phone: 50, company: 150, message: 2000, projectDescription: 4000, additionalInfo: 5000 } as const;
export const minimums = { name: 2, message: 30, projectDescription: 50 } as const;
export type Field = keyof typeof limits | 'projectType' | 'timeline' | 'budget';
export type Issue = 'required' | 'name' | 'email' | 'phone' | 'shortMessage' | 'shortDescription' | 'tooLong';
export function fieldIssue(field: Field, value: string): Issue | undefined {
  const text = value.trim();
  const max = field in limits ? limits[field as keyof typeof limits] : 100;
  if (text.length > max) return 'tooLong';
  if (['phone', 'company', 'additionalInfo'].includes(field) && !text) return;
  if (!text) return 'required';
  if (field === 'name' && text.length < minimums.name) return 'name';
  if (field === 'email') {
    const [local, domain, extra] = text.split('@');
    if (extra !== undefined || !local || local.length > 64 || !domain || /\s/.test(text) ||
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local) || local.startsWith('.') || local.endsWith('.') || local.includes('..')) return 'email';
    try {
      const ascii = new URL(`https://${domain}`).hostname;
      if (/[/:?#\\]/.test(domain) || ascii.split('.').length < 2 || ascii.split('.').some(label => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label))) return 'email';
    } catch { return 'email'; }
  }
  if (field === 'phone' && (!/^\+?[\d\s().-]+$/.test(text) || text.replace(/\D/g, '').length < 6 || text.replace(/\D/g, '').length > 15)) return 'phone';
  if (field === 'message' && text.length < minimums.message) return 'shortMessage';
  if (field === 'projectDescription' && text.length < minimums.projectDescription) return 'shortDescription';
}
export const contactFields: Field[] = ['name', 'email', 'message'];
export const briefSteps: Field[][] = [['name', 'email', 'phone', 'company'], ['projectType', 'projectDescription'], ['timeline', 'budget'], ['additionalInfo']];
export const invalidFields = (data: Partial<Record<Field, string>>, fields: Field[]) => fields.filter(field => fieldIssue(field, data[field] ?? ''));
