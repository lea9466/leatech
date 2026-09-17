import { PROJECT_TYPE_OPTIONS, FORM_LIMITS } from '../../../constants/contactForm';
import { SECTION_IDS } from '../../../constants/navigation';
import { SITE } from '../../../constants/siteContent';
import { Button } from '../../ui/Button';
import { FormField } from '../../ui/FormField';
import { GlassCard } from '../../ui/GlassCard';
import { SectionHeader } from '../../ui/SectionHeader';
import { SUBMIT_STATUS, useContactForm } from './useContactForm';
import { cn } from '../../../utils/cn';
import styles from './ContactSection.module.css';

const HEADING_ID = 'contact-title';

const STATUS_MESSAGES = {
  [SUBMIT_STATUS.success]: 'הפנייה נשלחה. אחזור אליך תוך יום עסקים.',
  [SUBMIT_STATUS.error]: `השליחה נכשלה. אפשר לנסות שוב או לכתוב ישירות ל-${SITE.email}`,
  [SUBMIT_STATUS.cooldown]: 'הפנייה הקודמת כבר התקבלה. אפשר לשלוח שוב בעוד חצי דקה.',
};

export function ContactSection() {
  const { register, errors, isSubmitting, handleSubmit, status } = useContactForm();
  const statusMessage = STATUS_MESSAGES[status];

  return (
    <section id={SECTION_IDS.contact} className={styles.section} aria-labelledby={HEADING_ID}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <SectionHeader
            id={HEADING_ID}
            title="יש לך תהליך שחוזר על עצמו?"
            description="ספרו לי מה גוזל לכם זמן. הטופס הזה בעצמו מחובר לאוטומציה – הפנייה שלכם תגיע אליי מסודרת ותקבלו אישור במייל."
          />
          <p className={styles.direct}>
            מעדיפים מייל? <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>

        <GlassCard className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <FormField label="שם" error={errors.name?.message}>
                <input
                  type="text"
                  autoComplete="name"
                  maxLength={FORM_LIMITS.nameMax}
                  {...register('name')}
                />
              </FormField>

              <FormField label="מייל" error={errors.email?.message}>
                <input
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  dir="ltr"
                  {...register('email')}
                />
              </FormField>
            </div>

            <FormField label="סוג הפרויקט" error={errors.projectType?.message}>
              <select {...register('projectType')}>
                <option value="" disabled>בחירה מהרשימה</option>
                {PROJECT_TYPE_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </FormField>

            <FormField label="על הפרויקט" error={errors.message?.message}>
              <textarea
                rows={5}
                maxLength={FORM_LIMITS.messageMax}
                placeholder="מה קורה היום, ומה היית רוצה שיקרה לבד?"
                {...register('message')}
              />
            </FormField>

            {/* Honeypot – מוסתר מאנשים ומקוראי מסך */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="website">אתר</label>
              <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
            </div>

            <div className={styles.footer}>
              <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? 'שולח…' : 'שליחת פנייה'}
              </Button>

              <p
                className={cn(
                  styles.status,
                  status === SUBMIT_STATUS.success && styles.statusSuccess,
                  status === SUBMIT_STATUS.error && styles.statusError
                )}
                role="status"
                aria-live="polite"
              >
                {statusMessage}
              </p>
            </div>
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
