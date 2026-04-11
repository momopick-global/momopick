"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useKoAuthStatus } from "@/hooks/useKoAuthStatus";
import { DEFAULT_LOGIN_SUCCESS_PATH } from "@/lib/postLoginRedirect";

/** 로그인한 경우에만 자식(보관함·계정 카드) 표시. 미로그인이면 로그인으로 보냄 */
export function KoSavedRequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { authResolved, isLoggedIn } = useKoAuthStatus();

  useEffect(() => {
    if (!authResolved || isLoggedIn) return;
    const next = encodeURIComponent(DEFAULT_LOGIN_SUCCESS_PATH);
    router.replace(`/ko/app/login/?next=${next}`);
  }, [authResolved, isLoggedIn, router]);

  if (!authResolved) {
    return (
      <p className="policy-intro" style={{ marginTop: 24 }}>
        로그인 상태를 확인하는 중…
      </p>
    );
  }
  if (!isLoggedIn) {
    return (
      <p className="policy-intro" style={{ marginTop: 24 }}>
        로그인 페이지로 이동합니다…
      </p>
    );
  }
  return <>{children}</>;
}
