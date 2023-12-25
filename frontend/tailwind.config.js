/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#646cff",
        secondary: "#e74c3c",
     },
      backgroundColor: {
        primary_bg: "#f3f3f3", // Repeat the primary background color code here
      },
    },
  },
  plugins: [],
};
