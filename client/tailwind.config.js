/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        "theme-500": "#E62E32",
        "theme-600": "#65CCDB",
        "theme-700": "#0B1D2B",
      }
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)'
        }
      }
    }
  },
  plugins: [],
}

