# Project Overview — 모모픽 (Momopick)

> **현재 서비스는 모모픽(momopick.com)입니다.** 유어타로, 푸망, 소울블렌드 등은 별개 프로젝트입니다.

## 서비스 목적

MBTI·연애·심리·소셜·스타일·재미 주제의 **짧은 스낵 퀴즈**로 자기이해를 돕고 결과를 SNS로 공유하게 만드는 모바일 중심 콘텐츠 플랫폼.

- 1~3분 안에 끝나는 짧은 테스트
- 결과는 카드형 비주얼 + 카카오/페북/링크 공유
- 진단이 아닌 **재미 + 자기이해** 톤 (의학적 표현 금지)

## 기술 스택

| 영역 | 기술 |
|---|---|
| Framework | Next.js 15.5 (App Router) |
| Language | TypeScript strict |
| Runtime | React 19 |
| Build | 정적 export (`output: "export"`) — `out/`로 산출 |
| Hosting | Cloudflare Pages |
| Auth | Supabase (Google OAuth PKCE) + Kakao Implicit |
| DB | Supabase Postgres (`quiz_stats` 테이블 중심) |
| Pages Functions | `functions/api/health.ts` 하나만 (헬스체크) |
| Shared SDK | Kakao JavaScript SDK (Feed 공유용) |

## 활성 로케일

- **`/ko/`** — 한국어, 운영 중
- `/en/`, `/ja/`, `/es/`, `/pt/`, `/id/` — placeholder 페이지 (noindex). `src/app/[lang]/page.tsx`에서 안내만.

## 주요 라우트 (현재)

```
/                           홈 — LanguageGateway (언어 선택)
/ko/                        한국어 홈 (KoSiteHeader + 캐러셀 + 레일 + 블로그)
/ko/about/                  서비스 소개
/ko/love/                   연애 테스트 허브 (19개 카드)
/ko/love/<slug>/            개별 퀴즈 (19개 슬러그)
/ko/love/<slug>/results/    결과 카탈로그 (모든 결과 미리보기)
/ko/blog/                   블로그 인덱스
/ko/blog/<slug>/            블로그 글 (7개)
/ko/explore/                탐색 (현재 placeholder, noindex)
/ko/today/                  오늘의 운세 (현재 placeholder, noindex)
/ko/faq/                    FAQ
/ko/feedback/               피드백 안내 (noindex)
/ko/notice/                 공지
/ko/partnership/            제휴 안내
/ko/policy/privacy/         개인정보처리방침
/ko/policy/terms/           이용약관
/ko/policy/disclaimer/      면책조항
/ko/app/login/              로그인 페이지 (noindex)
/ko/app/login/callback/     Kakao Implicit 콜백
/ko/app/login/oauth/        Supabase OAuth PKCE 콜백
/ko/app/saved/              저장한 결과 보관함 (noindex, 인증 필요)
```

## 주요 기능 요약

| 기능 | 위치 | 상태 |
|---|---|---|
| 스낵형 퀴즈 (13개) | `SnackQuiz` + JSON | 운영 중 |
| 퍼센티지형 퀴즈 (6개) | `PercentageQuiz` + JSON | 운영 중 |
| 결과 공유 (Kakao Feed / 페북 / 트위터 / 링크) | `QuizResultShare` | 운영 중 |
| 카카오 로그인 (Implicit) | `KakaoAuthContext` | 운영 중 |
| 구글 로그인 (Supabase PKCE) | `lib/supabase/client.ts` | 운영 중 |
| 참여자 수 통계 | `quiz_stats` Supabase 테이블 | 운영 중 |
| 결과 저장 보관함 (Vault) | `lib/quizSavedResults.ts` + `/ko/app/saved/` | 운영 중 |
| 인앱브라우저 가이드 | `InAppBrowserGuide` (root layout) | 운영 중 |
| AdSense | layout `<head>` script + ads.txt | 심사 대기 |
| 광고 슬롯 UI | — | 미구현 |
| GA4 / GTM | — | 미구현 |

## 콘텐츠 데이터

| 경로 | 용도 |
|---|---|
| `src/content/quiz/*.json` | 퀴즈 19개 (제목·문항·결과 모두) |
| `src/content/quiz/index.ts` | JSON re-export + 타입 |
| `src/content/blog/koSamplePosts.ts` | 블로그 7개 |
| `src/content/home/koHeroBanners.ts` | 홈 히어로 배너 |
| `src/content/notice/koSampleNotices.ts` | 공지 |

이미지: `public/images/quiz/<slug>/<locale>/...` — 런타임 `lib/content/quizAssetUrl.ts`가 locale 세그먼트를 삽입.

## 폴더 구조 (요약)

```
momopick/
├── src/
│   ├── app/                # App Router (root layout + ko routes + [lang])
│   ├── components/         # KakaoSdkInit, InAppBrowserGuide, ko/*, quiz/*, blog/*
│   ├── content/            # 콘텐츠 JSON·TS
│   ├── context/            # KakaoAuthContext
│   ├── hooks/              # useKoAuthStatus, useSupabaseAuthUser, useQuizParticipantCount
│   ├── lib/                # supabase/, content/, kakaoShareFeed, kakaoAuth, …
│   ├── i18n/               # quiz-ui.ts
│   ├── schemas/            # quiz·notice·tag JSON schemas
│   └── types/              # kakao-browser.d.ts
├── public/                 # 정적 파일 (sitemap.xml, robots.txt, ads.txt, _headers, _redirects, images/)
├── functions/api/health.ts # Cloudflare Pages Functions (단 하나)
├── supabase/               # migrations + quiz_stats_setup.sql
├── tools/                  # check-quiz-images.mjs
├── docs/                   # 이 문서들
├── next.config.ts          # output:"export", trailingSlash:true, distDir 분기
└── package.json
```

## 참고 — 모모픽이 아닌 것

- **모모픽 ≠ 유어타로(yourtarot.cc)** — Vercel/Next 동적 배포, /tarot, /menu, /psych-tests 라우트 사용
- **모모픽 ≠ 푸망/소울블렌드/청월당** — 옛 기획 문서에 레퍼런스로 언급되어 있을 수 있으나 별개 서비스

작업 시 라우트나 파일 경로를 추측하지 말고 항상 코드에서 확인하세요.
