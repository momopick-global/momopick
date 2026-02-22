// ============================
// 모모픽(몽픽) 메인 스크립트
// ============================

// ✅ 샘플 데이터 (이미지 더미는 id 기반으로 연결)
const TESTS = [
  { id:1, title:"내 연애가 망하는 이유 한 줄 요약", desc:"선택 10개로 연애 패턴이 딱 나옴", tag:"연애", minutes:2, plays:128430, badge:"🔥 HOT" },
  { id:2, title:"내 MBTI가 화났을 때 하는 말", desc:"친구들이 제일 웃긴다고 함", tag:"MBTI", minutes:1, plays:95420, badge:"밈" },
  { id:3, title:"회사에서 나는 어떤 캐릭터?", desc:"팀원들이 보는 나의 포지션", tag:"직장", minutes:2, plays:65110, badge:"추천" },
  { id:4, title:"나의 숨겨진 T/F 수치", desc:"감정 vs 논리 밸런스 측정", tag:"성격", minutes:2, plays:50122, badge:"NEW" },
  { id:5, title:"친구가 나를 싫어할 때 나오는 사인", desc:"나만 몰랐던 그 순간", tag:"관계", minutes:2, plays:88912, badge:"🔥" },
  { id:6, title:"내가 귀여운 이유 테스트", desc:"근거를 데이터로 제시함(진짜임)", tag:"밈", minutes:1, plays:122001, badge:"ㅋㅋ" },
  { id:7, title:"내가 돈을 못 모으는 이유", desc:"습관 1개만 바꿔도 달라짐", tag:"돈", minutes:3, plays:33010, badge:"실전" },
  { id:8, title:"나랑 잘 맞는 여행 스타일", desc:"혼행/패키지/즉흥/계획형", tag:"여행", minutes:2, plays:28801, badge:"NEW" },
  { id:9, title:"내가 먼저 연락 못 하는 이유", desc:"자존심? 불안? 그냥 바쁨?", tag:"연애", minutes:2, plays:71440, badge:"인기" },
  { id:10, title:"나의 ‘찐’ 스트레스 해소법", desc:"나한테 맞는 방식만 골라줌", tag:"성격", minutes:2, plays:21990, badge:"추천" },
];

const TAGS = ["연애","MBTI","성격","밈","직장","관계","돈","여행"];

const state = {
  tag: null,
  query: "",
  latestPage: 1,
  latestPageSize: 4,
  heroCarouselIndex: 0,
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const formatPlays = (n) => {
  if (n >= 1000000) return (n/1000000).toFixed(1) + "M";
  if (n >= 1000) return (n/1000).toFixed(1) + "K";
  return String(n);
};

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function filteredTests(){
  let items = [...TESTS];

  if (state.tag) items = items.filter(t => t.tag === state.tag);
  if (state.query.trim()){
    const q = state.query.trim().toLowerCase();
    items = items.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.tag.toLowerCase().includes(q)
    );
  }
  return items;
}

