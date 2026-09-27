import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendContactEmail } from '../services/emailService';
import { apiCodes } from './apiErrors';
afterEach(() => vi.unstubAllGlobals());
describe('API error contract', () => {
  it.each(apiCodes)('extracts %s without passing technical details to the UI', async code => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ code, error: 'private details' }, { status: 400 })));
    const onError = vi.fn();
    expect(await sendContactEmail({ name: 'Ada', email: 'ada@example.com', message: 'x'.repeat(30) }, {}, onError)).toBe(false);
    expect(onError).toHaveBeenCalledWith(code);
  });
  it('handles non-JSON and network failures safely', async () => {
    const onError = vi.fn();
    const data = { name: 'Ada', email: 'ada@example.com', message: 'x'.repeat(30) };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('private details', { status: 500 })));
    await sendContactEmail(data, {}, onError);
    expect(onError).toHaveBeenLastCalledWith('server_error');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('private details')));
    await sendContactEmail(data, {}, onError);
    expect(onError).toHaveBeenLastCalledWith('server_error');
  });
});
