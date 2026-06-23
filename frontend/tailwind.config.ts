import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#050505',
          secondary: '#111111',
          tertiary: '#1A1A1A',
        },
        brand: {
          gold: '#F7A500',
          green: '#32CD32',
          purple: '#7A3CFF',
          blue: '#3498FF',
          red: '#E5484D',
        },
      },
      fontFamily: {
        heading: ['var(--font-chivo)', 'system-ui', 'sans-serif'],
        body: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        baked: '20px',
      },
      boxShadow: {
        'glow-gold': '0 0 40px rgba(247,165,0,0.45)',
        'glow-green': '0 0 40px rgba(50,205,50,0.45)',
        'glow-purple': '0 0 40px rgba(122,60,255,0.45)',
        'glow-blue': '0 0 40px rgba(52,152,255,0.45)',
        'glow-red': '0 0 40px rgba(229,72,77,0.45)',
        'baked-card': '0 18px 50px -20px rgba(0,0,0,0.20)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
