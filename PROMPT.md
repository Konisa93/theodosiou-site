# Prompt: Website for ΘΕΟΔΟΣΙΟΥ ΤΕΧΝΙΚΗ Α.Ε.

> Paste everything below the line into Claude Code in an empty project folder.
> Replace every `[PLACEHOLDER]` before going live (list at the bottom).

---

You are a senior web designer and front-end developer with 10+ years of experience building premium real estate and architecture websites. Build a bilingual (Greek / English) website for a company that owns and leases **three standalone commercial buildings** in Chalandri, Athens. Each building is leased **as a whole** to a single tenant.

The design direction is **minimal luxury with professional motion**: think of an architecture studio's portfolio or a high-end property developer. It should feel quiet, confident and expensive, and nothing like a template.

## 1. The client

- **Greek name:** ΘΕΟΔΟΣΙΟΥ ΤΕΧΝΙΚΗ Α.Ε.
- **English name:** Theodosiou Texniki AE
- **Full legal name / business activities (use in the footer and on the Company page):**
  ΘΕΟΔΟΣΙΟΥ ΤΕΧΝΙΚΗ ΑΝΩΝΥΜΗ ΕΤΑΙΡΕΙΑ – ΑΝΑΠΤΥΞΗ ΚΑΙ ΑΞΙΟΠΟΙΗΣΗ ΑΚΙΝΗΤΩΝ ΚΑΙ ΠΑΡΟΧΗ ΥΠΗΡΕΣΙΩΝ – ΕΚΜΕΤΑΛΛΕΥΣΗ ΑΚΙΝΗΤΩΝ – ΤΕΧΝΙΚΗ ΚΑΤΑΣΚΕΥΑΣΤΙΚΗ ΕΤΑΙΡΕΙΑ
  English: Real estate development and utilisation, property services, property management, technical & construction company.
- **Founded:** 2018
- **Address:** Πλάτωνος 11, Χαλάνδρι [ΤΚ] / Platonos 11, Chalandri [POSTCODE], Athens, Greece
- **Phone:** [PHONE]
- **Email:** [EMAIL] (inquiry form sends here)
- **Legal details for the footer (required for an Α.Ε. in Greece):** ΓΕΜΗ [GEMI_NUMBER], ΑΦΜ [VAT_NUMBER], ΔΟΥ [TAX_OFFICE]
- **What they do:** a technical and construction company that owns and manages **3 commercial buildings** in Chalandri. The buildings were **transferred into the company in 2018** (they were not built in 2018, and the site must not claim the company built them). Each building is leased **whole and separately** to one tenant. There are no individual units or floors for rent.
- **Current status:** all three buildings are currently leased to well-known retail chains.
- **Main selling point:** tenants deal directly with the owning company (no agents or middlemen), whose technical background means the buildings are well maintained and can be adapted to a tenant's needs.

## 1a. Hard rule: tenants stay confidential

**Never name the current tenants** anywhere: not in copy, sample data, alt text, metadata, schema, share images or code comments. No brand names, no logos, no "trusted by" strip. Use neutral wording such as «μισθωμένο σε εταιρεία λιανικής» / "leased to a retail company" only if a status needs explaining, or simply «Μισθωμένο» / "Leased".

## 2. Goal, audience, success

- **Business goals:** (1) a credible corporate presence for the owning company, (2) collect qualified **expressions of interest** from companies that want a whole building when one becomes available, (3) a clear contact point for current tenants and partners.
- **Audience:** expansion and real estate managers of retail chains, franchise networks, banks, showrooms, clinics and corporate users looking for a standalone commercial building in the northern suburbs of Athens; also brokers and investors. Usually decision makers on desktop at work, then re-checking on mobile.
- **Key questions every visitor has, answered within one scroll each:** What are the buildings? How big? Where exactly? Are any available, or when? Who am I dealing with? How do I ask?
- **Success metrics:** form submissions, clicks on phone/email, "I'm interested" clicks per building.
- **Tone of voice:** calm, precise, understated. Short sentences. No superlatives («οι καλύτεροι», "best in class"), no exclamation marks, no buzzwords. Let space, typography and detail signal quality.

## 3. Hard rule: no photos

- **Do not use any photographs.** No stock photos, no AI-generated pictures of buildings or interiors, no photos of Chalandri.
- All visuals are **abstract architectural graphics**, hand-built as inline SVG or CSS:
  - minimal isometric or elevation line drawings of three simple volumes for the 3 buildings (abstract, not a copy of the real buildings)
  - floor-plan-style grids, hairline construction lines, dimension marks (e.g. `— 120 m² —`), section-cut hatching
  - a very faint blueprint grid as an occasional background texture
- Graphics use only brand colours, 1px or 1.25px strokes, `vector-effect: non-scaling-stroke`, and are decorative (`aria-hidden="true"`) unless they carry information.
- Every SVG stays under ~10 KB and is optimised (SVGO).

## 4. Art direction: minimal luxury

### Principles
- **Space is the luxury.** Generous white space and large section padding (`clamp(96px, 14vw, 200px)` vertically on desktop). Fewer elements, each placed deliberately.
- **Editorial layout.** 12-column grid, max content width ~1280px, 24–32px gutters. Use asymmetry: e.g. a heading in columns 1–5 and text in columns 7–11. Avoid centred-everything and identical card rows.
- **Typography carries the design.** Large display headings, small tracked uppercase labels, long-form body set comfortably.
- **Hairlines, not boxes.** Separate content with 1px rules in a warm line colour. No drop shadows (or one extremely subtle one for the sticky header), no gradients, no glassmorphism, no rounded "SaaS" cards. Border radius 0–2px.
- **Numbered sections** (`01 — Κτίρια`, `02 — Η Εταιρεία`…) as a quiet architectural detail.
- **One accent colour, used sparingly**, for small details (a line, an active state, a number), never for large areas.
- **Restraint test:** if an element doesn't help the visitor understand or act, remove it.

### Brand proposal (there is no brand yet)
Before building pages, **create a style tile page (`/styleguide`) and wait for my approval**. It shows:
- **Wordmark:** «ΘΕΟΔΟΣΙΟΥ» / "THEODOSIOU" in a refined display face with wide tracking, plus a small geometric mark (e.g. three vertical blocks of different heights for the three buildings), in SVG. Versions for light and dark backgrounds, plus a favicon version.
- **Palette** (starting point, refine it):
  - Paper `#F5F2EC` (main background)
  - Stone `#E9E4DA` (alternate section background)
  - Ink `#15181B` (text, dark sections)
  - Graphite `#5E5A54` (secondary text, must pass AA on Paper)
  - Hairline `#D6CFC2` (rules, borders)
  - Bronze accent `#9A7B4F` (lines, details, large text only; check contrast and never use it for small body text)
  - Include one full dark "Ink" section on the home page for rhythm.
- **Typography** (Google Fonts, must **fully support Greek** including accents; test every glyph):
  - Display: *Noto Serif Display* in light/regular weights (or *GFS Didot*) for headings: elegant and high-contrast
  - Text/UI: *Inter* or *Commissioner* for body, tables, labels and buttons
  - If you find a better Greek-capable pairing, propose it with a side-by-side comparison
- **Type scale:** fluid with `clamp()`, ratio around 1.333. E.g. Display `clamp(48px, 7vw, 112px)`, H2 `clamp(32px, 4vw, 56px)`, body 17–18px, line-height 1.6 for body, 1.05–1.15 for display, line length 60–72 characters. Labels 12–13px uppercase with 0.12em tracking.
- **Spacing scale:** 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200).
- **Motion demo:** show the reveal, line-draw, link hover and button hover on the style tile so I can approve the motion too.
- All of the above become **design tokens** (CSS custom properties) in one file, used everywhere. No hard-coded colours or sizes in components.

## 5. Motion system: professional, never decorative noise

Motion should feel **slow, smooth and precise**, like an architect's pen, never playful or bouncy.

