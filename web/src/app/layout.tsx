import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://momopick.com"),
  title: { default: "Momopick", template: "%s | Momopick" },
  description:
    "Momopick — fun quizzes & personality tests. Choose your language.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
