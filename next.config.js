/** @type {import('next').NextConfig} */
const withImages = require("next-images");

module.exports = withImages({
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
});
