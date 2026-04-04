import type { PercentageQuizDefinition } from "@/components/quiz/percentageTypes";
import { pickQuizText } from "@/components/quiz/types";
import type { SnackQuizDefinition } from "@/components/quiz/types";
import { koQuizCatalogForHome } from "@/content/quiz";
import { snackQuizHref } from "./quizRoutes";

export type KoHomeRailItem = {
  href: string;
  title: string;
  /** 레일 카드 하단 한 줄 (부제 · N문항) */
  subtitleLine: string;
  /** 부제만 (타일 등에서 문항 수 없이 쓸 때) */
  subtitleOnly: string;
  image: string;
  /** `rail-card--{railTheme}` */
  railTheme: string;
  priority: number;
};

const RAIL_THEMES = new Set(["love", "personality", "social", "style", "fun"]);

function railThemeFrom(def: SnackQuizDefinition | PercentageQuizDefinition): string {
  const t = def.card?.theme?.trim() || def.category?.trim() || "love";
  return RAIL_THEMES.has(t) ? t : "love";
}

function toRailItem(
  def: SnackQuizDefinition | PercentageQuizDefinition,
  locale: string,
): KoHomeRailItem {
  const cat = def.category?.trim() || "love";
  const href = snackQuizHref(locale, cat, def.id);
  const title = pickQuizText(locale, def.title);
  const subtitle = pickQuizText(locale, def.subtitle);
  const n = def.questions.length;
  const subtitleLine = subtitle ? `${subtitle} · ${n}문항` : `${n}문항`;
  const image = (
    def.card?.railImage ||
    def.card?.image ||
    def.images?.thumbnail ||
    ""
  ).trim();
  return {
    href,
    title: title || def.id,
    subtitleLine,
    subtitleOnly: subtitle,
    image,
    railTheme: railThemeFrom(def),
    priority: def.card?.priority ?? 0,
  };
}

/** `koQuizCatalogForHome` 기준, `card.priority` 내림차순 */
export function getKoHomeRailSorted(locale: string): KoHomeRailItem[] {
  return koQuizCatalogForHome
    .map((d) => toRailItem(d, locale))
    .sort((a, b) => b.priority - a.priority);
}
