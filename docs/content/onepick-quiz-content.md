# 원픽 테스트 콘텐츠 (제작 진행 문서)

> 원픽 테스트 개별 퀴즈의 기획·결과·프롬프트를 채워가는 작업 문서.
> 형식·구현 규칙은 [../features/onepick-tests.md](../features/onepick-tests.md) 참고.
> 톤 기준: [content-tone.md](./content-tone.md) — 재미·자기이해용, 단정·진단·예언 금지, 면책 1줄.

## 결과 설계 기준

- 각 원픽 결과는 **실제 심리 개념에서 착안**하되, 검증된 진단이 아니라 **공감되는 해석 + 참고용**으로 쓴다.
- 문항 1개, 보기 = 결과 1:1, 보기 수 4~6개.
- 표현: "이런 타입은 ~한 경향이 있어요" (O) / "당신은 반드시 ~합니다" (X).

## 공통 프롬프트 (모든 원픽 적용)

원픽 이미지는 **① 제목 이미지**와 **② 결과 이미지** 두 종류로 나뉜다. 아래 공통 규격을 공유하되, 종류별 규칙이 다르다.

- 공통 규격: **1:1 정사각형(square)** — UI에서 커버·보기·결과가 `aspect-ratio: 1/1`로 표시되므로 정사각형이 아니면 잘림.
- 공통 그림체: 부드러운 한국 웹툰풍 일러스트, 핑크 퍼플 계열 무드.

> ⚠️ 텍스트 렌더링 주의: AI 이미지 생성기는 글자, 특히 한글을 정확히 못 그리는 경우가 많다. 아래처럼 이미지에 텍스트를 넣기로 했으므로, 텍스트 재현이 좋은 도구를 쓰거나 최종 문구는 디자인 툴로 얹는(오버레이) 방식을 병행하는 것을 권장한다.

### ① 제목 이미지 공통 프롬프트

용도: 목록 썸네일·퀴즈 상단 커버. 아래 레이아웃으로 **텍스트 + 번호가 매겨진 보기 4~6개**를 함께 담는다.

레이아웃 (위 → 아래):
1. 상단 첫 줄: 작은 영문 라벨 `ONE-PICK TEST`
2. 둘째 줄: 테스트 제목 (해당 퀴즈 제목)
3. 셋째 줄: 방법 안내 문구 (예: `1가지를 골라보세요`)
4. 중앙: 보기 4~6개 이미지, 각 보기에 크고 뚜렷한 번호(1·2·3·…)
5. 최하단: 테스트 설명 (한 줄)

- EN suffix: `poster-style thumbnail. Top: a small English label "ONE-PICK TEST"; second line: the quiz title; third line: a short instruction (e.g., "Pick one"); center: the 4–6 options each marked with a large, legible number (1, 2, 3, ...); bottom: a one-line description. Soft Korean webtoon illustration, pink-purple ambiance; square 1:1 aspect ratio.`
- KO suffix: `포스터형 썸네일. 상단: 작은 영문 라벨 "ONE-PICK TEST", 둘째 줄: 테스트 제목, 셋째 줄: 방법 안내 문구(예: "1가지를 골라보세요"), 중앙: 보기 4~6개에 각각 크고 읽기 쉬운 번호(1·2·3·…), 최하단: 테스트 설명 한 줄. 부드러운 한국 웹툰풍 일러스트·핑크 퍼플 무드, 1:1 정사각형 비율.`

> 실제 생성 시 제목·설명·안내 문구는 각 퀴즈 「기본 정보」의 값(제목·설명)을 넣는다.

### ② 결과 이미지 공통 프롬프트

용도: 결과 화면 상단 이미지. 해당 결과 **하나**를 상징하는 **단일 장면** 위에, 그 결과의 **태그라인(헤드라인) + 핵심 내용을 압축한 한두 줄**을 함께 얹는다.

- EN suffix: `a single symbolic scene expressing this one result's mood, with the result's tagline shown as a headline and one or two short condensed lines of the result text overlaid; soft Korean webtoon illustration, pink-purple palette; square 1:1 aspect ratio.`
- KO suffix: `해당 결과 하나의 감정·무드를 담은 단일 상징 장면 위에, 그 결과의 태그라인(헤드라인)과 핵심 내용을 압축한 한두 줄을 얹음, 부드러운 한국 웹툰풍 일러스트·핑크 퍼플 팔레트, 1:1 정사각형 비율.`

> 실제 생성 시 태그라인·압축 내용은 각 결과의 `tagline`/`body` 값에서 가져온다.

## 진행 현황

| # | 제목 | 슬러그 | 심리 착안 | 보기 수 | 상태 |
|---|---|---|---|---|---|
| ✅ | 지금 끌리는 색은? | `color-mood-onepick` | 색채심리(color psychology) | 4 | 구현 완료 |
| 1 | 오늘 열고 싶은 문은? | `door-need-onepick` | 자기결정이론(SDT) 기본욕구 | 4 | 구현 완료 |
| 2 | 지금 손이 가는 디저트는? | `dessert-love-onepick` | 리(Lee) 사랑의 6색(Love Styles) | 6 | 구현 완료 |
| 3 | 끌리는 밤하늘은? | `night-sky-mood-onepick` | 러셀 정서 원형모형(valence×arousal) | 4 | 구현 완료 |
| 4 | 무인도에 딱 하나 가져간다면? | `island-value-onepick` | 관계 가치 우선순위 | 5 | 구현 완료 |
| 5 | 눈길이 먼저 가는 꽃은? | `flower-charm-onepick` | 성격 강점(VIA)·Big Five | 6 | 구현 완료 |
| 6 | 지금 보내고 싶은 이모지는? | `emoji-crush-onepick` | 성인 애착유형 | 4 | 구현 완료 |
| 7 | 창밖 날씨 중 지금 나는? | `weather-relationship-onepick` | 관계 정서 상태·관계 단계 | 4 | 구현 완료 |
| 8 | 카페에서 고르는 자리는? | `cafe-seat-onepick` | 대인거리(프록세믹스)·자기개방 | 5 | 구현 완료 |
| 9 | 지금 껴안고 싶은 인형은? | `doll-love-onepick` | 스턴버그 사랑의 삼각이론 | 4 | 구현 완료 |
| 10 | 문득 떠나고 싶은 여행지는? | `travel-need-onepick` | 환경심리 회복이론·현재 욕구 | 6 | 구현 완료 |

> 상태: `설계도`(유형만) → `본문 작성`(결과 텍스트) → `프롬프트`(이미지 프롬프트) → `구현`(JSON+라우트).

---

## 1. 오늘 열고 싶은 문은? — `door-need-onepick`

- 착안: **자기결정이론(SDT)** 기본 심리욕구 + 정서적 회복 욕구
- 보기(문 4개) → 결과: 지금 내게 필요한 것 (1:1)

### 기본 정보

- 슬러그: `door-need-onepick`
- 제목: 오늘 열고 싶은 문은?
- 부제: 무심코 끌린 문 하나가 지금 내 마음을 알려줘요
- 설명(meta description): 네 개의 문 중 지금 가장 끌리는 하나로, 요즘 내 마음이 진짜 바라는 걸 알아보는 원픽 심리 테스트.
- 태그: 원픽 / 심리 / 감정 / 자기이해
- 문항 문구(prompt): 지금 가장 열어보고 싶은 문은?
- 결과 개수: 4
- 보기 라벨: `1번 선택 (노을빛 문)` · `2번 선택 (별빛 문)` · `3번 선택 (불빛 문)` · `4번 선택 (아침햇살 문)`
  - 매핑: 노을빛→`rest`(휴식형) / 별빛→`thrill`(설렘형) / 불빛→`connect`(연결형) / 아침햇살→`achieve`(인정형)

### 제목 이미지 프롬프트

- EN: `Four glowing doors floating in a dreamy night space, each hinting a different mood — warm sunset, sparkling starry sky, cozy golden light, bright morning sun; each door clearly marked with a large, legible number 1 to 4, split into panels or one scene is fine but the numbers must be clearly visible, soft Korean webtoon illustration, pink-purple neon ambiance, one-pick psychology test thumbnail, square 1:1 aspect ratio. Overlaid Korean text — top small label "ONE-PICK TEST"; title "오늘 열고 싶은 문은?"; instruction "1가지를 골라보세요"; bottom one-line description "네 개의 문 중 지금 가장 끌리는 하나로, 요즘 내 마음이 진짜 바라는 걸 알아보는 원픽 심리 테스트".`
- KO: `꿈결 같은 밤 공간에 떠 있는 빛나는 문 4개, 각 문이 서로 다른 분위기를 암시 — 따뜻한 노을, 반짝이는 별하늘, 포근한 황금빛, 밝은 아침햇살; 각 문에 크고 읽기 쉬운 번호 1~4를 뚜렷하게 표시, 패널 분할이든 한 장면이든 무방하되 번호는 반드시 잘 보이게, 부드러운 한국 웹툰풍 일러스트, 핑크 퍼플 네온 분위기, 원픽 심리테스트 썸네일, 1:1 정사각형 비율. 오버레이 텍스트 — 상단 작은 라벨 "ONE-PICK TEST", 제목 "오늘 열고 싶은 문은?", 안내 "1가지를 골라보세요", 하단 설명 "네 개의 문 중 지금 가장 끌리는 하나로, 요즘 내 마음이 진짜 바라는 걸 알아보는 원픽 심리 테스트".`

### 결과 1 — 휴식형 🌙 (`rest`)

- tagline: 지금은 쉼표가 필요한 때
- body: 요즘 마음이 조금 지쳐 있는지도 몰라요. 이런 타입은 새로운 자극보다 편안한 쉼과 재충전이 필요한 경향이 있어요. 억지로 더 해내려 하기보다, 오늘은 나를 조금 놓아주는 시간을 가져보세요. 잘 쉬는 것도 앞으로 나아가는 힘이 돼요.
- 결과 이미지 EN: `A softly glowing sunset-colored door slightly open, warm cozy light spilling out, calm restful mood, soft Korean webtoon illustration, pink-orange gradient, square 1:1 aspect ratio. Overlaid Korean text — headline "지금은 쉼표가 필요한 때"; one condensed line "요즘 마음이 조금 지쳐 있는지도 몰라요.".`
- 결과 이미지 KO: `은은하게 빛나는 노을빛 문이 살짝 열려 따뜻한 빛이 새어 나오는 장면, 차분하고 편안한 분위기, 부드러운 한국 웹툰풍 일러스트, 핑크 오렌지 그라데이션, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "지금은 쉼표가 필요한 때", 압축 내용 "요즘 마음이 조금 지쳐 있는지도 몰라요.".`

### 결과 2 — 설렘형 ✨ (`thrill`)

- tagline: 새로운 자극이 그리운 때
- body: 지금 당신은 익숙한 일상보다 새로운 변화나 설렘을 바라고 있는지도 몰라요. 이런 타입은 작은 도전이나 낯선 경험에서 에너지를 얻는 경향이 있어요. 오늘은 평소 안 가던 길로 걸어보거나, 미뤄둔 걸 하나 시도해 보세요. 작은 변화가 기분을 바꿔줄 거예요.
- 결과 이미지 EN: `A door opening into a sparkling starry sky, floating light particles, exciting adventurous mood, soft Korean webtoon illustration, purple-blue neon with pink accents, square 1:1 aspect ratio. Overlaid Korean text — headline "새로운 자극이 그리운 때"; one condensed line "지금 당신은 익숙한 일상보다 새로운 변화나 설렘을 바라고 있는지도 몰라요.".`
- 결과 이미지 KO: `별이 쏟아지는 밤하늘로 열린 문, 떠다니는 빛 입자, 설레고 모험적인 분위기, 부드러운 한국 웹툰풍 일러스트, 퍼플 블루 네온에 핑크 포인트, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "새로운 자극이 그리운 때", 압축 내용 "지금 당신은 익숙한 일상보다 새로운 변화나 설렘을 바라고 있는지도 몰라요.".`

### 결과 3 — 연결형 💛 (`connect`)

- tagline: 마음을 나누고 싶은 때
- body: 요즘 누군가와 마음을 나누고 싶은 마음이 큰 상태일 수 있어요. 이런 타입은 혼자보다 관계 속에서 안정을 느끼는 경향이 있어요. 오늘은 오래 연락 못 한 사람에게 먼저 안부를 건네보는 건 어때요? 작은 연결 하나가 큰 위로가 되기도 해요.
- 결과 이미지 EN: `A door with warm golden light and soft silhouettes of people gathering, cozy heartfelt mood, soft Korean webtoon illustration, warm pink-amber glow, square 1:1 aspect ratio. Overlaid Korean text — headline "마음을 나누고 싶은 때"; one condensed line "요즘 누군가와 마음을 나누고 싶은 마음이 큰 상태일 수 있어요.".`
- 결과 이미지 KO: `따뜻한 황금빛과 사람들이 모인 부드러운 실루엣이 비치는 문, 포근하고 정겨운 분위기, 부드러운 한국 웹툰풍 일러스트, 따뜻한 핑크 앰버 글로우, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "마음을 나누고 싶은 때", 압축 내용 "요즘 누군가와 마음을 나누고 싶은 마음이 큰 상태일 수 있어요.".`

### 결과 4 — 인정형 🌟 (`achieve`)