### Tokens
- Durations: `--dur-fast: 180ms` (hover, focus), `--dur-base: 420ms` (UI changes), `--dur-slow: 900ms` (reveals), `--dur-draw: 1600ms` (SVG line drawing)
- Easing: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` for entrances; `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` for transitions. **No bounce, no elastic, no overshoot.**

### Choreography
- **Hero on load:** the 3-building line drawing draws itself in (stroke-dashoffset, staggered per building, ~1.6s), then the headline reveals line by line (masked slide-up of 100%, 80ms stagger), then the subtext and buttons fade up. Total under 2.2s; content must be readable immediately even if JS fails.
- **Scroll reveals:** sections fade and rise 16–24px max, once only (IntersectionObserver, threshold ~0.2), with a 60–80ms stagger for groups. Never animate large blocks of body text word by word.
- **Hairline rules** extend from 0 to 100% width as they enter the viewport.
- **Key numbers** (3 buildings, since 2018, m²) count up once, quickly (~1s), using tabular figures so the width doesn't jump.
- **Page transitions:** Astro View Transitions with a subtle 250–300ms cross-fade. The header stays in place.
- **Micro-interactions:**
  - Text links: underline grows from left on hover (`--dur-fast`)
  - Buttons: background fill slides in, the arrow `→` nudges 4px right
  - Table rows: hairline highlight and a slight background tint on hover; the "I'm interested" button appears stronger
  - Header: transparent over the hero, then becomes Paper with a hairline bottom border and slightly smaller height after scrolling 80px; it hides on scroll down and returns on scroll up
  - Form fields: label floats up and the bottom line animates to the accent colour on focus
- **Rules:**
  - Animate only `transform`, `opacity`, `clip-path` and `stroke-dashoffset`; never animate layout properties
  - No scroll-jacking, no forced smooth-scroll libraries, no heavy parallax (at most a 5–10% drift on one hero graphic)
  - Use CSS and the Web Animations API first; a small library (e.g. Motion One) only if truly needed. Total JS budget below
  - **`prefers-reduced-motion: reduce`** → no movement, only instant or opacity changes; the SVG drawings appear complete
  - Motion must never delay access to content or the CTA

## 6. Tech stack

- **Astro** (static output) with View Transitions, plain CSS (or Tailwind configured with the design tokens), minimal vanilla JS. No React unless a component really needs it.
- **i18n:** Greek is the default at `/`, English at `/en/`. Translated URL slugs (`/ktiria` → `/en/buildings`). The language switcher goes to the same page in the other language. `hreflang` + `x-default` tags. Set `lang="el"` / `lang="en"` correctly.
- **Building data** lives in one editable file (`src/data/buildings.json` or an Astro content collection with a typed schema): label, address, use, plot and building area, floors, frontage, parking, features, status (`leased` / `available` / `available_from` + date). Pages, the table, the form dropdown and the key numbers all read from it, so nothing is duplicated. No tenant field.
- **Form:** works on static hosting via Netlify Forms or Formspree (`[FORM_ENDPOINT]`), with a honeypot field, client-side validation, accessible error messages, and an inline success state (no page reload).
- **Analytics:** cookie-free and GDPR-friendly (Plausible or Umami, `[ANALYTICS]`). Track: form submit, phone click, email click, "I'm interested" click (with the space code), language switch. No Google Analytics, so no cookie banner.
- **Hosting:** Netlify or Vercel. Add security headers (HSTS, a sensible Content-Security-Policy, X-Content-Type-Options, Referrer-Policy) and redirects from non-www to www (or the other way round).
- **Optional phase 2:** a git-based CMS (Decap CMS) so the client can edit buildings, statuses and texts through a simple admin screen. Structure the data so this is easy to add later.

## 7. Information architecture and pages

Navigation: **Κτίρια / Buildings · Η Εταιρεία / Company · Τοποθεσία / Location · Επικοινωνία / Contact**, plus the EL/EN switch and a "Επικοινωνία / Contact" button.

### 1. Home / Αρχική
1. **Hero:** large display headline, e.g. «Εμπορικά κτίρια στο Χαλάνδρι.» / "Commercial buildings in Chalandri.", one line of subtext: three standalone buildings, each leased as a whole, directly from the owning company. Primary CTA "Δείτε τα κτίρια" and a secondary text link "Επικοινωνία". The animated 3-building drawing.
2. **Key numbers** in a hairline-divided row: 3 buildings · since 2018 · [total m²] · 100% leased (show this last one only while it is true; it reads from the data).
3. **01 — The buildings:** three columns/rows, one per building, each with its own small line drawing, label, use, floors, total m², and its status (from the data).
4. **02 — Why us (Ink dark section):** 3–4 short points: direct from the owner, no middlemen · a technical company that maintains its own buildings · buildings that can be adapted to a tenant's needs · [BUILDING FEATURES, e.g. frontage, parking, visibility, access from main roads].
5. **03 — Location teaser:** abstract map-style drawing of the area with the address and a link to Location.
6. **Closing CTA:** a big, calm statement («Ενδιαφέρεστε για ένα κτίριο;» / "Interested in a building?") inviting an expression of interest for future availability, with the contact button, phone and email.

### 2. Buildings / Τα Κτίρια (the main page)
- Intro line explaining that each building is leased **as a whole** to a single tenant.
- **One editorial block per building** (anchor `#ktirio-a`, `#ktirio-b`, `#ktirio-g`): its own abstract elevation drawing, label, address, use, plot area, building area, floors, frontage, parking, key features, and status.
- Then **a refined summary table** of the three buildings with columns:
  `Κτίριο / Building` · `Χρήση / Use` · `Όροφοι / Floors` · `Εμβαδόν / Area (m²)` · `Οικόπεδο / Plot (m²)` · `Κατάσταση / Status` (Leased / Available / Available from [date]) · action
