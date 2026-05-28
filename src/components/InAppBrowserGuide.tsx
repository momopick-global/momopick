"use client";

import { useEffect, useState } from "react";
import styles from "./InAppBrowserGuide.module.css";

const SESSION_KEY = "momopick:inapp-dismissed";

type Platform = "android" | "ios" | "other";

function detectInApp(ua: string): boolean {
  const s = ua.toLowerCase();
  return (
    s.includes("kakaotalk") ||
    s.includes("instagram") ||
    s.includes("fbav") ||
    s.includes("fb_iab") ||
    s.includes("fban") ||
    s.includes("fbios") ||
    s.includes("fbsv") ||
    / line\//.test(s) ||
    s.includes("naver(inapp") ||
    s.includes("naver")
  );
}

function detectPlatform(ua: string): Platform {
  const s = ua.toLowerCase();
  if (/android/.test(s)) return "android";
  if (/iphone|ipad|ipod/.test(s)) return "ios";
  return "other";
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3 12h18M12 3c2.6 2.7 4 6 4 9s-1.4 6.3-4 9c-2.6-2.7-4-6-4-9s1.4-6.3 4-9z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconExternal() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCopy() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="8"
        y="8"
        width="12"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InAppBrowserGuide() {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("other");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      // sessionStorage may be unavailable (private mode) — proceed without persistence
    }

    const ua = window.navigator.userAgent || "";
    if (!detectInApp(ua)) return;

    setPlatform(detectPlatform(ua));
    setOpen(true);
  }, []);

  const close = () => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
    setOpen(false);
  };

  const openExternal = () => {
    const url = window.location.href;

    if (platform === "android") {
      const noScheme = url.replace(/^https?:\/\//, "");
      const intentUrl = `intent://${noScheme}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(
        url,
      )};end`;
      window.location.href = intentUrl;
      return;
    }

    if (platform === "ios") {
      // Chrome iOS: googlechrome:// (http), googlechromes:// (https)
      const isHttps = url.startsWith("https://");
      const noScheme = url.replace(/^https?:\/\//, "");
      const chromeUrl = `${isHttps ? "googlechromes" : "googlechrome"}://${noScheme}`;
      window.location.href = chromeUrl;
      // Chrome 미설치 시 스킴 호출은 무시되어 현재 페이지에 그대로 머무름 (fallback)
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyUrl = () => {
    const url = window.location.href;
    const after = () => {
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(after, () => {
        window.prompt("아래 주소를 복사해 주세요", url);
      });
      return;
    }
    window.prompt("아래 주소를 복사해 주세요", url);
  };

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inapp-guide-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className={styles.card}>
        <button
          type="button"
          className={styles.close}
          onClick={close}
          aria-label="안내 닫기"
        >
          <IconClose />
        </button>

        <div className={styles.iconCircle} aria-hidden="true">
          <IconGlobe />
        </div>

        <h2 id="inapp-guide-title" className={styles.title}>
          더 편하게 보기
        </h2>
        <p className={styles.body}>
          현재 앱 내 브라우저에서는
          <br />
          화면이 다르게 보일 수 있어요.
          <br />
          외부 브라우저에서 여는 것을 추천드려요.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primary}
            onClick={openExternal}
            aria-label="외부 브라우저로 열기"
          >
            <IconExternal />
            <span>외부 브라우저로 열기</span>
          </button>
          <button
            type="button"
            className={styles.secondary}
            onClick={copyUrl}
            aria-label="주소 복사하기"
          >
            <IconCopy />
            <span>{copyState === "copied" ? "주소가 복사되었어요" : "주소 복사하기"}</span>
          </button>
        </div>

        <p className={styles.hint}>
          열리지 않으면 주소를 복사해
          <br />
          브라우저 주소창에 붙여넣어 주세요.
        </p>
      </div>
    </div>
  );
}
