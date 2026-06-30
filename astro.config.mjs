import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 1. Set output to static (required for GitHub Pages)
  output: 'static',
  
  // 2. Define your GitHub Pages URL and repo name
  site: 'https://talhaticx.github.io',
  base: 'meds-ee-uet',

  integrations: [react(), markdoc(), keystatic()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom']
    }
  },
});