import Link from "next/link";
import { Fragment } from "react";
import { KO_SITE_NAV_LINKS } from "./koSiteNavLinks";

/** 한국어 사이트 공통 하단 정보 링크 (홈·정책·블로그 등) */
export function KoFooterNav() {
  return (
    <nav className="ko-ft-links" aria-label="사이트 정보">
      {KO_SITE_NAV_LINKS.map((item, i) => (
        <Fragment key={item.href}>
          {i > 0 ? <span aria-hidden="true">·</span> : null}
          <Link href={item.href}>{item.label}</Link>
        </Fragment>
      ))}
    </nav>
  );
}
