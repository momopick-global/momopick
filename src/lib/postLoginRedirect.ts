/**
 * 로그인 완료 후 이동할 경로. OAuth 리다이렉트로 origin이 바뀌어도 sessionStorage는 유지됩니다.
 */

export const POST_LOGIN_REDIRECT_KEY = "momopick_post_login_redirect";

/** 헤더·보관함 등에서 로그인 후 돌아올 경로 (trailing slash 권장) */
export const DEFAULT_LOGIN_SUCCESS_PATH = "/ko/app/saved/";

function isSafeInternalKoPath(p: string): boolean {
  if (!p.startsWith("/")) return false;
  if (!p.startsWith("/ko/")) return false;
  if (p.includes("//")) return false;
  if (p.includes("://")) return false;
  if (p.includes("?") || p.includes("#")) return false;
  return true;
}

/** URL 쿼리 `next`를 검증해 sessionStorage에 저장 */
export function rememberPostLoginRedirectFromParam(nextParam: string | null | undefined): void {
  if (typeof window === "undefined" || nextParam == null || nextParam === "") return;
  try {
    const decoded = decodeURIComponent(nextParam.trim());
    if (!isSafeInternalKoPath(decoded)) return;
    sessionStorage.setItem(POST_LOGIN_REDIRECT_KEY, decoded);
  } catch {
    /* ignore */
  }
}

/** 로그인 직후 한 번 읽고 제거. 없거나 위험하면 fallback */
export function consumePostLoginRedirect(fallback: string): string {
  if (typeof window === "undefined") return fallback;
  try {
    const v = sessionStorage.getItem(POST_LOGIN_REDIRECT_KEY);
    sessionStorage.removeItem(POST_LOGIN_REDIRECT_KEY);
    if (v && isSafeInternalKoPath(v)) return v;
  } catch {
    /* ignore */
  }
  return fallback;
}