- tagline: 인정받고 싶은 때
- body: 지금 당신은 스스로의 노력을 누군가 알아봐 주길 바라는 마음이 있는지도 몰라요. 이런 타입은 성취와 인정에서 힘을 얻는 경향이 있어요. 오늘은 작더라도 해낸 일 하나를 스스로 칭찬해 주세요. 남의 인정만큼 내 인정도 소중해요.
- 결과 이미지 EN: `A door opening into bright morning sunlight, uplifting confident mood, subtle sparkle of accomplishment, soft Korean webtoon illustration, fresh pink-yellow light, square 1:1 aspect ratio. Overlaid Korean text — headline "인정받고 싶은 때"; one condensed line "지금 당신은 스스로의 노력을 누군가 알아봐 주길 바라는 마음이 있는지도 몰라요.".`
- 결과 이미지 KO: `밝은 아침 햇살로 열린 문, 자신감 있고 상쾌한 분위기, 성취의 은은한 반짝임, 부드러운 한국 웹툰풍 일러스트, 산뜻한 핑크 옐로 빛, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "인정받고 싶은 때", 압축 내용 "지금 당신은 스스로의 노력을 누군가 알아봐 주길 바라는 마음이 있는지도 몰라요.".`

### 면책 문구(footnote)

재미로 보는 심리 테스트예요. 결과는 참고용입니다.

## 2. 지금 손이 가는 디저트는? — `dessert-love-onepick`

- 착안: **리(Lee)의 사랑의 6색 이론(Love Styles)**
- 보기(디저트 6개) → 결과: 나의 연애 스타일
  - 에로스(열정형) · 루두스(밀당·유희형) · 스토르게(우정형) · 프라그마(현실형) · 마니아(몰입형) · 아가페(헌신형)

### 기본 정보

- 슬러그: `dessert-love-onepick`
- 제목: 지금 손이 가는 디저트는?
- 부제: 지금 끌리는 디저트가 내 연애 스타일을 알려줘요
- 설명(meta description): 여섯 개의 디저트 중 지금 가장 손이 가는 하나로, 나의 연애 스타일을 알아보는 원픽 테스트.
- 태그: 원픽 / 연애 / 심리 / 사랑스타일
- 문항 문구(prompt): 지금 가장 손이 가는 디저트는?
- 결과 개수: 6
- 보기 라벨: `1번 선택 (레드벨벳)` · `2번 선택 (마카롱 타워)` · `3번 선택 (쿠키)` · `4번 선택 (타르트)` · `5번 선택 (초콜릿 라바)` · `6번 선택 (하트 무스)`
  - 매핑: 레드벨벳→`eros`(열정형) / 마카롱 타워→`ludus`(유희형) / 쿠키→`storge`(우정형) / 타르트→`pragma`(현실형) / 초콜릿 라바→`mania`(몰입형) / 하트 무스→`agape`(헌신형)

### 제목 이미지 프롬프트

- EN: `Six dreamy desserts arranged as a numbered set 1 to 6 — passionate red velvet, playful macaron tower, warm homey cookie, neat classic tart, rich chocolate lava, soft heart-shaped mousse; each dessert clearly marked with a large legible number 1 to 6, split into panels or one scene is fine but the numbers must be clearly visible, soft Korean webtoon illustration, pink-purple neon ambiance, one-pick love-style test thumbnail, square 1:1 aspect ratio. Overlaid Korean text — top small label "ONE-PICK TEST"; title "지금 손이 가는 디저트는?"; instruction "1가지를 골라보세요"; bottom one-line description "여섯 개의 디저트 중 지금 가장 손이 가는 하나로, 나의 연애 스타일을 알아보는 원픽 테스트".`
- KO: `꿈결 같은 디저트 6개를 번호 세트 1~6으로 배치 — 열정적인 레드벨벳, 발랄한 마카롱 타워, 포근한 홈메이드 쿠키, 단정한 클래식 타르트, 진한 초콜릿 라바, 부드러운 하트 무스; 각 디저트에 크고 읽기 쉬운 번호 1~6 뚜렷하게, 패널 분할이든 한 장면이든 무방하되 번호는 반드시 잘 보이게, 부드러운 한국 웹툰풍 일러스트, 핑크 퍼플 네온 분위기, 원픽 연애스타일 테스트 썸네일, 1:1 정사각형 비율. 오버레이 텍스트 — 상단 작은 라벨 "ONE-PICK TEST", 제목 "지금 손이 가는 디저트는?", 안내 "1가지를 골라보세요", 하단 설명 "여섯 개의 디저트 중 지금 가장 손이 가는 하나로, 나의 연애 스타일을 알아보는 원픽 테스트".`

### 결과 1 — 열정형(에로스) ❤️‍🔥 (`eros`)

- tagline: 마음이 가면 뜨겁게 빠져드는 타입
- body: 이런 타입은 강렬한 끌림과 설렘을 사랑의 핵심으로 느끼는 경향이 있어요. 상대에게 온 마음을 쏟고 로맨틱한 순간을 소중히 여기죠. 그 열정이 관계를 반짝이게 하지만, 가끔은 상대의 속도도 함께 살펴주면 더 오래 뜨거울 수 있어요.
- 결과 이미지 EN: `A luxurious red velvet cake glowing with warm romantic light, passionate hot-pink and deep red tones, soft Korean webtoon illustration, intense loving mood, square 1:1 aspect ratio. Overlaid Korean text — headline "마음이 가면 뜨겁게 빠져드는 타입"; one condensed line "이런 타입은 강렬한 끌림과 설렘을 사랑의 핵심으로 느끼는 경향이 있어요.".`
- 결과 이미지 KO: `따뜻한 로맨틱 조명 아래 빛나는 고급스러운 레드벨벳 케이크, 정열적인 핫핑크와 딥 레드 톤, 부드러운 한국 웹툰풍 일러스트, 강렬하고 사랑스러운 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "마음이 가면 뜨겁게 빠져드는 타입", 압축 내용 "이런 타입은 강렬한 끌림과 설렘을 사랑의 핵심으로 느끼는 경향이 있어요.".`

### 결과 2 — 유희형(루두스) 😜 (`ludus`)

- tagline: 사랑도 즐겁게, 가볍게 즐기는 타입
- body: 이런 타입은 연애를 무겁지 않게, 즐거운 놀이처럼 여기는 경향이 있어요. 새로운 설렘과 밀당의 재미를 즐기고 자유로운 분위기를 좋아하죠. 그 경쾌함이 매력이지만, 진심이 통하는 상대에겐 한 번쯤 솔직하게 다가가 보는 것도 좋아요.
- 결과 이미지 EN: `A colorful playful macaron tower, bouncy cheerful pastel colors, sparkling fun mood, soft Korean webtoon illustration, light-hearted romance, square 1:1 aspect ratio. Overlaid Korean text — headline "사랑도 즐겁게, 가볍게 즐기는 타입"; one condensed line "이런 타입은 연애를 무겁지 않게, 즐거운 놀이처럼 여기는 경향이 있어요.".`
- 결과 이미지 KO: `알록달록 발랄한 마카롱 타워, 통통 튀는 경쾌한 파스텔 컬러, 반짝이는 즐거운 분위기, 부드러운 한국 웹툰풍 일러스트, 가벼운 로맨스, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "사랑도 즐겁게, 가볍게 즐기는 타입", 압축 내용 "이런 타입은 연애를 무겁지 않게, 즐거운 놀이처럼 여기는 경향이 있어요.".`

### 결과 3 — 우정형(스토르게) 🤍 (`storge`)

- tagline: 편안함에서 사랑이 자라는 타입
- body: 이런 타입은 오랜 우정처럼 편안하고 익숙한 관계에서 사랑을 느끼는 경향이 있어요. 급하게 타오르기보다 천천히 신뢰를 쌓아가죠. 그 안정감이 큰 장점이지만, 가끔은 설렘을 표현하는 작은 이벤트가 관계에 활력을 줘요.
- 결과 이미지 EN: `A warm homemade cookie on a cozy table, soft golden light, comforting familiar mood, soft Korean webtoon illustration, gentle pink-cream tones, square 1:1 aspect ratio. Overlaid Korean text — headline "편안함에서 사랑이 자라는 타입"; one condensed line "이런 타입은 오랜 우정처럼 편안하고 익숙한 관계에서 사랑을 느끼는 경향이 있어요.".`
- 결과 이미지 KO: `아늑한 테이블 위 따뜻한 홈메이드 쿠키, 부드러운 황금빛, 편안하고 익숙한 분위기, 부드러운 한국 웹툰풍 일러스트, 은은한 핑크 크림 톤, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "편안함에서 사랑이 자라는 타입", 압축 내용 "이런 타입은 오랜 우정처럼 편안하고 익숙한 관계에서 사랑을 느끼는 경향이 있어요.".`

### 결과 4 — 현실형(프라그마) 📋 (`pragma`)

- tagline: 마음도 현실도 함께 보는 타입
- body: 이런 타입은 감정만큼 현실적인 조건과 미래도 함께 고려하는 경향이 있어요. 신중하게 상대를 살피고 오래 갈 관계를 그리죠. 그 균형감이 강점이지만, 가끔은 계산을 잠시 내려놓고 마음이 이끄는 대로 느껴보는 것도 좋아요.
- 결과 이미지 EN: `A neat elegant fruit tart precisely arranged, calm balanced composition, refined cool-pink tones, soft Korean webtoon illustration, thoughtful practical mood, square 1:1 aspect ratio. Overlaid Korean text — headline "마음도 현실도 함께 보는 타입"; one condensed line "이런 타입은 감정만큼 현실적인 조건과 미래도 함께 고려하는 경향이 있어요.".`
- 결과 이미지 KO: `정갈하게 배열된 우아한 과일 타르트, 차분하고 균형 잡힌 구성, 세련된 쿨 핑크 톤, 부드러운 한국 웹툰풍 일러스트, 신중하고 현실적인 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "마음도 현실도 함께 보는 타입", 압축 내용 "이런 타입은 감정만큼 현실적인 조건과 미래도 함께 고려하는 경향이 있어요.".`

### 결과 5 — 몰입형(마니아) 💗 (`mania`)

- tagline: 온 마음을 다해 깊이 빠지는 타입
- body: 이런 타입은 사랑에 깊이 몰입하고, 상대가 내 마음의 큰 자리를 차지하는 경향이 있어요. 그만큼 애정도 크고 표현도 진하죠. 다만 마음이 클수록 불안해지기 쉬우니, 나 자신을 돌보는 시간도 함께 챙기면 관계가 한결 편안해져요.
- 결과 이미지 EN: `An intense chocolate lava cake with a flowing warm center, deep passionate glow, swirling pink-magenta tones, soft Korean webtoon illustration, immersive emotional mood, square 1:1 aspect ratio. Overlaid Korean text — headline "온 마음을 다해 깊이 빠지는 타입"; one condensed line "이런 타입은 사랑에 깊이 몰입하고, 상대가 내 마음의 큰 자리를 차지하는 경향이 있어요.".`
- 결과 이미지 KO: `따뜻한 속이 흘러내리는 진한 초콜릿 라바 케이크, 깊고 정열적인 빛, 소용돌이치는 핑크 마젠타 톤, 부드러운 한국 웹툰풍 일러스트, 깊이 빠져드는 감정적 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "온 마음을 다해 깊이 빠지는 타입", 압축 내용 "이런 타입은 사랑에 깊이 몰입하고, 상대가 내 마음의 큰 자리를 차지하는 경향이 있어요.".`

### 결과 6 — 헌신형(아가페) 💞 (`agape`)

- tagline: 아낌없이 내어주는 따뜻한 타입
- body: 이런 타입은 상대의 행복을 내 일처럼 여기며 조건 없이 마음을 내어주는 경향이 있어요. 배려심이 깊고 헌신적이죠. 그 따뜻함이 큰 사랑이지만, 나를 돌보는 것도 잊지 말아요 — 채워진 마음이 더 오래 나눌 수 있어요.
- 결과 이미지 EN: `A soft heart-shaped mousse dessert glowing gently, tender caring warmth, soft pink and cream tones, soft Korean webtoon illustration, devoted gentle mood, square 1:1 aspect ratio. Overlaid Korean text — headline "아낌없이 내어주는 따뜻한 타입"; one condensed line "이런 타입은 상대의 행복을 내 일처럼 여기며 조건 없이 마음을 내어주는 경향이 있어요.".`
- 결과 이미지 KO: `은은하게 빛나는 부드러운 하트 무스 디저트, 다정하고 따뜻한 온기, 부드러운 핑크와 크림 톤, 부드러운 한국 웹툰풍 일러스트, 헌신적이고 다정한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "아낌없이 내어주는 따뜻한 타입", 압축 내용 "이런 타입은 상대의 행복을 내 일처럼 여기며 조건 없이 마음을 내어주는 경향이 있어요.".`

### 면책 문구(footnote)

재미로 보는 심리 테스트예요. 결과는 참고용입니다.

## 3. 끌리는 밤하늘은? — `night-sky-mood-onepick`

- 착안: **러셀의 정서 원형모형(valence × arousal)**
- 보기(밤하늘 4개) → 결과: 요즘 내 마음 온도
  - 설렘(고각성·긍정) · 평온(저각성·긍정) · 싱숭생숭(고각성·불안) · 차분히 가라앉음(저각성)

### 기본 정보

