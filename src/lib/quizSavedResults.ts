/**
 * 퀴즈 결과 보관함 — 브라우저 localStorage (기기·브라우저별).
 * 로그인 연동 시 서버 동기화로 확장 가능하도록 스키마만 단순하게 유지.
 */

export const QUIZ_VAULT_STORAGE_KEY = "momopick:quiz-vault:v1";

export const QUIZ_VAULT_CHANGED_EVENT = "momopick-quiz-vault-changed";

export type SavedQuizVaultKind = "snack" | "percent";

export type SavedQuizVaultDraft = {
  locale: string;
  quizSlug: string;
  quizTitle: string;
  /** 테스트 다시 하기 / 열기용 경로 (예: `/ko/love/foo/`) */
  quizHref: string;
  kind: SavedQuizVaultKind;
  resultTitle: string;
  resultLine?: string;
  imageUrl?: string;
};

export type SavedQuizVaultItem = SavedQuizVaultDraft & {
  id: string;
  savedAt: number;
};

const MAX_ITEMS = 100;

function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function parseItem(raw: unknown): SavedQuizVaultItem | null {
  if (!isRecord(raw)) return null;
  const id = typeof raw.id === "string" ? raw.id : "";
  const savedAt = typeof raw.savedAt === "number" ? raw.savedAt : NaN;
  const locale = typeof raw.locale === "string" ? raw.locale : "";
  const quizSlug = typeof raw.quizSlug === "string" ? raw.quizSlug : "";
  const quizTitle = typeof raw.quizTitle === "string" ? raw.quizTitle : "";
  const quizHref = typeof raw.quizHref === "string" ? raw.quizHref : "";
  const kind = raw.kind === "snack" || raw.kind === "percent" ? raw.kind : null;
  const resultTitle = typeof raw.resultTitle === "string" ? raw.resultTitle : "";
  if (!id || !Number.isFinite(savedAt) || !locale || !quizSlug || !quizTitle || !quizHref || !kind || !resultTitle) {
    return null;
  }
  const resultLine = typeof raw.resultLine === "string" ? raw.resultLine : undefined;
  const imageUrl = typeof raw.imageUrl === "string" ? raw.imageUrl : undefined;
  return {
    id,
    savedAt,
    locale,
    quizSlug,
    quizTitle,
    quizHref,
    kind,
    resultTitle,
    resultLine,
    imageUrl,
  };
}

export function readSavedQuizVault(): SavedQuizVaultItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(QUIZ_VAULT_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(parseItem).filter((x): x is SavedQuizVaultItem => x !== null);
  } catch {
    return [];
  }
}

export function writeSavedQuizVault(items: SavedQuizVaultItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(QUIZ_VAULT_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(QUIZ_VAULT_CHANGED_EVENT));
  } catch {
    // quota exceeded 등 — 조용히 무시
  }
}

export function appendQuizVaultItem(draft: SavedQuizVaultDraft): SavedQuizVaultItem | null {
  if (typeof window === "undefined") return null;
  const item: SavedQuizVaultItem = {
    ...draft,
    id: newId(),
    savedAt: Date.now(),
  };
  const prev = readSavedQuizVault();
  const next = [item, ...prev].slice(0, MAX_ITEMS);
  writeSavedQuizVault(next);
  return item;
}

export function removeQuizVaultItem(id: string): void {
  const prev = readSavedQuizVault();
  writeSavedQuizVault(prev.filter((x) => x.id !== id));
}
