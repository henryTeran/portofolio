import { afterEach, expect, it, vi } from 'vitest';
import { logMailFailure } from './mailer';

afterEach(() => vi.restoreAllMocks());

it('logs only approved SMTP categories, never provider messages or credentials', () => {
  const log = vi.spyOn(console, 'warn').mockImplementation(() => {});
  logMailFailure({ code: 'EAUTH', message: 'private credentials', response: 'private recipient', command: 'AUTH private' });
  logMailFailure({ code: 'private credentials' });
  logMailFailure(new Error('private credentials'));
  expect(log.mock.calls).toEqual([
    ['[mail-security] smtp:EAUTH'], ['[mail-security] smtp:UNKNOWN'], ['[mail-security] smtp:UNKNOWN'],
  ]);
});
