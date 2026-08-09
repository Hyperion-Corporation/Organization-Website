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
        primary: {
          500: '#3b82f6',
          600: '#2563eb',
        }
      }
    },
  },
  plugins: [],
}