/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mdbcdn.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "tecdn.b-cdn.net"
      }
    ]
  }
}

module.exports = nextConfig
