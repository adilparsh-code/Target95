/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
          dark: "#1D4ED8",
        },
        secondary: {
          DEFAULT: "#4F46E5",
          light: "#6366F1",
          dark: "#4338CA",
        },
        accent: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
        },
        neutral: {
          DEFAULT: "#6B7280",
          light: "#9CA3AF",
          dark: "#4B5563",
        },
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
    },
  },
  plugins: [],
};