"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  match: (pathname: string) => boolean;
  icon: (active: boolean) => React.ReactNode;
};

function IconHome({ active }: { active: boolean }) {
  const c = active ? "var(--ko-tab-active)" : "var(--ko-tab-idle)";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
      />
    </svg>
  );
}

function IconFortune({ active }: { active: boolean }) {
  const c = active ? "var(--ko-tab-active)" : "var(--ko-tab-idle)";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
      />
    </svg>
  );
}

function IconSearch({ active }: { active: boolean }) {
  const c = active ? "var(--ko-tab-active)" : "var(--ko-tab-idle)";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" fill="none" stroke={c} strokeWidth="2" />
      <path
        fill="none"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        d="m20 20-3.5-3.5"
      />
    </svg>
  );
}

function IconArchive({ active }: { active: boolean }) {
  const c = active ? "var(--ko-tab-active)" : "var(--ko-tab-idle)";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke={c}
        strokeWidth="2"
        strokeLinejoin="round"
        d="M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v15.5l-6.5-4-6.5 4V5a1.5 1.5 0 0 1 1.5-1.5Z"
      />
    </svg>
  );
}

const items: NavItem[] = [
  {
    href: "/ko/",
    label: "홈",
    match: (p) => p === "/ko" || p === "/ko/",
    icon: (a) => <IconHome active={a} />,
  },
  {
    href: "/ko/today/",
    label: "오늘의 운세",
    match: (p) => p.startsWith("/ko/today"),
    icon: (a) => <IconFortune active={a} />,
  },
  {
    href: "/ko/explore/",
    label: "검색",
    match: (p) => p.startsWith("/ko/explore"),
    icon: (a) => <IconSearch active={a} />,
  },
  {
    href: "/ko/app/saved/",
    label: "보관함",
    match: (p) => p.startsWith("/ko/app/saved"),
    icon: (a) => <IconArchive active={a} />,
  },
];

/** 한국어 구역 하단 고정 탭 (홈·오늘의 운세·검색·보관함) */
export function KoBottomNav() {
  const pathname = usePathname() ?? "";

  return (
    <nav className="ko-bottom-nav" aria-label="주요 메뉴">
      <ul className="ko-bottom-nav__list">
        {items.map((item) => {
          const active = item.match(pathname);
          return (
            <li key={item.href} className="ko-bottom-nav__item">
              <Link
                href={item.href}
                className={`ko-bottom-nav__link${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <span className="ko-bottom-nav__icon" aria-hidden="true">
                  {item.icon(active)}
                </span>
                <span className="ko-bottom-nav__label">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
