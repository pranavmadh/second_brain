/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        brain : {
          500 : '#5046e4',
          400 : '#3e38a7',
          300 : '#e0e7fe'
        }
      }
    },
  },
  plugins: [],
}