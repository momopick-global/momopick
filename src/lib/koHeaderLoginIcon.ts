/** 헤더 오른쪽 로그인 버튼 아이콘 (localStorage + 경로 규칙) */

export const KO_HEADER_LOGIN_ICON_STORAGE_KEY = "momopick_ko_header_login_icon_v1";

/** 전체 페이지에서 SVG 기본(사람 아이콘)만 쓰도록 할 때 저장하는 값 */
export const KO_HEADER_LOGIN_USE_SVG = "__svg__";

/** 업로드 시 localStorage 용량 제한 (대략) */
export const KO_HEADER_LOGIN_MAX_UPLOAD_BYTES = 450 * 1024;

export function readKoHeaderLoginIconStorage(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(KO_HEADER_LOGIN_ICON_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function dispatchKoHeaderLoginIconChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("momopick-ko-header-login-icon"));
}

/**
 * stored: null = 미설정 → SVG(사람 아이콘)
 * "__svg__" = SVG
 * 그 외 = data URL 또는 http(s) URL → 이미지로 표시
 */
export function resolveKoHeaderLoginIcon(
  stored: string | null,
): "svg" | { kind: "img"; src: string } {
  if (stored === KO_HEADER_LOGIN_USE_SVG) return "svg";
  if (stored && stored.length > 0) return { kind: "img", src: stored };
  return "svg";
}
