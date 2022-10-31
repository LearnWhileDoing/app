const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports =
  process.env.NODE_ENV === "development"
    ? { webpack5: true }
    : withPWA({
        dest: "public",
        runtimeCaching,
      });
