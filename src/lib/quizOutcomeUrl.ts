/** `percentageTypes.percentFromTotalScore` 와 동일 — lib ↔ components 순환 참조 방지 */
function percentFromTotalScore(total: number, maxTotal: number): number {
  if (maxTotal <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((total / maxTotal) * 100)));
}

/** 스낵 퀴즈: 단일 `r=<resultKey>` · 복합 `r=blend&l=key1,key2` */
const SNACK_R = "r";
const SNACK_L = "l";

/** 퍼센트 퀴즈: `p=0..100` (표시 퍼센트와 최대한 일치하도록 역산한 총점 사용) */
const PCT_P = "p";

export function buildSnackOutcomeQuery(
  isBlend: boolean,
  leaders: string[],
  singleKey: string | null,
): string {
  if (isBlend && leaders.length >= 2) {
    const params = new URLSearchParams();
    params.set(SNACK_R, "blend");
    params.set(SNACK_L, leaders.join(","));
    return params.toString();
  }
  if (!isBlend && singleKey) {
    return new URLSearchParams({ [SNACK_R]: singleKey }).toString();
  }
  return "";
}

/** 일부 웹뷰에서 `location.search`가 비어 있어도 `href`에는 쿼리가 있는 경우가 있음 */
export function getEffectiveLocationSearch(href: string, search: string): string {
  const s = search?.trim() ?? "";
  if (s.length > 1) return s.startsWith("?") ? s : `?${s}`;
  const q = href.indexOf("?");
  if (q < 0) return "";
  const hash = href.indexOf("#", q + 1);
  const slice = hash === -1 ? href.slice(q) : href.slice(q, hash);
  return slice.startsWith("?") ? slice : `?${slice}`;
}

/**
 * 브라우저에서 `location`·`document.URL`을 모두 보며 쿼리 후보를 합침.
 * (CDN/리다이렉트 직후 한 틱에만 `search`가 비는 경우 완화)
 */
export function getBrowserQuizSearchString(): string {
  if (typeof window === "undefined") return "";
  const href = window.location.href;
  const fromLoc = getEffectiveLocationSearch(href, window.location.search);
  if (fromLoc.length > 1) return fromLoc;
  try {
    if (typeof document !== "undefined" && document.URL) {
      const fromDoc = getEffectiveLocationSearch(document.URL, new URL(document.URL).search);
      if (fromDoc.length > 1) return fromDoc;
    }
  } catch {
    /* ignore */
  }
  return fromLoc;
}

/** `search`는 `?a=b` 또는 `a=b` 형태 모두 허용 */
export function parseSnackOutcomeSearch(
  search: string,
  resultKeys: string[],
): Record<string, number> | null {
  const q = search.startsWith("?") ? search.slice(1) : search;
  const params = new URLSearchParams(q);
  const r = params.get(SNACK_R)?.trim();
  if (!r) return null;
  const keySet = new Set(resultKeys);

  if (r === "blend") {
    const raw = params.get(SNACK_L) ?? "";
    const leaders = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const valid = leaders.filter((k) => keySet.has(k));
    if (valid.length < 2) return null;
    const counts: Record<string, number> = Object.fromEntries(resultKeys.map((k) => [k, 0]));
    for (const k of resultKeys) {
      counts[k] = valid.includes(k) ? 100 : 0;
    }
    return counts;
  }

  if (!keySet.has(r)) return null;
  const counts: Record<string, number> = Object.fromEntries(resultKeys.map((k) => [k, 0]));
  counts[r] = 100;
  return counts;
}

export function buildPercentageOutcomeQuery(percent: number): string {
  const p = Math.min(100, Math.max(0, Math.round(percent)));
  return new URLSearchParams({ [PCT_P]: String(p) }).toString();
}

export function parsePercentageOutcomePercent(search: string): number | null {
  const q = search.startsWith("?") ? search.slice(1) : search;
  const params = new URLSearchParams(q);
  const raw = params.get(PCT_P);
  if (raw == null || raw === "") return null;
  const pct = Number.parseInt(raw, 10);
  if (!Number.isFinite(pct) || pct < 0 || pct > 100) return null;
  return pct;
}

/** URL의 `p`와 화면에 보이는 %가 최대한 같아지도록 총점 역산 */
export function totalScoreForTargetPercent(pct: number, maxTotal: number): number {
  if (maxTotal <= 0) return 0;
  let best = 0;
  let bestDiff = 101;
  for (let t = 0; t <= maxTotal; t++) {
    const p = percentFromTotalScore(t, maxTotal);
    const d = Math.abs(p - pct);
    if (d < bestDiff) {
      bestDiff = d;
      best = t;
    }
  }
  return best;
}
