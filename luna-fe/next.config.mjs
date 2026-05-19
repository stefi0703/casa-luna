/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  
  // ELIMINĂ basePath și assetPrefix pentru Hostico
  basePath: "",
  assetPrefix: "",

  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },

  // Structură unificată corect și curat pentru imagini
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;