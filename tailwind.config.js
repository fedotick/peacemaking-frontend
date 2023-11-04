/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: 'var(--orange)',
        orangeHover: 'var(--orange-hover)',
        gray: 'var(--gray)',
        blue: 'var(--blue)'
      }
    },
  },
  plugins: [],
}