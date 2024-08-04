import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#008000",
        primary_DM: "#339933",
        green_100: "#2C692C",
        green_200: "#014501",
        green_300: "#ADD6AD",
        green_700: "#047857",
        black_100: "#0A0909",
        black_200: "#010101",
        black_300: "#212121",
        black_400: "#141414",
        grey_100: "#323232",
        grey_200: "#6B6A6A",
        customgreen: "#8db391",
        offwhite: "#F9F9F9",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
