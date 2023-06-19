/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'josefin-sans': ['Josefin_Sans', 'sans-serif'],
        'orbit': ['Orbit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

