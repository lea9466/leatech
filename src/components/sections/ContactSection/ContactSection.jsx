import { useEffect, useRef, useState } from 'react';
import content from '../../../data/site-content.json';
import { PROJECT_TYPE_OPTIONS, FORM_LIMITS } from '../../../constants/contactForm';
import { SECTION_IDS } from '../../../constants/navigation';
import { SectionHeader } from '../../ui/SectionHeader';
import { useInView } from '../../../hooks/useInView';
import { PointingRobot } from '../../decorative/PointingRobot';
import { SUBMIT_STATUS, useContactForm } from './useContactForm';
import { cn } from '../../../utils/cn';
import styles from './ContactSection.module.css';

const HEADING_ID = 'contact-title';

const isConfigured = (value) => Boolean(value) && !value.startsWith('TODO');

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M6.7 17.3L4 20l2.75-2.65A8 8 0 1 1 9.4 19z" />
      <path d="M9 9.6c0 3.3 2.6 5.9 5.9 5.9.55 0 1-.45 1-1v-.85l-1.95-1-.75.75a5.6 5.6 0 0 1-2.7-2.7l.75-.75-1-1.95H9v.55z" />
    </svg>
  );
}

function SendIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M20 4L10.5 13.5M20 4l-6.5 16-3.5-7.5L2 9z" />
    </svg>
  );
}

/** אווטאר "בוט" קטן שמרמז על הרובוט של האתר בלי להיות האנימציה המלאה. */
function BotAvatar(props) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" {...props}>
      <rect x="10" y="14" width="20" height="18" rx="7" className={styles.botHead} />
      <circle cx="16" cy="23" r="1.7" className={styles.botEye} />
      <circle cx="24" cy="23" r="1.7" className={styles.botEye} />
      <line x1="20" y1="14" x2="20" y2="8" className={styles.botStem} />
      <circle cx="20" cy="6" r="2.3" className={styles.botTip} />
    </svg>
  );
}

function CheckBadgeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4.5 12.5L9 17L19.5 6" />
    </svg>
  );
}


const STEPS = [
  { id: 'name', kind: 'text', autoComplete: 'name', prompt: () => 'היי! מה השם שלך?' },
  { id: 'email', kind: 'email', autoComplete: 'email', prompt: (v) => `נעים להכיר, ${v.name}! מה כתובת המייל שלך?` },
  { id: 'projectType', kind: 'chips', prompt: () => 'מעולה. על איזה סוג פרויקט מדובר?' },
  { id: 'message', kind: 'textarea', prompt: () => 'ספרי לי עוד — מה קורה היום, ומה היית רוצה שיקרה לבד?' },
];

const REVIEW_STEP = STEPS.length;

/**
 * טופס יצירת קשר כשיחה: שאלה אחת בכל פעם, בסגנון צ'אט, במקום כל
 * השדות ביחד — לא הטופס הסטנדרטי שכל אתר-SaaS נראה איתו אותו דבר.
 */
