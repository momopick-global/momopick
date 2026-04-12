"use client";

import { useCallback, useEffect, useState } from "react";
import { increaseQuizCount, initQuizCount } from "@/lib/quizStatsSupabase";

/**
 * 퀴즈 인트로: 마운트 시 1회 fetch, 시작 버튼에서 increase 1회.
 */
export function useQuizParticipantCount(quizId: string) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    void initQuizCount(quizId, (n) => {
      if (!cancelled) setCount(n);
    });
    return () => {
      cancelled = true;
    };
  }, [quizId]);

  const registerStart = useCallback(async () => {
    try {
      const next = await increaseQuizCount(quizId);
      setCount(next);
    } catch (e) {
      console.error("[quiz_stats] registerStart", e);
    }
  }, [quizId]);

  return { count, registerStart };
}
