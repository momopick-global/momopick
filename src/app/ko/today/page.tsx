import type { Metadata } from "next";
import { KoLoveTarotExperience } from "@/components/ko/KoLoveTarotExperience";

export const metadata: Metadata = {
  title: "연애운세 | 모모픽",
  description:
    "타로 카드 3장으로 상대의 마음·나의 마음·조언을 확인하는 오늘의 연애운세.",
  alternates: {
    canonical: "https://momopick.com/ko/today/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "연애운세 | 모모픽",
    description: "타로 카드 3장으로 보는 오늘의 연애운세",
    url: "https://momopick.com/ko/today/",
    images: [
      {
        url: "https://momopick.com/og/main-og.webp",
        width: 1536,
        height: 1024,
        alt: "모모픽 — MBTI·연애·심리 테스트",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function KoTodayPage() {
  return <KoLoveTarotExperience />;
}
