/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["poppins", "heveltica", "sans-serif"],
    },
    extend: {
      "custom-bg": "url('assets/login_page_2.jpg')",
      boxShadow: {
        custom:
          "0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
