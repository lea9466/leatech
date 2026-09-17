import { Layout } from './components/layout/Layout';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
// import { ContactSection } from './components/sections/ContactSection';

/**
 * App מרכיב את הדף: Layout קבוע (הדר + פוטר),
 * והסקשנים עוברים אליו כ-children – אפשר להחליף, להוסיף או לסדר מחדש
 * בלי לגעת במעטפת.
 *
 * פיסה ב' (מי אני + שירותים + פרויקטים) לפי תוכנית הבנייה בסעיף 10 של
 * מסמך האפיון. תהליך עבודה / המלצות / יצירת קשר חוזרים בפיסה ג', עם
 * העיצוב החדש.
 */
export default function App() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      {/* <ContactSection /> */}
    </Layout>
  );
}
