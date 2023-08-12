/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  images: {
    domains: ['storage.googleapis.com','rukminim2.flixcart.com'],
    minimumCacheTTL: 1500000,
  },
}

module.exports = nextConfig
