# Cloudflare Pages

## 프로젝트 셋업 (최초 1회만 — 이미 완료)

Cloudflare Pages 대시보드에서:

| 항목 | 값 |
|---|---|
| Production branch | `main` |
| Build command | `npm ci && npm run build` |
| Build output directory | `out` |
| Root directory | (비움) |
| Framework preset | None (Next.js 정적 export) |
| Custom domains | `momopick.com`, `www.momopick.com` |

## Pages Functions

`functions/` 디렉터리는 Cloudflare Pages가 자동으로 엣지 함수로 배포.

| 파일 | 라우트 |
|---|---|
| `functions/api/health.ts` | `GET /api/health` → JSON `{ok, service, runtime, time}` |

Next.js `output: "export"` 모드라 `src/app/api/`의 Route Handler는 빌드 산출에 포함되지 않음. API는 **반드시 `functions/`에서만**.

## `public/_headers`

```
/ko/love/*
  Cache-Control: public, max-age=0, must-revalidate
```

- 연애 퀴즈 페이지는 매 요청마다 revalidate
- 이유: 재배포 후 옛 청크 참조하는 stale HTML이 잡혀 있으면 결과 페이지 진입이 깨질 수 있음
- 자산(JS/CSS chunks, 이미지)은 Cloudflare 기본 캐시(불변 hash 파일명) 적용

## `public/_redirects`

```
https://www.momopick.com/* https://momopick.com/:splat 301!
```

- `www` → apex 301 리다이렉트
- `!` 플래그: 강제 (이미 same-origin 서빙 중이어도 301 적용)

## 도메인 / DNS

- Apex: `momopick.com` — Cloudflare Pages 자동 발급 cert
- `www.momopick.com` — 같은 Pages 프로젝트에 등록 후 `_redirects`로 apex 송출

## 캐시 관리

| 자산 종류 | 캐시 정책 |
|---|---|
| `/_next/static/chunks/*.js` (hash 파일명) | 장기 캐시 (불변) |
| `/_next/static/css/*.css` | 장기 캐시 |
| `/images/*` | 기본 Cloudflare 캐시 |
| `/ko/love/*` (HTML) | `must-revalidate` (위 _headers) |
| 다른 HTML | Cloudflare 기본 (보통 짧음) |
| `/sitemap.xml`, `/ads.txt`, `/robots.txt` | Cloudflare 기본 (응답 헤더로 변경 없음) |

## 환경변수

- **Production**: Cloudflare Pages Dashboard → Settings → Environment variables
- **Preview**: 별도 등록 (PR 미리보기 배포에 적용)
- 변경 후 **재배포 필수** — `NEXT_PUBLIC_*`는 빌드 타임에 인라인됨

## Cloudflare가 자동으로 건드리는 것

- `robots.txt`에 AI 봇 차단 블록(`Google-Extended`, `GPTBot` 등)을 **prepend**함
  - AdSense 봇(`Mediapartners-Google`, `AdsBot-Google`)은 차단되지 않음 ✅
  - 우리 robots.txt 본문은 그 아래에 그대로 살아있음
  - 동작상 문제 없으나 두 개의 `User-agent: *` 블록이 공존 → 일부 봇이 두 번째 블록 무시 가능성. 무시해도 무방.

## 트러블슈팅

| 증상 | 확인 |
|---|---|
| 푸시했는데 라이브 반영 안 됨 | Pages Dashboard → Deployments → 최신 빌드 로그. Build 실패면 로그 확인 |
| `NEXT_PUBLIC_*` 변경 무반영 | 재배포 안 한 상태. `Retry deployment` 클릭 |
| `/api/health` 200 안 됨 | `functions/api/health.ts` 누락 또는 export 함수명 오류 |
| 옛 정적 청크 404 | 누가 캐시된 HTML로 진입 — `must-revalidate` 적용된 경로인지 확인 |
| `www.momopick.com`이 redirect 안 됨 | `public/_redirects` 첫 줄 + `www` 도메인이 Pages 프로젝트에 등록되어 있는지 확인 |

배포 흐름은 [deployment.md](./deployment.md), 도메인 이슈는 [../troubleshooting/domain-cloudflare.md](../troubleshooting/domain-cloudflare.md) 참고.
