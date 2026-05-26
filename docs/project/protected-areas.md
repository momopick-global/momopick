# Protected Areas — 모모픽

> 아래 영역은 **건드릴 때 운영 영향이 크므로 신중하게**. 변경이 꼭 필요하면 반드시 `npm run build` + 운영 검증을 거치세요.

## 1. 카카오 공유

| 파일 | 역할 |
|---|---|
| `src/components/KakaoSdkInit.tsx` | Kakao JS SDK 로드 + `Kakao.init(JS키)` 1회 |
| `src/lib/kakaoShareFeed.ts` | URL/이미지 origin 정규화, Kakao Feed payload 생성 |
| `src/components/quiz/QuizResultShare.tsx` | 공유 버튼 UI |
| `src/components/quiz/useQuizResultShareModel.ts` | 공유 모델(텍스트·URL·이미지) 빌더 |
| `src/lib/quizOutcomeUrl.ts` | 결과 딥링크(`?r=`) URL 빌더 |

**주의사항**:
- `KAKAO_SITE_ORIGIN`은 `NEXT_PUBLIC_SITE_ORIGIN` 기본값 `https://momopick.com` 사용. **로컬에서도 운영 URL로 정규화**해서 공유.
- Kakao Developers 콘솔의 **플랫폼 도메인**에 `momopick.com`이 등록되어 있어야 SDK가 동작. 변경 시 콘솔도 같이.
- 공유 카드 이미지는 Kakao 서버에서 직접 fetch → 이미지 URL이 404면 카드가 깨짐. JSON의 `share.image` 경로는 반드시 운영에 존재해야 함.

## 2. 로그인·인증

| 파일 | 역할 |
|---|---|
| `src/lib/supabase/client.ts` | 브라우저 Supabase 클라이언트 (PKCE flow, Kakao 콜백 경로 isolation) |
| `src/lib/supabase/server.ts` | Server Component용 (정적 export에선 거의 미사용) |
| `src/lib/supabase/env.ts` | URL 정규화 + env 유효성 |
| `src/context/KakaoAuthContext.tsx` | Kakao Implicit 토큰 → user 동기화 |
| `src/lib/kakaoAuth.ts` | Kakao user load/save/clear (localStorage 기반) |
| `src/app/ko/app/login/callback/page.tsx` | Kakao implicit hash 콜백 |
| `src/app/ko/app/login/oauth/page.tsx` | Supabase OAuth PKCE 콜백 |
| `src/hooks/useKoAuthStatus.ts`, `useSupabaseAuthUser.ts` | 인증 상태 훅 |

**주의사항**:
- Supabase Dashboard의 Authentication → URL Configuration에 두 콜백 URL이 등록되어 있어야 함:
  - `https://momopick.com/ko/app/login/oauth/`
  - `http://localhost:3040/ko/app/login/oauth/`
- `createSupabaseBrowserClient`의 `detectSessionInUrl` 콜백은 **Kakao implicit 해시 토큰을 Supabase가 가로채지 않게** 막는 핵심 로직. 함부로 수정 금지.
- 카카오 콜백은 `/ko/app/login/callback/` (Implicit flow, hash에 access_token), 구글 등은 `/ko/app/login/oauth/` (PKCE, search params). 경로·슬래시 모두 정합 유지.

## 3. Supabase 통계 (참여자 수)

| 파일 | 역할 |
|---|---|
| `src/lib/quizStatsSupabase.ts` | `quiz_stats` 테이블 init/increase |
| `src/hooks/useQuizParticipantCount.ts` | 인트로에서 1회 fetch + 시작 시 1회 increase |
| `supabase/quiz_stats_setup.sql` | 테이블·RLS·RPC 정의 |
| `supabase/migrations/` | 추가 마이그레이션 |

**주의사항**:
- 중복 호출 방지 로직(`isCountingRef`, `registerStartSeqRef`)이 있음 — 수정 시 dev 환경에서 두 번 incr되지 않는지 확인.
- RPC 함수 `increment_quiz_stat`가 RLS 우회 — 함부로 정책 변경 금지.

## 4. 배포 설정

