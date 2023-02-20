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

      lg: '1024px',

      xl: '1280px',

      '2xl': '1536px',

      '3xl': '1800px',

      '4xl': '2200px'
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        modalWrapper: 'rgba(28, 28, 28, 0.8)'
      }
    }
  },
  plugins: []
};
