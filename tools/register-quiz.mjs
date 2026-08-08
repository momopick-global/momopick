#!/usr/bin/env node
/**
 * data/quiz-drafts/pending/<slug>.json 초안을 검증하고 사이트에 등록합니다.
 *
 * 하는 일 (승인 = 이 스크립트 실행):
 *   1. 초안 JSON 스키마 검증 (필수 필드·slug 일치·타입 판별)
 *   2. src/content/quiz/<slug>.json 으로 이동
 *   3. src/content/quiz/index.ts 에 import/export/카탈로그 자동 등록
 *   4. src/app/ko/love/<slug>/page.tsx 를 같은 타입의 기존 페이지에서 복제 생성
 *   5. public/sitemap.xml 에 URL 추가
 *
 * 사용:
 *   node tools/register-quiz.mjs --list          # 대기 중 초안 목록
 *   node tools/register-quiz.mjs <slug>          # 등록 실행
 *   node tools/register-quiz.mjs <slug> --dry    # 변경 미리보기 (파일 안 건드림)
 *
 * 타입 판별: results → snack | resultRanges → percentage | grades → trivia
 * 이미지는 나중에 drop 파이프라인(npm run images)으로 채우면 됩니다.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const pendingDir = path.join(root, "data/quiz-drafts/pending");
const quizDir = path.join(root, "src/content/quiz");
const indexPath = path.join(quizDir, "index.ts");
const appLoveDir = path.join(root, "src/app/ko/love");
const sitemapPath = path.join(root, "public/sitemap.xml");

const TYPE_INFO = {
  snack: {
    detect: (j) => Array.isArray(j.resultKeys) || (j.results && !j.resultRanges && !j.grades),
    tsType: "SnackQuizDefinition",
    catalog: "snackQuizDefinitionsCatalog",
    canonicalSlug: "kakao-reply-style",
  },
  percentage: {
    detect: (j) => Array.isArray(j.resultRanges),
    tsType: "PercentageQuizDefinition",
    catalog: "percentageQuizDefinitionsCatalog",
    canonicalSlug: "confession-success-rate",
  },
  trivia: {
    detect: (j) => Array.isArray(j.grades),
    tsType: "TriviaQuizDefinition",
    catalog: "triviaQuizDefinitionsCatalog",
    canonicalSlug: "love-meme-exam",
  },
};

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const positional = args.filter((a) => !a.startsWith("--"));

fs.mkdirSync(pendingDir, { recursive: true });

if (args.includes("--list") || positional.length === 0) {
  const drafts = fs.readdirSync(pendingDir).filter((f) => f.endsWith(".json"));
  if (drafts.length === 0) {
    console.log("대기 중인 초안이 없습니다. 초안은 data/quiz-drafts/pending/<slug>.json 에 저장하세요.");
  } else {
    console.log("대기 중인 초안:");
    for (const f of drafts) {
      try {
        const j = JSON.parse(fs.readFileSync(path.join(pendingDir, f), "utf8"));
        const type = Object.entries(TYPE_INFO).find(([, v]) => v.detect(j))?.[0] ?? "??";
        console.log(`  - ${f.replace(/\.json$/, "")}  [${type}]  ${j.title?.ko ?? ""}`);
      } catch {
        console.log(`  - ${f}  [JSON 파싱 실패]`);
      }
    }
    console.log("\n등록: node tools/register-quiz.mjs <slug>");
  }
  process.exit(0);
}

const slug = positional[0];
const draftPath = path.join(pendingDir, `${slug}.json`);
const errors = [];
const fail = (msg) => errors.push(`❌ ${msg}`);

if (!fs.existsSync(draftPath)) {
  console.error(`❌ 초안이 없습니다: data/quiz-drafts/pending/${slug}.json`);
  process.exit(1);
}

/* ── 1. 검증 ─────────────────────────────────────────────── */
let draft;
try {
  draft = JSON.parse(fs.readFileSync(draftPath, "utf8"));
} catch (e) {
  console.error(`❌ JSON 파싱 실패: ${e.message}`);
  process.exit(1);
}

if (draft.slug !== slug) fail(`slug 불일치: 파일명 '${slug}' vs JSON '${draft.slug}'`);
if (draft.id !== slug) fail(`id는 slug와 같아야 합니다: '${draft.id}'`);
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail("slug는 영문 소문자·숫자·하이픈만");
if (!draft.title?.ko) fail("title.ko 누락");
if (!Array.isArray(draft.locales) || !draft.locales.includes("ko")) fail("locales에 'ko' 필요");
if (!Array.isArray(draft.questions) || draft.questions.length === 0) fail("questions 비어 있음");
if (!draft.meta?.description?.ko) fail("meta.description.ko 누락 (SEO 필수)");
if (!draft.images?.thumbnail) fail("images.thumbnail 경로 누락");

