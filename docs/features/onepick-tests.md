# 원픽 테스트 (One-Pick Test) 스펙

> 상태: **구현 완료** (2026-07-06 기준) — 샘플 `color-mood-onepick` 동작 확인.
> 1문항 + 보기 N개, 보기 하나 = 결과 하나(1:1)로 즉시 결과를 보여주는 초간편 콘텐츠.
> 개별 퀴즈 기획·결과·프롬프트는 [../content/onepick-quiz-content.md](../content/onepick-quiz-content.md)에서 관리.

## 1. 핵심 원칙

- **1문항 + 보기 4~6개**. 보기는 **텍스트 버튼**으로 노출(현재 기본). 보기 이미지는 스키마상 지원하나 지금 UX는 텍스트 버튼을 쓴다.
- **보기 1개 = 결과 1개 (1:1 매핑)**. 보기를 고르면 그 보기에 연결된 결과(이미지+텍스트)를 즉시 표시.
- **기존 스낵 퀴즈 엔진 재사용** — 새 엔진 없음.
  - `questions`에 문항 1개만 둔다.
  - 각 보기의 `key` = 결과 `resultKeys`의 항목 (1:1).
  - `logic.type: "max-score"` — 1문항이라 고른 보기가 곧 최다 득표 = 결과. 계산·중간 단계 없음.
- **자동 판별**: `isOnePickQuiz`(= `questions.length === 1`, `src/lib/content/homeRail.ts`)로 판별해 `/ko/onepick/`에 자동 노출. 별도 category/플래그 없음. (내비 분류는 `KO_PRIMARY_NAV` 단일 소스.)
- 주제 `category`는 일반 퀴즈와 동일하게 부여(예: `love`). 원픽은 "형식" 축이라 주제와 독립.

## 2. 원픽 화면 동작 (일반 퀴즈와 다른 점)

원픽(`total === 1`)은 인트로/시작 단계를 건너뛰고 **첫 화면에서 바로 보기를 노출**한다. `src/components/quiz/SnackQuiz.tsx`:

- `showIntro`에 `&& total > 1` 조건 → 원픽은 인트로 화면(“테스트 시작하기” 버튼 포함)을 **건너뜀**.
- 질문 화면에서 `total === 1`이면:
  - 진행바·"질문 1/1" 라벨 **숨김**.
  - 대신 안내 문구 `ui.quizIntroBody(total)`("총 1문항이에요. 가장 와닿는 답을 고르면 바로 결과를 볼 수 있어요.")를 보기 위에 노출.
  - 그 아래 **친구에게 공유하기**(`QuizResultShare`) 노출(인트로에 있던 것과 동일).
  - 이어서 보기 버튼 → 하나 누르면 즉시 결과.

**첫 화면 순서**: 상단 커버(큰 이미지) → 안내 문구 → 친구에게 공유하기 → 보기 버튼(1~4).

### 상단 커버 크기
`.quiz-cover`는 기본 절반 폭이고 인트로일 때만 커진다. 원픽은 인트로가 없으므로 `src/app/ko/ko-home.css`에 별도 규칙으로 quiz-shell 폭(`--quiz-col`)에 맞춰 크게 표시:
```css
.momopick-ko .quiz-page:has(.quiz-intro-body--onepick) .quiz-cover { max-width: var(--quiz-col); }
```

## 3. 스키마 (구현됨)

`src/components/quiz/types.ts`의 `SnackQuizQuestion.options`에 `image?` 필드가 추가돼 있음(선택):
```ts
options: { label: SnackQuizText; key: string; image?: string }[]
```
- 보기에 `image`가 있으면 SnackQuiz가 **이미지+텍스트 카드 그리드**(`quiz-options--grid` / `quiz-opt--card`)로 렌더, 없으면 **텍스트 버튼**.
- **현재 원픽 UX는 텍스트 버튼**을 사용(옵션에 `image`를 넣지 않음). 이미지 카드형이 필요하면 보기에 `image`를 채우면 자동 전환됨.

## 4. 보기 라벨 규칙 (텍스트 버튼)

- 형식: `"N번 선택 (설명)"`. 괄호 안 설명은 퀴즈마다 다름.
- 예(color-mood): `1번 선택 (빨강)` · `2번 선택 (파랑)` · `3번 선택 (노랑)` · `4번 선택 (초록)`.

## 5. 이미지 경로 규칙 (기존 규칙 그대로)

- JSON에는 `/images/quiz/{slug}/…`로만 적고, 실제 파일은 `public/images/quiz/{slug}/{locale}/`에 둔다(`quizAssetUrl`이 연결).
- 파일명 컨벤션: 썸네일 `thumb.webp` · 결과 `result-{번호}.webp` (resultOrder 순서대로 `result-1`, `result-2`, … — 썸연애 퀴즈와 동일; 보기 이미지 쓸 경우 `option-{번호}.webp`).
- 검증: `node tools/check-quiz-images.mjs` (경로에 적힌 파일이 실제로 있어야 통과).

