/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure API routes work on Netlify
  distDir: '.next',
}

module.exports = nextConfig
