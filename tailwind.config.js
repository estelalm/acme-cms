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
  theme: {
    extend: {
      colors:{
        'roxo-cinzento': '#8A6FAE',
        'roxo-claro': '#C1ABDE',
        'roxo': '#533280',
        'roxo-cinzento-claro': '#AC95CB',
        'roxo-escuro': '#271C48',
        'roxo-transparencia': '#3A285E'
      },
      backgroundImage:{
        'fundo-geral': 'linear-gradient(#8A6FAE, #5B3B85)'
      }
    },
    fontFamily: {
      'textos': ['"Inder"', 'sans-serif']
    }
  },
  plugins: [
    // ...
    require('tailwind-scrollbar')
]
}

