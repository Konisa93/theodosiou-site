# Theodosiou Texniki AE: website

Bilingual (Greek / English) website for **ΘΕΟΔΟΣΙΟΥ ΤΕΧΝΙΚΗ Α.Ε.**, which owns and leases three standalone commercial buildings in Chalandri, Athens.

Built with [Astro](https://astro.build) as a static site. It has no database, no server and no outside services: everything runs on **GitHub**. GitHub stores the code, builds the site automatically and hosts it on **GitHub Pages**.

> **Confidentiality rule:** the current tenants of the buildings must **never** appear anywhere on the site. That covers text, data, image descriptions and code comments. The data file deliberately has no tenant field.
>
> **Wording rule:** leasing may go through agents, so the site never says "no agents", "no middlemen" or "directly from the owner".

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) 24 (the version the GitHub build uses).

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
| Launch switch | `site.config.mjs` |
| Automatic build and publishing | `.github/workflows/deploy.yml` |
| Custom domain (once there is one) | `public/CNAME` |

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
In the same file, edit `floors`, `address`, `use` and `features`. `area` and `plot` are set to `null`, because the client prefers not to publish square metres, so the site shows **—** instead. If that changes, enter numbers (in m²) and they appear automatically, e.g. *1.250 m²*. Every text field has an `el` and an `en` version, so **always update both**.

`shape` only controls the abstract drawing (its width, height and number of floor lines). It is not real data.

### Change page text
Open the page's file in `src/views/` (for example `Company.astro`). At the top, the `copy` block has an `el:` section and an `en:` section with the same keys. Change the text between the quotes in both.

### Change phone, email or address
Edit the `COMPANY` block in `src/lib/buildings.ts`. The header, footer, contact page, privacy policy, structured data **and the contact form's recipient** all read from it.

### Publish a change
Commit and push to the `main` branch. GitHub rebuilds and republishes the site in about a minute. You can watch it under the repository's **Actions** tab.

---

## 4. The contact form

GitHub Pages can only serve files; it cannot receive form submissions. So the form works **without any server**:

1. The visitor fills in the form. The fields are checked in the browser and each one shows its error in the visitor's language.
2. Pressing **"Συνέχεια στο email" / "Continue in email"** opens the visitor's own email app with a ready message:
   - addressed to the company's email
   - subject "Εκδήλωση ενδιαφέροντος: Κτίριο Β" / "Expression of interest: Building B"
   - every field already filled in
3. The visitor presses **Send** in their email app, and the message arrives like any normal email.

Advantages: no outside service, no spam bots (the form never posts anything), and no visitor data stored anywhere except the company's inbox.

The one limitation: a visitor with no email app set up (for example on a shared computer) has to copy the email address shown below the button. That's why the address is always visible on the contact page too.

> If the client later wants messages sent directly from the page, a form service such as Formspree can be connected. It takes about 10 minutes, but it would no longer be "GitHub only".

---

## 5. Publish on GitHub Pages

### First time
1. **Create a repository** on GitHub and push this project to it:
   ```bash
   gh repo create theodosiou-site --public --source=. --remote=origin --push
   ```
   On a free GitHub account, Pages works only from a **public** repository. To keep the code private, you need a paid plan (GitHub Pro) and can use `--private` instead.
2. In the repository, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Go to **Actions** and wait for **Deploy to GitHub Pages** to finish. It also runs on every push.
4. The site is live at `https://<username>.github.io/theodosiou-site`. All links and images adapt to this sub-folder automatically.

### Connect the client's domain
1. Create the file `public/CNAME` containing only the domain, e.g. `www.example.gr`. Commit and push.
2. In **Settings → Pages → Custom domain**, enter the same `www.` domain and save.
3. At the domain registrar, add these DNS records:
   - `CNAME` record: `www` → `<username>.github.io`
   - `A` records for the bare domain → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. GitHub then redirects the bare domain to `www`.
