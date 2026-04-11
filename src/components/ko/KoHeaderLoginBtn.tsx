"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useKakaoAuth } from "@/context/KakaoAuthContext";
import { useSupabaseAuthUser } from "@/hooks/useSupabaseAuthUser";
import { readKoHeaderLoginIconStorage, resolveKoHeaderLoginIcon } from "@/lib/koHeaderLoginIcon";
import { DEFAULT_LOGIN_SUCCESS_PATH } from "@/lib/postLoginRedirect";
import { HeaderLogoutIcon } from "./KoHeaderLogoutBtn";

function LoginSvg() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 헤더 오른쪽: 비로그인은 로그인 링크, 로그인 시 동일 자리에서 마이페이지 로그인 정보(#ko-account)로 이동 */
export function KoHeaderLoginBtn() {
  const { user: kakaoUser } = useKakaoAuth();
  const { user: supabaseUser } = useSupabaseAuthUser();
  const loggedIn = Boolean(kakaoUser || supabaseUser);

  const [stored, setStored] = useState<string | null>(null);

  const sync = useCallback(() => {
    setStored(readKoHeaderLoginIconStorage());
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("momopick-ko-header-login-icon", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("momopick-ko-header-login-icon", sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  if (loggedIn) {
    return (
      <Link
        className="btn-icon btn-icon--logout"
        href="/ko/app/saved/#ko-account"
        title="로그인 정보"
        aria-label="마이페이지에서 로그인 정보 보기"
      >
        <HeaderLogoutIcon />
      </Link>
    );
  }

  const resolved = resolveKoHeaderLoginIcon(stored);
  const loginHref = `/ko/app/login/?next=${encodeURIComponent(DEFAULT_LOGIN_SUCCESS_PATH)}`;

  return (
    <Link className="btn-icon" href={loginHref} title="로그인" aria-label="로그인">
      {resolved === "svg" ? (
        <LoginSvg />
      ) : (
        <img
          className="btn-icon__img"
          src={resolved.src}
          alt=""
          width={28}
          height={28}
          decoding="async"
        />
      )}
    </Link>
  );
}
