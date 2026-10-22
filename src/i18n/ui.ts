export type Lang = 'el' | 'en';

// Every page exists in both languages; the switcher and hreflang tags read from here.
export const routes = {
  home: { el: '/', en: '/en' },
  buildings: { el: '/ktiria', en: '/en/buildings' },
  company: { el: '/etaireia', en: '/en/company' },
  location: { el: '/topothesia', en: '/en/location' },
  contact: { el: '/epikoinonia', en: '/en/contact' },
  privacy: { el: '/aporrito', en: '/en/privacy' },
} as const;

export type RouteKey = keyof typeof routes;

export const path = (key: RouteKey, lang: Lang) => routes[key][lang];
export const other = (lang: Lang): Lang => (lang === 'el' ? 'en' : 'el');
export const locale = (lang: Lang) => (lang === 'el' ? 'el-GR' : 'en-GB');

export const navItems = (lang: Lang) =>
  ([
    ['buildings', { el: 'Κτίρια', en: 'Buildings' }],
    ['company', { el: 'Η Εταιρεία', en: 'Company' }],
    ['location', { el: 'Τοποθεσία', en: 'Location' }],
  ] as const).map(([key, label]) => ({ key, href: path(key, lang), label: label[lang] }));

export const contactLabel = (lang: Lang) => (lang === 'el' ? 'Επικοινωνία' : 'Contact');
