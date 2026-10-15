import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://broteag.web.app',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
