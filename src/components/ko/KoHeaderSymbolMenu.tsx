"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { KoBrandLogo } from "./KoBrandLogo";
import { KO_SITE_NAV_LINKS } from "./koSiteNavLinks";

export function KoHeaderSymbolMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
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
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const el = wrapRef.current;
      if (el && !el.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open, close]);

  return (
    <div className="hd-symbol-menu" ref={wrapRef}>
      <button
        type="button"
        className="hd-logo-btn"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "사이트 메뉴 닫기" : "사이트 메뉴 열기"}
      >
        <KoBrandLogo />
      </button>
      {open ? (
        <nav id={menuId} className="hd-symbol-dropdown" aria-label="사이트 정보">
          <ul className="hd-symbol-dropdown__list">
            {KO_SITE_NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hd-symbol-dropdown__link" onClick={close}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
