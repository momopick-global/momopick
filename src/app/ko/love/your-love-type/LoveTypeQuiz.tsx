"use client";

import { useCallback, useMemo, useState } from "react";

type ResultKey = "spark" | "care" | "think" | "free";

const RESULTS: Record<
  ResultKey,
  { title: string; tagline: string; body: string; emoji: string }
> = {
  spark: {
    emoji: "🔥",
    title: "직진 로맨티스트",
    tagline: "마음이 가면 몸이 먼저 반응하는 타입",
    body:
      "좋아하면 표현하고, 분위기를 끌어가는 편이에요. 썸도 길게 끌기보다는 솔직하게 방향을 잡는 걸 선호할 수 있어요. 상대에게는 ‘함께 있을 때의 에너지’가 큰 매력 포인트예요.",
  },
  care: {
    emoji: "💗",
    title: "케어·배려형",
    tagline: "상대 감정과 리듬을 먼저 살피는 타입",
    body:
      "말 한마디, 톤 하나까지 신경 쓰며 관계의 온도를 맞추려 해요. 갈등이 생기면 감정 정리 후 대화하는 쪽에 가깝고, ‘믿을 수 있는 사람’이 되고 싶어 하는 경향이 있어요.",
  },
  think: {
    emoji: "🧭",
    title: "신중 분석형",
    tagline: "의미와 방향을 확인한 뒤 깊어지는 타입",
    body:
      "호감이 있어도 한 번 더 생각하고, 관계의 그림을 그려본 뒤 움직이는 편이에요. 가벼운 만남도 좋지만, 장기적으로 맞는지 보는 눈이 있어요.",
  },
  free: {
    emoji: "🌿",
    title: "자유·여유형",
    tagline: "나만의 속도로 사랑을 즐기는 타입",
    body:
      "붙어 있어도 좋고, 각자 시간을 가져도 괜찮다고 느껴요. 연애를 ‘의무’보다 ‘같이 즐기는 여정’에 가깝게 두려는 성향이 있을 수 있어요.",
  },
};

const QUESTIONS: {
  prompt: string;
  options: { label: string; key: ResultKey }[];
}[] = [
  {
    prompt: "썸 단계에서 나에게 더 가까운 쪽은?",
    options: [
      { label: "좋으면 먼저 연락하고 분위기를 만든다", key: "spark" },
      { label: "상대 템포에 맞추며 배려한다", key: "care" },
      { label: "감정과 상황을 정리한 뒤 움직인다", key: "think" },
      { label: "급하게 정하지 않고 여유 있게 본다", key: "free" },
    ],
  },
  {
    prompt: "연인과 의견이 크게 엇갈릴 때 나는?",
    options: [
      { label: "지금 자리에서 풀고 넘어가고 싶다", key: "spark" },
      { label: "상대 기분을 먼저 살핀다", key: "care" },
      { label: "원인을 짚고 차분히 이야기한다", key: "think" },
      { label: "잠시 거리 두고 각자 정리할 시간을 갖는다", key: "free" },
    ],
  },
  {
    prompt: "데이트 계획을 세울 때 나는?",
    options: [
      { label: "새로운 곳·이벤트로 설렘을 만든다", key: "spark" },
      { label: "상대가 편한 코스를 우선한다", key: "care" },
      { label: "일정·동선까지 미리 짜 두는 편이다", key: "think" },
      { label: "그날 기분에 맡기거나 즉흥으로 즐긴다", key: "free" },
    ],
  },
  {
    prompt: "연애에서 가장 큰 에너지를 주는 순간은?",
    options: [
      { label: "둘만의 몰입감 넘치는 대화나 스킨십", key: "spark" },
      { label: "서로를 챙기고 인정받을 때", key: "care" },
      { label: "미래·가치관이 맞는다고 느낄 때", key: "think" },
      { label: "각자 일상을 살다 만날 때의 설렘", key: "free" },
    ],
  },
  {
    prompt: "관계가 조금 지칠 때 나는?",
    options: [
      { label: "데이트나 변화로 다시 불을 지핀다", key: "spark" },
      { label: "대화로 마음을 확인하고 회복한다", key: "care" },
      { label: "문제가 있다면 정리하고 방향을 잡는다", key: "think" },
      { label: "혼자만의 시간으로 리셋한다", key: "free" },
    ],
  },
];

const KEYS: ResultKey[] = ["spark", "care", "think", "free"];

export function LoveTypeQuiz() {
  const [step, setStep] = useState(0);
  const [counts, setCounts] = useState<Record<ResultKey, number>>({
    spark: 0,
    care: 0,
    think: 0,
    free: 0,
  });
  const [done, setDone] = useState(false);

  const total = QUESTIONS.length;
  const progress = useMemo(
    () => (done ? 100 : Math.round((step / total) * 100)),
    [done, step, total],
  );

  const pick = useCallback(
    (key: ResultKey) => {
      const nextCounts = { ...counts, [key]: counts[key] + 1 };
      if (step >= total - 1) {
        setCounts(nextCounts);
        setDone(true);
        return;
      }
      setCounts(nextCounts);
      setStep((s) => s + 1);
    },
    [counts, step, total],
  );

  const restart = useCallback(() => {
    setStep(0);
    setCounts({ spark: 0, care: 0, think: 0, free: 0 });
    setDone(false);
  }, []);

  if (done) {
    const maxScore = Math.max(...KEYS.map((k) => counts[k]));
    const leaders = KEYS.filter((k) => counts[k] === maxScore);
    const isBlend = leaders.length > 1;
    const single = !isBlend ? RESULTS[leaders[0] as ResultKey] : null;
    return (
      <div className="quiz-shell">
        <div className="quiz-result-card">
          <p className="quiz-result-emoji" aria-hidden="true">
            {isBlend ? "✨" : single?.emoji}
          </p>
          <h2 className="quiz-result-title">
            {isBlend ? "복합 연애형" : single?.title}
          </h2>
          <p className="quiz-result-tagline">
            {isBlend
              ? "여러 성향이 고르게 섞여 있어요. 상황에 따라 다른 면이 드러날 수 있어요."
              : single?.tagline}
          </p>
          <p className="quiz-result-body">
            {isBlend
              ? "직진·배려·신중·여유 중 두 가지 이상이 비슷하게 나왔어요. ‘항상 한 가지 유형’보다 관계와 시기에 따라 달라지는 게 자연스러워요."
              : single?.body}
          </p>
          <div className="quiz-result-actions">
            <button type="button" className="btn primary sm" onClick={restart}>
              다시 하기
            </button>
          </div>
          <p className="quiz-footnote">
            이 결과는 재미·자기이해용 스낵 테스트이며, 심리 진단이 아닙니다.
          </p>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];
  return (
    <div className="quiz-shell">
      <div className="quiz-progress-wrap" aria-hidden="true">
        <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="quiz-step-label">
        질문 {step + 1} / {total}
      </p>
      <h2 className="quiz-q">{q.prompt}</h2>
      <ul className="quiz-options" role="list">
        {q.options.map((o) => (
          <li key={o.label}>
            <button type="button" className="quiz-opt" onClick={() => pick(o.key)}>
              {o.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
