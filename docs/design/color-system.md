# Color System — 모모픽

> 토큰 정의 위치: `src/app/ko/ko-home.css`의 `:root`. 새 색 추가는 최소화하고 기존 토큰 재사용 우선.

## 기본 토큰

| 토큰 | 값 | 용도 |
|---|---|---|
| `--bg` | `#f4f2fb` | 페이지 배경 (옅은 라벤더) |
| `--surface` | `#fff` | 카드·패널 배경 |
| `--text` | `#333333` | 본문 텍스트 |
| `--muted` | `#666666` | 보조/메타 텍스트 |
| `--line` | `rgba(90, 103, 242, 0.14)` | 보더·구분선 |
| `--accent` | `#5a67f2` | CTA·강조 (보라) |

## 카테고리 그라데이션

각 카테고리별로 2색 그라데이션 토큰:

| 카테고리 | A (시작) | B (끝) | 용도 |
|---|---|---|---|
| love (연애) | `--ctr-love-a: #ff3d8c` | `--ctr-love-b: #8b1458` | 연애 테스트 카드/배너 |
| mind (심리) | `--ctr-mind-a: #2563eb` | `--ctr-mind-b: #6d28d9` | 심리·MBTI |
| social (소셜) | `--ctr-social-a: #0f2744` | `--ctr-social-b: #14b8a6` | 관계·소셜 |
| style (스타일) | `--ctr-style-a: #e8dcc8` | `--ctr-style-b: #0f0f0f` | 패션·취향 |
| fun (재미) | `--ctr-fun-a: #dc2626` | `--ctr-fun-b: #facc15` | 가벼운 재미 |

사용 예시:
```css
background: linear-gradient(135deg, var(--ctr-love-a), var(--ctr-love-b));
```

## 그림자

| 토큰 | 값 | 용도 |
|---|---|---|
| `--shadow` | `0 8px 32px rgba(45, 30, 80, 0.08)` | 기본 카드 |
| `--shadow-hover` | `0 14px 40px rgba(45, 30, 80, 0.12)` | hover 강조 |

## 라운드

| 토큰 | 값 | 용도 |
|---|---|---|
| `--radius` | `20px` | 큰 카드/패널 |
| `--radius-sm` | `14px` | 작은 chip / 버튼 |

## 레이아웃 토큰

| 토큰 | 값 | 용도 |
|---|---|---|
| `--max` | `1088px` | 최대 콘텐츠 폭 |
| `--quiz-col` | `520px` | 퀴즈 페이지 컬럼 폭 (모바일 외형 cap) |
| `--layout-gutter` | `16px` 기본 → `20/24/28/32px` 큰 화면 | 페이지 좌우 여백 |
| `--ko-header-h` | `61px` | 헤더 높이 (sticky offset 기준) |

## 컬러 사용 매트릭스

| 상황 | 권장 |
|---|---|
| 메인 CTA 버튼 | `--accent` 배경 + 흰 텍스트 |
| 보조 버튼 | `--surface` + `--text` + `--accent` 보더 |
| 카드 배경 | `--surface` |
| 페이지 배경 | `--bg` |
| 본문 | `--text` |
| 메타/날짜/캡션 | `--muted` |
| 구분선 | `--line` |
| 카테고리 배너 | 해당 카테고리 그라데이션 |

## 다크 모드

현재 미지원. `prefers-color-scheme: dark` 미디어 쿼리 없음. 향후 도입 시 위 토큰의 다크 매핑을 `:root[data-theme="dark"]` 또는 `@media (prefers-color-scheme: dark)` 블록에 추가.

## WCAG 대비 점검 (운영 색)

| 조합 | 비율 | 평가 |
|---|---|---|
| `#333` on `#f4f2fb` | ~10.5:1 | AAA ✅ |
| `#666` on `#f4f2fb` | ~5.3:1 | AA ✅ |
| White on `#5a67f2` | ~5.0:1 | AA ✅ |
| `#5a67f2` on `#f4f2fb` | ~4.5:1 | AA 경계 |

작은 텍스트 / 굵지 않은 텍스트는 AA 4.5:1 이상 권장. 위 비율은 근사치.

## 새 색 추가 시

1. 정말 필요한지 검토 (기존 토큰으로 안 되는지)
2. 카테고리 색이라면 `--ctr-<name>-a/b` 패턴 따르기
3. `ko-home.css`의 `:root`에 추가
4. 자세히 설명한 주석 (어떤 컴포넌트에서 쓸지)
5. 다크 모드 도입 시점에 매핑 같이 추가

## ESLint·Stylelint

- 코드에 하드코딩된 색 (`#ff5b8a` 등) 발견 시 토큰화 검토. 단, 정말 1회성이면 그대로 둠.
