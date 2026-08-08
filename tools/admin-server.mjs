#!/usr/bin/env node
/**
 * 모모픽 로컬 관리자 대시보드 (로컬 전용 — 배포되지 않음)
 *
 * 실행:  npm run admin   →  http://localhost:3941
 *
 * 기능:
 *   - 퀴즈 초안 큐(data/quiz-drafts/pending) 목록·미리보기·등록(dry/실행)
 *   - 이미지 상태: check-quiz-images 결과 + drop/ 폴더 현황 + 일괄 처리 버튼
 *   - 토픽 큐(data/topics/pending.json) 승인/반려 → approved.json / rejected.json
 *
 * 외부 의존성 없음 (node 내장 http). 127.0.0.1 바인딩 — 외부 접근 불가.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const PORT = 3941;

const pendingDir = path.join(root, "data/quiz-drafts/pending");
const dropDir = path.join(root, "drop");
const quizDir = path.join(root, "src/content/quiz");

fs.mkdirSync(pendingDir, { recursive: true });

/* ── Supabase (토픽 큐) ────────────────────────────────── */
// .env.local 로드 (dotenv 없이)
const envFile = path.join(root, ".env.local");
const env = {};
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
}
const SB_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SB_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const sbReady = Boolean(SB_URL && SB_KEY);

