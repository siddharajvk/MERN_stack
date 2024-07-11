/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig
