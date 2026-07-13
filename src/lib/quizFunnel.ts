"use client";

import { increaseQuizCount } from "@/lib/quizStatsSupabase";

/**
 * 퀴즈 퍼널 계측 — 기존 `quiz_stats` 테이블 재사용 (테이블 추가 불필요).
 *
 * 행 id 규칙:
 * - `{slug}`             — 시작(참여) 수. 인트로 참여 수 표시와 동일 행.
 * - `{slug}__complete`   — 완료(결과 도달) 수. 완료율 = complete ÷ start.
 * - `{slug}__share`      — 결과 공유 클릭 수. 공유율 = share ÷ complete.
 * - `{slug}__fb_fit/miss`— 결과 만족도 (QuizResultFeedback).
 *
 * 모든 이벤트는 페이지 로드당 1회만 전송(다시 하기·중복 클릭 시 재집계 방지),
 * 네트워크 실패는 무시한다(fire-and-forget).
 */

const sentThisLoad = new Set<string>();

/** 페이지 로드당 1회 마킹. 처음이면 true, 이미 보냈으면 false */
export function tryMarkFunnelSent(id: string): boolean {
  if (sentThisLoad.has(id)) return false;
  sentThisLoad.add(id);
  return true;
}

function send(id: string): void {
  if (!tryMarkFunnelSent(id)) return;
  void increaseQuizCount(id).catch(() => {});
}

/** 시작(참여) +1 — 인트로가 없는 원픽·퍼센트형에서 사용. 참여 수 표시 행과 동일. */
export function trackQuizStart(quizSlug: string): void {
  send(quizSlug);
}

/** 완료(결과 도달) +1 — 마지막 문항 응답 시. 공유 URL 복원은 제외. */
export function trackQuizComplete(quizSlug: string): void {
  send(`${quizSlug}__complete`);
}

/** 결과 공유 클릭 +1 — 채널 무관, 로드당 1회. */
export function trackQuizShare(quizSlug: string): void {
  send(`${quizSlug}__share`);
}
