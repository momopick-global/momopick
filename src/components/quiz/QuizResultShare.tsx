"use client";

import { useCallback, useEffect, useState } from "react";
import type { QuizUiStrings } from "@/i18n/quiz-ui";

type Props = {
  ui: QuizUiStrings;
  /** SNS 미리보기·트윗에 쓸 짧은 문구 */
  shareText: string;
};

function IconLink() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconKakao() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#FEE500" />
      <path
        fill="#191919"
        d="M12 5.5c-3.2 0-5.8 2-5.8 4.5 0 1.6.9 3 2.3 3.8l-.6 2.2 2.5-1.3c.5.1 1 .2 1.6.2 3.2 0 5.8-2 5.8-4.5S15.2 5.5 12 5.5z"
      />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function QuizResultShare({ ui, shareText }: Props) {
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  const handleCopy = useCallback(() => {
    if (!pageUrl) return;
    void navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }, [pageUrl]);

  const openKakao = useCallback(() => {
    if (!pageUrl) return;
    const u = encodeURIComponent(pageUrl);
    window.open(`https://story.kakao.com/share?url=${u}`, "_blank", "noopener,noreferrer");
  }, [pageUrl]);

  const openFacebook = useCallback(() => {
    if (!pageUrl) return;
    const u = encodeURIComponent(pageUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${u}`, "_blank", "noopener,noreferrer");
  }, [pageUrl]);

  const openX = useCallback(() => {
    if (!pageUrl) return;
    const u = encodeURIComponent(pageUrl);
    const t = encodeURIComponent(shareText);
    window.open(`https://twitter.com/intent/tweet?text=${t}&url=${u}`, "_blank", "noopener,noreferrer");
  }, [pageUrl, shareText]);

  return (
    <div className="quiz-share">
      <p className="quiz-share-title">{ui.shareWithFriends}</p>
      <div className="quiz-share-row" role="group" aria-label={ui.shareWithFriends}>
        <button
          type="button"
          className="quiz-share-btn"
          onClick={handleCopy}
          disabled={!pageUrl}
          title={ui.copyLink}
          aria-label={copied ? ui.copied : ui.copyLink}
        >
          <span className="quiz-share-btn-inner quiz-share-btn-inner--link">
            <IconLink />
          </span>
        </button>
        <button
          type="button"
          className="quiz-share-btn"
          onClick={openKakao}
          disabled={!pageUrl}
          title={ui.shareKakao}
          aria-label={ui.shareKakao}
        >
          <span className="quiz-share-btn-inner">
            <IconKakao />
          </span>
        </button>
        <button
          type="button"
          className="quiz-share-btn"
          onClick={openFacebook}
          disabled={!pageUrl}
          title={ui.shareFacebook}
          aria-label={ui.shareFacebook}
        >
          <span className="quiz-share-btn-inner">
            <IconFacebook />
          </span>
        </button>
        <button
          type="button"
          className="quiz-share-btn"
          onClick={openX}
          disabled={!pageUrl}
          title={ui.shareX}
          aria-label={ui.shareX}
        >
          <span className="quiz-share-btn-inner quiz-share-btn-inner--x">
            <IconX />
          </span>
        </button>
      </div>
      {copied ? (
        <p className="quiz-share-hint" role="status">
          {ui.copied}
        </p>
      ) : null}
    </div>
  );
}
