import './localEnv.js';
export const localDevelopment = () => process.env.NODE_ENV === 'development' && (!process.env.VERCEL || process.env.VERCEL_ENV === 'development');
export const localSecurityMode = () => process.env.CONTACT_SECURITY_DEV_MODE === 'true' && localDevelopment();
export function publicOrigin(): string {
  const url = new URL(process.env.CONTACT_PUBLIC_URL ?? '');
  if (url.username || url.password || (url.protocol !== 'https:' && !(localDevelopment() && url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname)))) throw new Error('Security configuration unavailable');
  return url.origin;
}
