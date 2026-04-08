"use client";

import Script from "next/script";
import { useCallback } from "react";

/**
 * 카카오 디벨로퍼스 → 앱 키 → **JavaScript 키**만 사용 (REST API 키·네이티브 앱 키 아님).
 * `Kakao.init(키)`에 그대로 전달됩니다.
 */
const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY ?? "";

/**
 * 카카오 JavaScript SDK를 한 번만 로드하고 `Kakao.init(JavaScript 키)` 1회 실행.
 * 키가 없으면 스크립트를 넣지 않음(배포 환경변수 `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` 설정).
 */
export function KakaoSdkInit() {
  const onScriptLoad = useCallback(() => {
    if (!KAKAO_JS_KEY || typeof window === "undefined") return;
    const Kakao = window.Kakao;
    if (!Kakao) return;
    try {
      if (!Kakao.isInitialized()) {
        Kakao.init(KAKAO_JS_KEY.trim());
      }
      window.dispatchEvent(new CustomEvent("kakao-sdk-ready"));
    } catch (e) {
      console.warn("[Kakao] init failed", e);
    }
  }, []);

  if (!KAKAO_JS_KEY.trim()) {
    return null;
  }

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
      strategy="afterInteractive"
      onLoad={onScriptLoad}
    />
  );
}
