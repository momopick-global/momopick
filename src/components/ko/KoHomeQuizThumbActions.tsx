"use client";

import { createPortal } from "react-dom";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { QuizSaveToVaultButton } from "@/components/quiz/QuizSaveToVaultButton";
import { QuizResultShareIconRow, QuizShareStatusHints } from "@/components/quiz/QuizResultShare";
import { useQuizResultShareModel } from "@/components/quiz/useQuizResultShareModel";
import { getQuizUiStrings } from "@/i18n/quiz-ui";
import { vaultKindForHomeSlug } from "@/lib/content/vaultKindForHomeSlug";

function IconShareOpen() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="18" cy="5" r="2.5" fill="currentColor" />
      <circle cx="6" cy="12" r="2.5" fill="currentColor" />
      <circle cx="18" cy="19" r="2.5" fill="currentColor" />
      <path
        d="M8.6 10.4L15.4 6.6M8.6 13.6l6.8 3.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Props = {
  href: string;
  slug: string;
  title: string;
  subtitleLine: string;
  subtitleOnly: string;
  imageUrl: string;
};

export function KoHomeQuizThumbActions({ href, slug, title, subtitleLine, subtitleOnly, imageUrl }: Props) {
  const ui = getQuizUiStrings("ko");
  const dialogTitleId = useId();
  const [open, setOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setPortalReady(typeof document !== "undefined");
  }, []);

  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(typeof window !== "undefined" ? window.location.origin : "");
  }, []);

  const absQuizUrl = useMemo(() => {
    if (!origin || !href) return "";
    try {
      return new URL(href, origin).href;
    } catch {
      return "";
    }
  }, [origin, href]);

  const absImageUrl = useMemo(() => {
    if (!origin || !imageUrl?.trim()) return undefined;
    const t = imageUrl.trim();
    if (/^https?:\/\//i.test(t)) return t;
    try {
      return new URL(t, origin).href;
    } catch {
      return undefined;
    }
  }, [origin, imageUrl]);

  const shareText = useMemo(() => `${title}\n${subtitleLine}`, [title, subtitleLine]);

  const shareModel = useQuizResultShareModel({
    shareText,
    shareImageUrl: absImageUrl,
    quizResultUrl: absQuizUrl || undefined,
    kakaoQuizResultShare: false,
  });

  const resultTitle = subtitleOnly.trim() || "테스트 바로가기";
  const resultLine =
    subtitleOnly.trim() && subtitleLine !== subtitleOnly ? subtitleLine : undefined;

  const vaultDraft = useMemo(
    () => ({
      locale: "ko" as const,
      quizSlug: slug,
      quizTitle: title,
      quizHref: href,
      kind: vaultKindForHomeSlug(slug),
      resultTitle,
      resultLine,
      imageUrl: imageUrl?.trim() || undefined,
    }),
    [slug, title, href, resultTitle, resultLine, imageUrl],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) closeBtnRef.current?.focus();
  }, [open]);

  const popover =
    open && portalReady ? (
      <div className="momopick-ko home-quiz-share-popover-root">
        <div
          className="home-quiz-share-popover-backdrop"
          role="presentation"
          onClick={() => setOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          className="home-quiz-share-popover"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            ref={closeBtnRef}
            type="button"
            className="home-quiz-share-popover__close"
            aria-label="닫기"
            onClick={() => setOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <h2 id={dialogTitleId} className="home-quiz-share-popover__title">
            {title}
          </h2>
          <div className="home-quiz-share-popover__section">
            <QuizResultShareIconRow model={shareModel} ui={ui} />
            <QuizShareStatusHints model={shareModel} ui={ui} />
          </div>
          <div className="home-quiz-share-popover__vault">
            <p className="home-quiz-share-popover__vault-label">{ui.saveToVault}</p>
            <QuizSaveToVaultButton layout="icon" ui={ui} draft={vaultDraft} />
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div className="home-quiz-thumb-actions">
      <button
        type="button"
        className="home-quiz-thumb-actions__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="공유·보관함"
        title="공유·보관함"
        onClick={() => setOpen(true)}
      >
        <span className="home-quiz-thumb-actions__trigger-inner">
          <IconShareOpen />
        </span>
      </button>
      {popover ? createPortal(popover, document.body) : null}
    </div>
  );
}
