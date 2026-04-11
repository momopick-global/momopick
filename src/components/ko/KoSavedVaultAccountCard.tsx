"use client";

import { useRouter } from "next/navigation";
import {
  KakaoLoggedInOAuthBlock,
  SupabaseLoggedInOAuthBlock,
} from "@/components/ko/OAuthLoggedInBlocks";
import { useKakaoAuth } from "@/context/KakaoAuthContext";
import { useSupabaseAuthUser } from "@/hooks/useSupabaseAuthUser";
import { clearQuizVault } from "@/lib/quizSavedResults";

/** 로그인 페이지의 「소셜 로그인」 패널과 동일한 레이아웃 */
export function KoSavedVaultAccountCard() {
  const router = useRouter();
  const { user: kakaoUser, logout } = useKakaoAuth();
  const { user: supabaseUser } = useSupabaseAuthUser();

  const logoutGoogle = async () => {
    try {
      const { createSupabaseBrowserClient } = await import("@/lib/supabase/client");
      await createSupabaseBrowserClient().auth.signOut();
      clearQuizVault();
    } catch {
      /* ignore */
    }
    router.replace("/ko/app/login/");
  };

  if (kakaoUser) {
    return (
      <section className="login-panel ko-vault-login-panel" aria-labelledby="vault-social-title">
        <h2 id="vault-social-title" className="login-panel-title">
          소셜 로그인
        </h2>
        <KakaoLoggedInOAuthBlock user={kakaoUser} onLogout={logout} />
      </section>
    );
  }

  if (supabaseUser) {
    return (
      <section className="login-panel ko-vault-login-panel" aria-labelledby="vault-social-title">
        <h2 id="vault-social-title" className="login-panel-title">
          소셜 로그인
        </h2>
        <SupabaseLoggedInOAuthBlock user={supabaseUser} onLogout={logoutGoogle} />
      </section>
    );
  }

  return null;
}
