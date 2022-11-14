/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        primary: '1px 3px 1px 2px #DBCBD8',
        secondary: '2px 2px 1px 2px #9AD',
        tertiary: '2px 2px 1px 2px #101935',
      },
    },
  },
  plugins: [],
};
