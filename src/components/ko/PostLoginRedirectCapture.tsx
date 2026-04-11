"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { rememberPostLoginRedirectFromParam } from "@/lib/postLoginRedirect";

/** `/ko/app/login/?next=...` 방문 시 로그인 성공 후 이동 경로를 sessionStorage에 저장 */
export function PostLoginRedirectCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    rememberPostLoginRedirectFromParam(searchParams.get("next"));
  }, [searchParams]);

  return null;
}
