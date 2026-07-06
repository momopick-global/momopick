import type { SnackQuizDefinition } from "@/components/quiz/types";
import type { PercentageQuizDefinition } from "@/components/quiz/percentageTypes";
import { koQuizCatalogForHome } from "@/content/quiz";
import { koTagFromLabel, koTagBySlug } from "./koTagRegistry";
import { menuGroupOf, type KoMenuGroup } from "./homeRail";

export type KoQuizTag = {
  /** URL·식별용 slug */
  slug: string;
  /** 표시용 라벨 (한국어) */
  label: string;
  emoji?: string;
  /** 이 태그를 가진 퀴즈 수 */
  count: number;
};

type AnyQuizDef = SnackQuizDefinition | PercentageQuizDefinition;

/**
 * 퀴즈 카탈로그에서 **캐노니컬 태그**(레지스트리 기준)를 집계한다.
 * - 퀴즈의 자유 입력 태그를 `koTagFromLabel`로 정규화 → 별칭이 하나로 합쳐짐
 * - 같은 퀴즈 안의 중복은 1회만 카운트
 * - `minCount` 이상만 반환, 횟수 내림차순
 * - `group`을 주면 해당 메뉴(심층/원픽/성향) 퀴즈에 달린 태그만 집계
 *   → 서브페이지 태그 줄을 그 페이지 콘텐츠 기준으로 좁힐 때 사용.
 *
 * 레지스트리에 없는 태그는 집계에서 제외(= 링크 대상 아님).
 */
export function getKoQuizTags(minCount = 2, group?: KoMenuGroup): KoQuizTag[] {
  const counts = new Map<string, number>();

  for (const def of koQuizCatalogForHome as AnyQuizDef[]) {
    if (group && menuGroupOf(def) !== group) continue;
    const seen = new Set<string>();
    for (const raw of def.tags ?? []) {
      const t = koTagFromLabel(raw?.ko) ?? koTagFromLabel(raw?.en);
      if (!t || seen.has(t.slug)) continue;
      seen.add(t.slug);
      counts.set(t.slug, (counts.get(t.slug) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .filter(([, n]) => n >= minCount)
    .map(([slug, count]) => {
      const t = koTagBySlug(slug);
      return { slug, label: t?.ko ?? slug, emoji: t?.emoji, count };
    })
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "ko"));
}
