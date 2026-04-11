"use client";

import { useKakaoAuth } from "@/context/KakaoAuthContext";
import { useSupabaseAuthUser } from "@/hooks/useSupabaseAuthUser";

/** 카카오·Supabase 모두 초기 상태를 읽은 뒤에만 미로그인으로 판단할 것 */
export function useKoAuthStatus() {
  const { user: kakaoUser, kakaoHydrated } = useKakaoAuth();
  const { user: supabaseUser, sessionReady } = useSupabaseAuthUser();

  const authResolved = kakaoHydrated && sessionReady;
  const isLoggedIn = Boolean(kakaoUser || supabaseUser);

  return { authResolved, isLoggedIn, kakaoUser, supabaseUser };
}
