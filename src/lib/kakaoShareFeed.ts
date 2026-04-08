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
 * 카카오톡 공유용 URL 정규화 — **4019**(미등록 Web 도메인) 완화.
 *
 * - `localhost` / `127.0.0.1` 등에서는 링크를 `NEXT_PUBLIC_SITE_ORIGIN`(기본 momopick.com) 기준으로 바꿉니다.
 *   (카카오 콘솔에 로컬 도메인을 넣지 않아도 운영 URL로 공유됩니다.)
 * - 이미지는 등록된 도메인의 HTTPS OG로 고정해 피드 검증에 맞춥니다.
 */
export function getKakaoFeedShareUrls(pageUrl: string): {
  mobileWebUrl: string;
  webUrl: string;
  imageUrl: string;
} {
  const imageUrl = `${KAKAO_SITE_ORIGIN.replace(/\/$/, "")}${OG_PATH}`;

  try {
    const u = new URL(pageUrl);
    if (isLocalHost(u.hostname)) {
      const prod = new URL(u.pathname + u.search + u.hash, `${KAKAO_SITE_ORIGIN.replace(/\/$/, "")}/`);
      const href = prod.href;
      return { mobileWebUrl: href, webUrl: href, imageUrl };
    }
    const href = u.href;
    return { mobileWebUrl: href, webUrl: href, imageUrl };
  } catch {
    const fallback = KAKAO_SITE_ORIGIN.replace(/\/$/, "");
    return {
      mobileWebUrl: fallback + "/",
      webUrl: fallback + "/",
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
