/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pearl: "#FAFAFA",
        obsidian: "#111827",
        // Rapido Iconic Electric Yellow Palette
        brand: {
          50: "#FEFCE8",
          100: "#FEF9C3",
          200: "#FEF08A",
          300: "#FDE047",
          400: "#FACC15",
          500: "#F9D024", // Primary Rapido Yellow
          600: "#EAB308",
          700: "#CA8A04",
          800: "#854D0E",
          900: "#713F12",
          950: "#422006",
        },
        yellow: {
          50: "#FEFCE8",
          100: "#FEF9C3",
          200: "#FEF08A",
          300: "#FDE047",
          400: "#FACC15",
          500: "#F9D024",
          600: "#EAB308",
          700: "#CA8A04",
          800: "#854D0E",
          900: "#713F12",
        },
        gold: {
          50: "#FEFCE8",
          100: "#FEF9C3",
          200: "#FEF08A",
          300: "#FDE047",
          400: "#FACC15",
          500: "#F9D024",
          600: "#EAB308",
          700: "#CA8A04",
          800: "#854D0E",
          900: "#713F12",
        },
        emerald: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
          950: "#052E16",
        }
      },
      boxShadow: {
        'rapido': '0 10px 25px -5px rgba(249, 208, 36, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'rapido-card': '0 12px 30px -4px rgba(0, 0, 0, 0.06), 0 4px 8px -2px rgba(0, 0, 0, 0.04)',
        'yellow-glow': '0 0 25px rgba(249, 208, 36, 0.5)',
      },
      animation: {
        'sonar': 'sonar 2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        sonar: {
          '0%': { transform: 'scale(0.8)', opacity: '0.9' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }
    },
  },
  plugins: [],
};
