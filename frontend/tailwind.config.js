/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#646cff', // Replace with your desired primary color code
        primaryBackground: '#ffcc00', // Replace with your desired primary background color code
      },
      backgroundColor: {
        primary_bg: '#f3f3f3', // Repeat the primary background color code here
      },
    },

  },
  plugins: [],
};
