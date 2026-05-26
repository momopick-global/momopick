# Quiz Writing Guide — 문항·선택지·결과 분기

## 두 가지 퀴즈 타입

| 타입 | 결과 형태 | 컴포넌트 |
|---|---|---|
| Snack (스낵형) | A/B/C/D 키로 분기 + 동률 시 `blend` | `SnackQuiz` |
| Percentage (퍼센티지형) | 0~100% 단일 값 | `PercentageQuiz` |

## 문항 (questions)

### 권장 개수

- **8문항** 권장 (현재 운영 퀴즈 모두 8문항)
- 너무 짧으면(<5) 결과 신뢰감 부족
- 너무 길면(>12) 도중 이탈

### 문항 작성

- 한 문장에 한 가지 상황만
- "당신은 ~한가요?"보다 **시나리오 + 반응 선택**이 좋음
  - ❌ "당신은 적극적인 편인가요?"
  - ✅ "썸 타는 상대가 며칠째 연락이 뜸해요. 당신은?"
- 사용자가 자신을 한 번에 떠올릴 수 있는 구체적 상황

### 선택지 (options)

- 보통 **4개**
- 짧게 (한 줄 안에)
- 각 선택지는 분명한 결과 키와 연결
- "잘 모르겠다" 같은 회피 선택지는 가급적 피함 (응답률 분산)

### 예시

```json
{
  "prompt": {
    "ko": "썸 타는 상대가 며칠째 연락이 뜸해요. 당신은?",
    "en": "Your situationship has gone quiet for days. You:"
  },
  "options": [
    { "key": "A", "label": { "ko": "내가 먼저 연락해본다", "en": "I message first" } },
    { "key": "B", "label": { "ko": "은근슬쩍 SNS만 본다", "en": "I just check their SNS" } },
    { "key": "C", "label": { "ko": "기다리다 흐지부지 끝낸다", "en": "I wait and let it fade" } },
    { "key": "D", "label": { "ko": "혼자 결론 내리고 정리한다", "en": "I decide alone and end it" } }
  ]
}
```

## 결과 (results)

### 결과 개수

- 보통 **4개 타입** (A/B/C/D)
- 더 적으면 분기 무의미, 더 많으면 응답 분포가 산만

### 결과 객체 구조

```json
{
  "A": {
    "emoji": "🎭",
    "scoreKey": "A",
    "title": { "ko": "밀당형", "en": "Push-Pull Type" },
    "tagline": { "ko": "...", "en": "..." },
    "body": { "ko": "...", "en": "..." },
    "image": "/images/quiz/<slug>/result-1.webp",
    "share": {
      "title": { "ko": "나의 썸 패턴은 밀당형", ... },
      "description": { "ko": "적당한 밀당이 아니라 타이밍을 놓치는 타입", ... },
      "image": "/images/quiz/<slug>/result-1.webp"
    }
  }
}
```

### 결과 제목

- 한국어 2~5자 (짧고 공유하고 싶게)
- 예시: "밀당형", "직진형", "눈치형", "과해석형"
- 이모지 1개 권장 (`emoji` 필드)

### 결과 본문 (body)

- 최소 **250자**, 권장 **400~500자**
- 구성:
  1. 성향 묘사 (이런 타입이다)
  2. 장점·매력 포인트
  3. 주의점·자주 겪는 어려움
  4. 가벼운 조언 (1줄)
- 문단 사이는 빈 줄로 구분 (JSON에 그대로 `\n\n` 포함)

### 공유 (share)

- `share.title`: 결과 카드의 제목 (공유 시 노출). "나의 ~ 패턴은 ~형" 패턴 좋음
- `share.description`: 한 줄 요약
- `share.image`: 결과 이미지 같은 경로 가능 (또는 별도 share 전용 이미지)

### Blend (동률 fallback)

```json
"blend": {
  "emoji": "✨",
  "scoreKey": "blend",
  "title": { "ko": "혼합형", ... },
  "body": { ... },
  "image": "/images/quiz/<slug>/blend.webp"
}
```

동률 시 표시. 보통 "여러 타입이 골고루 있는 균형형" 톤.

## 점수 매핑 (스낵형)

- 각 옵션의 `key`가 결과 키와 동일 → 누적
- 또는 옵션이 여러 결과에 가중치 → `scoreMap` (현재 일부 퀴즈 사용)
- 자세한 건 `src/components/quiz/types.ts` 참고

## 점수 매핑 (퍼센티지형)

- 각 옵션이 0~10 등의 가중치 점수
- 누적 점수 / 만점 × 100 = %
- 결과 구간 (0~25 / 26~50 / 51~75 / 76~100) 별 텍스트

## 메타 데이터

```json
{
  "id": "<slug>",
  "slug": "<slug>",
  "category": "love",
  "title": { "ko": "...", "en": "..." },
  "subtitle": { "ko": "...", "en": "..." },
  "meta": {
    "description": { "ko": "150자 내", "en": "..." },
    "ogTitle": { "ko": "...", "en": "..." },
    "ogDescription": { "ko": "...", "en": "..." }
  },
  "card": {
    "kicker": { "ko": "😤 분노 스타일", "en": "..." },
    "railTheme": "love"
  },
  "images": {
    "og": "/images/quiz/<slug>/og.webp"
  },
  "tags": ["연애", "썸", "감정"],
  "related": ["why-cant-you-text-first", "when-men-lose-interest"]
}
```

## 카테고리 / 슬러그 / 라우트

- 카테고리: `love` (현재 운영 중인 유일한 카테고리)
- 슬러그: 영어 소문자 + 하이픈
- 라우트: `/ko/love/<slug>/` (퀴즈) + `/ko/love/<slug>/results/` (결과 카탈로그)

## 새 퀴즈 발행 절차

1. JSON 작성 (스키마는 `src/schemas/quiz.schema.json` 참고)
2. `src/content/quiz/index.ts`에 import + export
3. `src/lib/content/jsonSource.ts`에 매핑 등록
4. `src/app/ko/love/<slug>/page.tsx` 생성 (기존 페이지 복사)
5. 자산: `public/images/quiz/<slug>/ko/`
6. `node tools/check-quiz-images.mjs` 통과
7. `public/sitemap.xml` 등록
8. `npm run build` 통과
9. 운영 반영 후 `/ko/love/`에서 카드 노출 확인

## 톤 가이드

[content-tone.md](./content-tone.md) 참고. 특히:
- "반드시" / "무조건" 금지
- 의학적 단정 X
- 결과가 사용자를 깎아내리지 않음
- 면책 톤 (재미 + 자기이해)
