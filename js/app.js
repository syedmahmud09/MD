/* =========================================================
   Behance-style portfolio — app logic
   ========================================================= */
(function () {
  "use strict";

  /* ---------------- Data ---------------- */
  const AUTHOR = "Your Name";

  const PROJECTS = [
    {
      id: "living-room",
      title: "Modern Luxury Living Room",
      category: "Residential",
      image: "images/living-room.jpg",
      likes: 612,
      views: 3482,
      date: "Aug 2025",
      style: "Modern Classic",
      area: "42 m²",
      year: "2025",
      location: "Dubai, UAE",
      tools: "3ds Max · Corona · Photoshop",
      tags: ["living room", "3d visualization", "interior design", "render"],
      description:
        "A serene, layered living space where warm neutral tones meet crisp modern lines. The design plays with texture — bouclé, travertine and brushed brass — to create a room that feels calm by day and inviting after dark."
    },
    {
      id: "bedroom",
      title: "Master Bedroom Retreat",
      category: "Residential",
      image: "images/bedroom.jpg",
      likes: 487,
      views: 2914,
      date: "Jul 2025",
      style: "Japandi",
      area: "28 m²",
      year: "2025",
      location: "Istanbul, TR",
      tools: "3ds Max · Corona · Photoshop",
      tags: ["bedroom", "japandi", "3d render", "interior design"],
      description:
        "Designed as a true retreat, this master bedroom softens every edge: an upholstered headboard, linen bedding and low warm lighting that makes the room feel like a quiet embrace."
    },
    {
      id: "office",
      title: "Corporate Office Concept",
      category: "Office",
      image: "images/office.jpg",
      likes: 391,
      views: 2140,
      date: "May 2025",
      style: "Contemporary",
      area: "380 m²",
      year: "2024",
      location: "Warsaw, PL",
      tools: "3ds Max · V-Ray · Photoshop",
      tags: ["office", "workspace", "archviz", "commercial"],
      description:
        "An open-plan office concept balancing focus and collaboration. Acoustic zones, warm oak surfaces and a glass meeting room keep the space professional without feeling cold."
    },
    {
      id: "children-playroom",
      title: "Children's Playroom",
      category: "Kids",
      image: "images/children-playroom.jpg",
      likes: 528,
      views: 3120,
      date: "Apr 2025",
      style: "Scandinavian",
      area: "18 m²",
      year: "2024",
      location: "Kharkiv, UA",
      tools: "3ds Max · Corona · Photoshop",
      tags: ["kids room", "playroom", "3d visualization", "interior design"],
      description:
        "A playroom that grows with the child — soft pastels, built-in storage, a cosy reading nook and details a little one can reach. Playful, safe and tidy by design."
    },
    {
      id: "home-office",
      title: "Cozy Home Office",
      category: "Residential",
      image: "images/home-office.jpg",
      likes: 344,
      views: 1987,
      date: "Mar 2025",
      style: "Cozy Minimal",
      area: "12 m²",
      year: "2025",
      location: "Remote project",
      tools: "SketchUp · V-Ray · Photoshop",
      tags: ["home office", "work from home", "3d render", "interior design"],
      description:
        "A compact home-office corner that proves small spaces can work hard. A walnut desk, a deep bookshelf and one warm lamp turn a single corner into a place you actually want to sit."
    },
    {
      id: "kitchen",
      title: "White & Brass Kitchen",
      category: "Residential",
      image: "images/kitchen.jpg",
      likes: 459,
      views: 2650,
      date: "Jan 2025",
      style: "Modern Luxury",
      area: "24 m²",
      year: "2024",
      location: "London, UK",
      tools: "3ds Max · Corona · Photoshop",
      tags: ["kitchen", "marble", "3d visualization", "luxury interior"],
      description:
        "A bright, handleless kitchen where matte white cabinets disappear into the light and brass details add a quiet note of luxury. Quartz counters and a marble splash keep it practical."
    },
    {
      id: "restaurant",
      title: "Amber Café & Restaurant",
      category: "Commercial",
      image: "images/restaurant.jpg",
      likes: 603,
      views: 4015,
      date: "Nov 2024",
      style: "Industrial Warm",
      area: "120 m²",
      year: "2024",
      location: "Prague, CZ",
      tools: "3ds Max · Corona · Photoshop",
      tags: ["restaurant", "cafe", "commercial interior", "lighting study"],
      description:
        "An evening-focused dining concept in amber tones: backlit bar shelving, walnut and leather seating, and layered pendant light that makes the room glow as night falls."
    },
    {
      id: "christmas",
      title: "Christmas in the City",
      category: "Residential",
      image: "images/christmas.jpg",
      likes: 276,
      views: 1730,
      date: "Dec 2024",
      style: "Contemporary",
      area: "40 m²",
      year: "2024",
      location: "Vienna, AT",
      tools: "3ds Max · Corona · Photoshop",
      tags: ["christmas", "seasonal", "lighting", "living room"],
      description:
        "A seasonal study of warmth — fairy lights, a lit fireplace and snow falling outside the window. Built to show how light and decoration can completely change the mood of the same room."
    }
  ];

  const likedProjects = new Set(JSON.parse(localStorage.getItem("likedProjects") || "[]"));

  /* ---------------- Helpers ---------------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const fmt = (n) => n.toLocaleString("en-US");

  function toast(msg, icon) {
    const wrap = $("#toasts");
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML =
      '<svg class="icon"><use href="#' + (icon || "i-check") + '"/></svg><span></span>';
    el.querySelector("span").textContent = msg;
    wrap.appendChild(el);
    setTimeout(() => el.classList.add("out"), 2600);
    setTimeout(() => el.remove(), 3100);
  }

  /* ---------------- Theme ---------------- */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }

  $("#themeToggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ---------------- Top bar / nav ---------------- */
  const topbar = $("#topbar");
  const toTop = $("#toTop");
  const navLinks = $$(".nav a");

  window.addEventListener("scroll", () => {
    topbar.classList.toggle("scrolled", window.scrollY > 10);
    toTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const nav = $("#nav");
  $("#navBurger").addEventListener("click", () => nav.classList.toggle("open"));
  navLinks.forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );

  // scrollspy
  const sections = ["projects", "services", "about", "contact"]
    .map((id) => document.getElementById(id));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navLinks.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id)
          );
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => s && spy.observe(s));

  /* ---------------- Follow button ---------------- */
  const followBtn = $("#followBtn");
  const followLabel = $("#followLabel");
  followBtn.addEventListener("click", () => {
    const on = followBtn.classList.toggle("following");
    followBtn.setAttribute("aria-pressed", on);
    followLabel.textContent = on ? "Following" : "Follow";
    toast(on ? "You are now following " + AUTHOR + "!" : "Unfollowed " + AUTHOR, on ? "i-check" : "i-x");
  });

  /* ---------------- Projects grid ---------------- */
  const grid = $("#projectGrid");
  const emptyMsg = $("#emptyMsg");
  const filtersEl = $("#filters");
  const searchInput = $("#projectSearch");
  let activeFilter = "All";
  let visibleProjects = PROJECTS.slice();

  function matches(p) {
    const q = (searchInput.value || "").trim().toLowerCase();
    const byFilter = activeFilter === "All" || p.category === activeFilter;
    const byQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.style.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return byFilter && byQuery;
  }

  function renderGrid(animate) {
    visibleProjects = PROJECTS.filter(matches);
    emptyMsg.hidden = visibleProjects.length > 0;

    grid.innerHTML = visibleProjects
      .map(
        (p, i) => `
      <article class="project-card reveal${animate ? "" : " visible"}" data-index="${i}" tabindex="0"
               role="button" aria-label="Open project: ${p.title}">
        <div class="project-media">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
          <div class="project-overlay"><span class="pill">View project</span></div>
        </div>
        <div class="project-info">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-author">by ${AUTHOR}</p>
          <div class="project-stats">
            <span class="stat-item"><svg class="icon"><use href="#i-heart"/></svg>${fmt(likedProjects.has(p.id) ? p.likes + 1 : p.likes)}</span>
            <span class="stat-item"><svg class="icon"><use href="#i-eye"/></svg>${fmt(p.views)}</span>
          </div>
        </div>
      </article>`
      )
      .join("");

    if (animate) observeReveals();
  }

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    $$(".filter-btn", filtersEl).forEach((b) => b.classList.toggle("active", b === btn));
    renderGrid(true);
  });

  let searchTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => renderGrid(true), 160);
  });

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    if (card) openModal(+card.dataset.index);
  });
  grid.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const card = e.target.closest(".project-card");
      if (card) {
        e.preventDefault();
        openModal(+card.dataset.index);
      }
    }
  });

  /* ---------------- Modal ---------------- */
  const modal = $("#modal");
  const mImg = $("#mImg");
  const mCat = $("#mCat");
  const mTitle = $("#mTitle");
  const mDate = $("#mDate");
  const mLikes = $("#mLikes");
  const mViews = $("#mViews");
  const mLike = $("#mLike");
  const mDesc = $("#mDesc");
  const mMeta = $("#mMeta");
  const mTags = $("#mTags");
  let modalIndex = 0;
  let lastFocused = null;

  function currentProject() {
    return visibleProjects[modalIndex];
  }

  function fillModal() {
    const p = currentProject();
    if (!p) return;
    mImg.src = p.image;
    mImg.alt = p.title;
    mCat.textContent = p.category;
    mTitle.textContent = p.title;
    mDate.textContent = p.date;
    mLikes.textContent = fmt(likedProjects.has(p.id) ? p.likes + 1 : p.likes);
    mViews.textContent = fmt(p.views);
    mLike.classList.toggle("liked", likedProjects.has(p.id));
    mDesc.textContent = p.description;
    mMeta.innerHTML = [
      ["Style", p.style],
      ["Area", p.area],
      ["Year", p.year],
      ["Location", p.location],
      ["Tools", p.tools]
    ]
      .map(([dt, dd]) => `<div><dt>${dt}</dt><dd>${dd}</dd></div>`)
      .join("");
    mTags.innerHTML = p.tags.map((t) => `<span class="chip">#${t}</span>`).join("");
    mTitle.setAttribute("aria-hidden", "false");
  }

  function openModal(index) {
    modalIndex = index;
    lastFocused = document.activeElement;
    fillModal();
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $(".modal-close", modal).focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function stepModal(dir) {
    if (!visibleProjects.length) return;
    modalIndex = (modalIndex + dir + visibleProjects.length) % visibleProjects.length;
    fillModal();
    // subtle slide feedback
    mImg.style.transition = "none";
    mImg.style.opacity = "0.2";
    requestAnimationFrame(() => {
      mImg.style.transition = "opacity 0.25s ease";
      mImg.style.opacity = "1";
    });
  }

  $("#mPrev").addEventListener("click", () => stepModal(-1));
  $("#mNext").addEventListener("click", () => stepModal(1));
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") stepModal(-1);
    if (e.key === "ArrowRight") stepModal(1);
  });

  mLike.addEventListener("click", () => {
    const p = currentProject();
    if (!p) return;
    if (likedProjects.has(p.id)) likedProjects.delete(p.id);
    else likedProjects.add(p.id);
    localStorage.setItem("likedProjects", JSON.stringify([...likedProjects]));
    mLikes.textContent = fmt(likedProjects.has(p.id) ? p.likes + 1 : p.likes);
    mLike.classList.toggle("liked", likedProjects.has(p.id));
    // keep the grid card in sync
    const card = grid.querySelector(`.project-card[data-index="${modalIndex}"] .stat-item`);
    if (card) card.lastChild.textContent = " " + fmt(likedProjects.has(p.id) ? p.likes + 1 : p.likes);
  });

  $("#mShare").addEventListener("click", () => {
    const p = currentProject();
    const url = location.origin + location.pathname + "#" + (p ? p.id : "");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        () => toast("Project link copied to clipboard!"),
        () => toast("Link: " + url, "i-share")
      );
    } else {
      toast("Link: " + url, "i-share");
    }
  });

  $("#mHire").addEventListener("click", () => {
    const p = currentProject();
    closeModal();
    const type = $("#cfType");
    if (p) {
      const match =
        p.category === "Office"
          ? "Something else"
          : p.tags.includes("3d visualization") || p.tags.includes("3d render")
            ? "3D Visualization"
            : "Interior Design";
      const opt = Array.from(type.options).find((o) => o.text === match);
      if (opt) type.value = opt.text;
    }
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------------- Contact form ---------------- */
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#cfName");
    const email = $("#cfEmail");
    const msg = $("#cfMsg");
    if (!name.value.trim() || !email.value.trim() || !msg.value.trim()) {
      toast("Please fill in your name, email and message.", "i-x");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      toast("Please enter a valid email address.", "i-x");
      email.focus();
      return;
    }
    e.target.reset();
    toast("Thanks, " + name.value.trim() + "! Your message has been sent. (demo)");
  });

  /* ---------------- CV button ---------------- */
  $("#cvBtn").addEventListener("click", () =>
    toast("CV download is a placeholder in this demo.", "i-download")
  );

  /* ---------------- Counters ---------------- */
  function animateCount(el) {
    const target = +el.dataset.count;
    const dur = 1400;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const statsObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          $$(".stat-num", e.target).forEach(animateCount);
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  const statsEl = $("#stats");
  if (statsEl) statsObserver.observe(statsEl);

  /* ---------------- Skill bars ---------------- */
  const barObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          $$(".bar-fill", e.target).forEach((bar) => {
            bar.style.width = bar.dataset.level + "%";
          });
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.35 }
  );
  const skillCard = $(".skill-card");
  if (skillCard) barObserver.observe(skillCard);

  /* ---------------- Reveal on scroll ---------------- */
  let revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );

  function observeReveals() {
    // re-observe all currently hidden .reveal elements
    $$(".reveal:not(.visible)").forEach((el) => revealObserver.observe(el));
  }

  /* ---------------- Init ---------------- */
  renderGrid(true);
  observeReveals();
})();
