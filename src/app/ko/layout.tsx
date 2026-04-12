import type { Metadata } from "next";
import { KoBottomNav } from "@/components/ko/KoBottomNav";
import { KakaoAuthProvider } from "@/context/KakaoAuthContext";
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
    images: [
      {
        url: "https://momopick.com/og/main-og.webp",
        width: 1536,
        height: 1024,
        alt: "모모픽 — MBTI·연애·심리 테스트",
      },
    ],
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
  image: "https://momopick.com/og/main-og.webp",
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
  logo: "https://momopick.com/images/brand/momopick_symbol.webp",
  image: "https://momopick.com/og/main-og.webp",
  sameAs: [
    "https://www.youtube.com/@YOUR_CHANNEL",
    "https://www.instagram.com/momopick.cc/",
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "💔 왜 내 연애 테스트 결과가 이렇게 나왔나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "솔직히 말하면… 당신의 선택 패턴이 그대로 반영된 결과입니다. 무의식적으로 반복하는 연애 습관이 드러난 걸 수도 있어요.",
      },
    },
    {
      "@type": "Question",
      name: "😳 이거… 진짜 맞는 거 아니에요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "많은 사람들이 “소름 돋는다”라고 말합니다. 완벽한 정답은 아니지만, 당신의 성향을 꽤 정확하게 짚어낼 수도 있어요.",
      },
    },
    {
      "@type": "Question",
      name: "🤔 친구랑 똑같이 했는데 결과가 왜 달라요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "같은 질문이라도 선택하는 순간의 감정, 생각이 다르기 때문이에요. 그래서 결과도 달라집니다. 그게 포인트죠.",
      },
    },
    {
      "@type": "Question",
      name: "🧠 이거 MBTI 기반인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "일부 테스트는 MBTI 성향을 참고하지만, 모모픽만의 해석 방식으로 재구성되어 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "😅 결과가 너무 팩폭인데요… 틀린 거죠?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "틀렸다기보다는… 듣기 싫은 부분일 가능성이 큽니다. 대부분의 사람은 여기서 살짝 찔립니다.",
      },
    },
    {
      "@type": "Question",
      name: "💡 결과를 바꿀 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "물론 가능합니다. 다른 선택을 하면 전혀 다른 결과가 나올 수 있어요. (근데… 그 선택을 진짜 할 수 있을까요?)",
      },
    },
    {
      "@type": "Question",
      name: "📊 테스트 결과는 믿어도 되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "100% 정답은 아니지만, 당신을 이해하는 하나의 힌트가 될 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "🔒 로그인하면 뭐가 달라지나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "내가 했던 테스트 기록 저장, 다시 결과 확인 가능, 개인 맞춤 추천 제공. 그냥 안 하면 손해 보는 구조입니다.",
      },
    },
    {
      "@type": "Question",
      name: "📱 왜 자꾸 사람들이 공유하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "재밌기도 하지만… “너 이거 해봐” 하고 보내고 싶어지는 결과 구조 때문입니다.",
      },
    },
    {
      "@type": "Question",
      name: "📢 광고 왜 이렇게 많아요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "무료로 서비스 운영하려면 돈은 어디선가 나와야 합니다. 광고는 생존 장치입니다. 참고 좀 해주세요.",
      },
    },
    {
      "@type": "Question",
      name: "🚨 테스트가 안 돼요 (버그)",
      acceptedAnswer: {
        "@type": "Answer",
        text: "기기, 브라우저 문제일 가능성이 큽니다. 그래도 안 되면 문의 주세요. 우리가 고치긴 합니다. 가끔은 빠르게.",
      },
    },
    {
      "@type": "Question",
      name: "😶 이거 중독성 있는 거 정상인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, 정상입니다. 그래서 계속 하게 되는 겁니다.",
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
      <KakaoAuthProvider>
        <div className="momopick-ko">
          {children}
          <KoBottomNav />
        </div>
      </KakaoAuthProvider>
    </>
  );
}
