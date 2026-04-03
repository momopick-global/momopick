"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/app/gateway.module.css";

const LANGS = ["ko", "en", "ja", "es", "pt", "id"] as const;
const DEFAULT_LANG = "en";
const STORAGE_KEY = "momopick_lang";
const REDIRECT_DELAY_MS = 450;

function normalizeLang(input: string | null): string | null {
  if (!input) return null;
  const base = String(input).toLowerCase().split("-")[0];
  return LANGS.includes(base as (typeof LANGS)[number]) ? base : null;
}

function isBot(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /bot|crawl|spider|slurp|google|bing|yandex|duckduck|baidu|semrush|ahrefs/i.test(
    ua,
  );
}

function getPreferredLang(): { lang: string; reason: string } {
  if (typeof window === "undefined") {
    return { lang: DEFAULT_LANG, reason: "default" };
  }
  const saved = normalizeLang(localStorage.getItem(STORAGE_KEY));
  if (saved) return { lang: saved, reason: "saved" };

  const nav =
    navigator.languages?.length > 0
      ? navigator.languages
      : [navigator.language || ""];
  for (const l of nav) {
    const n = normalizeLang(l);
    if (n) return { lang: n, reason: "browser" };
  }
  return { lang: DEFAULT_LANG, reason: "default" };
}

function currentPathLang(pathname: string): string | null {
  const m = pathname.match(/^\/(ko|en|ja|es|pt|id)(\/|$)/i);
  return m ? m[1].toLowerCase() : null;
}

export default function LanguageGateway() {
  const pathname = usePathname();
  const router = useRouter();
  const [status, setStatus] = useState("Detecting your language…");
  const [detected, setDetected] = useState("—");
  const [target, setTarget] = useState("—");

  useEffect(() => {
    const already = currentPathLang(pathname || "/");
    if (already) {
      setStatus("You are on a localized page.");
      setDetected(`Current: /${already}/`);
      setTarget("—");
      return;
    }

    const pref = getPreferredLang();
    const bot = isBot();
    setStatus(
      bot ? "Bot detected. Auto redirect is disabled." : "Preparing redirect…",
    );
    setDetected(
      `${typeof navigator !== "undefined" ? navigator.language || "—" : "—"} (${pref.reason})`,
    );
    setTarget(`/${pref.lang}/`);

    if (bot) return;

    /* 로컬 개발: 자동 이동 끔 → 예전 정적 HTML 캐시 + 리다이렉트 후 ERR_CONNECTION_REFUSED 혼동 방지 */
    if (process.env.NODE_ENV === "development") {
      setStatus("Dev mode: choose a language below (no auto redirect).");
      setTarget("—");
      return;
    }

    const t = setTimeout(() => {
      setStatus("Redirecting…");
      router.replace(`/${pref.lang}/`);
    }, REDIRECT_DELAY_MS);

    return () => clearTimeout(t);
  }, [pathname, router]);

  function onLangClick(lang: string) {
    if (typeof localStorage !== "undefined" && LANGS.includes(lang as (typeof LANGS)[number])) {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  return (
    <main className={styles.page} aria-label="Momopick language gateway">
      <div className={styles.wrap}>
        <section className={styles.card}>
          <div className={styles.brand}>
            <span className={styles.logo} aria-hidden="true" />
            <div>
              <h1>Momopick</h1>
              <p>퀴즈로 나를 발견하는 시간. 언어를 선택하면 해당 버전으로 이동해요.</p>
            </div>
          </div>

          <div className={styles.grid} role="list" aria-label="Choose language">
            {LANGS.map((lang) => (
              <Link
                key={lang}
                className={styles.btn}
                role="listitem"
                href={`/${lang}/`}
                onClick={() => onLangClick(lang)}
              >
                <span>
                  {lang === "ko" && "한국어 "}
                  {lang === "en" && "English "}
                  {lang === "ja" && "日本語 "}
                  {lang === "es" && "Español "}
                  {lang === "pt" && "Português "}
                  {lang === "id" && "Bahasa Indonesia "}
                  <small>{lang.toUpperCase()}</small>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>

          <p className={styles.footer}>
            자동으로 이동이 안 되면 위에서 언어를 선택해줘.{" "}
            <Link className={styles.link} href="/en/">
              Continue in English
            </Link>
          </p>
        </section>

        <aside className={`${styles.card} ${styles.right}`} aria-label="Info">
          <h2>Auto redirect</h2>
          <div className={styles.meta}>
            <div className={styles.pill}>
              <span className={styles.dot} />
              <span>{status}</span>
            </div>
            <div className={styles.pill}>
              <span className={styles.dot} />
              <span>Detected: {detected}</span>
            </div>
            <div className={styles.pill}>
              <span className={styles.dot} />
              <span>Target: {target}</span>
            </div>
          </div>

          <div className={styles.hint}>
            ✅ 우선순위: <b>저장된 언어</b> → <b>브라우저 언어</b> → <b>기본값(en)</b>
            <br />
            🔎 검색엔진/봇은 자동 이동을 최소화해서 각 언어 폴더가 색인되도록 했어.
          </div>

          <div className={styles.hint}>
            원하는 언어가 다르면 위 버튼으로 선택하면 다음부터 그 언어로 열려요.
          </div>
        </aside>
      </div>

      <noscript>
        <div
          style={{
            position: "fixed",
            left: 12,
            right: 12,
            bottom: 12,
            padding: 12,
            borderRadius: 12,
            background: "#111",
            color: "#fff",
          }}
        >
          JavaScript가 꺼져 있어 자동 이동이 불가능합니다. 아래에서 언어를 선택하세요:{" "}
          <Link href="/ko/" style={{ color: "#fff", textDecoration: "underline" }}>
            KO
          </Link>{" "}
          ·{" "}
          <Link href="/en/" style={{ color: "#fff", textDecoration: "underline" }}>
            EN
          </Link>
        </div>
      </noscript>
    </main>
  );
}
