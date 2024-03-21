/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/*.html",
            "./src/js/*.js",
            "./index.html"],
  theme: {
    extend: {},
    fontFamily: {
      'inder': ['"Inder"', 'sans-serif']
    }
  },
  plugins: [],
}

