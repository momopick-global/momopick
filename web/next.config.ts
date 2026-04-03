import type { NextConfig } from "next";

/** Cloudflare Pages — Next.js(정적 HTML Export). 공식: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/ */
const nextConfig: NextConfig = {
  trailingSlash: true,
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
