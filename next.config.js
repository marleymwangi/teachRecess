const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "i.imgur.com",
      "api.lorem.space",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
    ],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    swSrc: "service-worker.js",
    disable: process.env.NODE_ENV === "development",
  },
});
