/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        main: '#FF6500', 
        grey: '#F4F5FB',
        textColor: '#000000',
        background: '#ffffff',
       
      },
    },
  },
  plugins: [],
}
