/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#308ce8",
        "primary-dark": "#206bc4",
        "background-light": "#f6f7f8",
        "background-dark": "#111921",
        "surface-dark": "#1A2633",
        "surface-light": "#FFFFFF",
        "nap": "#FFD54F",
        "pastel-blue": "#E3F2FD",
        "pastel-purple": "#F3E5F5",
        "pastel-green": "#E8F5E9",
        "card-dark": "#1a232e",
        "card-light": "#ffffff",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "Noto Sans KR", "sans-serif"],
        "sans": ["Plus Jakarta Sans", "sans-serif"], // Also set as default sans
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "2xl": "2rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
