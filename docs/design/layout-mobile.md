# Mobile-First Layout — 모모픽

## 기본 원칙

- 모바일 트래픽 절대 다수
- 기본 스타일 = 작은 폭 (`sm`, 0-479px)
- 큰 화면은 미디어 쿼리로 **확장** (1열 → 2열 → 3열, 여백 증가)
- 데스크톱에서도 콘텐츠 폭은 cap (`--max: 1088px`)

## 주요 확인 폭

| 폭 | 디바이스 |
|---|---|
| **360px** | 작은 안드로이드 (예: Galaxy S 작은 폭) |
| **390px** | iPhone 12/13 기본 (현재 디자인 기준 폭) |
| **430px** | iPhone Pro Max |
| 768px | iPad mini portrait |
| 1280px | 데스크톱 표준 |

## 브레이크포인트 (현재 운영)

`ko-home.css`에서 직접 사용:

| `min-width` | 적용 |
|---|---|
| 기본 (모바일) | 1열, gutter 16px |
| 480px | gutter 20px |
| 640px | gutter 24px, 2열 그리드 일부 |
| 900px | gutter 28px, 3열 그리드 |
| 1200px | gutter 32px |

## 헤더 / sticky offset

- `KoSiteHeader`: 화면 상단 sticky, 높이 `--ko-header-h: 61px`
- sticky 요소 (`top: var(--ko-header-h)`)에서 이 변수 활용
- 모바일 하단 `KoBottomNav` 존재 → 페이지 본문 끝에 `padding-bottom: 80px` 정도 필요한 경우 있음

## 콘텐츠 폭 cap

| 콘텐츠 | 권장 max-width |
|---|---|
| 텍스트 본문 (블로그·정책) | `min(720px, 100%)` — 가독성 줄 길이 |
| 퀴즈 컬럼 | `var(--quiz-col)` = 520px — 모바일 외형 그대로 데스크톱 중앙 |
| 그리드 컨테이너 | `var(--max)` = 1088px |

## 카드 그리드

| 폭 | 열 |
|---|---|
| ~640 | 1열 (썸네일 큰 가로 카드) |
| 640~899 | 2열 |
| 900+ | 3열 |

## 하단 버튼 / 공유 버튼

- 모바일 엄지로 닿는 영역: 화면 하단 1/3
- 결과 페이지의 공유 버튼은 본문 끝 / sticky 검토
- 터치 영역 최소 44×44pt

## 인앱 브라우저 폭 차이

| 브라우저 | 특이사항 |
|---|---|
| 카카오톡 안드로이드 | 하단 메뉴바로 viewport 짧아짐 |
| 카카오톡 iOS | URL bar 영향 |
| 인스타그램 | 상단 채널 헤더로 viewport 짧음 |

→ 100vh 의존 X. `min-height: 100dvh` (동적 뷰포트) 또는 콘텐츠 자체 길이 기반.

## 가로 스크롤 방지

- `body { overflow-x: hidden }` 또는
- 모든 컴포넌트가 `max-width: 100%`
- 절대 위치 요소는 부모 안에 머무르게

## 이미지 반응형

```html
<img
  src="/images/quiz/<slug>/ko/result-1.webp"
  alt=""
  width="480"
  height="600"
  loading="lazy"
  decoding="async"
  style={{ maxWidth: '100%', height: 'auto' }}
/>
```

`width`/`height` 속성으로 CLS (Cumulative Layout Shift) 방지.

## viewport 메타

`metadata`의 `viewport`는 Next.js가 기본값 `width=device-width, initial-scale=1` 사용. 명시적 설정 불필요.

## Safe Area (iOS)

- 헤더가 status bar에 가리면 `env(safe-area-inset-top)` padding
- 하단 BottomNav에 `env(safe-area-inset-bottom)`

## 카카오톡 인앱 브라우저에서 깨짐 대응

- `InAppBrowserGuide` 모달이 외부 브라우저 권유
- 그래도 인앱에서 봐도 깨지지 않게:
  - 큰 폰트 / 줄간격 충분
  - 카드 간 여백 넉넉히
  - 가로 스크롤 절대 금지

## 디버그 / 확인 방법

- Chrome DevTools → Device toolbar → iPhone 12/13 (390×844)
- 실기기에서 직접 카카오톡으로 링크 보내 확인
- Cloudflare Pages preview deploy로 PR마다 미리보기
