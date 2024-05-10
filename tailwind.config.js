/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

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
      },
      fonts: {
        outfit: ["Outfit", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        pop: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.25)" },
        },
      },
      animation: {
        pop: "pop 0.4s ease-in-out",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
