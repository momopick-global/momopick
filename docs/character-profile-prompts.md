# 모모픽 캐릭터 세트 프롬프트

퀴즈 스타일마다 다른 캐릭터 세트를 사용해 콘텐츠가 식상해지지 않도록 합니다.
퀴즈 이미지를 만들 때는 먼저 세트를 고르고, 그 안에서 캐릭터를 선택합니다.

## 세트 개요

세트는 **형식(엔진) 기준**으로 나눕니다. 주제(category)는 세트 선택과 무관합니다.

퀴즈 유형 공식 이름 (2026-07 확정):

| 유형 이름 | 작동 방식 | 내부/코드 용어 | 캐릭터 세트 |
|-----------|-----------|----------------|-------------|
| 심층 테스트 | 문항 많고 몰입형, 결과가 %·지표 | 심층 몰입형, 퍼센트·지표형 | 모모 캐스트 |
| 유형 테스트 | 5~8문항 A/B/C/D → "○○형" 결과, 정답 없음 | 스낵형, `SnackQuiz` | 모모 스낵 |
| 정답 퀴즈 | 정답 있음, 즉시 O/X+해설, 점수·칭호 | 정답형, `TriviaQuiz` | 모모 아카데미 |
| 원픽 | 1문항 골라 바로 결과 | 원픽, `questions.length===1` | 모모 미니 |

| 세트 | 대상 유형 | 구성 | 코드 |
|------|-----------|------|------|
| 모모 캐스트 | 심층 테스트 | 사람 10명 + 전용 마스코트 10마리 | F1~F5, M1~M5 / A1~A10 |
| 모모 아카데미 | 정답 퀴즈 | 시험 세계관 동물 교직원 4마리 | T1~T4 |
| 모모 미니 | 원픽 | 치비 사물 요정 4종 | P1~P4 |
| 모모 스낵 | 유형 테스트 | 디저트 마스코트 4종 | S1~S4 |

- 표기 규칙: 퀴즈 이미지 프롬프트에 `세트 / 캐릭터 코드`를 명시합니다. 예: `모모 캐스트 / F3 + A3`, `모모 아카데미 / T1`
- 모든 세트는 아래 `공통 스타일 프롬프트`를 앞에 붙여 같은 세계관으로 보이게 합니다.

## 스타일 기준

- 참고 폴더: `/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick_자료/그림 스타일/`
- 핵심 무드: **귀엽고 사랑스러운** 한국형 애니 캐릭터 / **캐릭터마다 뚜렷한 패션 개성** / **머리색·눈색을 캐릭터별로 다양하게** / 반짝이는 글로시 큰 눈 / 감정 과장 / 발랄하되 살짝 무드 있는 분위기 (네온·글로우는 캐릭터 고유 색으로)
- 사람 캐릭터와 동물 캐릭터가 같은 세계관 안에 있는 것처럼 보여야 합니다.
- 동물은 단순한 장식이 아니라 각 감정 타입을 상징하는 `마스코트` 역할로 사용합니다.

## 공통 생성 규칙

- 용도: 퀴즈 시리즈 전체에서 반복 사용할 고정 캐릭터 프로필 기준 이미지
- 구도: 정사각형 1:1, **얼굴을 크게 잡은 클로즈업(가슴 위)**, 정면 또는 살짝 3/4 각도
- 스타일: 고퀄 한국형 애니메이션 일러스트, 귀엽고 개성 강한 캐릭터 디자인
- 조명: 강한 네온 림라이트, **캐릭터 고유 색**의 광택 하이라이트 (보라 일변도 지양)
- 배경: 단순 그라데이션이 아니라 빛 입자, 유리 조각, 하트 심볼, 그림자 기류가 있는 간결한 배경
- 금지: 읽을 수 있는 글자, 워터마크, 로고, 너무 현실적인 사진풍
- 목표: 10명의 사람 캐릭터와 5마리 동물 캐릭터가 서로 겹치지 않고 한눈에 구분될 것

## 공통 스타일 프롬프트

