/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9', // sky-500
          light: '#38bdf8',   // sky-400
          dark: '#0284c7',    // sky-600
        },
        accent: '#f472b6',    // pink-400
        background: {
          light: '#ffffff',
          dark: '#1e293b',    // slate-800
        },
        text: {
          light: '#1e293b',   // slate-800
          dark: '#f1f5f9',    // slate-100
        }
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'sans': ['Segoe UI', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
