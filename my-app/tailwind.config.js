/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",  ],
  theme: {
    extend: {
      colors:{
        "primary":"#111827",
        "light-secondary":"#f9fafb",
        "primary-focus":"#1f2937",
        "secondary":"#374151",
        "borderCol":"#333c4a",
        "textCol":"#8f938e",
        "buttonCol":"#2563eb"
      }
    },
  },
  plugins: [require("daisyui"),require('flowbite/plugin')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}

