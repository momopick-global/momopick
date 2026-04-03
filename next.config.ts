import type { NextConfig } from "next";

/**
 * `next dev`와 `next build`가 같은 `.next`를 쓰면, 병렬 실행·빌드 중 HMR 시
 * `Cannot find module './331.js'` 같은 청크 누락이 자주 납니다.
 * 개발만 `.next-dev`로 분리합니다. (Pages 빌드는 계속 `.next` → `out`)
 */
const distDir = process.argv.includes("dev") ? ".next-dev" : ".next";

/** Cloudflare Pages — Next.js(정적 HTML Export). 공식: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/ */
const nextConfig: NextConfig = {
  distDir,
  trailingSlash: true,
  output: "export",
  images: { unoptimized: true },
  webpack: (config, { dev }) => {
    if (dev) {
      /* 파일시스템 웹팩 캐시가 어긋나면 dev에서 청크 누락 오류가 날 수 있음 */
      config.cache = { type: "memory" };
    }
    return config;
  },
};

export default nextConfig;
