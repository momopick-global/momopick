#!/usr/bin/env node
/**
 * `src/content/quiz/*.json` 안의 `/images/...` 경로가 `public/` 아래 실제 파일과 맞는지 검사합니다.
 *
 * 런타임 규칙: JSON 경로 `/images/quiz/<slug>/파일.webp` → 실제 파일 `public/images/quiz/<slug>/<locale>/파일.webp`.
 * 로케일 세그먼트(`ko`/`en`)는 `src/lib/content/quizAssetUrl.ts`의 `quizAssetUrl()`이 런타임에 삽입합니다.
 * 이 스크립트는 동일한 규칙을 로컬에 복제해 검사하므로, 규칙이 바뀌면 quizAssetUrl()과 함께 갱신해 주세요.
 *
 * 사용:
 *   node tools/check-quiz-images.mjs                 # ko 엄격, en은 warning
 *   node tools/check-quiz-images.mjs --locale ko     # ko만
 *   node tools/check-quiz-images.mjs --locale ko,en  # 둘 다 엄격
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const quizDir = path.join(root, "src/content/quiz");
const pub = path.join(root, "public");

const QUIZ_PREFIX = "/images/quiz/";

/** keep in sync with src/lib/content/quizAssetUrl.ts */
function resolveQuizAssetUrl(p, locale) {
  if (!p?.startsWith(QUIZ_PREFIX)) return p ?? "";
  const rest = p.slice(QUIZ_PREFIX.length);
  const segments = rest.split("/").filter(Boolean);
  if (segments.length < 2) return p;
  const slug = segments[0];
  const maybeLocale = segments[1];
  if (maybeLocale === "ko" || maybeLocale === "en") {
    return `${QUIZ_PREFIX}${slug}/${locale}/${segments.slice(2).join("/")}`;
  }
  return `${QUIZ_PREFIX}${slug}/${locale}/${segments.slice(1).join("/")}`;
}

function parseLocales(argv) {
  const idx = argv.indexOf("--locale");
  if (idx < 0) return { strict: ["ko"], warn: ["en"] };
  const raw = (argv[idx + 1] ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!raw.length) return { strict: ["ko"], warn: ["en"] };
  return { strict: raw, warn: [] };
}

const { strict: STRICT_LOCALES, warn: WARN_LOCALES } = parseLocales(process.argv);

const re = new RegExp('"(/images/[^"]+\\.(?:webp|png|jpg|jpeg|gif|svg))"', "g");
const paths = new Set();

for (const name of fs.readdirSync(quizDir)) {
  if (!name.endsWith(".json")) continue;
  const s = fs.readFileSync(path.join(quizDir, name), "utf8");
  let m;
  while ((m = re.exec(s))) paths.add(m[1]);
}

/** locale → list of missing resolved paths */
function checkLocale(locale) {
  const missing = [];
  for (const p of [...paths].sort()) {
    if (!p.startsWith(QUIZ_PREFIX)) {
      // 비-퀴즈 경로(예: /images/og/...) — 그대로 검사
      if (!fs.existsSync(path.join(pub, p))) missing.push(p);
      continue;
    }
    const resolved = resolveQuizAssetUrl(p, locale);
    if (!fs.existsSync(path.join(pub, resolved))) missing.push(resolved);
  }
  return missing;
}

console.log(`quiz JSON 이미지 경로 ${paths.size}개 검사`);
console.log(
  `로케일: strict=[${STRICT_LOCALES.join(",") || "-"}]  warn=[${WARN_LOCALES.join(",") || "-"}]`,
);

let hardFail = false;

for (const loc of STRICT_LOCALES) {
  const miss = checkLocale(loc);
  if (miss.length) {
    hardFail = true;
    console.error(`\n[${loc}] 누락 ${miss.length}건 (엄격):`);
    for (const p of miss) console.error(" ", p);
  } else {
    console.log(`[${loc}] OK`);
  }
}

for (const loc of WARN_LOCALES) {
  const miss = checkLocale(loc);
  if (miss.length) {
    console.warn(`\n[${loc}] 누락 ${miss.length}건 (warning — 미출시 로케일):`);
    for (const p of miss) console.warn(" ", p);
  } else {
    console.log(`[${loc}] OK`);
  }
}

if (hardFail) process.exit(1);
console.log("\n모든 엄격 로케일 통과.");