async function sb(pathAndQuery, init = {}) {
  const r = await fetch(`${SB_URL}/rest/v1/${pathAndQuery}`, {
    ...init,
    headers: {
      apikey: SB_KEY,
      authorization: `Bearer ${SB_KEY}`,
      "content-type": "application/json",
      prefer: "return=representation",
      ...init.headers,
    },
  });
  if (!r.ok) throw new Error(`Supabase ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const text = await r.text();
  return text ? JSON.parse(text) : null;
}

/* ── 유틸 ─────────────────────────────────────────────── */
const readJson = (p, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
};
const writeJson = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + "\n");

function runTool(args) {
  return new Promise((resolve) => {
    const child = spawn("node", args, { cwd: root });
    let out = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (out += d));
    child.on("close", (code) => resolve({ code, out: out.trim() }));
  });
}

function detectType(j) {
  if (Array.isArray(j.resultRanges)) return "percentage";
  if (Array.isArray(j.grades)) return "trivia";
  if (j.results || Array.isArray(j.resultKeys)) return "snack";
  return "??";
}

/* ── 상태 수집 ─────────────────────────────────────────── */
async function collectState() {
  const drafts = fs
    .readdirSync(pendingDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const j = readJson(path.join(pendingDir, f), null);
      return j
        ? {
            slug: f.replace(/\.json$/, ""),
            type: detectType(j),
            title: j.title?.ko ?? "(제목 없음)",
            subtitle: j.subtitle?.ko ?? "",
            questions: j.questions?.length ?? 0,
            results: j.results ? Object.keys(j.results).length : (j.resultRanges?.length ?? j.grades?.length ?? 0),
          }
        : { slug: f, type: "!!", title: "JSON 파싱 실패", subtitle: "", questions: 0, results: 0 };
    });

  const dropState = [];
  if (fs.existsSync(dropDir)) {
    for (const slug of fs.readdirSync(dropDir)) {
      const slugDir = path.join(dropDir, slug);
      if (!fs.statSync(slugDir).isDirectory()) continue;
      for (const locale of ["ko", "en"]) {
        const d = path.join(slugDir, locale);
        if (!fs.existsSync(d)) continue;
        const waiting = fs.readdirSync(d).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
        if (waiting.length) dropState.push({ slug, locale, files: waiting });
      }
    }
  }

  let topics = [];
  let topicsError = null;
  if (sbReady) {
    try {
      topics = await sb("ops_topics?status=eq.pending&order=created_at.asc&select=id,title,format,reason,season,source");
    } catch (e) {
      topicsError = String(e.message ?? e);
    }
  } else {
    topicsError = ".env.local에 SUPABASE_SERVICE_ROLE_KEY가 없습니다";
  }
  const registered = fs.readdirSync(quizDir).filter((f) => f.endsWith(".json")).length;

  return { drafts, dropState, topics, topicsError, registered };
}

/* ── HTTP ─────────────────────────────────────────────── */
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const send = (code, body, type = "application/json") => {
    res.writeHead(code, { "content-type": `${type}; charset=utf-8` });
    res.end(type === "application/json" ? JSON.stringify(body) : body);
  };

  try {
    if (req.method === "GET" && url.pathname === "/") {
      return send(200, HTML, "text/html");
    }
    if (req.method === "GET" && url.pathname === "/api/state") {
      return send(200, await collectState());
    }
    if (req.method === "GET" && url.pathname === "/api/draft") {
      const slug = url.searchParams.get("slug") ?? "";
      const p = path.join(pendingDir, `${path.basename(slug)}.json`);
      if (!fs.existsSync(p)) return send(404, { error: "not found" });
      return send(200, { raw: fs.readFileSync(p, "utf8") });
    }
    if (req.method === "GET" && url.pathname === "/api/image-check") {
      const r = await runTool([path.join(root, "tools/check-quiz-images.mjs")]);
      return send(200, r);
    }

    if (req.method === "POST") {
      let body = "";
      for await (const chunk of req) body += chunk;
      const data = body ? JSON.parse(body) : {};

      if (url.pathname === "/api/register") {
        const slug = path.basename(String(data.slug ?? ""));
        const args = [path.join(root, "tools/register-quiz.mjs"), slug];
        if (data.dry) args.push("--dry");
        const r = await runTool(args);
        return send(200, r);
      }
      if (url.pathname === "/api/process-images") {
        const r = await runTool([path.join(root, "tools/process-images.mjs")]);
        return send(200, r);
      }
      if (url.pathname === "/api/topic") {
        // { id, action: "approve" | "reject" }
        if (!sbReady) return send(500, { error: "Supabase 키 없음" });
        const status = data.action === "approve" ? "approved" : "rejected";
        await sb(`ops_topics?id=eq.${encodeURIComponent(String(data.id))}`, {
          method: "PATCH",
          body: JSON.stringify({ status, decided_at: new Date().toISOString() }),
        });
        return send(200, { ok: true });
      }
      if (url.pathname === "/api/topic-add") {
        // { title, format, reason, season, source }
        if (!sbReady) return send(500, { error: "Supabase 키 없음" });
        if (!data.title) return send(400, { error: "title 필요" });
        const row = await sb("ops_topics", {
          method: "POST",
          body: JSON.stringify({
            title: String(data.title),
            format: String(data.format || "snack"),
            reason: data.reason ? String(data.reason) : null,
            season: data.season ? String(data.season) : null,
            source: data.source ? String(data.source) : null,
          }),
        });
        return send(200, { ok: true, row });
      }
    }

    send(404, { error: "not found" });
  } catch (e) {
    send(500, { error: String(e?.message ?? e) });
  }
});

/* ── UI (단일 HTML) ────────────────────────────────────── */
const HTML = /* html */ `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>모모픽 관리자</title>
<style>
  :root { --bg:#faf7f2; --card:#fff; --ink:#2b2320; --sub:#8a7f77; --line:#eee5da;
          --accent:#e0525f; --ok:#2e9e5b; --warn:#c77b00; --mono:ui-monospace,Menlo,monospace; }
  * { box-sizing:border-box; }
  body { margin:0; font-family:-apple-system,"Apple SD Gothic Neo",sans-serif; background:var(--bg); color:var(--ink); font-size:18px; }
  header { padding:24px 32px; display:flex; align-items:baseline; gap:16px; }
  header h1 { font-size:26px; margin:0; }
  header .stat { color:var(--sub); font-size:18px; }
  main { padding:0 32px 60px; display:grid; gap:24px; max-width:1200px; }
  section { background:var(--card); border:1px solid var(--line); border-radius:14px; padding:22px 24px; }
  h2 { font-size:21px; margin:0 0 14px; display:flex; align-items:center; gap:10px; }
  h2 .badge { background:var(--accent); color:#fff; border-radius:99px; font-size:18px; padding:2px 12px; }
  table { width:100%; border-collapse:collapse; font-size:18px; }
  th { text-align:left; color:var(--sub); font-weight:600; font-size:18px; padding:8px 10px; border-bottom:1px solid var(--line); }
  td { padding:10px; border-bottom:1px solid var(--line); vertical-align:middle; }
  tr:last-child td { border-bottom:none; }
  .type { font-family:var(--mono); font-size:18px; background:#f3ece4; border-radius:6px; padding:2px 8px; }
  button { font:inherit; font-size:18px; border:1px solid var(--line); background:#fff; border-radius:8px;
           padding:7px 14px; cursor:pointer; white-space:nowrap; }
  th { white-space:nowrap; }
  button:hover { border-color:var(--accent); color:var(--accent); }
  button.primary { background:var(--accent); border-color:var(--accent); color:#fff; }
  button.primary:hover { opacity:.88; color:#fff; }
  button:disabled { opacity:.45; cursor:default; }
  pre { background:#1e1a17; color:#e8e0d8; border-radius:10px; padding:16px; font-size:18px;
        font-family:var(--mono); white-space:pre-wrap; max-height:340px; overflow:auto; margin:14px 0 0; }
  .empty { color:var(--sub); font-size:18px; padding:6px 2px; }
  .muted { color:var(--sub); font-size:18px; }
  .row-actions { display:flex; gap:6px; }
  dialog { border:none; border-radius:14px; padding:0; width:min(720px,92vw); }
  dialog .dlg-hd { display:flex; justify-content:space-between; align-items:center; padding:14px 18px; border-bottom:1px solid var(--line); }
  dialog pre { margin:0; border-radius:0 0 14px 14px; max-height:70vh; }
  .toolbar { display:flex; gap:8px; margin-bottom:10px; }
</style>
</head>
<body>
<header>
  <h1>🩷 모모픽 관리자</h1>
  <span class="stat" id="stat"></span>
</header>
<main>
  <section>
    <h2>📝 퀴즈 초안 큐 <span class="badge" id="draftCount">0</span></h2>
    <div id="drafts"></div>
    <pre id="registerLog" hidden></pre>
  </section>

  <section>
    <h2>🖼️ 이미지</h2>
    <div class="toolbar">
      <button class="primary" onclick="processImages()">drop/ 일괄 처리</button>
      <button onclick="imageCheck()">경로 검증 실행</button>
    </div>
    <div id="drop"></div>
    <pre id="imageLog" hidden></pre>
  </section>

  <section>
    <h2>💡 토픽 후보 <span class="badge" id="topicCount">0</span></h2>
    <div id="topics"></div>
  </section>
</main>

<dialog id="dlg">
  <div class="dlg-hd"><strong id="dlgTitle"></strong><button onclick="dlg.close()">닫기</button></div>
  <pre id="dlgBody"></pre>
</dialog>

<script>
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

async function api(path, opts) {
  const r = await fetch(path, opts);
  return r.json();
}

let lastState = "";
async function refresh(force) {
  const s = await api("/api/state");
  const sig = JSON.stringify(s);
  if (!force && sig === lastState) return; // 변화 없으면 리렌더 생략 (버튼 클릭 방해 방지)
  lastState = sig;
  $("stat").textContent = "등록된 퀴즈 " + s.registered + "개";
  $("draftCount").textContent = s.drafts.length;
  $("topicCount").textContent = s.topics.length;

  $("drafts").innerHTML = s.drafts.length === 0
    ? '<div class="empty">대기 중인 초안이 없습니다. Claude에게 "OO 주제로 퀴즈 초안 만들어줘"라고 요청하세요.</div>'
    : '<table><tr><th>슬러그</th><th>타입</th><th>제목</th><th>문항</th><th>결과</th><th></th></tr>' +
      s.drafts.map((d) => \`<tr>
        <td style="font-family:var(--mono);font-size:18px">\${esc(d.slug)}</td>
        <td><span class="type">\${esc(d.type)}</span></td>
        <td>\${esc(d.title)}<div class="muted">\${esc(d.subtitle)}</div></td>
        <td>\${d.questions}</td><td>\${d.results}</td>
        <td class="row-actions">
          <button onclick="preview('\${esc(d.slug)}')">보기</button>
          <button onclick="register('\${esc(d.slug)}', true)">dry</button>
          <button class="primary" onclick="register('\${esc(d.slug)}', false)">등록</button>
        </td></tr>\`).join("") + "</table>";

  $("drop").innerHTML = s.dropState.length === 0
    ? '<div class="empty">drop/ 폴더에 대기 중인 이미지가 없습니다. (drop/&lt;슬러그&gt;/ko/result-1.png 형태로 저장)</div>'
    : '<table><tr><th>퀴즈</th><th>로케일</th><th>대기 파일</th></tr>' +
      s.dropState.map((d) => \`<tr>
        <td style="font-family:var(--mono);font-size:18px">\${esc(d.slug)}</td>
        <td>\${esc(d.locale)}</td>
        <td class="muted">\${esc(d.files.join(", "))}</td></tr>\`).join("") + "</table>";

  $("topics").innerHTML = s.topicsError
    ? '<div class="empty">⚠️ ' + esc(s.topicsError) + '</div>'
    : s.topics.length === 0
    ? '<div class="empty">후보가 없습니다. Claude에게 "토픽 수집해줘"라고 요청하면 여기에 쌓입니다. <span class="muted">(Supabase 연동됨 ✓)</span></div>'
    : '<table><tr><th>제목안</th><th>형식</th><th>근거</th><th></th></tr>' +
      s.topics.map((t) => \`<tr>
        <td>\${esc(t.title)}</td>
        <td><span class="type">\${esc(t.format ?? "")}</span></td>
        <td class="muted">\${esc(t.reason ?? "")}\${t.season ? " · " + esc(t.season) : ""}</td>
        <td class="row-actions">
          <button class="primary" onclick="topic('\${t.id}', 'approve')">승인</button>
          <button onclick="topic('\${t.id}', 'reject')">반려</button>
        </td></tr>\`).join("") + "</table>";
}

async function preview(slug) {
  const d = await api("/api/draft?slug=" + encodeURIComponent(slug));
  $("dlgTitle").textContent = slug + ".json";
  $("dlgBody").textContent = d.raw ?? d.error;
  dlg.showModal();
}

async function register(slug, dry) {
  if (!dry && !confirm(slug + " 퀴즈를 사이트에 등록할까요?\\n(JSON 이동 + index.ts + page.tsx + sitemap)")) return;
  const log = $("registerLog");
  log.hidden = false; log.textContent = "실행 중…";
  const r = await api("/api/register", { method:"POST", headers:{"content-type":"application/json"}, body: JSON.stringify({ slug, dry }) });
  log.textContent = r.out;
  refresh();
}

async function processImages() {
  const log = $("imageLog");
  log.hidden = false; log.textContent = "변환 중…";
  const r = await api("/api/process-images", { method:"POST" });
  log.textContent = r.out;
  refresh();
}

async function imageCheck() {
  const log = $("imageLog");
  log.hidden = false; log.textContent = "검증 중…";
  const r = await api("/api/image-check");
  log.textContent = r.out || "(출력 없음 — 통과)";
}

async function topic(id, action) {
  await api("/api/topic", { method:"POST", headers:{"content-type":"application/json"}, body: JSON.stringify({ id, action }) });
  refresh(true);
}

refresh();
setInterval(refresh, 5000);
</script>
</body>
</html>`;

server.listen(PORT, "127.0.0.1", () => {
  console.log(`모모픽 관리자: http://localhost:${PORT}`);
});
