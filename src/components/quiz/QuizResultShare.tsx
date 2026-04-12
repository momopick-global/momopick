"use client";

import type { QuizUiStrings } from "@/i18n/quiz-ui";
import {
  type QuizResultShareModel,
  useQuizResultShareModel,
  type UseQuizResultShareModelParams,
} from "@/components/quiz/useQuizResultShareModel";

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

type Props = UseQuizResultShareModelParams & {
  ui: QuizUiStrings;
};

export function QuizShareStatusHints({ model, ui }: { model: QuizResultShareModel; ui: QuizUiStrings }) {
  return (
    <>
      {model.linkCopiedNotice ? (
        <p className="quiz-share-hint" role="status">
          {ui.copied}
        </p>
      ) : null}
      {model.kakaoFallback ? (
        <p className="quiz-share-hint" role="status">
          {model.kakaoFallback.cause === "missing_key"
            ? ui.kakaoShareMissingKeyHint
            : model.kakaoFallback.cause === "script"
              ? ui.kakaoShareScriptBlockedHint
              : ui.kakaoShareFallbackHint}
        </p>
      ) : null}
    </>
  );
}

/** SNS 아이콘 행 — `useQuizResultShareModel` 한 번만 호출한 뒤 전달 */
export function QuizResultShareIconRow({ model, ui }: { model: QuizResultShareModel; ui: QuizUiStrings }) {
  return (
    <>
      <p className="quiz-share-title">{ui.shareWithFriends}</p>
      <div className="quiz-share-row" role="group" aria-label={ui.shareWithFriends}>
        <button
          type="button"
          className="quiz-share-btn"
          onClick={model.handleCopy}
          disabled={!model.canUseShareLinks}
          title={ui.copyLink}
          aria-label={model.linkCopiedNotice ? ui.copied : ui.copyLink}
        >
          <span className="quiz-share-btn-inner quiz-share-btn-inner--link">
            <IconLink />
          </span>
        </button>
        <button
          type="button"
          className="quiz-share-btn"
          onClick={model.openKakao}
          disabled={!model.canUseShareLinks}
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
          onClick={model.openFacebook}
          disabled={!model.canUseShareLinks}
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
          onClick={model.openX}
          disabled={!model.canUseShareLinks}
          title={ui.shareX}
          aria-label={ui.shareX}
        >
          <span className="quiz-share-btn-inner quiz-share-btn-inner--x">
            <IconX />
          </span>
        </button>
      </div>
    </>
  );
}

/** 결과 카드 하단 — 전폭 카카오 CTA (아이콘 행과 동일 `openKakao`) */
export function QuizShareKakaoWideButton({ model, ui }: { model: QuizResultShareModel; ui: QuizUiStrings }) {
  return (
    <div className="quiz-share-kakao-wide-wrap">
      <button
        type="button"
        className="quiz-share-kakao-wide"
        onClick={model.openKakao}
        disabled={!model.canUseShareLinks}
        aria-label={ui.shareKakaoWideCta}
      >
        <span className="quiz-share-kakao-wide__glyph" aria-hidden="true">
          <IconKakao />
        </span>
        <span className="quiz-share-kakao-wide__label">{ui.shareKakaoWideCta}</span>
      </button>
    </div>
  );
}

export function QuizResultShare({ ui, ...modelParams }: Props) {
  const model = useQuizResultShareModel(modelParams);
  return (
    <div className="quiz-share">
      <QuizResultShareIconRow model={model} ui={ui} />
      <QuizShareStatusHints model={model} ui={ui} />
    </div>
  );
}