- EN: `Square 1:1 character profile portrait, ultra-polished Korean anime illustration, very cute and lovable character design with strong personal fashion, big glossy sparkling eyes, close-up on the face, dramatic rim lighting, neon glow in the character's own signature color, sparkling particles, distinct hair color and eye color per character, richly detailed hair and fashion accessories, clean centered portrait, no readable text, no watermark, no logo, same universe as a Korean viral psychology quiz thumbnail.`
- KO: `정사각형 1:1 캐릭터 프로필 초상, 매우 정교한 한국형 애니메이션 일러스트, 매우 귀엽고 사랑스러운 캐릭터 디자인, 뚜렷한 패션 개성, 반짝이는 큰 글로시 눈, 얼굴을 크게 잡은 클로즈업, 드라마틱한 림라이트, 캐릭터 고유 색의 네온 글로우, 반짝이는 입자, 캐릭터마다 다른 머리색과 눈색, 디테일한 헤어와 패션 액세서리, 중앙 정렬 초상, 읽을 수 있는 텍스트 없음, 워터마크 없음, 로고 없음, 한국형 바이럴 심리 퀴즈 썸네일과 같은 세계관.`

## 세트 1 · 모모 캐스트 (심층 테스트)

퍼센트·지표형 등 몰입해서 푸는 심층 테스트 전용 사람 캐릭터 세트입니다. 드라마처럼 몰입하는 콘텐츠라 '출연진' 콘셉트로 부릅니다.
사람 캐릭터와 전용 동물 마스코트를 짝지어 사용합니다.

### 사람 캐릭터

#### F1

- EN: `A super cute Korean young woman with a round adorable face, big sparkling warm amber eyes, soft wavy strawberry-pink hair, heart hairpin and a big ribbon, frilly blouse with a heart pendant, lovely pastel fashion, tender fluttering expression, warm coral-pink glow, tiny floating hearts.`
- KO: `동그랗고 귀여운 얼굴, 크고 반짝이는 따뜻한 앰버 눈, 부드러운 웨이브의 딸기 핑크 헤어, 하트 헤어핀과 큼직한 리본, 프릴 블라우스에 하트 펜던트, 러블리한 파스텔 패션의 사랑스러운 한국인 젊은 여성, 다정하고 설레는 표정, 따뜻한 코랄 핑크 글로우, 작은 하트 반짝임.`
- 동물 마스코트: `A1`

#### F2

- EN: `A cute composed Korean young woman with clear icy grey-blue eyes, sleek ink-navy bob, a beret and ribbon tie, chic preppy cardigan, intellectual tidy fashion, slightly prim adorable expression, icy-blue glow, small sparkles.`
- KO: `단정하고 귀여운 얼굴, 또렷한 아이시 그레이블루 눈, 매끈한 잉크 네이비 보브 헤어, 베레모와 리본 타이, 세련된 프레피 카디건의 지적이고 차분한 패션의 한국인 젊은 여성, 살짝 새침하고 귀여운 표정, 아이시 블루 글로우, 작은 별 반짝임.`
- 동물 마스코트: `A2`

#### F3

- EN: `A cute gentle Korean young woman with big dewy soft-lavender eyes, mint-green long hair with see-through bangs, star and cloud hairpins, cozy pastel knit cardigan, dreamy tender fashion, soft lovable expression, mint-lavender glow, floating star sparkles.`
- KO: `말갛고 귀여운 얼굴, 크고 촉촉한 소프트 라벤더 눈, 시스루 앞머리의 민트 그린 롱 헤어, 별과 구름 헤어핀, 포근한 파스텔 니트 카디건의 몽환적이고 다정한 패션의 한국인 젊은 여성, 순하고 사랑스러운 표정, 민트 라벤더 글로우, 떠다니는 별 반짝임.`
- 동물 마스코트: `A3`

#### F4

- EN: `A chic yet cute Korean young woman with intense wine-red eyes, platinum-silver layered hair, gold choker and drop earrings, modern black-and-gold chic outfit, charismatic bold fashion, confident cute expression, deep-wine glow, glossy shard accents.`
- KO: `도도하지만 귀여운 얼굴, 강렬한 와인 레드 눈, 플래티넘 실버 레이어드 헤어, 골드 초커와 드롭 이어링, 블랙에 골드 포인트를 준 모던 시크 룩의 카리스마 있는 패션의 한국인 젊은 여성, 자신감 있고 귀여운 표정, 딥 와인 글로우, 반짝이는 파편 포인트.`
- 동물 마스코트: `A4`

