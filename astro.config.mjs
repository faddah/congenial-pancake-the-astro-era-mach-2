// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
		react(),
		tailwind(),
	],

  adapter: node({
    mode: 'standalone'
  }),

  vite: {
    plugins: [tailwind()]
  }
});
