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
          50: '#f0f4ff',
          100: '#dfe7fe',
          200: '#c3d1fd',
          300: '#9bb2fa',
          400: '#6d89f4',
          500: '#4762e9',
          600: '#3243d6',
          700: '#2a35b4',
          800: '#252e8f',
          900: '#222c72',
          950: '#161c44',
        },
        ink: {
          50: '#f8f8f7',
          100: '#eeeeec',
          200: '#dcdcd8',
          300: '#b9b9b3',
          400: '#8f8f88',
          500: '#6b6b64',
          600: '#52524c',
          700: '#3e3e39',
          800: '#292926',
          900: '#161614',
        },
        /* Warm off-white grounds — the "editorial paper" the site sits on. */
        paper: {
          DEFAULT: '#fdfcfa',
          100: '#faf8f4',
          200: '#f4f1ea',
        },
        /* Sparing editorial accent for rules, markers and eyebrows. */
        accent: {
          400: '#c9963f',
          500: '#b07d28',
          600: '#8f631d',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        /* Display serif for headlines — the main signal that this is an
           editorial publication rather than a generic SaaS content site. */
        display: ['var(--font-display)', 'Georgia', 'serif'],
        serif: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        eyebrow: '0.12em',
      },
      maxWidth: {
        prose: '46rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(22, 22, 20, 0.03), 0 8px 24px -14px rgba(22, 22, 20, 0.10)',
        'card-hover':
          '0 1px 2px rgba(22, 22, 20, 0.05), 0 20px 44px -18px rgba(42, 53, 180, 0.22)',
        lift: '0 24px 60px -24px rgba(22, 22, 20, 0.22)',
      },
      transitionTimingFunction: {
        subtle: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
