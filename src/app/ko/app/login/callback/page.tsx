"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useKakaoAuth } from "@/context/KakaoAuthContext";

/**
 * 카카오 OAuth implicit flow 콜백 페이지.
 * URL 해시: #access_token=XXX&token_type=bearer&expires_in=NNN
 */
export default function KakaoCallbackPage() {
  const router = useRouter();
  const { fetchAndSaveUser } = useKakaoAuth();
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const error = params.get("error");
    const errorDesc = params.get("error_description");

    if (error || !accessToken) {
      setErrorMsg(errorDesc ?? "카카오 로그인이 취소되었거나 실패했습니다.");
      setStatus("error");
      return;
    }

    fetchAndSaveUser(accessToken)
      .then(() => {
        router.replace("/ko/");
      })
      .catch(() => {
        setErrorMsg("사용자 정보를 불러오지 못했습니다.");
        setStatus("error");
      });
  }, [fetchAndSaveUser, router]);

  if (status === "error") {
    return (
      <div className="momopick-ko">
        <div className="wrap" style={{ paddingTop: 48, textAlign: "center" }}>
          <p style={{ fontSize: 32, marginBottom: 12 }}>😢</p>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>로그인에 실패했습니다</p>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>{errorMsg}</p>
          <Link className="btn primary" href="/ko/app/login/">
            다시 시도하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="momopick-ko">
      <div
        className="wrap"
        style={{
          paddingTop: 72,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: "4px solid var(--line)",
            borderTopColor: "var(--accent)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ fontWeight: 700, color: "var(--muted)" }}>카카오 로그인 처리 중…</p>
      </div>
    </div>
  );
}
