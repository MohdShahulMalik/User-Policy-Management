// prettier.config.js
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx"],
  tailwindStylesheet: "src/styles/main.css",
}
