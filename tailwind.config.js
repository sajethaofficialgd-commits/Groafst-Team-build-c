module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f6ff",
          100: "#dfe9ff",
          200: "#b9ccff",
          300: "#8cabff",
          400: "#5e8aff",
          500: "#3b6dff",
          600: "#2b53d6",
          700: "#1f3da8",
          800: "#162b77",
          900: "#111f54"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(17, 31, 84, 0.12)"
      }
    }
  },
  plugins: []
};
