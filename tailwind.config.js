const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      xxsm: '250px',

      xsm: '370px',

      sm: '640px',

      md: '768px',
      mmd: '945px',
      lg: '1024px',

      xl: '1280px',

      '2xl': '1536px',

      '3xl': '1800px',

      '4xl': '2200px'
    },
    extend: {
      colors: {
        modalWrapper: 'rgba(28, 28, 28, 0.8)'
      },
      boxShadow: {
        guidesBox: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        guideimageBox: '-10px -11px 0px 1px #2191fa',
        smallguideimageBox: '-5px -4px 0px 1px #2191fa',
        moreguideBox: '0px 9px 9px rgb(0 0 0 / 25%)',
        tourExpImgBox: '1px -5px 0px 1px #2191fa'
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
};
