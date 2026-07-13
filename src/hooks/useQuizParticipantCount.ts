"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { increaseQuizCount, initQuizCount } from "@/lib/quizStatsSupabase";
import { tryMarkFunnelSent } from "@/lib/quizFunnel";

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
    // 페이지 로드당 1회만 집계 — 다시 하기 후 재시작 시 중복 +1 방지 (완료율 정합성)
    if (!tryMarkFunnelSent(quizId)) return;
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
