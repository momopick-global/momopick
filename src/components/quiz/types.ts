/**
 * 스낵 퀴즈(다지선다 득표 → 최다 득표 결과) JSON 스키마 — CRM/API와 동일 구조로 주고받기 쉽게 유지.
 *
 * 다국어: 문항·결과 문구는 로케일별 JSON 한 벌이거나, 동일 JSON 안에 `{ ko, en }` 인라인 필드로 둘 수 있다.
 * 동일 테스트는 `id`(보통 `slug`와 동일)를 맞추고, `resultKeys`·옵션 `key`는 모든 언어에서 동일하게 두는 것을 권장(통계·A/B·CRM 연동).
 */

/** JSON 내 사용자 문구 (언어별 키) */
export type SnackQuizText = {
  ko: string;
  en: string;
};

/** 현재 UI 로케일에 맞는 문자열 선택. 대상 언어가 비어 있으면 `ko`로 폴백 */
export function pickQuizText(locale: string, text: SnackQuizText | undefined): string {
  if (!text) return "";
  const v = text[locale as keyof SnackQuizText];
  if (typeof v === "string" && v.trim() !== "") return v;
  return text.ko;
}

/** SNS·OG 등에 쓸 결과별 공유 문구 (선택) */
export type SnackQuizResultShare = {
  title: SnackQuizText;
  description: SnackQuizText;
  image?: string;
};

export type SnackQuizResult = {
  emoji: string;
  /** 로그·통계·추천용 결과 키 (선택, 보통 `resultKeys` 항목과 동일) */
  scoreKey?: string;
  title: SnackQuizText;
  tagline: SnackQuizText;
  body: SnackQuizText;
  /** 결과 화면 상단 이미지 (JSON 경로는 로케일 세그먼트 없이 `/images/quiz/{slug}/…`) */
  image?: string;
  share?: SnackQuizResultShare;
};

export type SnackQuizQuestion = {
  prompt: SnackQuizText;
  /** 문항 상단 일러스트 (선택) */
  image?: string;
  options: { label: SnackQuizText; key: string }[];
};

export type SnackQuizBlend = {
  emoji: string;
  /** 복합형 로그용 키 (선택) */
  scoreKey?: string;
  title: SnackQuizText;
  tagline: SnackQuizText;
  body: SnackQuizText;
  /** 동점(복합형)일 때 표시할 이미지 (선택) */
  image?: string;
  share?: SnackQuizResultShare;
};

/** 퀴즈 카드·SEO용 (선택, 퀴즈당 1 JSON에 함께 둘 수 있음) */
export type SnackQuizPackMeta = {
  description?: SnackQuizText;
  keywords?: SnackQuizText[];
  ogTitle?: SnackQuizText;
  ogDescription?: SnackQuizText;
};

/** 경로는 `/images/quiz/{slug}/…파일` 로만 적고, 실제 에셋은 `public/…/{slug}/{locale}/` 에 둠 (`quizAssetUrl`). */
export type SnackQuizPackImages = {
  thumbnail?: string;
  og?: string;
};

/** 퀴즈 목록·레일 카드용 요약 정보 (경로는 `snackQuizHref` 등으로 생성) */
export type SnackQuizCard = {
  /** `rail-card--{theme}` 등 스타일 분기용 슬러그 (선택) */
  theme?: string;
  /** 카드 상단 짧은 라벨 (선택) */
  kicker?: SnackQuizText;
  /** 썸네일 URL (없으면 `images.thumbnail` 등으로 폴백) */
  image?: string;
  /**
   * 메인 레일·홈 카드 등 **목록 전용** 커버. 생략 시 `image` / `thumbnail` 사용.
   * 퀴즈 `thumb`가 여러 테스트에서 동일 파일로 복제된 경우 여기에만 구분 이미지를 둠.
   */
  railImage?: string;
  /** 목록 정렬 시 우선순위 (클수록 앞에, 선택) */
  priority?: number;
};

/** 점수·결과 산출 규칙 (엔진이 해석 가능한 식별자 + 사람 읽기 설명) */
export type SnackQuizLogic = {
  /** 예: `max-score`(최다 득점), `weighted` 등 */
  type: string;
  /** 계산 방식 설명 (선택) */
  description?: SnackQuizText;
  /** 동점일 때 복합형(blend) 사용 여부 (선택) */
  blendOnTie?: boolean;
};

/** 퍼널 이벤트명 (시작·완료·공유율 등) */
export type SnackQuizAnalyticsFunnel = {
  start: string;
  complete: string;
  share: string;
};

/** 분석·이벤트 메타 (선택, GA/CRM 등) */
export type SnackQuizAnalytics = {
  eventKey?: string;
  contentGroup?: string;
  funnel?: SnackQuizAnalyticsFunnel;
};

/** 로케일별 짧은 문자열 (예: `{ "ko": "..." }`) — 제목 등 레거시 호환 */
export type SnackQuizLocalized = Partial<Record<string, string>>;

export type SnackQuizDefinition = {
  /** 카탈로그 식별자 (URL `slug`와 동일 권장) */
  id: string;
  /** URL 경로 세그먼트 `/{lang}/{cat}/{slug}/` */
  slug: string;
  /** UI·검증용 언어 코드 목록 (`SnackQuizText`에 `en` 등이 있으면 여기에도 포함 권장) */
  locales?: string[];
  /** 목록·URL용 카테고리 슬러그 (선택) */
  category?: string;
  /** 태그 (선택) */
  tags?: SnackQuizText[];
  /** 퀴즈 제목·부제 (선택) */
  title?: SnackQuizText;
  subtitle?: SnackQuizText;
  /** 썸네일·OG·시작 화면 이미지 (선택) */
  images?: SnackQuizPackImages;
  /** SEO·OG 메타 (선택) */
  meta?: SnackQuizPackMeta;
  /** 목록·카드 UI용 (선택) */
  card?: SnackQuizCard;
  /** 득표 집계에 쓰는 키 목록 */
  resultKeys: string[];
  /**
   * 결과 타입 표시·동점 시 우선 순서.
   * 생략 시 `resultKeys` 순서와 동일하게 취급. `resultKeys`의 부분집합이면 나머지는 뒤에 이어 붙인다.
   */
  resultOrder?: string[];
  /** 점수 계산 방식 메타 (선택) */
  logic?: SnackQuizLogic;
  /** 분석용 식별자·속성 (선택) */
  analytics?: SnackQuizAnalytics;
  /** 연관 퀴즈 — 대상 퀴즈의 `slug` */
  related?: string[];
  results: Record<string, SnackQuizResult>;
  /** 최고 득표가 2개 이상일 때 */
  blend: SnackQuizBlend;
  questions: SnackQuizQuestion[];
  /** 결과 화면 하단 고지 */
  footnote: SnackQuizText;
};
