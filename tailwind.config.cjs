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
    extend: {
      keyframes: {
        fadedown: {
          "0%": {
            transform: "translate3d(0, -100%, 0)",
            opacity: 0,
          },
          "100%": {
            transform: "translate3d(0, 0, 0)",
            opacity: 1,
          },
        },
      },
      animation: {
        "slide-fade-down": "fadedown 0.25s ease-in",
      },
    },
    screens: { xs: "480px", sm: "768px", md: "1060px" },
  },
  plugins: [],
};
