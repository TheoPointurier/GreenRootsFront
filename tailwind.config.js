/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        greenroots_green: '#6A9C89',
        greenroots_orange: '#CD5C08',
        greenroots_sand: '#FFF9F3',
      },
      title: {
        h1: 'font-size: 3rem; line-height: 3.25rem;',
        h2: 'font-size: 1.875rem; line-height: 2.25rem;',
        h3: 'font-size: 1.5rem; line-height: 2rem;',
      },
    },
  },
  plugins: [],
};

