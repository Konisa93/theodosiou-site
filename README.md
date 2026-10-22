# Theodosiou Texniki AE: website

Bilingual (Greek / English) website for **ΘΕΟΔΟΣΙΟΥ ΤΕΧΝΙΚΗ Α.Ε.**, which owns and leases three standalone commercial buildings in Chalandri, Athens.

Built with [Astro](https://astro.build) as a static site. It has no database and no server to maintain. It is hosted on Netlify, which also receives the contact form.

> **Confidentiality rule:** the current tenants of the buildings must **never** appear anywhere on the site. That covers text, data, image descriptions and code comments. The data file deliberately has no tenant field.

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install      # once, to download the dependencies
npm run dev      # starts the site at http://localhost:4321
npm run build    # builds the final site into the dist/ folder
npm run images   # regenerates share images and icons (see section 6)
```

The style guide with colours, fonts and motion is at `http://localhost:4321/styleguide`.

---

## 2. Where things live

| What | File |
|---|---|
| The three buildings (sizes, floors, status, features) | `src/data/buildings.json` |
| Phone, email, address, office hours | `src/lib/buildings.ts`, the `COMPANY` block |
| Text of each page, in Greek **and** English | `src/views/*.astro`, the `copy` block at the top |
| Page addresses (URLs) in both languages | `src/i18n/ui.ts` |
| Colours, fonts, sizes, animation timings | `src/styles/tokens.css` |
| Domain and launch switch | `site.config.mjs` |
| Security headers and hosting settings | `netlify.toml` |

Each page has one view file that holds both languages. The files in `src/pages/` and `src/pages/en/` only choose the language.

---

## 3. Common edits

### Change a building's status
Open `src/data/buildings.json`, find the building (`"id": "a"`, `"b"` or `"g"`) and set `status` to one of these:

- `"leased"`: shown as *Μισθωμένο / Leased*
- `"available"`: shown as *Διαθέσιμο / Available*
- `"available_from"`: also set `"availableFrom": "2027-03-01"` (year-month-day). It's shown as *Από 1 Μαρτίου 2027 / From 1 March 2027*.

The home page figures update by themselves. For example, "100% Leased" turns into "Available" when a building frees up.

### Change a building's details
In the same file, edit `area` and `plot` (in m², numbers only), `floors`, `address`, `use` and `features`. Every text field has an `el` and an `en` version, so **always update both**.

`shape` only controls the abstract drawing (its width, height and number of floor lines). It is not real data.

### Change page text
Open the page's file in `src/views/` (for example `Company.astro`). At the top, the `copy` block has an `el:` section and an `en:` section with the same keys. Change the text between the quotes in both.

### Change phone, email or address
Edit the `COMPANY` block in `src/lib/buildings.ts`. The header, footer, contact page, privacy policy and structured data all read from it.

---

## 4. The contact form

The form uses **Netlify Forms**: there is no code or server to set up.

1. After the first deploy, open **Netlify → your site → Forms**. A form named `contact` appears there automatically.
2. Under **Forms → Form notifications**, add an **Email notification** to the company's inbox. This is how messages reach the client.
3. Spam is filtered by a hidden honeypot field and by Netlify's own spam filter.

Each message includes the building of interest and the language the visitor used.

On your own computer the form only *pretends* to send, so you can test the flow without sending emails.

---

## 5. Deploy and launch

### First deploy
1. Put the project in a Git repository (GitHub, GitLab or Bitbucket).
2. In Netlify, choose **Add new site → Import an existing project** and pick the repository. The build settings come from `netlify.toml`.
3. Connect the domain under **Domain management**. Set the `www` address as the primary domain; Netlify then redirects the bare domain to it. HTTPS is switched on automatically.

### Launch checklist
- [ ] Replace every `[PLACEHOLDER]` in square brackets (search the project for `[`).
- [ ] Fill in the real building data in `src/data/buildings.json`, and remove the "sample figures" notes in `src/views/Home.astro` and `src/views/Buildings.astro`.
- [ ] Set the real phone, email, postcode, office hours, ΓΕΜΗ, ΑΦΜ and ΔΟΥ.
- [ ] Set the building coordinates in `src/views/Location.astro` and `src/lib/schema.ts`.
- [ ] Have the privacy policy (`src/views/Privacy.astro`) reviewed by the client's legal advisor.
- [ ] Have a native speaker check the English copy.
- [ ] In `site.config.mjs`, set `SITE_URL` to the real `https://www.` address and `PRELAUNCH = false`.
- [ ] Run `npm run images` if the name or headline changed, then commit and push.
- [ ] Send a test message through the form in both languages and confirm the email arrives.
- [ ] Add the site to [Google Search Console](https://search.google.com/search-console) and submit `https://www.<domain>/sitemap-index.xml`.
- [ ] Create or claim the company's **Google Business Profile**. Use exactly the same name, address and phone as the website footer.
- [ ] Check the share preview with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) or [opengraph.xyz](https://www.opengraph.xyz).

### Why the site is hidden right now
While `PRELAUNCH = true`, every page carries `noindex` and `robots.txt` blocks all crawlers, so search engines don't index unfinished content. Setting it to `false` in `site.config.mjs` opens the site to search engines and adds the sitemap to `robots.txt`.

---

## 6. Search and sharing

These pieces are already in place:

- **Sitemap:** generated at `/sitemap-index.xml`, listing each Greek page together with its English version.
- **robots.txt:** generated from `src/pages/robots.txt.ts` and controlled by the launch switch.
- **Language tags:** every page tells search engines about its other-language version.
- **Structured data:** in `src/lib/schema.ts`. It covers the company (name, address, phone, founding year), the website, breadcrumbs, and the three buildings as places. No tenant information.
- **Share images:** `public/og/og-el.png` and `og-en.png` (1200×630), shown when a page is shared on LinkedIn, Facebook, WhatsApp, etc.
- **Icons:** `public/favicon.ico`, `favicon.svg`, `icons/*.png` and `site.webmanifest`.

Share images and icons are generated by `scripts/make-images.mjs`. Run `npm run images` after changing the name, the headline or the colours.

---

## 7. Security and privacy

`netlify.toml` sets these security headers on every page:

- **Strict-Transport-Security:** HTTPS only.
- **Content-Security-Policy:** only the site's own files may load, plus the OpenStreetMap map frame.
- **X-Frame-Options**, **X-Content-Type-Options**, **Referrer-Policy**, **Permissions-Policy**

Privacy choices:

- The site sets **no cookies**, so it needs no cookie banner.
- Fonts are served from the site itself, not from Google.
- The map loads from OpenStreetMap only when the visitor clicks "Show map".

If you add analytics later, choose a cookie-free service (Plausible or Umami) and add its domain to `script-src` and `connect-src` in the Content-Security-Policy.

---

## 8. Design rules (keep the site consistent)

- **No photographs.** Every visual is an abstract line drawing in SVG.
- **Colours** come only from `src/styles/tokens.css`: Paper, Stone, Ink, Graphite, Hairline, and Bronze for small details only.
- **Headings** use Noto Serif Display; text and buttons use Inter.
- **Motion** is slow and smooth, with no bounce. Visitors who choose "reduce motion" on their device see everything without animation.
- **Greek capitals** have no accents. The site handles this automatically through `text-transform`, so type headings normally, with accents.
