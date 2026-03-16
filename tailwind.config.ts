import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#f3f1ec',
        ink: '#1f2937',
        line: '#d6d1c7',
        panel: '#fffdf8',
        muted: '#6b7280',
        accent: {
          DEFAULT: '#3f5a4f',
          soft: '#dfe7e1',
        },
        priority: {
          low: '#64748b',
          medium: '#9a6b2f',
          high: '#9f3a2d',
        },
      },
      fontFamily: {
        sans: ['"Instrument Sans"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(31, 41, 55, 0.08)',
        card: '0 16px 40px rgba(15, 23, 42, 0.07)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top left, rgba(255,255,255,0.95), rgba(255,255,255,0) 42%), radial-gradient(circle at bottom right, rgba(63,90,79,0.12), rgba(63,90,79,0) 40%)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.45s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;

