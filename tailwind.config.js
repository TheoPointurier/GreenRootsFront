/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        greenroots_green: '#6A9C89',
        greenroots_orange: '#CD5C08',
        greenroots_sand: '#FFF9F3',
        greenroots_grey: '#B7B7B7',
        greenroots_white: '#FFF',
      },
      fontSize: {
        h1: ['2.25rem', '2.5rem'], // Taille de police et hauteur de ligne
        h2: ['1.875rem', '2.25rem'],
        h3: ['1.5rem', '2rem'],
      },
    },
  },
  plugins: [],
};
