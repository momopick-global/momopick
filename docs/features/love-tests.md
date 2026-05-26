# Love Tests — 퍼센티지형 6개 퀴즈

## 개요

`PercentageQuiz` 컴포넌트로 동작하는 **선택지 누적 점수 → 0~100% 단일 값** 출력 방식. 결과 페이지에는 점수에 따른 등급(매우 낮음 / 낮음 / 보통 / 높음 / 매우 높음) 텍스트가 나옴.

## 운영 중인 6개 슬러그

```
ko/love/confession-success-rate
ko/love/love-temperature-test
ko/love/relationship-balance-test
ko/love/logical-or-emotional
ko/love/planner-or-spontaneous
ko/love/self-esteem-level
```

## 구조

| 위치 | 역할 |
|---|---|
| `src/content/quiz/<slug>.json` | 콘텐츠 (다른 `score` 결과 구조) |
| `src/components/quiz/PercentageQuiz.tsx` | 퍼센티지 진행 UI + 결과 |
| `src/components/quiz/percentageTypes.ts` | `PercentageQuizDefinition` 타입 |
| `src/lib/content/jsonSource.ts`의 `koPercentageByKey` | slug 매핑 |
| `src/app/ko/love/<slug>/page.tsx` | per-slug 페이지 |

## JSON 차이 (vs 스낵형)

- `results`가 키 분기가 아니라 **점수 구간 분기** (예: 0~25 / 26~50 / 51~75 / 76~100)
- 선택지 각각이 가중치 점수 보유
- `share` 모델도 점수 표현 포함 (예: "나의 고백 성공률은 73%")

`src/schemas/quiz.schema.json`의 percentage 타입 정의 참조.

## 결과 UI 특징

- 게이지 / 프로그레스 바 시각화
- 점수 백분율 텍스트
- 공유 시 점수 값이 share text/image에 반영

## 이미지 경로 규칙

스낵형과 동일. `public/images/quiz/<slug>/<locale>/`.

## 참여자 수 통계

스낵형과 공유 — `quiz_stats` 테이블에 `quizId` 별로 카운트. 자세한 건 [supabase-stats.md](./supabase-stats.md).

## 결과 공유

스낵형과 동일 컴포넌트 (`QuizResultShare`). [share-kakao.md](./share-kakao.md) 참조.

## 새 퍼센티지 퀴즈 추가 절차

스낵형 [snack-tests.md](./snack-tests.md)와 동일하되, `src/lib/content/jsonSource.ts`에서 `koPercentageByKey`에 등록.
