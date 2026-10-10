// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://freewaymobiletyres.co.uk',
  integrations: [sitemap()],
  build: {
    // Inline CSS into each page to avoid render-blocking stylesheet requests
    inlineStylesheets: 'always',
  },
});
