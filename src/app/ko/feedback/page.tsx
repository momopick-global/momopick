import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";

export const metadata: Metadata = {
  title: "서비스 개선 의견 보내기 | 모모픽",
  description:
    "모모픽을 더 좋게 만들 수 있도록 여러분의 소중한 의견을 보내주세요.",
  alternates: { canonical: "https://momopick.com/ko/feedback/" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "서비스 개선 의견 보내기 | 모모픽",
    description: "모모픽 서비스 개선 의견",
    url: "https://momopick.com/ko/feedback/",
    locale: "ko_KR",
    type: "website",
  },
};

const year = new Date().getFullYear();

const channels = [
  {
    icon: "✉️",
    label: "이메일로 보내기",
    desc: "contact@momopick.com",
    href: "mailto:contact@momopick.com",
    style: "channel-card--mail",
  },
  {
    icon: "💬",
    label: "카카오톡 채널",
    desc: "@모모픽 채널로 메시지 보내기",
    href: "https://pf.kakao.com/_momopick",
    style: "channel-card--kakao",
  },
];

export default function KoFeedbackPage() {
  return (
    <>
      <KoSiteHeader />

      <div className="wrap">
        <main className="policy-page contact-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>서비스 개선 의견</span>
          </nav>

          <header className="policy-page-hd">
            <h1>서비스 개선 의견 보내기</h1>
            <p className="policy-intro">
              모모픽을 사용하면서 불편하셨거나, 더 좋아졌으면 하는 점이 있다면 알려주세요.
              작은 의견 하나하나가 서비스 개선에 직접 반영됩니다. 솔직하게 보내주실수록 큰
              도움이 됩니다.
            </p>
          </header>

          <div className="contact-channels">
            {channels.map((ch) => (
              <a
                key={ch.href}
                className={`channel-card ${ch.style}`}
                href={ch.href}
                target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span className="channel-card__icon">{ch.icon}</span>
                <span className="channel-card__body">
                  <strong className="channel-card__label">{ch.label}</strong>
                  <span className="channel-card__desc">{ch.desc}</span>
                </span>
                <span className="channel-card__arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>

          <div className="contact-note">
            <p>💡 의견을 보내주실 때 아래 내용을 함께 적어주시면 더 빠르게 처리할 수 있어요.</p>
            <ul>
              <li>어떤 테스트·페이지에서 발생한 문제인지</li>
              <li>사용하신 기기·브라우저 종류</li>
              <li>기대했던 동작과 실제로 발생한 현상</li>
            </ul>
          </div>

          <div className="cta" style={{ marginTop: 28 }}>
            <Link className="btn" href="/ko/">
              홈으로
            </Link>
            <Link className="btn" href="/ko/faq/">
              자주 묻는 질문 보기
            </Link>
          </div>
        </main>

        <footer className="ko-ft">
          <div>© {year} Momopick. All rights reserved.</div>
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
