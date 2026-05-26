# Metadata & OG — 모모픽

## 공통 패턴

각 `page.tsx`가 직접 `export const metadata: Metadata = {...}` 또는 `generateMetadata()` 함수 export.

### 표준 필드

```tsx
export const metadata: Metadata = {
  title: "...",                              // 페이지 고유 제목
  description: "...",                        // 150~160자
  alternates: {
    canonical: "https://momopick.com/<path>/",  // trailing slash
  },
  robots: { index: false, follow: true },    // noindex 페이지만
  openGraph: {
    title: "...",
    description: "...",
    url: "https://momopick.com/<path>/",
    images: [{ url: "...", width: 1536, height: 1024, alt: "..." }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};
```

## 루트 metadata 상속

`src/app/layout.tsx`에 `metadataBase: new URL("https://momopick.com")` 설정 → 각 페이지에서 절대 URL 자동 보강.

```tsx
metadataBase: new URL("https://momopick.com"),
title: { default: "Momopick", template: "%s | Momopick" },
description: "Momopick — fun quizzes & personality tests. Choose your language.",
openGraph: { ... },
twitter: { card: "summary_large_image" },
```

## 페이지별 차이

| 페이지 | title 패턴 | description | OG image |
|---|---|---|---|
| `/` | `Momopick` | 영어 카피 | 메인 OG |
| `/ko/` | `모모픽(Momopick) \| MBTI·연애·심리 테스트 & 재미 퀴즈` | 한국어 카피 | 메인 OG |
| `/ko/love/<slug>/` | `<퀴즈 제목> \| 모모픽` | JSON의 `meta.description` | JSON의 `meta.ogImage` 또는 메인 OG |
| `/ko/blog/<slug>/` | `<글 제목> \| 모모픽 블로그` | 글의 excerpt | 글 hero 이미지 또는 메인 OG |
| `/ko/policy/<type>/` | 한국어 제목 | 정책 요약 | 메인 OG |

## 공통 OG 이미지

| 용도 | 경로 |
|---|---|
| 메인 fallback OG | `https://momopick.com/og/main-og.webp` (1536×1024) |
| 브랜드 로고 | `https://momopick.com/images/brand/momopick_symbol.webp` |
| 워드마크 | `https://momopick.com/images/brand/momopick_wordmark.webp` |
| 블로그 글 hero | `public/images/blog/<slug>-...webp` |
| 블로그 OG 분리 | `public/images/og/blog/<slug>...webp` (있을 경우) |

## Twitter Card

- 모든 페이지 `summary_large_image` (root layout에서 상속)
- 이미지 비율 1.91:1 권장 (현재 1536×1024 = 1.5:1, 살짝 안 맞지만 Twitter가 자동 crop)

## JSON-LD (구조화 데이터)

`src/app/ko/layout.tsx`에 3종 inline:

1. **WebSite** — `name`, `alternateName`, `url`, `inLanguage`, `image`, `potentialAction: SearchAction`
2. **Organization** — `name`, `url`, `logo`, `image`, `sameAs` (YouTube, Instagram)
3. **FAQPage** — 12개 Q&A (사이트 전반에 대한 일반 FAQ)

퀴즈 페이지에는 개별 `Article` JSON-LD 빌더가 있으나 (`buildArticleJsonLd` 함수) 현재 미사용 상태 (warning 발생). 활용 검토 가능.

## 슬래시 정책

`next.config.ts`의 `trailingSlash: true`로 모든 URL이 슬래시로 끝남. 다음 모두 정합 필수:
- `alternates.canonical`
- `openGraph.url`
- sitemap `<loc>`
- 내부 `<Link href>` (Next.js가 자동 처리하지만, 외부 인용 URL은 직접)

## metadata 작성 가이드

- **title**: 핵심 키워드 앞쪽, `| 모모픽` 또는 `| 모모픽 블로그` 후행
- **description**: 사용자 검색 의도와 매칭되는 카피 (`MBTI`, `연애 테스트`, `심리 테스트` 등)
- **OG image**: 페이지 고유 이미지가 있으면 사용, 없으면 `main-og.webp`
- **noindex 결정**: 콘텐츠가 얇거나 (placeholder) 개인 영역 (login/saved/feedback)이면 noindex

## 점검 명령

```bash
# canonical 정합성
curl -s https://momopick.com/ko/ | grep -oE 'rel="canonical" href="[^"]+"'

# OG image
curl -s https://momopick.com/ko/ | grep -oE 'og:image" content="[^"]+"' | head -1

# noindex 여부
curl -s https://momopick.com/ko/explore/ | grep -oE 'name="robots"[^>]*'
```
