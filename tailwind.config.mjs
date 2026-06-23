/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#592E5C',
        peach: '#FFE6E6',
        mauve: '#EADCEA',
        ink: '#1F2937',
      },
      boxShadow: {
        soft: '0 18px 45px rgba(89, 46, 92, 0.12)',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};