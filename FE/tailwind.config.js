/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-orange": "#f4b282",
        "custom-yellow": "#f6cf8d",
        "custom-green": "#97ce9b",
      },
      fontFamily: {
        GmarketSans: ["var(--gmarket-sans)"],
      },
    },
  },
  plugins: [],
};
