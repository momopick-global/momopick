export type KakaoUser = {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
  thumbnailImageUrl: string | null;
  email: string | null;
};

const STORAGE_KEY = "momopick_kakao_user";

export function loadKakaoUser(): KakaoUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as KakaoUser) : null;
  } catch {
    return null;
  }
}

export function saveKakaoUser(user: KakaoUser): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {}
}

export function clearKakaoUser(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