- 슬러그: `night-sky-mood-onepick`
- 제목: 끌리는 밤하늘은?
- 부제: 지금 눈이 가는 밤하늘이 내 마음 온도를 알려줘요
- 설명(meta description): 네 개의 밤하늘 중 지금 끌리는 하나로, 요즘 내 마음 상태를 알아보는 원픽 테스트.
- 태그: 원픽 / 감정 / 심리 / 무드
- 문항 문구(prompt): 지금 가장 끌리는 밤하늘은?
- 결과 개수: 4
- 보기 라벨: `1번 선택 (별이 쏟아지는 하늘)` · `2번 선택 (잔잔한 달빛 하늘)` · `3번 선택 (일렁이는 오로라)` · `4번 선택 (깊고 조용한 밤)`
  - 매핑: 별밤→`excited`(설렘) / 달빛→`calm`(평온) / 오로라→`restless`(싱숭생숭) / 자정→`low`(가라앉음)

### 제목 이미지 프롬프트

- EN: `Four contrasting night skies arranged as a numbered set 1 to 4 — a sparkling excited starry sky, a calm serene moonlit sky, a restless swirling aurora, a quiet deep midnight sky; each sky clearly marked with a large legible number 1 to 4, split into panels or one scene is fine but the numbers must be clearly visible, soft Korean webtoon illustration, pink-purple neon ambiance, one-pick mood test thumbnail, square 1:1 aspect ratio. Overlaid Korean text — top small label "ONE-PICK TEST"; title "끌리는 밤하늘은?"; instruction "1가지를 골라보세요"; bottom one-line description "네 개의 밤하늘 중 지금 끌리는 하나로, 요즘 내 마음 상태를 알아보는 원픽 테스트".`
- KO: `대비되는 밤하늘 4개를 번호 세트 1~4로 배치 — 반짝이는 설레는 별하늘, 고요하고 평온한 달빛 하늘, 일렁이는 오로라의 싱숭생숭한 하늘, 깊고 조용한 자정의 하늘; 각 하늘에 크고 읽기 쉬운 번호 1~4 뚜렷하게, 패널이든 한 장면이든 무방하되 번호는 반드시 잘 보이게, 부드러운 한국 웹툰풍 일러스트, 핑크 퍼플 네온 분위기, 원픽 감정 테스트 썸네일, 1:1 정사각형 비율. 오버레이 텍스트 — 상단 작은 라벨 "ONE-PICK TEST", 제목 "끌리는 밤하늘은?", 안내 "1가지를 골라보세요", 하단 설명 "네 개의 밤하늘 중 지금 끌리는 하나로, 요즘 내 마음 상태를 알아보는 원픽 테스트".`

### 결과 1 — 설렘 ✨ (`excited`)

- tagline: 기대와 설렘으로 반짝이는 상태
- body: 요즘 당신의 마음은 기대와 설렘으로 반짝이고 있는지도 몰라요. 이런 상태는 새로운 시작이나 즐거운 일을 앞두고 에너지가 위로 향할 때 나타나는 경향이 있어요. 그 반짝임을 마음껏 누리되, 가끔은 깊게 숨 한 번 고르며 지금을 음미해 보세요.
- 결과 이미지 EN: `A sparkling starry night sky bursting with light, exciting uplifting energy, vivid pink-purple glow, soft Korean webtoon illustration, joyful anticipation mood, square 1:1 aspect ratio. Overlaid Korean text — headline "기대와 설렘으로 반짝이는 상태"; one condensed line "요즘 당신의 마음은 기대와 설렘으로 반짝이고 있는지도 몰라요.".`
- 결과 이미지 KO: `빛으로 가득 차 반짝이는 별밤, 설레고 고양된 에너지, 선명한 핑크 퍼플 글로우, 부드러운 한국 웹툰풍 일러스트, 기대에 찬 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "기대와 설렘으로 반짝이는 상태", 압축 내용 "요즘 당신의 마음은 기대와 설렘으로 반짝이고 있는지도 몰라요.".`

### 결과 2 — 평온 🌙 (`calm`)

- tagline: 잔잔하게 만족스러운 상태
- body: 지금 당신의 마음은 잔잔하고 편안한 상태일 수 있어요. 큰 파도 없이 지금에 만족하며 안정을 느끼는 시기죠. 이런 때는 무리해서 뭔가를 더 하기보다, 이 평온함을 충분히 누리는 것만으로도 충분해요.
- 결과 이미지 EN: `A calm serene moonlit sky with soft clouds, gentle peaceful stillness, soft blue-lavender tones, soft Korean webtoon illustration, content restful mood, square 1:1 aspect ratio. Overlaid Korean text — headline "잔잔하게 만족스러운 상태"; one condensed line "지금 당신의 마음은 잔잔하고 편안한 상태일 수 있어요.".`
- 결과 이미지 KO: `부드러운 구름이 있는 잔잔한 달빛 밤하늘, 은은하고 평화로운 고요함, 부드러운 블루 라벤더 톤, 부드러운 한국 웹툰풍 일러스트, 만족스럽고 편안한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "잔잔하게 만족스러운 상태", 압축 내용 "지금 당신의 마음은 잔잔하고 편안한 상태일 수 있어요.".`

### 결과 3 — 싱숭생숭 🌌 (`restless`)

- tagline: 마음이 조금 일렁이는 상태
- body: 요즘 마음이 이유 없이 조금 일렁이고 있는지도 몰라요. 기대와 걱정이 섞여 마음이 바쁠 때 나타나는 상태예요. 이런 땐 감정을 억누르기보다, 지금 드는 마음을 가볍게 적어보거나 산책으로 흘려보내면 한결 가벼워져요.
- 결과 이미지 EN: `A restless swirling aurora across a night sky, shimmering unsettled movement, mixed purple-teal-pink tones, soft Korean webtoon illustration, wistful stirring mood, square 1:1 aspect ratio. Overlaid Korean text — headline "마음이 조금 일렁이는 상태"; one condensed line "요즘 마음이 이유 없이 조금 일렁이고 있는지도 몰라요.".`
- 결과 이미지 KO: `밤하늘을 가로지르는 일렁이는 오로라, 어른거리는 뒤숭숭한 움직임, 퍼플 틸 핑크가 섞인 톤, 부드러운 한국 웹툰풍 일러스트, 싱숭생숭한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "마음이 조금 일렁이는 상태", 압축 내용 "요즘 마음이 이유 없이 조금 일렁이고 있는지도 몰라요.".`

### 결과 4 — 차분히 가라앉음 🌑 (`low`)

- tagline: 조용히 마음을 쉬고 싶은 상태
- body: 지금 당신의 마음은 조용히 가라앉아 쉬고 싶은 상태일 수 있어요. 에너지가 안으로 향하며 잠시 멈춤이 필요한 때죠. 이런 감정도 자연스러운 흐름이니, 스스로를 다그치지 말고 충분히 쉬어주세요. 마음도 회복할 시간이 필요해요.
- 결과 이미지 EN: `A quiet deep dark midnight sky with faint distant stars, calm introspective stillness, deep indigo tones with a soft pink hint, soft Korean webtoon illustration, gentle reflective mood, square 1:1 aspect ratio. Overlaid Korean text — headline "조용히 마음을 쉬고 싶은 상태"; one condensed line "지금 당신의 마음은 조용히 가라앉아 쉬고 싶은 상태일 수 있어요.".`
- 결과 이미지 KO: `희미한 먼 별이 떠 있는 깊고 어두운 자정의 하늘, 차분하고 내면을 향한 고요함, 깊은 인디고 톤에 은은한 핑크 힌트, 부드러운 한국 웹툰풍 일러스트, 잔잔하고 사색적인 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "조용히 마음을 쉬고 싶은 상태", 압축 내용 "지금 당신의 마음은 조용히 가라앉아 쉬고 싶은 상태일 수 있어요.".`

### 면책 문구(footnote)

재미로 보는 심리 테스트예요. 결과는 참고용입니다.

## 4. 무인도에 딱 하나 가져간다면? — `island-value-onepick`

- 착안: **관계 가치 우선순위(관계만족 요인)**
- 보기(물건 5개) → 결과: 연애에서 가장 중요하게 여기는 것
  - 안정감 · 설렘 · 신뢰·소통 · 자유·독립 · 함께 성장

### 기본 정보

- 슬러그: `island-value-onepick`
- 제목: 무인도에 딱 하나 가져간다면?
- 부제: 딱 하나만 챙긴다면, 그게 내 연애의 1순위예요
- 설명(meta description): 무인도에 가져갈 물건 하나로, 연애에서 내가 가장 중요하게 여기는 가치를 알아보는 원픽 테스트.
- 태그: 원픽 / 연애 / 가치관 / 심리
- 문항 문구(prompt): 무인도에 딱 하나만 가져갈 수 있다면?
- 결과 개수: 5
- 보기 라벨: `1번 선택 (담요)` · `2번 선택 (폭죽)` · `3번 선택 (무전기·편지)` · `4번 선택 (나침반)` · `5번 선택 (새싹)`
  - 매핑: 담요→`security`(안정감) / 폭죽→`excitement`(설렘) / 무전기·편지→`trust`(신뢰·소통) / 나침반→`freedom`(자유·독립) / 새싹→`growth`(함께 성장)

### 제목 이미지 프롬프트

- EN: `Five symbolic survival items on a dreamy deserted island, arranged as a numbered set 1 to 5 — a cozy blanket (security), a bundle of fireworks (excitement), a walkie-talkie and letter (trust & communication), a compass (freedom), a small seedling (growth); each item clearly marked with a large legible number 1 to 5, split into panels or one scene is fine but the numbers must be clearly visible, soft Korean webtoon illustration, pink-purple neon ambiance, one-pick relationship-value test thumbnail, square 1:1 aspect ratio. Overlaid Korean text — top small label "ONE-PICK TEST"; title "무인도에 딱 하나 가져간다면?"; instruction "1가지를 골라보세요"; bottom one-line description "무인도에 가져갈 물건 하나로, 연애에서 내가 가장 중요하게 여기는 가치를 알아보는 원픽 테스트".`
- KO: `꿈결 같은 무인도에 놓인 상징적인 물건 5개를 번호 세트 1~5로 배치 — 포근한 담요(안정감), 폭죽 묶음(설렘), 무전기와 편지(신뢰·소통), 나침반(자유), 작은 새싹(성장); 각 물건에 크고 읽기 쉬운 번호 1~5 뚜렷하게, 패널이든 한 장면이든 무방하되 번호는 반드시 잘 보이게, 부드러운 한국 웹툰풍 일러스트, 핑크 퍼플 네온 분위기, 원픽 관계가치 테스트 썸네일, 1:1 정사각형 비율. 오버레이 텍스트 — 상단 작은 라벨 "ONE-PICK TEST", 제목 "무인도에 딱 하나 가져간다면?", 안내 "1가지를 골라보세요", 하단 설명 "무인도에 가져갈 물건 하나로, 연애에서 내가 가장 중요하게 여기는 가치를 알아보는 원픽 테스트".`

### 결과 1 — 안정감 🧣 (`security`)

- tagline: 곁에 있다는 안정감이 가장 중요한 타입
- body: 이런 타입은 연애에서 무엇보다 편안함과 안정감을 소중히 여기는 경향이 있어요. 곁에 있다는 믿음, 흔들리지 않는 관계에서 사랑을 느끼죠. 그 든든함이 관계의 뿌리가 되지만, 익숙함 속에 작은 설렘도 한 번씩 더해보면 좋아요.
- 결과 이미지 EN: `A cozy warm blanket on a deserted island beach at sunset, safe comforting warmth, soft pink-orange tones, soft Korean webtoon illustration, reassuring stable mood, square 1:1 aspect ratio. Overlaid Korean text — headline "곁에 있다는 안정감이 가장 중요한 타입"; one condensed line "이런 타입은 연애에서 무엇보다 편안함과 안정감을 소중히 여기는 경향이 있어요.".`
- 결과 이미지 KO: `노을 지는 무인도 해변에 놓인 포근한 담요, 안전하고 편안한 온기, 부드러운 핑크 오렌지 톤, 부드러운 한국 웹툰풍 일러스트, 든든하고 안정된 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "곁에 있다는 안정감이 가장 중요한 타입", 압축 내용 "이런 타입은 연애에서 무엇보다 편안함과 안정감을 소중히 여기는 경향이 있어요.".`

### 결과 2 — 설렘 🎆 (`excitement`)

- tagline: 두근거림이 살아있어야 하는 타입
- body: 이런 타입은 연애에서 설렘과 생기를 가장 중요하게 여기는 경향이 있어요. 함께 새로운 걸 경험하고 두근거릴 때 사랑을 크게 느끼죠. 그 에너지가 관계를 반짝이게 하지만, 잔잔한 일상의 소중함도 함께 발견하면 더 단단해져요.
- 결과 이미지 EN: `Bright fireworks bursting over a night island sky, thrilling sparkling energy, vivid pink-purple bursts, soft Korean webtoon illustration, exciting lively mood, square 1:1 aspect ratio. Overlaid Korean text — headline "두근거림이 살아있어야 하는 타입"; one condensed line "이런 타입은 연애에서 설렘과 생기를 가장 중요하게 여기는 경향이 있어요.".`
- 결과 이미지 KO: `밤 무인도 하늘에 터지는 화려한 폭죽, 짜릿하고 반짝이는 에너지, 선명한 핑크 퍼플 불꽃, 부드러운 한국 웹툰풍 일러스트, 설레고 활기찬 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "두근거림이 살아있어야 하는 타입", 압축 내용 "이런 타입은 연애에서 설렘과 생기를 가장 중요하게 여기는 경향이 있어요.".`

### 결과 3 — 신뢰·소통 📻 (`trust`)

