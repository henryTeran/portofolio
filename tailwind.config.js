/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter','system-ui','sans-serif'],
        display: ['Sora','Inter','system-ui']
      },
      boxShadow: {
        soft:'0 6px 24px rgba(0,0,0,.25)',
        ring:'0 0 0 1px rgba(255,255,255,.06) inset'
      }
    },
  },
  plugins: [],
};
