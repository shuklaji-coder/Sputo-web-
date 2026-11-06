/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  images: {
    domains: [
      'images.unsplash.com',
      'firebasestorage.googleapis.com',
      'maps.googleapis.com'
    ],
  },
};

module.exports = nextConfig;
