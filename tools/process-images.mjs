#!/usr/bin/env node
/**
 * drop/ 폴더에 넣어둔 생성 이미지를 규격에 맞게 변환해 public/images/quiz/ 아래로 배치합니다.
 *
 * 워크플로:
 *   1. ChatGPT 등에서 이미지 생성 (docs/*-copypaste.md 프롬프트 사용)
 *   2. drop/<퀴즈slug>/<locale>/<대상파일명>.(png|jpg|jpeg|webp) 로 저장
 *      예) drop/kakao-reply-style/ko/result-1.png
 *          drop/kakao-reply-style/ko/thumb.png
 *   3. node tools/process-images.mjs        # 전체 처리
 *      node tools/process-images.mjs --slug kakao-reply-style   # 특정 퀴즈만
 *      node tools/process-images.mjs --dry   # 어떤 파일이 어디로 갈지 미리보기만
 *
 * 변환 규칙 (docs/design/image-guidelines.md):
 *   - 모든 이미지 → webp (quality 82, sRGB, 메타데이터 제거)
 *   - 최대 변 1024px 초과 시 축소 (확대는 안 함)
 *   - thumb 은 webp 외에 og용 thumb.jpg 도 함께 생성
 *   - 파일명은 영문 소문자+하이픈 규칙을 따라야 하며 아니면 건너뛰고 경고
 *
 * 처리 성공한 원본은 drop/<slug>/<locale>/done/ 으로 이동해 재처리를 막습니다.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dropDir = path.join(root, "drop");
const outBase = path.join(root, "public/images/quiz");

const MAX_EDGE = 1024;
const WEBP_QUALITY = 82;
const JPG_QUALITY = 85;
const LOCALES = new Set(["ko", "en"]);
const SRC_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);
// 파일명 규칙: 영문 소문자·숫자·하이픈 (예: result-1, thumb, start, q1, result-blend)
const NAME_RE = /^[a-z0-9][a-z0-9-]*$/;

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const slugFilter = (() => {
  const i = args.indexOf("--slug");
  return i >= 0 ? args[i + 1] : null;
})();

if (!fs.existsSync(dropDir)) {
  console.log(`drop/ 폴더가 없어 생성합니다: ${dropDir}`);
  fs.mkdirSync(dropDir, { recursive: true });
  console.log("이미지를 drop/<퀴즈slug>/<ko|en>/<파일명>.png 형태로 넣고 다시 실행하세요.");
  process.exit(0);
}

const knownSlugs = new Set(
  fs
    .readdirSync(path.join(root, "src/content/quiz"))
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, "")),
);

let processed = 0;
let skipped = 0;
const warnings = [];

const slugs = fs
  .readdirSync(dropDir)
  .filter((d) => fs.statSync(path.join(dropDir, d)).isDirectory())
  .filter((d) => !slugFilter || d === slugFilter);

if (slugs.length === 0) {
  console.log(slugFilter ? `drop/${slugFilter} 폴더가 없습니다.` : "drop/ 아래 처리할 퀴즈 폴더가 없습니다.");
  process.exit(0);
}

for (const slug of slugs) {
  if (!knownSlugs.has(slug)) {
    warnings.push(`⚠️  '${slug}' 은 src/content/quiz 에 없는 슬러그입니다 (오타?) — 그래도 처리합니다.`);
  }
  const slugDir = path.join(dropDir, slug);
  const localeDirs = fs
    .readdirSync(slugDir)
    .filter((d) => fs.statSync(path.join(slugDir, d)).isDirectory() && LOCALES.has(d));

  if (localeDirs.length === 0) {
    warnings.push(`⚠️  drop/${slug}/ 아래 ko|en 로케일 폴더가 없어 건너뜁니다.`);
    continue;
  }

  for (const locale of localeDirs) {
    const srcDir = path.join(slugDir, locale);
    const doneDir = path.join(srcDir, "done");
    const outDir = path.join(outBase, slug, locale);

    const files = fs
      .readdirSync(srcDir)
      .filter((f) => SRC_EXT.has(path.extname(f).toLowerCase()))
      .sort();

    for (const file of files) {
      const base = path.basename(file, path.extname(file));
      if (!NAME_RE.test(base)) {
        warnings.push(
          `⚠️  drop/${slug}/${locale}/${file} — 파일명이 규칙(영문 소문자·숫자·하이픈)에 맞지 않아 건너뜁니다. 예: result-1.png`,
        );
        skipped++;
        continue;
      }

      const srcPath = path.join(srcDir, file);
      const webpOut = path.join(outDir, `${base}.webp`);
      const isThumb = base === "thumb";
      const jpgOut = isThumb ? path.join(outDir, "thumb.jpg") : null;

      if (dry) {
        console.log(`[dry] ${path.relative(root, srcPath)} → ${path.relative(root, webpOut)}${jpgOut ? ` (+thumb.jpg)` : ""}`);
        continue;
      }

      fs.mkdirSync(outDir, { recursive: true });

      const img = sharp(srcPath, { failOn: "error" }).rotate(); // EXIF 회전 반영 후 메타데이터는 미포함
      const meta = await img.metadata();
      const needResize = Math.max(meta.width ?? 0, meta.height ?? 0) > MAX_EDGE;
      const pipeline = needResize
        ? img.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
        : img;

      await pipeline.clone().webp({ quality: WEBP_QUALITY }).toFile(webpOut);
      if (jpgOut) await pipeline.clone().flatten({ background: "#ffffff" }).jpeg({ quality: JPG_QUALITY }).toFile(jpgOut);

      fs.mkdirSync(doneDir, { recursive: true });
      fs.renameSync(srcPath, path.join(doneDir, file));

      const kb = (fs.statSync(webpOut).size / 1024).toFixed(0);
      console.log(`✅ ${slug}/${locale}/${base}.webp (${meta.width}×${meta.height}${needResize ? `→≤${MAX_EDGE}` : ""}, ${kb}KB)${jpgOut ? " + thumb.jpg" : ""}`);
      processed++;
    }
  }
}

console.log("");
for (const w of warnings) console.log(w);
console.log(`\n완료: ${processed}장 처리${skipped ? `, ${skipped}장 건너뜀` : ""}${dry ? " (dry-run)" : ""}`);
if (processed > 0 && !dry) {
  console.log("다음 단계: node tools/check-quiz-images.mjs 로 JSON 경로와 실제 파일 일치 검증");
}
