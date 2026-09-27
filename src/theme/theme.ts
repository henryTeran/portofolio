export type ThemePreference = 'system' | 'light' | 'dark';
export function readTheme(): ThemePreference {
  try { const value = localStorage.getItem('theme'); return value === 'light' || value === 'dark' ? value : 'system'; }
  catch { return 'system'; }
}
export function applyTheme(preference: ThemePreference, systemDark: boolean) {
  const dark = preference === 'dark' || (preference === 'system' && systemDark);
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  const favicon = document.getElementById('favicon') as HTMLLinkElement | null;
  if (favicon) favicon.href = `${import.meta.env.BASE_URL}favicon-${dark ? 'dark' : 'light'}_v2.png`;
}
export function saveTheme(preference: ThemePreference) {
  try { if (preference === 'system') localStorage.removeItem('theme'); else localStorage.setItem('theme', preference); } catch { /* Session choice still applies. */ }
  window.dispatchEvent(new CustomEvent('theme-preference', { detail: preference }));
}
