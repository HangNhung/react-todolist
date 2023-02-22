/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/*.{js,ts,tsx,jsx}",
    "./src/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    fontFamily: {
      Poppins: "Poppins",
    },
    extend: {},
    screens: { xs: "480px", sm: "768px", md: "1060px" },
  },
  plugins: [],
};
