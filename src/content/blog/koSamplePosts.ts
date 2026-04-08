/** 블로그 목록 탭·필터용 카테고리 */
export type KoBlogCategoryId = "love" | "tarot" | "growth" | "fun";

/** 블로그 목록 예시 (추후 CMS·MDX 등으로 교체 가능) */
export type KoSampleBlogPost = {
  id: string;
  date: string;
  dateTime: string;
  title: string;
  excerpt: string;
  /** 상세 본문 (문단은 빈 줄로 구분) */
  body: string;
  /** 목록 탭 분류 */
  category: KoBlogCategoryId;
  tag?: "가이드" | "에디터노트" | "업데이트" | "팁";
  /** 대표 이미지 경로 (없으면 준비중 이미지 사용) */
  image?: string;
};

const PENDING = "/images/common/quiz-image-pending.webp";

export const koSamplePosts: KoSampleBlogPost[] = [
  {
    id: "snack-test-what",
    date: "2026.04.04",
    dateTime: "2026-04-04",
    category: "fun",
    tag: "가이드",
    image: PENDING,
    title: "스낵 테스트가 뭐예요? 3분 안에 끝나는 이유",
    excerpt: `바쁜 하루 사이에도 부담 없이 끝낼 수 있게, 문항 수와 선택지를 짧게 설계합니다.
결과는 "정답"이 아니라 오늘의 나를 비추는 거울에 가깝다고 보면 돼요.`,
    body: `모모픽에서 말하는 스낵 테스트는 긴 진단지가 아니라, 짧게 즐기고 바로 결과를 볼 수 있는 퀴즈 형태를 뜻해요. 한 번에 몰아서 하기보다는 틈날 때 하나씩 해도 부담이 없도록 만드는 게 목표입니다.

문항 수를 줄이되, 선택 하나하나가 결과에 반영되도록 구조를 잡아 두었습니다. 그래서 "시간 대비 몰입감"을 느끼실 수 있을 거예요.

결과 문구는 정답·오답이 아니라, 선택 패턴을 바탕으로 한 해석에 가깝습니다. 그날의 기분이나 컨디션에 따라 달라질 수도 있으니, 가볍게 즐겨 주세요.`,
  },
  {
    id: "share-result",
    date: "2026.04.02",
    dateTime: "2026-04-02",
    category: "love",
    tag: "팁",
    image: PENDING,
    title: "테스트 결과, 친구에게 이렇게 공유해 보세요",
    excerpt: `캡처 한 장이면 충분해요. 카톡이나 스토리에 올릴 때는 상대방이 부담스럽지 않게 짧은 한 줄을 덧붙이면 대화가 더 잘 이어집니다.`,
    body: `결과 화면을 캡처해 보내는 것만으로도 충분히 대화 소재가 됩니다. 이때 "나 이거 나왔어" 한마디보다, "너는 뭐 나왔어?"처럼 질문을 던지면 상대가 부담 없이 참여하기 좋아요.

SNS에 올릴 때는 스포일러가 될 수 있는 문구는 줄이고, 공감이나 유머 한 줄을 덧붙이면 반응이 더 좋을 때가 많습니다.

상대가 테스트를 안 해도 괜찮아요. 결과를 "나 요즘 이런 쪽이더라" 정도로 가볍게 나누는 것만으로도 충분합니다.`,
  },
  {
    id: "love-category-editor",
    date: "2026.03.30",
    dateTime: "2026-03-30",
    category: "love",
    tag: "에디터노트",
    image: PENDING,
    title: "연애 테스트, 웃으면서 보는 게 포인트",
    excerpt: `썸·연애 코너는 가볍게 즐기되, "나도 이런 편이구나" 정도만 가져가도 충분해요.
진지한 관계 결정은 테스트 밖에서, 본인과 상대와의 대화로 이어가는 걸 권장합니다.`,
    body: `연애·썸 관련 문항은 웃음과 공감을 동시에 노리는 경우가 많아요. 결과가 "찔린다"고 느껴질 수도 있는데, 그건 패턴을 재미있게 풀어낸 표현일 뿐, 누군가를 판단하는 도구가 아닙니다.

중요한 결정—고백, 이별, 관계 정리 등—은 테스트 결과가 아니라 본인의 상황과 감정, 그리고 상대와의 대화를 바탕으로 하시길 권장합니다.

모모픽의 연애 코너는 "오늘의 대화 포인트" 정도로 가져가 주시면 가장 좋습니다.`,
  },
  {
    id: "new-quizzes-rhythm",
    date: "2026.03.26",
    dateTime: "2026-03-26",
    category: "growth",
    tag: "업데이트",
    image: PENDING,
    title: "앞으로도 테스트는 꾸준히 늘어납니다",
    excerpt: `카테고리별로 슬러그와 썸네일을 맞춰 두었어요. 홈과 /ko/love/ 같은 허브에서 새로 올라온 테스트를 한눈에 볼 수 있게 정리해 갈 예정입니다.`,
    body: `콘텐츠는 카테고리(연애, 성격·심리 등)별로 모아 볼 수 있게 구성하고 있습니다. 새 테스트가 추가되면 목록과 홈 레일에 반영되는 흐름을 유지해 갈 예정이에요.

우선순위·노출 영역은 서비스 운영에 맞춰 조정될 수 있습니다. 공지와 블로그에서도 업데이트 소식을 전해 드리겠습니다.

궁금한 주제나 아이디어가 있으면 언제든 피드백 주시면 좋겠습니다.`,
  },
  {
    id: "mbti-not-diagnosis",
    date: "2026.03.22",
    dateTime: "2026-03-22",
    category: "growth",
    tag: "가이드",
    image: PENDING,
    title: "MBTI·성향 퀴즈, 진단이 아니라는 걸 기억해 주세요",
    excerpt: `재미와 자기이해를 위한 참고용이에요. 의학·고용 등 전문 판단을 대신하지 않습니다.
결과에 너무 몰입하기보다, 가볍게 즐겨 주시면 좋겠습니다.`,
    body: `MBTI·성향 퀴즈는 엔터테인먼트와 자기이해를 위한 참고용이에요. 임상적 진단이나 직무 적합성 판단을 대체하지 않습니다.

같은 사람이라도 상황·기분에 따라 달라질 수 있는 부분이므로, 결과를 "나의 전부"로 고정하지 않으셔도 됩니다.

의학·심리 상담, 법률·재무 등 전문가가 필요한 영역은 반드시 해당 전문가의 도움을 받아 주세요. 모모픽 면책조항에서도 이와 관련해 안내하고 있습니다.`,
  },
];

export function getKoBlogPostBySlug(slug: string): KoSampleBlogPost | undefined {
  return koSamplePosts.find((p) => p.id === slug);
}

export function getKoBlogSlugs(): string[] {
  return koSamplePosts.map((p) => p.id);
}
