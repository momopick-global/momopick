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

/** URL·키 형식까지 통과할 때만 true (잘못된 URL이면 useEffect에서 createClient 예외로 페이지 전체 크래시 방지) */
const SUPABASE_CONFIGURED = isSupabasePublicEnvValid();

/** 카카오 로그인 노출 여부. 현재 임시 비활성화(false).
 *  Supabase Kakao provider 설정을 마치면 true 로 바꾸면 버튼이 다시 보인다.
 *  절차: docs/project/kakao-login-todo.md */
const KAKAO_LOGIN_ENABLED = false;

export function SocialLoginButtons() {
  const router = useRouter();
  const { user, error, logout } = useKakaoAuth();
  const statusId = useId();
  const { user: supabaseUser, connectionError: supabaseConnectionError } = useSupabaseAuthUser();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [kakaoLoading, setKakaoLoading] = useState(false);
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

  const loginWithKakao = useCallback(async () => {
    setSupabaseError(null);
    setKakaoLoading(true);
    try {
      const { createSupabaseBrowserClient } = await import("@/lib/supabase/client");
      const supabase = createSupabaseBrowserClient();
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `${window.location.origin}${SUPABASE_OAUTH_CALLBACK_PATH}`,
        },
      });
      if (oauthError) {
        setSupabaseError(oauthError.message);
        setKakaoLoading(false);
        return;
      }
      if (data.url) window.location.href = data.url;
    } catch (e) {
      setSupabaseError(e instanceof Error ? e.message : "카카오 로그인을 시작할 수 없습니다.");
      setKakaoLoading(false);
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
        {/* 카카오 로그인 임시 비활성화 — Supabase Kakao provider 설정 후 KAKAO_LOGIN_ENABLED=true 로 변경.
            자세한 재활성화 절차는 docs/project/kakao-login-todo.md 참고. */}
        {KAKAO_LOGIN_ENABLED && (
          <li>
            <button
              type="button"
              className="oauth-btn oauth-btn--kakao"
              aria-describedby={error || supabaseError || supabaseConnectionError ? statusId : undefined}
              onClick={() => void loginWithKakao()}
              disabled={kakaoLoading || !SUPABASE_CONFIGURED}
              title={
                !SUPABASE_CONFIGURED
                  ? "Cloudflare Pages 빌드 환경 변수에 NEXT_PUBLIC_SUPABASE_URL·ANON_KEY가 필요합니다"
                  : kakaoLoading
                    ? "카카오 로그인 페이지로 이동 중…"
                    : undefined
              }
            >
              <IconKakao />
              {kakaoLoading
                ? "이동 중…"
                : !SUPABASE_CONFIGURED
                  ? "카카오 (배포에 Supabase 키 필요)"
                  : "카카오로 시작하기"}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
