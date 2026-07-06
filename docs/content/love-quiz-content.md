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

## 공통 이미지 프롬프트 (심층 테스트 — 연애·썸 테마)

심층 테스트 이미지는 **① 제목(썸네일) 이미지**와 **② 결과 이미지** 두 종류. 공통 규격은 아래를 공유한다.

### 개편 원칙 (2026-07 반영)

1. **퀴즈마다 다른 주인공.** 생성기에 그냥 맡기면 매번 비슷한 여성 캐릭터만 나온다. 반드시 [character-profile-prompts.md](../character-profile-prompts.md)의 캐릭터(F1~F5·M1~M5)를 **하나 지정해 그 인물 묘사 문장을 프롬프트에 그대로 삽입**한다. 아래 [퀴즈별 리드 캐릭터·색상 배정표](#퀴즈별-리드-캐릭터색상-배정표) 참고.
2. **얼굴을 크게, 표정은 과장되게.** 모바일에서 썸네일이 작게 노출되므로 **얼굴이 프레임의 55~70%를 차지하는 클로즈업**으로 잡고, 감정·표정을 **한눈에 읽힐 만큼 과장**한다(활짝 웃음·찡그림·눈물·도도함 등). 퀴즈마다·결과마다 표정이 뚜렷이 달라야 한다. (현재 문제: 표정이 다 비슷함)
3. **두꺼운 테두리.** 제목 이미지는 **굵은 프레임 보더**(두꺼운 외곽선/색 테두리)를 둘러 안쪽 오버레이 글자가 배경에 묻히지 않게 한다.
4. **색상은 콘텐츠에 맞게 다양하게.** 보라 일변도 금지. 퀴즈 주제·결과 감정에 맞춰 배정표의 팔레트를 쓴다. (사이트 액센트인 보라·핑크는 포인트로만.)

공통 규격: **1:1 정사각형(square)** — 커버·결과가 `aspect-ratio: 1/1`로 표시되므로 정사각형이 아니면 잘림. (예: `thumb.webp` 1024×1024) · 그림체: 부드러운 한국 웹툰풍 일러스트, 반짝이는 큰 눈·드라마틱 조명(캐릭터 세계관 유지).

> ⚠️ AI 이미지 생성기는 한글을 정확히 못 그린다. 이미지 안 글자는 **비워두고**, 최종 문구(라벨·제목·설명)는 디자인 툴로 오버레이하는 것을 기본으로 한다. 두꺼운 테두리는 오버레이 가독성을 위한 것이다.

### ① 제목 이미지 프롬프트

용도: 목록 썸네일·퀴즈 상단 커버. 원픽과 달리 **보기 번호는 넣지 않고**, 주인공 얼굴과 무드 중심.

조립 공식: `[배정표의 리드 캐릭터 묘사 문장]` + 아래 suffix.

- KO suffix: `이 인물의 얼굴을 화면의 55~70%로 크게 잡은 클로즈업 포스터 썸네일, 퀴즈 주제에 맞는 감정을 과장되게 드러낸 표정, 시선·포즈가 뚜렷함. 굵은 프레임 테두리로 둘러싼 구도(안쪽에 제목 오버레이 공간 확보), 이미지 안 글자 없음. [배정표의 색상 팔레트] 계열 조명·배경, 부드러운 한국 웹툰풍 일러스트, 1:1 정사각형 비율.`
- EN suffix: `a close-up poster thumbnail with this character's face filling 55–70% of the frame, an exaggerated expression matching the quiz theme, clear gaze and pose. A thick bold frame border around the composition (leaving inner space for a title overlay), no text inside the image. [palette from the table] lighting and background, soft Korean webtoon illustration, square 1:1 aspect ratio.`

### ② 결과 이미지 프롬프트

용도: 결과 화면 상단 + Kakao 공유 카드. 결과 **하나**당 이미지 1장. 같은 퀴즈라도 결과 4개의 **표정·색이 확실히 달라야** 한다.

조립 공식: `[리드 캐릭터(또는 해당 결과 유형에 맞는 다른 캐릭터) 묘사]` + 아래 suffix.

- KO suffix: `해당 결과 유형의 감정을 과장되게 드러낸 얼굴 클로즈업(얼굴이 화면의 55~70%), 그 결과 특유의 표정·시선·포즈. 이미지 안 글자 없음(태그라인은 후편집 오버레이). 이 결과의 감정에 맞는 [결과별 색상] 계열 조명·배경으로 네 결과가 한눈에 구분되게, 부드러운 한국 웹툰풍 일러스트, 1:1 정사각형 비율.`
- EN suffix: `a face close-up (face filling 55–70% of the frame) with an exaggerated expression for this result type, its own distinct gaze and pose. No text inside the image (tagline added later as overlay). [per-result palette] lighting and background so the four results read as clearly different at a glance; soft Korean webtoon illustration, square 1:1 aspect ratio.`

### 퀴즈별 리드 캐릭터·색상 배정표

- 리드 캐릭터는 `F1~F5·M1~M5`(설명은 [character-profile-prompts.md](../character-profile-prompts.md)), 마스코트는 각 캐릭터의 기본 조합(F1→A1 … M5→A1).
- **제목 이미지**는 리드 1명으로 통일, **결과 이미지**는 리드의 표정·색을 결과별로 변주(또는 결과 유형이 확연히 다르면 다른 캐릭터 차용).
- 아래는 시작 배정안 — 겹침·POV가 어색하면 자유롭게 교체(캐릭터당 2개꼴로만 유지).

| 슬러그 | 제목 | 리드 | 색상 팔레트 |
|---|---|---|---|
| `confession-success-rate` | 나의 고백 성공 확률은? | F1 | 설레는 코랄·핑크 |
| `who-likes-you-type` | 나를 좋아하는 사람은 어떤 타입? | F1 | 따뜻한 로즈·크림 |
| `ambiguous-situationship-end` | 썸이 항상 애매하게 끝나는 이유 | F2 | 안개빛 로즈·그레이 |
| `logical-or-emotional` | 나는 이성적일까 감성적일까? | F2 | 스틸 블루 ↔ 웜 로즈 대비 |
| `emotional-sensitivity` | 나는 왜 예민할까? | F3 | 소프트 라벤더·민트 |
| `why-cant-you-text-first` | 나는 왜 먼저 연락을 못할까? | F3 | 문라이트 인디고·블루 |
| `dating-expert-or-beginner` | 나는 연애 고수일까 초보일까? | F4 | 골드·버건디 |
| `relationship-balance-test` | 연애 중 나는 갑 vs 을? | F4 | 로즈·차콜 |
| `love-pattern-destroying-habit` | 내가 연애를 망치는 습관 | F5 | 스모키 틸·앰버 |
| `self-esteem-level` | 나의 자존감 레벨은? | F5 | 골드·피치 |
| `love-temperature-test` | 나는 어떤 연애 온도일까? | M1 | 아이스 블루 → 핫 레드 그라데이션 |
| `trust-level-test` | 나는 사람을 잘 믿는 편일까? | M1 | 세이지 그린·아이보리 |
| `anger-style-test` | 화났을 때 나는? | M2 | 레드·오렌지 |
| `when-men-lose-interest` | 남자가 나에게 식는 순간 | M2 | 페이딩 블루·애쉬 |
| `personality-psychology-test` | 나의 성격·심리 분석은? | M3 | 인디고·틸 |
| `true-self-alone` | 나는 혼자 있을 때 어떤 사람? | M3 | 차분한 블루·그레이 |
| `leader-or-supporter` | 나는 리더형인가 조력자형인가? | M4 | 로열 블루·틸 |
| `mental-strength-test` | 나는 멘탈 강자일까 유리멘탈일까? | M4 | 스틸·실버·앰버 |
| `hidden-dark-side` | 나의 숨겨진 다크사이드 | M5 | 다크 플럼·크림슨 |
| `planner-or-spontaneous` | 나는 계획형인가 즉흥형인가? | M5 | 네이비 ↔ 선샤인 옐로 대비 |

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
