# Snack Tests — 스낵형 13개 퀴즈

## 개요

`SnackQuiz` 컴포넌트로 동작하는 **선택지 누적 점수 → 결과 키 매핑** 방식. 결과는 A/B/C/D 같은 키로 분기, 또는 동률 시 `blend`.

## 운영 중인 13개 슬러그

```
ko/love/who-likes-you-type
ko/love/ambiguous-situationship-end
ko/love/love-pattern-destroying-habit
ko/love/dating-expert-or-beginner
ko/love/why-cant-you-text-first
ko/love/when-men-lose-interest
ko/love/hidden-dark-side
ko/love/leader-or-supporter
ko/love/anger-style-test
ko/love/mental-strength-test
ko/love/emotional-sensitivity
ko/love/true-self-alone
ko/love/trust-level-test
```

## 구조

| 위치 | 역할 |
|---|---|
| `src/content/quiz/<slug>.json` | 콘텐츠 (제목·문항·선택지·결과·share) |
| `src/content/quiz/index.ts` | JSON → TS export |
| `src/lib/content/jsonSource.ts` | slug → definition 매핑 (snack 13개 + percentage 6개) |
| `src/components/quiz/SnackQuiz.tsx` | 진행 UI + 결과 렌더 |
| `src/components/quiz/types.ts` | `SnackQuizDefinition` 타입 |
| `src/app/ko/love/<slug>/page.tsx` | per-slug 페이지 (메타 + SnackQuiz 호출) |
| `src/app/ko/love/[slug]/results/page.tsx` | 결과 카탈로그 (모든 결과 미리보기, generateStaticParams) |

## JSON 스키마

`src/schemas/quiz.schema.json` 참고. 핵심 필드:

```json
{
  "id": "slug-string",
  "slug": "slug-string",
  "category": "love",
  "title": { "ko": "...", "en": "..." },
  "subtitle": { "ko": "...", "en": "..." },
  "meta": { "description": {...}, "ogTitle": {...}, ... },
  "card": { "kicker": {...}, "railTheme": "..." },
  "images": { "og": "/images/quiz/<slug>/og.webp" },
  "questions": [
    {
      "prompt": { "ko": "...", "en": "..." },
      "image": "/images/quiz/<slug>/q1.webp",
      "options": [
        { "key": "A", "label": {...} },
        { "key": "B", "label": {...} },
        ...
      ]
    }
  ],
  "results": {
    "A": {
      "emoji": "🎭",
      "scoreKey": "A",
      "title": {...}, "tagline": {...}, "body": {...},
      "image": "/images/quiz/<slug>/result-1.webp",
      "share": { "title": {...}, "description": {...}, "image": "..." }
    },
    ...
  },
  "blend": { ... },     // 동률 시 fallback
  "tags": [...],
  "related": [...]
}
```

## 결과 분기 로직

1. 사용자가 각 문항에서 선택 → option.key가 result key와 동일하거나 매핑됨
2. 누적 점수에서 1위 키 → `results[key]` 반환
3. 동률이면 `blend` 결과 사용
4. 결과 이미지 + 텍스트 + 공유 모델 빌드

## 이미지 경로 규칙

JSON 안에는 `/images/quiz/<slug>/<file>.webp` (로케일 없음).
런타임: `src/lib/content/quizAssetUrl.ts`가 `<locale>` 세그먼트 삽입 → `/images/quiz/<slug>/ko/<file>.webp`.

실제 자산 위치: `public/images/quiz/<slug>/<locale>/`.

| 필요 자산 (per slug, ko 기준) | 예시 |
|---|---|
| 썸네일 | `thumb.webp` |
| 결과 N개 | `result-1.webp`, `result-2.webp`, ... (4개 권장) |
| (선택) 시작 이미지 | `start.webp` |
| (선택) 문항 이미지 | `q1.webp`, ... |
| (선택) OG | JSON `images.og` 참조 |

검증: `node tools/check-quiz-images.mjs` (ko 엄격, en warning)

## 결과 페이지 동작

- URL: `/ko/love/<slug>/?r=A` 같은 형태로 결과 딥링크 가능 (`lib/quizOutcomeUrl.ts`)
- 결과 카탈로그: `/ko/love/<slug>/results/` — 모든 결과 (A/B/C/D + blend) 미리보기

## 참여자 수 통계

`useQuizParticipantCount` 훅으로 `quiz_stats` Supabase 테이블 fetch + increase. 자세한 건 [supabase-stats.md](./supabase-stats.md).

## 결과 공유

`QuizResultShare` 컴포넌트 (Kakao Feed / 페북 / 트위터 / 링크 복사). 자세한 건 [share-kakao.md](./share-kakao.md).

## 새 슬러그 추가 절차

1. `src/content/quiz/<slug>.json` 작성 (스키마 준수)
2. `src/content/quiz/index.ts`에 import + export
3. `src/lib/content/jsonSource.ts`의 `koByKey`에 `"ko/love/<slug>": quiz...` 추가
4. `src/app/ko/love/<slug>/page.tsx` 생성 (기존 `anger-style-test/page.tsx` 등 참고)
5. `public/images/quiz/<slug>/ko/` 아래 자산 생성
6. `public/sitemap.xml`에 `<url>` 블록 추가
7. `node tools/check-quiz-images.mjs` 통과 확인
8. `npm run build` 통과 확인
9. `/ko/love/` 허브에서 카드 노출 확인 (`getKoLoveQuizzesSorted`가 자동 정렬)

## 빈 슬러그 (미운영, 폴더만 존재)

- `dating-personality-type` — 자산 5개 준비됨, JSON·page 없음
- `ideal-type-reality-test` — 자산 5개 준비됨, JSON·page 없음
- `why-my-relationships-fail` — 자산 5개 준비됨, JSON·page 없음
- `your-love-type` — 자산 0개

라우트 없음 (404). 운영 결정 후 추가.
