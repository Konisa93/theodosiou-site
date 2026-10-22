// Generates share images (public/og/*.png), app icons and favicon.ico.
// Run with `npm run images` after changing the brand or the copy below.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = (p) => `${root}public/${p}`;
const font = (pkg, file) => readFileSync(`${root}node_modules/@fontsource/${pkg}/files/${file}`);

const C = { paper: '#F5F2EC', stone: '#E9E4DA', ink: '#15181B', graphite: '#5E5A54', hairline: '#D6CFC2', bronze: '#9A7B4F' };

const fonts = [
  { name: 'Serif', data: font('noto-serif-display', 'noto-serif-display-latin-300-normal.woff'), weight: 300 },
  { name: 'SerifGr', data: font('noto-serif-display', 'noto-serif-display-greek-300-normal.woff'), weight: 300 },
  { name: 'Sans', data: font('inter', 'inter-latin-500-normal.woff'), weight: 500 },
  { name: 'SansGr', data: font('inter', 'inter-greek-500-normal.woff'), weight: 500 },
];

// Same three-volume elevation as the site's hero drawing.
function buildingsSvg(letters) {
  const ground = 340;
  const bs = [
    { x: 70, w: 130, h: 160, floors: 5, cols: 4 },
    { x: 230, w: 150, h: 256, floors: 8, cols: 5, roof: true },
    { x: 410, w: 120, h: 200, floors: 6, cols: 3 },
  ];
  let p = `<path d="M20 ${ground}H580" stroke-width="1.5"/>`;
  p += `<path d="M20 ${ground - 160}H580" stroke-width="0.6" opacity="0.38"/>`;
  for (let x = 28; x <= 576; x += 12) p += `<path d="M${x} ${ground}l-8 10" stroke-width="0.6" opacity="0.38"/>`;
  bs.forEach((b, i) => {
    const top = ground - b.h;
    p += `<path d="M${b.x} ${ground}V${top}H${b.x + b.w}V${ground}" stroke-width="1.5"/>`;
    if (b.roof) p += `<path d="M${b.x + 34} ${top}V${top - 16}H${b.x + b.w - 34}V${top}" stroke-width="1.2"/>`;
    for (let f = 1; f < b.floors; f++) {
      const y = Math.round(ground - (f * b.h) / b.floors);
      p += `<path d="M${b.x} ${y}H${b.x + b.w}" stroke-width="0.9" opacity="0.38"/>`;
    }
    for (let c = 1; c < b.cols; c++) {
      const x = Math.round(b.x + (c * b.w) / b.cols);
      p += `<path d="M${x} ${top + 6}V${ground}" stroke-width="0.6" opacity="0.38"/>`;
    }
  });
  const dimY = ground - 256 - 40;
  p += `<g stroke="${C.bronze}"><path d="M230 ${dimY}H380" stroke-width="0.9"/><path d="M226 ${dimY + 4}l8 -8M376 ${dimY + 4}l8 -8M230 ${dimY - 8}v16M380 ${dimY - 8}v16" stroke-width="0.9"/></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 390" fill="none" stroke="${C.ink}">${p}</svg>`;
}

const markSvg = (fill = C.ink, accent = C.bronze) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="5" y="14" width="6" height="14" fill="${fill}"/><rect x="13" y="4" width="6" height="24" fill="${accent}"/><rect x="21" y="10" width="6" height="18" fill="${fill}"/></svg>`;
const dataUri = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

const h = (type, style, children) => ({ type, props: { style, children } });
const img = (src, width, height) => ({ type: 'img', props: { src, width, height } });

const copy = {
  el: { name: 'ΘΕΟΔΟΣΙΟΥ', sub: 'ΤΕΧΝΙΚΗ Α.Ε.', title: ['Εμπορικά κτίρια', 'στο Χαλάνδρι.'], foot: 'ΤΡΙΑ ΑΥΤΟΤΕΛΗ ΚΤΙΡΙΑ · ΑΠΕΥΘΕΙΑΣ ΑΠΟ ΤΟΝ ΙΔΙΟΚΤΗΤΗ', letters: ['Α', 'Β', 'Γ'] },
  en: { name: 'THEODOSIOU', sub: 'TEXNIKI AE', title: ['Commercial buildings', 'in Chalandri.'], foot: 'STANDALONE BUILDINGS · DIRECT FROM THE OWNER', letters: ['A', 'B', 'C'] },
};

async function ogImage(lang) {
  const t = copy[lang];
  const tree = h('div', { width: 1200, height: 630, display: 'flex', background: C.paper, padding: '64px 72px', fontFamily: 'SansGr, Sans' }, [
    h('div', { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 600, height: 502 }, [
      h('div', { display: 'flex', alignItems: 'center', gap: 18 }, [
        img(dataUri(markSvg()), 44, 44),
        h('div', { display: 'flex', flexDirection: 'column', gap: 6 }, [
          h('div', { fontFamily: 'SerifGr, Serif', fontSize: 27, letterSpacing: 8, color: C.ink }, t.name),
          h('div', { fontSize: 13, letterSpacing: 4.5, color: C.graphite }, t.sub),
        ]),
      ]),
      h('div', { display: 'flex', flexDirection: 'column', fontFamily: 'SerifGr, Serif', fontSize: 56, lineHeight: 1.1, color: C.ink, letterSpacing: -1 },
        t.title.map((line) => h('div', {}, line))),
      h('div', { display: 'flex', alignItems: 'center', gap: 16, fontSize: 14, letterSpacing: 2.4, color: C.graphite }, [
        h('div', { width: 48, height: 1, background: C.bronze }, ''),
        t.foot,
      ]),
    ]),
    h('div', { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 456, height: 502, boxSizing: 'border-box', background: C.stone, padding: 28 }, [
      img(dataUri(buildingsSvg(t.letters)), 400, 260),
    ]),
  ]);
  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  writeFileSync(out(`og/og-${lang}.png`), png);
}

// Icon: ink square with the paper/bronze mark, works on any home screen.
async function icons() {
  const iconSvg = (size) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><rect width="32" height="32" fill="${C.ink}"/><g transform="translate(5.6 5.6) scale(0.65)"><rect x="5" y="14" width="6" height="14" fill="${C.paper}"/><rect x="13" y="4" width="6" height="24" fill="${C.bronze}"/><rect x="21" y="10" width="6" height="18" fill="${C.paper}"/></g></svg>`;
  for (const [file, size] of [['icons/icon-192.png', 192], ['icons/icon-512.png', 512], ['icons/apple-touch-icon.png', 180]]) {
    await sharp(Buffer.from(iconSvg(size))).png().toFile(out(file));
  }
  // favicon.ico holding one 32px PNG (supported by every current browser)
  const png32 = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">${markSvg(C.ink, C.ink).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg>`)).png().toBuffer();
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
  header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
  header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18);
  writeFileSync(out('favicon.ico'), Buffer.concat([header, png32]));
}

mkdirSync(out('og'), { recursive: true });
mkdirSync(out('icons'), { recursive: true });
await ogImage('el');
await ogImage('en');
await icons();
console.log('Images written to public/og, public/icons and public/favicon.ico');
