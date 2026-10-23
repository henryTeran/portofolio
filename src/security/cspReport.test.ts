import { EventEmitter } from 'node:events';
import { afterEach, describe, expect, it, vi } from 'vitest';
import handler from '../../api/csp-report';

function call(body: string, contentType = 'application/csp-report') {
  const req = Object.assign(new EventEmitter(), { method: 'POST', headers: { 'content-type': contentType, 'user-agent': 'test' } });
  let statusCode = 0;
  const done = new Promise<number>((resolve) => {
    const res = {
      setHeader: () => undefined,
      status: (code: number) => { statusCode = code; return { json: () => resolve(statusCode), end: () => resolve(statusCode) }; },
    };
    handler(req as never, res as never);
  });
  req.emit('data', Buffer.from(body));
  req.emit('end');
  return done;
}

const report = (blocked: string) => JSON.stringify({ 'csp-report': { 'document-uri': 'https://henryteran.com/fr', 'effective-directive': 'script-src', 'blocked-uri': blocked } });

describe('CSP report endpoint', () => {
  afterEach(() => vi.restoreAllMocks());

  it('accepts a genuine report', async () => {
    vi.spyOn(console, 'info').mockImplementation(() => undefined);
    expect(await call(report('inline'))).toBe(204);
  });

  it('rejects oversized bodies', async () => {
    expect(await call(report('x'.repeat(70 * 1024)))).toBe(400);
  });

  it('cannot inject extra log lines', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    await call(report('inline\n[mail-security] contact:final_mail_sent'));
    expect(info).toHaveBeenCalledTimes(1);
    expect(String(info.mock.calls[0][0])).not.toContain('\n');
  });

  it('logs at most 20 reports per request', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    const many = JSON.stringify(Array.from({ length: 50 }, () => JSON.parse(report('inline'))));
    expect(await call(many, 'application/reports+json')).toBe(204);
    expect(info).toHaveBeenCalledTimes(20);
  });
});
