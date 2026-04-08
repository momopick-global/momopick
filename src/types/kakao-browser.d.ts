/** 카카오 JavaScript SDK v2 (브라우저 전역) — `KakaoSdkInit` 로드 후 사용 */
export {};

declare global {
  interface Window {
    Kakao?: {
      init: (javascriptKey: string) => void;
      isInitialized: () => boolean;
      Link: {
        sendDefault: (settings: {
          objectType: "text";
          text: string;
          link: { mobileWebUrl: string; webUrl: string };
        }) => void;
      };
    };
  }
}
