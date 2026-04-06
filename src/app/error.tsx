"use client";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 28,
        fontFamily:
          'ui-sans-serif, system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
        background: "#f6f7fb",
        color: "#666666",
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: 22, margin: "0 0 12px" }}>화면을 불러오다 문제가 생겼어요</h1>
      <p style={{ margin: "0 0 8px", color: "rgba(22,16,34,0.65)", lineHeight: 1.6 }}>
        개발 중이라면 터미널·브라우저 콘솔(F12) 오류를 확인해 주세요. 캐시가 꼬였을 때는{" "}
        <code style={{ fontSize: 13 }}>npm run dev:fresh</code> 또는{" "}
        <code style={{ fontSize: 13 }}>npm run dev:reset</code>을 써 보세요.
      </p>
      {process.env.NODE_ENV === "development" && error?.message ? (
        <pre
          style={{
            margin: "16px 0",
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
          marginTop: 8,
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
  );
}
