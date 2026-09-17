/**
 * אייקונים לשלוש נקודות האמון ב"מי אני" — באותה שפה חזותית של אייקוני
 * השירותים (stroke נקי, בלי תלות בספריה חיצונית).
 */
const commonProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

/** "הכל תחת קורת גג אחת" — הד מיניאטורי לרשת ב-Hero של הסקשן: נקודות
 * קטנות מתחברות אל נקודה מרכזית אחת. */
export function HubIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <path d="M12 12L12 5M12 12L19 12M12 12L12 19M12 12L5 12" />
      <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** "אתר מהיר שלא מאבד לקוחות" — ברק. */
export function SpeedIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <path d="M12.5 3L5 13.5h5.5L11 21l7.5-10.5H13L12.5 3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** "עומד בתקן הנגישות הישראלי" — מגן עם וי. */
export function ShieldIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <path d="M12 3.5l6.5 2.4v5.3c0 4-2.7 6.9-6.5 8.3-3.8-1.4-6.5-4.3-6.5-8.3V5.9L12 3.5z" />
      <path d="M9 12.2l2.1 2.1L15.4 10" />
    </svg>
  );
}

/** וי שקופץ ברגע שהקלדה מסתיימת. */
export function CheckIcon(props) {
  return (
    <svg {...commonProps} strokeWidth={2.5} {...props}>
      <path d="M4.5 12.5L9 17L19.5 6" />
    </svg>
  );
}
