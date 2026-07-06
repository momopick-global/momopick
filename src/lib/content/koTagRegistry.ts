/**
 * 표준 태그 레지스트리 (Single Source of Truth).
 * 태그의 slug·라벨·별칭을 여기 한 곳에서 정의한다.
 * - 퀴즈 JSON의 자유 입력 태그({ko,en})는 `aliases`로 이 캐노니컬 태그에 흡수된다.
 * - GNB 태그 바, 퀴즈 페이지 태그, `/ko/tag/[tag]/` 라우트가 모두 이 목록을 참조한다.
 * - 태그를 추가·이름변경·병합하려면 여기만 고치면 된다. (nav의 KO_PRIMARY_NAV와 동일 원칙)
 */
export type KoTag = {
  /** URL·식별용 영문 slug (`/ko/tag/<slug>/`) */
  slug: string;
  /** 표시 라벨 */
  ko: string;
  en: string;
  emoji?: string;
  /** 이 태그로 흡수할 퀴즈 태그(ko) 변형들. `ko` 자신은 자동 포함. */
  aliases?: readonly string[];
};

export const KO_TAG_REGISTRY: readonly KoTag[] = [
  { slug: "psychology", ko: "심리", en: "psychology", emoji: "🧠" },
  { slug: "love", ko: "연애", en: "love", emoji: "💗", aliases: ["사랑"] },
  { slug: "crush", ko: "썸", en: "crush", emoji: "💓", aliases: ["호감", "고백", "연락"] },
  { slug: "personality", ko: "성향", en: "personality", emoji: "🧭", aliases: ["성격", "MBTI"] },
  { slug: "emotion", ko: "감정", en: "emotion", emoji: "🎭", aliases: ["예민함", "분노"] },
  { slug: "relationship", ko: "관계", en: "relationship", emoji: "🤝", aliases: ["신뢰"] },
  { slug: "self-understanding", ko: "자기이해", en: "self-understanding", emoji: "🔎", aliases: ["혼자"] },
  { slug: "self-esteem", ko: "자존감", en: "self-esteem", emoji: "💪", aliases: ["멘탈", "회복력"] },
  { slug: "charm", ko: "매력", en: "charm", emoji: "✨" },
  { slug: "onepick", ko: "원픽", en: "one-pick", emoji: "🎯" },
  { slug: "values", ko: "가치관", en: "values", emoji: "🧩" },
  { slug: "healing", ko: "힐링", en: "healing", emoji: "🌿", aliases: ["무드"] },
  { slug: "analysis", ko: "분석", en: "analysis", emoji: "📊" },
] as const;

/** slug → KoTag */
const BY_SLUG = new Map<string, KoTag>(KO_TAG_REGISTRY.map((t) => [t.slug, t]));

/** 라벨(ko/en/별칭) → KoTag. 정규화용. */
const BY_LABEL = new Map<string, KoTag>();
for (const t of KO_TAG_REGISTRY) {
  for (const label of [t.ko, t.en, ...(t.aliases ?? [])]) {
    BY_LABEL.set(label.trim().toLowerCase(), t);
  }
}

export function koTagBySlug(slug: string): KoTag | undefined {
  return BY_SLUG.get(slug);
}

/** 퀴즈 태그 라벨(자유 입력)을 캐노니컬 태그로 정규화. 매칭 없으면 undefined. */
export function koTagFromLabel(label: string | undefined): KoTag | undefined {
  if (!label) return undefined;
  return BY_LABEL.get(label.trim().toLowerCase());
}

export function koTagLabel(slug: string, locale: string): string {
  const t = BY_SLUG.get(slug);
  if (!t) return slug;
  return locale === "ko" ? t.ko : t.en;
}