- tagline: 마음이 통하는 대화가 최우선인 타입
- body: 이런 타입은 연애에서 솔직한 소통과 신뢰를 가장 중요하게 여기는 경향이 있어요. 마음을 나누고 서로를 이해할 때 깊은 안정을 느끼죠. 그 대화의 힘이 관계를 지켜주지만, 말하지 않아도 알아주길 바라는 마음은 한 번씩 표현으로 풀어주면 좋아요.
- 결과 이미지 EN: `A walkie-talkie and a handwritten letter on island sand, warm connecting light, soft pink-amber tones, soft Korean webtoon illustration, heartfelt communicative mood, square 1:1 aspect ratio. Overlaid Korean text — headline "마음이 통하는 대화가 최우선인 타입"; one condensed line "이런 타입은 연애에서 솔직한 소통과 신뢰를 가장 중요하게 여기는 경향이 있어요.".`
- 결과 이미지 KO: `무인도 모래 위 무전기와 손편지, 따뜻하게 이어지는 빛, 부드러운 핑크 앰버 톤, 부드러운 한국 웹툰풍 일러스트, 진솔하게 소통하는 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "마음이 통하는 대화가 최우선인 타입", 압축 내용 "이런 타입은 연애에서 솔직한 소통과 신뢰를 가장 중요하게 여기는 경향이 있어요.".`

### 결과 4 — 자유·독립 🧭 (`freedom`)

- tagline: 각자의 공간을 존중하는 타입
- body: 이런 타입은 연애 속에서도 나만의 시간과 자유를 소중히 여기는 경향이 있어요. 서로에게 여백을 주는 관계에서 편안함을 느끼죠. 그 독립성이 건강한 거리를 만들지만, 가끔은 먼저 다가가 곁을 내어주는 것도 관계에 온기를 더해줘요.
- 결과 이미지 EN: `A compass resting on a rock overlooking an open island horizon, free adventurous openness, cool pink-blue tones, soft Korean webtoon illustration, independent breezy mood, square 1:1 aspect ratio. Overlaid Korean text — headline "각자의 공간을 존중하는 타입"; one condensed line "이런 타입은 연애 속에서도 나만의 시간과 자유를 소중히 여기는 경향이 있어요.".`
- 결과 이미지 KO: `탁 트인 무인도 수평선을 바라보는 바위 위 나침반, 자유롭고 모험적인 개방감, 차가운 핑크 블루 톤, 부드러운 한국 웹툰풍 일러스트, 독립적이고 산뜻한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "각자의 공간을 존중하는 타입", 압축 내용 "이런 타입은 연애 속에서도 나만의 시간과 자유를 소중히 여기는 경향이 있어요.".`

### 결과 5 — 함께 성장 🌱 (`growth`)

- tagline: 같이 자라나는 관계를 꿈꾸는 타입
- body: 이런 타입은 연애를 통해 서로가 더 나은 사람이 되어가길 바라는 경향이 있어요. 함께 목표를 그리고 성장할 때 큰 의미를 느끼죠. 그 방향성이 관계를 깊게 만들지만, 지금 이대로도 충분하다는 걸 서로 확인해 주는 것도 잊지 마세요.
- 결과 이미지 EN: `A small green seedling sprouting from island soil in soft sunlight, hopeful growing energy, fresh green-pink tones, soft Korean webtoon illustration, nurturing forward-looking mood, square 1:1 aspect ratio. Overlaid Korean text — headline "같이 자라나는 관계를 꿈꾸는 타입"; one condensed line "이런 타입은 연애를 통해 서로가 더 나은 사람이 되어가길 바라는 경향이 있어요.".`
- 결과 이미지 KO: `부드러운 햇살 아래 무인도 흙에서 돋아나는 작은 새싹, 희망차게 자라나는 에너지, 산뜻한 그린 핑크 톤, 부드러운 한국 웹툰풍 일러스트, 함께 자라나는 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "같이 자라나는 관계를 꿈꾸는 타입", 압축 내용 "이런 타입은 연애를 통해 서로가 더 나은 사람이 되어가길 바라는 경향이 있어요.".`

### 면책 문구(footnote)

재미로 보는 심리 테스트예요. 결과는 참고용입니다.

## 5. 눈길이 먼저 가는 꽃은? — `flower-charm-onepick`

- 착안: **성격 강점(VIA)·Big Five 특성**
- 보기(꽃 6개) → 결과: 나의 매력 포인트
  - 따뜻함 · 유머 · 지적매력 · 신비로움 · 안정감 · 열정

### 기본 정보

- 슬러그: `flower-charm-onepick`
- 제목: 눈길이 먼저 가는 꽃은?
- 부제: 눈이 먼저 가는 꽃이 나도 몰랐던 매력을 알려줘요
- 설명(meta description): 여섯 송이 꽃 중 눈길이 먼저 가는 하나로, 나의 매력 포인트를 알아보는 원픽 테스트.
- 태그: 원픽 / 매력 / 심리 / 성격
- 문항 문구(prompt): 눈길이 먼저 가는 꽃은?
- 결과 개수: 6
- 보기 라벨: `1번 선택 (해바라기)` · `2번 선택 (프리지아)` · `3번 선택 (라벤더)` · `4번 선택 (다크 로즈)` · `5번 선택 (안개꽃)` · `6번 선택 (붉은 장미)`
  - 매핑: 해바라기→`warmth`(따뜻함) / 프리지아→`humor`(유머) / 라벤더→`intellect`(지적매력) / 다크 로즈→`mystery`(신비로움) / 안개꽃→`stability`(안정감) / 붉은 장미→`passion`(열정)

### 제목 이미지 프롬프트

- EN: `Six different flowers arranged as a numbered set 1 to 6 — a warm sunflower (warmth), a cheerful freesia (humor), soft lavender (intellect), a mysterious dark rose (mystery), gentle baby's breath (stability), a passionate red rose (passion); each flower clearly marked with a large legible number 1 to 6, split into panels or one scene is fine but the numbers must be clearly visible, soft Korean webtoon illustration, pink-purple neon ambiance, one-pick charm test thumbnail, square 1:1 aspect ratio. Overlaid Korean text — top small label "ONE-PICK TEST"; title "눈길이 먼저 가는 꽃은?"; instruction "1가지를 골라보세요"; bottom one-line description "여섯 송이 꽃 중 눈길이 먼저 가는 하나로, 나의 매력 포인트를 알아보는 원픽 테스트".`
- KO: `서로 다른 꽃 6개를 번호 세트 1~6으로 배치 — 따뜻한 해바라기(따뜻함), 발랄한 프리지아(유머), 은은한 라벤더(지적매력), 신비로운 다크 로즈(신비로움), 부드러운 안개꽃(안정감), 정열적인 붉은 장미(열정); 각 꽃에 크고 읽기 쉬운 번호 1~6 뚜렷하게, 패널이든 한 장면이든 무방하되 번호는 반드시 잘 보이게, 부드러운 한국 웹툰풍 일러스트, 핑크 퍼플 네온 분위기, 원픽 매력 테스트 썸네일, 1:1 정사각형 비율. 오버레이 텍스트 — 상단 작은 라벨 "ONE-PICK TEST", 제목 "눈길이 먼저 가는 꽃은?", 안내 "1가지를 골라보세요", 하단 설명 "여섯 송이 꽃 중 눈길이 먼저 가는 하나로, 나의 매력 포인트를 알아보는 원픽 테스트".`

### 결과 1 — 따뜻함 🌻 (`warmth`)

- tagline: 곁에 있으면 마음이 편해지는 매력
- body: 당신의 매력은 따뜻함이에요. 이런 타입은 함께 있으면 편안하고 기분이 좋아지는 분위기를 가진 경향이 있어요. 사람들이 자연스레 곁에 머물고 싶어 하죠. 그 온기를 스스로도 알아봐 주면, 매력이 더 환하게 빛나요.
- 결과 이미지 EN: `A bright sunflower glowing in warm sunlight, cheerful welcoming warmth, soft yellow-pink tones, soft Korean webtoon illustration, friendly inviting mood, square 1:1 aspect ratio. Overlaid Korean text — headline "곁에 있으면 마음이 편해지는 매력"; one condensed line "당신의 매력은 따뜻함이에요.".`
- 결과 이미지 KO: `따뜻한 햇살에 빛나는 밝은 해바라기, 명랑하고 포근한 온기, 부드러운 옐로 핑크 톤, 부드러운 한국 웹툰풍 일러스트, 다정하고 편안한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "곁에 있으면 마음이 편해지는 매력", 압축 내용 "당신의 매력은 따뜻함이에요.".`

### 결과 2 — 유머 🌼 (`humor`)

- tagline: 함께 있으면 웃게 되는 매력
- body: 당신의 매력은 유머예요. 이런 타입은 분위기를 밝게 만들고 사람들을 웃게 하는 재치를 가진 경향이 있어요. 무거운 순간도 가볍게 풀어주죠. 그 경쾌함이 큰 매력이지만, 진지한 마음도 가끔은 솔직히 보여주면 더 깊이 통해요.
- 결과 이미지 EN: `A cheerful bouncy freesia in bloom, playful lively sparkle, bright pink-yellow tones, soft Korean webtoon illustration, witty upbeat mood, square 1:1 aspect ratio. Overlaid Korean text — headline "함께 있으면 웃게 되는 매력"; one condensed line "당신의 매력은 유머예요.".`
- 결과 이미지 KO: `발랄하게 피어난 경쾌한 프리지아, 장난스럽고 생기 있는 반짝임, 밝은 핑크 옐로 톤, 부드러운 한국 웹툰풍 일러스트, 재치 있고 명랑한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "함께 있으면 웃게 되는 매력", 압축 내용 "당신의 매력은 유머예요.".`

### 결과 3 — 지적매력 💜 (`intellect`)

- tagline: 대화할수록 빠져드는 매력
- body: 당신의 매력은 지적인 깊이예요. 이런 타입은 생각이 깊고 대화를 나눌수록 매력이 드러나는 경향이 있어요. 차분한 통찰이 사람들의 호기심을 끌죠. 그 지성을 뽐내지 않아도 자연스레 전해지니, 편하게 당신다운 이야기를 들려주세요.
- 결과 이미지 EN: `Soft lavender sprigs in gentle light, calm intelligent elegance, cool purple-pink tones, soft Korean webtoon illustration, thoughtful refined mood, square 1:1 aspect ratio. Overlaid Korean text — headline "대화할수록 빠져드는 매력"; one condensed line "당신의 매력은 지적인 깊이예요.".`
- 결과 이미지 KO: `은은한 빛 속 부드러운 라벤더 줄기, 차분하고 지적인 우아함, 차가운 퍼플 핑크 톤, 부드러운 한국 웹툰풍 일러스트, 사려 깊고 세련된 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "대화할수록 빠져드는 매력", 압축 내용 "당신의 매력은 지적인 깊이예요.".`

### 결과 4 — 신비로움 🖤 (`mystery`)

- tagline: 더 알고 싶어지는 매력
- body: 당신의 매력은 신비로움이에요. 이런 타입은 쉽게 속을 다 보여주지 않아 궁금증을 자아내는 분위기를 가진 경향이 있어요. 사람들이 더 알고 싶어 다가오죠. 그 여백이 매력이지만, 마음을 연 사람에겐 조금 더 보여줘도 관계가 깊어져요.
- 결과 이미지 EN: `A mysterious dark rose under moonlight, alluring enigmatic aura, deep purple-magenta tones, soft Korean webtoon illustration, intriguing mood, square 1:1 aspect ratio. Overlaid Korean text — headline "더 알고 싶어지는 매력"; one condensed line "당신의 매력은 신비로움이에요.".`
- 결과 이미지 KO: `달빛 아래 신비로운 다크 로즈, 매혹적이고 알 수 없는 아우라, 깊은 퍼플 마젠타 톤, 부드러운 한국 웹툰풍 일러스트, 호기심을 자아내는 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "더 알고 싶어지는 매력", 압축 내용 "당신의 매력은 신비로움이에요.".`

### 결과 5 — 안정감 🤍 (`stability`)

- tagline: 함께 있으면 든든해지는 매력
- body: 당신의 매력은 안정감이에요. 이런 타입은 곁에 있으면 마음이 놓이고 신뢰가 가는 분위기를 가진 경향이 있어요. 요란하지 않아도 은은하게 오래 남죠. 그 차분한 매력이 큰 강점이니, 당신의 그 편안함을 자신 있게 여겨도 좋아요.
- 결과 이미지 EN: `Delicate baby's breath flowers softly clustered, gentle reassuring calm, soft white-pink tones, soft Korean webtoon illustration, serene dependable mood, square 1:1 aspect ratio. Overlaid Korean text — headline "함께 있으면 든든해지는 매력"; one condensed line "당신의 매력은 안정감이에요.".`
- 결과 이미지 KO: `부드럽게 모여 핀 섬세한 안개꽃, 은은하고 편안한 안정감, 부드러운 화이트 핑크 톤, 부드러운 한국 웹툰풍 일러스트, 잔잔하고 믿음직한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "함께 있으면 든든해지는 매력", 압축 내용 "당신의 매력은 안정감이에요.".`

### 결과 6 — 열정 🌹 (`passion`)

