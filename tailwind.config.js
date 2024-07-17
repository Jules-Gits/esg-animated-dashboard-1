module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'blue-light': '#2425aa',
        'blue-dark': '#00005c',
        'cobalt-light': '#5e83c2',
        'cobalt-hover': '#5173a5',
      },
      fontFamily: {'custom': ['PublicoWeb'],}
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}