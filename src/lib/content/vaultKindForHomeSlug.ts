import type { PercentageQuizDefinition } from "@/components/quiz/percentageTypes";
import { koQuizCatalogForHome } from "@/content/quiz";
import { quizPathSegment } from "@/lib/content/quizRoutes";

function isPercentageQuiz(d: unknown): d is PercentageQuizDefinition {
  return typeof d === "object" && d !== null && "maxTotal" in d;
}

/** 홈 레일/타일 `slug`에 대응하는 보관함 `kind` (카탈로그에 없으면 snack) */
export function vaultKindForHomeSlug(slug: string): "snack" | "percent" {
  const def = koQuizCatalogForHome.find((d) => quizPathSegment(d) === slug);
  if (!def) return "snack";
  return isPercentageQuiz(def) ? "percent" : "snack";
}
