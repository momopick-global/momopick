"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { readKoHeaderLoginIconStorage, resolveKoHeaderLoginIcon } from "@/lib/koHeaderLoginIcon";

function LoginSvg() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 헤더 오른쪽 로그인: 보관함은 기본 PNG, 그 외 SVG — localStorage로 덮어쓰기 가능 */
export function KoHeaderLoginBtn() {
  const pathname = usePathname() ?? "";
  const [stored, setStored] = useState<string | null>(null);

  const sync = useCallback(() => {
    setStored(readKoHeaderLoginIconStorage());
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("momopick-ko-header-login-icon", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("momopick-ko-header-login-icon", sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  const resolved = resolveKoHeaderLoginIcon(pathname, stored);

  return (
    <Link className="btn-icon" href="/ko/app/login/" title="로그인" aria-label="로그인">
      {resolved === "svg" ? (
        <LoginSvg />
      ) : (
        <img
          className="btn-icon__img"
          src={resolved.src}
          alt=""
          width={28}
          height={28}
          decoding="async"
        />
      )}
    </Link>
  );
}
