import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    const root = document.documentElement;

    // Apply dark or light class
    root.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');

    // Update favicon dynamically
    const base = import.meta.env.BASE_URL || '/';
    const favicon = document.getElementById('favicon') as HTMLLinkElement | null;

    if (favicon) {
      favicon.href = dark
        ? `${base}favicon-dark_v2.png`
        : `${base}favicon-light_v2.png`;
    }
  }, [dark]);

  return (
    <button
      aria-label="Basculer thème"
      onClick={() => setDark(v => !v)}
      className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 transition"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
