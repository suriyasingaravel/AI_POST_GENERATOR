/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#874CFC",
        accent: "#a084f3",
        background: "#f7f7fe",
        "primary-light": "#c9b9f9",
        "primary-dark": "#5a2fcf",
      },
    },
  },
  plugins: [],
};
