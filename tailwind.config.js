/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0faf4',
          100: '#dcf0e5',
          200: '#b8e3cc',
          300: '#86c5a4',
          400: '#4fa87a',
          500: '#2d8f5e',
          600: '#1a7348',
          700: '#1a5c3a',
          800: '#174a30',
          900: '#143d29',
        }
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      }
    },
  },
  plugins: [],
}
