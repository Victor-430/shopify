/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{jsx,tsx,js,ts}"],
  theme: {
    extend: {
      colors: {
        blue: {
          veryDark: "#1D2025",
          darkGrayish: "#68707D",
          grayish: "#B6BCC8",
          lightGrayish: "#F7F8FD",
        },
        orange: {
          DEFAULT: "#FF7D1A",
          pale: "#FFEDE0",
        },
        white: "#FFFFFF",
        black75: "#000000BF",
      },
      fontFamily: {
        kumbh: ["Kumbh Sans", "sans-serif"],
      },
    },
  },
};
