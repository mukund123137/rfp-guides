import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1d63d8',
          700: '#1a4fad',
          800: '#1a428b',
          900: '#1b3a72',
          950: '#132449',
        },
        ink: {
          50: '#f7f8f9',
          100: '#eceef1',
          200: '#d9dde3',
          300: '#b6bec9',
          400: '#8b96a6',
          500: '#68738a',
          600: '#4f5a70',
          700: '#3c465a',
          800: '#28303f',
          900: '#161c27',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      maxWidth: {
        prose: '46rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(22, 28, 39, 0.04), 0 8px 24px -12px rgba(22, 28, 39, 0.12)',
        'card-hover':
          '0 1px 2px rgba(22, 28, 39, 0.06), 0 18px 40px -16px rgba(26, 79, 173, 0.24)',
      },
      transitionTimingFunction: {
        subtle: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
