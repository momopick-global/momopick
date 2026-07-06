# 심층 테스트(연애·썸 테마) 콘텐츠 (제작 진행 문서)

> **상단 메뉴는 테마가 아니라 문제 형식 기준으로 재편됨** — 심층(다문항 4지선다) · 원픽(1문항 4지선다) · 성향(A/B). 이 문서는 그중 **심층 테스트 메뉴(`/ko/love/`)** 에 실리는 퀴즈의 기획·결과·이미지 프롬프트를 채워가는 작업 문서다.
> **연애·썸은 이제 카테고리가 아니라 태그**(`연애`·`썸` 등, `src/lib/content/koTagRegistry.ts`)로 분류된다. 심층 메뉴에서 태그를 누르면 해당 태그가 달린 퀴즈 목록이 노출된다. 아래 퀴즈들은 연애·썸 태그 심층 테스트다.
> 형식·구현 규칙: 스낵형 [../features/snack-tests.md](../features/snack-tests.md) · 퍼센티지형 [../features/love-tests.md](../features/love-tests.md).
> 작성 규격: [quiz-writing-guide.md](./quiz-writing-guide.md) · 결과 글: [result-writing-guide.md](./result-writing-guide.md) · 톤: [content-tone.md](./content-tone.md).
> 원픽은 별도 문서: [onepick-quiz-content.md](./onepick-quiz-content.md). 성향은 [personality-quiz-content.md](./personality-quiz-content.md).

## 결과 설계 기준

- 상황은 **연애·썸·관계 맥락**으로 준다. "썸 상대가 며칠째 연락이 뜸해요" 처럼 사용자가 자신을 바로 떠올릴 수 있는 장면.
- 결과는 **재미 + 자기이해**용. 진단·예언("이별이 머지 않았습니다")·단정("당신은 반드시") 금지, 면책 1줄 필수.
- 결과가 사용자를 깎아내리지 않는다. "을형/유리멘탈" 같은 라벨도 매력·장점을 함께 짚는다.

### 두 가지 형식

| 형식 | 결과 | 문항 | 컴포넌트 | 소스 매핑 |
|---|---|---|---|---|
| 스낵형 | A/B/C/D 키 분기(+동률 `blend`) | 8 | `SnackQuiz` | `src/content/quiz/index.ts` |
| 퍼센티지형 | 0~100% 단일 값(구간 등급) | 8 | `PercentageQuiz` | `jsonSource.ts`의 `koPercentageByKey` |

## 공통 이미지 프롬프트 (썸·연애 적용)

썸·연애 이미지는 **① 제목(썸네일) 이미지**와 **② 결과 이미지** 두 종류. 공통 규격은 아래를 공유한다.

- 공통 규격: **1:1 정사각형(square)** — 커버·결과가 `aspect-ratio: 1/1`로 표시되므로 정사각형이 아니면 잘림. (예: `thumb.webp` 1024×1024)
- 공통 그림체: 부드러운 한국 웹툰풍 일러스트, 핑크 퍼플 계열 무드.

> ⚠️ AI 이미지 생성기는 한글을 정확히 못 그리는 경우가 많다. 최종 문구는 디자인 툴로 오버레이하는 방식을 병행 권장.

### ① 제목 이미지 프롬프트

용도: 목록 썸네일·퀴즈 상단 커버. 원픽과 달리 **보기 번호는 넣지 않고**, 제목과 무드 중심.

- KO suffix: `포스터형 썸네일. 상단: 작은 영문 라벨 "LOVE TEST", 중앙: 테스트 제목, 하단: 한 줄 설명. 연애·썸 무드를 담은 상징 장면, 부드러운 한국 웹툰풍 일러스트·핑크 퍼플 무드, 1:1 정사각형 비율.`
- EN suffix: `poster-style thumbnail. Top: a small English label "LOVE TEST"; center: the quiz title; bottom: a one-line description. A symbolic romantic/crush-mood scene, soft Korean webtoon illustration, pink-purple ambiance; square 1:1 aspect ratio.`

### ② 결과 이미지 프롬프트

용도: 결과 화면 상단. 해당 결과 **하나**를 상징하는 단일 장면 + 태그라인/핵심 한두 줄 오버레이.

- KO suffix: `해당 결과 하나의 감정·무드를 담은 단일 상징 장면 위에, 그 결과의 태그라인과 핵심 내용을 압축한 한두 줄을 얹음, 부드러운 한국 웹툰풍 일러스트·핑크 퍼플 팔레트, 1:1 정사각형 비율.`
- EN suffix: `a single symbolic scene expressing this one result's mood, with the result's tagline as a headline and one or two condensed lines overlaid; soft Korean webtoon illustration, pink-purple palette; square 1:1 aspect ratio.`

