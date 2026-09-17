import content from '../../../data/site-content.json';
import { NAV_LINKS } from '../../../constants/navigation';
import { isSafeUrl } from '../../../utils/sanitize';
import styles from './Footer.module.css';

export function Footer() {
  const { brand, tagline, links } = content.footer;
  const safeLinks = links.filter(({ href }) => isSafeUrl(href));

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.name}>{brand}</p>
          <p className={styles.role}>{tagline}</p>
        </div>

        <nav aria-label="ניווט תחתון">
          <ul className={styles.list}>
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}><a href={`#${id}`} className={styles.link}>{label}</a></li>
            ))}
          </ul>
        </nav>

        {safeLinks.length > 0 && (
          <ul className={styles.list} aria-label="רשתות חברתיות">
            {safeLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className={styles.copyright}>© {content.footer.copyrightYear} {brand}</p>
    </footer>
  );
}
