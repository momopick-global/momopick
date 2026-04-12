"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { increaseQuizCount, initQuizCount } from "@/lib/quizStatsSupabase";

/**
 * 퀴즈 인트로: 마운트 시 1회 fetch, 시작 버튼에서 increase 1회.
 */
export function useQuizParticipantCount(quizId: string) {
  const [count, setCount] = useState<number | null>(null);
  const isCountingRef = useRef(false);
  const registerStartSeqRef = useRef(0);

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
    if (isCountingRef.current) {
      console.warn("[quiz_stats] registerStart skipped (isCounting)");
      return;
    }
    isCountingRef.current = true;
    registerStartSeqRef.current += 1;
    const rsNo = registerStartSeqRef.current;
    console.info(`[quiz_stats] registerStart() #${rsNo} quizId=${quizId}`);
    try {
      const next = await increaseQuizCount(quizId);
      setCount(next);
    } catch (e) {
      console.error("[quiz_stats] registerStart", e);
    } finally {
      isCountingRef.current = false;
    }
  }, [quizId]);

  return { count, registerStart };
}
