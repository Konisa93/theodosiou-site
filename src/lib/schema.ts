// schema.org JSON-LD for every page. Never include tenant information.
import { buildings, COMPANY } from './buildings';
import { routes, type Lang, type RouteKey } from '../i18n/ui';

const pageNames: Record<RouteKey, Record<Lang, string>> = {
  home: { el: 'Αρχική', en: 'Home' },
  buildings: { el: 'Τα κτίρια', en: 'The buildings' },
  company: { el: 'Η Εταιρεία', en: 'Company' },
  location: { el: 'Τοποθεσία', en: 'Location' },
  contact: { el: 'Επικοινωνία', en: 'Contact' },
  privacy: { el: 'Πολιτική Απορρήτου', en: 'Privacy Policy' },
};

export function buildSchema({ lang, page, site }: { lang: Lang; page: RouteKey; site: URL }) {
  const abs = (p: string) => new URL(p, site).href;
  const orgId = abs('/#organization');

  const address = {
    '@type': 'PostalAddress',
    streetAddress: lang === 'el' ? 'Πλάτωνος 11' : 'Platonos 11',
    addressLocality: lang === 'el' ? 'Χαλάνδρι' : 'Chalandri',
    postalCode: '[POSTCODE]',
    addressRegion: lang === 'el' ? 'Αττική' : 'Attica',
    addressCountry: 'GR',
  };

  const graph: Record<string, unknown>[] = [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': orgId,
      name: lang === 'el' ? 'ΘΕΟΔΟΣΙΟΥ ΤΕΧΝΙΚΗ Α.Ε.' : 'Theodosiou Texniki AE',
      legalName: 'ΘΕΟΔΟΣΙΟΥ ΤΕΧΝΙΚΗ ΑΝΩΝΥΜΗ ΕΤΑΙΡΕΙΑ',
      alternateName: ['Θεοδοσίου Τεχνική Α.Ε.', 'Theodosiou Texniki AE'],
      foundingDate: '2018',
      url: abs(routes.home[lang]),
      logo: abs('/icons/icon-512.png'),
      image: abs(`/og/og-${lang}.png`),
      telephone: COMPANY.phone,
      email: COMPANY.email,
      address,
      // [COORDINATES] confirm with the client
      geo: { '@type': 'GeoCoordinates', latitude: 38.0213, longitude: 23.7987 },
      areaServed: lang === 'el' ? 'Χαλάνδρι, Αττική' : 'Chalandri, Attica',
      knowsLanguage: ['el', 'en'],
    },
    {
      '@type': 'WebSite',
      '@id': abs('/#website'),
      url: abs('/'),
      name: lang === 'el' ? 'Θεοδοσίου Τεχνική Α.Ε.' : 'Theodosiou Texniki AE',
      inLanguage: ['el', 'en'],
      publisher: { '@id': orgId },
    },
  ];

  if (page !== 'home') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: pageNames.home[lang], item: abs(routes.home[lang]) },
        { '@type': 'ListItem', position: 2, name: pageNames[page][lang], item: abs(routes[page][lang]) },
      ],
    });
  }

  if (page === 'buildings') {
    for (const b of buildings) {
      graph.push({
        '@type': 'Place',
        '@id': abs(`${routes.buildings[lang]}#building-${b.id}`),
        name: b.label[lang],
        description: b.use[lang],
        containedInPlace: { '@type': 'City', name: lang === 'el' ? 'Χαλάνδρι' : 'Chalandri' },
        additionalProperty: [
          { '@type': 'PropertyValue', name: lang === 'el' ? 'Εμβαδόν' : 'Floor area', value: b.area, unitCode: 'MTK' },
          { '@type': 'PropertyValue', name: lang === 'el' ? 'Όροφοι' : 'Floors', value: b.floors },
        ],
        // Owned and leased by the organisation; tenants are confidential.
        owner: { '@id': orgId },
      });
    }
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
