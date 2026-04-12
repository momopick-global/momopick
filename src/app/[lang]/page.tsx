import type { Metadata } from "next";
import Link from "next/link";

const LOCALES = ["en", "ja", "es", "pt", "id"] as const;

const labels: Record<(typeof LOCALES)[number], { title: string; body: string }> = {
  en: { title: "Momopick", body: "This language hub is coming soon." },
  ja: { title: "Momopick", body: "日本語版は準備中です。" },
  es: { title: "Momopick", body: "La versión en español estará disponible pronto." },
  pt: { title: "Momopick", body: "A versão em português virá em breve." },
  id: { title: "Momopick", body: "Versi Bahasa Indonesia segera hadir." },
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l = labels[lang as keyof typeof labels];
  return { title: l?.title ?? "Momopick", robots: { index: false, follow: true } };
}

export default async function LocalePlaceholderPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = labels[lang as keyof typeof labels];
  if (!l) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <p>Unknown locale.</p>
        <Link href="/">Home</Link>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "system-ui, sans-serif",
        background: "#f4f2fb",
        color: "#333333",
      }}
    >
      <h1 style={{ margin: "0 0 12px" }}>{l.title}</h1>
      <p style={{ margin: "0 0 20px", opacity: 0.75 }}>{l.body}</p>
      <Link href="/ko/" style={{ color: "#5a67f2", fontWeight: 700 }}>
        한국어 사이트로 이동 →
      </Link>
      <Link href="/" style={{ marginTop: 16, fontSize: 14, opacity: 0.7 }}>
        ← Language gateway
      </Link>
    </main>
  );
}
