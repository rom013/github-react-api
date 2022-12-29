/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bg-gradient" : "url(./public/gradient.jpg)"
      }
    },
  },
  plugins: [],
}
