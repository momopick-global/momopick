"use client";

import Link from "next/link";

/** 로그인 세그먼트 전용 — Supabase 등 클라이언트 SDK 오류 시에도 나머지 사이트와 구분 */
export default function KoLoginError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="momopick-ko">
      <div className="wrap" style={{ paddingTop: 48, maxWidth: 480, margin: "0 auto" }}>
        <h1 style={{ fontSize: 22, margin: "0 0 12px" }}>로그인 화면을 불러오지 못했어요</h1>
        <p style={{ margin: "0 0 16px", color: "var(--muted)", lineHeight: 1.6 }}>
          브라우저 콘솔(F12)에 표시된 오류를 확인해 주세요. Cloudflare Pages에{" "}
          <code style={{ fontSize: 12 }}>NEXT_PUBLIC_SUPABASE_URL</code>·
          <code style={{ fontSize: 12 }}>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>가{" "}
          <strong>https://…supabase.co</strong> 형식으로 들어가 있는지, 배포를 다시 했는지 확인하세요.
        </p>
        {process.env.NODE_ENV === "development" && error?.message ? (
          <pre
            style={{
              margin: "0 0 16px",
              padding: 12,
              fontSize: 12,
              overflow: "auto",
              background: "rgba(0,0,0,0.05)",
              borderRadius: 8,
            }}
          >
            {error.message}
          </pre>
        ) : null}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button type="button" className="btn primary" onClick={() => reset()}>
            다시 시도
          </button>
          <Link className="btn sm" href="/ko/">
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
