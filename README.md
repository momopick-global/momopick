# Momopick

단일 Next.js 앱(레포 루트). **정적 HTML Export** 후 **Cloudflare Pages**에 배포합니다.

- **앱**: [`src/app/`](./src/app/) — App Router
- **API(소형)**: Next `app/api` 대신 **[`functions/`](./functions/)** (Pages Functions), 예: `/api/health`
- **문서**: [`docs/`](./docs/)

## 로컬 실행

| 목적 | 명령 |
|------|------|
| 개발 서버 (핫 리로드) | `npm run dev` → **http://localhost:3040** |
| 빌드 결과만 미리보기 | `npm run preview` → `out/` 을 서빙 (정적 파일과 동일) |

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
