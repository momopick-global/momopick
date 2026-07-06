/**
 * 연애운세 타로 — 메이저 아르카나 22장 데이터 (단일 소스).
 *
 * - 이미지는 나중에 실제 카드 일러스트로 교체할 수 있게 카드별 파일 경로만 참조한다.
 *   현재는 모두 "이미지 준비중" 플레이스홀더(webp)이며, 같은 파일명으로 덮어쓰면 즉시 반영된다.
 *   경로: /public/images/card/{n}.webp  (n = 카드 번호 0~21, 메이저 아르카나 순서)
 * - 뽑은 3장은 각각 "상대의 마음 / 나의 마음 / 조언" 자리에 놓고 해당 문구를 보여준다.
 */
export type TarotPosition = "partner" | "self" | "advice";

export const TAROT_POSITIONS: readonly {
  key: TarotPosition;
  label: string;
  hint: string;
  emoji: string;
}[] = [
  { key: "partner", label: "상대의 마음", hint: "지금 그 사람의 속마음", emoji: "💘" },
  { key: "self", label: "나의 마음", hint: "내가 놓치고 있던 진심", emoji: "💖" },
  { key: "advice", label: "조언", hint: "오늘 연애운을 위한 한마디", emoji: "🔮" },
] as const;

export type TarotCard = {
  /** 파일명·식별자 (이미지 교체용) */
  slug: string;
  /** 한글 카드 이름 */
  name: string;
  /** 영문 카드 이름 */
  nameEn: string;
  /** 카드 이름과 연관된 이모지 */
  emoji: string;
  /** 이미지 경로 (교체 가능) */
  image: string;
  /** 자리별 연애운세 해석 */
  reading: Record<TarotPosition, string>;
};

const IMG_BASE = "/images/card";

