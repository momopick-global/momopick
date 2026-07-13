# 누락 이미지 생성 프롬프트

> 결과값에 따라 노출되어야 하는데 실제 파일이 없어 placeholder(준비중 토끼)로 폴백되는 이미지 목록과 생성 프롬프트.
> 검증 기준: `node tools/check-quiz-images.mjs` → `[ko]` 누락 0건이 목표.

---

## 현재 누락 이미지 (1건)

| 퀴즈 | 결과 | 참조 경로 | 저장 위치 |
|---|---|---|---|
| personality-psychology-test | 복합형(blend) | `/images/quiz/personality-psychology-test/result-blend.webp` | `public/images/quiz/personality-psychology-test/ko/result-blend.webp` |

- 나머지 결과 이미지(분석형·공감형·균형형·직관형 result-1~4)와 썸네일은 모두 정상 존재.
- 이 한 장만 생성해 `ko/` 폴더에 넣으면 `[ko]` 누락이 0이 됩니다.
- 생성 후 OG용 jpg는 불필요(복합형은 썸네일 jpg를 OG로 사용). webp 1장이면 충분.

---

## 캐릭터 · 스타일 레퍼런스 (일관성 필수)

`personality-psychology-test`의 기존 결과 이미지들과 **동일한 인물·화풍**으로 생성해야 합니다.

- **인물**: 미남 애니메이션 남성. 짙은 보라·검정 계열의 헝클어진 머리, 보라빛 눈동자, 검은 터틀넥, 은색 체인 목걸이 + 하트/보석 귀걸이.
- **마스코트**: 오른쪽 하단에 보라·검정 치비(chibi) 고양이. 말풍선 포함.
- **배경**: 보라·바이올렛 네온, 은하수/별빛, 반짝임(sparkle) 톤.
- **레이아웃**: 상단 대형 3D 광택 한글 제목 + 그 아래 알약(pill) 서브카피, 하단에 알약형 배너 한 줄. 주변에 떠 있는 UI 모티프(돋보기, 체크리스트, 별자리, 두뇌 실루엣 등).
- **비율**: 정사각형 1:1 (약 1254×1254).

---

## 생성 프롬프트 — personality-psychology-test / 복합형

**한국어(붙여넣기용):**

```
정사각형 1:1 모바일 카드 이미지. 감성적인 한국 웹툰/애니메이션 스타일.
보라·바이올렛 네온 은하수 배경에 별빛과 반짝임.

인물: 잘생긴 애니메이션 남성. 짙은 보라·검정 헝클어진 머리, 보라빛 눈동자,
검은 터틀넥, 은색 체인 목걸이와 보석 귀걸이. 여러 표정이 섞인 듯 사색적이면서도
자신감 있는 분위기. 얼굴은 기존 '분석형/공감형' 이미지와 동일 인물.

오른쪽 하단: 보라·검정 치비 고양이 마스코트, 작은 말풍선 "결이 여러 개네!".

상단 대형 3D 광택 한글 제목: "복합형" (보라~핑크 그라데이션, 흰 테두리, 네온 글로우).
제목 아래 알약형 서브카피: "분석·공감·균형·직관이 섞인 성격".
하단 알약형 배너 한 줄: "한 가지보다 여러 결이 함께 있는 사람".

주변에 떠 있는 반투명 UI 요소 4개를 균형 있게 배치:
돋보기(분석), 하트(공감), 저울/균형 아이콘(균형), 번개(직관).
각 아이콘 옆 작은 라벨: 분석 · 공감 · 균형 · 직관.

전체적으로 4가지 성향이 하나로 어우러진 '복합' 느낌. 고해상도, 선명한 네온.
```

**영어(대체용):**

```
Square 1:1 mobile card illustration, emotional Korean webtoon/anime style.
Purple and violet neon galaxy background with starlight and sparkles.

Character: handsome anime male, messy dark purple-black hair, violet eyes,
black turtleneck, silver chain necklace and gem earring. Thoughtful yet confident,
a blend of expressions. Same face as the existing '분석형/공감형' result images.

Bottom-right: a purple-black chibi cat mascot with a small speech bubble.

Top: large glossy 3D Korean title "복합형" (purple-to-pink gradient, white outline, neon glow).
Subtitle pill under the title: "분석·공감·균형·직관이 섞인 성격".
Bottom pill banner: "한 가지보다 여러 결이 함께 있는 사람".

Four floating semi-transparent UI motifs balanced around the character:
magnifying glass (analysis), heart (empathy), balance scale (balance), lightning (intuition),
each with a small label. A cohesive 'mixed/composite' feeling. High resolution, crisp neon.
```

---

## 생성 후 정리 절차

1. 생성한 webp를 아래 경로로 저장:
   `public/images/quiz/personality-psychology-test/ko/result-blend.webp`
2. 검증:
   ```
   node tools/check-quiz-images.mjs
   ```
   → `[ko] OK` 확인.

---

## 참고: 누락은 아니지만 확인해 둘 항목

- **love-temperature-test / 차가운(20°)**, **planner·relationship-balance·self-esteem 등 퍼센트형**:
  이 퀴즈들은 결과를 **퍼센트/게이지 + 썸네일**로만 노출하며, 결과별 개별 이미지를 화면에 쓰지 않습니다.
  따라서 result 이미지가 없어도 "누락"이 아닙니다. (2차 배치로 정리한 result 파일은 보관용)
- **ideal-type-reality-test / why-my-relationships-fail**: JSON·페이지가 없어 아직 **미출시**. 이미지 불필요.
