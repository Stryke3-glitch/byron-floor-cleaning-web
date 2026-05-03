/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAF8F3',
        surface: '#FFFFFF',
        ink: '#0F1115',
        ink2: '#272A31',
        muted: '#5A6068',
        line: '#E7E4DC',
        'line-strong': '#D6D2C8',
        'hero-bg': '#0F1115',
        'hero-ink': '#FAF8F3',
        'hero-sub': '#C8C2B4',
        accent: '#8A6420',
        'accent-bright': '#E5B970',
        'feature-bg': '#1a1d24',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        DEFAULT: '4px',
      },
    },
  },
  plugins: [],
};
