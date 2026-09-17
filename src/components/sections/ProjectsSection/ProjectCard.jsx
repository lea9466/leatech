import { useEffect, useRef, useState } from 'react';
import { isSafeUrl } from '../../../utils/sanitize';
import { Button } from '../../ui/Button';
import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../utils/cn';
import styles from './ProjectsSection.module.css';

const ROTATE_MS = 3800;

/**
 * הצגת פרויקט מלאה ברוחב מלא: מסגרת דפדפן פשוטה עם 3–4 תמונות
 * מתחלפות (לא תמונה סטטית אחת — ר' סעיף 07 במסמך האפיון), ותוכן:
 * תג, כותרת, תיאור, נקודה מודגשת בציטוט, highlights נוספים וכפתור.
 */
export function ProjectCard({ project }) {
  const { name, title, summary, tag, link, images, detail } = project;
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [active, setActive] = useState(0);
  const [brokenSet, setBrokenSet] = useState(() => new Set());
  const hovering = useRef(false);

  useEffect(() => {
    if (images.length < 2) return undefined;
    const timer = setInterval(() => {
      if (hovering.current) return;
      setActive((i) => (i + 1) % images.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [images.length]);

  const markBroken = (src) =>
    setBrokenSet((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));

  const [spotlight, ...rest] = detail.highlights;

  return (
    <article ref={ref} className={cn(styles.showcase, inView && styles.showcaseIn)}>
      <div
        className={styles.visual}
        aria-hidden="true"
        onMouseEnter={() => { hovering.current = true; }}
        onMouseLeave={() => { hovering.current = false; }}
      >
        <div className={styles.scrollPanel}>
          <div className={styles.scrollFrame}>
            {images.map((src, i) =>
              brokenSet.has(src) ? (
                <div
                  key={src}
                  className={styles.placeholder}
                  style={{ opacity: i === active ? 1 : 0 }}
                >
                  <span dir="ltr">
                    {i + 1} / {images.length}
                  </span>
                  <span className={styles.placeholderNote}>תמונה בהמתנה</span>
                </div>
              ) : (
                <img
                  key={src}
                  src={src}
                  alt={`${name} — תצוגה ${i + 1} מתוך ${images.length}`}
                  className={styles.image}
                  style={{ opacity: i === active ? 1 : 0 }}
                  loading="lazy"
                  onError={() => markBroken(src)}
                />
              )
            )}
          </div>

          {images.length > 1 && (
            <div className={styles.rotateDots} role="tablist" aria-label={`תמונות ${name}`}>
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`תצוגה ${i + 1}`}
                  className={i === active ? styles.rotateDotActive : styles.rotateDot}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <span className={styles.tag}>{tag}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>{summary}</p>

        {spotlight && (
          <div className={styles.spotlight}>
            <span className={styles.quoteMark} aria-hidden="true">
              “
            </span>
            <div className={styles.spotlightBody}>
              <span className={styles.spotlightLabel}>מה מייחד</span>
              <p className={styles.spotlightText}>
                <strong>{spotlight.title}</strong> — {spotlight.text}
              </p>
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <ul className={styles.secondaryList}>
            {rest.map((h) => (
              <li key={h.title} className={styles.secondaryItem}>
                <span className={styles.secondaryTitle}>{h.title}</span>
                <span className={styles.secondaryText}>{h.text}</span>
              </li>
            ))}
          </ul>
        )}

        {isSafeUrl(link) ? (
          <Button href={link} className={styles.cta}>
            מעבר לאתר
          </Button>
        ) : (
          <p className={styles.noLink}>הפרויקט עדיין לא זמין לצפייה ציבורית.</p>
        )}
      </div>
    </article>
  );
}
