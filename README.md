# Momopick

- **앱 전체**: [`web/`](./web/) — Next.js(App Router), **정적 HTML Export** 후 **Cloudflare Pages**에 배포.
- **API(소형)**: Next `app/api` 대신 **`web/functions/`** (Pages Functions), 예: `/api/health`.

## 로컬 실행

| 목적 | 명령 |
|------|------|
| 개발 서버 (핫 리로드) | 루트에서 `npm run dev` 또는 `cd web && npm run dev` → **http://localhost:3038** |
| 빌드 결과만 미리보기 | 루트에서 **`npm run preview`** → `web/out` 을 서빙 (정적 파일과 동일) |

### 404 · “File not found”가 나올 때

정적 export는 **`web/out`** 폴더에만 HTML이 생깁니다.

- **레포 루트**(`momopick/`)나 **`web/`** 만 두고 `python -m http.server` 등을 쓰면 **404가 정상**입니다.
- 반드시: `cd web && npm run build` 후 **`cd web/out`** 에서 서버를 띄우거나, 루트에서 **`npm run preview`** 를 사용하세요.

## Cloudflare Pages

- **Root directory**: `web`
- **Build output directory**: `out`  ← `web` 기준 상대 경로
- 레포 **전체**를 Pages 루트로 두는 경우: Build command 예) `cd web && npm ci && npm run build`, Output **`web/out`**

자세한 절차: [`web/README.md`](./web/README.md).