/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#cf2e2e",

          secondary: "#bc4821",

          accent: "#F6F5F6",

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
