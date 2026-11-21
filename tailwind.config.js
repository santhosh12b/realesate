/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: '#164C40',
          dark: '#0F372E',
          light: '#1F6354',
        },
        warmwhite: {
          DEFAULT: '#F8F9F4',
          dark: '#F0F2EB',
        },
        orange: {
          sunshine: '#E99A37',
          hover: '#D68826',
        },
        sage: {
          soft: '#DCE9DF',
          border: '#C8DBD0',
        },
        charcoal: {
          dark: '#263A35',
          muted: '#4C615C',
        },
        border: {
          light: '#E5EAE4',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