// ✅ 이미지 경로: 전부 ver1/assets 폴더 기준 (MOMOPICK_ASSETS 또는 자동 감지)
(function setAssetsBase(){
  if (typeof window === "undefined") return;
  if (window.MOMOPICK_ASSETS) return;
  var script = document.currentScript;
  if (script && script.src && script.src.indexOf("/ver1/") !== -1) {
    var path = document.location.pathname || "";
    window.MOMOPICK_ASSETS = path.indexOf("/ver1/") !== -1 && path.match(/\/ver1\/[^/]+\//) ? "../assets" : "assets";
  }
})();
function thumbSrc(id){
  const base = (typeof window !== "undefined" && window.MOMOPICK_ASSETS) ? window.MOMOPICK_ASSETS : "assets";
  return base + "/img/thumb-" + id + ".jpg";
}

// ---- render ----
function renderTags(){
  const root = $("#tags");
  if (!root) return;

  root.innerHTML = "";
  TAGS.forEach(tag => {
    const el = document.createElement("button");
    el.className = "tag" + (state.tag === tag ? " active" : "");
    el.type = "button";
    el.textContent = "#" + tag;
    el.onclick = () => {
      state.tag = (state.tag === tag) ? null : tag;
      state.latestPage = 1;
      renderAll();
    };
    root.appendChild(el);
  });
}

function renderPopular(){
  const root = $("#popularGrid");
  if (!root) return;

  root.innerHTML = "";
  const items = filteredTests()
    .sort((a,b) => b.plays - a.plays)
    .slice(0, 4);

  items.forEach(t => {
    const card = document.createElement("article");
    card.className = "card";
    card.onclick = () => goTest(t);

    card.innerHTML = `
      <div class="thumb">
        <img src="${thumbSrc(t.id)}" alt="" onerror="this.style.display='none'">
        <div class="badge">${escapeHtml(t.badge)}</div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${escapeHtml(t.title)}</h4>
        <div class="card-meta">
          <span>${escapeHtml(t.tag)}</span>
          <span class="pill">${t.minutes}분 · ${formatPlays(t.plays)}회</span>
        </div>
      </div>
    `;
    root.appendChild(card);
  });
}

function renderLatest(){
  const root = $("#latestList");
  if (!root) return;

  root.innerHTML = "";

  const items = filteredTests()
    .sort((a,b) => b.id - a.id);

  const take = state.latestPage * state.latestPageSize;
  const pageItems = items.slice(0, take);

  pageItems.forEach(t => {
    const row = document.createElement("article");
    row.className = "row";
    row.onclick = () => goTest(t);

    row.innerHTML = `
      <div class="mini">
        <img src="${thumbSrc(t.id)}" alt="" onerror="this.style.display='none'">
      </div>
      <div style="min-width:0; flex:1;">
        <h4>${escapeHtml(t.title)}</h4>
        <p>${escapeHtml(t.desc)}</p>
        <div class="row-meta">
          <span class="pill">${escapeHtml(t.tag)}</span>
          <span class="pill">${t.minutes}분</span>
          <span class="pill">${formatPlays(t.plays)}회</span>
        </div>
      </div>
    `;
    root.appendChild(row);
  });

  const hasMore = pageItems.length < items.length;
  const btn = $("#btnLoadMore");
  if (btn) btn.style.display = hasMore ? "block" : "none";
}

// ---- navigation (데모) ----
function goTest(test){
  alert(`테스트 이동: "${test.title}"\n(다음 단계에서 질문/결과 페이지로 연결하면 돼)`);
}

// ---- theme ----
const THEME_KEY = "mongpick_theme";

function setTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta){
    meta.setAttribute("content", theme === "light" ? "#f5f6ff" : "#0b1220");
  }

  const btn = $("#btnTheme");
  if (btn){
    const emoji = btn.querySelector(".chip-emoji");
    const text = btn.querySelector(".chip-text");
    if (theme === "light"){
      if (emoji) emoji.textContent = "☀️";
      if (text) text.textContent = "라이트";
    } else {
      if (emoji) emoji.textContent = "🌙";
      if (text) text.textContent = "다크";
    }
  }
}

function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const theme = saved || (prefersLight ? "light" : "dark");
  setTheme(theme);

  const btn = $("#btnTheme");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "dark";
    const next = cur === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    setTheme(next);
  });
}

// ---- hamburger menu ----
function initTopMenu(){
  const btn = $("#btnMenu");
  const menu = $("#topMenu");
  if (!btn || !menu) return;

  const open = () => {
    menu.classList.add("open");
    btn.classList.add("is-open");
  };
  const close = () => {
    menu.classList.remove("open");
    btn.classList.remove("is-open");
  };
  const toggle = () => {
    if (menu.classList.contains("open")) close();
    else open();
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggle();
  });

  // 메뉴 클릭 시 닫기(원하면 유지로 변경 가능)
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) close();
  });

  // 바깥 클릭 닫기
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("open")) return;
    if (e.target.closest("#topMenu") || e.target.closest("#btnMenu")) return;
    close();
  });

  // ESC로 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

