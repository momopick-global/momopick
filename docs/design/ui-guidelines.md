# UI Guidelines — 모모픽

## 컴포넌트 패턴

| 패턴 | 위치/이름 | 용도 |
|---|---|---|
| 카드 | `.rail-card`, `.hub-card` 등 | 퀴즈 썸네일/허브 |
| Hero 배너 | `HeroBannerCarousel` | 홈 상단 |
| 카테고리 바 | `KoCatBar` | 홈/허브 상단 카테고리 chip |
| 사이트 헤더 | `KoSiteHeader` | 모든 ko 페이지 상단 |
| 푸터 | `KoFooterNav` (전체) / `KoFooterLegal` (간략) | 페이지별 적절히 |
| 바텀 네비 | `KoBottomNav` | 모바일 하단 고정 (`ko/layout.tsx`에서 마운트) |
| 뒤로 가기 | `BackButton` | 상세 페이지 상단 |
| 공유 | `QuizResultShare` | 결과 페이지 |
| 인앱 모달 | `InAppBrowserGuide` | 루트 자동 |

## 카드 / 카드형 UI

- `--radius: 20px` (큰 카드) / `--radius-sm: 14px` (작은 chip)
- 그림자: `--shadow` 기본 / `--shadow-hover` hover
- 카드 패딩 모바일 `16~24px`, 큰 화면 `24~32px`
- 그리드:
  - 모바일: 1열 (썸네일 + 텍스트)
  - 태블릿+: 2~3열

## 버튼 / CTA

- 주 CTA: `.btn.primary` — `--accent` 색 배경 + 흰 텍스트
- 보조: `.btn.secondary` 또는 outlined
- 작은 버튼: `.btn.sm`
- **모바일 터치 영역 최소 44×44px** 보장 (Apple HIG)
- 한 화면에 강조 CTA는 **1개**만 — 산만함 방지

## 진행 UI (퀴즈)

- 상단 progress bar (퀴즈 진행 %)
- 문항당 한 페이지 — 다음 클릭이 아니라 옵션 클릭 → 자동 진행
- 진행 중에는 헤더/하단 네비 노출 정도 검토 (현재 가벼운 헤더만)

## 진행 후 결과

- 결과 hero: 큰 이미지 + 제목 + tagline
- 본문 (300~500자 권장)
- 공유 카드 영역 (Kakao/페북/트위터/링크 복사)
- 관련 테스트 추천 (related)
- "다시 하기" 또는 "다른 테스트 보기" CTA

## 모바일 우선 원칙

- 기본 스타일은 작은 폭 기준
- 미디어 쿼리는 큰 쪽으로 확장 (`min-width`)
- 데스크톱에서도 콘텐츠 폭은 cap (`--max: 1088px`, `--quiz-col: 520px`)

## 여백 / 스페이싱

코드에 토큰화되어 있지는 않음. 권장 패턴:

| 용도 | 권장 값 |
|---|---|
| 컴포넌트 내부 패딩 | 12 / 16 / 20 / 24px |
| 섹션 간 마진 | 32 / 48px |
| 페이지 좌우 여백 | 16 (모바일) / 24~32 (큰 화면) |
| 카드 간 gap | 12 / 16px |

## 색 사용 가이드

- 본문: `var(--text)` — `#333333`
- 보조 텍스트 (메타, 캡션): `var(--muted)` — `#666666`
- 강조: `var(--accent)` — `#5a67f2`
- 카테고리 강조: `--ctr-{love,mind,social,style,fun}-{a,b}` 그라데이션

자세한 건 [color-system.md](./color-system.md).

## 접근성 체크리스트

- [ ] 텍스트 vs 배경 대비 WCAG AA 이상 (4.5:1)
- [ ] 의미 있는 이미지에 `alt`
- [ ] 장식 이미지는 `alt=""` 명시
- [ ] 키보드만으로 모든 인터랙티브 요소 접근 가능
- [ ] `:focus-visible` 스타일 유지
- [ ] `prefers-reduced-motion: reduce` 시 큰 애니메이션 축소

## 모션

- 트랜지션: 150~250ms, `ease-out`
- 큰 자동 재생 애니메이션 ❌
- 카드 hover lift: `translateY(-2px)` + 그림자 강화
- 모달 fade/slide: 짧게 (180~220ms)

## 새 UI 추가 시 원칙

1. **기존 CSS 변수와 컴포넌트 패턴 먼저 재사용**
2. 새로운 색·라운드·그림자 추가는 최소화
3. 카드형 UI 중심 (페이지를 카드 묶음으로 인지)
4. 컴포넌트 단위 분리 (`src/components/ko/` 추가)
5. `npm run build` 통과 + 모바일 폭 (390px)에서 시각 확인

## 안 좋은 예시

- 한 페이지에 강조 CTA 3개 이상 → 어느 게 주인지 모름
- 보라색 외에 새 강조색 추가 (e.g. 시안, 라임) → 톤 깨짐
- 너무 작은 텍스트 (12px 미만) → 모바일 가독성 저하
- 카드 라운드 0px → 모모픽 톤과 안 어울림
