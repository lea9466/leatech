import { useEffect, useRef, useState } from 'react';

/**
 * true פעם אחת כשהאלמנט נכנס לתצוגה (לא חוזר ל-false) — לאנימציות
 * "בנייה" שרצות פעם אחת כשגוללים אליהן, ולא בכל פעם שהאלמנט נכנס/יוצא.
 */
export function useInView({ threshold = 0.35 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return [ref, inView];
}
