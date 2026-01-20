/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-blue': '#000080',
        'slate-gray': '#708090',
        'taxi-yellow': '#FFD700',
      },
    },
  },
  plugins: [],
}
