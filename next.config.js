/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  // images: {
  //   domains: ['storage.googleapis.com','rukminim2.flixcart.com','t4.ftcdn.net','rukminim1.flixcart.com'],
  //   minimumCacheTTL: 1500000,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

module.exports = nextConfig
