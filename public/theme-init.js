// Runs before styles and React; same-origin script is compatible with the CSP.
(function () {
  var preference = 'system';
  try { var saved = localStorage.getItem('theme'); if (saved === 'dark' || saved === 'light') preference = saved; } catch (_) {}
  var dark = preference === 'dark' || (preference === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
})();