// ---- events ----
function bindEvents(){
  const q = $("#q");
  if (q){
    q.addEventListener("input", (e) => {
      state.query = e.target.value;
      state.latestPage = 1;
      renderAll();
    });
  }

  const loadMore = $("#btnLoadMore");
  if (loadMore){
    loadMore.onclick = () => {
      state.latestPage += 1;
      renderLatest();
    };
  }

  const reset = $("#btnReset");
  if (reset){
    reset.onclick = (e) => {
      e.preventDefault();
      state.tag = null;
      state.query = "";
      const qEl = $("#q");
      if (qEl) qEl.value = "";
      state.latestPage = 1;
      renderAll();
    };
  }

  const randomBtn = $("#btnRandom");
  if (randomBtn){
    randomBtn.onclick = () => {
      const items = filteredTests();
      const pick = items[Math.floor(Math.random()*items.length)] || TESTS[0];
      goTest(pick);
    };
  }

  // 존재할 때만 바인딩(페이지마다 구조가 다를 수 있으니까)
  const shareTop = $("#btnShareTop");
  if (shareTop){
    shareTop.onclick = async () => {
      const shareData = {
        title: "모모픽",
        text: "오늘의 밈/성격 테스트, 모모픽에서 해보자!",
        url: location.href
      };
      try{
        if (navigator.share) await navigator.share(shareData);
        else {
          await navigator.clipboard.writeText(shareData.url);
          alert("링크를 클립보드에 복사했어!");
        }
      } catch(e){
        // user cancelled - ignore
      }
    };
  }

  const startTop = $("#btnStartTop");
  if (startTop){
    startTop.onclick = () => {
      const items = filteredTests().sort((a,b) => b.plays - a.plays);
      goTest(items[0] || TESTS[0]);
    };
  }

  // bottom tabs demo
  $$(".tab").forEach(btn => {
    btn.onclick = () => {
      $$(".tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;
      if (tab !== "home") alert(`"${tab}" 탭은 다음 단계에서 페이지 만들면 돼`);
    };
  });
}

function renderAll(){
  renderTags();
  renderPopular();
  renderLatest();
}

// ---- hero carousel ----
function initHeroCarousel() {
  const slidesWrap = $(".hero-carousel-slides");
  const slides = $$(".hero-carousel-slides .hero-slide");
  const dotsContainer = $(".hero-carousel-dots");
  let interval;

  if (!slidesWrap || slides.length === 0) return;

  // dots 생성
  if (dotsContainer){
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      dot.setAttribute("aria-label", `${i + 1}번 배너`);
      dot.onclick = () => {
        state.heroCarouselIndex = i;
        updateHeroCarousel();
        resetCarouselInterval();
      };
      dotsContainer.appendChild(dot);
    });
  }

  function updateHeroCarousel() {
    const offset = -state.heroCarouselIndex * 100;
    slidesWrap.style.transform = `translateX(${offset}%)`; // ✅ 괄호 누락 수정

    if (dotsContainer){
      $$(".hero-carousel-dots .dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === state.heroCarouselIndex);
      });
    }
  }

  function resetCarouselInterval(){
    clearInterval(interval);
    interval = setInterval(() => {
      state.heroCarouselIndex = (state.heroCarouselIndex + 1) % slides.length;
      updateHeroCarousel();
    }, 5000);
  }

  const prev = $("#hero-prev");
  if (prev){
    prev.onclick = () => {
      state.heroCarouselIndex = (state.heroCarouselIndex - 1 + slides.length) % slides.length;
      updateHeroCarousel();
      resetCarouselInterval();
    };
  }

  const next = $("#hero-next");
  if (next){
    next.onclick = () => {
      state.heroCarouselIndex = (state.heroCarouselIndex + 1) % slides.length;
      updateHeroCarousel();
      resetCarouselInterval();
    };
  }

  updateHeroCarousel();
  resetCarouselInterval();
}

// ---- visitor counter (localStorage 기반 / 기기별) ----
const VISITOR_COUNT_KEY = "mongpick_visitor_count";

function getVisitorCount() {
  let count = localStorage.getItem(VISITOR_COUNT_KEY);
  if (count === null) count = 0;
  return parseInt(count, 10);
}

function incrementVisitorCount() {
  let count = getVisitorCount();
  count += 1;
  localStorage.setItem(VISITOR_COUNT_KEY, count);
  return count;
}

function updateVisitorCount() {
  const el = document.getElementById("visitor-count");
  if (!el) return;
  const count = incrementVisitorCount();
  el.textContent = count;
}

// init
initTheme();
initTopMenu();
bindEvents();
renderAll();
initHeroCarousel();
updateVisitorCount();
