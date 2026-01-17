/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // ELIMINĂ basePath și assetPrefix pentru Hostico
  basePath: "",
  assetPrefix: "",

  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
};

export default nextConfig;