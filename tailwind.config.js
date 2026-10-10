/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        rosepetal: '#f6a8bd',
        berry: '#a8325b',
        inkrose: '#542b3b',
      },
    },
  },
  plugins: [],
}