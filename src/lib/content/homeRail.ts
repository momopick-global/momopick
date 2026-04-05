import type { PercentageQuizDefinition } from "@/components/quiz/percentageTypes";
import { pickQuizText } from "@/components/quiz/types";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import type { SnackQuizDefinition } from "@/components/quiz/types";
import { koQuizCatalogForHome } from "@/content/quiz";
import { quizPathSegment, snackQuizHref } from "./quizRoutes";

export type KoHomeRailItem = {
  href: string;
  /** URL 경로 세그먼트 (`/{lang}/{cat}/{slug}/`) — 툴팁·디버그용 */
  slug: string;
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
  const slug = quizPathSegment(def);
  const href = snackQuizHref(locale, cat, slug);
  const title = pickQuizText(locale, def.title);
  const subtitle = pickQuizText(locale, def.subtitle);
  const n = def.questions.length;
  const subtitleLine = subtitle ? `${subtitle} · ${n}문항` : `${n}문항`;
  const imageRaw = (
    def.card?.railImage ||
    def.card?.image ||
    def.images?.thumbnail ||
    ""
  ).trim();
  const image = imageRaw.startsWith("/images/quiz/")
    ? quizAssetUrl(imageRaw, locale)
    : imageRaw;
  return {
    href,
    slug,
    title: title || String(def.id),
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

function isLoveCategory(def: SnackQuizDefinition | PercentageQuizDefinition): boolean {
  return def.category?.trim() === "love";
}

/**
 * JSON `category: "love"` 인 퀴즈만 — 메인 `썸·연애` 섹션 타일용.
 * 정렬은 홈 레일과 동일하게 `card.priority` 내림차순.
 */
export function getKoLoveQuizzesSorted(locale: string): KoHomeRailItem[] {
  return koQuizCatalogForHome
    .filter(isLoveCategory)
    .map((d) => toRailItem(d, locale))
    .sort((a, b) => b.priority - a.priority);
}
