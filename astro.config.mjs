import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 1. THIS IS THE CRUCIAL LINE: 
  output: 'static', 
  
  // 2. Make sure these match your GitHub details so the CSS loads properly
  site: 'https://talhaticx.github.io',
  base: '/meds-ee-uet',

  integrations: [
    react(), 
    markdoc(), 
    ...(process.env.NODE_ENV !== 'production' ? [keystatic()] : [])
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom']
    }
  },
});