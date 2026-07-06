# 성향 테스트 콘텐츠 (제작 진행 문서)

> 성향(성격·심리·소셜) 카테고리 개별 퀴즈의 기획·결과·이미지 프롬프트를 채워가는 작업 문서.
> 주제 시리즈 기획: [personality-test-series-plan.md](./personality-test-series-plan.md).
> 형식·구현 규칙: 스낵형 [../features/snack-tests.md](../features/snack-tests.md) · 퍼센티지형 [../features/love-tests.md](../features/love-tests.md).
> 작성 규격: [quiz-writing-guide.md](./quiz-writing-guide.md) · 결과 글: [result-writing-guide.md](./result-writing-guide.md) · 톤: [content-tone.md](./content-tone.md).
> 썸·연애는 별도 문서: [love-quiz-content.md](./love-quiz-content.md). 원픽은 [onepick-quiz-content.md](./onepick-quiz-content.md).

## 결과 설계 기준

- 상황은 **연애 밖**에서 준다. 일상·일·모임·혼자 있을 때 반응으로 자신을 비추게 한다. (연애 상황은 썸·연애 문서로.)
- 결과 4타입은 **우열 없는 병렬 구도**. 누가 나쁜 타입이 되지 않게, 각 타입의 강점을 반드시 짚는다.
- 실제 심리 개념에서 착안하되 **검증된 진단이 아니라 공감되는 해석 + 참고용**. 단정·진단·예언 금지, 면책 1줄 필수.

## 카테고리 배치 (미확정 — 진행 전 결정)

- **A안:** love 하위 유지(`/ko/love/<slug>/`), 허브에서 큐레이션만 → 즉시 가능, URL은 "love"라 주제와 어긋남.
- **B안:** `/ko/personality/` 정식 오픈 (`KO_PRIMARY_NAV`의 `personality`를 `live: true`, `category: "personality"` 신설) → 정합성↑, 라우트·매핑 추가 작업.
- 권장: Phase 1은 A안으로 빠르게 발행 → 8종 이상 쌓이면 B안 승격. (기획안 §5)

## 공통 이미지 프롬프트 (성향 적용)

- 공통 규격: **1:1 정사각형** — 커버·결과가 `aspect-ratio: 1/1`로 표시. (`thumb.webp` 1024×1024)
- 공통 그림체: 부드러운 한국 웹툰풍 일러스트, 핑크 퍼플 계열 무드. (성향은 love보다 차분·중성 톤 허용)

> ⚠️ AI 이미지 생성기는 한글을 정확히 못 그리므로 최종 문구는 디자인 툴 오버레이 병행 권장.

### ① 제목 이미지 프롬프트

- KO suffix: `포스터형 썸네일. 상단: 작은 영문 라벨 "PERSONALITY TEST", 중앙: 테스트 제목, 하단: 한 줄 설명. 성격·심리를 상징하는 차분한 장면, 부드러운 한국 웹툰풍 일러스트·핑크 퍼플 무드, 1:1 정사각형 비율.`
- EN suffix: `poster-style thumbnail. Top: a small English label "PERSONALITY TEST"; center: the quiz title; bottom: a one-line description. A calm scene symbolizing personality/psychology, soft Korean webtoon illustration, pink-purple ambiance; square 1:1 aspect ratio.`

### ② 결과 이미지 프롬프트

- KO suffix: `해당 결과 하나의 성향·무드를 담은 단일 상징 장면 위에, 그 결과의 태그라인과 핵심 내용을 압축한 한두 줄을 얹음, 부드러운 한국 웹툰풍 일러스트·핑크 퍼플 팔레트, 1:1 정사각형 비율.`
- EN suffix: `a single symbolic scene expressing this one result type's mood, with the result's tagline as a headline and one or two condensed lines overlaid; soft Korean webtoon illustration, pink-purple palette; square 1:1 aspect ratio.`

## 진행 현황

> 상태: `설계도`(유형만) → `본문 작성`(결과 텍스트) → `프롬프트`(이미지 프롬프트) → `구현`(JSON+라우트).

### 이미 있는 성향형 (love 카테고리에 존재 — 이관/큐레이션 대상)

| 제목 | 슬러그 | 형식 | 상태 |
|---|---|---|---|
| 나의 성격·심리 분석은? | `personality-psychology-test` | 스낵(5문항) | 구현 완료 (성향 대표) |
| 나는 혼자 있을 때 어떤 사람? | `true-self-alone` | 스낵 | 구현 완료 |
| 나는 멘탈 강자일까 유리멘탈일까? | `mental-strength-test` | 스낵 | 구현 완료 |
| 나는 왜 예민할까? | `emotional-sensitivity` | 스낵 | 구현 완료 |
| 나는 리더형인가 조력자형인가? | `leader-or-supporter` | 스낵 | 구현 완료 |
| 화났을 때 나는? | `anger-style-test` | 스낵 | 구현 완료 |
| 나의 숨겨진 다크사이드 | `hidden-dark-side` | 스낵 | 구현 완료 |
| 나는 이성적일까 감성적일까? | `logical-or-emotional` | 퍼센티지 | 구현 완료 |
| 나는 계획형인가 즉흥형인가? | `planner-or-spontaneous` | 퍼센티지 | 구현 완료 |
| 나의 자존감 레벨은? | `self-esteem-level` | 퍼센티지 | 구현 완료 |

