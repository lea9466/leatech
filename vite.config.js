import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // שמות מחלקות קריאים בפיתוח, מקוצרים בפרודקשן
      generateScopedName: process.env.NODE_ENV === 'production'
        ? '[hash:base64:6]'
        : '[name]__[local]__[hash:base64:4]',
    },
  },
});
