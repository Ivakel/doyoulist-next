/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["https://lh3.googleusercontent.com"],
    remotePatterns: [
      {
        hostname: "*.googleusercontent.com",
      },
    ],
  },
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
};

export default nextConfig;
