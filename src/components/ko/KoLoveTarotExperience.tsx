"use client";

import { useCallback, useRef, useState } from "react";
import { BackButton } from "@/components/ko/BackButton";
import {
  TAROT_CARDS,
  TAROT_POSITIONS,
  type TarotCard,
} from "@/content/today/tarotCards";

const CARD_BACK = "/images/today/tarot/card-back.webp";
const VIDEO_SRC = "/images/today/tarot.mp4";
const VIDEO_POSTER = "/images/today/tarot-first-frame.webp";

/** 폭죽 파티클 방향(도) */
const BURST_DEGS = [0, 45, 90, 135, 180, 225, 270, 315];

type Phase = "intro" | "drawn";

/** 덱에서 서로 다른 카드 3장을 무작위로 뽑는다. */
function drawThree(): TarotCard[] {
  const pool = [...TAROT_CARDS];
  const picked: TarotCard[] = [];
  for (let i = 0; i < 3 && pool.length > 0; i += 1) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return picked;
}

export function KoLoveTarotExperience() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false]);
  /** 상단에 결과를 보여줄 카드(가장 최근에 누른 카드) */
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startDraw = useCallback(() => {
    setCards(drawThree());
    setRevealed([false, false, false]);
    setActiveIndex(null);
    setPhase("drawn");
    // 카드를 뽑으면 배경 영상은 그 자리에서 정지
    videoRef.current?.pause();
  }, []);

  const reveal = useCallback((index: number) => {
    setRevealed((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
    setActiveIndex(index);
  }, []);

  const allRevealed = revealed.every(Boolean);
  const activeCard = activeIndex !== null ? cards[activeIndex] : null;
  const activePos = activeIndex !== null ? TAROT_POSITIONS[activeIndex] : null;

  return (
    <div className="love-tarot-root has-video-bg">
      <div className="love-tarot-bg" aria-hidden="true">
        <video
          ref={videoRef}
          className="love-tarot-bg__video"
          src={VIDEO_SRC}
          poster={VIDEO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="love-tarot-bg__scrim" />
      </div>

      <header className="love-tarot-top">
        <BackButton />
        <h1 className="sr-only">연애운세</h1>
        <span className="love-tarot-top__spacer" aria-hidden="true" />
      </header>

      {phase === "intro" ? (
        <section className="love-tarot-intro">
          <p className="love-tarot-intro__desc">
            마음을 가라앉히고, 지금 떠오르는
            <br />
            그 사람을 생각하며 카드를 뽑아보세요.
          </p>

          <ul className="love-tarot-positions" aria-hidden="true">
            {TAROT_POSITIONS.map((p) => (
              <li key={p.key} className="love-tarot-positions__item">
                <span className="love-tarot-positions__emoji">{p.emoji}</span>
                <span className="love-tarot-positions__label">{p.label}</span>
                <span className="love-tarot-positions__hint">{p.hint}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="btn primary love-tarot-draw-btn"
            onClick={startDraw}
          >
            카드 3장 뽑기
          </button>
        </section>
      ) : (
        <section className="love-tarot-result">
          <div className="love-tarot-readout" aria-live="polite">
            {activeCard && activePos ? (
              <div className="love-tarot-readout__body" key={activeIndex}>
                <p className="love-tarot-readout__position">
                  <span className="love-tarot-readout__position-emoji">
                    {activePos.emoji}
                  </span>
                  {activePos.label}
                </p>
                <p className="love-tarot-readout__name">
                  <span className="love-tarot-readout__name-emoji">
                    {activeCard.emoji}
                  </span>
                  {activeCard.name}
                  <span className="love-tarot-readout__name-en">
                    {activeCard.nameEn}
                  </span>
                </p>
                <p className="love-tarot-readout__reading">
                  {activeCard.reading[activePos.key]}
                </p>
              </div>
            ) : (
              <p className="love-tarot-readout__hint">
                카드를 한 장씩 눌러 결과를 확인하세요.
              </p>
            )}
          </div>

          <div className="love-tarot-cards">
            {cards.map((card, i) => {
              const pos = TAROT_POSITIONS[i];
              // 상단 결과에 보이는(활성) 카드만 앞면, 나머지는 뒷면
              const isActive = activeIndex === i;
              return (
                <article
                  key={pos.key}
                  className={`love-tarot-card${isActive ? " is-open is-active" : ""}`}
                >
                  <p className="love-tarot-card__position">
                    <span className="love-tarot-card__position-emoji">
                      {pos.emoji}
                    </span>
                    {pos.label}
                  </p>

                  <button
                    type="button"
                    className="love-tarot-card__flip"
                    onClick={() => reveal(i)}
                    aria-pressed={isActive}
                    aria-label={
                      isActive
                        ? `${pos.label}: ${card.name}`
                        : `${pos.label} 카드 뒤집기`
                    }
                  >
                    { }
                    <img
                      src={isActive ? card.image : CARD_BACK}
                      alt={isActive ? card.name : ""}
                      className="love-tarot-card__img"
                      width={600}
                      height={1000}
                      decoding="async"
                    />
                    {!isActive ? (
                      <span className="love-tarot-card__tap">탭하여 뒤집기</span>
                    ) : (
                      <span className="love-tarot-burst" aria-hidden="true">
                        {BURST_DEGS.map((d) => (
                          <i
                            key={d}
                            style={
                              { "--deg": `${d}deg` } as React.CSSProperties
                            }
                          />
                        ))}
                      </span>
                    )}
                  </button>
                </article>
              );
            })}
          </div>

          {/* 버튼 공간을 항상 예약해 마지막 카드 오픈 시 레이아웃이 위로 튀지 않게 함 */}
          <div className={`love-tarot-cta${allRevealed ? " is-visible" : ""}`}>
            <button type="button" className="btn primary" onClick={startDraw}>
              다시 뽑기
            </button>
          </div>
        </section>
      )}

      <p className="love-tarot-disclaimer">
        타로 결과는 재미로 즐기는 콘텐츠예요.
        <br />
        오늘 하루의 작은 힌트로만 참고해 주세요.
      </p>
    </div>
  );
}
