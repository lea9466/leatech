import { SERVICES } from './services';

export const PROJECT_TYPE_OPTIONS = Object.freeze([
  ...SERVICES.map(({ id, title }) => ({ value: id, label: title })),
  { value: 'other', label: 'משהו אחר' },
]);

export const FORM_LIMITS = Object.freeze({
  nameMax: 60,
  messageMin: 10,
  messageMax: 1000,
  /** שליחה מהירה מזה כנראה בוט */
  minFillTimeMs: 3000,
  /** המתנה בין שליחות מאותו דפדפן */
  cooldownMs: 30000,
  requestTimeoutMs: 10000,
});
