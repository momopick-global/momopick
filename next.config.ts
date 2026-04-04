import type { NextConfig } from "next";

/**
 * `next dev`와 `next build`가 같은 `.next`를 쓰면, 병렬 실행·빌드 중 HMR 시
 * `Cannot find module './611.js'` 같은 청크 누락이 자주 납니다.
 * 개발만 `.next-dev`로 분리합니다. (Pages 빌드는 계속 `.next` → `out`)
 *
 * argv에 `dev`가 없는 경우가 있어 `process.argv.includes("dev")`만 쓰면
 * dev가 실제로는 `.next`를 쓰는 버그가 납니다. `NODE_ENV`·argv·npm 스크립트
 * 이름을 함께 보면 안정적입니다.
 */
const npmEv = process.env.npm_lifecycle_event ?? "";
const isDevDist =
  process.env.NODE_ENV === "development" ||
  process.argv.includes("dev") ||
  ["dev", "dev:fresh", "dev:reset", "dev:turbo", "fix"].includes(npmEv);

const distDir = isDevDist ? ".next-dev" : ".next";

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
