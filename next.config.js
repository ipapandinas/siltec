/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 1500000,
    unoptimized: true,
    deviceSizes: [360, 600, 900, 1200, 1536, 1920],
    imageSizes: [64, 80, 115, 370, 740, 850, 1200],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
