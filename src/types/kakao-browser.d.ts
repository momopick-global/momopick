/** 카카오 JavaScript SDK v2 (브라우저 전역) — `KakaoSdkInit` 로드 후 사용 */
export {};

type KakaoFeedLink = { mobileWebUrl: string; webUrl: string };

type KakaoFeedShare = {
  objectType: "feed";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: KakaoFeedLink;
  };
  buttons?: { title: string; link: KakaoFeedLink }[];
};

type KakaoAuthToken = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
};

type KakaoUserProfile = {
  nickname?: string;
  profile_image_url?: string;
  thumbnail_image_url?: string;
  is_default_image?: boolean;
};

type KakaoUserMe = {
  id: number;
  kakao_account?: {
    profile?: KakaoUserProfile;
    profile_needs_agreement?: boolean;
    email?: string;
    email_needs_agreement?: boolean;
    is_email_valid?: boolean;
    is_email_verified?: boolean;
  };
};

declare global {
  interface Window {
    Kakao?: {
      init: (javascriptKey: string) => void;
      isInitialized: () => boolean;

      /** 카카오톡 공유 */
      Share: {
        sendDefault: (settings: KakaoFeedShare) => Promise<void> | void;
      };

      /** 카카오 로그인 */
      Auth: {
        /** OAuth 2.0 redirect 방식 (SDK v2.2+) */
        authorize: (settings: {
          redirectUri: string;
          /** 'code'(기본) | 'token'(implicit) */
          responseType?: "code" | "token";
          scope?: string;
          state?: string;
          throughTalk?: boolean;
        }) => void;
        logout: (callback?: () => void) => void;
        getAccessToken: () => string | null;
        setAccessToken: (token: string, persist?: boolean) => void;
      };

      /** 카카오 API 호출 */
      API: {
        request: (settings: {
          url: string;
          success: (res: KakaoUserMe) => void;
          fail: (err: unknown) => void;
        }) => void;
      };
    };
  }
}
