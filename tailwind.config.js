/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        greenroots_green: '#6A9C89',
        greenroots_orange: '#CD5C08',
        greenroots_sand: '#FFF9F3',
      }
    },
  },
  plugins: [],
};

