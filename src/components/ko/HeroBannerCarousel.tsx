"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KoHeroBannerSlide } from "@/content/home/koHeroBanners";
import { QuizImageWithFallback } from "@/components/quiz/QuizImageWithFallback";

const INTERVAL_MS = 6000;
/** 가로 이동이 이 값(px) 이상이면 스와이프로 인식 */
const SWIPE_THRESHOLD = 48;
/** 세로 이동이 가로보다 훨씬 크면 페이지 스크롤로 보고 스와이프 무시 */
const VERTICAL_DOMINANCE = 1.25;

type Props = {
  slides: KoHeroBannerSlide[];
};

type PointerStart = { x: number; y: number; active: boolean };

export function HeroBannerCarousel({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pointerRef = useRef<PointerStart>({ x: 0, y: 0, active: false });
  /** 스와이프 직후 링크로 전달되는 고스트 클릭 방지 */
  const blockLinkClickRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    if (reducedMotion || slides.length < 2) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
  }, [clearTimer, reducedMotion, slides.length]);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  const goTo = useCallback(
    (i: number) => {
      setIndex(i);
      startTimer();
    },
    [startTimer],
  );

  const nextSlide = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (slides.length < 2) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const el = e.target as HTMLElement;
      if (el.closest(".hero-banner-dot")) {
        pointerRef.current.active = false;
        return;
      }
      /* 링크·버튼만 누를 때는 스와이프로 잡지 않음 */
      if (el.closest("a")) {
        pointerRef.current.active = false;
        return;
      }

      clearTimer();
      pointerRef.current = { x: e.clientX, y: e.clientY, active: true };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [clearTimer, slides.length],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const start = pointerRef.current;

      if (!start.active) {
        startTimer();
        return;
      }

      start.active = false;

      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }

      if (slides.length < 2) {
        startTimer();
        return;
      }

      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;

      if (Math.abs(dy) > Math.abs(dx) * VERTICAL_DOMINANCE && Math.abs(dy) > 32) {
        startTimer();
        return;
      }

      if (dx <= -SWIPE_THRESHOLD) {
        blockLinkClickRef.current = true;
        nextSlide();
      } else if (dx >= SWIPE_THRESHOLD) {
        blockLinkClickRef.current = true;
        prevSlide();
      }

      startTimer();
    },
    [nextSlide, prevSlide, slides.length, startTimer],
  );

  const onPointerCancel = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      pointerRef.current.active = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      startTimer();
    },
    [startTimer],
  );

  const onCarouselMouseLeave = useCallback(() => {
    if (!pointerRef.current.active) {
      startTimer();
    }
  }, [startTimer]);

  const onMoreClick = useCallback((ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (blockLinkClickRef.current) {
      ev.preventDefault();
      blockLinkClickRef.current = false;
    }
  }, []);

  if (slides.length === 0) return null;

  return (
    <div
      className="hero-banner-wrap hero-banner-carousel"
      onMouseEnter={clearTimer}
      onMouseLeave={onCarouselMouseLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            id={`hero-slide-${slide.id}`}
            key={slide.id}
            className={`hero-banner-slide${active ? " is-active" : ""}`}
            aria-hidden={!active}
            role="group"
            aria-roledescription="슬라이드"
            aria-label={`${i + 1} / ${slides.length}`}
          >
            <QuizImageWithFallback
              className="hero-banner"
              src={slide.image}
              alt={slide.alt}
              width={960}
              height={1200}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <div className="hero-banner-overlay" role="region" aria-label={slide.kicker}>
              <p className="hero-banner-overlay__kicker">{slide.kicker}</p>
              <p className="hero-banner-overlay__text hero-banner-overlay__text--multiline">
                {slide.body}
              </p>
              <div className="hero-banner-overlay__cta">
                <Link
                  className="hero-banner-overlay__btn"
                  href={slide.moreHref}
                  onClick={onMoreClick}
                >
                  자세히 보기
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {slides.length > 1 ? (
        <div className="hero-banner-dots" role="tablist" aria-label="배너 선택">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls={`hero-slide-${slide.id}`}
              className={`hero-banner-dot${i === index ? " is-active" : ""}`}
              onClick={() => goTo(i)}
            >
              <span className="sr-only">
                {i + 1}번째 배너: {slide.kicker}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
