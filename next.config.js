/** @type {import('next').NextConfig} */

// STATIC_EXPORT=true gera um site 100% estático (para GitHub Pages).
// Sem a variável, roda como app Next normal com servidor (para o Railway).
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport
    ? {
        output: "export",
        images: { unoptimized: true },
        basePath,
        trailingSlash: true,
      }
    : {}),
};

module.exports = nextConfig;
