import type { SnackQuizDefinition } from "@/components/quiz/types";
import { snackQuizDefinitionsCatalog } from "@/content/quiz";

export function getSnackQuizBySlug(slug: string): SnackQuizDefinition | undefined {
  return snackQuizDefinitionsCatalog.find((d) => d.slug === slug);
}

/** `resultOrder`가 있으면 그 순서를 우선하고, 나머지 `resultKeys`를 뒤에 붙인다. */
export function orderedSnackResultKeys(def: SnackQuizDefinition): string[] {
  const { resultKeys, resultOrder } = def;
  if (!resultOrder?.length) return [...resultKeys];
  const primary = resultOrder.filter((k) => resultKeys.includes(k));
  const rest = resultKeys.filter((k) => !primary.includes(k));
  return [...primary, ...rest];
}
