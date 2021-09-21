module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        bounce: "bounce linear 1s 2 forwards",
      },
    },
    fontSize: {
      midLarge: "62px",
      mid: "30px",
    },
    colors: {
      light: "#fefefe",
      "extra-light": "#5a5a5a",
    },
    borderColor: {
      light: "#fefefe",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
