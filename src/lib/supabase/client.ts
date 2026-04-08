import { createClient } from "@supabase/supabase-js";

/** 카카오 implicit 콜백 URL — 해시의 access_token을 Supabase가 오인하지 않도록 제외 */
function isKakaoOAuthReturnPath(pathname: string): boolean {
  const p = pathname.replace(/\/+$/, "") || "/";
  return p === "/ko/app/login/callback" || p.startsWith("/ko/app/login/callback/");
}

/**
 * 브라우저 전용 — Client Component에서 사용.
 * 정적 export(SPA)에서는 `@supabase/ssr`의 createBrowserClient 대신 `createClient`를 쓰고,
 * `detectSessionInUrl`로 카카오 OAuth 리다이렉트를 Supabase 세션으로 처리하지 않도록 합니다.
 */
export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
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
