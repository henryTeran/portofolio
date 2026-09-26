import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseEnv } from 'node:util';

// Vercel Dev can load .env without applying Vite's .env.local overrides.
// Never read local files on preview/production deployments.
if (process.env.NODE_ENV === 'development' && (!process.env.VERCEL || process.env.VERCEL_ENV === 'development')) {
  try {
    const values = parseEnv(readFileSync(resolve(process.cwd(), '.env.local'), 'utf8'));
    for (const [key, value] of Object.entries(values)) {
      if (key !== 'NODE_ENV' && !key.startsWith('VERCEL')) process.env[key] = value;
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw new Error('Local environment configuration unavailable');
  }
}
