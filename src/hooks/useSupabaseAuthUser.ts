"use client";

import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { isSupabasePublicEnvValid } from "@/lib/supabase/env";

const SUPABASE_CONFIGURED = isSupabasePublicEnvValid();

export function useSupabaseAuthUser(): {
  user: User | null;
  connectionError: string | null;
  /** 초기 getSession(또는 설정 없음) 처리 끝 — 그 전에는 user=null이어도 “미로그인”으로 단정하지 않음 */
  sessionReady: boolean;
} {
  const [user, setUser] = useState<User | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [sessionReady, setSessionReady] = useState(!SUPABASE_CONFIGURED);

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) return;
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;
    void import("@/lib/supabase/client")
      .then(({ createSupabaseBrowserClient }) => {
        if (cancelled) return;
        try {
          const supabase = createSupabaseBrowserClient();
          void supabase.auth.getSession().then(
            ({ data: { session } }) => {
              if (!cancelled) {
                setUser(session?.user ?? null);
                setSessionReady(true);
              }
            },
            () => {
              if (!cancelled) setSessionReady(true);
            },
          );
          const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!cancelled) setUser(session?.user ?? null);
          });
          unsubscribe = () => sub.subscription.unsubscribe();
        } catch (e) {
          if (!cancelled) {
            setConnectionError(
              e instanceof Error ? e.message : "Supabase에 연결할 수 없습니다. URL·키를 확인하세요.",
            );
            setSessionReady(true);
          }
        }
      })
      .catch(() => {
        if (!cancelled) {
          setConnectionError("Supabase 모듈을 불러오지 못했습니다.");
          setSessionReady(true);
        }
      });
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  return { user, connectionError, sessionReady };
}
