/** 카카오 피드 공유용 기본 이미지 (HTTPS, 카카오 콘솔에 등록된 도메인 경로 권장) */
export const KAKAO_SHARE_DEFAULT_IMAGE_URL = "https://momopick.com/assets/og/og-ko.webp";

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
