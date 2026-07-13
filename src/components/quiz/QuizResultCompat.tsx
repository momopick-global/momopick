"use client";

import type { QuizUiLocale, QuizUiStrings } from "@/i18n/quiz-ui";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import { QuizImageWithFallback } from "./QuizImageWithFallback";
import { pickQuizText, type SnackQuizDefinition } from "./types";

/**
 * 유형 궁합(2차 결과층) — 결과 JSON의 `results[key].compat`가 있을 때만 렌더.
 * "나와 잘 맞는 유형 / 부딪히기 쉬운 유형"을 같은 퀴즈의 다른 결과로 보여줘
 * 결과 화면에서 한 번 더 눌러보게 만드는 확장 CTA 역할을 한다.
 */
export function QuizResultCompat({
  definition,
  resultKey,
  locale,
  ui,
}: {
  definition: SnackQuizDefinition;
  /** 단일 결과일 때의 결과 key (blend·동점이면 렌더하지 않음) */
  resultKey: string | null;
  locale: QuizUiLocale;
  ui: QuizUiStrings;
}) {
  if (!resultKey) return null;
  const compat = definition.results[resultKey]?.compat;
  if (!compat) return null;

  const entries = (
    [
      { kind: "best" as const, key: compat.best, label: ui.compatBest },
      { kind: "worst" as const, key: compat.worst, label: ui.compatWorst },
    ]
  ).filter(
    (e): e is { kind: "best" | "worst"; key: string; label: string } =>
      typeof e.key === "string" && e.key !== resultKey && e.key in definition.results,
  );
  if (entries.length === 0) return null;

  return (
    <section className="quiz-result-compat" aria-label={ui.compatHeading}>
      <h3 className="quiz-result-compat__heading">{ui.compatHeading}</h3>
      <div className="quiz-result-compat__grid">
        {entries.map(({ kind, key, label }) => {
          const row = definition.results[key];
          const thumb = row.image ? quizAssetUrl(row.image, locale) : null;
          return (
            <div
              key={kind}
              className={`quiz-result-compat__card quiz-result-compat__card--${kind}`}
            >
              <span className="quiz-result-compat__label">
                {kind === "best" ? "💖" : "⚡"} {label}
              </span>
              {thumb ? (
                <span className="quiz-result-compat__thumb" aria-hidden="true">
                  <QuizImageWithFallback
                    src={thumb}
                    alt=""
                    width={160}
                    height={160}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              ) : (
                <span className="quiz-result-compat__emoji" aria-hidden="true">
                  {row.emoji}
                </span>
              )}
              <span className="quiz-result-compat__title">
                {pickQuizText(locale, row.title)}
              </span>
              <span className="quiz-result-compat__tagline">
                {pickQuizText(locale, row.tagline)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