#### F5

- EN: `A bubbly cute Korean young woman with sparkling lime-green eyes, apricot-orange twin-tails, star and sticker hairpins, oversized graphic hoodie in poppy street fashion, cheeky bright grin, candy-color glow, doodle-like glow symbols.`
- KO: `발랄하고 귀여운 얼굴, 반짝이는 라임 그린 눈, 애프리콧 오렌지 트윈테일 헤어, 별·스티커 헤어핀, 오버사이즈 그래픽 후디의 팝한 스트리트 패션의 장난기 많은 한국인 젊은 여성, 짓궂고 밝은 미소, 캔디 컬러 글로우, 낙서 같은 빛 심볼 포인트.`
- 동물 마스코트: `A5`

#### M1

- EN: `A cute gentle-looking Korean young man with soft sky-blue eyes, natural ash-brown hair, cozy oversized knit with a muffler, warm homey fashion, calm tender smile, warm cream glow, tiny heart particles.`
- KO: `순하고 귀여운 인상, 부드러운 소프트 스카이블루 눈, 자연스러운 애쉬 브라운 헤어, 포근한 오버사이즈 니트에 머플러를 두른 코지 패션의 따뜻한 한국인 젊은 남성, 잔잔하고 다정한 미소, 웜 크림 글로우, 작은 하트 입자.`
- 동물 마스코트: `A3`

#### M2

- EN: `A bold yet cute Korean young man with deep-crimson eyes, styled crimson-red hair, chain necklace and ear cuff, leather-jacket rock-chic fashion, confident playful expression, hot-red glow, electric light streaks.`
- KO: `또렷하고 강렬하지만 귀여운 인상, 딥 크림슨 눈, 스타일링된 크림슨 레드 헤어, 체인 목걸이와 이어커프, 레더 재킷의 락 시크 패션의 존재감 큰 한국인 젊은 남성, 자신감 있고 장난기 있는 표정, 핫 레드 글로우, 전기 같은 빛줄기.`
- 동물 마스코트: `A4`

#### M3

- EN: `A cheerful cute Korean young man with sparkling hazel eyes, slightly tousled honey-blond hair, cap and hoodie sporty-casual fashion, friendly bright smile, sunshine-yellow glow, small floating star accents.`
- KO: `밝고 귀여운 인상, 반짝이는 헤이즐 눈, 살짝 헝클어진 허니 블론드 헤어, 캡모자와 후디의 스포티 캐주얼 패션의 친근한 한국인 젊은 남성, 다가가기 쉬운 환한 미소, 선샤인 옐로 글로우, 작은 별 포인트.`
- 동물 마스코트: `A5`

#### M4

- EN: `A calm cute Korean young man with clear steel-grey eyes, tidy dark-teal hair, thin glasses and minimal shirt-and-vest smart fashion with a watch, composed slightly aloof expression, cool-teal glow, geometric light accents.`
- KO: `차분하고 귀여운 인상, 또렷한 스틸 그레이 눈, 정돈된 다크 틸 헤어, 얇은 안경과 미니멀 셔츠·베스트에 시계 포인트를 준 스마트 패션의 침착한 한국인 젊은 남성, 이지적이고 살짝 무심한 표정, 쿨 틸 글로우, 기하학적 빛 포인트.`
- 동물 마스코트: `A2`

#### M5

- EN: `A cool cute Korean young man with deep-violet eyes, dark charcoal-purple hair with a colored streak in the bangs, high-neck dark outfit with a chain and a drop earring, moody stylish fashion, aloof languid expression, smoky-purple glow, shadow accents.`
- KO: `쿨하고 귀여운 인상, 깊은 바이올렛 눈, 앞머리 한 갈래에 컬러 포인트를 준 다크 차콜 퍼플 헤어, 하이넥 다크 룩에 체인·드롭 이어링을 매치한 무드 있는 패션의 미스터리한 한국인 젊은 남성, 무심하고 나른한 표정, 스모키 퍼플 글로우, 그림자 포인트.`
- 동물 마스코트: `A1`

