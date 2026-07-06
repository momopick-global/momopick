# 성향 테스트 시리즈 기획안

> 목적: `/ko/personality-test/` 허브를 love 퀴즈를 빌려 채우는 상태에서 벗어나, **성향(성격·심리) 고유 콘텐츠**로 채우기 위한 주제 시리즈.
> 작성 기준: `docs/content/quiz-writing-guide.md`(스낵형 A/B/C/D, 8문항) · `docs/content/content-tone.md`(재미+자기이해, 단정·진단 금지).

---

## 1. 현재 상태 진단

- 성향 허브(`/ko/personality-test/`)는 라이브지만, 실제 성향 고유 퀴즈는 `personality-psychology-test` **1개**뿐(그마저 5문항).
- 나머지 자리는 love 퀴즈(`true-self-alone`, `mental-strength-test`, `emotional-sensitivity`)를 빌려 채우는 중.
- 기존 31개 퀴즈는 전부 `category: "love"`. 성향에 가까운 것들(`logical-or-emotional`, `planner-or-spontaneous`, `self-esteem-level`, `leader-or-supporter`, `trust-level-test`, `hidden-dark-side`, `anger-style-test`)이 이미 있으므로 **주제 중복을 피하는 게 1순위**.

## 2. 시리즈 설계 원칙

- **연애 밖 상황**을 쓴다. 성향형은 "썸 상대가 연락이 뜸해요" 대신 *일상·일·관계·혼자 있을 때* 반응으로 자신을 비추게 한다.
- **결과 4타입은 우열이 없는 병렬 구도**로. (예: 분석형/공감형/직관형/실행형 — 누구는 나쁜 타입이 되지 않도록)
- **제목 2~5자 + 이모지 1개**, 공유하고 싶은 라벨.
- 한 시리즈 안에서 결과 축을 재활용해 **세계관 일관성**을 준다. (아래 A~D 유형명 참고)

## 3. 주제 시리즈 (12종)

세 갈래로 묶었다. 슬러그는 영어 소문자+하이픈, 카테고리 배치는 §5 참고.

### 그룹 1 — 성격 원형 (Core Personality)

| # | 슬러그 | 제목(ko) | 결과 4타입 | 태그 |
|---|---|---|---|---|
| 1 | `thinking-style-type` | 나는 어떤 사고방식일까? | 분석형 / 직관형 / 공감형 / 실행형 | 성격, 사고, 분석 |
| 2 | `energy-source-test` | 내 에너지는 어디서 충전될까? | 혼자형 / 소수친밀형 / 사교형 / 상황적응형 | 성격, 내향, 외향 |
| 3 | `decision-making-style` | 나는 어떻게 결정하는 사람일까? | 직관결정 / 신중검토 / 조언의존 / 미루기형 | 성격, 결정, 심리 |
| 4 | `inner-child-type` | 내 안의 어린아이는 어떤 모습? | 호기심 / 눈치 / 모범생 / 자유 | 심리, 내면, 성격 |

### 그룹 2 — 심리 반응 (Reaction & Coping)

| # | 슬러그 | 제목(ko) | 결과 4타입 | 태그 |
|---|---|---|---|---|
| 5 | `stress-coping-type` | 스트레스 받으면 나는? | 폭발형 / 잠수형 / 해결형 / 회피형 | 심리, 스트레스, 대처 |
| 6 | `overthinking-level` | 나는 생각이 많은 편일까? | 즉흥 / 균형 / 과몰입 / 무한루프 | 심리, 생각, 불안 |
| 7 | `comfort-zone-test` | 나는 안정형일까 도전형일까? | 안정 / 신중도전 / 모험 / 즉흥 | 심리, 도전, 성향 |
| 8 | `emotion-expression-type` | 내 감정 표현 방식은? | 직설 / 은근 / 삭임 / 행동 | 심리, 감정, 표현 |

### 그룹 3 — 관계·사회 성향 (Social Style)

| # | 슬러그 | 제목(ko) | 결과 4타입 | 태그 |
|---|---|---|---|---|
| 9 | `social-battery-type` | 내 소셜 배터리 용량은? | 절전 / 알뜰 / 넉넉 / 무제한 | 소셜, 관계, 성격 |
| 10 | `conflict-style-test` | 갈등 상황에서 나는? | 정면 / 중재 / 회피 / 관망 | 소셜, 갈등, 심리 |
| 11 | `first-impression-type` | 남들이 보는 첫인상은? | 다가가기쉬움 / 신비 / 든든 / 반전 | 소셜, 첫인상, 이미지 |
| 12 | `group-role-test` | 모임에서 내 포지션은? | 분위기메이커 / 기획자 / 리스너 / 관찰자 | 소셜, 모임, 역할 |

> 각 퀴즈는 8문항 · 결과 4타입(+동률 blend 1) · 결과 본문 400~500자 · 공유 카피/이미지 규격은 기존 love 퀴즈와 동일.

## 4. 발행 우선순위 (3단계)

- **Phase 1 (허브 채우기, 4종):** `thinking-style-type`, `stress-coping-type`, `social-battery-type`, `overthinking-level`
  → 성격/심리/소셜 각 축을 대표하는 4개로 허브를 love 차용 없이 자립시킴.
- **Phase 2 (축 보강, 4종):** `energy-source-test`, `decision-making-style`, `conflict-style-test`, `first-impression-type`
- **Phase 3 (확장, 4종):** 나머지 4종 + 반응 데이터 보고 리믹스.

각 Phase 발행 시 `quiz-writing-guide.md`의 "새 퀴즈 발행 절차" 9단계 그대로 따른다(JSON → index.ts → jsonSource.ts → page.tsx → 이미지 → check-quiz-images → sitemap → build → 노출 확인).

## 5. 카테고리 배치 결정 (해결 필요)

지금 성향 퀴즈를 만들면 **경로를 어디에 둘지**부터 정해야 한다. 두 안:

- **A안 — love 하위 유지 (`/ko/love/<slug>/`), 허브에서 큐레이션만.**
  장점: 기존 라우트/발행 파이프라인 그대로, 즉시 가능. 단점: URL이 "love"라 주제와 어긋남(SEO·정체성 약화).
- **B안 — `/ko/personality/` 카테고리 실제 오픈.**
  `KO_PRIMARY_NAV`에서 `personality` 항목을 `live: true`로 바꾸고 라우트·`category: "personality"`를 신설.
  장점: URL·카테고리 정합성, 확장성. 단점: 라우트/소스 매핑/사이트맵 구조 추가 작업.

> 권장: **Phase 1은 A안으로 빠르게 4종 발행**해 허브를 자립시키고, 콘텐츠가 8종 이상 쌓이는 Phase 2 시점에 **B안으로 `/ko/personality/` 승격**. 메모의 nav 단일 소스 정책(`KO_PRIMARY_NAV` 하나만 수정)과도 일치.

## 6. 다음 액션

- [ ] 카테고리 배치 A/B 확정
- [ ] Phase 1 4종 중 첫 퀴즈(`thinking-style-type`) JSON 초안 작성
- [ ] 결과 이미지 4+1장 생성 요청(`원픽테스트_복붙_이미지생성.md` 흐름 참고)
