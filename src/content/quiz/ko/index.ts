import type { SnackQuizDefinition } from "@/components/quiz/types";
import yourLoveType from "./your-love-type.json";

/** 빌드 시 번들에 포함. 나중엔 fetch(URL) + 검증으로 CRM JSON과 동일 경로만 바꾸면 됨 */
export const koQuizYourLoveType = yourLoveType as SnackQuizDefinition;
