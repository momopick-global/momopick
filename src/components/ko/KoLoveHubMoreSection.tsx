"use client";

import Link from "next/link";
import { QuizImageWithFallback } from "@/components/quiz/QuizImageWithFallback";
import { getKoLoveMoreQuizzes } from "@/lib/content/homeRail";

type Placement = "blog" | "quiz";

type Props = {
  locale: string;
  /** 현재 퀴즈 인트로 URL (`/{lang}/love/{slug}/`) — 허브 `href`와 동일해야 함 */
  excludeHref: string;
  limit?: number;
  placement: Placement;
};

export function KoLoveHubMoreSection({ locale, excludeHref, limit = 4, placement }: Props) {
  const items = getKoLoveMoreQuizzes(locale, excludeHref, limit);
  if (items.length === 0) return null;

  const sectionClass = placement === "blog" ? "blog-quiz-promo__more" : "quiz-result-love-more";
  const titleClass = placement === "blog" ? "blog-quiz-promo__more-title" : "quiz-result-love-more__title";
  const leadClass = placement === "blog" ? "blog-quiz-promo__more-lead" : "quiz-result-love-more__lead";
  const headingId =
    placement === "blog" ? "blog-quiz-promo-more-heading" : "quiz-result-love-more-heading";

  const loveHubHref = `/${locale}/love/`;

  return (
    <div
      className={
        placement === "quiz" ? "ko-love-more-stack ko-love-more-stack--quiz" : "ko-love-more-stack"
      }
    >
      <section className={sectionClass} aria-labelledby={headingId}>
        <h3 id={headingId} className={titleClass}>
          다른 썸·연애 테스트
        </h3>
        <p className={`${leadClass} ko-love-more__lead--end`}>
          <Link className="link-all" href={loveHubHref}>
            썸·연애 허브에서 전체 보기
          </Link>
        </p>
        <ul className="love-hub-list" role="list">
          {items.map((item, i) => (
            <li key={item.href}>
              <Link href={item.href} className="love-hub-list__link">
                <div className="love-hub-list__thumb">
                  {i === 0 ? <span className="badge love-hub-list__badge">HOT</span> : null}
                  <QuizImageWithFallback
                    src={item.image || "/images/banners/tile-love-01.webp"}
                    alt=""
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="love-hub-list__body">
                  <span className="love-hub-list__title">{item.title}</span>
                  <span className="love-hub-list__sub">{item.subtitleLine}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="ko-love-more__more-wrap">
          <Link
            href={loveHubHref}
            className="btn sm quiz-result-actions-row__secondary ko-love-more__more-btn"
          >
            더보기
          </Link>
        </div>
      </section>
      <p className="ko-love-more__home">
        <Link href={`/${locale}/`} className="btn primary">
          홈으로
        </Link>
      </p>
    </div>
  );
}
