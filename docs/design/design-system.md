# Design System — 모모픽 (원페이지 종합 오버뷰)

> 흩어진 디자인 문서(컬러·타이포·UI·레이아웃·이미지)를 한 장으로 요약한 빠른 참조.
> 자세한 규칙·근거는 각 절 끝의 링크 문서를 따른다. 토큰 정의 위치: `src/app/ko/ko-home.css`의 `:root`.

---

## 1. 브랜드 한 줄

**귀엽고 가벼운 1~3분 스낵 심리 테스트.** 진단이 아니라 "재미 + 자기이해 + 공감". 모바일(390px) 우선, 결과 카드가 SNS에서 매력적으로 보이는 게 핵심.

- 톤: 부드럽고 밝음 · "그럴 수 있어" · 신비주의/점집 분위기 금지
- 상세: [design-overview.md](./design-overview.md)

---

## 2. 컬러 토큰

| 토큰 | 값 | 용도 |
|---|---|---|
| `--bg` | `#f4f2fb` | 페이지 배경 (옅은 라벤더) |
| `--surface` | `#fff` | 카드·패널 |
| `--text` | `#333333` | 본문 |
| `--muted` | `#666666` | 보조·메타·캡션 |
| `--line` | `rgba(90,103,242,.14)` | 보더·구분선 |
| `--accent` | `#5a67f2` | CTA·강조 (보라) |
| `--accent-2` | `#e85a8c` | 보조 강조 (핑크) · accent와 브랜드 그라데이션 |

**카테고리 2색 그라데이션** — `linear-gradient(135deg, var(--ctr-{cat}-a), var(--ctr-{cat}-b))`

| 카테고리 | A | B |
|---|---|---|
| love (연애·심층) | `#ff3d8c` | `#8b1458` |
| mind (심리) | `#2563eb` | `#6d28d9` |
| social (소셜) | `#0f2744` | `#14b8a6` |
| style (스타일) | `#e8dcc8` | `#0f0f0f` |
| fun (재미) | `#dc2626` | `#facc15` |

상세: [color-system.md](./color-system.md)

---

## 3. 타이포그래피

시스템 폰트 스택 (웹폰트 미사용): `-apple-system, "Apple SD Gothic Neo", "Noto Sans KR", "Segoe UI", Roboto, sans-serif`

| 용도 | 크기 | 굵기 |
|---|---|---|
| H1 페이지 타이틀 | 22~28px | 700 |
| H2 섹션 타이틀 | 18~22px | 700 |
| 카드 제목 | 16~17px | 600~700 |
| 본문 | 15~16px | 400 |
| 메타·캡션 | 12~13px | 400 (`--muted`) |
| 버튼 | 14~15px | 600 |
| 결과 hero 타이틀 | 24~32px | 800 |

- 줄간격: 본문 1.55~1.65 / 제목 1.2~1.35
- 자간: 큰 타이틀 `-0.01~-0.02em`
- 한글: `word-break: keep-all` + `overflow-wrap: anywhere`
- 상세: [typography.md](./typography.md)

---

## 4. 라운드 · 그림자 · 간격

| 항목 | 토큰/값 |
|---|---|
| 큰 카드 라운드 | `--radius: 20px` |
| 작은 chip/버튼 | `--radius-sm: 14px` |
| 기본 그림자 | `--shadow: 0 8px 32px rgba(45,30,80,.08)` |
| hover 그림자 | `--shadow-hover: 0 14px 40px rgba(45,30,80,.12)` |
| 컴포넌트 내부 패딩 | 12 / 16 / 20 / 24px |
| 섹션 간 마진 | 32 / 48px |
| 카드 간 gap | 12 / 16px |
| 페이지 좌우 여백 | 16(모바일) → 20/24/28/32(큰 화면) |

---

## 5. 레이아웃 · 반응형

기준 폭 **390px**(iPhone 12/13). 모바일 우선 → `min-width`로 확장.

| 레이아웃 토큰 | 값 |
|---|---|
| `--max` | 1088px (그리드 컨테이너 최대 폭) |
| `--quiz-col` | 520px (퀴즈 컬럼, 데스크톱도 모바일 외형 유지) |
| `--ko-header-h` | 61px (sticky offset 기준) |
| 텍스트 본문 폭 | `min(720px, 100%)` |

| 브레이크포인트 | 적용 |
|---|---|
| 기본(모바일) | 1열, gutter 16px |
| 480px | gutter 20px |
| 640px | gutter 24px, 2열 |
| 900px | gutter 28px, 3열 |
| 1200px | gutter 32px |

상세: [layout-mobile.md](./layout-mobile.md)

---

## 6. 컴포넌트 규칙

- **카드**: `--surface` 배경 + `--radius` + `--shadow`. 카테고리 강조는 그라데이션 보더/배경.
- **CTA 버튼**: 주 CTA `.btn.primary` = `--accent` 배경 + 흰 텍스트. 보조는 outlined. **한 화면에 강조 CTA 1개.**
- **터치 영역**: 모바일 최소 **44×44px** (Apple HIG).
- **퀴즈 진행**: 상단 progress bar, 문항당 1페이지, 옵션 클릭 → 자동 진행.
- **결과 화면(보상)**: 큰 이미지 + 제목 + tagline → 본문(300~500자) → 공유 카드 → 관련 추천 → 다시하기 CTA.
- 상세: [ui-guidelines.md](./ui-guidelines.md)

---

## 7. 이미지

- 규격: 1:1 또는 4:5, WebP, 800×800↑. 파일명 `thumb.webp`·`result-N.webp`·`og.jpg`(영문 소문자·하이픈).
- 스타일: 귀엽고 개성 강한 캐릭터, **얼굴 클로즈업(화면 62~78%)**, 과장된 표정, 퀴즈별 다양한 색(보라 일변도 지양).
- 텍스트: 이미지 안에 제목·부제·결과명을 굵은 한글로 렌더(GPT 등 한글 렌더 기준, 왜곡 시 재생성).
- 상세: [image-guidelines.md](./image-guidelines.md) · 퀴즈 프롬프트: [../quiz-image-prompts.md](../quiz-image-prompts.md) · 캐릭터: [../character-profile-prompts.md](../character-profile-prompts.md)

---

## 8. Do / Don't

**지향** ✅ "그럴 수 있어" 톤 · 표정 풍부한 친근 캐릭터 · 카드형 1정보 집중 · 큰 터치 영역 · 부드러운 그림자+라운드

**금지** ❌ 점집/신비주의/공포 톤 · "반드시 헤어집니다" 류 단정·예언 · 의학적 진단 표현 · 사용자 깎아내리는 결과 · 피·다크판타지 · 자동재생 큰 사운드

---

## 관련 문서

[design-overview.md](./design-overview.md) · [color-system.md](./color-system.md) · [typography.md](./typography.md) · [ui-guidelines.md](./ui-guidelines.md) · [layout-mobile.md](./layout-mobile.md) · [image-guidelines.md](./image-guidelines.md) · [asset-paths.md](./asset-paths.md)