- tagline: 눈길을 사로잡는 강렬한 매력
- body: 당신의 매력은 열정이에요. 이런 타입은 생기와 에너지가 넘쳐 시선을 사로잡는 존재감을 가진 경향이 있어요. 좋아하는 것에 몰입하는 모습이 특히 빛나죠. 그 뜨거움이 큰 매력이니, 그대로의 당신을 마음껏 드러내 보세요.
- 결과 이미지 EN: `A vivid red rose in full bloom, bold passionate presence, rich red-pink tones, soft Korean webtoon illustration, striking energetic mood, square 1:1 aspect ratio. Overlaid Korean text — headline "눈길을 사로잡는 강렬한 매력"; one condensed line "당신의 매력은 열정이에요.".`
- 결과 이미지 KO: `활짝 핀 선명한 붉은 장미, 대담하고 정열적인 존재감, 짙은 레드 핑크 톤, 부드러운 한국 웹툰풍 일러스트, 강렬하고 활기찬 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "눈길을 사로잡는 강렬한 매력", 압축 내용 "당신의 매력은 열정이에요.".`

### 면책 문구(footnote)

재미로 보는 심리 테스트예요. 결과는 참고용입니다.

## 6. 지금 보내고 싶은 이모지는? — `emoji-crush-onepick`

- 착안: **성인 애착유형(attachment)**
- 보기(이모지 4개) → 결과: 나의 썸 태도
  - 편안한 직진형(안정) · 확인받고 싶은형(불안) · 거리 두는형(회피) · 밀당형(양가)

### 기본 정보

- 슬러그: `emoji-crush-onepick`
- 제목: 지금 보내고 싶은 이모지는?
- 부제: 지금 보내고 싶은 이모지가 내 썸 태도를 알려줘요
- 설명(meta description): 네 개의 이모지 중 지금 보내고 싶은 하나로, 썸 탈 때 나의 태도를 알아보는 원픽 테스트.
- 태그: 원픽 / 썸 / 연애 / 심리
- 문항 문구(prompt): 지금 이 사람에게 보내고 싶은 이모지는?
- 결과 개수: 4
- 보기 라벨: `1번 선택 (❤️)` · `2번 선택 (🥺)` · `3번 선택 (😎)` · `4번 선택 (😏)`
  - 매핑: ❤️→`secure`(편안한 직진형) / 🥺→`anxious`(확인받고 싶은형) / 😎→`avoidant`(거리 두는형) / 😏→`ambivalent`(밀당형)

### 제목 이미지 프롬프트

- EN: `Four expressive chat emoji bubbles arranged as a numbered set 1 to 4 — a bold heart (straightforward), a teary pleading face (anxious), a cool sunglasses face (distant), a smirking playful face (push-and-pull); each emoji clearly marked with a large legible number 1 to 4, split into panels or one scene is fine but the numbers must be clearly visible, soft Korean webtoon illustration, pink-purple neon ambiance, one-pick crush-attitude test thumbnail, square 1:1 aspect ratio. Overlaid Korean text — top small label "ONE-PICK TEST"; title "지금 보내고 싶은 이모지는?"; instruction "1가지를 골라보세요"; bottom one-line description "네 개의 이모지 중 지금 보내고 싶은 하나로, 썸 탈 때 나의 태도를 알아보는 원픽 테스트".`
- KO: `표정이 살아있는 채팅 이모지 말풍선 4개를 번호 세트 1~4로 배치 — 대담한 하트(직진), 눈물 그렁 애원하는 얼굴(불안), 쿨한 선글라스 얼굴(거리두기), 능글맞게 웃는 얼굴(밀당); 각 이모지에 크고 읽기 쉬운 번호 1~4 뚜렷하게, 패널이든 한 장면이든 무방하되 번호는 반드시 잘 보이게, 부드러운 한국 웹툰풍 일러스트, 핑크 퍼플 네온 분위기, 원픽 썸태도 테스트 썸네일, 1:1 정사각형 비율. 오버레이 텍스트 — 상단 작은 라벨 "ONE-PICK TEST", 제목 "지금 보내고 싶은 이모지는?", 안내 "1가지를 골라보세요", 하단 설명 "네 개의 이모지 중 지금 보내고 싶은 하나로, 썸 탈 때 나의 태도를 알아보는 원픽 테스트".`

### 결과 1 — 편안한 직진형 ❤️ (`secure`)

- tagline: 마음을 편하게 표현하는 타입
- body: 이런 타입은 좋아하는 마음을 자연스럽고 편안하게 표현하는 경향이 있어요. 밀당보다 솔직함이 편하고, 상대에게도 안정감을 주죠. 그 담백함이 큰 매력이니, 지금처럼 당신다운 방식으로 다가가면 좋은 흐름이 이어질 거예요.
- 결과 이미지 EN: `A warm bold heart emoji glowing in a chat bubble, confident affectionate warmth, soft pink-red tones, soft Korean webtoon illustration, secure open mood, square 1:1 aspect ratio. Overlaid Korean text — headline "마음을 편하게 표현하는 타입"; one condensed line "이런 타입은 좋아하는 마음을 자연스럽고 편안하게 표현하는 경향이 있어요.".`
- 결과 이미지 KO: `채팅 말풍선 속 빛나는 따뜻하고 대담한 하트 이모지, 자신감 있고 다정한 온기, 부드러운 핑크 레드 톤, 부드러운 한국 웹툰풍 일러스트, 안정적이고 솔직한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "마음을 편하게 표현하는 타입", 압축 내용 "이런 타입은 좋아하는 마음을 자연스럽고 편안하게 표현하는 경향이 있어요.".`

### 결과 2 — 확인받고 싶은형 🥺 (`anxious`)

- tagline: 상대의 마음을 자주 확인하고 싶은 타입
- body: 이런 타입은 상대의 마음이 궁금해 자주 확인하고 싶어지는 경향이 있어요. 그만큼 애정이 깊고 관계에 진심이죠. 다만 답장이 늦어도 마음이 식은 건 아니라는 걸 기억하면, 불안이 줄고 관계가 한결 편안해져요.
- 결과 이미지 EN: `A teary pleading emoji in a chat bubble, tender longing expression, soft pink-lavender tones, soft Korean webtoon illustration, hopeful anxious mood, square 1:1 aspect ratio. Overlaid Korean text — headline "상대의 마음을 자주 확인하고 싶은 타입"; one condensed line "이런 타입은 상대의 마음이 궁금해 자주 확인하고 싶어지는 경향이 있어요.".`
- 결과 이미지 KO: `채팅 말풍선 속 눈물 그렁 애원하는 이모지, 애틋하게 바라는 표정, 부드러운 핑크 라벤더 톤, 부드러운 한국 웹툰풍 일러스트, 기대와 불안이 섞인 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "상대의 마음을 자주 확인하고 싶은 타입", 압축 내용 "이런 타입은 상대의 마음이 궁금해 자주 확인하고 싶어지는 경향이 있어요.".`

### 결과 3 — 거리 두는형 😎 (`avoidant`)

- tagline: 천천히, 나만의 속도로 다가가는 타입
- body: 이런 타입은 마음이 있어도 서두르지 않고 나만의 속도를 지키는 경향이 있어요. 감정을 쉽게 드러내기보다 여유 있게 지켜보죠. 그 담담함이 편안함을 주지만, 가끔은 마음을 한 뼘 더 표현해 주면 상대도 안심할 수 있어요.
- 결과 이미지 EN: `A cool sunglasses emoji in a chat bubble, relaxed composed confidence, cool blue-pink tones, soft Korean webtoon illustration, easygoing distant mood, square 1:1 aspect ratio. Overlaid Korean text — headline "천천히, 나만의 속도로 다가가는 타입"; one condensed line "이런 타입은 마음이 있어도 서두르지 않고 나만의 속도를 지키는 경향이 있어요.".`
- 결과 이미지 KO: `채팅 말풍선 속 쿨한 선글라스 이모지, 여유롭고 침착한 자신감, 차가운 블루 핑크 톤, 부드러운 한국 웹툰풍 일러스트, 느긋하고 거리감 있는 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "천천히, 나만의 속도로 다가가는 타입", 압축 내용 "이런 타입은 마음이 있어도 서두르지 않고 나만의 속도를 지키는 경향이 있어요.".`

### 결과 4 — 밀당형 😏 (`ambivalent`)

- tagline: 다가갔다 물러섰다, 리듬을 타는 타입
- body: 이런 타입은 다가가고 싶은 마음과 재고 싶은 마음이 함께 있어, 밀당의 리듬을 타는 경향이 있어요. 그 긴장감이 설렘을 키우기도 하죠. 다만 진심이 통하는 순간엔 한 번쯤 솔직하게 마음을 보여주면, 관계가 더 깊어져요.
- 결과 이미지 EN: `A smirking playful emoji in a chat bubble, teasing charming vibe, warm pink-purple tones, soft Korean webtoon illustration, flirty push-and-pull mood, square 1:1 aspect ratio. Overlaid Korean text — headline "다가갔다 물러섰다, 리듬을 타는 타입"; one condensed line "이런 타입은 다가가고 싶은 마음과 재고 싶은 마음이 함께 있어, 밀당의 리듬을 타는 경향이 있어요.".`
- 결과 이미지 KO: `채팅 말풍선 속 능글맞게 웃는 이모지, 짓궂고 매력적인 느낌, 따뜻한 핑크 퍼플 톤, 부드러운 한국 웹툰풍 일러스트, 밀당하는 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "다가갔다 물러섰다, 리듬을 타는 타입", 압축 내용 "이런 타입은 다가가고 싶은 마음과 재고 싶은 마음이 함께 있어, 밀당의 리듬을 타는 경향이 있어요.".`

### 면책 문구(footnote)

재미로 보는 심리 테스트예요. 결과는 참고용입니다.

## 7. 창밖 날씨 중 지금 나는? — `weather-relationship-onepick`

- 착안: **관계 정서 상태·관계 단계**
- 보기(날씨 4개) → 결과: 요즘 내 연애 기류
  - 맑음(안정·만족) · 흐림(권태·불확실) · 비(상처·소강) · 바람(설렘·변화의 조짐)

### 기본 정보

- 슬러그: `weather-relationship-onepick`
- 제목: 창밖 날씨 중 지금 나는?
- 부제: 지금 끌리는 날씨가 요즘 내 연애 기류를 알려줘요
- 설명(meta description): 네 가지 날씨 중 지금 내 마음 같은 하나로, 요즘 연애 기류를 돌아보는 원픽 테스트.
- 태그: 원픽 / 연애 / 감정 / 관계
- 문항 문구(prompt): 지금 내 마음 같은 창밖 날씨는?
- 결과 개수: 4
- 보기 라벨: `1번 선택 (맑음)` · `2번 선택 (흐림)` · `3번 선택 (비)` · `4번 선택 (바람)`
  - 매핑: 맑음→`clear`(안정·만족) / 흐림→`cloudy`(권태·불확실) / 비→`rain`(상처·소강) / 바람→`wind`(설렘·변화)

### 제목 이미지 프롬프트

- EN: `Four window views showing different weather, arranged as a numbered set 1 to 4 — a clear sunny sky (stable), a cloudy grey sky (boredom/uncertainty), gentle rain on the glass (hurt/lull), gusty wind with drifting petals (excitement/change); each view clearly marked with a large legible number 1 to 4, split into panels or one scene is fine but the numbers must be clearly visible, soft Korean webtoon illustration, pink-purple neon ambiance, one-pick relationship-weather test thumbnail, square 1:1 aspect ratio. Overlaid Korean text — top small label "ONE-PICK TEST"; title "창밖 날씨 중 지금 나는?"; instruction "1가지를 골라보세요"; bottom one-line description "네 가지 날씨 중 지금 내 마음 같은 하나로, 요즘 연애 기류를 돌아보는 원픽 테스트".`
- KO: `서로 다른 날씨의 창밖 풍경 4개를 번호 세트 1~4로 배치 — 맑은 하늘(안정), 흐린 잿빛 하늘(권태·불확실), 유리창에 부드럽게 내리는 비(상처·소강), 꽃잎이 날리는 바람(설렘·변화); 각 풍경에 크고 읽기 쉬운 번호 1~4 뚜렷하게, 패널이든 한 장면이든 무방하되 번호는 반드시 잘 보이게, 부드러운 한국 웹툰풍 일러스트, 핑크 퍼플 네온 분위기, 원픽 연애기류 테스트 썸네일, 1:1 정사각형 비율. 오버레이 텍스트 — 상단 작은 라벨 "ONE-PICK TEST", 제목 "창밖 날씨 중 지금 나는?", 안내 "1가지를 골라보세요", 하단 설명 "네 가지 날씨 중 지금 내 마음 같은 하나로, 요즘 연애 기류를 돌아보는 원픽 테스트".`

### 결과 1 — 맑음 ☀️ (`clear`)

- tagline: 안정되고 만족스러운 기류
- body: 요즘 당신의 연애 기류는 맑음이에요. 큰 흔들림 없이 안정되고 서로에게 만족을 느끼는 시기일 수 있어요. 이런 때는 그 편안함을 당연하게 여기지 말고, 작은 고마움을 한 번씩 표현해 주면 맑은 날이 더 오래가요.
- 결과 이미지 EN: `A clear bright blue sky seen through a cozy window, calm satisfied warmth, soft blue-pink tones, soft Korean webtoon illustration, peaceful content mood, square 1:1 aspect ratio. Overlaid Korean text — headline "안정되고 만족스러운 기류"; one condensed line "요즘 당신의 연애 기류는 맑음이에요.".`
- 결과 이미지 KO: `아늑한 창 너머 맑고 밝은 파란 하늘, 차분하고 만족스러운 온기, 부드러운 블루 핑크 톤, 부드러운 한국 웹툰풍 일러스트, 평화롭고 만족스러운 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "안정되고 만족스러운 기류", 압축 내용 "요즘 당신의 연애 기류는 맑음이에요.".`

### 결과 2 — 흐림 ☁️ (`cloudy`)

