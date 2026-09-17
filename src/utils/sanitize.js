/**
 * חיטוי טקסט חופשי לפני שליחה.
 * React כבר מבצע escape בזמן רינדור, אבל הנתונים ממשיכים למייל / CRM / Webhook
 * שלא בהכרח מגנים על עצמם – לכן מנקים גם כאן.
 * חשוב: זו שכבת הגנה נוספת בלבד. השרת חייב לאמת ולחטא מחדש.
 */
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const HTML_TAGS = /<\/?[^>]+>/g;
const ANGLE_BRACKETS = /[<>]/g;

export const sanitizeText = (value = '') =>
  String(value)
    .normalize('NFKC')
    .replace(CONTROL_CHARS, '')
    .replace(HTML_TAGS, '')
    .replace(ANGLE_BRACKETS, '')
    .trim();

/** מחזיר true רק לכתובות https/mailto תקינות – חוסם javascript: ודומיו */
export const isSafeUrl = (url) => {
  try {
    const { protocol } = new URL(url, window.location.origin);
    return protocol === 'https:' || protocol === 'mailto:';
  } catch {
    return false;
  }
};

export const isExternalUrl = (url) => /^https?:\/\//i.test(url);
