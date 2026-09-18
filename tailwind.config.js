/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#061525', // Main background
          800: '#0D2943', // Secondary background/cards
        },
        primary: {
          DEFAULT: '#1683F7', // Primary blue
          light: '#2196FF', // Bright blue
        },
        cyan: {
          DEFAULT: '#00E5FF', // Cyan highlights
        },
        success: {
          DEFAULT: '#10B981', // Green for completed
        },
        warning: {
          DEFAULT: '#F59E0B', // Orange for cost
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
