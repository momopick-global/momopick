"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { KoBrandLogo } from "./KoBrandLogo";
import { KO_POLICY_LINKS, KO_SITE_NAV_LINKS, KO_TEST_CATEGORY_LINKS } from "./koSiteNavLinks";

export type KoHeaderSymbolMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function KoHeaderSymbolMenu({ open, onOpenChange }: KoHeaderSymbolMenuProps) {
  const menuId = useId();
  const [portalVisible, setPortalVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [menuMountKey, setMenuMountKey] = useState(0);
  const closingRef = useRef(false);
  closingRef.current = closing;

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    setMenuMountKey((k) => k + 1);
    setPortalVisible(true);
    setClosing(false);
  }, [open]);

  useEffect(() => {
    if (open || !portalVisible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPortalVisible(false);
      setClosing(false);
    } else {
      setClosing(true);
    }
  }, [open, portalVisible]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!portalVisible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [portalVisible]);

  const handlePanelAnimationEnd = useCallback((e: React.AnimationEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    if (!closingRef.current) return;
    const name = e.animationName ?? "";
    if (!String(name).includes("hd-symbol-panel-slide-out")) return;
    setPortalVisible(false);
    setClosing(false);
  }, []);

  /** 패널이 DOM에 있는 동안은 닫힘 애니메이션과 버튼 아이콘·aria를 맞춤 (open만 쓰면 닫기 중 토끼로 바뀌는 깜빡임) */
  const panelOnScreen = open || portalVisible;

  const panel =
    portalVisible && typeof document !== "undefined" ? (
      <div className="momopick-ko hd-symbol-panel-portal">
        <nav
          key={menuMountKey}
          id={menuId}
          className={`hd-symbol-panel${closing ? " hd-symbol-panel--closing" : ""}`}
          aria-label="사이트 메뉴"
          onAnimationEnd={handlePanelAnimationEnd}
        >
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
                  href="https://pf.kakao.com/_GlGxlX"
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
                  href="https://www.instagram.com/momopick.cc?igsh=MTVzbmhueWVpaWNxMg%3D%3D&utm_source=qr"
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
          aria-expanded={panelOnScreen}
          aria-haspopup="true"
          aria-controls={menuId}
          onClick={() => onOpenChange(!open)}
          aria-label={panelOnScreen ? "사이트 메뉴 닫기" : "사이트 메뉴 열기"}
        >
          {panelOnScreen ? (
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
