import { Config } from 'tailwindcss';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#F9A826", // Naranja claro
        secondary: "#A7C7E7", // Azul claro
        success: "#98FB98", // Verde menta
        danger: "#FF7F50", // Coral
        warning: "#FFD700", // Amarillo brillante
        info: "#FADADD", // Rosa pastel
        light: "#F5F5DC", // Beige
        dark: "#D2B48C", // Marrón claro
        muted: "#F0F0F0", // Gris claro
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Texto principal
        title: ["Poppins", "sans-serif"], // Títulos
        fun: ["Chewy", "cursive"], // Letras divertidas
      },
    },
  },
  plugins: [],
} satisfies Config;

