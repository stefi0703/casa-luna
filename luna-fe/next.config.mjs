/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const repoName = "Luna"; // <=== Your Repo Name

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Only add the path prefix if we are in production
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",

  // ⬇️ ADD THIS: Make the base path available to your React components
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : "",
  },
};

export default nextConfig;
