/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
        sans:    ['Inter',   'ui-sans-serif', 'system-ui'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink:   { DEFAULT: '#1F2937', soft: '#374151', muted: '#6B7280', faint: '#9CA3AF' },
        paper: { DEFAULT: '#FFFFFF', soft: '#F8F9FA', warm: '#FEF7F0' },
        brand: { DEFAULT: '#F97316', deep: '#EA580C', tint: '#FFEDD5', soft: '#FFF7ED' },
        aqua:  { DEFAULT: '#06B6D4', deep: '#0891B2', tint: '#CFFAFE', soft: '#ECFEFF' },
        line:  '#E5E7EB',
      },
      borderRadius: { card: '14px', btn: '12px', pill: '999px' },
      boxShadow: {
        soft: '0 1px 2px rgba(17,24,39,.04), 0 4px 14px rgba(17,24,39,.06)',
        card: '0 1px 2px rgba(17,24,39,.04), 0 8px 24px rgba(17,24,39,.08)',
        lift: '0 8px 16px rgba(249,115,22,.18), 0 16px 36px rgba(17,24,39,.10)',
        glow: '0 10px 30px rgba(6,182,212,.22)',
      },
    },
  },
};
