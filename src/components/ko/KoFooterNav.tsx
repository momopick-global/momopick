import Link from "next/link";
import { Fragment } from "react";
import { KO_SITE_NAV_LINKS_FOOTER } from "./koSiteNavLinks";

/** 한국어 사이트 공통 하단 정보 링크 (홈·정책·블로그 등) */
export function KoFooterNav() {
  return (
    <div className="ko-ft-bottom">
      <nav className="ko-ft-links" aria-label="사이트 정보">
        {KO_SITE_NAV_LINKS_FOOTER.map((item, i) => (
          <Fragment key={item.href}>
            {i > 0 ? <span aria-hidden="true">·</span> : null}
            <Link href={item.href}>{item.label}</Link>
          </Fragment>
        ))}
      </nav>

      <div className="ko-ft-social" aria-label="소셜 채널">
        <a
          href="https://pf.kakao.com/_momopick"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="카카오 채널"
          className="ko-ft-social__link"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect width="20" height="20" rx="6" fill="#FEE500"/>
            <path d="M10 4C6.686 4 4 6.09 4 8.667c0 1.623.98 3.047 2.46 3.9L5.8 15l3.02-1.98A7.15 7.15 0 0010 13.333c3.314 0 6-2.09 6-4.666C16 6.09 13.314 4 10 4z" fill="#3C1E1E"/>
          </svg>
          <span>카카오채널</span>
        </a>
        <a
          href="https://www.instagram.com/momopick.global"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="인스타그램"
          className="ko-ft-social__link ko-ft-social__link--insta"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect width="20" height="20" rx="6" fill="url(#insta-grad)"/>
            <defs>
              <radialGradient id="insta-grad" cx="30%" cy="107%" r="130%">
                <stop offset="0%" stopColor="#ffd676"/>
                <stop offset="25%" stopColor="#f86f3b"/>
                <stop offset="50%" stopColor="#d3175a"/>
                <stop offset="75%" stopColor="#9f3ea6"/>
                <stop offset="100%" stopColor="#4f5bd5"/>
              </radialGradient>
            </defs>
            <rect x="5.5" y="5.5" width="9" height="9" rx="3" stroke="white" strokeWidth="1.3" fill="none"/>
            <circle cx="10" cy="10" r="2.3" stroke="white" strokeWidth="1.3" fill="none"/>
            <circle cx="13.2" cy="6.8" r="0.7" fill="white"/>
          </svg>
          <span>인스타그램</span>
        </a>
      </div>
    </div>
  );
}
