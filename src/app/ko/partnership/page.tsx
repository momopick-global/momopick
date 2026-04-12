import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { BackButton } from "@/components/ko/BackButton";

export const metadata: Metadata = {
  title: "제휴 문의 | 모모픽",
  description:
    "모모픽과 함께하고 싶은 기업·개인·콘텐츠 파트너를 환영합니다. 광고·콘텐츠 제휴·API 연동 등 다양한 협업을 논의해 보세요.",
  alternates: { canonical: "https://momopick.com/ko/partnership/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "제휴 문의 | 모모픽",
    description: "모모픽 제휴·파트너십 문의",
    url: "https://momopick.com/ko/partnership/",
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


const partnerTypes = [
  {
    icon: "📢",
    title: "광고·스폰서십",
    desc: "배너·네이티브 광고, 테스트 스폰서, 결과 페이지 노출 등",
  },
  {
    icon: "🤝",
    title: "콘텐츠 제휴",
    desc: "공동 테스트 기획, 브랜드 퀴즈, 미디어·플랫폼 연계",
  },
  {
    icon: "⚙️",
    title: "API·기술 협업",
    desc: "퀴즈 데이터 공급, 임베드, 화이트레이블 등",
  },
  {
    icon: "🎓",
    title: "교육·공익 파트너",
    desc: "학교·기관·비영리 단체와의 심리·교육 콘텐츠 협업",
  },
];

export default function KoPartnershipPage() {
  return (
    <>
      <KoSiteHeader />

      <div className="wrap">
        <main className="policy-page contact-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>제휴 문의</span>
          </nav>
          <BackButton />

          <header className="policy-page-hd">
            <h1>제휴 문의</h1>
            <p className="policy-intro">
              모모픽은 월간 수십만 명의 사용자가 찾는 테스트·퀴즈 플랫폼입니다. 광고·콘텐츠
              제휴부터 기술 협업까지 다양한 파트너십을 열어두고 있습니다. 편하게 연락 주세요.
            </p>
          </header>

          <ul className="partner-type-list">
            {partnerTypes.map((p) => (
              <li key={p.title} className="partner-type-item">
                <span className="partner-type-icon">{p.icon}</span>
                <div>
                  <strong className="partner-type-title">{p.title}</strong>
                  <p className="partner-type-desc">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="contact-channels">
            <a
              className="channel-card channel-card--mail"
              href="mailto:momopick.global@gmail.com"
            >
              <span className="channel-card__icon">✉️</span>
              <span className="channel-card__body">
                <strong className="channel-card__label">이메일로 문의하기</strong>
                <span className="channel-card__desc">momopick.global@gmail.com</span>
              </span>
              <span className="channel-card__arrow" aria-hidden="true">→</span>
            </a>
            <a
              className="channel-card channel-card--kakao"
              href="https://pf.kakao.com/_momopick"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="channel-card__icon">💬</span>
              <span className="channel-card__body">
                <strong className="channel-card__label">카카오톡 채널</strong>
                <span className="channel-card__desc">@모모픽 채널로 메시지 보내기</span>
              </span>
              <span className="channel-card__arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <div className="contact-note">
            <p>📋 문의 시 아래 내용을 함께 보내주시면 더 빠른 답변이 가능합니다.</p>
            <ul>
              <li>회사(팀) 이름 및 담당자 이름</li>
              <li>제안하시는 협업 유형 및 목적</li>
              <li>희망 일정 및 예산 범위 (선택)</li>
            </ul>
          </div>

          <div className="cta" style={{ marginTop: 28 }}>
            <Link className="btn" href="/ko/">
              홈으로
            </Link>
            <Link className="btn" href="/ko/about/">
              모모픽 소개 보기
            </Link>
          </div>
        </main>

        <footer className="ko-ft">
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
