/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-transparent': 'rgba(144, 245, 223, 0.5)',
        main: 'rgb(144, 245, 223)',
        secondary: 'rgb(252, 176, 160)',
        'secondary-transparent': 'rgb(252, 176, 160, 0.5)',
      },
    },
  },
  plugins: [],
}
