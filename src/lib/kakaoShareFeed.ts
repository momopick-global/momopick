/**
 * 카카오 Web 플랫폼에 등록한 **운영 사이트 origin** (로컬에서 공유 시 링크·이미지 정규화에 사용).
 * 배포 프리뷰 도메인만 쓸 경우 `.env`에서 덮어쓸 수 있음.
 */
export const KAKAO_SITE_ORIGIN =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_ORIGIN?.trim()) || "https://momopick.com";

const OG_PATH = "/images/og/og-ko.webp";

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

/**
 * 카카오 메시지 템플릿 **링크 → 경로** 칸용 (`/ko/...` + 쿼리·해시).
 * 웹 도메인은 콘솔에서 등록 도메인(momopick.com)을 고르고, 경로만 변수로 넘길 때 사용.
 */
export function pathForKakaoMessageTemplate(absoluteUrl: string): string {
  try {
    const u = new URL(absoluteUrl);
    const p = u.pathname || "/";
    const path = p.startsWith("/") ? p : `/${p}`;
    return `${path}${u.search}${u.hash}`;
  } catch {
    return "/";
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
  const imageUrl = customImagePath
    ? customImagePath.startsWith("http")
      ? customImagePath
      : `${origin}${customImagePath}`
    : `${origin}${OG_PATH}`;

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
