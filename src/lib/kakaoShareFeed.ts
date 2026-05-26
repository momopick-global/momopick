/**
 * 카카오 Web 플랫폼에 등록한 **운영 사이트 origin** (로컬에서 공유 시 링크·이미지 정규화에 사용).
 * 배포 프리뷰 도메인만 쓸 경우 `.env`에서 덮어쓸 수 있음.
 */
export const KAKAO_SITE_ORIGIN =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_ORIGIN?.trim()) || "https://momopick.com";

const OG_PATH = "/images/og/og-ko.webp";

/**
 * 카카오 측 OG 캐시 회피용 cache-busting 키.
 * 공유 이미지가 갱신됐는데 카카오 캐시가 옛 이미지를 들고 있는 경우, 이 값을
 * 변경(bump)해 새 URL로 인식시킨다. 디버거(`developers.kakao.com/tool/debugger/sharing`)
 * 에서 수동 갱신과 병행. 카카오는 쿼리스트링이 다르면 별도 URL로 취급해 재 fetch.
 */
const SHARE_IMAGE_CACHE_KEY = "20260527";

/** 이미지 URL에 `?v=<key>` 형태의 cache-busting 쿼리를 부착 */
function appendCacheBuster(url: string, key: string): string {
  if (!url || !key) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("v", key);
    return u.href;
  } catch {
    return url;
  }
}

function isLocalHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname.endsWith(".local")
  );
}

/**
 * 단일 URL을 카카오 등록 도메인(production origin)으로 정규화합니다.
 * localhost / 127.0.0.1 등 로컬 호스트는 KAKAO_SITE_ORIGIN 기준으로 변환.
 */
export function normalizeUrlForKakao(url: string): string {
  const origin = KAKAO_SITE_ORIGIN.replace(/\/$/, "");
  const base = `${origin}/`;
  const trimmed = url.trim();
  if (!trimmed) return base;
  try {
    /** 상대 경로(`/ko/...`)는 반드시 base와 함께 파싱 (단독 `new URL('/ko')` 는 예외 → 메인으로 잘못 떨어지던 버그) */
    const u = new URL(trimmed, base);
    if (isLocalHost(u.hostname)) {
      return new URL(u.pathname + u.search + u.hash, base).href;
    }
    return u.href;
  } catch {
    return base;
  }
}

/** `output: "export"` + `trailingSlash: true` — 페이지 URL은 보통 끝 `/` 필요 */
function ensureTrailingSlashPathNoLeading(pathWithQueryHash: string): string {
  const q = pathWithQueryHash.indexOf("?");
  const h = pathWithQueryHash.indexOf("#");
  const cut = Math.min(q === -1 ? Infinity : q, h === -1 ? Infinity : h);
  const pathPart = cut === Infinity ? pathWithQueryHash : pathWithQueryHash.slice(0, cut);
  const rest = cut === Infinity ? "" : pathWithQueryHash.slice(cut);
  if (!pathPart || pathPart.endsWith("/")) return pathWithQueryHash;
  const lastSeg = pathPart.split("/").filter(Boolean).pop() ?? "";
  if (lastSeg.includes(".")) return pathWithQueryHash;
  return `${pathPart}/${rest}`;
}

/**
 * 카카오 메시지 템플릿 **경로 변수**용 — **선행 `/` 없음** (`ko/love/.../` + 쿼리·해시).
 * 콘솔에서 `https://momopick.com/${RESULT_PATH}` 또는 경로 `/${RESULT_PATH}` 처럼 쓸 때 슬래시가 겹치지 않게 함.
 */
export function pathForKakaoMessageTemplate(absoluteUrl: string): string {
  try {
    const u = new URL(absoluteUrl);
    let p = u.pathname || "/";
    if (p.startsWith("/")) p = p.slice(1);
    return ensureTrailingSlashPathNoLeading(`${p}${u.search}${u.hash}`);
  } catch {
    return "";
  }
}

/**
 * 커스텀 템플릿에서 `RESULT_PATH` 안에 `?쿼리`를 넣으면 일부 환경에서 쿼리가 잘리고
 * 「결과 보기」가 퀴즈 시작 URL과 같아지는 경우가 있음 → 경로와 접미사로 분리.
 *
 * - `path`: 선행 `/` 없음 (`ko/love/slug/`)
 * - `suffix`: 쿼리가 있으면 `?r=…` 형태, 없으면 `""` — 템플릿: `https://momopick.com/${RESULT_PATH}${RESULT_SUFFIX}`
 */
