/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      headings: "'Playfair Display', serif;",
    },
    container: {
      center: true,
      padding: "20px",
    },
    extend: {
      dropShadow: {
        themeshadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/images/homebg.webp')",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#cf2e2e",

          secondary: "#bc4821",

          accent: "#F1F5F9",

          neutral: "#161616",

          "base-100": "#ffffff",

          info: "#1F59EA",

          success: "#1BB159",

          warning: "#E67D14",

          error: "#F94C39",
        },
      },
    ],
  },
};
