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

      lg: '1024px',

      xl: '1280px',

      '2xl': '1536px',

      '3xl': '1800px',

      '4xl': '2200px'
    },
    extend: {
      boxShadow: {
        guidesBox: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        guideimageBox: '-10px -11px 0px 1px #2191fa',
        moreguideBox: '0px 9px 9px rgb(0 0 0 / 25%)'
      }
    }
  },
  plugins: []
};
