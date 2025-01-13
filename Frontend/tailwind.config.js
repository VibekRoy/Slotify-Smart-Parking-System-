/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["poppins", "heveltica", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        'custom-bg': "url('/src/assets/login_page_2.jpg')",
      },
    },
  },
  plugins: [],
};
