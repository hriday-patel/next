/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wembleypark.com",
        port: "",
        pathname: "/media/images/**",
      },
      {
        protocol: "https",
        hostname: "hydeparkwinterwonderland.com",
        port: "",
        pathname: "/static/**",
      },
    ],
  },
};

export default nextConfig;
