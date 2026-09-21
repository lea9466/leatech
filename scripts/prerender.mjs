/**
 * רץ אחרי ה-build (ר' "build" ב-package.json):
 *  1. מרנדר את האפליקציה ל-HTML (dist-server/entry-server.js) ומכניס ל-#root,
 *     כדי שגוגל ורשתות חברתיות יראו את התוכן גם בלי להריץ JavaScript.
 *  2. מרחיב את נתוני ה-JSON-LD ב-index.html (שירותים, WebSite, ופרטי קשר כשהוגדרו).
 * ב-dev לא רץ – שם נשארת הטעינה הרגילה.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = path.join(root, 'dist', 'index.html');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');
const content = JSON.parse(fs.readFileSync(path.join(root, 'src/data/site-content.json'), 'utf-8'));

const EMPTY_ROOT = '<div id="root"></div>';
const JSON_LD_BLOCK = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;

const isConfigured = (value) => Boolean(value) && !String(value).startsWith('TODO');
/** בתוך <script> אסור שיופיע "<" גולמי */
const toScriptJson = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

function buildJsonLd(base) {
  const { email, whatsapp } = content.contact;
  const business = {
    ...base,
    '@id': `${base.url}#business`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'שירותים',
      itemListElement: content.services.map(({ title, text }) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: title, description: text },
      })),
    },
    ...(isConfigured(email) && { email }),
    ...(isConfigured(whatsapp) && { telephone: whatsapp }),
  };
  delete business['@context'];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${base.url}#website`,
        url: base.url,
        name: content.meta.siteName,
        inLanguage: 'he-IL',
        publisher: { '@id': business['@id'] },
      },
      business,
    ],
  };
}

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();

let html = fs.readFileSync(indexPath, 'utf-8');

if (!html.includes(EMPTY_ROOT)) {
  throw new Error('prerender: לא נמצא <div id="root"></div> ב-dist/index.html (כבר רונדר?)');
}
html = html.replace(EMPTY_ROOT, () => `<div id="root">${appHtml}</div>`);

const existing = html.match(JSON_LD_BLOCK);
if (!existing) {
  throw new Error('prerender: לא נמצא בלוק JSON-LD ב-index.html');
}
const jsonLd = buildJsonLd(JSON.parse(existing[1]));
html = html.replace(JSON_LD_BLOCK, () => `<script type="application/ld+json">${toScriptJson(jsonLd)}</script>`);

fs.writeFileSync(indexPath, html);
console.log(`prerender: OK – ${(appHtml.length / 1024).toFixed(1)} KB של HTML הוזרקו ל-dist/index.html`);
