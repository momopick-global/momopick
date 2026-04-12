"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BackButton } from "@/components/ko/BackButton";

const VIDEO_SRC = "/images/today/tarot.mp4";
/** MP4 첫 프레임과 동일(이질감 최소화), 로딩 중·비디오 페이드인 전까지 표시 */
const FIRST_FRAME_WEBP = "/images/today/tarot-first-frame.webp";

const FULL_TEXT = `타로를 통해 오늘의 운세를 가볍게 확인할 수 있는 콘텐츠를 준비 중입니다.

매일 달라지는 메시지와 함께, 하루를 돌아보거나 작은 힌트를 얻을 수 있는 공간으로
만들어갈 예정입니다.`;

const TYPE_INTERVAL_MS = 26;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

export function KoTodayVideoExperience() {
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("today-video-lock");
    return () => document.documentElement.classList.remove("today-video-lock");
  }, []);

  const onVideoReadyToShow = () => {
    setVideoReady(true);
    void videoRef.current?.play().catch(() => {});
  };

  useEffect(() => {
    if (reducedMotion) {
      setTyped(FULL_TEXT);
      setTypingDone(true);
      return;
    }

    let i = 0;
    timerRef.current = setInterval(() => {
      i += 1;
      setTyped(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        setTypingDone(true);
      }
    }, TYPE_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reducedMotion]);

  return (
    <div className="today-video-page-root">
      <h1 className="sr-only">오늘의 운세</h1>
      <p className="sr-only">{FULL_TEXT}</p>

      <img
        src={FIRST_FRAME_WEBP}
        alt=""
        className="today-video-first-frame"
        width={720}
        height={1280}
        decoding="async"
        fetchPriority="high"
        aria-hidden
      />

      <video
        ref={videoRef}
        className={`today-video-bg${videoReady ? " is-ready" : ""}`}
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={onVideoReadyToShow}
        onCanPlay={onVideoReadyToShow}
        aria-hidden="true"
      />

      <div className="today-video-scrim" aria-hidden="true" />

      {/* 동영상 하단 ↔ 배경색 경계를 부드럽게 잇는 페이드 */}
      <div className="today-video-bottom-blend" aria-hidden="true" />

      <div className="today-video-ui">
        <div className="today-video-back">
          <BackButton />
        </div>

        <div className="today-video-main">
          <p className="today-video-type" aria-hidden="true">
            {typed}
            {!typingDone ? (
              <span className="today-video-cursor" aria-hidden="true">
                |
              </span>
            ) : null}
          </p>
        </div>

        <div className={`today-video-cta${typingDone ? " is-visible" : ""}`}>
          <Link className="btn primary" href="/ko/explore/">
            테스트 찾아보기
          </Link>
          <Link className="btn" href="/ko/">
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
