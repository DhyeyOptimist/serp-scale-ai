import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F9FC',
        foreground: '#141414',
        primary: {
          DEFAULT: '#6952EB',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#BAC7DA',
          foreground: '#0f172a',
        },
        muted: {
          DEFAULT: '#f8fafc',
          foreground: '#64748b',
        },
        accent: {
          DEFAULT: '#B3FF3B',
          foreground: '#0f172a',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#6952EB',
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#141414',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#141414',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        // Ethereal Aurora Animation Keyframes
        'blobAnimate': {
          '0%': {
            transform: 'scale(1) translate(0px, 0px)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
          '50%': {
            transform: 'scale(1.2) translate(100px, -50px)',
            borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%',
          },
          '100%': {
            transform: 'scale(1) translate(0px, 0px)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
        },
        'blobAnimate2': {
          '0%': {
            transform: 'scale(1.1) translate(20px, 10px)',
            borderRadius: '50% 60% 40% 70% / 70% 50% 60% 40%',
          },
          '50%': {
            transform: 'scale(0.9) translate(-80px, 60px)',
            borderRadius: '70% 30% 60% 40% / 30% 70% 40% 60%',
          },
          '100%': {
            transform: 'scale(1.1) translate(20px, 10px)',
            borderRadius: '50% 60% 40% 70% / 70% 50% 60% 40%',
          },
        },
        'blobAnimate3': {
          '0%': {
            transform: 'scale(0.8) translate(-30px, -20px)',
            borderRadius: '40% 70% 60% 30% / 50% 40% 70% 60%',
          },
          '50%': {
            transform: 'scale(1.3) translate(60px, -100px)',
            borderRadius: '70% 30% 40% 60% / 60% 70% 30% 40%',
          },
          '100%': {
            transform: 'scale(0.8) translate(-30px, -20px)',
            borderRadius: '40% 70% 60% 30% / 50% 40% 70% 60%',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Ethereal Aurora Animations
        'aurora-blob': 'blobAnimate 15s ease-in-out infinite alternate',
        'aurora-blob-2': 'blobAnimate2 18s ease-in-out infinite alternate-reverse',
        'aurora-blob-3': 'blobAnimate3 22s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;