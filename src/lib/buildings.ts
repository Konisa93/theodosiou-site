import data from '../data/buildings.json';
import { locale, type Lang } from '../i18n/ui';

export type Building = (typeof data.buildings)[number];

export const buildings: Building[] = data.buildings;

export const fmt = (n: number, lang: Lang = 'el') => n.toLocaleString(locale(lang));

export const totalArea = buildings.reduce((sum, b) => sum + b.area, 0);
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

export const COMPANY = {
  phone: '+30 210 XXX XXXX', // [PHONE]
  phoneHref: 'tel:+30210XXXXXXX',
  email: 'info@example.gr', // [EMAIL]
  address: { el: 'Πλάτωνος 11, Χαλάνδρι', en: 'Platonos 11, Chalandri' },
  postcode: { el: '[ΤΚ]', en: '[POSTCODE], Athens, Greece' },
  hours: {
    el: 'Δευτέρα – Παρασκευή, 09:00 – 17:00 [ΝΑ ΕΠΙΒΕΒΑΙΩΘΕΙ]',
    en: 'Monday – Friday, 09:00 – 17:00 [TO CONFIRM]',
  },
};
