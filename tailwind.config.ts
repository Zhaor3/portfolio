import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'aurora-1': 'aurora1 22s ease-in-out infinite',
        'aurora-2': 'aurora2 28s ease-in-out infinite',
        'aurora-3': 'aurora3 26s ease-in-out infinite',
        'aurora-4': 'aurora4 30s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        aurora1: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '50%': { transform: 'translate(20%, 15%) scale(1.15)' },
        },
        aurora2: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1.1)' },
          '50%': { transform: 'translate(-15%, 25%) scale(0.95)' },
        },
        aurora3: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '50%': { transform: 'translate(25%, -20%) scale(1.2)' },
        },
        aurora4: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1.05)' },
          '50%': { transform: 'translate(-20%, -15%) scale(0.9)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
