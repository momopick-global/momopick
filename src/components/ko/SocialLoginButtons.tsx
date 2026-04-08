"use client";

import { useId } from "react";
import { useKakaoAuth } from "@/context/KakaoAuthContext";

function IconGoogle() {
  return (
    <svg className="oauth-btn__svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function IconKakao() {
  return (
    <svg className="oauth-btn__svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#3C1E1E"
        d="M12 3c5.523 0 10 3.582 10 8s-4.477 8-10 8c-.555 0-1.1-.04-1.63-.12L5 21l.92-3.45C4.02 15.65 2 13.49 2 11c0-4.418 4.477-8 10-8z"
      />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg className="oauth-btn__svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#fff"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function IconNaver() {
  return (
    <svg className="oauth-btn__svg" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#fff" d="M16.273 12.845 13.376 5H19v14h-4.727V11.155L7.624 19H2V5h4.727v7.845l2.897-7.845z" />
    </svg>
  );
}

/** 빌드 시 인라인됨 — 비어 있으면 SDK 스크립트 자체가 로드되지 않음 */
const KAKAO_JS_KEY_CONFIGURED = Boolean(
  (process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY ?? "").trim(),
);

export function SocialLoginButtons() {
  const { user, loading, sdkReady, error, login, logout } = useKakaoAuth();
  const statusId = useId();

  if (user) {
    return (
      <div className="oauth-wrap">
        <div className="oauth-status" role="status">
          {user.profileImageUrl && (
            <img
              src={user.profileImageUrl}
              alt=""
              width={36}
              height={36}
              style={{ borderRadius: "50%", verticalAlign: "middle", marginRight: 8 }}
            />
          )}
          <strong>{user.nickname}</strong>님, 환영합니다 👋
        </div>
        <ul className="oauth-list" style={{ marginTop: 12 }}>
          <li>
            <button
              type="button"
              className="oauth-btn oauth-btn--kakao"
              onClick={logout}
            >
              <IconKakao />
              카카오 로그아웃
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="oauth-wrap">
      {error && (
        <p id={statusId} className="oauth-status" role="alert" style={{ color: "#b91c1c" }}>
          {error}
        </p>
      )}
      <ul className="oauth-list">
        <li>
          <button
            type="button"
            className="oauth-btn oauth-btn--google"
            aria-describedby={error ? statusId : undefined}
            onClick={() => alert("Google 로그인은 준비 중입니다.")}
          >
            <IconGoogle />
            Google로 계속하기
          </button>
        </li>
        <li>
          <button
            type="button"
            className="oauth-btn oauth-btn--kakao"
            aria-describedby={error ? statusId : undefined}
            onClick={login}
            disabled={loading || !sdkReady}
            title={
              !KAKAO_JS_KEY_CONFIGURED
                ? "배포 빌드에 카카오 JavaScript 키가 없습니다"
                : !sdkReady
                  ? "카카오 SDK 로드 중…"
                  : undefined
            }
          >
            <IconKakao />
            {loading ? "로그인 중…" : !sdkReady ? "준비 중…" : "카카오로 시작하기"}
          </button>
          {!KAKAO_JS_KEY_CONFIGURED && (
            <p className="oauth-kakao-hint" role="note" style={{ marginTop: 8, fontSize: 13, color: "var(--muted)" }}>
              이 사이트 빌드에 카카오 앱 키가 포함되어 있지 않습니다. Cloudflare Pages 등 배포 환경에{" "}
              <code style={{ fontSize: 12 }}>NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY</code>를 등록한 뒤{" "}
              <strong>다시 배포</strong>해야 카카오 로그인이 동작합니다.
            </p>
          )}
        </li>
        <li>
          <button
            type="button"
            className="oauth-btn oauth-btn--facebook"
            aria-describedby={error ? statusId : undefined}
            onClick={() => alert("Facebook 로그인은 준비 중입니다.")}
          >
            <IconFacebook />
            Facebook으로 계속하기
          </button>
        </li>
        <li>
          <button
            type="button"
            className="oauth-btn oauth-btn--naver"
            aria-describedby={error ? statusId : undefined}
            onClick={() => alert("네이버 로그인은 준비 중입니다.")}
          >
            <IconNaver />
            네이버로 시작하기
          </button>
        </li>
      </ul>
    </div>
  );
}
