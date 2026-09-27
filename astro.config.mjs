// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import site from './src/config/site.json' with { type: 'json' };

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: site.url,
  trailingSlash: 'ignore',
  i18n: {
    locales: site.locales,
    defaultLocale: site.defaultLocale,
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: site.defaultLocale,
        locales: Object.fromEntries(site.locales.map((l) => [l, `${l}-CA`])),
      },
    }),
  ],
  image: {
    // Demo photography is served from Unsplash's CDN. Client builds should use local images in src/assets.
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  vite: { plugins: [tailwindcss()] },
});
