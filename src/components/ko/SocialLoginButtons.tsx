"use client";

import { useRouter } from "next/navigation";
import { useCallback, useId, useState } from "react";
import { useKakaoAuth } from "@/context/KakaoAuthContext";
import { useSupabaseAuthUser } from "@/hooks/useSupabaseAuthUser";
import { clearQuizVault } from "@/lib/quizSavedResults";
import {
  SUPABASE_OAUTH_CALLBACK_PATH,
  isSupabasePublicEnvValid,
} from "@/lib/supabase/env";
import {
  IconGoogle,
  IconKakao,
  KakaoLoggedInOAuthBlock,
  SupabaseLoggedInOAuthBlock,
} from "@/components/ko/OAuthLoggedInBlocks";

function IconFacebook() {
  return (
    <svg className="oauth-btn__svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#fff"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function IconNaver() {
  return (
    <svg className="oauth-btn__svg" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#fff" d="M16.273 12.845 13.376 5H19v14h-4.727V11.155L7.624 19H2V5h4.727v7.845l2.897-7.845z" />
    </svg>
  );
}

/** 빌드 시 인라인됨 — 비어 있으면 SDK 스크립트 자체가 로드되지 않음 */
const KAKAO_JS_KEY_CONFIGURED = Boolean(
  (process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY ?? "").trim(),
);

/** URL·키 형식까지 통과할 때만 true (잘못된 URL이면 useEffect에서 createClient 예외로 페이지 전체 크래시 방지) */
const SUPABASE_CONFIGURED = isSupabasePublicEnvValid();

export function SocialLoginButtons() {
  const router = useRouter();
  const { user, loading, sdkReady, error, login, logout } = useKakaoAuth();
  const statusId = useId();
  const { user: supabaseUser, connectionError: supabaseConnectionError } = useSupabaseAuthUser();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  const loginWithGoogle = useCallback(async () => {
    setSupabaseError(null);
    setGoogleLoading(true);
    try {
      const { createSupabaseBrowserClient } = await import("@/lib/supabase/client");
      const supabase = createSupabaseBrowserClient();
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}${SUPABASE_OAUTH_CALLBACK_PATH}`,
        },
      });
      if (oauthError) {
        setSupabaseError(oauthError.message);
        setGoogleLoading(false);
        return;
      }
      if (data.url) window.location.href = data.url;
    } catch (e) {
      setSupabaseError(e instanceof Error ? e.message : "Google 로그인을 시작할 수 없습니다.");
      setGoogleLoading(false);
    }
  }, []);

  const logoutGoogle = useCallback(async () => {
    setSupabaseError(null);
    try {
      const { createSupabaseBrowserClient } = await import("@/lib/supabase/client");
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      clearQuizVault();
    } catch (e) {
      setSupabaseError(e instanceof Error ? e.message : "로그아웃에 실패했습니다.");
    }
    router.replace("/ko/app/login/");
  }, [router]);

  if (user) {
    return <KakaoLoggedInOAuthBlock user={user} onLogout={logout} />;
  }

  if (supabaseUser) {
    return <SupabaseLoggedInOAuthBlock user={supabaseUser} onLogout={logoutGoogle} />;
  }

  return (
    <div className="oauth-wrap">
      {(error || supabaseError || supabaseConnectionError) && (
        <p id={statusId} className="oauth-status" role="alert" style={{ color: "#b91c1c" }}>
          {error ?? supabaseError ?? supabaseConnectionError}
        </p>
      )}
      <ul className="oauth-list">
        <li>
          <button
            type="button"
            className="oauth-btn oauth-btn--google"
            aria-describedby={error || supabaseError || supabaseConnectionError ? statusId : undefined}
            onClick={() => void loginWithGoogle()}
            disabled={googleLoading || !SUPABASE_CONFIGURED}
            title={
              !SUPABASE_CONFIGURED
                ? "Cloudflare Pages 빌드 환경 변수에 NEXT_PUBLIC_SUPABASE_URL·ANON_KEY가 필요합니다"
                : googleLoading
                  ? "Google 로그인 페이지로 이동 중…"
                  : undefined
            }
          >
            <IconGoogle />
            {googleLoading
              ? "이동 중…"
              : !SUPABASE_CONFIGURED
                ? "Google (배포에 Supabase 키 필요)"
                : "Google로 계속하기"}
          </button>
          {!SUPABASE_CONFIGURED && (
            <p className="oauth-kakao-hint" role="note" style={{ marginTop: 8, fontSize: 13, color: "var(--muted)" }}>
              Google 로그인을 쓰려면 빌드 환경에{" "}
              <code style={{ fontSize: 12 }}>NEXT_PUBLIC_SUPABASE_URL</code>(반드시{" "}
              <code style={{ fontSize: 12 }}>https://…supabase.co</code> 형식),{" "}
              <code style={{ fontSize: 12 }}>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>가 필요합니다. 값이 비어 있거나
              주소가 잘못되면 콘솔에 Supabase URL 오류가 납니다. Supabase Authentication → Providers에서 Google을
              켜고, Redirect URLs에 <code style={{ fontSize: 12 }}>…/ko/app/login/oauth/</code>를 넣은 뒤{" "}
              <strong>다시 배포</strong>하세요.
            </p>
          )}
        </li>
        <li>
          <button
            type="button"
            className="oauth-btn oauth-btn--kakao"
            aria-describedby={error ? statusId : undefined}
            onClick={login}
            disabled={loading || !sdkReady || !KAKAO_JS_KEY_CONFIGURED}
            title={
              !KAKAO_JS_KEY_CONFIGURED
                ? "Cloudflare Pages에 NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY를 넣고 다시 배포하세요"
                : !sdkReady
                  ? "카카오 SDK 로드 중…"
                  : undefined
            }
          >
            <IconKakao />
            {loading
              ? "로그인 중…"
              : !KAKAO_JS_KEY_CONFIGURED
                ? "카카오 (배포에 앱 키 필요)"
                : !sdkReady
                  ? "카카오 SDK 로드 중…"
                  : "카카오로 시작하기"}
          </button>
          {!KAKAO_JS_KEY_CONFIGURED && (
            <p className="oauth-kakao-hint" role="note" style={{ marginTop: 8, fontSize: 13, color: "var(--muted)" }}>
              이 사이트 빌드에 카카오 앱 키가 포함되어 있지 않습니다. Cloudflare Pages 등 배포 환경에{" "}
              <code style={{ fontSize: 12 }}>NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY</code>를 등록한 뒤{" "}
              <strong>다시 배포</strong>해야 카카오 로그인이 동작합니다.
            </p>
          )}
        </li>
        <li>
          <button
            type="button"
            className="oauth-btn oauth-btn--facebook"
            aria-describedby={error ? statusId : undefined}
            onClick={() =>
              alert("Facebook 로그인은 아직 연결되어 있지 않습니다. Google 또는 카카오를 이용해 주세요.")
            }
          >
            <IconFacebook />
            Facebook으로 계속하기
          </button>
        </li>
        <li>
          <button
            type="button"
            className="oauth-btn oauth-btn--naver"
            aria-describedby={error ? statusId : undefined}
            onClick={() =>
              alert("네이버 로그인은 아직 연결되어 있지 않습니다. Google 또는 카카오를 이용해 주세요.")
            }
          >
            <IconNaver />
            네이버로 시작하기
          </button>
        </li>
      </ul>
    </div>
  );
}
