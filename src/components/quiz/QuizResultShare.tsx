"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { QuizUiStrings } from "@/i18n/quiz-ui";
import {
  getKakaoFeedShareUrls,
  isKakaoPathLocaleHubOnly,
  kakaoTemplatePathAndSuffix,
  normalizeMomopickHostForShare,
  parseShareTextForKakaoFeed,
  pathForKakaoMessageTemplate,
} from "@/lib/kakaoShareFeed";

/** 퀴즈 결과 전용 카카오 커스텀 템플릿 ID (버튼 2개) */
const KAKAO_QUIZ_RESULT_TEMPLATE_ID = 131878;

/** SDK 스크립트는 로드됐는데 `onLoad` 직전에 클릭하는 경우 동기 `init` 보완 (제스처 유지) */
const NEXT_KAKAO_JS_KEY = (process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY ?? "").trim();

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
   * 결과 딥링크(쿼리 포함 가능). 있으면 복사·SNS·카카오「결과 보기」·피드 본문 링크에 우선 사용.
   * 예: `/ko/love/slug/?r=typeA` — `quizStartUrl`은 쿼리 없는 시작 페이지 권장.
   */
  quizResultUrl?: string;
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
  quizResultUrl,
  kakaoQuizResultShare = false,
}: Props) {
  const [pageUrl, setPageUrl] = useState("");
  /** 링크 복사 버튼 전용 */
  const [linkCopiedNotice, setLinkCopiedNotice] = useState(false);
  /** 카카오 공유 폴백(클립보드) 전용 — 「복사됨」과 혼동 방지 */
  const [kakaoFallbackNotice, setKakaoFallbackNotice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  const resolvedPageUrl = useMemo(() => {
    if (quizResultUrl?.trim()) return normalizeMomopickHostForShare(quizResultUrl.trim());
    return pageUrl;
  }, [quizResultUrl, pageUrl]);

  const canUseShareLinks = Boolean(pageUrl || quizResultUrl?.trim());

  const handleCopy = useCallback(() => {
    if (!resolvedPageUrl) return;
    setKakaoFallbackNotice(false);
    void navigator.clipboard.writeText(resolvedPageUrl).then(
      () => {
        setLinkCopiedNotice(true);
        window.setTimeout(() => setLinkCopiedNotice(false), 2000);
      },
      () => window.prompt("아래 링크를 복사해 주세요", resolvedPageUrl),
    );
  }, [resolvedPageUrl]);

  const openKakao = useCallback(() => {
    if (typeof window === "undefined" || !canUseShareLinks) return;
    setLinkCopiedNotice(false);
    setKakaoFallbackNotice(false);
    /** 마운트 시점 URL이 아니라 클릭 시점 — 클라이언트 전환·쿼리 반영 후에도 맞음 */
    const hrefAtClick = window.location.href;
    const hrefForResultFeed = quizResultUrl?.trim()
      ? normalizeMomopickHostForShare(quizResultUrl.trim())
      : hrefAtClick;

    const fallbackCopy = () => {
      setLinkCopiedNotice(false);
      void navigator.clipboard.writeText(hrefForResultFeed).then(
        () => {
          setKakaoFallbackNotice(true);
          window.setTimeout(() => setKakaoFallbackNotice(false), 3500);
        },
        () => {
          console.warn("[Momopick] clipboard write failed, fallback prompt");
          window.prompt("아래 링크를 복사해 주세요", hrefForResultFeed);
        },
      );
    };

    /**
     * `await` 로 클릭 직후 공유를 미루면 사용자 제스처가 끊겨 카카오 공유 창이 안 뜨는 브라우저가 많음.
     * SDK는 `beforeInteractive` 로 최대한 먼저 로드 — 여기서는 동기 호출만 한다.
     */
    try {
      const Kakao = window.Kakao;
      if (!NEXT_KAKAO_JS_KEY) {
        console.warn("[Momopick][Kakao] NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY 없음 — 빌드·Pages 환경변수 확인");
        fallbackCopy();
        return;
      }
      if (!Kakao) {
        console.warn("[Momopick][Kakao] 스크립트 미로드 — 네트워크·차단기 확인 후 다시 시도");
        fallbackCopy();
        return;
      }
      if (!Kakao.isInitialized()) {
        try {
          Kakao.init(NEXT_KAKAO_JS_KEY);
        } catch (e) {
          console.warn("[Kakao] init(공유 클릭 시점) 실패", e);
        }
      }
      if (!Kakao.isInitialized()) {
        console.warn(
          "[Momopick][Kakao] init 후에도 미준비 — 잠시 후 다시 누르거나 카카오 앱 키·도메인 등록 확인",
        );
        fallbackCopy();
        return;
      }

      const { title, description } = parseShareTextForKakaoFeed(shareText);
      const { mobileWebUrl, webUrl, imageUrl } = getKakaoFeedShareUrls(hrefForResultFeed, shareImageUrl);
      const resultMobile = normalizeMomopickHostForShare(mobileWebUrl);
      const resultWeb = normalizeMomopickHostForShare(webUrl);
      const imageForKakao = normalizeMomopickHostForShare(imageUrl);
      const resultLink = { mobileWebUrl: resultMobile, webUrl: resultWeb };

      /** 문항 진행 중 등: 기본 피드(본문 링크만, 하단 버튼 없음) */
      if (!kakaoQuizResultShare) {
        if (typeof Kakao.Share?.sendDefault !== "function") {
          fallbackCopy();
          return;
        }
        try {
          console.info("[Momopick][Kakao] Share.sendDefault(feed, simple)", {
            hrefForResultFeed,
            resultMobile,
            imageForKakao,
          });
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

      const resultPath = pathForKakaoMessageTemplate(resultMobile);
      const rs = kakaoTemplatePathAndSuffix(resultMobile);
      let startHref = quizStartUrl?.trim()
        ? normalizeMomopickHostForShare(quizStartUrl)
        : resultMobile;
      let startPath = pathForKakaoMessageTemplate(startHref);
      if (isKakaoPathLocaleHubOnly(startPath)) {
        startHref = resultMobile;
        startPath = resultPath;
      }
      const ss = kakaoTemplatePathAndSuffix(startHref);
      const resultPathFull = `${rs.path}${rs.suffix}`;
      const startPathFull = `${ss.path}${ss.suffix}`;
      const startLink = { mobileWebUrl: startHref, webUrl: startHref };

      const sendDefaultResultDual = () => {
        if (typeof Kakao.Share?.sendDefault !== "function") {
          fallbackCopy();
          return;
        }
        try {
          console.info("[Momopick][Kakao] Share.sendDefault(feed, result fallback)", {
            hrefForResultFeed,
            resultMobile,
            startHref,
          });
          const result = Kakao.Share.sendDefault({
            objectType: "feed",
            content: {
              title: title || "모모픽",
              description: description || "재미로 보는 심리 테스트",
              imageUrl: imageForKakao,
              link: resultLink,
            },
            buttons: [
              { title: "결과 보기", link: resultLink },
              { title: "테스트 하기", link: startLink },
            ],
          });
          if (result && typeof (result as Promise<void>).catch === "function") {
            (result as Promise<void>).catch((e: unknown) => {
              console.warn("[Kakao] sendDefault(fallback) rejected", e);
              fallbackCopy();
            });
          }
        } catch (e) {
          console.warn("[Kakao] sendDefault(fallback) failed", e);
          fallbackCopy();
        }
      };

      if (typeof Kakao.Share?.sendCustom !== "function") {
        sendDefaultResultDual();
        return;
      }

      try {
        console.info("[Momopick][Kakao] Share.sendCustom(result)", {
          templateId: KAKAO_QUIZ_RESULT_TEMPLATE_ID,
          hrefForResultFeed,
          resultMobile,
          resultPathFull,
          rs,
          imageForKakao,
          startHref,
          startPathFull,
          ss,
        });
        const result = Kakao.Share.sendCustom({
          templateId: KAKAO_QUIZ_RESULT_TEMPLATE_ID,
          templateArgs: {
            TITLE: title || "모모픽",
            DESC: description || "재미로 보는 심리 테스트",
            IMAGE_URL: imageForKakao,
            /** 레거시·단일 변수용: 경로+쿼리 한 덩어리(쿼리가 잘리는 템플릿은 RESULT_PATH+RESULT_SUFFIX 권장) */
            RESULT_URL: resultPathFull,
            RESULT_WEB_URL: resultPathFull,
            RESULT_PATH: rs.path,
            RESULT_SUFFIX: rs.suffix,
            START_URL: startPathFull,
            START_WEB_URL: startPathFull,
            START_PATH: ss.path,
            START_SUFFIX: ss.suffix,
          },
        });
        if (result && typeof (result as Promise<void>).catch === "function") {
          (result as Promise<void>).catch((e: unknown) => {
            console.warn("[Kakao] Share.sendCustom rejected → sendDefault fallback", e);
            sendDefaultResultDual();
          });
        }
      } catch (e) {
        console.warn("[Kakao] Share.sendCustom failed → sendDefault fallback", e);
        sendDefaultResultDual();
      }
    } catch (e) {
      console.error("[Momopick][Kakao] openKakao unexpected error", e);
      fallbackCopy();
    }
  }, [canUseShareLinks, shareText, shareImageUrl, kakaoQuizResultShare, quizStartUrl, quizResultUrl]);

  const openFacebook = useCallback(() => {
    if (!resolvedPageUrl) return;
    const u = encodeURIComponent(resolvedPageUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${u}`, "_blank", "noopener,noreferrer");
  }, [resolvedPageUrl]);

  const openX = useCallback(() => {
    if (!resolvedPageUrl) return;
    const u = encodeURIComponent(resolvedPageUrl);
    const t = encodeURIComponent(shareText);
    window.open(`https://twitter.com/intent/tweet?text=${t}&url=${u}`, "_blank", "noopener,noreferrer");
  }, [resolvedPageUrl, shareText]);

  return (
    <div className="quiz-share">
      <p className="quiz-share-title">{ui.shareWithFriends}</p>
      <div className="quiz-share-row" role="group" aria-label={ui.shareWithFriends}>
        <button
          type="button"
          className="quiz-share-btn"
          onClick={handleCopy}
          disabled={!canUseShareLinks}
          title={ui.copyLink}
          aria-label={linkCopiedNotice ? ui.copied : ui.copyLink}
        >
          <span className="quiz-share-btn-inner quiz-share-btn-inner--link">
            <IconLink />
          </span>
        </button>
        <button
          type="button"
          className="quiz-share-btn"
          onClick={openKakao}
          disabled={!canUseShareLinks}
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
          disabled={!canUseShareLinks}
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
          disabled={!canUseShareLinks}
          title={ui.shareX}
          aria-label={ui.shareX}
        >
          <span className="quiz-share-btn-inner quiz-share-btn-inner--x">
            <IconX />
          </span>
        </button>
      </div>
      {linkCopiedNotice ? (
        <p className="quiz-share-hint" role="status">
          {ui.copied}
        </p>
      ) : null}
      {kakaoFallbackNotice ? (
        <p className="quiz-share-hint" role="status">
          {ui.kakaoShareFallbackHint}
        </p>
      ) : null}
    </div>
  );
}
