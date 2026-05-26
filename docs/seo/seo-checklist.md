# SEO Checklist — 모모픽

## 운영 도메인 정책

- **단일 apex**: `https://momopick.com/` (트레일링 슬래시)
- `www` → apex 301 (`public/_redirects`)
- 모든 canonical / OG `url` / sitemap loc은 **apex + trailing slash** 기준

## 페이지별 점검표

새 페이지 추가 시 다음을 모두 만족해야 함:

- [ ] `metadata.title` 명시
- [ ] `metadata.description` 명시 (150~160자)
- [ ] `metadata.alternates.canonical` = `https://momopick.com/<path>/` (슬래시 끝)
- [ ] `metadata.openGraph.{title,description,url,images,locale,type}` 명시
- [ ] `metadata.twitter.card = "summary_large_image"` (root layout에서 상속됨)
- [ ] 내부 콘텐츠 페이지면 `metadata.robots` 미설정 (기본 `index, follow`)
- [ ] noindex 영역(개인앱·임시 placeholder)이면 `metadata.robots = { index: false, follow: true }`
- [ ] `public/sitemap.xml`에 `<url>` 블록 추가 (noindex면 추가하지 말 것)
- [ ] (선택) JSON-LD 구조화 데이터: 퀴즈/블로그 글은 Article, FAQ가 있으면 FAQPage

## 현재 SEO 상태 점검 결과 (2026-05-25 기준)

- ✅ 모든 주요 페이지에 canonical 정확 등록
- ✅ noindex 페이지: feedback, login, saved, explore, today
- ✅ sitemap에 noindex 페이지 미포함
- ✅ AdSense 스크립트 모든 페이지 `<head>`에 정확히
- ✅ ads.txt 200, publisher id 정확
- ✅ robots.txt: AdSense 봇 차단 없음
- ⚠️ sitemap에 다음 페이지 미등록: `/ko/about/`, `/ko/blog/`(인덱스), `/ko/notice/`, `/ko/faq/`, `/ko/partnership/`, `/ko/policy/disclaimer/` — 추가 검토
- ⚠️ 다국어 placeholder가 sitemap hreflang에는 등록 (noindex라 큰 문제는 아님)

## hreflang 정책

`public/sitemap.xml`에는 `xhtml:link rel="alternate" hreflang="..."` 등록되어 있음:

```xml
<url>
  <loc>https://momopick.com/</loc>
  <xhtml:link rel="alternate" hreflang="ko" href="https://momopick.com/ko/"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://momopick.com/en/"/>
  ...
  <xhtml:link rel="alternate" hreflang="x-default" href="https://momopick.com/"/>
</url>
```

다국어 본격 출시 전까지는 placeholder를 가리키지만, noindex이므로 검색결과 노출 없음.

## 메타 데이터 통합 관리 패턴

각 페이지가 자체적으로 `metadata` export. 공통 OG 이미지는 `https://momopick.com/og/main-og.webp` 사용. 페이지별 커스텀 OG는 `pack.images?.og` 등 콘텐츠 단위로 분기.

## 구조화 데이터 (JSON-LD)

`src/app/ko/layout.tsx`에 3종 자동 삽입:
- `WebSite` (검색 액션 포함)
- `Organization` (logo, sameAs)
- `FAQPage` (FAQ 12개)

퀴즈 페이지 (예: `src/app/ko/love/anger-style-test/page.tsx`)에는 `Article` JSON-LD 빌더 함수가 있으나 **현재 호출되지 않은 상태** (`buildArticleJsonLd` unused warning). 활용 검토 가능.

## 검색 색인 모니터링

- Google Search Console에 `momopick.com` (apex) 속성 등록 권장
- Sitemap 제출: `https://momopick.com/sitemap.xml`
- 자세한 건 [search-console.md](./search-console.md)

## AdSense와의 관계

AdSense는 자체 크롤러(`Mediapartners-Google`, `AdsBot-Google`)로 사이트를 평가. SEO와 별개지만 다음은 양쪽에 모두 영향:
- 콘텐츠 양 / 품질
- 사이트 접근성 (모바일 friendly)
- 페이지 응답 속도
- 정책 페이지 존재 여부

자세한 건 [adsense-review.md](./adsense-review.md).
