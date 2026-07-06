# Blog Image Prompts — 블로그 커버 이미지 프롬프트

> 작성 기준일: 2026-07-06
> 대상: `/ko/blog/`에서 아직 대표 이미지가 없는 글 6개 (현재 `PENDING` fallback 사용)
> 규격 근거: [image-guidelines.md](./image-guidelines.md)

## 공통 규격 (모든 블로그 커버 동일)

| 항목 | 값 |
|---|---|
| 용도 | 블로그 hero / 목록 카드 |
| 비율·크기 | **1:1 정사각형, 1080×1080** |
| 포맷 | WebP (quality 75~85, sRGB, EXIF 제거) |
| 파일 경로 | `public/images/blog/<slug>-ko-cover.webp` |
| 스타일 | 부드러운 벡터 일러스트, 파스텔톤 + 보라(`#5a67f2`)·핑크(`#ff5b8a`) 액센트 |
| 구도 | 중심 인물/오브젝트 1개, 배경 단순, 중앙 80% 안전영역 |

### 반드시 지킬 것 (네거티브 — 모든 프롬프트 공통)

`no text, no letters, no words, no logo, no watermark, no real photo, no realistic human photograph, not dark, not scary, no blood, no horror, no dark fantasy, no clutter`

> ⚠️ **이미지 안에 한글/영문 텍스트를 절대 넣지 않습니다.** (가이드 하드룰 + AI 텍스트 깨짐 방지) 제목은 페이지에서 별도 표시됩니다.

### 생성 → 반영 절차

1. 아래 영문 프롬프트로 이미지 생성 (1:1 정사각형)
2. WebP 변환·압축 → `public/images/blog/<slug>-ko-cover.webp`
3. `src/content/blog/koSamplePosts.ts`에서 해당 글 `image: PENDING` → `image: "/images/blog/<slug>-ko-cover.webp"`, `imageAlt` 확인
4. `npm run build` 통과 → `/ko/blog/`에서 카드 확인

---

## 1. `signs-som-turning-into-love` 💘 썸에서 연애로 넘어가는 신호 5가지

- **파일명**: `signs-som-turning-into-love-ko-cover.webp`
- **컨셉**: 썸→연애로 넘어가는 설렘. 두 인물 사이의 좁혀지는 거리, 은근한 미소. 따뜻한 핑크·코랄 톤.

**EN prompt**

> Soft pastel vector illustration, 1:1 square aspect ratio. Two young people sitting slightly turned toward each other on a cozy bench, gentle shy smiles, a small glowing heart floating between them, warm coral and blush-pink palette with soft lavender accents, simple clean background, bright and tender mood, flat modern illustration style, centered composition. No text, no letters, no logo, no watermark, no real photo, not dark.

**한글 메모**: 손끝이 살짝 닿을 듯한 거리감, 말풍선 대신 작은 하트 1개. 밝고 풋풋하게.

---

## 2. `snack-test-what` 🍪 스낵 테스트가 뭐예요? (fun)

- **파일명**: `snack-test-what-ko-cover.webp`
- **컨셉**: "3분 안에 끝나는 가벼운 테스트"의 경쾌함. 스마트폰 + 스낵(과자) 모티프, 통통 튀는 색감.

**EN prompt**

> Playful pastel vector illustration, 1:1 square aspect ratio. A cheerful young person holding a smartphone with a big smile, surrounded by cute floating snack icons (cookie, candy, popcorn) and a tiny hourglass suggesting a quick 3-minute test, bright pink and mint and yellow palette, light and fun mood, clean simple background, flat modern illustration. No text, no letters, no logo, no watermark, no real photo, not dark.

**한글 메모**: 가볍고 즉흥적인 재미. 모래시계로 '3분' 뉘앙스만, 숫자 텍스트는 넣지 않음.

---

## 3. `share-result` 🔗 테스트 결과, 친구에게 공유해 보세요 (story)

- **파일명**: `share-result-ko-cover.webp`
- **컨셉**: 결과를 친구와 나누는 순간. 두세 명이 폰 화면을 함께 보며 웃음. 공유·연결 상징(말풍선, 하트, 종이비행기).

**EN prompt**

