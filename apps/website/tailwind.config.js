/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(var(--primary-h) var(--primary-s) 95%)',
          100: 'hsl(var(--primary-h) var(--primary-s) 90%)',
          200: 'hsl(var(--primary-h) var(--primary-s) 80%)',
          300: 'hsl(var(--primary-h) var(--primary-s) 70%)',
          400: 'hsl(var(--primary-h) var(--primary-s) 60%)',
          500: 'hsl(var(--primary-h) var(--primary-s) var(--primary-l))',
          600: 'hsl(var(--primary-h) var(--primary-s) calc(var(--primary-l) - 10%))',
          700: 'hsl(var(--primary-h) var(--primary-s) calc(var(--primary-l) - 20%))',
          800: 'hsl(var(--primary-h) var(--primary-s) calc(var(--primary-l) - 30%))',
          900: 'hsl(var(--primary-h) var(--primary-s) calc(var(--primary-l) - 40%))',
        },
      },
    },
  },
  plugins: [],
}
