/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['framer-motion'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
