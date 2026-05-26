"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

const NEXT_KAKAO_JS_KEY = (process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY ?? "").trim();

export type KakaoFallbackCause = "missing_key" | "script" | "default";

export type UseQuizResultShareModelParams = {
  shareText: string;
  shareImageUrl?: string;
  quizStartUrl?: string;
  quizResultUrl?: string;
  kakaoQuizResultShare?: boolean;
};

export function useQuizResultShareModel({
  shareText,
  shareImageUrl,
  quizStartUrl,
  quizResultUrl,
  kakaoQuizResultShare = false,
}: UseQuizResultShareModelParams) {
  const [pageUrl, setPageUrl] = useState("");
  const [linkCopiedNotice, setLinkCopiedNotice] = useState(false);
  const [kakaoFallback, setKakaoFallback] = useState<null | { cause: KakaoFallbackCause }>(null);

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
    setKakaoFallback(null);
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
    setKakaoFallback(null);
    const hrefAtClick = window.location.href;
    const hrefForResultFeed = quizResultUrl?.trim()
      ? normalizeMomopickHostForShare(quizResultUrl.trim())
      : hrefAtClick;

    const fallbackCopy = (cause: KakaoFallbackCause = "default") => {
      setLinkCopiedNotice(false);
      void navigator.clipboard.writeText(hrefForResultFeed).then(
        () => {
          setKakaoFallback({ cause });
          window.setTimeout(() => setKakaoFallback(null), 8000);
        },
        () => {
          console.warn("[Momopick] clipboard write failed, fallback prompt");
          window.prompt("아래 링크를 복사해 주세요", hrefForResultFeed);
        },
      );
    };

    try {
      const Kakao = window.Kakao;
      if (!NEXT_KAKAO_JS_KEY) {
        console.warn("[Momopick][Kakao] NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY 없음 — 빌드·Pages 환경변수 확인");
        fallbackCopy("missing_key");
        return;
      }
      if (!Kakao) {
        console.warn("[Momopick][Kakao] 스크립트 미로드 — 네트워크·차단기 확인 후 다시 시도");
        fallbackCopy("script");
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

      // 카카오 디벨로퍼스에 등록된 템플릿(ID 131878)이 이미지 영역에 ${THU}
      // 사용자 인자를 사용하므로 THU 키로 결과 이미지 URL을 전달해야 함.
      // 이전엔 IMAGE_URL만 보내서 결과 페이지 공유 시 카드 이미지가 빈 상태로
      // 노출됐다. 호환성을 위해 IMAGE_URL은 그대로 두고 THU를 추가.
      const resultTitleForLog = title || "모모픽";
      const resultDescForLog = description || "재미로 보는 심리 테스트";
      try {
        console.info("[Momopick][Kakao] Share.sendCustom(result)", {
          templateId: KAKAO_QUIZ_RESULT_TEMPLATE_ID,
          hrefForResultFeed,
          resultMobile,
          resultPathFull,
          rs,
          resultTitle: resultTitleForLog,
          resultDescription: resultDescForLog,
          resultImageUrl: imageForKakao,
          THU: imageForKakao,
          startHref,
          startPathFull,
          ss,
        });
        const result = Kakao.Share.sendCustom({
          templateId: KAKAO_QUIZ_RESULT_TEMPLATE_ID,
          templateArgs: {
            TITLE: resultTitleForLog,
            DESC: resultDescForLog,
            THU: imageForKakao,
            IMAGE_URL: imageForKakao,
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

  return {
    handleCopy,
    openKakao,
    openFacebook,
    openX,
    canUseShareLinks,
    linkCopiedNotice,
    kakaoFallback,
  };
}

export type QuizResultShareModel = ReturnType<typeof useQuizResultShareModel>;