- tagline: 조금 무뎌지고 불확실한 기류
- body: 요즘 당신의 연애 기류는 살짝 흐림일 수 있어요. 익숙해지며 설렘이 무뎌지거나, 마음이 조금 불확실해지는 시기죠. 이런 땐 크게 걱정하기보다, 함께 새로운 걸 해보거나 솔직한 대화를 나누면 흐림이 걷히기도 해요.
- 결과 이미지 EN: `A soft grey cloudy sky through a window, quiet uncertain calm, muted grey-pink tones, soft Korean webtoon illustration, contemplative hazy mood, square 1:1 aspect ratio. Overlaid Korean text — headline "조금 무뎌지고 불확실한 기류"; one condensed line "요즘 당신의 연애 기류는 살짝 흐림일 수 있어요.".`
- 결과 이미지 KO: `창 너머 부드러운 잿빛 흐린 하늘, 조용하고 불확실한 차분함, 차분한 그레이 핑크 톤, 부드러운 한국 웹툰풍 일러스트, 생각에 잠긴 흐릿한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "조금 무뎌지고 불확실한 기류", 압축 내용 "요즘 당신의 연애 기류는 살짝 흐림일 수 있어요.".`

### 결과 3 — 비 🌧️ (`rain`)

- tagline: 마음이 조금 젖어드는 기류
- body: 요즘 당신의 연애 기류는 비가 내리는 것 같을 수 있어요. 작은 서운함이나 상처로 마음이 촉촉해지는 시기죠. 이런 감정도 관계의 자연스러운 한 부분이에요. 비가 그치면 공기가 맑아지듯, 마음을 나누다 보면 한결 개운해질 거예요.
- 결과 이미지 EN: `Gentle rain streaming down a window glass, soft melancholic calm, cool blue-lavender tones, soft Korean webtoon illustration, tender wistful mood, square 1:1 aspect ratio. Overlaid Korean text — headline "마음이 조금 젖어드는 기류"; one condensed line "요즘 당신의 연애 기류는 비가 내리는 것 같을 수 있어요.".`
- 결과 이미지 KO: `창유리를 타고 부드럽게 흐르는 비, 은은하고 아련한 차분함, 차가운 블루 라벤더 톤, 부드러운 한국 웹툰풍 일러스트, 애틋하고 촉촉한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "마음이 조금 젖어드는 기류", 압축 내용 "요즘 당신의 연애 기류는 비가 내리는 것 같을 수 있어요.".`

### 결과 4 — 바람 🍃 (`wind`)

- tagline: 변화의 설렘이 부는 기류
- body: 요즘 당신의 연애 기류엔 바람이 불고 있어요. 새로운 설렘이나 변화의 조짐이 느껴지는 시기죠. 그 산뜻한 바람은 관계에 활력을 주기도 해요. 어디로 부는 바람인지 가만히 느껴보면, 지금 내 마음이 바라는 방향이 보일 거예요.
- 결과 이미지 EN: `A breezy sky with drifting petals past a window, fresh stirring movement, light pink-green tones, soft Korean webtoon illustration, hopeful changing mood, square 1:1 aspect ratio. Overlaid Korean text — headline "변화의 설렘이 부는 기류"; one condensed line "요즘 당신의 연애 기류엔 바람이 불고 있어요.".`
- 결과 이미지 KO: `창 너머 꽃잎이 흩날리는 산들바람 부는 하늘, 산뜻하게 일렁이는 움직임, 밝은 핑크 그린 톤, 부드러운 한국 웹툰풍 일러스트, 설레는 변화의 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "변화의 설렘이 부는 기류", 압축 내용 "요즘 당신의 연애 기류엔 바람이 불고 있어요.".`

### 면책 문구(footnote)

재미로 보는 심리 테스트예요. 결과는 참고용입니다.

## 8. 카페에서 고르는 자리는? — `cafe-seat-onepick`

- 착안: **대인거리(프록세믹스)·자기개방**
- 보기(자리 5개) → 결과: 관계에서 두는 거리감
  - 창가(관찰형) · 중앙(개방형) · 구석(안전추구형) · 문가(여지형) · 바 자리(독립형)

### 기본 정보

- 슬러그: `cafe-seat-onepick`
- 제목: 카페에서 고르는 자리는?
- 부제: 무심코 고른 자리가 관계 속 내 거리감을 알려줘요
- 설명(meta description): 카페에서 끌리는 자리 하나로, 관계에서 내가 두는 거리감을 알아보는 원픽 테스트.
- 태그: 원픽 / 관계 / 심리 / 성향
- 문항 문구(prompt): 카페에 들어서면 어디에 앉고 싶어요?
- 결과 개수: 5
- 보기 라벨: `1번 선택 (창가)` · `2번 선택 (중앙 테이블)` · `3번 선택 (구석)` · `4번 선택 (문가)` · `5번 선택 (바 자리)`
  - 매핑: 창가→`window`(관찰형) / 중앙→`center`(개방형) / 구석→`corner`(안전추구형) / 문가→`door`(여지형) / 바→`bar`(독립형)

### 제목 이미지 프롬프트

- EN: `A cozy cafe interior seen from above with five highlighted seats, arranged as a numbered set 1 to 5 — a window seat (observer), a central table (open), a corner nook (safe), a seat by the door (open-ended), a solo bar seat (independent); each seat clearly marked with a large legible number 1 to 5, split into panels or one scene is fine but the numbers must be clearly visible, soft Korean webtoon illustration, pink-purple neon ambiance, one-pick closeness test thumbnail, square 1:1 aspect ratio. Overlaid Korean text — top small label "ONE-PICK TEST"; title "카페에서 고르는 자리는?"; instruction "1가지를 골라보세요"; bottom one-line description "카페에서 끌리는 자리 하나로, 관계에서 내가 두는 거리감을 알아보는 원픽 테스트".`
- KO: `위에서 내려다본 아늑한 카페 내부에 강조된 자리 5개를 번호 세트 1~5로 배치 — 창가 자리(관찰형), 중앙 테이블(개방형), 구석 자리(안전추구형), 문가 자리(여지형), 혼자 앉는 바 자리(독립형); 각 자리에 크고 읽기 쉬운 번호 1~5 뚜렷하게, 패널이든 한 장면이든 무방하되 번호는 반드시 잘 보이게, 부드러운 한국 웹툰풍 일러스트, 핑크 퍼플 네온 분위기, 원픽 거리감 테스트 썸네일, 1:1 정사각형 비율. 오버레이 텍스트 — 상단 작은 라벨 "ONE-PICK TEST", 제목 "카페에서 고르는 자리는?", 안내 "1가지를 골라보세요", 하단 설명 "카페에서 끌리는 자리 하나로, 관계에서 내가 두는 거리감을 알아보는 원픽 테스트".`

### 결과 1 — 관찰형 🪟 (`window`)

- tagline: 한 발 떨어져 지켜보는 거리감
- body: 이런 타입은 관계에서 한 발 떨어져 상대와 상황을 찬찬히 바라보는 경향이 있어요. 성급하게 다가가기보다 신중하게 마음을 여는 편이죠. 그 관찰력이 오해를 줄이지만, 마음이 든 사람에겐 먼저 한 걸음 다가가 보는 것도 좋아요.
- 결과 이미지 EN: `A cozy window seat in a cafe with soft daylight, calm observing distance, warm pink-cream tones, soft Korean webtoon illustration, quiet thoughtful mood, square 1:1 aspect ratio. Overlaid Korean text — headline "한 발 떨어져 지켜보는 거리감"; one condensed line "이런 타입은 관계에서 한 발 떨어져 상대와 상황을 찬찬히 바라보는 경향이 있어요.".`
- 결과 이미지 KO: `부드러운 햇빛이 드는 카페 창가 자리, 차분히 지켜보는 거리감, 따뜻한 핑크 크림 톤, 부드러운 한국 웹툰풍 일러스트, 조용하고 사려 깊은 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "한 발 떨어져 지켜보는 거리감", 압축 내용 "이런 타입은 관계에서 한 발 떨어져 상대와 상황을 찬찬히 바라보는 경향이 있어요.".`

### 결과 2 — 개방형 🪑 (`center`)

- tagline: 열린 마음으로 다가가는 거리감
- body: 이런 타입은 관계에서 마음을 열고 사람들과 가까이 어울리는 경향이 있어요. 낯선 사이도 금세 편하게 만드는 힘이 있죠. 그 개방성이 큰 매력이지만, 가끔은 나만의 여백도 챙기면 관계가 더 오래 편안해져요.
- 결과 이미지 EN: `A central table in a lively cafe, open sociable warmth, bright pink-yellow tones, soft Korean webtoon illustration, friendly welcoming mood, square 1:1 aspect ratio. Overlaid Korean text — headline "열린 마음으로 다가가는 거리감"; one condensed line "이런 타입은 관계에서 마음을 열고 사람들과 가까이 어울리는 경향이 있어요.".`
- 결과 이미지 KO: `활기찬 카페 중앙 테이블, 열려 있고 사교적인 온기, 밝은 핑크 옐로 톤, 부드러운 한국 웹툰풍 일러스트, 다정하고 개방적인 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "열린 마음으로 다가가는 거리감", 압축 내용 "이런 타입은 관계에서 마음을 열고 사람들과 가까이 어울리는 경향이 있어요.".`

### 결과 3 — 안전추구형 🛋️ (`corner`)

- tagline: 편안한 안전지대를 지키는 거리감
- body: 이런 타입은 관계에서 안전하고 편안한 거리를 지키려는 경향이 있어요. 신뢰가 쌓이기 전엔 마음을 조심스레 열죠. 그 신중함이 나를 지켜주지만, 믿을 만한 사람에겐 조금 더 기대어도 관계가 따뜻해져요.
- 결과 이미지 EN: `A snug corner nook seat in a cafe, safe cozy shelter, soft warm brown-pink tones, soft Korean webtoon illustration, secure calm mood, square 1:1 aspect ratio. Overlaid Korean text — headline "편안한 안전지대를 지키는 거리감"; one condensed line "이런 타입은 관계에서 안전하고 편안한 거리를 지키려는 경향이 있어요.".`
- 결과 이미지 KO: `카페의 아늑한 구석 자리, 안전하고 포근한 안식처, 부드러운 브라운 핑크 톤, 부드러운 한국 웹툰풍 일러스트, 안정되고 차분한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "편안한 안전지대를 지키는 거리감", 압축 내용 "이런 타입은 관계에서 안전하고 편안한 거리를 지키려는 경향이 있어요.".`

### 결과 4 — 여지형 🚪 (`door`)

- tagline: 언제든 움직일 여지를 두는 거리감
- body: 이런 타입은 관계에서 완전히 몰입하기보다 나갈 수 있는 여지를 두는 경향이 있어요. 부담 없는 거리에서 편안함을 느끼죠. 그 유연함이 자유를 주지만, 마음이 통하는 사람 앞에선 한 번쯤 깊이 머물러 봐도 좋아요.
- 결과 이미지 EN: `A seat near the cafe door with soft light, open-ended breezy freedom, cool pink-mint tones, soft Korean webtoon illustration, light unattached mood, square 1:1 aspect ratio. Overlaid Korean text — headline "언제든 움직일 여지를 두는 거리감"; one condensed line "이런 타입은 관계에서 완전히 몰입하기보다 나갈 수 있는 여지를 두는 경향이 있어요.".`
- 결과 이미지 KO: `부드러운 빛이 드는 카페 문가 자리, 언제든 나설 수 있는 산뜻한 자유, 차가운 핑크 민트 톤, 부드러운 한국 웹툰풍 일러스트, 가볍고 얽매이지 않는 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "언제든 움직일 여지를 두는 거리감", 압축 내용 "이런 타입은 관계에서 완전히 몰입하기보다 나갈 수 있는 여지를 두는 경향이 있어요.".`

### 결과 5 — 독립형 🍸 (`bar`)

- tagline: 혼자여도 충분한 단단한 거리감
- body: 이런 타입은 관계 속에서도 나만의 독립을 소중히 여기는 경향이 있어요. 혼자만의 시간에서 힘을 얻고, 기대기보다 스스로 서는 편이죠. 그 단단함이 강점이지만, 가끔은 곁을 내어주고 함께 기대는 것도 관계에 온기를 더해줘요.
- 결과 이미지 EN: `A solo bar seat by a cafe counter, independent self-assured calm, sleek pink-blue tones, soft Korean webtoon illustration, composed autonomous mood, square 1:1 aspect ratio. Overlaid Korean text — headline "혼자여도 충분한 단단한 거리감"; one condensed line "이런 타입은 관계 속에서도 나만의 독립을 소중히 여기는 경향이 있어요.".`
- 결과 이미지 KO: `카페 카운터 옆 혼자 앉는 바 자리, 독립적이고 자신감 있는 차분함, 세련된 핑크 블루 톤, 부드러운 한국 웹툰풍 일러스트, 침착하고 자율적인 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "혼자여도 충분한 단단한 거리감", 압축 내용 "이런 타입은 관계 속에서도 나만의 독립을 소중히 여기는 경향이 있어요.".`

### 면책 문구(footnote)

재미로 보는 심리 테스트예요. 결과는 참고용입니다.

## 9. 지금 껴안고 싶은 인형은? — `doll-love-onepick`

- 착안: **스턴버그 사랑의 삼각이론(친밀·열정·헌신)**
- 보기(인형 4개) → 결과: 내가 원하는 사랑의 형태
  - 곰(친밀·안정형) · 토끼(열정·설렘형) · 강아지(헌신·동반형) · 고양이(자유·독립형)

