const withPreact = require("next-plugin-preact");
const fs = require("fs");

fs.copyFileSync("node_modules/preact/compat/jsx-runtime.js", "node_modules/preact/compat/jsx-dev-runtime.js")
fs.copyFileSync("node_modules/preact/compat/jsx-runtime.mjs", "node_modules/preact/compat/jsx-dev-runtime.mjs")

module.exports = withPreact({
  experimental: {
    modern: true,
  },
});