- Table styling: no zebra stripes or heavy borders; hairline rows, tabular figures, numbers right-aligned, generous row height, small uppercase column headers, a dot indicator for status (accent = available, graphite = available from a date, light = leased).
- Each row has an **"Ενδιαφέρομαι / I'm interested →"** button that opens the contact page with the building pre-filled (`/epikoinonia?ktirio=b`), also for leased buildings (interest in future availability).
- **Mobile:** each row becomes a stacked block with label/value pairs, with no horizontal scrolling.
- **All-leased state** (the current situation): a calm note, «Όλα τα κτίρια είναι αυτή τη στιγμή μισθωμένα. Αφήστε μας τα στοιχεία σας και θα επικοινωνήσουμε μαζί σας όταν κάποιο διατεθεί.» / "All buildings are currently leased. Leave your details and we'll contact you when one becomes available." plus a link to the form. Never mention who the tenants are.

### 3. Company / Η Εταιρεία
- Short editorial text: founded 2018, a technical and construction company that owns and manages 3 commercial buildings in Chalandri, transferred into the company in 2018; well-maintained buildings and direct contact with the owner. Do not say the company built them.
- **Activities**, 4 items, each with a small abstract line icon:
  - Ανάπτυξη & αξιοποίηση ακινήτων / Real estate development
  - Εκμετάλλευση & διαχείριση ακινήτων / Property leasing & management
  - Παροχή υπηρεσιών / Property services
  - Τεχνικά & κατασκευαστικά έργα / Technical & construction works
- A simple timeline line (2018 → today) drawn as a hairline with dots. [CLIENT TO CONFIRM MILESTONES]
- [CLIENT TO CONFIRM TEXT]

### 4. Location / Τοποθεσία
- Address, then an OpenStreetMap map **loaded only on click** ("Show map"), so it isn't a third-party request on page load. Restyle it in greyscale to match the palette.
- "Open in Google Maps" and "Get directions" links.
- Access list: metro, buses, main roads, parking, with walking or driving times. [DETAILS]

### 5. Contact / Επικοινωνία
- Two columns: left, a short calm text, phone (click-to-call, formatted `+30 210 XXX XXXX`), email, address, office hours [HOURS]; right, the form.
- Fields: Ονοματεπώνυμο / Full name*, Εταιρεία / Company*, Email*, Τηλέφωνο / Phone*, Κτίριο ενδιαφέροντος / Building of interest (dropdown from the data + "Οποιοδήποτε / Any" + "Γενική ερώτηση / General inquiry", pre-filled from the URL), Χρήση / Intended use (optional), Μήνυμα / Message, GDPR consent checkbox* with a link to the privacy policy.
- Under the button: «Απαντάμε συνήθως εντός μίας εργάσιμης ημέρας.» / "We usually reply within one working day." [CLIENT TO CONFIRM]
- Success state: a thank-you message in place of the form, repeating the building chosen.

