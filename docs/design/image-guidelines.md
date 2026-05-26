# Image Guidelines — 공통

## 기술 사양

| 항목 | 권장 |
|---|---|
| 포맷 | **WebP** 우선. 단일 PNG/JPG는 피하기 |
| 색공간 | sRGB |
| 압축 | quality 75~85 (육안 무손실 + 파일 작음) |
| 메타데이터 | EXIF 제거 (개인정보 우려, 파일 크기 절약) |

## 비율 / 크기

| 용도 | 비율 | 권장 크기 |
|---|---|---|
| 결과 캐릭터 | 4:5 (세로형) 또는 1:1 | 640×800 또는 800×800 |
| 퀴즈 썸네일 (`thumb.webp`) | 1:1 또는 16:9 | 600×600 또는 960×540 |
| 시작 이미지 (`start.webp`) | 4:5 또는 1:1 | 640×800 |
| OG 이미지 (`og.webp`) | 1.5:1 ~ 1.91:1 | 1200×630 또는 1536×1024 |
| 블로그 hero | 16:9 | 1280×720 |
| 브랜드 로고 | 1:1 | 256×256 (`momopick_symbol.webp`) |
| 브랜드 워드마크 | 가로 | 적당히 (`momopick_wordmark.webp`) |

## 디자인 원칙

### 절대 들어가면 안 되는 것

- ❌ **이미지 안 텍스트** (제목/카피 일러스트화)
- ❌ **로고** (브랜드 로고 외)
- ❌ **워터마크**
- ❌ **저작권 모호한 외부 이미지** (Pinterest 등에서 무단 사용)
- ❌ **현실 인물 사진** (초상권/AI 윤리 이슈)
- ❌ **무서운 분위기** (피, 공포, 다크판타지)

### 지향해야 할 것

- ✅ **일러스트 / 그래픽 스타일** — 사진보다 일러스트 우선
- ✅ **중심 인물의 표정**이 명확
- ✅ **결과별 감정 차이**가 한눈에 보임
- ✅ **작은 크기에서도 의미 인식 가능** (썸네일)
- ✅ **공유 시 잘려도 핵심이 보임** (중앙 배치 — OG는 좌우/상하 잘릴 수 있음)

## 모바일에서의 가시성

- 모바일 카드: 320~390px 폭에서 노출
- 결과 이미지: 본문 폭 (~390px) 내에서 표현 충분
- 썸네일은 한눈에 들어와야 함 (디테일 작은 요소 X)

## 깨진 이미지 방지

`QuizImageWithFallback` 컴포넌트가 `<img onError>` 시 `/images/common/quiz-image-pending.webp`로 자동 대체.

**그러나** AdSense 크롤러나 Kakao Feed 같은 외부 fetch는 fallback 미적용:
- 결과적으로 운영 측에서 **이미지 URL은 반드시 200**이어야 함
- 자산 누락 발견 시 (예: ambiguous-situationship-end C/D 케이스), JSON 경로를 임시 pending으로 교체 후 재배포

## 파일명 규칙

| 자산 | 파일명 |
|---|---|
| 결과 N번째 | `result-1.webp`, `result-2.webp`, ... |
| 썸네일 | `thumb.webp` |
| 시작 화면 | `start.webp` |
| OG | `og.webp` |
| 문항 이미지 | `q1.webp`, `q2.webp`, ... |

영어 소문자 + 하이픈. 한글·공백·특수문자·자동 생성 이름(`ChatGPT Image 2026...`) 금지.

## 경로 규칙

자세한 건 [asset-paths.md](./asset-paths.md).

## OG 이미지

- 1.91:1 (페이스북/Twitter Card 표준) 또는 1.5:1 (현재 운영 OG)
- 좌우/상하 약 10%는 잘려도 핵심이 살아남게 중앙 배치
- 텍스트가 OG에 들어가야 한다면 큰 폰트 + 한 줄 (모바일 미리보기 가독성)

## 새 이미지 추가 절차

1. WebP 변환 + 압축 (quality 75~85)
2. `public/images/quiz/<slug>/<locale>/<filename>.webp` 경로
3. JSON 안의 경로는 **로케일 없이** `/images/quiz/<slug>/<file>.webp` (런타임에 locale 삽입됨)
4. `node tools/check-quiz-images.mjs` 통과
5. `npm run build` 통과
6. 운영에서 200 응답 확인

## 점검 명령

```bash
# 모든 퀴즈 이미지 정합성
node tools/check-quiz-images.mjs

# 빌드 산출 크기
du -sh out/images/quiz/* | sort -h | tail -10

# 운영 응답
curl -sI https://momopick.com/images/quiz/<slug>/ko/result-1.webp
```
