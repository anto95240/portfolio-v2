import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily:{
      title: ["var(--font-title)"],
      text: ["var(--font-text)"],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'light-blue': '#639DF0',
        'light-green': '#24F4BA',
        'green-blue': '#96ECE1',
        'blue-darkBlue': '#36A7F8',
        'dark-blue': '#1D2B64',
        'green-outil': '#2ECC71',
        'blue-outil': '#10589F',
        'green-projet': '#26C460',
        'blue-projet': '#2181CC',
        'blue-footer': '#1B3A5F',
        'blue-popup': '#274B6D',
        'menu-cv': '#13339A',
        'menuCV-lightBlue': '#1596C1',
        'category-blue': '#77D8FF',
        'category-green': '#10DFB9',
      },
    },
  },
  plugins: [],
} satisfies Config;
