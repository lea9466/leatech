/**
 * סט אייקונים מותאם אישית לכרטיסי השירותים.
 * מצוירים כ-SVG נקי (stroke, בלי תלות בספריית אייקונים חיצונית) כדי לשמור על
 * שפה עיצובית אחידה מול שאר האתר.
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

export function WebsiteIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9.25h18" />
      <circle cx="6.25" cy="6.85" r="0.55" fill="currentColor" stroke="none" />
      <circle cx="8.6" cy="6.85" r="0.55" fill="currentColor" stroke="none" />
      <path d="M7.5 13.25h9M7.5 16.25h5.5" />
    </svg>
  );
}

export function AiIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <path
        d="M12 3.2l1.9 5.9 5.9 1.9-5.9 1.9-1.9 5.9-1.9-5.9L4.2 11l5.9-1.9L12 3.2z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function AutomationIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <path d="M4.5 12a7.5 7.5 0 0 1 12.9-5.25" />
      <path d="M17.4 3.5v3.75h-3.75" />
      <path d="M19.5 12a7.5 7.5 0 0 1-12.9 5.25" />
      <path d="M6.6 20.5v-3.75h3.75" />
    </svg>
  );
}

export function IntegrationIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M8.4 8.4l7.2 7.2" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const SERVICE_ICONS = Object.freeze({
  web: WebsiteIcon,
  automation: AutomationIcon,
  integrations: IntegrationIcon,
  ai: AiIcon,
});

/**
 * אייקוני "לפני" — לכל שירות שלושה אייקונים שרלוונטיים דווקא אליו,
 * לא אותה שלישייה גנרית לכולם. צורות גנריות בלבד, בלי לוגואים אמיתיים
 * של Drive/WhatsApp וכו'.
 */

/* ---------- בניית אתרים: לינקים מפוזרים (Drive / הודעות / PDF) ---------- */
export function FileIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <path d="M7 3h6.5L18 7.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M13.5 3v4.5H18" />
      <path d="M9 13.5h6M9 16.5h4" />
    </svg>
  );
}

export function ChatIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4 3.5V16H6.5A2.5 2.5 0 0 1 4 13.5v-7z" />
    </svg>
  );
}

export function CloudIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <path d="M7.5 18a4 4 0 0 1-.6-7.95 5.5 5.5 0 0 1 10.35-2.03A4.5 4.5 0 0 1 16.5 18h-9z" />
    </svg>
  );
}

/* ---------- אוטומציות: בן אדם מסוחרר, ערימת ניירת, תיבה עמוסה ---------- */
export function DizzyPersonIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <circle cx="12" cy="7" r="3" />
      <path d="M6.5 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
      <path d="M7.5 3.8c.6-.7 1.3-1 2-.9" />
      <path d="M16.5 4.2c.6-.1 1.3.3 1.6 1" />
    </svg>
  );
}

export function StackIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <rect x="5" y="15" width="14" height="3" rx="1" />
      <rect x="6" y="10.5" width="14" height="3" rx="1" />
      <rect x="4" y="6" width="14" height="3" rx="1" />
    </svg>
  );
}

export function EnvelopeIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

/* ---------- אינטגרציות: מערכות מנותקות ---------- */
export function SquareNodeIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2.5" />
    </svg>
  );
}

export function CircleNodeIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <circle cx="12" cy="12" r="6.5" />
    </svg>
  );
}

export function TriangleNodeIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <path d="M12 5.5l6.5 12.5h-13z" />
    </svg>
  );
}

/* ---------- AI: עבודה ידנית וחוזרת ---------- */
export function ChecklistIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <rect x="4" y="5" width="3" height="3" rx="0.6" />
      <path d="M10.5 6.5H20" />
      <rect x="4" y="10.5" width="3" height="3" rx="0.6" />
      <path d="M10.5 12H20" />
      <rect x="4" y="16" width="3" height="3" rx="0.6" />
      <path d="M10.5 17.5H20" />
    </svg>
  );
}

export function ClockIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v4.7l3 2" />
    </svg>
  );
}

export function CursorClickIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <path d="M5 3l6 15 2-6 6-2z" strokeLinejoin="round" />
    </svg>
  );
}

/** לפי מזהה השירות ב-content.services — שלושה אייקוני "לפני" רלוונטיים לו */
export const BEFORE_ICON_SETS = Object.freeze({
  web: [CloudIcon, ChatIcon, FileIcon],
  automation: [DizzyPersonIcon, StackIcon, EnvelopeIcon],
  integrations: [SquareNodeIcon, CircleNodeIcon, TriangleNodeIcon],
  ai: [ChecklistIcon, ClockIcon, CursorClickIcon],
});

/** חץ בין "לפני" ל"אחרי" — לכיוון הקריאה ב-RTL. */
export function ArrowIcon(props) {
  return (
    <svg {...commonProps} {...props}>
      <path d="M17 12H4" />
      <path d="M9 7l-5 5 5 5" />
    </svg>
  );
}
