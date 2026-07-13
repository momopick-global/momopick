import type { PercentageQuizDefinition } from "@/components/quiz/percentageTypes";
import { koQuizCatalogForHome } from "@/content/quiz";
import { quizPathSegment } from "@/lib/content/quizRoutes";

/**
 * 점수 기반 퀴즈(퍼센트형·정답형) 판별 — 결과가 점수/구간이면 보관함 kind는 "percent".
 * (기존 `"maxTotal" in d` 체크는 정의에 없는 필드라 항상 false였음 → 실제 스키마 필드로 수정)
 */
function isScoreBasedQuiz(d: unknown): d is PercentageQuizDefinition {
  return typeof d === "object" && d !== null && ("resultRanges" in d || "grades" in d);
}

/** 홈 레일/타일 `slug`에 대응하는 보관함 `kind` (카탈로그에 없으면 snack) */
export function vaultKindForHomeSlug(slug: string): "snack" | "percent" {
  const def = koQuizCatalogForHome.find((d) => quizPathSegment(d) === slug);
  if (!def) return "snack";
  return isScoreBasedQuiz(def) ? "percent" : "snack";
}
