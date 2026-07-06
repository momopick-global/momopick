/** 한글 초성 추출·검색 유틸 (빌드 인덱스 + 클라이언트 쿼리 양쪽에서 사용) */

const CHOSUNG = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
  "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
];

const HANGUL_BASE = 0xac00;
const HANGUL_LAST = 0xd7a3;

/** 문자열을 초성 문자열로 변환. 한글 음절→초성, 그 외(영문·숫자)는 소문자로 통과. 공백 제거. */
export function chosungOf(input: string): string {
  let out = "";
  for (const ch of input) {
    const code = ch.charCodeAt(0);
    if (code >= HANGUL_BASE && code <= HANGUL_LAST) {
      out += CHOSUNG[Math.floor((code - HANGUL_BASE) / 588)];
    } else if (ch.trim() !== "") {
      out += ch.toLowerCase();
    }
  }
  return out;
}

/** 검색 비교용 정규화: 소문자 + 공백 제거. */
export function normalizeText(input: string): string {
  return input.toLowerCase().replace(/\s+/g, "");
}

/** 쿼리가 순수 초성(ㄱ~ㅎ 자모)으로만 이뤄졌는지. 초성 검색 모드 판별용. */
export function isChosungQuery(input: string): boolean {
  const q = input.replace(/\s+/g, "");
  if (!q) return false;
  for (const ch of q) {
    const code = ch.charCodeAt(0);
    // 호환 자모 초성 영역 ㄱ(0x3131)~ㅎ(0x314e)
    if (code < 0x3131 || code > 0x314e) return false;
  }
  return true;
}
