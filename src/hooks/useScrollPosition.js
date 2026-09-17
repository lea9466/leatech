import { useEffect, useState } from 'react';

/** מחזיר true כשהגלילה עברה את הסף – מתעדכן רק כשהערך משתנה בפועל */
export function useIsScrolled(threshold = 16) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
