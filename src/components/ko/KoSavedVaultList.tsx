"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  QUIZ_VAULT_CHANGED_EVENT,
  clearQuizVault,
  readSavedQuizVault,
  removeQuizVaultItems,
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
  const [items, setItems] = useState<SavedQuizVaultItem[]>([]);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());

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

  useEffect(() => {
    const valid = new Set(items.map((i) => i.id));
    setSelected((prev) => {
      const next = new Set([...prev].filter((id) => valid.has(id)));
      return next;
    });
  }, [items]);

  const selectedCount = selected.size;
  const allSelected = items.length > 0 && selectedCount === items.length;

  const toggleOne = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const toggleAll = (checked: boolean) => {
    if (checked) setSelected(new Set(items.map((i) => i.id)));
    else setSelected(new Set());
  };

  const deleteSelected = () => {
    if (selectedCount === 0) return;
    if (!window.confirm(`선택한 ${selectedCount}개를 삭제할까요?`)) return;
    removeQuizVaultItems([...selected]);
    setSelected(new Set());
    refresh();
  };

  const deleteAll = () => {
    if (items.length === 0) return;
    if (!window.confirm("저장한 결과를 모두 삭제할까요? 이 작업은 되돌릴 수 없습니다.")) {
      return;
    }
    clearQuizVault();
    setSelected(new Set());
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
      </section>
    );
  }

  return (
    <section className="ko-vault-list" aria-label="저장한 테스트 결과">
      <div className="ko-vault-toolbar">
        <label className="ko-vault-toolbar__select-all">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) => toggleAll(e.target.checked)}
            aria-label="전체 선택"
          />
          <span>전체 선택</span>
        </label>
        <div className="ko-vault-toolbar__actions">
          <button
            type="button"
            className="btn sm ko-vault-toolbar__btn-delete"
            disabled={selectedCount === 0}
            onClick={deleteSelected}
          >
            선택 삭제{selectedCount > 0 ? ` (${selectedCount})` : ""}
          </button>
          <button type="button" className="btn sm ko-vault-toolbar__btn-clear" onClick={deleteAll}>
            전체 삭제
          </button>
        </div>
      </div>

      <ul className="ko-vault-list__ul" role="list">
        {items.map((item) => (
          <li key={item.id} className="ko-vault-card">
            <div className="ko-vault-card__check">
              <input
                type="checkbox"
                checked={selected.has(item.id)}
                onChange={(e) => toggleOne(item.id, e.target.checked)}
                aria-label={`${item.quizTitle} — 선택`}
              />
            </div>
            {item.imageUrl ? (
              <div className="ko-vault-card__visual">
                {/* eslint-disable-next-line @next/next/no-img-element -- 동적 저장 URL */}
                <img src={item.imageUrl} alt="" width={96} height={64} className="ko-vault-card__img" />
              </div>
            ) : (
              <div className="ko-vault-card__visual ko-vault-card__visual--empty" aria-hidden="true" />
            )}
            <div className="ko-vault-card__body">
              <p className="ko-vault-card__quiz">{item.quizTitle}</p>
              <p className="ko-vault-card__result">{item.resultTitle}</p>
              {item.resultLine ? <p className="ko-vault-card__line">{item.resultLine}</p> : null}
              <p className="ko-vault-card__meta">{formatSavedAtKo(item.savedAt)}</p>
              <div className="ko-vault-card__actions">
                <Link className="btn sm" href={item.quizHref}>
                  테스트 열기
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