### 6. Legal and utility pages
- **Privacy Policy / Πολιτική Απορρήτου** (GDPR: what the form collects, why, how long, the controller's details, rights).
- **404 page** in the same style, with a small "missing floor" drawing and links back to Home and Buildings.
- Favicon set (SVG + PNG + apple-touch-icon), web manifest, and an Open Graph share image (1200×630) built from the wordmark and the line drawing, not a photo. One per language.

### Global components
- **Header:** wordmark, nav, EL/EN switch, Contact button. Behaviour described in the motion section. Mobile: a full-screen menu that opens with a clean clip-path reveal and large serif links.
- **Mobile sticky CTA:** a slim bottom bar with "Κτίρια" and "Κλήση / Call" after the hero has scrolled past, hidden near the footer.
- **Footer:** the wordmark, nav, contact details, full legal company name with activities in small text, ΓΕΜΗ / ΑΦΜ / ΔΟΥ, privacy policy link, © year, language switch.

## 8. Content and Greek typography details

- Write **natural, correct Greek first**, then natural English. Do not translate literally.
- **Greek uppercase must drop the accents** (ΚΤΙΡΙΑ, not ΚΤΊΡΙΑ). Use `text-transform: uppercase` with the correct `lang` attribute and check it in Chrome, Safari and Firefox.
- Greek quotation marks « », a decimal comma (1.250,5 m²), dates as 1 Μαρτίου 2026, the Greek question mark (;) in Greek text.
- Use `font-variant-numeric: tabular-nums` in the table and the key numbers.
- Avoid widows in headings (`text-wrap: balance`), and use `text-wrap: pretty` in paragraphs.
- Microcopy for every state: loading, success, error, empty, required fields.
- Keep headlines short (2–6 words). One idea per section.

## 9. SEO and local search

- Unique title (≤ 60 characters) and meta description (≤ 155) per page and language, aimed at real searches: «εμπορικό ακίνητο προς ενοικίαση Χαλάνδρι», «αυτοτελές κτίριο προς ενοικίαση», «επαγγελματικό κτίριο Χαλάνδρι», "commercial building for rent Chalandri".
- One H1 per page, logical heading order, descriptive URLs.
- schema.org JSON-LD: `Organization` + `LocalBusiness` (address, geo, phone, opening hours), `BreadcrumbList`, and `Place` data for each building (no tenant information).
- `sitemap.xml` with hreflang alternates, `robots.txt`, canonical URLs.
- Name, address and phone written **exactly the same** everywhere (site, footer, schema), ready to match a Google Business Profile. Note in the README that the client should create or claim one.

## 10. Accessibility

- WCAG 2.1 AA: contrast checked for every token pair, visible and elegant focus states (2px accent outline with an offset), skip-to-content link, keyboard-operable menu, filters and sort.
- Proper table markup: `<caption>`, `<th scope>`, `aria-sort` where sorting exists.
- Form: real `<label>`s, errors linked with `aria-describedby`, no colour-only messages.
- Touch targets at least 44×44px.

## 11. Performance budget

- Lighthouse 95+ in all four categories, mobile and desktop.
- LCP < 2.0s on 4G, CLS < 0.05, INP < 200ms.
- JS shipped < 40 KB gzipped per page; CSS < 30 KB.
- Self-host the fonts (subset to Greek + Latin, `woff2`, `font-display: swap`, preload only the hero weights, matched fallback metrics to avoid layout shift). At most 4 font files in total.
- No render-blocking third-party requests.

## 12. Working order

1. Build the **style tile** (`/styleguide`) with logo, colours, type, spacing, components (buttons, links, table rows, form fields) and the motion demo → **wait for my OK**.
2. Show a **wireframe-level home page** built with real components but placeholder copy → wait for my OK on layout.
3. Set up the Astro project, i18n, tokens and the building data file with **sample data for the 3 buildings**, clearly marked as sample.
4. Build the pages in the order of section 7, Greek first, then English.
5. **QA pass:** test at 360, 390, 768, 1024, 1440 and 1920px; Safari iOS, Chrome Android, Chrome, Firefox, Safari and Edge desktop; keyboard-only navigation; reduced motion; slow 4G; form submit and every filter and sort combination; both languages on every page; Lighthouse report.
6. **Handoff:** a `README.md` in plain language covering how to edit a building or change its status, how to change text in both languages, how to deploy, and where form emails go. Then a list of everything still needing real client data.

---

## Placeholders to collect from the client

| Placeholder | What it is |
|---|---|
| `[ΤΚ] / [POSTCODE]` | Postcode for Platonos 11, Chalandri |
| `[PHONE]` | Company phone |
| `[EMAIL]` | Email that receives inquiries |
| `[HOURS]` | Office hours |
| `[GEMI_NUMBER]`, `[VAT_NUMBER]`, `[TAX_OFFICE]` | Company legal details (ΓΕΜΗ, ΑΦΜ, ΔΟΥ) |
| `[FORM_ENDPOINT]` | Formspree endpoint (not needed with Netlify Forms) |
| `[ANALYTICS]` | Plausible or Umami account |
| `[total m²]` | Total area of the three buildings |
| `[BUILDING FEATURES]` | Frontage, parking, visibility, access, energy class, etc. |
| Buildings | For each of the 3 buildings: label, address, use, floors, building and plot m², features, status and lease end date if it should be shown |
| Company text & milestones | Confirm or edit the "About" text and the timeline |
| Location details | Nearest metro/bus, parking options, travel times |
| Domain | The domain the site will use |
