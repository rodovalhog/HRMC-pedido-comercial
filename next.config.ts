import type { NextConfig } from "next";



// next.config.js
const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: false, // desativa minificação do SWC
  // ou:
  // minify: false, // se estiver usando o Terser (Next < 12)
};

module.exports = nextConfig;

export default nextConfig;