export function kakaoTemplatePathAndSuffix(absoluteUrl: string): { path: string; suffix: string } {
  try {
    const u = new URL(absoluteUrl);
    let p = u.pathname || "/";
    if (p.startsWith("/")) p = p.slice(1);
    p = ensureTrailingSlashPathNoLeading(p);
    const searchPart = u.search && u.search.startsWith("?") ? u.search : "";
    const hashPart = u.hash && u.hash.startsWith("#") ? u.hash : "";
    return { path: p, suffix: `${searchPart}${hashPart}` };
  } catch {
    return { path: "", suffix: "" };
  }
}

/** `/ko`, `/en` 처럼 로케일 루트만 있으면 퀴즈 링크로 쓰기 부적합 */
export function isKakaoPathLocaleHubOnly(pathWithoutLeadingSlash: string): boolean {
  const pathOnly = pathWithoutLeadingSlash.split(/[?#]/)[0] ?? "";
  const segs = pathOnly.replace(/\/+$/, "").split("/").filter(Boolean);
  if (segs.length === 0) return true;
  if (segs.length === 1 && /^(ko|en|ja|es|zh)$/i.test(segs[0] ?? "")) return true;
  return false;
}

/** 카카오 Web 도메인 등록이 보통 apex 기준 — `www` 를 제거 */
export function normalizeMomopickHostForShare(url: string): string {
  const abs = absoluteHttpsUrlForKakao(url);
  try {
    const u = new URL(abs);
    if (u.hostname === "www.momopick.com") {
      u.hostname = "momopick.com";
      return u.href;
    }
    return abs;
  } catch {
    return abs;
  }
}

/** 카카오 피드·커스텀 템플릿용: 항상 절대 URL(https), 공백 제거 */
export function absoluteHttpsUrlForKakao(url: string): string {
  const normalized = normalizeUrlForKakao(url);
  try {
    const u = new URL(normalized);
    if (u.protocol === "http:" && (u.hostname === "momopick.com" || u.hostname === "www.momopick.com")) {
      u.protocol = "https:";
      return u.href;
    }
    return u.href;
  } catch {
    return normalized;
  }
}

/**
 * 카카오톡 공유용 URL 정규화 — **4019**(미등록 Web 도메인) 완화.
 *
 * - `localhost` / `127.0.0.1` 등에서는 링크를 `NEXT_PUBLIC_SITE_ORIGIN`(기본 momopick.com) 기준으로 바꿉니다.
 *   (카카오 콘솔에 로컬 도메인을 넣지 않아도 운영 URL로 공유됩니다.)
 * - 이미지는 등록된 도메인의 HTTPS OG로 고정해 피드 검증에 맞춥니다.
 */
export function getKakaoFeedShareUrls(
  pageUrl: string,
  /** 결과 이미지 경로 (`/quizzes/...`) 또는 절대 URL. 없으면 기본 OG 이미지 사용 */
  customImagePath?: string,
): {
  mobileWebUrl: string;
  webUrl: string;
  imageUrl: string;
} {
  const origin = KAKAO_SITE_ORIGIN.replace(/\/$/, "");
  const rawImageUrl = customImagePath
    ? customImagePath.startsWith("http")
      ? customImagePath
      : `${origin}${customImagePath}`
    : `${origin}${OG_PATH}`;
  const imageUrl = appendCacheBuster(rawImageUrl, SHARE_IMAGE_CACHE_KEY);

  try {
    const u = new URL(pageUrl);
    if (isLocalHost(u.hostname)) {
      const prod = new URL(u.pathname + u.search + u.hash, `${origin}/`);
      const href = prod.href;
      return { mobileWebUrl: href, webUrl: href, imageUrl };
    }
    const href = u.href;
    return { mobileWebUrl: href, webUrl: href, imageUrl };
  } catch {
    return {
      mobileWebUrl: origin + "/",
      webUrl: origin + "/",
      imageUrl,
    };
  }
}

/**
 * 퀴즈 `shareText`(예: `제목 — 부제 | Momopick`)를 피드 title/description으로 나눔.
 */
export function parseShareTextForKakaoFeed(shareText: string): { title: string; description: string } {
  const noBrand = shareText.replace(/\s*\|\s*Momopick\s*$/i, "").trim();
  const sep = noBrand.indexOf(" — ");
  if (sep > 0) {
    return {
      title: noBrand.slice(0, sep).trim().slice(0, 200) || "모모픽",
      description: noBrand.slice(sep + 3).trim().slice(0, 300) || "재미로 보는 심리 테스트",
    };
  }
  if (noBrand.length <= 200) {
    return {
      title: noBrand || "모모픽",
      description: "재미로 보는 심리 테스트",
    };
  }
  return {
    title: noBrand.slice(0, 200),
    description: noBrand.slice(200, 500).trim() || "재미로 보는 심리 테스트",
  };
}
