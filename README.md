# Momopick

단일 Next.js 앱(레포 루트). **정적 HTML Export** 후 **Cloudflare Pages**에 배포합니다.

- **앱**: [`src/app/`](./src/app/) — App Router
- **API(소형)**: Next `app/api` 대신 **[`functions/`](./functions/)** (Pages Functions), 예: `/api/health`
- **문서**: [`docs/`](./docs/)

## 로컬 실행

| 목적 | 명령 |
|------|------|
| 개발 서버 (핫 리로드) | `npm run dev` → **http://localhost:3040** |
| 3040 포트가 이미 쓰일 때 (`EADDRINUSE`) | `npm run free:3040` 후 다시 `npm run dev` (또는 예전 터미널에서 `Ctrl+C`) |
| 빌드 결과만 미리보기 | `npm run preview` → `out/` 을 서빙 (정적 파일과 동일) |
| 캐시 초기화 후 다시 빌드 | `npm run clean` → `npm run dev` 또는 `npm run build` |
| Internal Server Error · `.next` 깨짐 복구 | **`npm run dev:reset`** (3040 종료 → `clean` → `dev` 한 번에) |

**주의:** `npm run dev`가 돌아가는 동안에는 `npm run clean`을 실행하지 마세요. `.next`를 지우는 순간 서버가 참조하던 파일이 사라져 `ENOENT` / Internal Server Error가 납니다.

### `Cannot find module './NNN.js'` (로컬 개발)

`.next` 캐시가 꼬인 경우입니다. `npm run clean` 후 개발 서버를 다시 띄우세요.

### 페이지가 **하얀 빈 화면**만 보일 때

서버가 500을 내면 Next가 잠깐 `body { display: none }` 을 걸어 두는데, 오류로 하이드레이션이 끝나지 않으면 **아무것도 안 보이는 것처럼** 보일 수 있습니다.  
**3040 포트의 예전 `next dev`를 완전히 끄고** `npm run clean` → `npm run dev` 로 다시 시작하세요. (개발은 Webpack 대신 **Turbopack**을 쓰도록 설정해 두었습니다.)

### 404 · “File not found”가 나올 때

정적 export는 **`out/`** 폴더에만 HTML이 생깁니다.

- 레포 루트만 두고 `python -m http.server` 등을 쓰면 **404가 정상**입니다.
- 반드시: `npm run build` 후 **`cd out`** 에서 서버를 띄우거나 **`npm run preview`** 를 사용하세요.

## Cloudflare Pages

- **Root directory**: 비움(레포 루트)
- **Build command**: `npm ci && npm run build`
- **Build output directory**: `out`

환경 변수는 Pages 대시보드에 설정하고, 로컬은 [`.env.example`](./.env.example)을 참고하세요.

## 폴더 개요

| 경로 | 역할 |
|------|------|
| `src/app`, `src/components`, `src/lib` | Next 앱 소스 |
| `public/` | 정적 자산 |
| `functions/` | Pages Functions (`/api/*`) |
| `docs/` | 기획·API·디자인 문서 |
| `supabase/migrations/` | (예정) DB 마이그레이션 |
| `scripts/`, `tests/` | 스크립트·테스트용 자리 |
