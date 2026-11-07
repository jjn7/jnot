// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://jnot.net',
  trailingSlash: 'ignore',
  integrations: [sitemap()],

  // Fonts are downloaded at build time and served from jnot.net,
  // with metric-matched fallbacks so text doesn't jump when they load.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Space Grotesk',
      cssVariable: '--font-sans',
      weights: ['300 700'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      weights: [400, 500],
      styles: ['normal'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],

  image: {
    // Screenshots are converted to WebP at build time.
    responsiveStyles: false,
  },

  build: {
    inlineStylesheets: 'always',
  },
});
