/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a production build run next to `next dev` without sharing the .next folder
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
