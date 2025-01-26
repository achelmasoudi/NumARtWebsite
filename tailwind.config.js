/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          800: '#6A1B9A',
          900: '#4A148C',
        },
        green: {
          500: '#37A000', // Your primary green
          600: '#2B8000', // Optional darker variant
        },
      },
    },
  },
  plugins: [],
};