### 동물 마스코트

#### A1 그림자 고양이

- EN: `A dark plush-like black cat mascot with glowing violet eyes, tiny crown or gothic heart ornament, smug crossed-arm pose, glossy fur highlights, purple neon outline, cute but intimidating mood.`
- KO: `빛나는 바이올렛 눈, 작은 왕관 또는 고딕 하트 장식을 한 검은 봉제인형 같은 고양이 마스코트, 팔짱 낀 새침한 자세, 광택 있는 털 하이라이트, 퍼플 네온 외곽선, 귀엽지만 위압적인 분위기.`

#### A2 얼음 토끼

- EN: `A moody plush rabbit mascot with cool blue-violet eyes, ribbon bow, slightly annoyed face, soft frosty glow, icy heart motifs, elegant but distant mood.`
- KO: `차가운 블루 바이올렛 눈, 리본 장식, 살짝 심술 난 표정의 봉제인형 토끼 마스코트, 서늘한 서리빛 글로우, 얼음 하트 모티프, 우아하지만 거리감 있는 분위기.`

#### A3 위로 곰

- EN: `A shy plush bear mascot with soft indigo fur, watery eyes, holding a glowing heart close, comforting but sad mood, moonlit blue-purple outline and tiny tear sparkles.`
- KO: `부드러운 인디고 털, 촉촉한 눈, 빛나는 하트를 꼭 안고 있는 수줍은 봉제곰 마스코트, 위로해 주지만 슬픈 분위기, 달빛 같은 블루 퍼플 외곽선과 작은 눈물 반짝임.`

#### A4 다크 박쥐고양이

- EN: `A mischievous dark cat mascot with tiny bat wings, skull bow ornament, sharp glowing eyes, small devilish smirk, magenta-purple neon edge light, edgy gothic cute vibe.`
- KO: `작은 박쥐 날개, 해골 리본 장식, 날카롭게 빛나는 눈, 장난스러운 악동 미소를 가진 다크 고양이 마스코트, 마젠타 퍼플 네온 가장자리 빛, 날카로운 고딕 큐트 분위기.`

#### A5 장난 별햄스터

- EN: `A mischievous round plush hamster mascot with bright pink-violet eyes, tiny star pin, puffy cheeks, teasing expression, candy neon highlights and playful floating symbols.`
- KO: `밝은 핑크 바이올렛 눈, 작은 별 핀, 통통한 볼, 약 올리는 듯한 표정의 둥근 봉제 햄스터 마스코트, 캔디 네온 하이라이트와 장난스러운 떠다니는 심볼 포인트.`

#### A6 무심 팬더

- EN: `A deadpan plush panda mascot with sleepy half-lidded eyes, monochrome fur with cool blue glow, folded arms, low emotional reaction, subtle floating ellipsis symbols, calm but indifferent mood.`
- KO: `졸린 듯 반쯤 감긴 눈, 차가운 블루 글로우가 도는 흑백 털, 팔짱 낀 자세, 감정 반응이 낮은 무심한 봉제 팬더 마스코트, 은은한 말줄임표 심볼, 차분하지만 무관심한 분위기.`

#### A7 불안 여우

- EN: `A nervous plush fox mascot with wide glossy eyes, fluffy peach-orange fur with pink-violet highlights, tiny trembling paws, worried expression, floating question marks and tangled thread motifs, anxious but lovable mood.`
- KO: `커다랗고 반짝이는 눈, 핑크 바이올렛 하이라이트가 들어간 복숭아빛 오렌지 털, 바들바들 떠는 작은 앞발, 걱정 많은 표정의 불안한 봉제 여우 마스코트, 떠다니는 물음표와 엉킨 실 모티프, 불안하지만 사랑스러운 분위기.`

#### A8 회복 강아지

- EN: `A hopeful plush puppy mascot with soft cream fur, bright healing eyes, a tiny bandage-heart accessory, gentle smile, warm gold and lavender outline light, comforting resilient mood.`
- KO: `부드러운 크림색 털, 회복감이 느껴지는 밝은 눈, 작은 반창고 하트 장식, 다정한 미소를 가진 희망적인 봉제 강아지 마스코트, 따뜻한 골드와 라벤더 외곽 빛, 위로와 회복력이 느껴지는 분위기.`

