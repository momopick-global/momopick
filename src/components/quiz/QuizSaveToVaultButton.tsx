"use client";

import { useState } from "react";
import type { QuizUiStrings } from "@/i18n/quiz-ui";
import { appendQuizVaultItem, type SavedQuizVaultDraft } from "@/lib/quizSavedResults";

function IconBookmark({ filled }: { filled: boolean }) {
  if (filled) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 4a2 2 0 012-2h8a2 2 0 012 2v18l-6-4-6 4V4z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 4a2 2 0 012-2h8a2 2 0 012 2v18l-6-4-6 4V4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  ui: QuizUiStrings;
  draft: SavedQuizVaultDraft;
  /** 결과 카드: 전폭 바 형태 */
  layout?: "icon" | "bar";
  /** 이미지 우상단 FAB — layout이 icon일 때만 적용 */
  variant?: "default" | "fab";
};

export function QuizSaveToVaultButton({ ui, draft, layout = "icon", variant = "default" }: Props) {
  const [savedFlash, setSavedFlash] = useState(false);

  const onSave = () => {
    appendQuizVaultItem(draft);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 2000);
  };

  if (layout === "bar") {
    return (
      <div className="quiz-vault-save-bar-wrap">
        <button
          type="button"
          className={`btn quiz-vault-save-bar${savedFlash ? " quiz-vault-save-bar--done" : ""}`}
          onClick={onSave}
        >
          <IconBookmark filled={savedFlash} />
          <span>{savedFlash ? ui.savedToVault : ui.saveToVault}</span>
        </button>
        {savedFlash ? (
          <p className="quiz-vault-save-hint quiz-vault-save-hint--bar" role="status">
            {ui.savedToVault}
          </p>
        ) : null}
      </div>
    );
  }

  const fab = variant === "fab";

  return (
    <div className={`quiz-vault-save-wrap${fab ? " quiz-vault-save-wrap--fab" : ""}`}>
      <button
        type="button"
        className={`quiz-share-btn quiz-vault-save${fab ? " quiz-vault-save--fab" : ""}${savedFlash ? " quiz-vault-save--done" : ""}`}
        onClick={onSave}
        title={savedFlash ? ui.savedToVault : ui.saveToVault}
        aria-label={savedFlash ? ui.savedToVault : ui.saveToVault}
      >
        <span className="quiz-share-btn-inner quiz-vault-save-inner">
          <IconBookmark filled={savedFlash} />
        </span>
      </button>
      {savedFlash ? (
        <p className={`quiz-vault-save-hint${fab ? " quiz-vault-save-hint--fab" : ""}`} role="status">
          {ui.savedToVault}
        </p>
      ) : null}
    </div>
  );
}
