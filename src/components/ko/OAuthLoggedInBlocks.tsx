"use client";

import type { User } from "@supabase/supabase-js";
import type { KakaoUser } from "@/lib/kakaoAuth";
import { supabaseAvatarUrl, supabaseDisplayName } from "@/lib/supabaseUserDisplay";

export function IconGoogle() {
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

export function IconKakao() {
  return (
    <svg className="oauth-btn__svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#3C1E1E"
        d="M12 3c5.523 0 10 3.582 10 8s-4.477 8-10 8c-.555 0-1.1-.04-1.63-.12L5 21l.92-3.45C4.02 15.65 2 13.49 2 11c0-4.418 4.477-8 10-8z"
      />
    </svg>
  );
}

export function KakaoLoggedInOAuthBlock({
  user,
  onLogout,
}: {
  user: KakaoUser;
  onLogout: () => void;
}) {
  const kakaoImg = user.profileImageUrl ?? user.thumbnailImageUrl;
  return (
    <div className="oauth-wrap">
      <div className="oauth-status oauth-status--welcome" role="status">
        {kakaoImg ? (
          // eslint-disable-next-line @next/next/no-img-element -- 카카오 프로필 URL
          <img src={kakaoImg} alt="" width={36} height={36} className="oauth-status__avatar" />
        ) : null}
        <span className="oauth-status__greet">
          <strong>{user.nickname}</strong>님, 환영합니다 👋
        </span>
      </div>
      {user.email ? (
        <p className="oauth-email-line">{user.email}</p>
      ) : null}
      <ul className="oauth-list oauth-list--logged-in">
        <li>
          <button type="button" className="oauth-btn oauth-btn--kakao" onClick={onLogout}>
            <IconKakao />
            카카오 로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
}

export function SupabaseLoggedInOAuthBlock({
  user,
  onLogout,
}: {
  user: User;
  onLogout: () => void | Promise<void>;
}) {
  const avatar = supabaseAvatarUrl(user);
  return (
    <div className="oauth-wrap">
      <div className="oauth-status oauth-status--welcome" role="status">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="" width={36} height={36} className="oauth-status__avatar" />
        ) : null}
        <span className="oauth-status__greet">
          <strong>{supabaseDisplayName(user)}</strong>님, 환영합니다 👋
        </span>
      </div>
      {user.email ? <p className="oauth-email-line">{user.email}</p> : null}
      <ul className="oauth-list oauth-list--logged-in">
        <li>
          <button type="button" className="oauth-btn oauth-btn--google" onClick={() => void onLogout()}>
            <IconGoogle />
            Google 로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
}
