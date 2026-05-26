# 모모픽(Momopick) — Claude Code 문서 허브

> **목적**: Claude Code가 모모픽 프로젝트의 구조·기능·SEO·디자인·배포를 빠르게 파악하기 위한 문서 모음.
> 이 폴더의 문서를 먼저 읽고 작업을 시작하세요.

---

## 운영 기준 요약 (2026-05-25 기준)

| 항목 | 값 |
|---|---|
| 서비스명 | **모모픽 (Momopick)** — 유어타로/다른 프로젝트 아님 |
| 운영 도메인 | **https://momopick.com** |
| 배포 환경 | **Cloudflare Pages** (Next.js 정적 export) |
| Production branch | **main** |
| 최근 커밋(이 문서 기준) | `b1ea46b chore(seo): add blog posts to sitemap` |
| 활성 로케일 | `/ko/` 만 운영 (en/ja/es/pt/id는 placeholder, noindex) |
| AdSense | 심사 코드 삽입 완료(`ca-pub-2758905830381994`), 슬롯 미배치, 심사 대기 |
| GA4 / GTM | **미적용** |

---

## Claude Code가 먼저 읽어야 할 문서 순서

1. [project/overview.md](./project/overview.md) — 서비스 개요
2. [project/current-status.md](./project/current-status.md) — 현재 운영 기준
3. [project/protected-areas.md](./project/protected-areas.md) — **건드리면 위험한 영역**
4. [setup/deployment.md](./setup/deployment.md) — Cloudflare Pages 배포 흐름
5. [setup/environment-variables.md](./setup/environment-variables.md) — 환경변수
6. [seo/adsense-review.md](./seo/adsense-review.md) — AdSense 심사 상태
7. [features/snack-tests.md](./features/snack-tests.md) — 핵심 기능: 스낵 테스트
8. [features/share-kakao.md](./features/share-kakao.md) — 카카오 공유 (수정 주의)
9. [design/design-overview.md](./design/design-overview.md) — 디자인 톤
10. [content/content-tone.md](./content/content-tone.md) — 문구 톤
11. [troubleshooting/adsense-issues.md](./troubleshooting/adsense-issues.md) — 심사 트러블슈팅

---

## 전체 문서 구조

```
docs/
├─ README.md                   ← 이 파일
├─ project/
│  ├─ overview.md              서비스 개요·라우트·기술 스택
│  ├─ current-status.md        커밋·도메인·배포·최근 작업
│  ├─ roadmap.md               예정 작업·미해결 이슈
│  └─ protected-areas.md       건드리면 위험한 영역
├─ setup/
│  ├─ local-development.md     npm 스크립트·포트 3040
│  ├─ deployment.md            Cloudflare Pages 배포
│  ├─ environment-variables.md NEXT_PUBLIC_*
│  └─ cloudflare-pages.md      _headers·_redirects·functions/
├─ seo/
│  ├─ seo-checklist.md         색인·canonical 점검표
│  ├─ adsense-review.md        AdSense 심사 상태
│  ├─ sitemap-robots.md        sitemap.xml·robots.txt 관리
│  ├─ metadata-og.md           metadata·OG·JSON-LD
│  └─ search-console.md        Search Console 운용
├─ features/
│  ├─ snack-tests.md           스낵형 13개 퀴즈
│  ├─ love-tests.md            퍼센티지형 6개 퀴즈
│  ├─ blog.md                  /ko/blog/
│  ├─ auth-login.md            Kakao+Supabase OAuth
│  ├─ share-kakao.md           Kakao Feed 공유
│  ├─ supabase-stats.md        quiz_stats 참여자 수
│  └─ inapp-browser.md         InAppBrowserGuide
├─ design/
│  ├─ design-overview.md       디자인 톤
│  ├─ ui-guidelines.md         UI 패턴
│  ├─ color-system.md          컬러 토큰
│  ├─ typography.md            타이포
│  ├─ layout-mobile.md         모바일 우선
│  ├─ image-guidelines.md      이미지 공통 규칙
│  ├─ quiz-image-style.md      퀴즈 이미지 스타일
│  └─ asset-paths.md           public/images 경로 규칙
├─ content/
│  ├─ content-tone.md          모모픽 문구 톤
│  ├─ quiz-writing-guide.md    퀴즈 문항·선택지 작성법
│  ├─ result-writing-guide.md  결과 글 작성법
│  └─ blog-writing-guide.md    블로그 글 작성법
├─ troubleshooting/
│  ├─ domain-cloudflare.md     도메인·DNS·www→apex
│  ├─ build-errors.md          빌드 에러
│  ├─ search-console.md        sitemap 제출 문제
│  ├─ kakao-share.md           공유 카드 안 보일 때
│  ├─ inapp-browser.md         인앱 브라우저 트러블
│  └─ adsense-issues.md        심사 거절 사유·체크리스트
└─ archive/
   ├─ GEMINI.md                          (Firebase Studio 템플릿, 무관)
   ├─ blueprint.md                       (framework-less 스타터, 무관)
   ├─ 2026-q2-planning-docs-readme.md    (옛 기획 문서 — 1차 오픈 기획)
   ├─ 2026-q2-planning-api-spec.md       (옛 API 기획)
   ├─ 2026-q2-planning-data-model.md     (옛 데이터 모델 기획)
   ├─ 2026-q2-planning-design-system.md  (옛 디자인 시스템 기획)
   └─ 2026-q2-planning-folder-structure.md (옛 폴더 구조 기획)
```

