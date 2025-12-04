/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/api/static/uploads/:path*',
      },
    ]
  },
}

export default nextConfig
