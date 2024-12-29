/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dj8ltcyk8/image/upload/**",
        search: "",
      },
    ],
    // domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
