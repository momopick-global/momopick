# Current Status — 모모픽

> **마지막 업데이트**: 2026-05-25

## 운영 기준

| 항목 | 값 |
|---|---|
| 운영 도메인 | https://momopick.com |
| `www` | `https://www.momopick.com/* → https://momopick.com/:splat 301` (public/_redirects) |
| 배포 환경 | Cloudflare Pages (자동 배포: main 푸시 시) |
| Production branch | `main` |
| Build command | `npm ci && npm run build` |
| Build output | `out/` |
| Local dev port | **3040** |
| 현재 HEAD (이 문서 기준) | `b1ea46b chore(seo): add blog posts to sitemap` |

## 환경변수 (운영 반영 여부)

| 변수 | 용도 | 상태 |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | 운영 설정 완료 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | 운영 설정 완료 |
| `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` | Kakao JS SDK init | 운영 설정 완료 |
| `NEXT_PUBLIC_SITE_ORIGIN` | 카카오 공유 시 origin 정규화 (없으면 momopick.com 기본) | 옵션 |

자세한 건 [../setup/environment-variables.md](../setup/environment-variables.md).

## 현재 구현된 주요 페이지

- 한국어 홈: `/ko/`
- 연애 테스트 허브: `/ko/love/` + 19개 슬러그
- 결과 카탈로그: `/ko/love/<slug>/results/`
- 블로그: `/ko/blog/` + 7개 글
- 정책: `/ko/policy/{privacy,terms,disclaimer}/`
- 소개·FAQ·공지·제휴·피드백·로그인·저장함

## 최근 완료 작업 (역순)

| 일자 | 커밋 | 내용 |
|---|---|---|
| 2026-05-25 | `b1ea46b` | sitemap에 블로그 7개 URL 추가 |
| 2026-05-24 | `0d2bf64` | AdSense 심사 준비 — `/ko/explore/`, `/ko/today/` noindex 처리, 개인정보처리방침 §2/§4/§5/§9에 Google AdSense 조항 추가, 면책조항 §6 "제3자 광고" 신규 추가 |
| 2026-05-24 | `8a0891f` | Google AdSense 심사 코드 (`ca-pub-2758905830381994`) 루트 layout `<head>`에 raw `<script>`로 삽입 + `public/ads.txt` 생성 |
| 2026-05-24 | `f46ee64` | `ambiguous-situationship-end` 누락 result-3/4 이미지를 `quiz-image-pending.webp`로 임시 대체 |
| 2026-05-24 | `8bbd962` | 무참조 미디어 5개(~4.5MB) 삭제, `tools/check-quiz-images.mjs` 로케일 룰 반영 |
| 2026-05-20 | `b5aae62` | InAppBrowserGuide 모달 (카톡/인스타/페북/라인/네이버 감지, Android intent:// / iOS googlechromes:// scheme) |
| 2026-05 이전 | `6e46bd1` | `/ko/today/` 타로 비디오 첫 프레임 포스터 |
| 2026-05 이전 | `e2d312b` | `/ko/today/` 타로 비디오 경험 |

## 알려진 미해결 / 잔여 작업

| 항목 | 영향 | 우선순위 |
|---|---|---|
| `ambiguous-situationship-end` C/D 결과 실제 자산 생성 | 현재 pending placeholder 노출 중 | 중 |
| 빈 love 슬러그 4개 (`dating-personality-type`, `ideal-type-reality-test`, `why-my-relationships-fail`, `your-love-type`) | 폴더만 존재, 라우트 없음 (404) | 중 |
| 짧은 블로그 글 5개 (220~320자) | AdSense thin-content 리스크 | 중 |
| 다국어 placeholder(/en/, /ja/, /es/, /pt/, /id/) | noindex이지만 sitemap hreflang에 포함 | 낮 |
| GA4 / GTM 미적용 | 트래픽·전환 측정 불가 | 낮 (AdSense 승인 이후) |
| 광고 슬롯 UI | AdSense 승인 후 배치 필요 | AdSense 승인 후 |
| `your-love-type` 폴더 — 자산 0 | 정리 결정 필요 | 낮 |
| `src/app/api/` 부모 빈 폴더 | 영향 없음 | 매우 낮 |

## AdSense 심사 상태

- 심사 코드 삽입 완료 + `ads.txt` 운영 200
- 심사 요청 가능 상태
- 자세한 건 [../seo/adsense-review.md](../seo/adsense-review.md)
