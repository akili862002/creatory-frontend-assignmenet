const plugin = require("tailwindcss/plugin");

const utilsPlugin = plugin(function ({
  addBase,
  addComponents,
  theme
}) {
  addComponents({
    ".icon-lg": {
      width: "40px",
      height: "40px",
    },
    ".icon-md": {
      width: "24px",
      height: "24px",
    },
    ".icon-sm": {
      width: "20px",
      height: "20px",
    },
    ".icon-tn": {
      width: "16px",
      height: "16px",
    },
    ".move-center-x": {
      left: "50%",
      transform: "translateX(-50%)",
    },
    ".move-center-y": {
      top: "50%",
      transform: "translateY(-50%)",
    },
    ".move-center": {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    ".paragraph-with-2-line": {
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    ".center-children": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{.js,.jsx,.ts,.tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    utilsPlugin
  ],
}
