/** 카카오 JavaScript SDK v2 (브라우저 전역) — `KakaoSdkInit` 로드 후 사용 */
export {};

type KakaoFeedShare = {
  objectType: "feed";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
};

declare global {
  interface Window {
    Kakao?: {
      init: (javascriptKey: string) => void;
      isInitialized: () => boolean;
      /** 카카오톡 공유 (카카오스토리 `Kakao.Story` 아님) */
      Share: {
        sendDefault: (settings: KakaoFeedShare) => void;
      };
    };
  }
}