> Warm pastel vector illustration, 1:1 square aspect ratio. Two or three friends leaning together looking at a smartphone screen and laughing, floating chat bubbles and a small paper-plane share icon and hearts around them, cheerful lavender and pink and peach palette, friendly social mood, simple clean background, flat modern illustration, centered. No text, no letters, no logo, no watermark, no real photo, not dark.

**한글 메모**: 화면 안 내용은 추상적인 색 블록으로만(글자 X). 공유의 즐거움 강조.

---

## 4. `love-category-editor` 😄 연애 테스트, 웃으면서 보는 게 포인트 (love)

- **파일명**: `love-category-editor-ko-cover.webp`
- **컨셉**: 연애 테스트를 진지하지 않게, 웃으며 즐기는 태도. 편안하게 웃는 인물 + 하트/윙크 소품.

**EN prompt**

> Light pastel vector illustration, 1:1 square aspect ratio. A relaxed young person laughing softly while looking at a phone, playful wink expression, small floating hearts and a sparkle, warm rose-pink and soft purple palette, easygoing cheerful mood, clean minimal background, flat modern illustration, centered composition. No text, no letters, no logo, no watermark, no real photo, not dark.

**한글 메모**: "가볍게 즐기는" 톤이 핵심 — 과장되지 않은 편안한 미소.

---

## 5. `new-quizzes-rhythm` 🗓️ 앞으로도 테스트는 꾸준히 늘어납니다 (story)

- **파일명**: `new-quizzes-rhythm-ko-cover.webp`
- **컨셉**: 새 콘텐츠가 계속 추가되는 성장·리듬감. 달력/새싹/상승 곡선 등 '꾸준함' 은유, 밝은 톤.

**EN prompt**

> Fresh pastel vector illustration, 1:1 square aspect ratio. A friendly scene suggesting steady growth: a small sprouting plant and a simple calendar and gently rising dots or cards, one cheerful character adding a new card to a stack, soft mint and lavender and pink palette, optimistic bright mood, clean simple background, flat modern illustration. No text, no letters, no logo, no watermark, no real photo, not dark.

**한글 메모**: 카드가 쌓이는/새싹이 자라는 은유로 '지속' 표현. 달력 숫자·글자는 넣지 않음.

---

## 6. `mbti-not-diagnosis` 🧠 MBTI·성향 퀴즈, 진단이 아니라는 걸 기억해 주세요 (story)

- **파일명**: `mbti-not-diagnosis-ko-cover.webp`
- **컨셉**: "재미로 보는 것, 의학적 진단이 아니다"라는 메시지. 물음표·거울·가벼운 뇌 아이콘, 차분하지만 밝은 보라 톤.

**EN prompt**

> Calm pastel vector illustration, 1:1 square aspect ratio. A thoughtful young person gently smiling and pointing at a soft glowing brain-and-question-mark motif, a small mirror reflecting a friendly version of themselves, reassuring and light-hearted mood (not clinical), soft lavender and lilac and warm pink palette, clean minimal background, flat modern illustration, centered. No text, no letters, no logo, no watermark, no real photo, not dark, no medical or clinical imagery.

**한글 메모**: 진단·임상 느낌(가운, 차트, 병원) 금지. "가볍게, 나를 이해하는 도구" 뉘앙스로 부드럽게.

---

## 7. `confession-timing-guide` 💌 고백 타이밍, 언제가 진짜 적기일까 (love)

- **파일명**: `confession-timing-guide-ko-cover.webp`
- **컨셉**: 고백을 앞둔 망설임과 설렘. 폰을 든 채 말할까 말까 고민하는 표정, 하트+시계 모티프로 '타이밍' 뉘앙스.

**EN prompt**

> Soft pastel vector illustration, 1:1 square aspect ratio. A young person holding a phone close to their chest with a hopeful, slightly nervous smile, a small floating heart and a gentle clock motif suggesting timing, warm coral and blush-pink and soft lavender palette, tender anticipatory mood, clean simple background, flat modern illustration, centered. No text, no letters, no logo, no watermark, no real photo, not dark.

**한글 메모**: 시계는 '타이밍' 은유로만 작게. 설렘 반, 망설임 반의 표정.

---

