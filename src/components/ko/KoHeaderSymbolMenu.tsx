"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useId, useState } from "react";
import { KoBrandLogo } from "./KoBrandLogo";
import { KO_POLICY_LINKS, KO_SITE_NAV_LINKS, KO_TEST_CATEGORY_LINKS } from "./koSiteNavLinks";

export function KoHeaderSymbolMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const panel =
    open && typeof document !== "undefined" ? (
      <div className="momopick-ko hd-symbol-panel-portal">
        <nav id={menuId} className="hd-symbol-panel" aria-label="사이트 메뉴">
          <div className="hd-symbol-panel__inner">
            <div className="hd-symbol-panel__section">
              <span className="hd-symbol-panel__label">🎯 테스트</span>
              <ul className="hd-symbol-panel__list">
                {KO_TEST_CATEGORY_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hd-symbol-panel__link" onClick={close}>
                      <span className="hd-symbol-panel__emoji" aria-hidden="true">
                        {item.emoji}
                      </span>
                      <span className="hd-symbol-panel__link-text">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hd-symbol-panel__divider" />
            <div className="hd-symbol-panel__section">
              <span className="hd-symbol-panel__label">🏠 사이트 정보</span>
              <ul className="hd-symbol-panel__list">
                {KO_SITE_NAV_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hd-symbol-panel__link" onClick={close}>
                      <span className="hd-symbol-panel__emoji" aria-hidden="true">
                        {item.emoji}
                      </span>
                      <span className="hd-symbol-panel__link-text">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hd-symbol-panel__divider" />
            <div className="hd-symbol-panel__section hd-symbol-panel__section--policy">
              <span className="hd-symbol-panel__label">⚖️ 약관·정책</span>
              <ul className="hd-symbol-panel__list hd-symbol-panel__list--policy">
                {KO_POLICY_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hd-symbol-panel__link" onClick={close}>
                      <span className="hd-symbol-panel__emoji" aria-hidden="true">
                        {item.emoji}
                      </span>
                      <span className="hd-symbol-panel__link-text">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hd-symbol-panel__divider" />
            <div className="hd-symbol-panel__section hd-symbol-panel__section--social">
              <div className="ko-ft-social" aria-label="소셜 채널">
                <a
                  href="https://pf.kakao.com/_momopick"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="카카오 채널"
                  className="ko-ft-social__link"
                  onClick={close}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect width="20" height="20" rx="6" fill="#FEE500" />
                    <path
                      d="M10 4C6.686 4 4 6.09 4 8.667c0 1.623.98 3.047 2.46 3.9L5.8 15l3.02-1.98A7.15 7.15 0 0010 13.333c3.314 0 6-2.09 6-4.666C16 6.09 13.314 4 10 4z"
                      fill="#3C1E1E"
                    />
                  </svg>
                  <span>카카오채널</span>
                </a>
                <a
                  href="https://www.instagram.com/momopick.global"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="인스타그램"
                  className="ko-ft-social__link ko-ft-social__link--insta"
                  onClick={close}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect width="20" height="20" rx="6" fill="url(#hd-symbol-panel-insta-grad)" />
                    <defs>
                      <radialGradient
                        id="hd-symbol-panel-insta-grad"
                        cx="30%"
                        cy="107%"
                        r="130%"
                      >
                        <stop offset="0%" stopColor="#ffd676" />
                        <stop offset="25%" stopColor="#f86f3b" />
                        <stop offset="50%" stopColor="#d3175a" />
                        <stop offset="75%" stopColor="#9f3ea6" />
                        <stop offset="100%" stopColor="#4f5bd5" />
                      </radialGradient>
                    </defs>
                    <rect x="5.5" y="5.5" width="9" height="9" rx="3" stroke="white" strokeWidth="1.3" fill="none" />
                    <circle cx="10" cy="10" r="2.3" stroke="white" strokeWidth="1.3" fill="none" />
                    <circle cx="13.2" cy="6.8" r="0.7" fill="white" />
                  </svg>
                  <span>인스타그램</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    ) : null;

  return (
    <>
      <div className="hd-symbol-menu">
        <button
          type="button"
          className="hd-logo-btn"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "사이트 메뉴 닫기" : "사이트 메뉴 열기"}
        >
          {open ? (
            <svg
              className="hd-logo-btn__close"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 8l12 12M20 8L8 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <KoBrandLogo />
          )}
        </button>
      </div>
      {panel ? createPortal(panel, document.body) : null}
    </>
  );
}
