// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './site.config.mjs';

// Greek path → English path, so the sitemap lists each page with its translation.
// Paths match the canonical tags: no trailing slash except the Greek home page.
const pairs = {
  '/': '/en',
  '/ktiria': '/en/buildings',
  '/etaireia': '/en/company',
  '/topothesia': '/en/location',
  '/epikoinonia': '/en/contact',
  '/aporrito': '/en/privacy',
};
const clean = (p) => (p === '/' ? p : p.replace(/\/$/, ''));
const toEn = new Map(Object.entries(pairs));
const toEl = new Map(Object.entries(pairs).map(([el, en]) => [en, el]));

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  // ktiria.html instead of ktiria/index.html, so /ktiria is served without a slash redirect.
  build: { format: 'file' },
  i18n: {
    defaultLocale: 'el',
    locales: ['el', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/(styleguide|404)\/?$/.test(new URL(page).pathname),
      serialize(item) {
        const path = clean(new URL(item.url).pathname);
        item.url = new URL(path, SITE_URL).href;
        const el = toEl.get(path) ?? (toEn.has(path) ? path : null);
        const en = toEn.get(path) ?? (toEl.has(path) ? path : null);
        if (el && en) {
          item.links = [
            { lang: 'el', url: new URL(el, SITE_URL).href },
            { lang: 'en', url: new URL(en, SITE_URL).href },
            { lang: 'x-default', url: new URL(el, SITE_URL).href },
          ];
        }
        return item;
      },
    }),
  ],
});
