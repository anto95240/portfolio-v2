import { title } from "process";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
      },
    },
  },
  plugins: [],
} satisfies Config;
