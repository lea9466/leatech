import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import styles from './Layout.module.css';

/**
 * מעטפת הדף: הדר ופוטר קבועים, התוכן מתחלף דרך children.
 */
export function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <a href="#main-content" className={styles.skipLink}>דלגו לתוכן</a>
      <Navbar />
      <main id="main-content" className={styles.main} tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
