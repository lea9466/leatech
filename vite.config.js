import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentPath = path.resolve(__dirname, 'src/data/site-content.json');

/**
 * כלי ניהול תמונות לפיתוח בלבד: מפעיל רק בתוך configureServer (כלומר
 * ב-vite dev), לא נכנס לבנייה לפרודקשן. חושף שני endpoint-ים
 * שמשרתים את admin-images.html — רשימת התמונות לכל פרויקט ומחיקה
 * בפועל (קובץ + הסרה מה-JSON).
 */
function imageAdminPlugin() {
  return {
    name: 'image-admin-tool',
    configureServer(server) {
      server.middlewares.use('/api/admin/images', (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405;
          return res.end();
        }
        const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
        const projects = content.projects.map((p) => ({
          id: p.id,
          name: p.name,
          title: p.title,
          images: p.images.map((imgPath) => {
            const fsPath = path.join(__dirname, 'public', imgPath);
            let size = null;
            try {
              size = fs.statSync(fsPath).size;
            } catch {
              size = null;
            }
            return { path: imgPath, size };
          }),
        }));
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ projects }));
      });

      server.middlewares.use('/api/admin/delete-images', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end();
        }
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const { items } = JSON.parse(body);
            const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
            const results = [];
            for (const { projectId, path: imgPath } of items) {
              const project = content.projects.find((p) => p.id === projectId);
              if (!project) {
                results.push({ path: imgPath, ok: false, error: 'פרויקט לא נמצא' });
                continue;
              }
              const idx = project.images.indexOf(imgPath);
              if (idx === -1) {
                results.push({ path: imgPath, ok: false, error: 'התמונה כבר לא ברשימת הפרויקט' });
                continue;
              }
              project.images.splice(idx, 1);
              const fsPath = path.join(__dirname, 'public', imgPath);
              try {
                if (fs.existsSync(fsPath)) fs.unlinkSync(fsPath);
                results.push({ path: imgPath, ok: true });
              } catch (e) {
                results.push({ path: imgPath, ok: false, error: String(e) });
              }
            }
            fs.writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`, 'utf-8');
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ results }));
          } catch (e) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ error: String(e) }));
          }
        });
      });

      server.middlewares.use('/api/admin/projects', (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405;
          return res.end();
        }
        const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ projects: content.projects }));
      });

      server.middlewares.use('/api/admin/save-projects', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end();
        }
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const { projects } = JSON.parse(body);
            if (!Array.isArray(projects)) throw new Error('projects חייב להיות מערך');

            const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
            const existingIds = new Set(content.projects.map((p) => p.id));
            for (const p of projects) {
              if (!p.id || !existingIds.has(p.id)) {
                throw new Error('פרויקט לא מוכר: ' + p.id);
              }
            }
            if (projects.length !== content.projects.length) {
              throw new Error('מספר הפרויקטים לא תואם');
            }

            content.projects = projects;
            fs.writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`, 'utf-8');
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ ok: true }));
          } catch (e) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ ok: false, error: String(e) }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), imageAdminPlugin()],
  css: {
    modules: {
      // שמות מחלקות קריאים בפיתוח, מקוצרים בפרודקשן
      generateScopedName: process.env.NODE_ENV === 'production'
        ? '[hash:base64:6]'
        : '[name]__[local]__[hash:base64:4]',
    },
  },
});
