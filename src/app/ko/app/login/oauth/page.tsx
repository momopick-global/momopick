"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { consumePostLoginRedirect } from "@/lib/postLoginRedirect";

/**
 * Supabase OAuth(Google 등) PKCE 콜백.
 * 대시보드 Authentication → URL Configuration에 이 경로를 Redirect URLs에 추가해야 합니다.
 */
export default function SupabaseOAuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [message, setMessage] = useState("");
  const finished = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const err = params.get("error");
    const errDesc = params.get("error_description");
    if (err) {
      setMessage(errDesc ? decodeURIComponent(errDesc.replace(/\+/g, " ")) : err);
      setStatus("error");
      return;
    }

    let supabase: ReturnType<typeof createSupabaseBrowserClient>;
    try {
      supabase = createSupabaseBrowserClient();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Supabase 설정이 없습니다.");
      setStatus("error");
      return;
    }

    const goAfterLogin = () => {
      if (finished.current) return;
      finished.current = true;
      router.replace(consumePostLoginRedirect("/ko/"));
    };

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        goAfterLogin();
      }
    });

    void supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (finished.current) return;
      if (error) {
        setMessage(error.message);
        setStatus("error");
        return;
      }
      if (session) goAfterLogin();
    });

    const timeout = window.setTimeout(() => {
      if (finished.current) return;
      void supabase.auth.getSession().then(({ data: { session } }) => {
        if (finished.current) return;
        if (session) goAfterLogin();
        else {
          setMessage("로그인 세션을 확인하지 못했습니다. 다시 시도해 주세요.");
          setStatus("error");
        }
      });
    }, 15000);

    return () => {
      sub.subscription.unsubscribe();
      window.clearTimeout(timeout);
    };
  }, [router]);

  if (status === "error") {
    return (
      <div className="momopick-ko">
        <div className="wrap" style={{ paddingTop: 48, textAlign: "center" }}>
          <p style={{ fontSize: 32, marginBottom: 12 }}>😢</p>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>로그인에 실패했습니다</p>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>{message}</p>
          <Link className="btn primary" href="/ko/app/login/">
            다시 시도하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="momopick-ko">
      <div className="wrap" style={{ paddingTop: 48, textAlign: "center" }}>
        <p style={{ fontWeight: 600 }}>로그인 처리 중…</p>
      </div>
    </div>
  );
}