export const TAROT_CARDS: readonly TarotCard[] = [
  {
    slug: "00-the-fool",
    name: "바보",
    nameEn: "The Fool",
    emoji: "🃏",
    image: `${IMG_BASE}/0.webp`,
    reading: {
      partner: "그 사람은 아직 마음을 정하지 못한 채, 설렘과 두려움 사이에서 당신을 바라보고 있어요. 계산보다 순수한 호감이 앞서는 시기예요.",
      self: "당신은 지금 겁내지 않고 마음을 열 준비가 되어 있어요. 결과를 재기보다 감정에 솔직해지고 싶은 마음이 커요.",
      advice: "너무 많은 걱정은 잠시 내려놓으세요. 가볍게 먼저 다가가는 용기가 오늘의 연애운을 열어줍니다.",
    },
  },
  {
    slug: "01-the-magician",
    name: "마법사",
    nameEn: "The Magician",
    emoji: "🎩",
    image: `${IMG_BASE}/1.webp`,
    reading: {
      partner: "상대는 당신에게 좋은 인상을 주려 은근히 노력하고 있어요. 대화를 이어갈 기회를 스스로 만들고 싶어 합니다.",
      self: "당신에게는 관계를 원하는 방향으로 이끌 힘이 있어요. 표현하는 방식만 정하면 흐름을 바꿀 수 있어요.",
      advice: "먼저 연락하고, 먼저 제안해 보세요. 당신의 작은 행동 하나가 관계의 물꼬를 틉니다.",
    },
  },
  {
    slug: "02-the-high-priestess",
    name: "여사제",
    nameEn: "The High Priestess",
    emoji: "🌙",
    image: `${IMG_BASE}/2.webp`,
    reading: {
      partner: "그 사람은 겉으로 드러내지 않지만 속으로 당신을 깊이 관찰하고 있어요. 말보다 마음이 앞서 있는 상태예요.",
      self: "당신의 직감이 유난히 맑은 때예요. 이미 답을 알고 있으면서 확인받고 싶어 하는 마음이 있어요.",
      advice: "서두르지 말고 상대의 신호를 조용히 읽어보세요. 침묵 속 진심을 알아채는 것이 오늘의 열쇠예요.",
    },
  },
  {
    slug: "03-the-empress",
    name: "여황제",
    nameEn: "The Empress",
    emoji: "👑",
    image: `${IMG_BASE}/3.webp`,
    reading: {
      partner: "상대는 당신 곁에서 편안함과 따뜻함을 느끼고 있어요. 함께하는 시간을 소중히 여기는 마음이 커지고 있어요.",
      self: "당신은 사랑을 넉넉히 주고 싶은 마음으로 가득해요. 배려가 자연스럽게 흘러나오는 시기예요.",
      advice: "마음을 아끼지 말고 다정함을 표현하세요. 당신의 따뜻함이 관계를 더 깊게 무르익게 합니다.",
    },
  },
  {
    slug: "04-the-emperor",
    name: "황제",
    nameEn: "The Emperor",
    emoji: "🏛️",
    image: `${IMG_BASE}/4.webp`,
    reading: {
      partner: "그 사람은 당신과의 관계를 진지하고 안정적으로 만들고 싶어 해요. 책임감 있게 다가가려는 마음이 있어요.",
      self: "당신은 관계에서 분명한 기준과 확신을 원하고 있어요. 흔들리기보다 든든한 사랑을 바라는 마음이에요.",
      advice: "감정에 솔직하되 관계의 방향은 분명히 하세요. 안정된 태도가 상대에게 신뢰를 줍니다.",
    },
  },
  {
    slug: "05-the-hierophant",
    name: "교황",
    nameEn: "The Hierophant",
    emoji: "⛪",
    image: `${IMG_BASE}/5.webp`,
    reading: {
      partner: "상대는 당신과 진솔하고 오래가는 인연을 그리고 있어요. 가벼운 만남보다 신뢰를 쌓고 싶어 합니다.",
      self: "당신은 서로 존중하는 안정적인 관계를 원하고 있어요. 진심이 통하는 사람을 만나고 싶은 마음이에요.",
      advice: "솔직한 대화로 서로의 가치관을 나눠보세요. 진지한 태도가 좋은 인연을 단단하게 만듭니다.",
    },
  },
  {
    slug: "06-the-lovers",
    name: "연인",
    nameEn: "The Lovers",
    emoji: "💑",
    image: `${IMG_BASE}/6.webp`,
    reading: {
      partner: "그 사람은 당신에게 진심으로 끌리고 있어요. 마음이 이미 당신을 향해 있는, 아주 좋은 신호예요.",
      self: "당신의 마음도 한 사람을 향해 또렷하게 기울어 있어요. 감정을 인정하고 받아들일 준비가 됐어요.",
      advice: "마음이 향하는 곳을 외면하지 마세요. 오늘은 진심을 표현하기에 더없이 좋은 날이에요.",
    },
  },
  {
    slug: "07-the-chariot",
    name: "전차",
    nameEn: "The Chariot",
    emoji: "🏇",
    image: `${IMG_BASE}/7.webp`,
    reading: {
      partner: "상대는 당신에게 다가가려는 의지가 강해요. 망설임을 딛고 관계를 진전시키려는 마음이 커지고 있어요.",
      self: "당신은 관계를 원하는 방향으로 밀고 나갈 추진력이 있어요. 지금은 멈출 때가 아니라 나아갈 때예요.",
      advice: "주저하지 말고 한 걸음 더 다가가세요. 적극적인 태도가 오늘의 연애운을 끌어올립니다.",
    },
  },
  {
    slug: "08-strength",
    name: "힘",
    nameEn: "Strength",
    emoji: "🦁",
    image: `${IMG_BASE}/8.webp`,
    reading: {
      partner: "그 사람은 부드럽지만 흔들리지 않는 마음으로 당신을 대하고 있어요. 서두르지 않고 진심을 지키고 있어요.",
      self: "당신은 조급함을 다스리며 관계를 따뜻하게 품을 수 있는 힘이 있어요. 인내가 사랑을 키우는 시기예요.",
      advice: "감정이 격해질 때일수록 부드럽게 대하세요. 여유 있는 다정함이 상대의 마음을 엽니다.",
    },
  },
  {
    slug: "09-the-hermit",
    name: "은둔자",
    nameEn: "The Hermit",
    emoji: "🏮",
    image: `${IMG_BASE}/9.webp`,
    reading: {
      partner: "상대는 지금 혼자만의 시간 속에서 마음을 정리하고 있어요. 무관심이 아니라 신중함에서 나온 거리예요.",
      self: "당신은 관계에 앞서 스스로의 마음을 들여다보고 싶어 해요. 진짜 원하는 것이 무엇인지 살피는 시기예요.",
      advice: "조급하게 답을 재촉하지 마세요. 서로에게 생각할 여백을 주면 관계가 더 단단해집니다.",
    },
  },
  {
    slug: "10-wheel-of-fortune",
    name: "운명의 수레바퀴",
    nameEn: "Wheel of Fortune",
    emoji: "🎡",
    image: `${IMG_BASE}/10.webp`,
    reading: {
      partner: "그 사람의 마음에 변화의 바람이 불고 있어요. 예상치 못한 계기로 당신을 다시 보게 될 수 있어요.",
      self: "당신의 연애운이 새로운 국면으로 접어들고 있어요. 흐름이 바뀌는 지금이 기회의 시기예요.",
      advice: "다가오는 인연의 신호를 놓치지 마세요. 우연처럼 찾아온 기회가 관계를 바꿀 수 있어요.",
    },
  },
  {
    slug: "11-justice",
    name: "정의",
    nameEn: "Justice",
    emoji: "⚖️",
    image: `${IMG_BASE}/11.webp`,
    reading: {
      partner: "상대는 당신과의 관계를 공정하고 솔직하게 대하고 싶어 해요. 진심만큼 돌려주려는 마음이 있어요.",
      self: "당신은 관계에서 균형과 진실함을 중요하게 여기고 있어요. 오해가 있다면 바로잡고 싶은 마음이에요.",
      advice: "감정을 숨기기보다 솔직하게 소통하세요. 공평하고 진실한 태도가 신뢰를 회복시킵니다.",
    },
  },
  {
    slug: "12-the-hanged-man",
    name: "매달린 사람",
    nameEn: "The Hanged Man",
    emoji: "🙃",
    image: `${IMG_BASE}/12.webp`,
    reading: {
      partner: "그 사람은 지금 마음을 결정하기 전 잠시 멈춰 있어요. 서두르지 않고 상황을 다르게 바라보는 중이에요.",
      self: "당신은 관계를 한 발 물러서서 새로운 시각으로 바라볼 필요가 있어요. 집착을 내려놓으면 답이 보여요.",
      advice: "지금은 기다림이 필요한 때예요. 관점을 바꾸면 답답했던 마음이 편안해질 거예요.",
    },
  },
  {
    slug: "13-death",
    name: "죽음",
    nameEn: "Death",
    emoji: "💀",
    image: `${IMG_BASE}/13.webp`,
    reading: {
      partner: "상대의 마음속에서 낡은 감정이 정리되고 있어요. 끝처럼 보이지만 새로운 시작을 위한 변화예요.",
      self: "당신은 지난 감정이나 관계의 한 장을 마무리하려 하고 있어요. 놓아줄 것을 놓아줄 용기가 생기는 시기예요.",
      advice: "끝을 두려워하지 마세요. 지나간 것을 정리해야 새로운 인연이 들어올 자리가 생깁니다.",
    },
  },
  {
    slug: "14-temperance",
    name: "절제",
    nameEn: "Temperance",
    emoji: "⚗️",
    image: `${IMG_BASE}/14.webp`,
    reading: {
      partner: "그 사람은 당신과 서서히, 균형 있게 가까워지고 싶어 해요. 무리하지 않는 편안한 속도를 원해요.",
      self: "당신은 감정의 기복을 다스리며 관계를 안정적으로 이어가고 싶어 해요. 조화를 바라는 마음이에요.",
      advice: "서두르지도, 미루지도 마세요. 서로의 속도를 맞추는 여유가 관계를 오래가게 합니다.",
    },
  },
  {
    slug: "15-the-devil",
    name: "악마",
    nameEn: "The Devil",
    emoji: "😈",
    image: `${IMG_BASE}/15.webp`,
    reading: {
      partner: "상대는 당신에게 강하게 끌리지만, 그 감정에 얽매여 솔직해지지 못하고 있을 수 있어요.",
      self: "당신은 놓지 못하는 감정이나 습관에 마음이 묶여 있어요. 무엇이 진짜 나를 위한 것인지 살필 때예요.",
      advice: "끌림과 집착을 구분해 보세요. 나를 지치게 하는 관계라면 한 걸음 거리를 두는 용기도 필요해요.",
    },
  },
  {
    slug: "16-the-tower",
    name: "탑",
    nameEn: "The Tower",
    emoji: "🗼",
    image: `${IMG_BASE}/16.webp`,
    reading: {
      partner: "그 사람의 마음에 예상 밖의 흔들림이 있어요. 갑작스러운 변화가 오히려 진심을 드러나게 할 수 있어요.",
      self: "당신은 지금 관계에서 참아왔던 감정이 터져 나올 수 있어요. 무너지는 것 같아도 새로운 진실이 보여요.",
      advice: "갑작스러운 변화에 당황하지 마세요. 허물어진 자리에서 더 솔직한 관계가 다시 세워집니다.",
    },
  },
  {
    slug: "17-the-star",
    name: "별",
    nameEn: "The Star",
    emoji: "⭐",
    image: `${IMG_BASE}/17.webp`,
    reading: {
      partner: "상대는 당신에게 잔잔하고 진실한 희망을 품고 있어요. 편안하게 마음을 열어가는 좋은 흐름이에요.",
      self: "당신의 마음에 다시 설렘과 기대가 차오르고 있어요. 상처가 아물고 사랑을 믿게 되는 시기예요.",
      advice: "마음을 열고 좋은 미래를 그려보세요. 희망을 잃지 않는 당신에게 따뜻한 인연이 다가옵니다.",
    },
  },
  {
    slug: "18-the-moon",
    name: "달",
    nameEn: "The Moon",
    emoji: "🌕",
    image: `${IMG_BASE}/18.webp`,
    reading: {
      partner: "그 사람의 마음이 겉과 속이 조금 다를 수 있어요. 아직 드러내지 못한 감정이 숨어 있어요.",
      self: "당신은 막연한 불안이나 오해로 마음이 흐려져 있을 수 있어요. 상상보다 사실을 확인하는 게 좋아요.",
      advice: "불안한 상상에 휘둘리지 마세요. 애매한 부분은 직접 물어 확인하면 마음이 한결 맑아집니다.",
    },
  },
  {
    slug: "19-the-sun",
    name: "태양",
    nameEn: "The Sun",
    emoji: "☀️",
    image: `${IMG_BASE}/19.webp`,
    reading: {
      partner: "상대는 당신과 함께 있을 때 진심으로 밝고 행복해해요. 마음을 숨기지 않고 드러내고 싶어 합니다.",
      self: "당신의 마음이 활짝 열려 사랑을 즐길 준비가 됐어요. 자신감과 긍정이 넘치는 아주 좋은 시기예요.",
      advice: "밝은 마음을 마음껏 표현하세요. 당신의 환한 에너지가 관계를 더없이 따뜻하게 만듭니다.",
    },
  },
  {
    slug: "20-judgement",
    name: "심판",
    nameEn: "Judgement",
    emoji: "🎺",
    image: `${IMG_BASE}/20.webp`,
    reading: {
      partner: "그 사람은 지난 감정을 돌아보며 당신과의 관계를 다시 진지하게 생각하고 있어요.",
      self: "당신은 마음의 결정을 앞두고 지난 인연을 정리하고 있어요. 후회 없이 선택하려는 마음이에요.",
      advice: "과거에 얽매이지 말고 지금의 진심을 따르세요. 다시 시작하기에 늦지 않은 때입니다.",
    },
  },
  {
    slug: "21-the-world",
    name: "세계",
    nameEn: "The World",
    emoji: "🌍",
    image: `${IMG_BASE}/21.webp`,
    reading: {
      partner: "상대는 당신과의 관계에서 충만함과 완성된 만족을 느끼고 있어요. 함께하는 미래를 그리고 있어요.",
      self: "당신은 관계에서 안정과 성취감을 느끼고 있어요. 오래 바라던 마음이 결실을 맺는 시기예요.",
      advice: "지금의 인연에 감사하며 한 단계 더 나아가세요. 완성된 사랑을 향한 흐름이 무르익었습니다.",
    },
  },
] as const;
