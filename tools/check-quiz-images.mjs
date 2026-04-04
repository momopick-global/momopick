#!/usr/bin/env node
/**
 * `src/content/quiz/*.json` 안의 `/images/...` 경로가 `public/` 아래 실제 파일과 맞는지 검사합니다.
 * 사용: node tools/check-quiz-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const quizDir = path.join(root, "src/content/quiz");
const pub = path.join(root, "public");

const re = new RegExp('"(/images/[^"]+\\.(?:webp|png|jpg|jpeg|gif|svg))"', "g");
const paths = new Set();

for (const name of fs.readdirSync(quizDir)) {
  if (!name.endsWith(".json")) continue;
  const s = fs.readFileSync(path.join(quizDir, name), "utf8");
  let m;
  while ((m = re.exec(s))) paths.add(m[1]);
}

const missing = [];
for (const p of [...paths].sort()) {
  const fp = path.join(pub, p);
  if (!fs.existsSync(fp)) missing.push(p);
}

console.log(`quiz JSON 이미지 경로 ${paths.size}개 검사`);
if (missing.length) {
  console.error("누락:");
  for (const p of missing) console.error(" ", p);
  process.exit(1);
}
console.log("OK — 모두 public/ 아래에 있습니다.");
