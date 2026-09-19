# תיק עבודות – React + Vite

## הרצה
npm install
npm run dev

## חיבור הטופס לאוטומציה
העתיקו את `.env.example` ל-`.env` והגדירו `VITE_CONTACT_ENDPOINT` (Webhook של Make / n8n).
באחסון (Vercel): להוסיף את אותו משתנה ב-Project Settings ← Environment Variables ולעשות Redeploy.
בלי כתובת – הטופס עובד במצב הדגמה ולא שולח כלום.

## מבנה
- `constants/` – כל התוכן (טקסטים, פרויקט, שירותים). עריכת תוכן = עריכה כאן בלבד.
- `components/layout` – Layout (הדר + פוטר + children).
- `components/sections` – סקשן לכל תיקייה, עם CSS Module משלו.
- `components/ui` – רכיבים רב-פעמיים.
- `hooks/`, `utils/`, `services/` – לוגיקה מופרדת מהתצוגה.

## אבטחה – מה עוד צריך בצד השרת
ולידציה בצד הלקוח היא חוויית משתמש, לא הגנה. ב-Webhook/שרת:
אימות מחדש של כל השדות, Rate limiting לפי IP, והגדרת headers
(Content-Security-Policy, X-Frame-Options / frame-ancestors) ברמת האחסון (Netlify/Vercel).
