import { afterEach, expect, it } from 'vitest';
import { applyTheme, readTheme, saveTheme } from './theme';
afterEach(() => { localStorage.removeItem('theme'); document.documentElement.classList.remove('dark'); });
it('defaults to the system and follows both system palettes', () => {
  expect(readTheme()).toBe('system');
  applyTheme('system', true); expect(document.documentElement).toHaveClass('dark');
  applyTheme('system', false); expect(document.documentElement).not.toHaveClass('dark');
});
it('persists an override and resets to system without overwriting the preference on application', () => {
  saveTheme('light'); applyTheme(readTheme(), true); expect(document.documentElement).not.toHaveClass('dark');
  expect(readTheme()).toBe('light');
  saveTheme('dark'); applyTheme(readTheme(), false); expect(document.documentElement).toHaveClass('dark');
  saveTheme('system'); expect(readTheme()).toBe('system'); applyTheme(readTheme(), false); expect(document.documentElement).not.toHaveClass('dark');
});
