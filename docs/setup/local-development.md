# Local Development

## 요구사항

- Node.js 22.x 권장 (`@types/node` ^22)
- npm
- (선택) Supabase / Kakao 키 — 없으면 일부 기능 미동작

## 첫 셋업

```bash
npm install
cp .env.example .env.local
# .env.local 채우기 (variables.md 참고)
npm run dev
```

브라우저: **http://localhost:3040**

## 주요 스크립트

| 명령 | 동작 |
|---|---|
| `npm run dev` | dev 서버 (포트 3040, `.next-dev` 캐시) |
| `npm run dev:turbo` | Turbopack 실험 모드 |
| `npm run dev:fresh` | `clean` 후 dev |
| `npm run dev:reset` (= `npm run fix`) | 3040 종료 → clean → dev (복구용) |
| `npm run free:3040` | 3040 점유 프로세스 강제 종료 |
| `npm run clean` | `.next`, `.next-dev`, `out/` 삭제 |
| `npm run build` | 정적 export → `out/` 생성 |
| `npm run preview` | `out/` 로컬 서빙 (3040) |
| `npm run lint` / `lint:all` | Next ESLint / 전체 ESLint |
| `npm run check:quiz-images` | 퀴즈 이미지 누락 점검 (`tools/check-quiz-images.mjs`) |
| `npm run deploy:pages` | (수동) build + wrangler pages deploy out |

## 캐시 분리 구조

- `next dev` → **`.next-dev/`**
- `next build` → **`.next/`**

이전에 dev와 build가 같은 `.next`를 공유해서 청크 누락 (`Cannot find module './NNN.js'`) 에러가 잦았기 때문. `next.config.ts`의 `distDir` 분기 로직 참조.

## 자주 마주치는 문제

| 증상 | 해결 |
|---|---|
| `EADDRINUSE :3040` | `npm run free:3040` 후 다시 dev |
| `Cannot find module './NNN.js'` | `npm run dev:reset` |
| 흰 화면 / hydration 멈춤 | `npm run dev:reset` (3040 다른 인스턴스 잔존 확인) |
| `npm run dev` 중 `npm run clean` 돌리면 ENOENT | dev를 `Ctrl+C` 한 후 clean |
| `node tools/check-quiz-images.mjs` ko 누락 | `public/images/quiz/<slug>/ko/` 아래에 실제 자산 있는지 확인 |

## 빌드 산출물 확인

```bash
npm run build
ls out/                    # 정적 사이트 산출물
ls out/ko/love/            # 19 quiz routes
cat out/ads.txt            # AdSense ads.txt
cat out/sitemap.xml | head # sitemap 산출
```

`out/`은 `.gitignore`에 등록되어 있어 커밋되지 않음. Cloudflare Pages가 빌드 시 자동 생성.

## 인증 기능 로컬 테스트

| 기능 | 로컬에서 가능? |
|---|---|
| Kakao 공유 | 가능 (`NEXT_PUBLIC_SITE_ORIGIN`이 운영으로 정규화) |
| Kakao 로그인 | 가능하지만 Kakao Developers에 `localhost:3040` 등록 필요 |
| Supabase 구글 로그인 | 가능하지만 Supabase Dashboard에 `http://localhost:3040/ko/app/login/oauth/` Redirect URL 등록 필요 |

## 인앱브라우저 테스트

데스크톱 브라우저에서 InAppBrowserGuide가 발동하지 않음 (UA 매칭 안 됨). 실제 카톡/인스타에서 링크 열어 확인. 강제 발동:
```js
sessionStorage.removeItem("momopick:inapp-dismissed");
Object.defineProperty(navigator, "userAgent", { value: "... KAKAOTALK ...", configurable: true });
// 그 후 새로고침
```