#### A9 자존심 고슴도치

- EN: `A prickly plush hedgehog mascot with dark mauve spines, sharp side-eye, tiny crown pin, puffed-up posture, defensive heart-shield motif, proud but secretly sensitive mood.`
- KO: `다크 모브 가시, 날카로운 곁눈질, 작은 왕관 핀, 잔뜩 부풀린 자세를 가진 자존심 강한 봉제 고슴도치 마스코트, 방어적인 하트 방패 모티프, 자존심 세지만 속은 여린 분위기.`

#### A10 몽상 양

- EN: `A dreamy plush sheep mascot with fluffy lavender-white wool, starry eyes, sleepy smile, crescent moon charm, floating cloud and sparkle motifs, soft dreamy overthinking mood.`
- KO: `라벤더빛이 도는 하얀 복슬털, 별이 비친 듯한 눈, 졸린 미소, 초승달 참 장식을 한 몽상적인 봉제 양 마스코트, 구름과 반짝임 모티프, 부드럽고 몽환적인 과몰입 분위기.`

## 세트 2 · 모모 아카데미 (정답 퀴즈)

정답형(트리비아) 전용 세트입니다. 시험·채점 세계관의 동물 교직원 캐릭터로, 즉시 O/X 판정과 점수·칭호 콘셉트에 맞춥니다. 보기 개그 톤과 어울리게 깐깐하지만 귀엽게 그립니다.

### T1 출제 부엉이 교수

- EN: `A strict but adorable plush owl professor mascot with round golden spectacles, tiny graduation cap, deep-indigo feathers with gold trim vest, holding a glowing pointer stick, proud lecturing pose, warm amber glow, floating O and X symbols as light shapes.`
- KO: `동그란 금테 안경과 작은 학사모, 골드 트리밍 조끼를 입은 딥 인디고 깃털의 깐깐하지만 사랑스러운 봉제 부엉이 교수 마스코트, 빛나는 지시봉을 든 당당한 강의 자세, 따뜻한 앰버 글로우, 빛으로 된 O·X 심볼이 떠다니는 포인트.`
- 용도: 퀴즈 대표 이미지, 출제/문제 화면

### T2 채점 고양이 조교

- EN: `A smug plush tuxedo cat teaching-assistant mascot holding an oversized glowing red marking pen, narrow judging eyes, tiny bow tie, stack of glowing answer sheets, playful strict mood, crimson-pink glow, floating check marks and cross marks.`
- KO: `커다란 빨간 채점펜을 든 새침한 봉제 턱시도 고양이 조교 마스코트, 심사하는 듯한 가늘게 뜬 눈, 작은 보타이, 빛나는 답안지 더미, 장난스럽게 엄격한 분위기, 크림슨 핑크 글로우, 떠다니는 체크·가위표 포인트.`
- 용도: 오답 해설, 점수 낮은 결과 이미지

### T3 감독관 펭귄

- EN: `A no-nonsense plush penguin exam-proctor mascot with a silver whistle and a glowing stopwatch, tiny security armband, upright stiff posture, deadpan serious face on a cute round body, cool steel-blue glow, floating clock and exclamation symbols.`
- KO: `은색 호루라기와 빛나는 스톱워치, 작은 완장을 찬 봉제 펭귄 시험 감독관 마스코트, 꼿꼿한 자세, 귀여운 둥근 몸에 정색한 무표정, 쿨한 스틸 블루 글로우, 떠다니는 시계·느낌표 심볼.`
- 용도: 타이머/긴장감 연출, 중간 난이도 문제

### T4 만점 강아지 수석

- EN: `A proud plush golden puppy top-student mascot wearing a tiny medal and a laurel hair clip, sparkling confident eyes, holding a glowing 100-point paper shape (no readable text), triumphant grin, bright gold glow, confetti and star sparkles.`
- KO: `작은 메달과 월계수 헤어클립을 한 자랑스러운 골든 강아지 수석 마스코트, 반짝이는 자신감 넘치는 눈, 빛나는 만점 답안지 모양(읽히는 글자 없음)을 든 의기양양한 미소, 밝은 골드 글로우, 색종이와 별 반짝임.`
- 용도: 고득점 결과, 칭호 획득 이미지

