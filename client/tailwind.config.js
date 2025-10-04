/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // Scan all React files
  ],
  theme: {
    extend: {},   // Custom colors, fonts, etc.
  },
  plugins: [],
}
