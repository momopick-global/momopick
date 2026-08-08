import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".next-dev/**",
      "out/**",
      "node_modules/**",
      "web/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 정적 export(output: "export")라 next/image 최적화 서버가 없음 — <img> 사용이 의도된 선택
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
