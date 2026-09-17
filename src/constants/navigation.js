/** מזהי הסקשנים – מקור אמת יחיד לניווט ולעוגנים */
export const SECTION_IDS = Object.freeze({
  hero: 'top',
  about: 'about',
  services: 'services',
  caseStudy: 'case-study',
  contact: 'contact',
});

export const NAV_LINKS = Object.freeze([
  { id: SECTION_IDS.about, label: 'מי אני' },
  { id: SECTION_IDS.services, label: 'שירותים' },
  { id: SECTION_IDS.caseStudy, label: 'פרויקטים' },
  { id: SECTION_IDS.contact, label: 'יצירת קשר' },
]);
