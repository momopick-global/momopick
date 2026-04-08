import { createClient } from "@supabase/supabase-js";

/** 카카오 implicit 콜백 URL — 해시의 access_token을 Supabase가 오인하지 않도록 제외 */
function isKakaoOAuthReturnPath(pathname: string): boolean {
  const p = pathname.replace(/\/+$/, "") || "/";
  return p === "/ko/app/login/callback" || p.startsWith("/ko/app/login/callback/");
}

/** 흔한 설정 실수: `https://` 없이 `xxxx.supabase.co` 만 넣은 경우 */
function normalizeSupabaseUrl(raw: string): string {
  const t = raw.trim().replace(/\/+$/, "");
  if (!t) return t;
  if (/^https?:\/\//i.test(t)) return t;
  if (/^[a-z0-9-]+\.supabase\.co$/i.test(t)) return `https://${t}`;
  return t;
}

function isValidHttpUrlForSupabase(url: string): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    return (u.protocol === "https:" || u.protocol === "http:") && Boolean(u.hostname);
  } catch {
    return false;
  }
}

/**
 * 빌드에 Supabase 공개 변수가 있고, URL이 Supabase 클라이언트에 넘길 수 있는 형태인지.
 * (비어 있거나 `https://` 누락·잘못된 문자열이면 false → 클라이언트 생성 시도 안 함)
 */
export function isSupabasePublicEnvValid(): boolean {
  const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
  const anon = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();
  if (!rawUrl || !anon) return false;
  return isValidHttpUrlForSupabase(normalizeSupabaseUrl(rawUrl));
}

/**
 * 브라우저 전용 — Client Component에서 사용.
 * 정적 export(SPA)에서는 `@supabase/ssr`의 createBrowserClient 대신 `createClient`를 쓰고,
 * `detectSessionInUrl`로 카카오 OAuth 리다이렉트를 Supabase 세션으로 처리하지 않도록 합니다.
 */
export function createSupabaseBrowserClient() {
  const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
  const anon = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();
  if (!rawUrl || !anon) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }
  const url = normalizeSupabaseUrl(rawUrl);
  if (!isValidHttpUrlForSupabase(url)) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL이 올바른 https 주소가 아닙니다. 예: https://프로젝트ref.supabase.co",
    );
  }
  return createClient(url, anon, {
    auth: {
      flowType: "pkce",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: (link, params) => {
        if (isKakaoOAuthReturnPath(link.pathname)) return false;
        return Boolean(params.access_token || params.error_description);
      },
    },
  });
}

/** Google 등 Supabase OAuth 완료 후 돌아오는 경로 (trailingSlash 대응) */
export const SUPABASE_OAUTH_CALLBACK_PATH = "/ko/app/login/oauth/";
