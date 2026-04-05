"use client";

import { useId, useState } from "react";

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

export function SocialLoginButtons() {
  const [message, setMessage] = useState<string | null>(null);
  const statusId = useId();

  const onPick = (label: string) => {
    setMessage(`${label} 로그인 연동은 준비 중입니다.`);
  };

  return (
    <div className="oauth-wrap">
      {message ? (
        <p id={statusId} className="oauth-status" role="status">
          {message}
        </p>
      ) : null}
      <ul className="oauth-list">
        <li>
          <button
            type="button"
            className="oauth-btn oauth-btn--google"
            aria-describedby={message ? statusId : undefined}
            onClick={() => onPick("Google")}
          >
            <IconGoogle />
            Google로 계속하기
          </button>
        </li>
        <li>
          <button
            type="button"
            className="oauth-btn oauth-btn--kakao"
            aria-describedby={message ? statusId : undefined}
            onClick={() => onPick("카카오")}
          >
            <IconKakao />
            카카오로 시작하기
          </button>
        </li>
        <li>
          <button
            type="button"
            className="oauth-btn oauth-btn--facebook"
            aria-describedby={message ? statusId : undefined}
            onClick={() => onPick("Facebook")}
          >
            <IconFacebook />
            Facebook으로 계속하기
          </button>
        </li>
        <li>
          <button
            type="button"
            className="oauth-btn oauth-btn--naver"
            aria-describedby={message ? statusId : undefined}
            onClick={() => onPick("네이버")}
          >
            <IconNaver />
            네이버로 시작하기
          </button>
        </li>
      </ul>
    </div>
  );
}
