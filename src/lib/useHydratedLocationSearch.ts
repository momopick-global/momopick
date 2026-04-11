"use client";

import { useSyncExternalStore } from "react";
import { getEffectiveLocationSearch } from "@/lib/quizOutcomeUrl";

function subscribePopState(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
}

/**
 * 정적 HTML 하이드레이션 직후에도 `?r=` 등 쿼리를 안정적으로 읽기 위함.
 * `location.search`만 쓰면 일부 환경에서 빈 문자열로 남는 경우가 있어 `href`를 함께 봄.
 */
export function useHydratedLocationSearch(): string {
  return useSyncExternalStore(
    subscribePopState,
    () => getEffectiveLocationSearch(window.location.href, window.location.search),
    () => "",
  );
}
