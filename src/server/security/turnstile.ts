import { localDevelopment, localSecurityMode, publicOrigin } from './config.js';
const testSecrets = new Set(['1x0000000000000000000000000000000AA', '2x0000000000000000000000000000000AA', '3x0000000000000000000000000000000AA']);
export async function verifyTurnstile(token: unknown, action: 'contact' | 'brief'): Promise<boolean> {
  if (localSecurityMode() && token === 'development-only') return true;
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error('Security configuration unavailable');
  if (typeof token !== 'string' || !token || token.length > 2048) return false;
  const testing = testSecrets.has(secret);
  const hostname = new URL(publicOrigin()).hostname;
  // Dummy tokens carry synthetic metadata. Never allow them on a deployment.
  if (testing && (!localDevelopment() || !['localhost', '127.0.0.1'].includes(hostname) || token !== 'XXXX.DUMMY.TOKEN.XXXX')) return false;
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token }), signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error('Security service unavailable');
  const result = await response.json() as { success?: boolean; hostname?: string; action?: string };
  return result.success === true && (testing || (result.action === action && result.hostname === hostname));
}
