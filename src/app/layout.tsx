import type { Metadata } from "next";
import { KakaoSdkInit } from "@/components/KakaoSdkInit";
// 인앱 브라우저(카톡·인스타 등) "외부 브라우저로 열기" 안내 팝업 — 임시 비활성화.
// 다시 켜려면 아래 import와 <InAppBrowserGuide /> 주석을 해제하세요.
// import { InAppBrowserGuide } from "@/components/InAppBrowserGuide";
import "./globals.css";

const ADSENSE_CLIENT = "ca-pub-2758905830381994";

export const metadata: Metadata = {
  metadataBase: new URL("https://momopick.com"),
  title: { default: "Momopick", template: "%s | Momopick" },
  description:
    "Momopick — fun quizzes & personality tests. Choose your language.",
  openGraph: {
    type: "website",
    siteName: "Momopick",
    url: "https://momopick.com",
    images: [
      {
        url: "https://momopick.com/og/main-og.webp",
        width: 1536,
        height: 1024,
        alt: "Momopick — quizzes & personality tests",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <KakaoSdkInit />
        {/* <InAppBrowserGuide /> */}
        {children}
      </body>
    </html>
  );
}
