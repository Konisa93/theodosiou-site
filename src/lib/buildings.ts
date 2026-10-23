import data from '../data/buildings.json';
import { locale, type Lang } from '../i18n/ui';

export type Building = (typeof data.buildings)[number];

export const buildings: Building[] = data.buildings;

export const fmt = (n: number, lang: Lang = 'el') => n.toLocaleString(locale(lang));

// Square metres are not published: a null area shows a dash.
export const areaLabel = (n: number | null, lang: Lang = 'el') => (n == null ? '—' : `${fmt(n, lang)} m²`);
export const leasedCount = buildings.filter((b) => b.status === 'leased').length;
export const allLeased = leasedCount === buildings.length;

const formatDate = (iso: string, lang: Lang) =>
  new Date(iso).toLocaleDateString(locale(lang), { day: 'numeric', month: 'long', year: 'numeric' });

export const statusLabel = (b: Building, lang: Lang = 'el') => {
  if (b.status === 'leased') return lang === 'el' ? 'Μισθωμένο' : 'Leased';
  if (b.status === 'available_from' && b.availableFrom) {
    const date = formatDate(b.availableFrom, lang);
    return lang === 'el' ? `Από ${date}` : `From ${date}`;
  }
  return lang === 'el' ? 'Διαθέσιμο' : 'Available';
};

export const statusClass = (b: Building) =>
  b.status === 'leased' ? 'status--rented' : b.status === 'available_from' ? 'status--soon' : '';

// Human-readable but not machine-harvestable form of an email address.
export const spellEmail = (email: string) => email.replace('@', ' [at] ').replace(/\./g, ' [dot] ');

export const COMPANY = {
  phone: '+30 210 XXX XXXX', // [PHONE]
  phoneHref: 'tel:+30210XXXXXXX',
  email: 'info@theodosiouae.com', // shown only through components/Email.astro (hidden from bots)
  // Where the buildings are. The registered office's street address is deliberately not published.
  area: { el: 'Κέντρο Χαλανδρίου', en: 'Central Chalandri' },
  // Legal notice: ΓΕΜΗ and statutory seat are required for an Α.Ε.; ΑΦΜ is shown too.
  gemi: '144390501000',
  vat: '800896270',
  // Statutory seat (έδρα) of the Α.Ε. is the municipality, required in the legal notice.
  seat: { el: 'Χαλάνδρι Αττικής', en: 'Chalandri, Attica' },
  hours: {
    el: 'Δευτέρα – Παρασκευή, 09:00 – 17:00 [ΝΑ ΕΠΙΒΕΒΑΙΩΘΕΙ]',
    en: 'Monday – Friday, 09:00 – 17:00 [TO CONFIRM]',
  },
};