## 세트 3 · 모모 미니 (원픽)

원픽(1문항) 전용 세트입니다. 사람 없이 치비 사물 요정만 사용해 가볍고 즉흥적인 밸런스게임 느낌을 냅니다. 몸통은 단순하고 얼굴 표정이 큰 SD 스타일입니다.

### P1 말풍선 몽글이

- EN: `A tiny chibi speech-bubble fairy mascot, soft rounded white bubble body with stubby arms, huge sparkling curious eyes, small blush cheeks, hovering with a bouncy pose, pastel rainbow rim light, floating dots like typing indicators.`
- KO: `몽글몽글한 흰 말풍선 몸통에 짤막한 팔이 달린 치비 말풍선 요정 마스코트, 커다란 호기심 가득한 반짝이는 눈, 발그레한 볼, 통통 튀는 자세로 떠 있는 모습, 파스텔 무지개 림라이트, 타이핑 중 표시 같은 점 세 개가 떠다니는 포인트.`
- 용도: 답장/메시지 소재 원픽

### P2 하트 젤리

- EN: `A squishy chibi heart-shaped jelly mascot, translucent coral-pink gummy body with glossy highlights, big dreamy eyes, tiny wobbling arms, lovestruck expression, sweet candy glow, floating mini hearts and sugar sparkles.`
- KO: `말랑한 하트 모양 치비 젤리 마스코트, 광택 하이라이트가 있는 반투명 코랄 핑크 젤리 몸통, 크고 몽롱한 눈, 흔들리는 작은 팔, 사랑에 빠진 표정, 달콤한 캔디 글로우, 떠다니는 미니 하트와 설탕 반짝임.`
- 용도: 연애/설렘 소재 원픽

### P3 물음표 푸딩

- EN: `A wobbly chibi pudding mascot shaped like a question mark, caramel-yellow glossy body with a cream top, wide puzzled eyes, tilted head pose, indecisive cute expression, warm honey glow, floating tiny question marks and swirl motifs.`
- KO: `물음표 모양으로 흔들리는 치비 푸딩 마스코트, 크림이 올라간 카라멜 옐로 광택 몸통, 동그랗게 뜬 어리둥절한 눈, 갸우뚱 기울인 자세, 결정 못 하는 귀여운 표정, 따뜻한 허니 글로우, 떠다니는 작은 물음표와 소용돌이 모티프.`
- 용도: 고민/선택 소재 원픽

### P4 번개 콩

- EN: `A hyper chibi bean mascot crackling with tiny lightning bolts, lime-green glossy body, mischievous sparkling eyes, open-mouth excited grin, zooming action pose with speed lines of light, electric neon glow, doodle-style spark symbols.`
- KO: `작은 번개를 튀기는 하이퍼 치비 콩 마스코트, 라임 그린 광택 몸통, 장난기 가득 반짝이는 눈, 입을 벌린 신난 미소, 빛의 속도선과 함께 달려나가는 자세, 일렉트릭 네온 글로우, 낙서풍 스파크 심볼.`
- 용도: 즉흥/텐션 소재 원픽

## 세트 4 · 모모 스낵 (유형 테스트)

스낵형(`SnackQuiz`, 5~8문항 A/B/C/D → 타입 결과) 전용 세트입니다. 가볍게 집어먹는 콘텐츠라는 콘셉트로 디저트 마스코트를 사용합니다. 퀴즈 무드에 맞는 캐릭터를 골라 씁니다.

### S1 마카롱 곰

- EN: `A soft plush bear mascot sitting inside a giant pastel macaron shell like a cushion, rose-pink and cream colors, gentle sleepy smile, cozy relaxed mood, powdered-sugar sparkle, warm pastel-pink glow.`
- KO: `커다란 파스텔 마카롱 사이에 쿠션처럼 폭 안겨 있는 봉제곰 마스코트, 로즈 핑크와 크림 색감, 나른하고 다정한 미소, 포근하고 여유로운 분위기, 슈가 파우더 반짝임, 따뜻한 파스텔 핑크 글로우.`
- 용도: 힐링/일상 주제

