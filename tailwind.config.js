/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#6B7280',
        background: '#F3F4F6',
        text: {
          primary: '#1F2937',
          secondary: '#4B5563'
        }
      }
    },
  },
  plugins: [],
}
