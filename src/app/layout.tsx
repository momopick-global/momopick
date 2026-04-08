import type { Metadata } from "next";
import { KakaoSdkInit } from "@/components/KakaoSdkInit";
import "./globals.css";

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
      <body>
        <KakaoSdkInit />
        {children}
      </body>
    </html>
  );
}
