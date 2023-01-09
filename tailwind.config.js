/** @type {import('tailwindcss').Config} */
// tailwind.config.cjs
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xxs: "320px",
      xs: "480px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        emma: {
          50: "#f4fbfa",
          100: "#cbeae4",
          200: "#a1d8cf",
          300: "#85cdc1",
          400: "#4db6a5",
          500: "#409c8d",
          600: "#358074",
          700: "#29655b",
          800: "#1e4942",
          900: "#122d29",
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#06b6d4",
          "primary-focus": "#0891b2",
          "primary-content": "#fff",
          accent: "#eab308",
          "accent-focus": "#ca8a04",
          "accent-content": "#111827",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
