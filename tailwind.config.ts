export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "permanent-marker": ['"Permanent Marker"', "cursive"],
        signika: ['"Signika"', "sans-serif"],
        "jersey-20": ['"Jersey 20", sans-serif'],
        nunito: ['"Nunito", sans-serif'],
      },
      colors: {
        "primary-blue": "#293296",
        "vermelho-escuro": "#962929",
        "amarelo-escuro": "#968D29",
        cinza: "#C4C4C4",
      },
    },
  },
  plugins: [],
}