---

## 절대 건드리면 안 되는 영역 (요약 — 자세한 건 [protected-areas.md](./project/protected-areas.md))

- **카카오 공유**: `KakaoSdkInit`, `lib/kakaoShareFeed.ts`, `components/quiz/QuizResultShare.tsx`, `useQuizResultShareModel`
- **로그인·인증**: `context/KakaoAuthContext.tsx`, `lib/supabase/*`, `/ko/app/login/*` 콜백 경로
- **Supabase 통계**: `lib/quizStatsSupabase.ts`, `hooks/useQuizParticipantCount.ts`
- **배포 설정**: `next.config.ts`, `public/_headers`, `public/_redirects`
- **SEO**: `public/sitemap.xml`, `public/robots.txt`, 각 페이지 `metadata` canonical
- **AdSense**: `src/app/layout.tsx`의 `<script async src="...adsbygoogle...">`, `public/ads.txt`

---

## 최근 주요 작업 (역순)

| 커밋 | 내용 |
|---|---|
| `b1ea46b` | sitemap에 블로그 7개 URL 추가 |
| `0d2bf64` | AdSense 심사 준비: explore/today noindex + 정책 페이지 광고 조항 추가 |
| `8a0891f` | Google AdSense 심사 스크립트 + ads.txt 추가 |
| `f46ee64` | ambiguous-situationship-end의 누락된 result-3/4 이미지를 pending placeholder로 대체 |
| `8bbd962` | 무참조 미디어 5개 삭제 + check-quiz-images.mjs 로케일 룰 반영 |
| `b5aae62` | InAppBrowserGuide 모달 (카톡/인스타/페북/라인/네이버 감지) |

---

## 다음 작업 전 체크리스트

- [ ] 작업 대상 영역이 [protected-areas.md](./project/protected-areas.md)에 해당하는지 확인
- [ ] `git status` 깨끗한 상태에서 시작 (`next-env.d.ts` 변경은 자동, 커밋 제외)
- [ ] 코드 수정 시 `npm run build` 통과 확인
- [ ] 콘텐츠/이미지 수정 시 `node tools/check-quiz-images.mjs` 통과 확인
- [ ] 새 페이지 추가 시 `public/sitemap.xml` 등록 검토
- [ ] AdSense 심사 영향 가능성 평가 ([seo/adsense-review.md](./seo/adsense-review.md))
- [ ] 커밋 후 push 전 사용자 확인 (자동 push 금지)

---

## 문서 작성 원칙

- 사실 기반: 코드/저장소의 현재 상태만 기록. 추측·계획은 `roadmap.md` 또는 `archive/`로.
- 비밀키 금지: API Key/Supabase Key/OAuth Secret 값은 절대 적지 않음. 변수명과 용도만.
- 짧고 검색 가능하게: 표·체크리스트·코드 경로 위주.
- 변경 발생 시 해당 문서를 같이 업데이트.
