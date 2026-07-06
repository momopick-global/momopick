"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { BackButton } from "@/components/ko/BackButton";
import {
  TAROT_CARDS,
  TAROT_POSITIONS,
  type TarotCard,
} from "@/content/today/tarotCards";

const CARD_BACK = "/images/today/tarot/card-back.webp";
const VIDEO_SRC = "/images/today/tarot.mp4";
const VIDEO_POSTER = "/images/today/tarot-first-frame.webp";

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

  const startDraw = useCallback(() => {
    setCards(drawThree());
    setRevealed([false, false, false]);
    setPhase("drawn");
  }, []);

  const reveal = useCallback((index: number) => {
    setRevealed((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  const revealAll = useCallback(() => {
    setRevealed([true, true, true]);
  }, []);

  const reset = useCallback(() => {
    setPhase("intro");
    setCards([]);
    setRevealed([false, false, false]);
  }, []);

  const allRevealed = revealed.every(Boolean);

  return (
    <div
      className={`love-tarot-root has-video-bg${allRevealed ? " is-revealed" : ""}`}
    >
      <div className="love-tarot-bg" aria-hidden="true">
        <video
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
            마음을 가라앉히고, 지금 떠오르는 그 사람을 생각하며
            <br />
            카드를 뽑아보세요.
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
          <div className="love-tarot-cards">
            {cards.map((card, i) => {
              const pos = TAROT_POSITIONS[i];
              const isOpen = revealed[i];
              return (
                <article
                  key={pos.key}
                  className={`love-tarot-card${isOpen ? " is-open" : ""}`}
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
                    aria-pressed={isOpen}
                    aria-label={
                      isOpen
                        ? `${pos.label}: ${card.name}`
                        : `${pos.label} 카드 뒤집기`
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={isOpen ? card.image : CARD_BACK}
                      alt={isOpen ? card.name : ""}
                      className="love-tarot-card__img"
                      width={600}
                      height={1000}
                      decoding="async"
                    />
                    {!isOpen ? (
                      <span className="love-tarot-card__tap">탭하여 뒤집기</span>
                    ) : null}
                  </button>

                  {isOpen ? (
                    <div className="love-tarot-card__body">
                      <p className="love-tarot-card__name">
                        {card.name}
                        <span className="love-tarot-card__name-en">
                          {card.nameEn}
                        </span>
                      </p>
                      <p className="love-tarot-card__reading">
                        {card.reading[pos.key]}
                      </p>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>

          {!allRevealed ? (
            <button
              type="button"
              className="btn love-tarot-revealall-btn"
              onClick={revealAll}
            >
              카드 모두 열기
            </button>
          ) : (
            <div className="love-tarot-cta">
              <button
                type="button"
                className="btn primary"
                onClick={startDraw}
              >
                다시 뽑기
              </button>
              <Link className="btn" href="/ko/explore/">
                테스트 찾아보기
              </Link>
              <button
                type="button"
                className="love-tarot-reset"
                onClick={reset}
              >
                처음으로
              </button>
            </div>
          )}
        </section>
      )}

      <p className="love-tarot-disclaimer">
        타로 결과는 재미로 즐기는 콘텐츠예요. 오늘 하루의 작은 힌트로만 참고해 주세요.
      </p>
    </div>
  );
}
