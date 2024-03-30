/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#222831",
        foreground: "#31363f",
        accent: "#76abae",
        offwhite: "#eeeeee",
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
