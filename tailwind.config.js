/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          primary: "#FF8FB1",
          secondary: "#FFD6E7",
          bg: "#FFF5F8",
          text: "#5B4B52",
        }
      },
    },
  },
  plugins: [],
}