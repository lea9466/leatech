/** מחבר שמות מחלקות ומדלג על ערכים ריקים */
export const cn = (...classes) => classes.filter(Boolean).join(' ');
