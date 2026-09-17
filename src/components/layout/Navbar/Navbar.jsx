import { useCallback, useEffect, useState } from 'react';
import { NAV_LINKS, SECTION_IDS } from '../../../constants/navigation';
import { useIsScrolled } from '../../../hooks/useScrollPosition';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import { cn } from '../../../utils/cn';
import { Logo } from '../../ui/Logo';
import styles from './Navbar.module.css';

const MENU_ID = 'primary-navigation';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useIsScrolled();
  useBodyScrollLock(isMenuOpen);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((open) => !open), []);

  // סגירה ב-Escape
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  // סגירה כשעוברים לרוחב דסקטופ
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (event) => event.matches && closeMenu();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [closeMenu]);

  return (
    <header className={cn(styles.navbar, (isScrolled || isMenuOpen) && styles.scrolled)}>
      <nav className={styles.inner} aria-label="ניווט ראשי">
        <a href={`#${SECTION_IDS.hero}`} className={styles.logo} onClick={closeMenu}>
          <Logo />
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={isMenuOpen}
          aria-controls={MENU_ID}
          onClick={toggleMenu}
        >
          <span className="visually-hidden">{isMenuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'}</span>
          <span className={cn(styles.burger, isMenuOpen && styles.burgerOpen)} aria-hidden="true" />
        </button>

        <ul id={MENU_ID} className={cn(styles.links, isMenuOpen && styles.linksOpen)}>
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={styles.link} onClick={closeMenu}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
