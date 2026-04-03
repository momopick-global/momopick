import type { Metadata } from "next";
import LanguageGateway from "@/components/LanguageGateway";

export const metadata: Metadata = {
  title: "Momopick",
  description:
    "Momopick — fun quizzes & personality tests. Choose your language.",
  alternates: {
    canonical: "https://momopick.com/",
    languages: {
      ko: "https://momopick.com/ko/",
      en: "https://momopick.com/en/",
      ja: "https://momopick.com/ja/",
      es: "https://momopick.com/es/",
      pt: "https://momopick.com/pt/",
      id: "https://momopick.com/id/",
      "x-default": "https://momopick.com/",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Momopick",
    url: "https://momopick.com/",
    title: "Momopick",
    description:
      "Momopick — fun quizzes & personality tests. Choose your language.",
    images: [{ url: "https://momopick.com/src/momopick.png" }],
  },
};

export default function HomePage() {
  return <LanguageGateway />;
}
