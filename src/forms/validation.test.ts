import { describe, expect, it } from 'vitest';
import { fieldIssue } from './validation';
import { apiCodes, apiErrorMessage } from './apiErrors';
describe('shared form rules', () => {
  it.each([['name', 'x', 'name'], ['name', '  Jo  ', undefined], ['email', 'a@b', 'email'], ['email', 'a..b@example.com', 'email'], ['email', 'visitor@example.com', undefined], ['phone', '', undefined], ['phone', '+33 (0)6 12 34 56 78', undefined], ['phone', 'hello', 'phone']] as const)('%s validates input', (field, value, issue) => expect(fieldIssue(field, value)).toBe(issue));
  it.each([['message', 30, 2000], ['projectDescription', 50, 4000]] as const)('%s trims and enforces both boundaries', (field, min, max) => {
    expect(fieldIssue(field, ' '.repeat(min))).toBe('required');
    expect(fieldIssue(field, 'x'.repeat(min - 1))).toBeTruthy();
    expect(fieldIssue(field, '  ' + 'x'.repeat(min) + '  ')).toBeUndefined();
    expect(fieldIssue(field, 'x'.repeat(max))).toBeUndefined();
    expect(fieldIssue(field, 'x'.repeat(max + 1))).toBe('tooLong');
  });
  it.each(['fr', 'en', 'es'])('maps all public errors in %s without reflecting server details', language => {
    for (const code of apiCodes) expect(apiErrorMessage(code, language)).not.toBe(code);
    expect(apiErrorMessage('secret stack trace', language)).toBe(apiErrorMessage('server_error', language));
  });
});
