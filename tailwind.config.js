export default {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    borderWidth: {
      1: "1px",
      2: "2px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        "neon-green": "#00FF87",
      },
    },
  },
  plugins: [],
};
