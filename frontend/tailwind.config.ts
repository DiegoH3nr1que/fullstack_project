import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'custom-gradient': 'linear-gradient(0deg, #1a272f 0%, #1b2830 16.67%, #1c2931 33.33%, #1d2a32 50%, #19262e 66.67%, #1a1817 83.33%, #000000 100%)',
        'custom-gradient2': 'radial-gradient(circle at 46.34% 91.8%, #0090b3 0%, #1c5c73 25%, #19272f 50%, #000000 75%, #000000 100%)',
      },
      colors:{
        'custom-button': '#1c5c73',
      }
    },
  },
  plugins: [],
};
export default config;
