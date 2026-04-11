"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  type KakaoUser,
  clearKakaoUser,
  loadKakaoUser,
  saveKakaoUser,
} from "@/lib/kakaoAuth";
import { clearQuizVault } from "@/lib/quizSavedResults";

/** OAuth 콜백 직후 SDK 스크립트가 아직 없을 수 있어, 짧게 대기 */
function waitForKakaoInitialized(maxMs: number): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("SSR"));
  }
  if (window.Kakao?.isInitialized()) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const id = window.setInterval(() => {
      if (window.Kakao?.isInitialized()) {
        window.clearInterval(id);
        resolve();
      } else if (Date.now() - start >= maxMs) {
        window.clearInterval(id);
        reject(new Error("KAKAO_SDK_TIMEOUT"));
      }
    }, 50);
  });
}

type KakaoAuthState = {
  user: KakaoUser | null;
  loading: boolean;
  /** 카카오 SDK 초기화 완료 여부 */
  sdkReady: boolean;
  /** 첫 클라이언트 effect에서 localStorage(kakao_user) 반영 완료 — 미로그인 판별 전에 true가 되어야 함 */
  kakaoHydrated: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  /** 콜백 페이지에서 토큰으로 사용자 정보를 가져와 저장 */
  fetchAndSaveUser: (accessToken: string) => Promise<void>;
};

const KakaoAuthContext = createContext<KakaoAuthState>({
  user: null,
  loading: false,
  sdkReady: false,
  kakaoHydrated: false,
  error: null,
  login: () => {},
  logout: () => {},
  fetchAndSaveUser: async () => {},
});

export function useKakaoAuth() {
  return useContext(KakaoAuthContext);
}

export function KakaoAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<KakaoUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [kakaoHydrated, setKakaoHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUser(loadKakaoUser());
    setKakaoHydrated(true);

    const tryMarkReady = () => {
      if (window.Kakao?.isInitialized()) {
        setSdkReady(true);
        return true;
      }
      return false;
    };

    if (tryMarkReady()) return;

    const onReady = () => setSdkReady(true);
    window.addEventListener("kakao-sdk-ready", onReady);

    // 스크립트가 늦게 로드되거나 이벤트가 먼저 지나간 경우 대비
    const poll = window.setInterval(() => {
      if (tryMarkReady()) window.clearInterval(poll);
    }, 200);
    const stopPoll = window.setTimeout(() => window.clearInterval(poll), 15000);

    return () => {
      window.removeEventListener("kakao-sdk-ready", onReady);
      window.clearInterval(poll);
      window.clearTimeout(stopPoll);
    };
  }, []);

  const login = useCallback(() => {
    const Kakao = window.Kakao;
    if (!Kakao?.isInitialized()) {
      setError("카카오 SDK가 아직 로드되지 않았습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
    setError(null);
    const redirectUri = `${window.location.origin}/ko/app/login/callback/`;
    try {
      // PC 웹·카카오톡 미설치 환경에서 throughTalk: true 는 동작이 멈춘 것처럼 보일 수 있음
      Kakao.Auth.authorize({
        redirectUri,
        responseType: "token",
        throughTalk: false,
      });
    } catch (e) {
      console.warn("[Kakao] authorize failed", e);
      setError("카카오 로그인을 시작하지 못했습니다. 새로고침 후 다시 시도해 주세요.");
    }
  }, []);

  const fetchAndSaveUser = useCallback(async (accessToken: string) => {
    try {
      await waitForKakaoInitialized(12_000);
    } catch {
      setError("카카오 SDK를 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.");
      throw new Error("KAKAO_SDK_TIMEOUT");
    }

    const Kakao = window.Kakao;
    if (!Kakao?.isInitialized()) {
      setError("카카오 SDK를 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.");
      throw new Error("KAKAO_SDK_NOT_READY");
    }

    setLoading(true);
    Kakao.Auth.setAccessToken(accessToken, true);

    await new Promise<void>((resolve, reject) => {
      Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const profile = res.kakao_account?.profile;
          const kakaoUser: KakaoUser = {
            id: res.id,
            nickname: profile?.nickname ?? "카카오 사용자",
            profileImageUrl: profile?.profile_image_url ?? null,
            thumbnailImageUrl: profile?.thumbnail_image_url ?? null,
            email: res.kakao_account?.email ?? null,
          };
          saveKakaoUser(kakaoUser);
          setUser(kakaoUser);
          setLoading(false);
          resolve();
        },
        fail: () => {
          setError("사용자 정보를 가져오지 못했습니다.");
          setLoading(false);
          reject(new Error("KAKAO_USER_ME_FAILED"));
        },
      });
    });
  }, []);

  const logout = useCallback(() => {
    const Kakao = window.Kakao;
    clearKakaoUser();
    clearQuizVault();
    setUser(null);
    setError(null);
    if (Kakao?.isInitialized() && Kakao.Auth.getAccessToken()) {
      Kakao.Auth.logout();
    }
    router.replace("/ko/app/login/");
  }, [router]);

  return (
    <KakaoAuthContext.Provider
      value={{ user, loading, sdkReady, kakaoHydrated, error, login, logout, fetchAndSaveUser }}
    >
      {children}
    </KakaoAuthContext.Provider>
  );
}
