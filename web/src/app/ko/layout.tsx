import type { Metadata } from "next";
import "./ko-home.css";

export const metadata: Metadata = {
  title: "모모픽(Momopick) | MBTI·연애·심리 테스트 & 재미 퀴즈",
  description:
    "모모픽은 MBTI, 연애, 심리, 성격, 소셜, 스타일 등 다양한 퀴즈와 테스트를 빠르게 즐길 수 있는 사이트입니다. 친구와 공유하고 결과를 저장해보세요.",
  alternates: {
    canonical: "https://momopick.com/ko/",
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
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    siteName: "Momopick",
    url: "https://momopick.com/ko/",
    title: "모모픽(Momopick) | MBTI·연애·심리 테스트 & 재미 퀴즈",
    description:
      "MBTI, 연애, 심리, 성격, 소셜, 스타일… 지금 바로 1분 퀴즈로 나를 알아보세요.",
    images: [{ url: "https://momopick.com/assets/og/og-ko.webp" }],
    locale: "ko_KR",
  },
  twitter: { card: "summary_large_image" },
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Momopick",
  alternateName: "모모픽",
  url: "https://momopick.com/",
  inLanguage: "ko",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://momopick.com/ko/explore/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Momopick",
  url: "https://momopick.com/",
  logo: "https://momopick.com/assets/brand/logo.png",
  sameAs: [
    "https://www.youtube.com/@YOUR_CHANNEL",
    "https://www.instagram.com/YOUR_ID",
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "모모픽은 어떤 사이트인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "모모픽은 MBTI, 연애, 심리, 성격, 소셜, 스타일 등 다양한 퀴즈/테스트를 1~3분 안에 즐기고 결과를 공유할 수 있는 엔터테인먼트 테스트 사이트입니다.",
      },
    },
    {
      "@type": "Question",
      name: "퀴즈 결과는 저장할 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네. 로그인 후 북마크/히스토리 기능으로 내가 했던 테스트를 다시 확인할 수 있도록 제공할 수 있습니다. (서비스 제공 범위에 따라 달라질 수 있어요.)",
      },
    },
    {
      "@type": "Question",
      name: "모모픽은 무료인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "기본 퀴즈는 무료로 즐길 수 있고, 일부 AI 기반 기능이나 추가 콘텐츠는 크레딧/구독 형태로 제공될 수 있습니다.",
      },
    },
  ],
};

export default function KoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <div className="momopick-ko">{children}</div>
    </>
  );
}
