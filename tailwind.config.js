const formKitTailwind = require("@formkit/themes/tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./formkit/theme.ts",
  ],
  theme: {
    fontFamily: {
      sans: ["DM Sans", "sans-serif"],
    },
    extend: {
      colors: {
        // main green
        keppel: {
          50: "#f2fbf9",
          100: "#d4f3eb",
          200: "#a9e6d8",
          300: "#77d1c0",
          400: "#4ab7a6",
          500: "#35a999", // base
          600: "#257c73",
          700: "#21645d",
          800: "#1e514c",
          900: "#1d4440",
          950: "#0c2726",
        },
        // purple
        "moon-raker": {
          50: "#faf7fd",
          100: "#f3ecfb",
          200: "#e9dcf8",
          300: "#d5baf0",
          400: "#c198e8", //base
          500: "#a871db",
          600: "#9352cb",
          700: "#7e3fb1",
          800: "#6a3891",
          900: "#572e75",
          950: "#3a1754",
        },
        // blue
        "ice-cold": {
          50: "#eefbfd",
          100: "#d4f3f9",
          200: "#b7e9f4", // base
          300: "#77d3e9",
          400: "#38b7d8",
          500: "#1c9abe",
          600: "#1a7ca0",
          700: "#1c6482",
          800: "#1f536b",
          900: "#1e455b",
          950: "#0e2c3e",
        },
        // green
        chinook: {
          50: "#f2fbf3",
          100: "#e0f8e3",
          200: "#c3efc9",
          300: "#a0e5ab", // base
          400: "#5dcb6f",
          500: "#37b04b",
          600: "#28913a",
          700: "#237230",
          800: "#205b2a",
          900: "#1c4b25",
          950: "#0a2911",
        },
        // red
        "mandys-pink": {
          50: "#fdf3f3",
          100: "#fbe5e5",
          200: "#f9cfcf",
          300: "#f3afaf", // base
          400: "#ea7f7f",
          500: "#dd5656",
          600: "#c93939",
          700: "#a92c2c",
          800: "#8c2828",
          900: "#752727",
          950: "#3f1010",
        },
        // orange
        chardonnay: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fec78d", // base
          400: "#fc923b",
          500: "#fa7415",
          600: "#eb590b",
          700: "#c3410b",
          800: "#9b3411",
          900: "#7d2d11",
          950: "#431407",
        },
        // yellow
        texas: {
          50: "#fdfde9",
          100: "#f7f9ae", // base
          200: "#f8f790",
          300: "#f3eb51",
          400: "#eedc21",
          500: "#dec414",
          600: "#bf9a0f",
          700: "#996f0f",
          800: "#7f5914",
          900: "#6c4817",
          950: "#3f2609",
        },

        // ...
      },
    },
  },
  plugins: [formKitTailwind, require("@tailwindcss/container-queries")],
};