| 파일 | 역할 |
|---|---|
| `next.config.ts` | `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`, `distDir` dev/prod 분리 |
| `public/_headers` | `/ko/love/*`에 `must-revalidate` (재배포 후 옛 청크 참조 방지) |
| `public/_redirects` | `www.momopick.com/* → momopick.com/:splat 301!` |
| `functions/api/health.ts` | Cloudflare Pages Functions 헬스체크 |

**주의사항**:
- `output: "export"` 모드에서는 **App Router API Route Handler가 빌드에 포함되지 않음**. API는 `functions/`에서만.
- `distDir` 분기 로직(`.next-dev` vs `.next`)은 dev/build 동시 실행 시 청크 누락 방지용. 분기 조건(`npm_lifecycle_event` 등) 수정 시 dev/build 둘 다 정상인지 검증.
- `trailingSlash: true`라 `canonical`·`href`·`sitemap` 모두 슬래시로 끝나야 정합.

## 5. SEO

| 파일 | 역할 |
|---|---|
| `public/sitemap.xml` | **수기 관리** 31개 URL (자동 생성 스크립트 없음) |
| `public/robots.txt` | 직접 작성 + Cloudflare가 AI 봇 차단 블록 prepend |
| 각 페이지 `metadata.alternates.canonical` | `https://momopick.com/...` 기준 |
| `src/app/ko/layout.tsx`의 JSON-LD | WebSite + Organization + FAQPage 스키마 |

**주의사항**:
- 새 정적 페이지 추가 시 `public/sitemap.xml`에 수기 등록 필요.
- `noindex` 페이지(feedback/login/saved/explore/today)는 sitemap에서 제외 — 정합성 유지.
- canonical은 반드시 `https://momopick.com/` (apex, 트레일링 슬래시) 기준.
- Cloudflare가 robots.txt에 AI 봇 차단(`Google-Extended`, `GPTBot` 등) 자동 prepend함. AdSense 봇(`Mediapartners-Google`, `AdsBot-Google`)은 차단 대상 아님 — 그대로 유지.

## 6. AdSense

| 파일 | 역할 |
|---|---|
| `src/app/layout.tsx` (line ~35) | `<head>` 안의 raw `<script async src="...pagead2.googlesyndication.com...">` (client = `ca-pub-2758905830381994`) |
| `public/ads.txt` | `google.com, pub-2758905830381994, DIRECT, f08c47fec0942fa0` |

**주의사항**:
- 심사 중이므로 **AdSense 코드 자체를 옮기거나 제거하지 말 것**. `next/script`로 바꾸면 `<head>`에 raw `<script>` 태그가 안 박혀 심사가 영향 받을 수 있음 (history: 이전에 검증해서 raw `<script>`로 정착).
- `ads.txt` publisher id (`pub-2758905830381994`)는 절대 다른 값으로 바꾸지 말 것.
- 광고 슬롯 추가 시 별도 `<ins class="adsbygoogle">` + `(adsbygoogle = window.adsbygoogle || []).push({})` 패턴 사용.

## 7. 콘텐츠 자산 경로

| 파일 | 역할 |
|---|---|
| `src/lib/content/quizAssetUrl.ts` | JSON 경로 `/images/quiz/<slug>/file.webp` → 런타임에 `/images/quiz/<slug>/<locale>/file.webp`로 재작성 |
| `tools/check-quiz-images.mjs` | 위 규칙 복제. 헤더에 동기화 주석 명시 |

**주의사항**:
- `quizAssetUrl()` 규칙을 바꾸면 `check-quiz-images.mjs`의 `resolveQuizAssetUrl()`도 같이 갱신.
- 새 이미지 추가 시 반드시 `<locale>/` 하위에. 루트에 두면 런타임에 못 찾음.

## 공통 원칙

1. **기존 컴포넌트 시그니처 변경 금지** — 꼭 필요하면 optional prop 추가 방식 우선
2. **새 기능은 모듈 단위 분리** — 기존 파일 비대화 지양
3. **`npm run build` 통과 + 운영 검증 필수** — 정적 export 특성상 빌드 통과해도 런타임 이슈 가능
4. **카카오/Supabase 인증 흐름 손볼 때는 운영 도메인에서 직접 테스트** — 로컬과 운영 origin 차이 있음
5. **푸시 전 사용자 확인** — 자동 push 금지 (`main`에 바로 들어감)
