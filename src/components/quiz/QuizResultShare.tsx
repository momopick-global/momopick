"use client";

import { useCallback, useEffect, useState } from "react";
import type { QuizUiStrings } from "@/i18n/quiz-ui";
import {
  absoluteHttpsUrlForKakao,
  getKakaoFeedShareUrls,
  normalizeUrlForKakao,
  parseShareTextForKakaoFeed,
} from "@/lib/kakaoShareFeed";

/** 퀴즈 결과 전용 카카오 커스텀 템플릿 ID (버튼 2개) */
const KAKAO_QUIZ_RESULT_TEMPLATE_ID = 131878;

type Props = {
  ui: QuizUiStrings;
  /** SNS 미리보기·트윗에 쓸 짧은 문구 */
  shareText: string;
  /** 카카오 공유 피드에 표시할 이미지 경로 (`/quizzes/...`) 또는 절대 URL. 없으면 기본 OG 이미지 사용 */
  shareImageUrl?: string;
  /**
   * 카카오 버튼 "테스트 하기"에 연결할 퀴즈 시작 URL (상대/절대 모두 가능).
   * 없으면 현재 페이지 URL로 fallback.
   */
  quizStartUrl?: string;
  /**
   * true: 퀴즈 **결과** 화면 — 커스텀 템플릿(결과 보기·테스트 하기 2버튼).
   * false/생략: 문항 진행 중 등 — 기본 피드(현재 페이지 1링크, 추가 버튼 없음).
   */
  kakaoQuizResultShare?: boolean;
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function QuizResultShare({
  ui,
  shareText,
  shareImageUrl,
  quizStartUrl,
  kakaoQuizResultShare = false,
}: Props) {
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
    const Kakao = typeof window !== "undefined" ? window.Kakao : undefined;
    const fallbackCopy = () => {
      void navigator.clipboard.writeText(pageUrl).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      });
    };

    const { title, description } = parseShareTextForKakaoFeed(shareText);
    const { mobileWebUrl, webUrl, imageUrl } = getKakaoFeedShareUrls(pageUrl, shareImageUrl);
    const resultMobile = absoluteHttpsUrlForKakao(mobileWebUrl);
    const resultWeb = absoluteHttpsUrlForKakao(webUrl);
    const imageForKakao = absoluteHttpsUrlForKakao(imageUrl);
    const resultLink = { mobileWebUrl: resultMobile, webUrl: resultWeb };

    if (!Kakao?.isInitialized?.()) {
      fallbackCopy();
      return;
    }

    /** 문항 진행 중 등: 기본 피드(본문 링크만, 하단 버튼 없음) */
    if (!kakaoQuizResultShare) {
      if (typeof Kakao.Share?.sendDefault !== "function") {
        fallbackCopy();
        return;
      }
      try {
        console.info("[Momopick][Kakao] Share.sendDefault(feed, simple)", { pageUrl, resultMobile, imageForKakao });
        const result = Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: title || "모모픽",
            description: description || "재미로 보는 심리 테스트",
            imageUrl: imageForKakao,
            link: resultLink,
          },
        });
        if (result && typeof (result as Promise<void>).catch === "function") {
          (result as Promise<void>).catch((e: unknown) => {
            console.warn("[Kakao] Share.sendDefault rejected", e);
            fallbackCopy();
          });
        }
      } catch (e) {
        console.warn("[Kakao] Share.sendDefault failed", e);
        fallbackCopy();
      }
      return;
    }

    /** 퀴즈 결과: 커스텀 템플릿(2버튼) */
    if (typeof Kakao.Share?.sendCustom !== "function") {
      fallbackCopy();
      return;
    }
    const startHref = quizStartUrl ? absoluteHttpsUrlForKakao(normalizeUrlForKakao(quizStartUrl)) : resultMobile;

    try {
      console.info("[Momopick][Kakao] Share.sendCustom(result)", {
        templateId: KAKAO_QUIZ_RESULT_TEMPLATE_ID,
        pageUrl,
        resultMobile,
        imageForKakao,
        startHref,
      });
      const result = Kakao.Share.sendCustom({
        templateId: KAKAO_QUIZ_RESULT_TEMPLATE_ID,
        templateArgs: {
          TITLE: title || "모모픽",
          DESC: description || "재미로 보는 심리 테스트",
          IMAGE_URL: imageForKakao,
          RESULT_URL: resultMobile,
          RESULT_WEB_URL: resultWeb,
          START_URL: startHref,
          START_WEB_URL: startHref,
        },
      });
      if (result && typeof (result as Promise<void>).catch === "function") {
        (result as Promise<void>).catch((e: unknown) => {
          console.warn("[Kakao] Share.sendCustom rejected", e);
          fallbackCopy();
        });
      }
    } catch (e) {
      console.warn("[Kakao] Share.sendCustom failed", e);
      fallbackCopy();
    }
  }, [pageUrl, shareText, shareImageUrl, quizStartUrl, kakaoQuizResultShare]);

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
