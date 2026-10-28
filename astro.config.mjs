import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.thepeaksofthebalkans.com',
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'nl', 'fr', 'de'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', nl: 'nl', fr: 'fr', de: 'de' },
      },
    }),
  ],
});
