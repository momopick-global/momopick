import type { Metadata } from "next";

const LOCALES = ["en", "ja", "es", "pt", "id"] as const;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Momopick",
    robots: { index: false, follow: false },
  };
}

/** 다국어 placeholder — Cloudflare _redirects에서 /ko/로 301 처리됨.
 *  HTML이 캐시된 경우를 위해 meta refresh + script 폴백 포함. */
export default function LocalePlaceholderPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        background: "#f4f2fb",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <meta httpEquiv="refresh" content="0; url=/ko/" />
      {/* biome-ignore lint: redirect fallback */}
      <script
        dangerouslySetInnerHTML={{
          __html: "window.location.replace('/ko/');",
        }}
      />
      <p style={{ opacity: 0.5, fontSize: 14 }}>Redirecting…</p>
    </main>
  );
}
