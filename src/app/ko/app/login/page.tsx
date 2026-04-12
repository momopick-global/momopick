import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PostLoginRedirectCapture } from "@/components/ko/PostLoginRedirectCapture";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { SocialLoginButtons } from "@/components/ko/SocialLoginButtons";
import { BackButton } from "@/components/ko/BackButton";

export const metadata: Metadata = {
  title: "로그인 | 모모픽",
  description:
    "모모픽 계정으로 로그인하세요. Google, 카카오, Facebook, 네이버 등 소셜 로그인을 지원합니다.",
  alternates: {
    canonical: "https://momopick.com/ko/app/login/",
  },
  robots: { index: false, follow: true },
  openGraph: {
    title: "로그인 | 모모픽",
    description: "모모픽 로그인",
    url: "https://momopick.com/ko/app/login/",
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


export default function KoLoginPage() {
  return (
    <>
      <Suspense fallback={null}>
        <PostLoginRedirectCapture />
      </Suspense>
      <KoSiteHeader />

      <div className="wrap">
        <main className="login-page ko-app-narrow">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>로그인</span>
          </nav>
          <BackButton />

          <header className="login-page-hd">
            <h1>로그인</h1>
            <p className="login-page-lead">
              소셜 계정으로 간편하게 시작하세요. 테스트 기록·맞춤 추천 등은 로그인 후 이용할 수 있어요.
            </p>
          </header>

          <section className="login-panel" aria-labelledby="login-social-title">
            <h2 id="login-social-title" className="login-panel-title">
              소셜 로그인
            </h2>
            <SocialLoginButtons />
            <p className="login-panel-note">
              Google은 Supabase Auth로 연결됩니다. 카카오·기타 제공사 버튼은 설정이 완료되면 각 로그인
              화면으로 이동합니다.
            </p>
          </section>

          <p className="policy-foot">
            <Link className="link-all" href="/ko/policy/privacy/">
              개인정보처리방침
            </Link>
            <span aria-hidden="true"> · </span>
            <Link className="link-all" href="/ko/policy/terms/">
              이용약관
            </Link>
            <span aria-hidden="true"> · </span>
            <Link className="link-all" href="/ko/policy/disclaimer/">
              면책조항
            </Link>
          </p>
        </main>

        <footer className="ko-ft">
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
