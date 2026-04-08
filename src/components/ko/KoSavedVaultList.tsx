"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getQuizUiStrings } from "@/i18n/quiz-ui";
import {
  QUIZ_VAULT_CHANGED_EVENT,
  readSavedQuizVault,
  removeQuizVaultItem,
  type SavedQuizVaultItem,
} from "@/lib/quizSavedResults";

function formatSavedAtKo(ts: number): string {
  try {
    return new Date(ts).toLocaleString("ko-KR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "";
  }
}

export function KoSavedVaultList() {
  const ui = getQuizUiStrings("ko");
  const [items, setItems] = useState<SavedQuizVaultItem[]>([]);

  const refresh = useCallback(() => {
    setItems(readSavedQuizVault());
  }, []);

  useEffect(() => {
    refresh();
    const onVault = () => refresh();
    window.addEventListener(QUIZ_VAULT_CHANGED_EVENT, onVault);
    window.addEventListener("storage", onVault);
    return () => {
      window.removeEventListener(QUIZ_VAULT_CHANGED_EVENT, onVault);
      window.removeEventListener("storage", onVault);
    };
  }, [refresh]);

  const onRemove = (id: string) => {
    removeQuizVaultItem(id);
    refresh();
  };

  if (items.length === 0) {
    return (
      <section className="ko-vault-empty" aria-labelledby="ko-vault-empty-title">
        <h2 id="ko-vault-empty-title" className="ko-vault-empty__title">
          저장된 결과가 없어요
        </h2>
        <p className="ko-vault-empty__desc">
          테스트 결과 화면에서 북마크 아이콘을 누르면 이곳에 쌓여요. 이 기기·이 브라우저에만 저장됩니다.
        </p>
        <Link className="btn primary sm" href="/ko/explore/">
          테스트 둘러보기
        </Link>
      </section>
    );
  }

  return (
    <section className="ko-vault-list" aria-label="저장한 테스트 결과">
      <ul className="ko-vault-list__ul" role="list">
        {items.map((item) => (
          <li key={item.id} className="ko-vault-card">
            {item.imageUrl ? (
              <div className="ko-vault-card__visual">
                {/* eslint-disable-next-line @next/next/no-img-element -- 동적 저장 URL, remote patterns 불필요 */}
                <img src={item.imageUrl} alt="" width={96} height={64} className="ko-vault-card__img" />
              </div>
            ) : null}
            <div className="ko-vault-card__body">
              <p className="ko-vault-card__quiz">{item.quizTitle}</p>
              <p className="ko-vault-card__result">{item.resultTitle}</p>
              {item.resultLine ? <p className="ko-vault-card__line">{item.resultLine}</p> : null}
              <p className="ko-vault-card__meta">{formatSavedAtKo(item.savedAt)}</p>
              <div className="ko-vault-card__actions">
                <Link className="btn sm" href={item.quizHref}>
                  테스트 열기
                </Link>
                <button
                  type="button"
                  className="btn sm ko-vault-card__remove"
                  onClick={() => onRemove(item.id)}
                >
                  {ui.removeFromVault}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