## 6. 데이터 예시 (현재 샘플 `color-mood-onepick`)

```json
{
  "id": "color-mood-onepick",
  "slug": "color-mood-onepick",
  "category": "love",
  "title": { "ko": "지금 끌리는 색은?", "en": "Which color are you drawn to?" },
  "subtitle": { "ko": "한 장으로 보는 오늘의 마음", "en": "Your mood in one pick" },
  "images": { "thumbnail": "/images/quiz/color-mood-onepick/thumb.webp" },
  "card": { "theme": "love", "priority": 80 },
  "resultKeys": ["red", "blue", "yellow", "green"],
  "resultOrder": ["red", "blue", "yellow", "green"],
  "logic": { "type": "max-score", "blendOnTie": false },
  "results": {
    "red":    { "emoji": "❤️", "title": {"ko":"열정형","en":""}, "tagline": {"ko":"...","en":""},
                "body": {"ko":"...","en":""}, "image": "/images/quiz/color-mood-onepick/result-red.webp" },
    "blue":   { "emoji": "💙", "title": {"ko":"차분형","en":""}, "tagline": {"ko":"...","en":""},
                "body": {"ko":"...","en":""}, "image": "/images/quiz/color-mood-onepick/result-blue.webp" },
    "yellow": { "emoji": "💛", "title": {"ko":"발랄형","en":""}, "tagline": {"ko":"...","en":""},
                "body": {"ko":"...","en":""}, "image": "/images/quiz/color-mood-onepick/result-yellow.webp" },
    "green":  { "emoji": "💚", "title": {"ko":"안정형","en":""}, "tagline": {"ko":"...","en":""},
                "body": {"ko":"...","en":""}, "image": "/images/quiz/color-mood-onepick/result-green.webp" }
  },
  "blend": { "emoji": "✨", "title": {"ko":"복합형","en":""}, "tagline": {"ko":"","en":""}, "body": {"ko":"","en":""} },
  "questions": [
    {
      "prompt": { "ko": "지금 가장 끌리는 카드를 골라줘", "en": "Pick the card you are drawn to" },
      "options": [
        { "key": "red",    "label": {"ko":"1번 선택 (빨강)","en":"Option 1 (Red)"} },
        { "key": "blue",   "label": {"ko":"2번 선택 (파랑)","en":"Option 2 (Blue)"} },
        { "key": "yellow", "label": {"ko":"3번 선택 (노랑)","en":"Option 3 (Yellow)"} },
        { "key": "green",  "label": {"ko":"4번 선택 (초록)","en":"Option 4 (Green)"} }
      ]
    }
  ],
  "footnote": { "ko": "재미로 보는 심리 테스트예요. 결과는 참고용입니다.", "en": "" }
}
```

- 보기 개수 = 결과 개수 (4~6, 서로 1:1). 보기 `key`와 결과 `resultKeys`/`results` 키를 반드시 일치시킨다.
- `blend`는 원픽에서 동점이 안 생겨 안 쓰이지만 타입상 최소값만 채운다.
- 보기를 **이미지 카드**로 쓰려면 각 보기에 `"image": "/images/quiz/{slug}/option-{번호}.webp"`를 추가.

## 7. 등록 절차 (일반 퀴즈와 동일)

1. `src/content/quiz/{slug}.json` 생성 (위 형식, 문항 1개).
2. `src/content/quiz/index.ts`에 `import` + `export const quiz…` + `koQuizCatalogForHome`(및 필요 시 `snackQuizDefinitionsCatalog`)에 등록.
3. 이미지 파일을 `public/images/quiz/{slug}/{locale}/`에 배치(썸네일·결과 이미지).
4. `/ko/love/{slug}/` 라우트 페이지 추가 (기존 퀴즈와 동일 패턴, 브레드크럼은 원픽으로).
5. `node tools/check-quiz-images.mjs`로 경로 검증.
6. 문항이 1개이므로 `/ko/onepick/`에 자동 편입됨.

## 8. 관련 파일

- 스키마: `src/components/quiz/types.ts` (`options[].image?`)
- 렌더·동작: `src/components/quiz/SnackQuiz.tsx` (`showIntro` 조건, 원픽 질문 화면 분기, 보기 카드/버튼)
- 자동 판별: `src/lib/content/homeRail.ts` (`isOnePickQuiz`, `getKoOnePickQuizzesSorted`)
- 스타일: `src/app/ko/ko-home.css` (`quiz-options--grid`, `quiz-opt--card`, `quiz-opt-thumb`, 원픽 커버 규칙)
- 샘플: `src/content/quiz/color-mood-onepick.json`, `src/app/ko/love/color-mood-onepick/page.tsx`

## 9. 관리자 페이지(A안)와의 연결

관리자 폼의 "원픽" 모드 = 문항 1개 + 보기별 {라벨(“N번 선택 (설명)”), 연결 결과 key} + 결과 세트(이미지·텍스트). 결과가 보기와 1:1이라 가장 단순한 폼. 카테고리 드롭다운은 `KO_PRIMARY_NAV` 재사용.
