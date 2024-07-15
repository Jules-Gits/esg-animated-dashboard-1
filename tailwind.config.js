module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'blue-light': '#2425aa',
        'blue-dark': '#00005c',
      },
      fontFamily: {'custom': ['PublicoWeb'],}
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}