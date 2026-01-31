import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
       colors: {
      school: "#951B1C",
    },
    },
  },
  plugins: [daisyui],
};
