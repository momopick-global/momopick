# 퀴즈 문서 허브

퀴즈 관련 문서와 데이터가 여러 폴더에 흩어져 있어서, 이 문서를 `중앙 목차`로 사용합니다.

원칙:
- 실무에서 먼저 볼 문서는 `현재 기준 문서`
- 실제 서비스 반영값은 `실제 퀴즈 데이터`
- 예전 제작물이나 참고용 원본은 `참고 자료`

## 1. 현재 기준 문서

가장 먼저 봐야 하는 문서들입니다.

### 이미지/프롬프트

- [quiz-image-prompts.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/quiz-image-prompts.md)
  - 대표 이미지 공통 가이드
  - 결과 이미지 공통 가이드
  - 퀴즈별 이미지 프롬프트
  - 퀴즈별 프롬프트 템플릿

- [character-profile-prompts.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/character-profile-prompts.md)
  - 고정 사람 캐릭터 10명
  - 동물 마스코트 10마리
  - 캐릭터별 프로필 프롬프트

### 제목/결과 목차

- [quiz-title-results.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/quiz-title-results.md)
  - 퀴즈 제목 목록
  - 결과명 목록
  - 스낵형/퍼센트형 구분

### 문구 작성

- [quiz-writing-guide.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/content/quiz-writing-guide.md)
  - 퀴즈 질문/인트로/설명 작성 기준

- [result-writing-guide.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/content/result-writing-guide.md)
  - 결과 문구 작성 기준

### 디자인 참고

- [image-guidelines.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/design/image-guidelines.md)
  - 이미지 전반 가이드 + 퀴즈 이미지 스타일(구도·표정·색·안티패턴)

## 2. 실제 퀴즈 데이터

서비스에 들어가는 실제 퀴즈 원본입니다.

### 퀴즈 JSON 폴더

- [src/content/quiz](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/src/content/quiz)
  - 각 퀴즈의 제목, 질문, 결과, 이미지 경로, 프롬프트 필드가 들어 있음

중요 파일 예시:
- [who-likes-you-type.json](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/src/content/quiz/who-likes-you-type.json)
- [why-cant-you-text-first.json](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/src/content/quiz/why-cant-you-text-first.json)
- [ambiguous-situationship-end.json](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/src/content/quiz/ambiguous-situationship-end.json)

### 이미지 경로 규칙

- [quizAssetUrl.ts](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/src/lib/content/quizAssetUrl.ts)
  - JSON 안의 이미지 경로를 실제 퍼블릭 경로로 연결하는 규칙

- [check-quiz-images.mjs](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/tools/check-quiz-images.mjs)
  - 퀴즈 이미지 경로 검사 도구

## 3. 현재 이미지 파일 위치

실제 사용하는 이미지 파일 폴더입니다.

- [public/images/quiz](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/public/images/quiz)
  - 퀴즈별 썸네일
  - 결과 이미지
  - 로케일별 `ko`, `en` 폴더

예시:
- [who-likes-you-type](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/public/images/quiz/who-likes-you-type)
- [why-cant-you-text-first](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/public/images/quiz/why-cant-you-text-first)

## 4. 예전 참고 자료

현재 기준 문서는 아니지만, 예전 이미지/메타/실험 결과를 찾을 때 참고할 수 있습니다.

### 참고 자료 루트

- [momopick_ETC/quiz](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick_자료/momopick_ETC/quiz)

### 특히 참고할 만한 파일

- [quiz_love_title_and_result_merged.json](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick_자료/momopick_ETC/quiz/love/quiz_love_title_and_result_merged.json)
  - 예전 퀴즈 제목/결과 합본 자료

- [quiz_love_meta_only.xlsx](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick_자료/momopick_ETC/quiz/love/test_llove_title_img_kr/quiz_love_meta_only.xlsx)
  - 메타 정보 참고용 시트

- [test_llove_title_img_kr](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick_자료/momopick_ETC/quiz/love/test_llove_title_img_kr)
  - 예전 퀴즈별 테스트 이미지 모음

- [banner_loose_images_meta.json](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick_자료/momopick_ETC/quiz/love/분류안됨/momopick - 배너제목_ko_1러브_files/banner_loose_images_meta.json)
  - 예전 배너 메타 추정 자료

## 5. 추천 작업 순서

새 퀴즈 이미지를 만들 때는 아래 순서가 가장 안정적입니다.

1. [quiz-title-results.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/quiz-title-results.md)에서 제목/결과 확인
2. [quiz-image-prompts.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/quiz-image-prompts.md)에서 공통 규칙과 템플릿 확인
3. [character-profile-prompts.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/character-profile-prompts.md)에서 주인공/마스코트 배정
4. [src/content/quiz](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/src/content/quiz)에서 실제 퀴즈 JSON 반영
5. [public/images/quiz](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/public/images/quiz) 경로에 이미지 저장

## 6. 소스 오브 트루스

혼란을 줄이기 위해 아래처럼 기준을 고정합니다.

- 제목/결과 기준:
  - [quiz-title-results.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/quiz-title-results.md)

- 이미지/프롬프트 기준:
  - [quiz-image-prompts.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/quiz-image-prompts.md)

- 캐릭터 기준:
  - [character-profile-prompts.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/character-profile-prompts.md)

- 실제 서비스 데이터 기준:
  - [src/content/quiz](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/src/content/quiz)

## 7. prompt 용어 정리

`prompt`라는 이름이 문서와 JSON에서 서로 다르게 쓰여서 헷갈릴 수 있습니다.

### 문서 쪽 prompt

- [quiz-image-prompts.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/quiz-image-prompts.md)에서 말하는 `프롬프트`
- 의미:
  - 대표 이미지 생성 프롬프트
  - 결과 이미지 생성 프롬프트
  - 캐릭터 이미지 생성 프롬프트
- 즉, `이미지 생성용 prompt`입니다.

### JSON 쪽 prompt

- [src/content/quiz](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/src/content/quiz) 안의 각 `prompt` 필드
- 의미:
  - 퀴즈 문항 질문
  - 예: `누가 나에게 호감을 보일 때 가장 먼저 느껴지는 건?`
- 즉, `질문 문구용 prompt`입니다.

### 정리 규칙

- 이미지 생성용 프롬프트는:
  - [quiz-image-prompts.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/quiz-image-prompts.md)에서 관리

- 퀴즈 질문 문구 prompt는:
  - [src/content/quiz](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/src/content/quiz) JSON에서 관리

- 캐릭터 생성용 프롬프트는:
  - [character-profile-prompts.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/character-profile-prompts.md)에서 관리

### 권장 관리 방식

- 같은 내용을 문서와 JSON에 중복 기록하지 않습니다.
- 이미지 프롬프트는 문서에서 먼저 정리하고, 실제 이미지 파일만 서비스 경로에 반영합니다.
- 질문 문구는 JSON을 기준으로 수정합니다.

## 8. 정리 메모

- 앞으로 새 퀴즈 관련 문서는 가능하면 `momopick/docs/` 아래에 먼저 정리합니다.
- 예전 참고 자료는 `momopick_자료/`에 그대로 두고, 실무 기준 문서로 직접 쓰지 않습니다.
- 새 프롬프트를 만들 때는 여러 파일에 중복 작성하지 않고, 우선 [quiz-image-prompts.md](/Users/xxxaskillofgodxxxgmail.com/Desktop/momo/momopick/docs/quiz-image-prompts.md)에 정리한 뒤 필요한 값만 JSON으로 옮기는 방식이 가장 관리가 쉽습니다.
