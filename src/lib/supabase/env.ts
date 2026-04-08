/** Google 등 Supabase OAuth 완료 후 돌아오는 경로 (trailingSlash 대응) */
export const SUPABASE_OAUTH_CALLBACK_PATH = "/ko/app/login/oauth/";

/** 흔한 설정 실수: `https://` 없이 `xxxx.supabase.co` 만 넣은 경우 */
export function normalizeSupabaseUrl(raw: string): string {
  const t = raw.trim().replace(/\/+$/, "");
  if (!t) return t;
  if (/^https?:\/\//i.test(t)) return t;
  if (/^[a-z0-9-]+\.supabase\.co$/i.test(t)) return `https://${t}`;
  return t;
}

export function isValidHttpUrlForSupabase(url: string): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    return (u.protocol === "https:" || u.protocol === "http:") && Boolean(u.hostname);
  } catch {
    return false;
  }
}

/**
 * 빌드에 Supabase 공개 변수가 있고, URL이 클라이언트에 넘길 수 있는 형태인지.
 * supabase-js를 import하지 않아 SSR에서도 안전합니다.
 */
export function isSupabasePublicEnvValid(): boolean {
  const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
  const anon = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();
  if (!rawUrl || !anon) return false;
  return isValidHttpUrlForSupabase(normalizeSupabaseUrl(rawUrl));
}
