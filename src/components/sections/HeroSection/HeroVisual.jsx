import styles from './HeroVisual.module.css';

/**
 * איור/שרטוט (blueprint) של מסך מחשב בהטיה, עם רמז לפרויקט "מוזיקה"
 * (שורת דפדפן + קלידי פסנתר + גל צליל) — לא צילום מסך אמיתי,
 * ולא איקונוגרפיה טכנית גנרית. ר' מסמך אפיון, סעיף 07.
 */
export function HeroVisual() {
  const keys = Array.from({ length: 11 });

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.glow} />
      <svg
        className={styles.svg}
        viewBox="0 0 440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="18" y="18" width="404" height="244" rx="14" className={styles.screen} />

        {/* שורת דפדפן — שלוש הנקודות נדלקות אחת אחרי השנייה כשהמסך מתיישב */}
        <circle cx="42" cy="40" r="4" className={`${styles.dot} ${styles.dot1}`} />
        <circle cx="58" cy="40" r="4" className={`${styles.dot} ${styles.dot2}`} />
        <circle cx="74" cy="40" r="4" className={`${styles.dot} ${styles.dot3}`} />
        <rect x="98" y="34" width="220" height="12" rx="6" className={styles.addressBar} />
        <line x1="18" y1="58" x2="422" y2="58" className={styles.divider} />

        {/* גל צליל */}
        <path
          d="M50 140 Q85 95 118 140 T186 140 T254 140 T322 140 T390 140"
          className={styles.wave}
        />

        {/* קלידי פסנתר */}
        {keys.map((_, i) => (
          <rect
            key={i}
            x={50 + i * 32}
            y={182}
            width={27}
            height={64}
            rx={3}
            className={i % 3 === 2 ? styles.keyAccent : styles.key}
          />
        ))}

        {/* בסיס המסך */}
        <path d="M188 262 L252 262 L266 296 L174 296 Z" className={styles.stand} />
        <rect x="144" y="296" width="152" height="10" rx="5" className={styles.base} />
      </svg>
    </div>
  );
}