### 기본 정보

- 슬러그: `doll-love-onepick`
- 제목: 지금 껴안고 싶은 인형은?
- 부제: 지금 껴안고 싶은 인형이 내가 바라는 사랑을 알려줘요
- 설명(meta description): 네 인형 중 지금 껴안고 싶은 하나로, 내가 원하는 사랑의 형태를 알아보는 원픽 테스트.
- 태그: 원픽 / 사랑 / 연애 / 심리
- 문항 문구(prompt): 지금 가장 껴안고 싶은 인형은?
- 결과 개수: 4
- 보기 라벨: `1번 선택 (곰인형)` · `2번 선택 (토끼)` · `3번 선택 (강아지)` · `4번 선택 (고양이)`
  - 매핑: 곰→`bear`(친밀·안정형) / 토끼→`bunny`(열정·설렘형) / 강아지→`puppy`(헌신·동반형) / 고양이→`cat`(자유·독립형)

### 제목 이미지 프롬프트

- EN: `Four cute plush dolls arranged as a numbered set 1 to 4 — a warm teddy bear (intimacy/stability), a lively bunny (passion/excitement), a loyal puppy (devotion/companionship), a cool independent cat (freedom); each doll clearly marked with a large legible number 1 to 4, split into panels or one scene is fine but the numbers must be clearly visible, soft Korean webtoon illustration, pink-purple neon ambiance, one-pick love-shape test thumbnail, square 1:1 aspect ratio. Overlaid Korean text — top small label "ONE-PICK TEST"; title "지금 껴안고 싶은 인형은?"; instruction "1가지를 골라보세요"; bottom one-line description "네 인형 중 지금 껴안고 싶은 하나로, 내가 원하는 사랑의 형태를 알아보는 원픽 테스트".`
- KO: `귀여운 인형 4개를 번호 세트 1~4로 배치 — 따뜻한 곰인형(친밀·안정), 발랄한 토끼(열정·설렘), 충직한 강아지(헌신·동반), 쿨한 고양이(자유·독립); 각 인형에 크고 읽기 쉬운 번호 1~4 뚜렷하게, 패널이든 한 장면이든 무방하되 번호는 반드시 잘 보이게, 부드러운 한국 웹툰풍 일러스트, 핑크 퍼플 네온 분위기, 원픽 사랑형태 테스트 썸네일, 1:1 정사각형 비율. 오버레이 텍스트 — 상단 작은 라벨 "ONE-PICK TEST", 제목 "지금 껴안고 싶은 인형은?", 안내 "1가지를 골라보세요", 하단 설명 "네 인형 중 지금 껴안고 싶은 하나로, 내가 원하는 사랑의 형태를 알아보는 원픽 테스트".`

### 결과 1 — 친밀·안정형 🧸 (`bear`)

- tagline: 포근한 안정감을 바라는 사랑
- body: 지금 당신은 포근하고 안정된 사랑을 바라고 있는지도 몰라요. 이런 타입은 곁에 있다는 편안함과 깊은 친밀감에서 사랑을 느끼는 경향이 있어요. 든든한 관계가 큰 힘이 되죠. 그 안정 위에 가끔 설렘을 더하면 사랑이 더 풍성해져요.
- 결과 이미지 EN: `A warm fluffy teddy bear in soft light, cozy secure comfort, gentle pink-brown tones, soft Korean webtoon illustration, warm intimate mood, square 1:1 aspect ratio. Overlaid Korean text — headline "포근한 안정감을 바라는 사랑"; one condensed line "지금 당신은 포근하고 안정된 사랑을 바라고 있는지도 몰라요.".`
- 결과 이미지 KO: `부드러운 빛 속 따뜻하고 폭신한 곰인형, 아늑하고 안정된 편안함, 은은한 핑크 브라운 톤, 부드러운 한국 웹툰풍 일러스트, 따뜻하고 친밀한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "포근한 안정감을 바라는 사랑", 압축 내용 "지금 당신은 포근하고 안정된 사랑을 바라고 있는지도 몰라요.".`

### 결과 2 — 열정·설렘형 🐰 (`bunny`)

- tagline: 두근거리는 설렘을 바라는 사랑
- body: 지금 당신은 두근거리고 생기 넘치는 사랑을 바라고 있는지도 몰라요. 이런 타입은 설렘과 열정에서 사랑을 크게 느끼는 경향이 있어요. 함께 반짝이는 순간이 소중하죠. 그 에너지에 잔잔한 신뢰가 더해지면 오래도록 설렐 수 있어요.
- 결과 이미지 EN: `A lively cute bunny plush with sparkling eyes, playful excited energy, bright pink tones, soft Korean webtoon illustration, cheerful fluttering mood, square 1:1 aspect ratio. Overlaid Korean text — headline "두근거리는 설렘을 바라는 사랑"; one condensed line "지금 당신은 두근거리고 생기 넘치는 사랑을 바라고 있는지도 몰라요.".`
- 결과 이미지 KO: `반짝이는 눈의 발랄하고 귀여운 토끼 인형, 장난스럽고 설레는 에너지, 밝은 핑크 톤, 부드러운 한국 웹툰풍 일러스트, 명랑하게 두근거리는 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "두근거리는 설렘을 바라는 사랑", 압축 내용 "지금 당신은 두근거리고 생기 넘치는 사랑을 바라고 있는지도 몰라요.".`

### 결과 3 — 헌신·동반형 🐶 (`puppy`)

- tagline: 곁을 지키는 다정한 사랑
- body: 지금 당신은 서로 곁을 지켜주는 다정한 사랑을 바라고 있는지도 몰라요. 이런 타입은 함께하는 시간과 변함없는 애정에서 사랑을 느끼는 경향이 있어요. 든든한 동반자 같은 관계를 그리죠. 그 헌신 속에서 나를 챙기는 것도 잊지 마세요.
- 결과 이미지 EN: `A loyal cute puppy plush wagging happily, devoted companionable warmth, soft pink-cream tones, soft Korean webtoon illustration, faithful loving mood, square 1:1 aspect ratio. Overlaid Korean text — headline "곁을 지키는 다정한 사랑"; one condensed line "지금 당신은 서로 곁을 지켜주는 다정한 사랑을 바라고 있는지도 몰라요.".`
- 결과 이미지 KO: `행복하게 꼬리 흔드는 충직하고 귀여운 강아지 인형, 헌신적이고 다정한 온기, 부드러운 핑크 크림 톤, 부드러운 한국 웹툰풍 일러스트, 변함없이 사랑스러운 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "곁을 지키는 다정한 사랑", 압축 내용 "지금 당신은 서로 곁을 지켜주는 다정한 사랑을 바라고 있는지도 몰라요.".`

### 결과 4 — 자유·독립형 🐱 (`cat`)

- tagline: 각자의 결을 지키는 사랑
- body: 지금 당신은 서로의 자유를 존중하는 사랑을 바라고 있는지도 몰라요. 이런 타입은 적당한 거리와 각자의 시간이 있는 관계에서 편안함을 느끼는 경향이 있어요. 붙어 있지 않아도 통하는 사이를 좋아하죠. 그 여백 속에 가끔의 다가감이 더해지면 사랑이 더 깊어져요.
- 결과 이미지 EN: `A cool independent cat plush with a calm gaze, self-possessed graceful vibe, soft pink-grey tones, soft Korean webtoon illustration, serene autonomous mood, square 1:1 aspect ratio. Overlaid Korean text — headline "각자의 결을 지키는 사랑"; one condensed line "지금 당신은 서로의 자유를 존중하는 사랑을 바라고 있는지도 몰라요.".`
- 결과 이미지 KO: `차분한 눈빛의 쿨하고 독립적인 고양이 인형, 자기만의 결이 있는 우아한 느낌, 부드러운 핑크 그레이 톤, 부드러운 한국 웹툰풍 일러스트, 잔잔하고 자유로운 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "각자의 결을 지키는 사랑", 압축 내용 "지금 당신은 서로의 자유를 존중하는 사랑을 바라고 있는지도 몰라요.".`

### 면책 문구(footnote)

재미로 보는 심리 테스트예요. 결과는 참고용입니다.

## 10. 문득 떠나고 싶은 여행지는? — `travel-need-onepick`

- 착안: **환경심리 회복이론·현재 욕구**
- 보기(여행지 6개) → 결과: 지금 내 마음이 바라는 것
  - 바다(정화·쉼) · 산(도전·성취) · 도시(자극·연결) · 시골(평온·안정) · 이국(새로움·자유) · 집콕(안전·회복)

### 기본 정보

- 슬러그: `travel-need-onepick`
- 제목: 문득 떠나고 싶은 여행지는?
- 부제: 문득 떠오른 여행지가 지금 내 마음이 바라는 걸 알려줘요
- 설명(meta description): 여섯 여행지 중 지금 가장 끌리는 하나로, 지금 내 마음이 진짜 바라는 걸 알아보는 원픽 테스트.
- 태그: 원픽 / 심리 / 감정 / 힐링
- 문항 문구(prompt): 지금 문득 떠나고 싶은 여행지는?
- 결과 개수: 6
- 보기 라벨: `1번 선택 (바다)` · `2번 선택 (산)` · `3번 선택 (도시)` · `4번 선택 (시골)` · `5번 선택 (이국)` · `6번 선택 (집콕)`
  - 매핑: 바다→`ocean`(정화·쉼) / 산→`mountain`(도전·성취) / 도시→`city`(자극·연결) / 시골→`countryside`(평온·안정) / 이국→`abroad`(새로움·자유) / 집콕→`home`(안전·회복)

### 제목 이미지 프롬프트

- EN: `Six dreamy travel destinations arranged as a numbered set 1 to 6 — a calm ocean (cleansing/rest), a challenging mountain (achievement), a lively city (stimulation/connection), a peaceful countryside (calm/stability), an exotic foreign street (novelty/freedom), a cozy home nook (safety/recovery); each destination clearly marked with a large legible number 1 to 6, split into panels or one scene is fine but the numbers must be clearly visible, soft Korean webtoon illustration, pink-purple neon ambiance, one-pick inner-need test thumbnail, square 1:1 aspect ratio. Overlaid Korean text — top small label "ONE-PICK TEST"; title "문득 떠나고 싶은 여행지는?"; instruction "1가지를 골라보세요"; bottom one-line description "여섯 여행지 중 지금 가장 끌리는 하나로, 지금 내 마음이 진짜 바라는 걸 알아보는 원픽 테스트".`
- KO: `꿈결 같은 여행지 6개를 번호 세트 1~6으로 배치 — 잔잔한 바다(정화·쉼), 도전적인 산(성취), 활기찬 도시(자극·연결), 평화로운 시골(평온·안정), 이국적인 거리(새로움·자유), 아늑한 집(안전·회복); 각 여행지에 크고 읽기 쉬운 번호 1~6 뚜렷하게, 패널이든 한 장면이든 무방하되 번호는 반드시 잘 보이게, 부드러운 한국 웹툰풍 일러스트, 핑크 퍼플 네온 분위기, 원픽 마음욕구 테스트 썸네일, 1:1 정사각형 비율. 오버레이 텍스트 — 상단 작은 라벨 "ONE-PICK TEST", 제목 "문득 떠나고 싶은 여행지는?", 안내 "1가지를 골라보세요", 하단 설명 "여섯 여행지 중 지금 가장 끌리는 하나로, 지금 내 마음이 진짜 바라는 걸 알아보는 원픽 테스트".`

### 결과 1 — 정화·쉼 🌊 (`ocean`)

- tagline: 마음을 비우고 쉬고 싶은 때
- body: 지금 당신의 마음은 복잡한 걸 흘려보내고 쉬고 싶은 상태일 수 있어요. 이런 때는 생각을 잠시 멈추고 나를 비워내는 시간이 필요하죠. 바다처럼 탁 트인 곳에서 숨을 고르면, 마음도 한결 가벼워질 거예요.
- 결과 이미지 EN: `A calm wide ocean at soft dawn, cleansing peaceful openness, gentle blue-pink tones, soft Korean webtoon illustration, refreshing restful mood, square 1:1 aspect ratio. Overlaid Korean text — headline "마음을 비우고 쉬고 싶은 때"; one condensed line "지금 당신의 마음은 복잡한 걸 흘려보내고 쉬고 싶은 상태일 수 있어요.".`
- 결과 이미지 KO: `부드러운 새벽의 잔잔하고 드넓은 바다, 정화되는 평화로운 개방감, 은은한 블루 핑크 톤, 부드러운 한국 웹툰풍 일러스트, 상쾌하고 편안한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "마음을 비우고 쉬고 싶은 때", 압축 내용 "지금 당신의 마음은 복잡한 걸 흘려보내고 쉬고 싶은 상태일 수 있어요.".`

### 결과 2 — 도전·성취 ⛰️ (`mountain`)

- tagline: 스스로를 넘어서고 싶은 때
- body: 지금 당신의 마음은 무언가를 이뤄내고 싶은 상태일 수 있어요. 이런 때는 도전과 성취에서 에너지를 얻죠. 한 걸음씩 올라 정상에 서는 상상처럼, 지금 미뤄둔 목표에 작은 시작을 더해보면 마음이 채워질 거예요.
- 결과 이미지 EN: `A majestic mountain peak above the clouds, aspiring accomplished energy, cool pink-blue tones, soft Korean webtoon illustration, determined uplifting mood, square 1:1 aspect ratio. Overlaid Korean text — headline "스스로를 넘어서고 싶은 때"; one condensed line "지금 당신의 마음은 무언가를 이뤄내고 싶은 상태일 수 있어요.".`
- 결과 이미지 KO: `구름 위로 솟은 웅장한 산 정상, 도전하고 성취하는 에너지, 차가운 핑크 블루 톤, 부드러운 한국 웹툰풍 일러스트, 결연하고 고양된 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "스스로를 넘어서고 싶은 때", 압축 내용 "지금 당신의 마음은 무언가를 이뤄내고 싶은 상태일 수 있어요.".`