const typeEntry = Object.entries(TYPE_INFO).find(([, v]) => v.detect(draft));
if (!typeEntry) fail("퀴즈 타입 판별 불가 — results | resultRanges | grades 중 하나 필요");
if (fs.existsSync(path.join(quizDir, `${slug}.json`))) fail(`이미 등록된 슬러그입니다: src/content/quiz/${slug}.json`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const [quizType, info] = typeEntry;
const camel = slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const pascal = camel[0].toUpperCase() + camel.slice(1);
const exportName = `quiz${pascal}`;

console.log(`✅ 검증 통과: ${slug} [${quizType}] — "${draft.title.ko}" (${draft.questions.length}문항)`);

/* ── 2~3. JSON 이동 + index.ts 등록 ──────────────────────── */
let index = fs.readFileSync(indexPath, "utf8");
if (index.includes(`"./${slug}.json"`) || index.includes(`${exportName} `)) {
  console.error(`❌ index.ts에 이미 '${slug}' 관련 항목이 있습니다.`);
  process.exit(1);
}

// import: 마지막 json import 뒤에 추가
const importLine = `import ${camel} from "./${slug}.json";`;
const importMatches = [...index.matchAll(/^import .+ from "\.\/.+\.json";$/gm)];
const lastImport = importMatches[importMatches.length - 1];
index =
  index.slice(0, lastImport.index + lastImport[0].length) +
  `\n${importLine}` +
  index.slice(lastImport.index + lastImport[0].length);

// export: 첫 카탈로그 주석 직전에 추가
const exportLine = `export const ${exportName} = ${camel} as ${info.tsType};\n\n`;
const catalogAnchor = index.indexOf("/** 스낵 퀴즈(최다득표형)");
index = index.slice(0, catalogAnchor) + exportLine + index.slice(catalogAnchor);

// 타입별 카탈로그 + 홈 카탈로그: 배열 맨 앞에 삽입 (신작이 위)
for (const arrayName of [info.catalog, "koQuizCatalogForHome"]) {
  const re = new RegExp(`(export const ${arrayName}[^=]*= \\[\\n)`);
  if (!re.test(index)) {
    console.error(`❌ index.ts에서 ${arrayName} 배열을 찾지 못했습니다.`);
    process.exit(1);
  }
  index = index.replace(re, `$1  ${exportName},\n`);
}

/* ── 4. page.tsx 생성 (같은 타입 기존 페이지 복제) ────────── */
const canonicalJson = JSON.parse(fs.readFileSync(path.join(quizDir, `${info.canonicalSlug}.json`), "utf8"));
const canonicalPage = fs.readFileSync(path.join(appLoveDir, info.canonicalSlug, "page.tsx"), "utf8");
const canonicalCamel = info.canonicalSlug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const canonicalPascal = canonicalCamel[0].toUpperCase() + canonicalCamel.slice(1);

const page = canonicalPage
  .replaceAll(`quiz${canonicalPascal}`, exportName)
  .replaceAll(`${canonicalPascal}Page`, `${pascal}Page`)
  .replaceAll(info.canonicalSlug, slug)
  .replaceAll(canonicalJson.title.ko, draft.title.ko);

const pageDir = path.join(appLoveDir, slug);
const sitemapEntry = `  <url>\n    <loc>https://momopick.com/ko/love/${slug}/</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n\n`;

if (dry) {
  console.log("\n[dry-run] 적용될 변경:");
  console.log(`  - src/content/quiz/${slug}.json 생성 (초안 이동)`);
  console.log(`  - index.ts: ${importLine}`);
  console.log(`  -           ${exportLine.trim()}`);
  console.log(`  -           ${info.catalog} / koQuizCatalogForHome 맨 앞에 ${exportName} 추가`);
  console.log(`  - src/app/ko/love/${slug}/page.tsx 생성 (${info.canonicalSlug} 기반)`);
  console.log(`  - sitemap.xml에 /ko/love/${slug}/ 추가`);
  process.exit(0);
}

fs.writeFileSync(path.join(quizDir, `${slug}.json`), JSON.stringify(draft, null, 2) + "\n");
fs.writeFileSync(indexPath, index);
fs.mkdirSync(pageDir, { recursive: true });
fs.writeFileSync(path.join(pageDir, "page.tsx"), page);

let sitemap = fs.readFileSync(sitemapPath, "utf8");
if (!sitemap.includes(`/ko/love/${slug}/`)) {
  sitemap = sitemap.replace("</urlset>", sitemapEntry + "</urlset>");
  fs.writeFileSync(sitemapPath, sitemap);
}

fs.unlinkSync(draftPath);

console.log(`
등록 완료 🎉
  - src/content/quiz/${slug}.json
  - src/content/quiz/index.ts (import/export/카탈로그)
  - src/app/ko/love/${slug}/page.tsx
  - public/sitemap.xml

다음 단계:
  1. 이미지 프롬프트 생성 요청 → docs/*-copypaste.md
  2. 생성한 이미지를 drop/${slug}/ko/ 에 저장 → npm run images
  3. npm run build 로 확인 → 로컬 http://localhost:3040/ko/love/${slug}/
`);
