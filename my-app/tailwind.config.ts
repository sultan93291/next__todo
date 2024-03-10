import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rgba: "rgba(255,255,255,0.1)",
        black_rgba: "rgba(0,0,0,0.2)",
      },
      fontFamily: {
        poppins: '"Poppins", sans - serif',
        roboto: '"Roboto Slab", serif',
        nunito:'"Nunito", sans-serif'
      },
      screens: {
        xs: "320px",
        sm: "465px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        xxl:"1920px"
      }
    },
  },
  plugins: [],
};
export default config;