### 결과 3 — 자극·연결 🌆 (`city`)

- tagline: 새로운 자극과 사람이 그리운 때
- body: 지금 당신의 마음은 활기와 새로운 자극을 바라는 상태일 수 있어요. 이런 때는 사람들 속에서, 반짝이는 것들 속에서 에너지를 얻죠. 낯선 거리를 걷거나 새로운 걸 즐기며 마음에 생기를 채워보세요.
- 결과 이미지 EN: `A vibrant city skyline glowing at night, lively stimulating energy, vivid pink-purple neon, soft Korean webtoon illustration, exciting connected mood, square 1:1 aspect ratio. Overlaid Korean text — headline "새로운 자극과 사람이 그리운 때"; one condensed line "지금 당신의 마음은 활기와 새로운 자극을 바라는 상태일 수 있어요.".`
- 결과 이미지 KO: `밤에 빛나는 활기찬 도시 스카이라인, 생동감 있고 자극적인 에너지, 선명한 핑크 퍼플 네온, 부드러운 한국 웹툰풍 일러스트, 설레고 연결된 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "새로운 자극과 사람이 그리운 때", 압축 내용 "지금 당신의 마음은 활기와 새로운 자극을 바라는 상태일 수 있어요.".`

### 결과 4 — 평온·안정 🌾 (`countryside`)

- tagline: 느긋한 평온이 필요한 때
- body: 지금 당신의 마음은 느리고 평온한 안정을 바라는 상태일 수 있어요. 이런 때는 조용하고 익숙한 편안함이 위로가 되죠. 서두르지 않고 지금의 속도를 지키는 것만으로도 마음이 안정될 거예요.
- 결과 이미지 EN: `A peaceful countryside field in golden light, calm grounded serenity, warm green-pink tones, soft Korean webtoon illustration, gentle tranquil mood, square 1:1 aspect ratio. Overlaid Korean text — headline "느긋한 평온이 필요한 때"; one condensed line "지금 당신의 마음은 느리고 평온한 안정을 바라는 상태일 수 있어요.".`
- 결과 이미지 KO: `황금빛 속 평화로운 시골 들판, 차분하고 안정된 고요함, 따뜻한 그린 핑크 톤, 부드러운 한국 웹툰풍 일러스트, 은은하고 평온한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "느긋한 평온이 필요한 때", 압축 내용 "지금 당신의 마음은 느리고 평온한 안정을 바라는 상태일 수 있어요.".`

### 결과 5 — 새로움·자유 🗺️ (`abroad`)

- tagline: 완전히 새로운 곳으로 떠나고 싶은 때
- body: 지금 당신의 마음은 익숙한 것에서 벗어나 새로운 자유를 바라는 상태일 수 있어요. 이런 때는 낯선 풍경과 미지의 경험이 설렘을 주죠. 꼭 멀리 떠나지 않아도, 평소와 다른 하루를 만들어보면 그 갈증이 조금 풀려요.
- 결과 이미지 EN: `An exotic foreign street with unfamiliar charm, adventurous free curiosity, vivid pink-teal tones, soft Korean webtoon illustration, wanderlust liberating mood, square 1:1 aspect ratio. Overlaid Korean text — headline "완전히 새로운 곳으로 떠나고 싶은 때"; one condensed line "지금 당신의 마음은 익숙한 것에서 벗어나 새로운 자유를 바라는 상태일 수 있어요.".`
- 결과 이미지 KO: `낯선 매력의 이국적인 거리, 모험적이고 자유로운 호기심, 선명한 핑크 틸 톤, 부드러운 한국 웹툰풍 일러스트, 떠나고 싶은 해방감의 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "완전히 새로운 곳으로 떠나고 싶은 때", 압축 내용 "지금 당신의 마음은 익숙한 것에서 벗어나 새로운 자유를 바라는 상태일 수 있어요.".`

### 결과 6 — 안전·회복 🏠 (`home`)

- tagline: 나만의 공간에서 회복하고 싶은 때
- body: 지금 당신의 마음은 안전한 나만의 공간에서 충전하고 싶은 상태일 수 있어요. 이런 때는 밖으로 나서기보다 익숙한 곳에서 나를 돌보는 시간이 필요하죠. 좋아하는 것에 둘러싸여 편히 쉬는 것도 훌륭한 여행이에요.
- 결과 이미지 EN: `A cozy home nook with warm lamp light and blankets, safe restorative comfort, soft warm pink tones, soft Korean webtoon illustration, snug recharging mood, square 1:1 aspect ratio. Overlaid Korean text — headline "나만의 공간에서 회복하고 싶은 때"; one condensed line "지금 당신의 마음은 안전한 나만의 공간에서 충전하고 싶은 상태일 수 있어요.".`
- 결과 이미지 KO: `따뜻한 램프 불빛과 담요가 있는 아늑한 집 한 켠, 안전하고 회복되는 편안함, 부드러운 웜 핑크 톤, 부드러운 한국 웹툰풍 일러스트, 포근하게 충전되는 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "나만의 공간에서 회복하고 싶은 때", 압축 내용 "지금 당신의 마음은 안전한 나만의 공간에서 충전하고 싶은 상태일 수 있어요.".`

### 면책 문구(footnote)

재미로 보는 심리 테스트예요. 결과는 참고용입니다.

---

## ✅ 지금 끌리는 색은? — `color-mood-onepick` (구현 완료)

- 착안: **색채심리(color psychology)** — 지금 끌리는 색으로 오늘의 마음 상태를 본다
- 보기(색 카드 4개) → 결과: 요즘 내 마음 (1:1)
- 실제 구현: `src/content/quiz/color-mood-onepick.json`, `src/app/ko/love/color-mood-onepick/page.tsx`

### 기본 정보

- 슬러그: `color-mood-onepick`
- 제목: 지금 끌리는 색은?
- 부제: 한 장으로 보는 오늘의 마음
- 설명(meta description): 지금 가장 끌리는 색 하나로 오늘의 마음 상태를 알아보는 원픽 테스트.
- 태그: 원픽 / 색깔 / 심리
- 문항 문구(prompt): 지금 가장 끌리는 카드를 골라줘
- 결과 개수: 4
- 보기 라벨: `1번 선택 (빨강)` · `2번 선택 (파랑)` · `3번 선택 (노랑)` · `4번 선택 (초록)`
  - 매핑: 빨강→`red`(열정형) / 파랑→`blue`(차분형) / 노랑→`yellow`(발랄형) / 초록→`green`(안정형)

### 제목 이미지 프롬프트

- EN: `Four glowing color cards arranged as a numbered set 1 to 4 — a passionate red, a calm blue, a cheerful yellow, a soothing green; each card clearly marked with a large legible number 1 to 4, split into panels or one scene is fine but the numbers must be clearly visible, soft Korean webtoon illustration, pink-purple neon ambiance, one-pick color-mood test thumbnail, square 1:1 aspect ratio. Overlaid Korean text — top small label "ONE-PICK TEST"; title "지금 끌리는 색은?"; instruction "1가지를 골라보세요"; bottom one-line description "지금 가장 끌리는 색 하나로 오늘의 마음 상태를 알아보는 원픽 테스트".`
- KO: `빛나는 색 카드 4개를 번호 세트 1~4로 배치 — 정열의 레드, 차분한 블루, 발랄한 옐로, 편안한 그린; 각 카드에 크고 읽기 쉬운 번호 1~4 뚜렷하게, 패널이든 한 장면이든 무방하되 번호는 반드시 잘 보이게, 부드러운 한국 웹툰풍 일러스트, 핑크 퍼플 네온 분위기, 원픽 색채무드 테스트 썸네일, 1:1 정사각형 비율. 오버레이 텍스트 — 상단 작은 라벨 "ONE-PICK TEST", 제목 "지금 끌리는 색은?", 안내 "1가지를 골라보세요", 하단 설명 "지금 가장 끌리는 색 하나로 오늘의 마음 상태를 알아보는 원픽 테스트".`

### 결과 1 — 열정형 ❤️ (`red`)

- tagline: 지금 마음이 뜨겁게 달아오른 상태
- body: 지금 당신은 하고 싶은 것도, 표현하고 싶은 것도 많은 상태예요. 에너지가 밖으로 향해 있어서 새로운 시작이나 고백처럼 용기가 필요한 일에 유리한 타이밍이에요. 다만 뜨거운 만큼 서두르기 쉬우니, 중요한 결정은 하루만 재워두고 보는 것도 좋아요.
- 결과 이미지 EN: `A warm passionate red scene, glowing heart energy, hot pink-red gradient, soft Korean webtoon illustration, uplifting energetic mood, square 1:1 aspect ratio. Overlaid Korean text — headline "지금 마음이 뜨겁게 달아오른 상태"; one condensed line "지금 당신은 하고 싶은 것도, 표현하고 싶은 것도 많은 상태예요.".`
- 결과 이미지 KO: `따뜻하고 정열적인 레드 장면, 빛나는 하트 에너지, 핫핑크 레드 그라데이션, 부드러운 한국 웹툰풍 일러스트, 활기찬 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "지금 마음이 뜨겁게 달아오른 상태", 압축 내용 "지금 당신은 하고 싶은 것도, 표현하고 싶은 것도 많은 상태예요.".`

### 결과 2 — 차분형 💙 (`blue`)

- tagline: 생각을 정리하고 싶은 고요한 상태
- body: 지금은 밖으로 나서기보다 안을 정돈하고 싶은 마음이 커요. 감정을 한 발 떨어져서 바라보는 힘이 있어, 복잡했던 문제의 실마리를 찾기 좋은 때예요. 혼자만의 시간을 조금 확보해 두면 마음이 훨씬 가벼워질 거예요.
- 결과 이미지 EN: `A calm serene blue scene, quiet flowing water and soft light, cool blue-lavender tones, soft Korean webtoon illustration, composed reflective mood, square 1:1 aspect ratio. Overlaid Korean text — headline "생각을 정리하고 싶은 고요한 상태"; one condensed line "지금은 밖으로 나서기보다 안을 정돈하고 싶은 마음이 커요.".`
- 결과 이미지 KO: `차분하고 고요한 블루 장면, 잔잔히 흐르는 물과 부드러운 빛, 차가운 블루 라벤더 톤, 부드러운 한국 웹툰풍 일러스트, 정돈되고 사색적인 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "생각을 정리하고 싶은 고요한 상태", 압축 내용 "지금은 밖으로 나서기보다 안을 정돈하고 싶은 마음이 커요.".`

### 결과 3 — 발랄형 💛 (`yellow`)

- tagline: 가볍고 즐거운 걸 찾는 밝은 상태
- body: 지금 당신은 무거운 것보다 가볍고 재미있는 걸 원하고 있어요. 사람들과 어울리거나 새로운 걸 시도할 때 특히 반짝이는 타이밍이에요. 너무 진지하게 굴 필요 없어요 — 지금의 가벼움이 오히려 좋은 인연과 기회를 불러와요.
- 결과 이미지 EN: `A bright cheerful yellow scene, sparkling playful light, warm yellow-pink glow, soft Korean webtoon illustration, lively upbeat mood, square 1:1 aspect ratio. Overlaid Korean text — headline "가볍고 즐거운 걸 찾는 밝은 상태"; one condensed line "지금 당신은 무거운 것보다 가볍고 재미있는 걸 원하고 있어요.".`
- 결과 이미지 KO: `밝고 발랄한 옐로 장면, 반짝이는 경쾌한 빛, 따뜻한 옐로 핑크 글로우, 부드러운 한국 웹툰풍 일러스트, 활기차고 명랑한 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "가볍고 즐거운 걸 찾는 밝은 상태", 압축 내용 "지금 당신은 무거운 것보다 가볍고 재미있는 걸 원하고 있어요.".`

### 결과 4 — 안정형 💚 (`green`)

- tagline: 편안함과 균형을 원하는 상태
- body: 지금은 자극보다 안정과 편안함을 원하는 마음이 커요. 무리하지 않고 지금 가진 것을 돌보는 데서 만족을 느끼는 때예요. 관계에서도 급하게 밀어붙이기보다, 천천히 신뢰를 쌓아가는 방식이 당신에게 가장 잘 맞아요.
- 결과 이미지 EN: `A soothing balanced green scene, gentle leaves and calm light, soft green-mint tones, soft Korean webtoon illustration, grounded peaceful mood, square 1:1 aspect ratio. Overlaid Korean text — headline "편안함과 균형을 원하는 상태"; one condensed line "지금은 자극보다 안정과 편안함을 원하는 마음이 커요.".`
- 결과 이미지 KO: `편안하고 균형 잡힌 그린 장면, 부드러운 잎사귀와 잔잔한 빛, 부드러운 그린 민트 톤, 부드러운 한국 웹툰풍 일러스트, 안정되고 평화로운 분위기, 1:1 정사각형 비율. 오버레이 텍스트 — 헤드라인 "편안함과 균형을 원하는 상태", 압축 내용 "지금은 자극보다 안정과 편안함을 원하는 마음이 커요.".`

### 면책 문구(footnote)

재미로 보는 심리 테스트예요. 결과는 참고용입니다.
