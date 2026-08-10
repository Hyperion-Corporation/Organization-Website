/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRITICAL: Added ./app and ./public/reports to scan for classes
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./public/reports/**/*.html"
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
      },
      colors: {
        slate: {
          850: '#1e293b',
          900: '#0f172a',
        },
        // Helios Forge brand scale — gold primary (not template blue)
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        helios: {
          gold: '#f59e0b',
          amber: '#fbbf24',
          ember: '#ea580c',
          cobalt: '#2563eb',
          teal: '#14b8a6',
          mint: '#2dd4bf',
          ink: '#070b14',
        },
      },
      boxShadow: {
        'helios-glow': '0 12px 40px rgb(245 158 11 / 0.22)',
      },
      backgroundImage: {
        'helios-action': 'linear-gradient(115deg, #b45309 0%, #c2410c 38%, #1d4ed8 100%)',
        'helios-text': 'linear-gradient(105deg, #fbbf24 8%, #60a5fa 52%, #2dd4bf)',
      },
    },
  },
  plugins: [],
}