### 신규 시리즈 12종 (기획안 §3)

**그룹 1 — 성격 원형**

| # | 제목 | 슬러그 | 결과 4타입 | Phase | 상태 |
|---|---|---|---|---|---|
| 1 | 나는 어떤 사고방식일까? | `thinking-style-type` | 분석 / 직관 / 공감 / 실행 | 1 | 설계도 |
| 2 | 내 에너지는 어디서 충전될까? | `energy-source-test` | 혼자 / 소수친밀 / 사교 / 상황적응 | 2 | 설계도 |
| 3 | 나는 어떻게 결정하는 사람일까? | `decision-making-style` | 직관결정 / 신중검토 / 조언의존 / 미루기 | 2 | 설계도 |
| 4 | 내 안의 어린아이는 어떤 모습? | `inner-child-type` | 호기심 / 눈치 / 모범생 / 자유 | 3 | 설계도 |

**그룹 2 — 심리 반응**

| # | 제목 | 슬러그 | 결과 4타입 | Phase | 상태 |
|---|---|---|---|---|---|
| 5 | 스트레스 받으면 나는? | `stress-coping-type` | 폭발 / 잠수 / 해결 / 회피 | 1 | 설계도 |
| 6 | 나는 생각이 많은 편일까? | `overthinking-level` | 즉흥 / 균형 / 과몰입 / 무한루프 | 1 | 설계도 |
| 7 | 나는 안정형일까 도전형일까? | `comfort-zone-test` | 안정 / 신중도전 / 모험 / 즉흥 | 3 | 설계도 |
| 8 | 내 감정 표현 방식은? | `emotion-expression-type` | 직설 / 은근 / 삭임 / 행동 | 3 | 설계도 |

**그룹 3 — 관계·사회 성향**

| # | 제목 | 슬러그 | 결과 4타입 | Phase | 상태 |
|---|---|---|---|---|---|
| 9 | 내 소셜 배터리 용량은? | `social-battery-type` | 절전 / 알뜰 / 넉넉 / 무제한 | 1 | 설계도 |
| 10 | 갈등 상황에서 나는? | `conflict-style-test` | 정면 / 중재 / 회피 / 관망 | 2 | 설계도 |
| 11 | 남들이 보는 첫인상은? | `first-impression-type` | 다가가기쉬움 / 신비 / 든든 / 반전 | 2 | 설계도 |
| 12 | 모임에서 내 포지션은? | `group-role-test` | 분위기메이커 / 기획자 / 리스너 / 관찰자 | 3 | 설계도 |

---

## 1. 나는 어떤 사고방식일까? — `thinking-style-type` (Phase 1 대표, 작성 예시)

- 착안: 인지 스타일(분석 vs 직관) + 정보처리 성향
- 형식: 스낵형 8문항, 결과 4타입(+동률 blend)

### 기본 정보

- 슬러그: `thinking-style-type`
- 제목: 나는 어떤 사고방식일까?
- 부제: 무언가를 마주했을 때 내 머릿속이 움직이는 방식
- 설명(meta): 일상 속 반응으로 알아보는 내 사고 스타일 — 분석형·직관형·공감형·실행형 중 나는?
- 태그: 성격 / 사고 / 분석 / 자기이해
- 문항 수: 8
- 결과: A 분석형 / B 직관형 / C 공감형 / D 실행형 (+ blend 혼합형)

### 결과 유형 스케치

- **A 분석형 🔍** — 먼저 해석하고 구조를 파악. 오해를 줄이지만 과해석 주의.
- **B 직관형 ✨** — 느낌으로 빠르게 판단. 순발력↑, 근거 확인 필요.
- **C 공감형 💛** — 사람·감정을 먼저 읽음. 관계 강점, 자기소진 주의.
- **D 실행형 ⚡** — 일단 해보며 배움. 추진력↑, 되돌아보기 필요.
- **blend 혼합형 🌈** — 상황 따라 여러 방식을 오감. 균형형.

### 문항 8개 (초안 방향)

일·모임·문제상황·계획·실수했을 때 등 **연애 밖 8장면**에서 A/B/C/D 반응을 고르게 한다. (본문 작성 단계에서 채움)

### 면책 문구(footnote)

- "재미로 보는 사고 스타일 테스트예요. 결과는 가볍게 참고해 주세요 :)"

### 발행 체크

- [ ] JSON 작성 · [ ] index.ts · [ ] jsonSource.ts · [ ] page.tsx · [ ] 이미지 5장(썸네일+결과4) · [ ] check-quiz-images · [ ] sitemap · [ ] build

---

## 새 퀴즈 작성 템플릿 (복붙용)

### 기본 정보
- 슬러그: `<english-kebab>` / 형식: 스낵·퍼센티지 / 제목 / 부제 / 설명(150자) / 태그 / 문항 8 / 결과 4타입(+blend)

### 문항 8개
- 연애 밖 상황 → A/B/C/D 반응 (한 줄, 회피 선택지 지양)

### 결과 A/B/C/D (+blend)
- 제목 2~5자 + 이모지 / tagline / body 400~500자(성향 묘사→강점→주의점→조언) / share.title·description

### 면책 + 발행 체크 (위 예시와 동일)
