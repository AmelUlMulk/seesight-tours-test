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
    customDiv: {
      qouteDiv:
        'clip-path: polygon(0% 0%, 100% 0%, 100% 81%, 41% 81%, 31% 100%, 19% 82%, 0 82%)'
    }
  },
  plugins: []
};
