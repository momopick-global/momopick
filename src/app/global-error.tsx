"use client";

import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body>
        <div
          style={{
            minHeight: "100vh",
            padding: 28,
            fontFamily:
              'ui-sans-serif, system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
            background: "#f6f7fb",
            color: "#333333",
            maxWidth: 520,
            margin: "0 auto",
          }}
        >
          <h1 style={{ fontSize: 22, margin: "0 0 12px" }}>심각한 오류가 발생했어요</h1>
          <p style={{ margin: "0 0 16px", color: "rgba(22,16,34,0.65)", lineHeight: 1.6 }}>
            루트 레이아웃까지 영향을 준 오류입니다.{" "}
            <code style={{ fontSize: 13 }}>npm run dev:fresh</code>로 캐시를 비운 뒤 다시 실행해
            보세요.
          </p>
          {process.env.NODE_ENV === "development" && error?.message ? (
            <pre
              style={{
                margin: "0 0 16px",
                padding: 12,
                fontSize: 12,
                overflow: "auto",
                background: "#fff",
                border: "1px solid rgba(90,103,242,0.2)",
                borderRadius: 12,
              }}
            >
              {error.message}
            </pre>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "12px 18px",
              borderRadius: 999,
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
              color: "#fff",
              background: "linear-gradient(135deg, #5a67f2, #e85a8c)",
            }}
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
