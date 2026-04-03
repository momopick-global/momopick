# Data Model Specification — 모모픽 (1차 오픈)

> **DB**: PostgreSQL (Supabase) 가정.  
> **원칙**: 공개 콘텐츠와 사용자 데이터 분리, **RLS로 기본 차단** 후 필요한 읽기만 허용.

---

## 1. 엔티티 관계 요약

```
locales ──┬── categories
          │
          └── quizzes ─── quiz_questions
                 │            │
                 │            └── quiz_options
                 │
                 ├── quiz_tags ─── tags
                 └── user_results (로그인 시)

profiles (auth.users 1:1)
posts (블로그, 선택)
```

---

## 2. 테이블 정의

### 2.1 `locales`

| 컬럼 | 타입 | 제약 | 설명 |
|------|------|------|------|
| `code` | `text` | PK | `ko`, `en`, … |
| `name` | `text` | NOT NULL | 표시명 |
| `is_default` | `boolean` | default false | UI 기본 언어 |
| `is_public` | `boolean` | default true | 라우트 공개 여부 |

---

### 2.2 `categories`

| 컬럼 | 타입 | 제약 | 설명 |
|------|------|------|------|
| `id` | `uuid` | PK, default gen_random_uuid() | |
| `locale` | `text` | FK → locales, NOT NULL | |
| `slug` | `text` | NOT NULL | URL 세그먼트 (`love`, `personality`, …) |
| `title` | `text` | NOT NULL | 허브 제목 |
| `sort_order` | `int` | default 0 | 내비 순서 |
| `description` | `text` | | SEO 메타 |

**Unique**: `(locale, slug)`

**1차 카테고리 slug 예시**: `love`, `personality`, `social`, `style`, `fun`, `explore`(가상 허브면 별도 플래그)

---

### 2.3 `quizzes`

| 컬럼 | 타입 | 제약 | 설명 |
|------|------|------|------|
| `id` | `uuid` | PK | 내부 고정 ID |
| `locale` | `text` | FK, NOT NULL | |
| `category_id` | `uuid` | FK → categories | |
| `slug` | `text` | NOT NULL | URL용 (소문자, 하이픈) |
| `title` | `text` | NOT NULL | |
| `subtitle` | `text` | | |
| `description` | `text` | | SEO 본문 요약 |
| `cover_image_url` | `text` | | Storage public URL |
| `estimated_minutes` | `int` | | UX 표시 |
| `status` | `text` | NOT NULL | `draft` \| `published` \| `archived` |
| `published_at` | `timestamptz` | | |
| `updated_at` | `timestamptz` | NOT NULL, default now() | |
| `meta_title` | `text` | | 없으면 title 폴백 |
| `meta_description` | `text` | | |
| `schema_json` | `jsonb` | nullable | 문항 전체를 JSON으로 보관할 때(1차 단순화) |

**Unique**: `(locale, slug)`

**정책**: 슬러그 변경 시 **301 맵핑 테이블**(`slug_redirects`) 권장.

---

### 2.4 `slug_redirects` (권장)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `locale` | `text` | |
| `from_slug` | `text` | 구 URL 세그먼트(카테고리+퀴즈 조합은 앱에서 해석) |
| `to_quiz_id` | `uuid` | FK |
| `created_at` | `timestamptz` | |

---

### 2.5 `quiz_questions` (정규화 방식)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | `uuid` | PK |
| `quiz_id` | `uuid` | FK → quizzes |
| `order_index` | `int` | NOT NULL |
| `question_type` | `text` | `single` \| `multi` \| `scale` |
| `prompt` | `text` | 문항 본문 |
| `media_url` | `text` | 선택 |

---

### 2.6 `quiz_options`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | `uuid` | PK |
| `question_id` | `uuid` | FK |
| `order_index` | `int` | |
| `label` | `text` | |
| `score_map` | `jsonb` | 결과 타입별 가중치 `{ "type_a": 1, "type_b": 0 }` |

---

### 2.7 `quiz_result_types`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | `uuid` | PK |
| `quiz_id` | `uuid` | FK |
| `key` | `text` | 내부 키 (`your_love_type` 등) |
| `title` | `text` | |
| `body_md` | `text` | 결과 본문 |
| `share_image_url` | `text` | |

---

### 2.8 `tags` / `quiz_tags`

**tags**: `id`, `locale`, `slug`, `name`  
**quiz_tags**: `quiz_id`, `tag_id` (many-to-many)

---

### 2.9 `profiles` (Supabase Auth 확장)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | `uuid` | PK = `auth.users.id` |
| `display_name` | `text` | |
| `avatar_url` | `text` | |
| `locale_pref` | `text` | default `ko` |
| `created_at` | `timestamptz` | |

---

### 2.10 `user_results`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK → profiles |
| `quiz_id` | `uuid` | |
| `result_type_key` | `text` | |
| `answers_snapshot` | `jsonb` | 재현용(최소화, PII 금지) |
| `created_at` | `timestamptz` | |

**RLS**: 본인 행만 SELECT/INSERT.

---

### 2.11 `posts` (블로그, 1차 선택)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | `uuid` | PK |
| `locale` | `text` | |
| `slug` | `text` | |
| `title` | `text` | |
| `excerpt` | `text` | |
| `body_md` | `text` | |
| `category` | `text` | `love` \| `psychology` \| `tarot` \| `misc` |
| `status` | `text` | |
| `published_at` | `timestamptz` | |
| `author_id` | `uuid` | nullable |

**Unique**: `(locale, slug)`

---

## 3. RLS 정책 요약

| 테이블 | 익명 읽기 | 인증 사용자 |
|--------|-----------|-------------|
| `quizzes` 등 공개 콘텐츠 | `status = published` 만 | 동일 |
| `profiles` | 불가 | 본인만 |
| `user_results` | 불가 | 본인만 |
| `posts` | `published` 만 | 편집자 role 별도(1차는 서비스 롤로만 작성도 가능) |

---

## 4. 1차 오픈 최소 세트

필수에 가깝게 줄이면:

- `locales`, `categories`, `quizzes` + (`schema_json` **또는** questions/options 분리 택1)
- `profiles`, `user_results` — **로그인 기능을 1차에 넣을 때만**

블로그만 정적이면 `posts` 테이블은 2차로 미뤄도 됨.

---

## 5. 확장 시 추가 고려

- `quiz_versions` — 문항 개편 시 이력
- `events` / `analytics_events` — 서버측 퍼널(선택)
- `feature_flags` — 단계별 오픈

---

## 6. 슬러그 규칙 (데이터 레이어)

- 소문자 ASCII, 숫자, 하이픈만 (`a-z0-9-`).
- 연속 하이픈 금지, 선행·후행 하이픈 금지.
- 최대 길이 72자 권장(공유 URL 가독성).

URL 조합: `/{locale}/{category.slug}/{quiz.slug}/`

---

본 모델은 [api-spec.md](./api-spec.md)의 엔드포인트와 1:1로 매핑되도록 유지합니다.
