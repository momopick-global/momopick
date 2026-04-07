"use client";

import { useCallback, useEffect, useId, useState } from "react";
import {
  dispatchKoHeaderLoginIconChanged,
  KO_HEADER_LOGIN_ALT_SAVED_WEBP,
  KO_HEADER_LOGIN_DEFAULT_SAVED_WEBP,
  KO_HEADER_LOGIN_ICON_STORAGE_KEY,
  KO_HEADER_LOGIN_MAX_UPLOAD_BYTES,
  KO_HEADER_LOGIN_USE_SVG,
  readKoHeaderLoginIconStorage,
  resolveKoHeaderLoginIcon,
} from "@/lib/koHeaderLoginIcon";

/** 보관함 페이지 — 헤더 로그인 버튼 이미지 설정 */
export function KoSavedLoginIconSettings() {
  const pathname = "/ko/app/saved";
  const inputId = useId();
  const titleId = useId();
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
  const previewSrc =
    resolved === "svg"
      ? null
      : resolved.src;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f || !f.type.startsWith("image/")) return;
    if (f.size > KO_HEADER_LOGIN_MAX_UPLOAD_BYTES) {
      window.alert(
        `이미지 용량이 너무 큽니다. ${Math.round(KO_HEADER_LOGIN_MAX_UPLOAD_BYTES / 1024)}KB 이하로 줄여 주세요.`,
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      if (typeof data !== "string") return;
      try {
        localStorage.setItem(KO_HEADER_LOGIN_ICON_STORAGE_KEY, data);
        sync();
        dispatchKoHeaderLoginIconChanged();
      } catch {
        window.alert("저장에 실패했습니다. 더 작은 이미지를 선택해 주세요.");
      }
    };
    reader.readAsDataURL(f);
  };

  const useDefaultSavedWebp1 = () => {
    try {
      localStorage.removeItem(KO_HEADER_LOGIN_ICON_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    sync();
    dispatchKoHeaderLoginIconChanged();
  };

  const useAltSavedWebp2 = () => {
    try {
      localStorage.setItem(KO_HEADER_LOGIN_ICON_STORAGE_KEY, KO_HEADER_LOGIN_ALT_SAVED_WEBP);
    } catch {
      window.alert("저장에 실패했습니다.");
      return;
    }
    sync();
    dispatchKoHeaderLoginIconChanged();
  };

  const useSiteSvg = () => {
    try {
      localStorage.setItem(KO_HEADER_LOGIN_ICON_STORAGE_KEY, KO_HEADER_LOGIN_USE_SVG);
    } catch {
      window.alert("저장에 실패했습니다.");
      return;
    }
    sync();
    dispatchKoHeaderLoginIconChanged();
  };

  return (
    <section className="ko-saved-login-icon" aria-labelledby={titleId}>
      <h2 id={titleId} className="ko-saved-login-icon__title">
        로그인 버튼 아이콘
      </h2>
      <p className="ko-saved-login-icon__desc">
        상단 헤더 오른쪽 로그인 자리에 보일 이미지를 바꿀 수 있어요. 이 기기(브라우저)에만
        저장됩니다.
      </p>

      <div className="ko-saved-login-icon__preview">
        {previewSrc ? (
          <img src={previewSrc} alt="" width={56} height={56} className="ko-saved-login-icon__img" />
        ) : (
          <div className="ko-saved-login-icon__preview-svg" aria-label="기본 사람 아이콘">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path
                d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="ko-saved-login-icon__actions">
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="ko-saved-login-icon__file"
          onChange={onFileChange}
        />
        <label htmlFor={inputId} className="btn primary sm">
          이미지 선택
        </label>
        <button type="button" className="btn sm" onClick={useDefaultSavedWebp1}>
          보관함 기본 이미지
        </button>
        <button type="button" className="btn sm" onClick={useAltSavedWebp2}>
          보관함 이미지 2
        </button>
        <button type="button" className="btn sm" onClick={useSiteSvg}>
          사이트 기본(아이콘)
        </button>
      </div>
      <p className="ko-saved-login-icon__hint">
        보관함 기본:{" "}
        <code className="ko-saved-login-icon__code">{KO_HEADER_LOGIN_DEFAULT_SAVED_WEBP}</code>
        · 이미지 2:{" "}
        <code className="ko-saved-login-icon__code">{KO_HEADER_LOGIN_ALT_SAVED_WEBP}</code>
        · 사이트 기본: 사람 실루엣 SVG
      </p>
    </section>
  );
}
