// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: "https://recipecards.kitchen",
  integrations: [sitemap(), pagefind()],
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});