4. When GitHub shows the certificate is ready, tick **Enforce HTTPS**.
5. Push any change (or run the workflow from **Actions → Run workflow**). The build picks up the new domain for canonical links, the sitemap and share images.

### Launch checklist
- [ ] Replace every `[PLACEHOLDER]` in square brackets (search the project for `[`).
- [ ] Fill in the real building data in `src/data/buildings.json` (leave `area` and `plot` as `null`), and remove the "sample figures" notes in `src/views/Home.astro` and `src/views/Buildings.astro`.
- [ ] Set the real phone, **email** (the form sends to it), postcode, office hours, ΓΕΜΗ, ΑΦΜ and ΔΟΥ.
- [ ] Set the building coordinates in `src/views/Location.astro` and `src/lib/schema.ts`.
- [ ] Have the privacy policy (`src/views/Privacy.astro`) reviewed by the client's legal advisor.
- [ ] Have a native speaker check the English copy.
- [ ] Connect the custom domain (above).
- [ ] In `site.config.mjs`, set `SITE_URL` to the real `https://www.` address and `PRELAUNCH = false`.
- [ ] Run `npm run images` if the name or headline changed, then commit and push.
- [ ] Test the form in both languages on a phone and on a computer.
- [ ] Add the site to [Google Search Console](https://search.google.com/search-console) and submit `https://www.<domain>/sitemap-index.xml`.
- [ ] Create or claim the company's **Google Business Profile**. Use exactly the same name, address and phone as the website footer.
- [ ] Check the share preview with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) or [opengraph.xyz](https://www.opengraph.xyz).

### Why the site is hidden right now
While `PRELAUNCH = true`, every page carries `noindex` and `robots.txt` blocks all crawlers, so search engines don't index unfinished content. Setting it to `false` in `site.config.mjs` opens the site to search engines and adds the sitemap to `robots.txt`.

Search engines read `robots.txt` only at the root of a domain. Until the custom domain is connected, the `noindex` tag on every page is what keeps the `github.io` address out of search results.

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

GitHub Pages serves every page over **HTTPS** (tick "Enforce HTTPS"), but it doesn't allow custom server headers. So the protections are set inside each page instead (`src/layouts/Base.astro`):

- **Content-Security-Policy** (as a `<meta>` tag): only the site's own files may load, plus the OpenStreetMap map frame.
- **Referrer-Policy:** other sites see only the domain, not the full page address.

Two header-only protections are **not available** on GitHub Pages: blocking other sites from showing the site in a frame, and the browser-permissions policy. For an information site with no logins or payments, this is an acceptable trade-off.

Privacy choices:

- The site sets **no cookies**, so it needs no cookie banner.
- Fonts are served from the site itself, not from Google.
- The map loads from OpenStreetMap only when the visitor clicks "Show map".
- The form sends nothing to any server.

If you add analytics later, choose a cookie-free service (Plausible or Umami), add its domain to `script-src` and `connect-src` in the Content-Security-Policy in `src/layouts/Base.astro`, **and update the privacy policy**: it currently states, correctly, that the site uses no analytics.

Before launch, the client must fill in the privacy policy placeholders (retention period, email provider, update date), confirm the GitHub data-transfer line, and have the whole policy reviewed by their legal advisor.

---

## 8. Design rules (keep the site consistent)

- **No photographs.** Every visual is an abstract line drawing in SVG.
- **Colours** come only from `src/styles/tokens.css`: Paper, Stone, Ink, Graphite, Hairline, and Bronze for lines and large letters only. Small bronze text uses `--accent-text` (deeper on light backgrounds, lighter on dark ones), so it stays readable (WCAG AA).
- **Headings** use Noto Serif Display; text and buttons use Inter.
- **Motion** is slow and smooth, with no bounce. Visitors who choose "reduce motion" on their device see everything without animation.
- **Greek capitals** have no accents. The site handles this automatically through `text-transform`, so type headings normally, with accents.
