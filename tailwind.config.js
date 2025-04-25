/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "safe-nest-red": "#EF4444", // Custom red to match your dashboard's theme
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Optional: Enhances form styling
  ],
};
