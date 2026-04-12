import type { Metadata } from "next";
import { KoTodayVideoExperience } from "@/components/ko/KoTodayVideoExperience";

export const metadata: Metadata = {
  title: "오늘의 운세 | 모모픽",
  description:
    "타로로 오늘의 운세를 가볍게 확인하는 콘텐츠를 준비 중입니다. 서비스 오픈 전 안내입니다.",
  alternates: {
    canonical: "https://momopick.com/ko/today/",
  },
  openGraph: {
    title: "오늘의 운세 | 모모픽",
    description: "오늘의 운세",
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
  return <KoTodayVideoExperience />;
}