## 8. `habits-that-ruin-relationships` 💔 자꾸 연애를 망치는 습관 (love)

- **파일명**: `habits-that-ruin-relationships-ko-cover.webp`
- **컨셉**: 반복되는 패턴 자각. 살짝 풀린 실타래/엉킨 하트를 바라보는 차분한 표정. 무겁지 않게, 성찰 톤.

**EN prompt**

> Gentle pastel vector illustration, 1:1 square aspect ratio. A young person thoughtfully looking at a softly tangled heart-shaped thread in their hands, calm reflective expression (not sad, not dark), muted rose and dusty-pink and soft lavender palette, introspective but warm mood, clean minimal background, flat modern illustration, centered. No text, no letters, no logo, no watermark, no real photo, not dark, not gloomy.

**한글 메모**: 슬픔·우울 아님 — '아, 이런 패턴이 있었네' 하는 담담한 자각. 엉킨 실=반복 습관 은유.

---

## 9. `signs-he-lost-interest` 🥶 "식었다"는 신호, 오해와 진짜 (love)

- **파일명**: `signs-he-lost-interest-ko-cover.webp`
- **컨셉**: 늦은 답장에 불안해지는 순간. 폰 화면을 보며 갸웃하는 표정, 물음표 말풍선. 차가움보다 '헷갈림' 톤.

**EN prompt**

> Soft pastel vector illustration, 1:1 square aspect ratio. A young person looking at a phone screen with a slightly puzzled, uncertain expression, a small question-mark chat bubble floating nearby, cool but soft blue and lavender and light-pink palette, gentle "confused, not sure" mood (not cold or scary), clean simple background, flat modern illustration, centered. No text, no letters, no logo, no watermark, no real photo, not dark.

**한글 메모**: 차갑고 무서운 톤 금지 — '식은 건가? 오해인가?' 헷갈리는 뉘앙스. 파랑은 부드럽게만.

---

## 10. `why-cant-text-first` 📱 먼저 연락 못 하는 사람의 심리 (love)

- **파일명**: `why-cant-text-first-ko-cover.webp`
- **컨셉**: 메시지 창을 열었다 닫는 망설임. 폰 위에 손가락을 올린 채 고민하는 표정, 작은 말풍선. 공감 톤.

**EN prompt**

> Soft pastel vector illustration, 1:1 square aspect ratio. A young person hesitating with a finger hovering over a phone screen, shy and thoughtful expression, a small empty chat bubble floating above, warm lavender and peach and soft pink palette, relatable gentle mood, clean minimal background, flat modern illustration, centered. No text, no letters, no logo, no watermark, no real photo, not dark.

**한글 메모**: 빈 말풍선 = '보낼까 말까'. 글자는 넣지 않음. 공감되는 부드러운 표정.

---

## 11. `planner-vs-spontaneous` 🗺️ 계획형 vs 즉흥형 (personality)

- **파일명**: `planner-vs-spontaneous-ko-cover.webp`
- **컨셉**: 두 성향의 대비. 한쪽은 체크리스트/지도, 다른 쪽은 자유로운 곡선/여행 가방. 대비를 밝고 재미있게.

**EN prompt**

> Playful pastel vector illustration, 1:1 square aspect ratio. A split-concept scene contrasting two styles: on one side a tidy checklist and map pins, on the other side a free wavy path and a small travel bag, one cheerful character in the middle, bright mint and lavender and warm pink palette, fun balanced mood, clean simple background, flat modern illustration, centered. No text, no letters, no logo, no watermark, no real photo, not dark.

**한글 메모**: 체크리스트/지도 vs 자유 곡선의 대비만 시각적으로. 글자·숫자는 넣지 않음. 어느 쪽도 부정적으로 보이지 않게.

---

## 참고

- 퀴즈(썸네일/결과) 이미지의 더 강한 '다크 네온' 시리즈 스타일은 [../quiz-image-prompts.md](../quiz-image-prompts.md) 참고. **블로그 커버는 그보다 밝고 부드러운 톤**을 유지합니다.
- 기존 커버 예시: `what-is-tarot-ko-cover.webp`, `som-situationship-awkward-ending-ko-cover.webp` (`public/images/blog/`).
