import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { koSampleNotices } from "@/content/notice/koSampleNotices";

export const metadata: Metadata = {
  title: "공지사항 | 모모픽",
  description: "모모픽 서비스 공지·업데이트 안내.",
  alternates: {
    canonical: "https://momopick.com/ko/notice/",
  },
  openGraph: {
    title: "공지사항 | 모모픽",
    description: "모모픽 공지사항",
    url: "https://momopick.com/ko/notice/",
    locale: "ko_KR",
    type: "website",
  },
};

const year = new Date().getFullYear();

/** 공지 본문에서 `**강조**` 구간을 굵게 표시 */
function formatNoticeSummary(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function KoNoticePage() {
  return (
    <>
      <KoSiteHeader
          actions={
            <>
              <Link className="btn sm" href="/ko/">
              홈
            </Link>
            <Link className="btn-icon" href="/ko/app/login/" title="로그인" aria-label="로그인">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
            </>
          }
        />

      <div className="wrap">
        <main className="policy-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>공지사항</span>
          </nav>

          <header className="policy-page-hd">
            <h1>공지사항</h1>
            <p className="policy-intro">
              서비스 점검·업데이트·이벤트 소식은 이곳에 게시됩니다. 아래는 UI·콘텐츠 확인용 <strong>예시 공지</strong>
              입니다. 실제 운영 시 날짜·본문은 교체하시면 됩니다.
            </p>
          </header>

          <ul className="notice-list" aria-label="공지 목록">
            {koSampleNotices.map((n) => (
              <li key={n.id}>
                <article className="notice-item" aria-labelledby={`notice-title-${n.id}`}>
                  <div className="notice-item__meta">
                    <time className="notice-item__date" dateTime={n.dateTime}>
                      {n.date}
                    </time>
                    {n.badge ? (
                      <span
                        className={
                          n.badge === "업데이트"
                            ? "notice-item__badge notice-item__badge--update"
                            : "notice-item__badge"
                        }
                      >
                        {n.badge}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="notice-item__title" id={`notice-title-${n.id}`}>
                    {n.title}
                  </h2>
                  <p className="notice-item__summary">{formatNoticeSummary(n.summary)}</p>
                </article>
              </li>
            ))}
          </ul>

          <p className="policy-foot">
            <Link className="link-all" href="/ko/">
              ← 홈으로
            </Link>
          </p>
        </main>

        <footer className="ko-ft">
          <div>© {year} Momopick. All rights reserved.</div>
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