export function ContactSection() {
  const { contact } = content;
  const [ref, inView] = useInView({ threshold: 0.15 });
  const { register, errors, isSubmitting, handleSubmit, trigger, setValue, getValues, status } = useContactForm();

  const [stepIndex, setStepIndex] = useState(0);
  const [transcript, setTranscript] = useState([{ role: 'bot', text: STEPS[0].prompt({}) }]);
  const [botTyping, setBotTyping] = useState(false);
  const logRef = useRef(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [transcript, botTyping, stepIndex]);

  // ref-callback במקום useEffect+ref רגיל: רץ בו-זמנית עם ה-commit של
  // האלמנט, בלי תלות בתזמון עדין של אפקטים נפרדים. ה-key על השדה
  // (למטה) מבטיח שזה אלמנט DOM חדש בכל שלב, כדי שהקולבק ירוץ שוב.
  const focusIfVisible = (node) => {
    if (!node || !inView || botTyping) return;
    // במסך מגע לא מקפיצים מקלדת (ולא מגלגלים את הדף) עוד לפני שהמשתמשת
    // התחילה להקליד; מהשלב השני, המקלדת כבר פתוחה והמעבר חלק.
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch && stepIndex === 0) return;
    node.focus({ preventScroll: true });
  };

  const labelFor = (fieldId, value) => {
    if (fieldId === 'projectType') return PROJECT_TYPE_OPTIONS.find((o) => o.value === value)?.label ?? value;
    return value;
  };

  const advance = (userAnswerText) => {
    const next = stepIndex + 1;
    setTranscript((t) => [...t, { role: 'user', text: userAnswerText }]);
    setBotTyping(true);
    window.setTimeout(() => {
      setBotTyping(false);
      setTranscript((t) => [
        ...t,
        {
          role: 'bot',
          text:
            next < STEPS.length
              ? STEPS[next].prompt(getValues())
              : 'מעולה, זה מה שיש לי. אפשר לתקן ישירות כאן ולשלוח.',
        },
      ]);
      setStepIndex(next);
    }, 550);
  };

  const goNext = async () => {
    const field = STEPS[stepIndex].id;
    const valid = await trigger(field);
    if (!valid) return;
    advance(labelFor(field, getValues(field)));
  };

  const onChipPick = async (value) => {
    setValue('projectType', value, { shouldValidate: true });
    const valid = await trigger('projectType');
    if (!valid) return;
    advance(labelFor('projectType', value));
  };

  const onKeyDownAdvance = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      goNext();
    }
  };

  const statusMessage =
    status === SUBMIT_STATUS.success
      ? 'הפנייה נשלחה בהצלחה, נחזור אליכם במהירות האפשרית.'
      : status === SUBMIT_STATUS.error
        ? `השליחה נכשלה. אפשר לנסות שוב${isConfigured(contact.email) ? ` או לכתוב ישירות ל-${contact.email}` : ''}.`
        : status === SUBMIT_STATUS.cooldown
          ? 'הפנייה הקודמת כבר התקבלה. אפשר לשלוח שוב בעוד חצי דקה.'
          : '';

  const showQuickContact = isConfigured(contact.email) || isConfigured(contact.whatsapp);
  const currentStep = STEPS[stepIndex];
  // register() מחזיר גם ref משלו (למעקב הפנימי של react-hook-form) — צריך
  // למזג עם focusIfVisible, לא להחליף אותו (ref אחד "מנצח" את השני ב-JSX).
  const activeField = currentStep && currentStep.kind !== 'chips' ? register(currentStep.id) : null;
  const mergedFieldRef = (node) => {
    activeField?.ref(node);
    focusIfVisible(node);
  };

  return (
    <section id={SECTION_IDS.contact} className={styles.section} aria-labelledby={HEADING_ID}>
      <div ref={ref} className={cn(styles.container, inView && styles.reveal)}>
        <div className={styles.intro}>
          <SectionHeader id={HEADING_ID} eyebrow={contact.eyebrow} title={contact.heading} description={contact.body} gradient />

          <div className={styles.robot}>
            <PointingRobot />
          </div>

          {showQuickContact && (
            <div className={styles.quickContact}>
              {isConfigured(contact.email) && (
                <a className={styles.quickLink} href={`mailto:${contact.email}`}>
                  <MailIcon className={styles.quickIcon} />
                  <span dir="ltr">{contact.email}</span>
                </a>
              )}
              {isConfigured(contact.whatsapp) && (
                <a className={styles.quickLink} href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                  <WhatsappIcon className={styles.quickIcon} />
                  וואטסאפ
                </a>
              )}
            </div>
          )}
        </div>

        <div className={styles.cardWrap}>
          <div className={styles.glow} aria-hidden="true" />
          <form className={styles.chatCard} onSubmit={handleSubmit} noValidate>
            <div className={styles.chatLog} ref={logRef} aria-live="polite">
              {transcript.map((entry, i) => (
                <div key={i} className={cn(styles.bubbleRow, entry.role === 'user' ? styles.bubbleRowUser : styles.bubbleRowBot)}>
                  {entry.role === 'bot' && <BotAvatar className={styles.avatar} />}
                  <p className={cn(styles.bubble, entry.role === 'user' ? styles.bubbleUser : styles.bubbleBot)}>{entry.text}</p>
                </div>
              ))}

              {!botTyping && status === SUBMIT_STATUS.idle && stepIndex >= REVIEW_STEP && (
                <div className={styles.reviewCard}>
                  <div className={styles.reviewField}>
                    <label htmlFor="review-name" className={styles.reviewLabel}>שם</label>
                    <input id="review-name" type="text" autoComplete="name" maxLength={FORM_LIMITS.nameMax} {...register('name')} />
                    {errors.name?.message && <p className={styles.fieldError}>{errors.name.message}</p>}
                  </div>

                  <div className={styles.reviewField}>
                    <label htmlFor="review-email" className={styles.reviewLabel}>מייל</label>
                    <input id="review-email" type="email" dir="ltr" autoComplete="email" {...register('email')} />
                    {errors.email?.message && <p className={styles.fieldError}>{errors.email.message}</p>}
                  </div>

                  <div className={styles.reviewField}>
                    <label htmlFor="review-type" className={styles.reviewLabel}>סוג פרויקט</label>
                    <select id="review-type" {...register('projectType')}>
                      {PROJECT_TYPE_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    {errors.projectType?.message && <p className={styles.fieldError}>{errors.projectType.message}</p>}
                  </div>

                  <div className={styles.reviewField}>
                    <label htmlFor="review-message" className={styles.reviewLabel}>הודעה</label>
                    <textarea id="review-message" rows={3} maxLength={FORM_LIMITS.messageMax} {...register('message')} />
                    {errors.message?.message && <p className={styles.fieldError}>{errors.message.message}</p>}
                  </div>
                </div>
              )}

              {botTyping && (
                <div className={cn(styles.bubbleRow, styles.bubbleRowBot)}>
                  <BotAvatar className={styles.avatar} />
                  <span className={styles.typing}>
                    <span /><span /><span />
                  </span>
                </div>
              )}

              {status === SUBMIT_STATUS.success && (
                <div className={cn(styles.bubbleRow, styles.bubbleRowBot)}>
                  <BotAvatar className={styles.avatar} />
                  <p className={cn(styles.bubble, styles.bubbleBot, styles.bubbleSuccess)}>
                    <CheckBadgeIcon className={styles.successIcon} />
                    {statusMessage}
                  </p>
                </div>
              )}

              {(status === SUBMIT_STATUS.error || status === SUBMIT_STATUS.cooldown) && (
                <div className={cn(styles.bubbleRow, styles.bubbleRowBot)}>
                  <BotAvatar className={styles.avatar} />
                  <p className={cn(styles.bubble, styles.bubbleBot, styles.bubbleError)}>{statusMessage}</p>
                </div>
              )}
            </div>

            {!botTyping && status === SUBMIT_STATUS.idle && stepIndex < REVIEW_STEP && (
              <div className={styles.composer}>
                {currentStep.kind === 'chips' ? (
                  <div className={styles.chips}>
                    {PROJECT_TYPE_OPTIONS.map(({ value, label }) => (
                      <button key={value} type="button" className={styles.chip} onClick={() => onChipPick(value)}>
                        {label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className={styles.composerRow}>
                    {currentStep.kind === 'textarea' ? (
                      <textarea
                        key={currentStep.id}
                        rows={2}
                        maxLength={FORM_LIMITS.messageMax}
                        placeholder="הקלידי כאן…"
                        onKeyDown={onKeyDownAdvance}
                        {...activeField}
                        ref={mergedFieldRef}
                      />
                    ) : (
                      <input
                        key={currentStep.id}
                        type={currentStep.kind}
                        dir={currentStep.kind === 'email' ? 'ltr' : undefined}
                        autoComplete={currentStep.autoComplete}
                        maxLength={currentStep.id === 'name' ? FORM_LIMITS.nameMax : undefined}
                        placeholder="הקלידי כאן…"
                        onKeyDown={onKeyDownAdvance}
                        {...activeField}
                        ref={mergedFieldRef}
                      />
                    )}
                    <button type="button" className={styles.sendStep} onClick={goNext} aria-label="המשך">
                      <SendIcon />
                    </button>
                  </div>
                )}
                {errors[currentStep.id]?.message && <p className={styles.fieldError}>{errors[currentStep.id].message}</p>}
              </div>
            )}

            {!botTyping && status === SUBMIT_STATUS.idle && stepIndex >= REVIEW_STEP && (
              <div className={styles.composer}>
                <button type="submit" className={styles.sendFinal} disabled={isSubmitting} aria-busy={isSubmitting}>
                  {isSubmitting ? 'שולח…' : 'שליחת פנייה'}
                  <SendIcon />
                </button>
              </div>
            )}

            {/* Honeypot – מוסתר מאנשים ומקוראי מסך */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="website">אתר</label>
              <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
