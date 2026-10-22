// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL, BASE_PATH } from './site.config.mjs';

const BASE = BASE_PATH.replace(/\/$/, ''); // '' on a custom domain, '/<repo>' on github.io

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
  base: BASE_PATH,
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
        const full = new URL(item.url).pathname;
        const path = clean(full.slice(BASE.length) || '/');
        const abs = (p) => new URL(BASE + p, SITE_URL).href;
        item.url = abs(path);
        const el = toEl.get(path) ?? (toEn.has(path) ? path : null);
        const en = toEn.get(path) ?? (toEl.has(path) ? path : null);
        if (el && en) {
          item.links = [
            { lang: 'el', url: abs(el) },
            { lang: 'en', url: abs(en) },
            { lang: 'x-default', url: abs(el) },
          ];
        }
        return item;
      },
    }),
  ],
});
