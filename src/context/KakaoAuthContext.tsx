"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  type KakaoUser,
  clearKakaoUser,
  loadKakaoUser,
  saveKakaoUser,
} from "@/lib/kakaoAuth";

type KakaoAuthState = {
  user: KakaoUser | null;
  loading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  /** 콜백 페이지에서 토큰으로 사용자 정보를 가져와 저장 */
  fetchAndSaveUser: (accessToken: string) => Promise<void>;
};

const KakaoAuthContext = createContext<KakaoAuthState>({
  user: null,
  loading: false,
  error: null,
  login: () => {},
  logout: () => {},
  fetchAndSaveUser: async () => {},
});

export function useKakaoAuth() {
  return useContext(KakaoAuthContext);
}

export function KakaoAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<KakaoUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUser(loadKakaoUser());
  }, []);

  const login = useCallback(() => {
    const Kakao = window.Kakao;
    if (!Kakao?.isInitialized()) {
      setError("카카오 SDK가 아직 로드되지 않았습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
    setError(null);
    const redirectUri = `${window.location.origin}/ko/app/login/callback/`;
    Kakao.Auth.authorize({
      redirectUri,
      responseType: "token",
      throughTalk: true,
    });
  }, []);

  const fetchAndSaveUser = useCallback(async (accessToken: string) => {
    const Kakao = window.Kakao;
    if (!Kakao?.isInitialized()) return;

    setLoading(true);
    Kakao.Auth.setAccessToken(accessToken, true);

    await new Promise<void>((resolve) => {
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
          resolve();
        },
      });
    });
  }, []);

  const logout = useCallback(() => {
    const Kakao = window.Kakao;
    clearKakaoUser();
    setUser(null);
    setError(null);
    if (Kakao?.isInitialized() && Kakao.Auth.getAccessToken()) {
      Kakao.Auth.logout();
    }
  }, []);

  return (
    <KakaoAuthContext.Provider value={{ user, loading, error, login, logout, fetchAndSaveUser }}>
      {children}
    </KakaoAuthContext.Provider>
  );
}
