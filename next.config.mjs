/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...existing config...
  allowedDevOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000'],
};

export default nextConfig;
