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

export function InAppBrowserGuide() {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("other");

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

  const dismiss = () => {
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

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inapp-guide-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className={styles.sheet}>
        <h2 id="inapp-guide-title" className={styles.title}>
          외부 브라우저에서 더 안정적으로 볼 수 있어요
        </h2>
        <p className={styles.desc}>
          현재 인앱브라우저에서는 글자 크기나 화면 구성이 다르게 보일 수 있어요.
          외부 브라우저에서 열면 더 안정적으로 이용할 수 있습니다.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primary}
            onClick={openExternal}
          >
            외부 브라우저로 열기
          </button>
          <button type="button" className={styles.secondary} onClick={dismiss}>
            그냥 보기
          </button>
        </div>
      </div>
    </div>
  );
}
