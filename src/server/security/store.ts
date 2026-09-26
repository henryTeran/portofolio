import { randomUUID } from 'node:crypto';
import { localSecurityMode } from './config';

export interface SecurityStore {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds: number, onlyIfAbsent?: boolean): Promise<boolean>;
  take(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;
  limit(key: string, maximum: number, windowSeconds: number): Promise<boolean>;
}
const prefix = 'portfolio:security:v1:';
export class RedisSecurityStore implements SecurityStore {
  constructor(private url: string, private token: string) {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.search || parsed.hash) throw new Error('Storage configuration unavailable');
  }
  private async command<T>(command: (string | number)[]): Promise<T> {
    const response = await fetch(this.url, { method: 'POST', headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(command), signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error('Security storage unavailable');
    const data = await response.json() as { result: T; error?: string };
    if (data.error) throw new Error('Security storage unavailable');
    return data.result;
  }
  get(key: string) { return this.command<string | null>(['GET', prefix + key]); }
  async set(key: string, value: string, ttl: number, nx = false) { return await this.command(['SET', prefix + key, value, 'EX', ttl, ...(nx ? ['NX'] : [])]) === 'OK'; }
  take(key: string) { return this.command<string | null>(['EVAL', "local v=redis.call('GET',KEYS[1]); if v then redis.call('DEL',KEYS[1]) end; return v", 1, prefix + key]); }
  async delete(key: string) { await this.command(['DEL', prefix + key]); }
  async limit(key: string, maximum: number, window: number) {
    const script = "local t=redis.call('TIME'); local now=t[1]*1000+math.floor(t[2]/1000); redis.call('ZREMRANGEBYSCORE',KEYS[1],'-inf',now-ARGV[1]); if redis.call('ZCARD',KEYS[1])>=tonumber(ARGV[2]) then return 0 end; redis.call('ZADD',KEYS[1],now,ARGV[3]); redis.call('PEXPIRE',KEYS[1],ARGV[1]); return 1";
    return await this.command<number>(['EVAL', script, 1, prefix + key, window * 1000, maximum, randomUUID()]) === 1;
  }
}
// Only for explicit local development and isolated unit tests. Never selected on Vercel.
export class MemorySecurityStore implements SecurityStore {
  private values = new Map<string, { value: string; expires: number }>();
  private windows = new Map<string, number[]>();
  async get(key: string) {
    const entry = this.values.get(key);
    if (entry && entry.expires > Date.now()) return entry.value;
    this.values.delete(key); return null;
  }
  async set(key: string, value: string, ttl: number, nx = false) {
    const existing = this.values.get(key);
    if (nx && existing && existing.expires > Date.now()) return false;
    for (const [name, entry] of this.values) if (entry.expires <= Date.now()) this.values.delete(name);
    if (this.values.size >= 5000 && !existing) throw new Error('Local storage full');
    this.values.set(key, { value, expires: Date.now() + ttl * 1000 }); return true;
  }
  async take(key: string) {
    const entry = this.values.get(key); this.values.delete(key);
    return entry && entry.expires > Date.now() ? entry.value : null;
  }
  async delete(key: string) { this.values.delete(key); }
  async limit(key: string, maximum: number, window: number) {
    const now = Date.now();
    const times = (this.windows.get(key) ?? []).filter(time => time > now - window * 1000);
    if (times.length >= maximum) return false;
    times.push(now); this.windows.set(key, times); return true;
  }
}
let localStore: MemorySecurityStore | undefined;
export function securityStore(): SecurityStore {
  if (localSecurityMode()) return localStore ??= new MemorySecurityStore();
  const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token } = process.env;
  if (!url || !token) throw new Error('Security storage not configured');
  return new RedisSecurityStore(url, token);
}
