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
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#fb923c",
          "primary-content": "#f97316",
          secondary: "#4c1d95",
          "secondary-focus": "#2577be",
          "secondary-content": "#fff",
          accent: "#db2777",
          neutral: "#191D24",
          "base-100": "#f9fafb",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
