/**
 * 스낵 퀴즈(다지선다 득표 → 최다 득표 결과) JSON 스키마 — CRM/API와 동일 구조로 주고받기 쉽게 유지.
 *
 * 다국어: 문항·결과 문구는 **로케일별 JSON** 한 벌씩 둡니다 (예: content/quiz/ko/foo.json, en/foo.json).
 * 동일 테스트는 `id`를 맞추고, `resultKeys`·옵션 `key`는 모든 언어에서 동일하게 두는 것을 권장(통계·A/B·CRM 연동).
 */
export type SnackQuizResult = {
  emoji: string;
  title: string;
  tagline: string;
  body: string;
};

export type SnackQuizQuestion = {
  prompt: string;
  options: { label: string; key: string }[];
};

export type SnackQuizBlend = {
  emoji: string;
  title: string;
  tagline: string;
  body: string;
};

export type SnackQuizDefinition = {
  /** 식별용 (로깅·CRM 연동). 번역본마다 동일 id 권장 */
  id: string;
  /** 이 JSON이 어떤 언어용인지 (CRM 동기화·검증용, 선택) */
  locale?: string;
  /** 득표 집계에 쓰는 키 목록 — 순서는 동점 시 표시 순서에만 사용 */
  resultKeys: string[];
  results: Record<string, SnackQuizResult>;
  /** 최고 득표가 2개 이상일 때 */
  blend: SnackQuizBlend;
  questions: SnackQuizQuestion[];
  /** 결과 화면 하단 고지 */
  footnote: string;
};
