import type { PercentageQuizDefinition } from "@/components/quiz/percentageTypes";
import { pickQuizText } from "@/components/quiz/types";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import type { SnackQuizDefinition } from "@/components/quiz/types";
import { koQuizCatalogForHome } from "@/content/quiz";
import { quizPathSegment, snackQuizHref } from "./quizRoutes";
import { koTagFromLabel } from "./koTagRegistry";
import { chosungOf, normalizeText } from "@/lib/search/koChosung";

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
 * 심층 테스트 목록 — `category: "love"` 이면서 원픽(1문항)이 아닌 퀴즈만.
 * 원픽은 별도 메뉴(`/ko/onepick/`)로 분리되므로 심층 목록·홈 심층 섹션에서 제외한다.
 * 정렬은 홈 레일과 동일하게 `card.priority` 내림차순.
 */
export function getKoLoveQuizzesSorted(locale: string): KoHomeRailItem[] {
  return koQuizCatalogForHome
    .filter((d) => isLoveCategory(d) && !isOnePickQuiz(d))
    .map((d) => toRailItem(d, locale))
    .sort((a, b) => b.priority - a.priority);
}

/**
 * 원픽 테스트 판별 — "1문항" 형식을 데이터에서 자동 판별한다.
 * 별도 `category`/플래그를 두지 않으므로, 문항이 1개인 퀴즈를 만들면 자동으로 원픽에 편입된다.
 */
export function isOnePickQuiz(def: SnackQuizDefinition | PercentageQuizDefinition): boolean {
  return (def.questions?.length ?? 0) === 1;
}

/** `/ko/onepick/` 용 — 문항 1개짜리 퀴즈만, 홈 레일과 동일하게 priority 내림차순 */
export function getKoOnePickQuizzesSorted(locale: string): KoHomeRailItem[] {
  return koQuizCatalogForHome
    .filter(isOnePickQuiz)
    .map((d) => toRailItem(d, locale))
    .sort((a, b) => b.priority - a.priority);
}

/** `/ko/love/` 허브 목록형과 동일 정렬에서 `excludeHref` 제외 후 상위 N개 */
export function getKoLoveMoreQuizzes(locale: string, excludeHref: string, limit = 4): KoHomeRailItem[] {
  return getKoLoveQuizzesSorted(locale)
    .filter((item) => item.href !== excludeHref)
    .slice(0, limit);
}

/** 메뉴 그룹(구조) — 데이터로 자동 판별. 원픽(1문항) / 성향(card.theme=personality) / 심층(그 외). */
export type KoMenuGroup = "onepick" | "personality" | "deep";
export function menuGroupOf(def: SnackQuizDefinition | PercentageQuizDefinition): KoMenuGroup {
  if ((def.questions?.length ?? 0) === 1) return "onepick";
  if (def.card?.theme?.trim() === "personality") return "personality";
  return "deep";
}

/** 퀴즈가 가진 캐노니컬 태그 slug 목록 (레지스트리로 정규화, 중복 제거) */
export function canonicalTagSlugsOf(def: SnackQuizDefinition | PercentageQuizDefinition): string[] {
  const out = new Set<string>();
  for (const raw of def.tags ?? []) {
    const t = koTagFromLabel(raw?.ko) ?? koTagFromLabel(raw?.en);
    if (t) out.add(t.slug);
  }
  return [...out];
}

/** 검색용 인덱스 항목 — 표시용 레일 정보 + 매칭용 정규화 텍스트·초성 */
export type KoSearchItem = KoHomeRailItem & {
  /** 태그 칩 필터용 캐노니컬 slug 목록 */
  tagSlugs: string[];
  /** 매칭용: 제목+부제+태그 라벨을 소문자·공백제거로 합친 문자열 */
  keywords: string;
  /** 매칭용: 위 텍스트의 초성 문자열 */
  chosung: string;
};

/** 전체 퀴즈 클라이언트 검색 인덱스 (정적 export이므로 빌드 시 생성). */
export function getKoSearchIndex(locale: string): KoSearchItem[] {
  return koQuizCatalogForHome
    .map((def) => {
      const item = toRailItem(def, locale);
      const tagLabels = (def.tags ?? [])
        .map((t) => pickQuizText(locale, t))
        .filter(Boolean);
      const raw = [item.title, item.subtitleOnly, ...tagLabels].join(" ");
      return {
        ...item,
        tagSlugs: canonicalTagSlugsOf(def),
        keywords: normalizeText(raw),
        chosung: chosungOf(raw),
      };
    })
    .sort((a, b) => b.priority - a.priority);
}

/** 특정 태그(slug)가 달린 퀴즈를 심층/원픽/성향 그룹으로 나눠 반환 (각 그룹 priority 내림차순) */
export function getKoQuizzesByTag(
  slug: string,
  locale: string,
): Record<KoMenuGroup, KoHomeRailItem[]> {
  const groups: Record<KoMenuGroup, KoHomeRailItem[]> = { deep: [], onepick: [], personality: [] };
  for (const def of koQuizCatalogForHome) {
    if (!canonicalTagSlugsOf(def).includes(slug)) continue;
    groups[menuGroupOf(def)].push(toRailItem(def, locale));
  }
  (Object.keys(groups) as KoMenuGroup[]).forEach((g) =>
    groups[g].sort((a, b) => b.priority - a.priority),
  );
  return groups;
}
