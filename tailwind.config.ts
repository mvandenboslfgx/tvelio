import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tv: {
          bg: '#05070A',
          card: '#0F172A',
          focus: '#FACC15',
          text: '#F8FAFC',
          muted: '#94A3B8'
        }
      }
    }
  },
  plugins: []
};

export default config;
