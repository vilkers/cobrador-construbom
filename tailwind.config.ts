import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Identidade Rede Construbom: azul + amarelo
        brand: {
          50: "#eef5ff",
          100: "#d9e8ff",
          200: "#bcd6ff",
          300: "#8ebcff",
          400: "#5897ff",
          500: "#0A4C9E", // azul primário
          600: "#093f86",
          700: "#07347A",
          800: "#062a63",
          900: "#04204d",
        },
        accent: {
          DEFAULT: "#F5B700", // amarelo Construbom
          dark: "#d39e00",
        },
        // Semáforo de cobrança
        verde: "#16A34A",
        amarelo: "#F59E0B",
        vermelho: "#DC2626",
        cinza: "#6B7280",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(15,23,42,0.08), 0 1px 2px rgba(15,23,42,0.04)",
        cardhover: "0 6px 20px rgba(15,23,42,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
