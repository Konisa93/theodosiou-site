// Launch settings shared by astro.config.mjs and the site code.
// The GitHub Pages workflow fills SITE_ORIGIN and BASE_PATH automatically:
//   before a custom domain:  https://<user>.github.io  +  /<repository>
//   with a custom domain:    https://www.<domain>      +  /
// GitHub reports http:// until the HTTPS certificate is issued; the site is always served over https.
export const SITE_URL = (process.env.SITE_ORIGIN || 'https://www.theodosiouae.com').replace(/^http:\/\//, 'https://');
export const BASE_PATH = process.env.BASE_PATH || '/';

// While true, every page carries noindex and robots.txt blocks all crawlers.
// Set to false on launch day, then commit and push.
export const PRELAUNCH = true;
