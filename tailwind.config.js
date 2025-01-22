/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "group-hover:w-[157px]",
    "group-hover:h-[157px]",
    "group-hover:w-[230.51px]",
    "group-hover:h-[177px]",
  ],
  theme: {
    extend: {
      fontFamily: {
        general: ["General Sans", "sans-serif"],
      },
      backgroundColor: {
        primary: "#1D7C42",
        secondary: "#E8F2EC",
        light: "#F3F3F3",
      },
      colors: {
        primary: "#1D7C42",
        secondary: "#5E5F62",
        dark: "#0E1014",
      },
      boxShadow: {
        "custom-border": "0px 8px 24px rgba(149, 157, 165, 0.2)",
        "custom-light": "0px 7px 29px 0px rgba(100, 100, 111, 0.2)",
      },
    },
  },
  plugins: [],
};
