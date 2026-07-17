/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The Instagram section is prepared for a future integration.
  // When real posts are wired in, add the CDN host here.
  // images: { remotePatterns: [{ protocol: "https", hostname: "*.cdninstagram.com" }] },
};

export default nextConfig;