## 진행 현황

> 상태: `설계도`(유형만) → `본문 작성`(결과 텍스트) → `프롬프트`(이미지 프롬프트) → `구현`(JSON+라우트).

### 스낵형 (A/B/C/D)

| # | 제목 | 슬러그 | 결과 축 | 상태 |
|---|---|---|---|---|
| ✅ | 나를 좋아하는 사람은 어떤 타입? | `who-likes-you-type` | 좋아하는 사람 유형 4분기 | 구현 완료 |
| ✅ | 남자가 나에게 식는 순간 | `when-men-lose-interest` | 식는 트리거 4분기 | 구현 완료 |
| ✅ | 나는 왜 먼저 연락을 못할까? | `why-cant-you-text-first` | 주저 원인 4분기 | 구현 완료 |
| ✅ | 나는 연애 고수일까 연애 초보일까? | `dating-expert-or-beginner` | 연애 숙련도 4분기 | 구현 완료 |
| ✅ | 내가 연애를 망치는 한 가지 습관 | `love-pattern-destroying-habit` | 자기파괴 습관 4분기 | 구현 완료 |
| ✅ | 썸이 항상 애매하게 끝나는 이유 | `ambiguous-situationship-end` | 썸 종료 패턴 4분기 | 구현 완료 |
| ✅ | 나는 사람을 잘 믿는 편일까? | `trust-level-test` | 신뢰 성향 4분기 | 구현 완료 |

### 퍼센티지형 (0~100%)

| # | 제목 | 슬러그 | 측정값 | 상태 |
|---|---|---|---|---|
| ✅ | 나의 고백 성공 확률은? | `confession-success-rate` | 고백 성공률 % | 구현 완료 |
| ✅ | 나는 어떤 연애 온도일까? | `love-temperature-test` | 연애 온도 % | 구현 완료 |
| ✅ | 연애 중 나는 갑 vs 을? | `relationship-balance-test` | 관계 주도권 % | 구현 완료 |

> 참고: `logical-or-emotional`·`planner-or-spontaneous`·`self-esteem-level`·`mental-strength-test`·`emotional-sensitivity` 등 성격·심리에 가까운 퀴즈는 **성향 문서로 이관 검토** 대상. → [personality-quiz-content.md](./personality-quiz-content.md)

### 신규 후보 (아이디어)

| 제목(안) | 슬러그(안) | 형식 | 결과 축 | 상태 |
|---|---|---|---|---|
| 나의 이별 극복 스타일은? | `breakup-recovery-style` | 스낵 | 회복 방식 4분기 | 설계도 |
| 나는 어떤 데이트를 좋아할까? | `ideal-date-type` | 스낵 | 데이트 취향 4분기 | 설계도 |
| 우리 썸, 지금 몇 %? | `situationship-progress` | 퍼센티지 | 썸 진전도 % | 설계도 |
| 나의 질투 지수는? | `jealousy-level` | 퍼센티지 | 질투 강도 % | 설계도 |

---

## 새 퀴즈 작성 템플릿 (복붙용)

아래 블록을 복사해 신규 퀴즈 한 개 분량으로 채운다.

### 기본 정보

- 슬러그: `<english-kebab>`
- 형식: 스낵형 / 퍼센티지형
- 제목: 
- 부제(subtitle): 
- 설명(meta description, 150자 내): 
- 태그: 연애 / 썸 / 감정 / …
- 문항 수: 8
- 결과: A/B/C/D (+ blend) 또는 0~25 / 26~50 / 51~75 / 76~100

### 문항 8개 (prompt + 보기 4)

1. 상황 문장 → A/B/C/D 반응
2. …
(각 보기는 한 줄, 회피형 "잘 모르겠다" 지양)

### 결과 (스낵형 A/B/C/D 예시)

**A — <제목 2~5자> <이모지>**
- tagline: 한 줄 요약
- body(400~500자): ① 성향 묘사 → ② 장점·매력 → ③ 주의점 → ④ 가벼운 조언
- share.title / share.description

(B·C·D 동일, + blend 동률 fallback)

### 면책 문구(footnote)

- 예: "재미로 보는 테스트예요. 결과는 가볍게 참고해 주세요 :)"

### 발행 체크

- [ ] JSON 작성 (`src/schemas/quiz.schema.json` 준수)
- [ ] `content/quiz/index.ts` import+export
- [ ] `jsonSource.ts` 매핑 (퍼센티지형은 `koPercentageByKey`)
- [ ] `app/ko/love/<slug>/page.tsx` 생성
- [ ] 이미지 `public/images/quiz/<slug>/ko/`
- [ ] `node tools/check-quiz-images.mjs`
- [ ] `public/sitemap.xml`
- [ ] `npm run build`
