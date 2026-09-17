import { z } from 'zod';
import { FORM_LIMITS, PROJECT_TYPE_OPTIONS } from '../../../constants/contactForm';

const PROJECT_TYPE_VALUES = PROJECT_TYPE_OPTIONS.map(({ value }) => value);
// אותיות (כולל עברית), רווחים, מקף וגרש
const NAME_PATTERN = /^[\p{L}\s'׳\-]+$/u;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'נא להזין שם עם לפחות 2 תווים')
    .max(FORM_LIMITS.nameMax, `השם ארוך מ-${FORM_LIMITS.nameMax} תווים`)
    .regex(NAME_PATTERN, 'השם יכול לכלול אותיות, רווחים ומקף בלבד'),
  email: z.string().trim().toLowerCase().email('כתובת המייל לא תקינה, למשל name@example.com'),
  projectType: z.enum(PROJECT_TYPE_VALUES, { message: 'נא לבחור סוג פרויקט' }),
  message: z
    .string()
    .trim()
    .min(FORM_LIMITS.messageMin, `נא לכתוב לפחות ${FORM_LIMITS.messageMin} תווים על הפרויקט`)
    .max(FORM_LIMITS.messageMax, `ההודעה ארוכה מ-${FORM_LIMITS.messageMax} תווים`),
  // Honeypot: אנשים לא רואים את השדה, בוטים ממלאים אותו
  website: z.string().optional(),
});

export const CONTACT_DEFAULT_VALUES = Object.freeze({
  name: '',
  email: '',
  projectType: '',
  message: '',
  website: '',
});