### S2 츄러스 여우

- EN: `A playful plush fox mascot hugging a giant twisted churro like a body pillow, cinnamon-orange fur with sugar-crystal sparkles, cheeky grin with one eye winking, energetic street-snack vibe, warm caramel glow.`
- KO: `커다란 츄러스를 바디필로우처럼 껴안은 장난꾸러기 봉제 여우 마스코트, 설탕 결정 반짝임이 있는 시나몬 오렌지 털, 한쪽 눈을 찡긋한 짓궂은 미소, 길거리 간식의 활기찬 분위기, 따뜻한 카라멜 글로우.`
- 용도: 유머/티키타카 주제

### S3 빙수 펭귄

- EN: `A chill plush penguin mascot lounging on a mound of shaved ice with fruit toppings, mint and sky-blue palette, relaxed half-lidded content eyes, tiny spoon in flipper, refreshing icy sparkle, cool aqua glow.`
- KO: `과일 토핑이 올라간 빙수 더미 위에 느긋하게 기대 누운 봉제 펭귄 마스코트, 민트와 스카이블루 팔레트, 반쯤 감긴 만족스러운 눈, 지느러미에 든 작은 숟가락, 시원한 얼음 반짝임, 쿨한 아쿠아 글로우.`
- 용도: 쿨톤/현실 팩폭 주제

### S4 핫초코 토끼

- EN: `A cozy plush rabbit mascot peeking out of a giant hot chocolate mug with marshmallows, cocoa-brown and cream fur, steam swirls shaped like little hearts, warm snuggly sleepy expression, soft candlelight glow.`
- KO: `마시멜로가 떠 있는 커다란 핫초코 머그에서 빼꼼 내다보는 봉제 토끼 마스코트, 코코아 브라운과 크림색 털, 작은 하트 모양으로 피어오르는 김, 따뜻하고 포근한 졸린 표정, 부드러운 캔들라이트 글로우.`
- 용도: 감성/위로 주제

## 운영 규칙

### 공통

- 모든 캐릭터 이미지는 단독 프로필로 저장합니다.
- 퀴즈를 만들 때 먼저 퀴즈 스타일로 세트를 정하고, 그 안에서 캐릭터를 선택합니다.
- 세트를 섞지 않습니다. 한 퀴즈의 대표/결과 이미지는 같은 세트 안에서만 조합합니다.
- 텍스트는 반드시 후편집으로 넣고 생성 단계에서는 넣지 않습니다.

### 모모 캐스트 (심층 테스트)

- 퀴즈 메인 이미지에서는 주인공 1명과 전용 마스코트 1마리를 기본 조합으로 사용합니다.
- 같은 동물 마스코트가 여러 사람과 연결될 수는 있지만, 대표 조합은 위 표를 우선 사용합니다.
- 동물 풀은 현재 `A1~A10`까지 사용합니다.
- 퀴즈별 분위기에 따라 귀여운 마스코트, 차가운 마스코트, 다크 마스코트, 회복형 마스코트를 선택적으로 배치합니다.

### 모모 아카데미 (정답 퀴즈)

- 대표 이미지는 `T1`(출제 부엉이 교수)을 기본으로 사용합니다.
- 결과 이미지는 점수대에 따라 `T4`(고득점) / `T2`(저득점) / `T3`(중간)을 배치합니다.

### 모모 미니 (원픽)

- 원픽 1건당 소재에 맞는 캐릭터 1종만 사용합니다.
- 사람 캐릭터(모모 캐스트)는 원픽에 사용하지 않습니다.

### 모모 스낵 (유형 테스트)

- 스낵형(`SnackQuiz`) 퀴즈에 사용하며, 퀴즈 무드에 맞는 디저트 마스코트 1종을 대표로 사용합니다.
- 기존 스낵형 13개 퀴즈도 이미지 리뉴얼 시 이 세트를 기준으로 합니다.
- 결과 이미지에서는 같은 캐릭터의 표정·소품 변형으로 통일감을 유지합니다.
