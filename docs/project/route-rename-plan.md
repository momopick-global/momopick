# 경로 리네이밍 실행 계획 (심층·성향 URL 정리)

> 상태: **계획만 / 미실행**. 백로그 항목은 [roadmap.md](./roadmap.md) 「장기」 참고.
> ⚠️ **전제조건: AdSense 승인 후에 진행 + 301 리다이렉트 필수.** 심사 중 URL 대량 변경은 위험.

## 배경 / 목적

- 카테고리 라벨은 심층/원픽/성향으로 통일돼 있는데, 퀴즈 URL 세그먼트는 여전히 `love`다.
- 원픽·성향은 전용 허브 경로(`/ko/onepick/`, `/ko/personality-test/`)가 있지만, 심층 허브는 퀴즈 부모 경로(`/ko/love/`)를 겸한다.
- 목표: URL을 라벨과 맞추기 (예: `/ko/love/` → `/ko/deep/`, `/ko/personality-test/` → `/ko/personality/`). **최종 경로명은 미확정.**

## 현재 구조 (헷갈리기 쉬운 점)

- 퀴즈 실제 페이지: `/ko/love/<slug>/` — 심층·원픽·성향 **모든 퀴즈가 여기 있음** (원픽도 `/ko/love/<slug>/`).
- 허브(목록): `/ko/love/`(심층) · `/ko/onepick/`(원픽) · `/ko/personality-test/`(성향).
- 경로 세그먼트 `love`는 각 퀴즈 JSON의 `category: "love"` + `snackQuizHref(locale, cat, slug)`에서 생성됨.

## 영향 범위 (2026-07 조사 기준)

- `/ko/love` 참조: **소스 47개 파일 + 문서 23개 + 라우트 폴더 36개 + `public/sitemap.xml` 21 URL + `public/_headers`**
- `/ko/personality-test`: 소스·문서 7곳
- 경로가 `category` 필드에서 파생되어 깊게 얽혀 있음.

## 실행 체크리스트

### A. 코드
- [ ] 라우트 폴더 이동: `src/app/ko/love/` → `src/app/ko/<new>/` (개별 퀴즈 36개 폴더 포함)
- [ ] 경로 생성 로직: `src/lib/content/quizRoutes.ts`의 `snackQuizHref`·`quizPathSegment` — `category` → URL 세그먼트 매핑 조정 (category 값을 바꿀지, 매핑만 바꿀지 결정)
- [ ] 각 페이지 `canonical` (`https://momopick.com/ko/love/...` → 새 경로)
- [ ] OG `url`·`images` 절대경로
- [ ] 내비 단일 소스 `KO_PRIMARY_NAV` (`koSiteNavLinks.ts`)의 `href`·`matchPrefixes`
- [ ] breadcrumb·`KoPageFooter`의 `moreHref` 등 내부 링크 (`/ko/love`, `/ko/onepick`, `/ko/personality-test`)
- [ ] `[slug]/results` 등 하위 라우트
- [ ] 성향 허브: `/ko/personality-test/` → `/ko/personality/` (원할 경우) — 단, `KO_PRIMARY_NAV`에 `/ko/personality/`가 미래 카테고리로 예약돼 있어 충돌 정리 필요

### B. SEO / 배포 설정 (가장 중요)
- [ ] **`public/_redirects`에 옛→새 301 리다이렉트 전부 추가** (`/ko/love/* → /ko/<new>/:splat 301` + 개별 슬러그) — 누락 시 색인·백링크 유실
- [ ] `public/sitemap.xml` 21개 URL 갱신 (신규 경로)
- [ ] `public/_headers` 경로 규칙 갱신
- [ ] `robots.txt` 확인

### C. 문서
- [ ] `docs/project/overview.md` 라우트 목록
- [ ] `docs/quiz-docs-hub.md`, `docs/features/*`, `docs/content/*` 등 경로 언급 23곳
- [ ] `docs/features/onepick-tests.md`·`onepick-quiz-content.md`의 `/ko/love/<slug>/` 예시

### D. 검증
- [ ] `npx tsc --noEmit`, `eslint`, `node tools/check-quiz-images.mjs`
- [ ] `npm run build` (로컬 — 샌드박스는 SWC 문제로 불가)
- [ ] `grep -rn "/ko/love" src/ docs/ public/` 잔여 0 확인

### E. 배포 후 (SEO 반영)
- [ ] push → Cloudflare 배포
- [ ] 옛 URL 브라우저 접속 → 301 새 URL 이동 확인
- [ ] Search Console 새 sitemap 제출 + 재색인 요청, 색인 상태 모니터링 (수일~2주)
- [ ] 카카오 공유 디버거로 주요 URL 캐시 재갱신

## 리스크

- 색인·순위 일시 하락 가능 (301로 완화되나 회복에 시간 필요)
- AdSense 심사 중이면 URL 대량 변경이 심사 지연·재심사 유발 가능
- 카카오 공유 캐시가 옛 URL을 물고 있으면 미리보기 깨짐 → 디버거 재갱신 필요

## 예상 소요

- **코드·문서 수정(스크립트 일괄):** 약 30~60분 (자체 검증 포함)
- **배포·301 검증·SEO 재색인 안정화:** **1~3주** (구글 재크롤/재색인 대기)

## 권장 시점

AdSense **승인 이후**, 트래픽 여유 있는 시기에 **301 리다이렉트를 먼저 세팅**하고 한 번에 진행.
