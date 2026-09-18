const root = document.documentElement;
const hero = document.querySelector("[data-hero]");
const aiStackSection = document.querySelector(".ai-stack-section");
const aiStackVideo = document.querySelector(".ai-stack-video");
const servicePillarGroups = document.querySelectorAll("[data-service-pillars]");
const interactiveItems = document.querySelectorAll(
  ".button, .icon-button, .glass-card, .stats-row div, .case-card, .industry-stage, .industry-tile, .note-card, .note-feature, .note-row, .reason-visual, .solve-panels, .service-pillar, .partner-status-item, .partner-stack-row, .partner-proof-card, .partner-lead-card"
);
const desktopQuery = window.matchMedia("(min-width: 981px)");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let aiStackVideoFrame;

const aiStackVideoState = {
  isReady: false,
  isHovering: false,
  isSeeking: false,
  duration: 0,
  targetTime: 0,
  smoothTime: 0
};

function updateMenuAnchor(item) {
  const trigger = item.querySelector(".nav-trigger");
  const menu = item.querySelector(".compact-menu, .services-list-menu");
  const header = item.closest(".site-header");

  if (!trigger || !menu || !header) return;

  const triggerRect = trigger.getBoundingClientRect();
  const headerRect = header.getBoundingClientRect();
  const menuWidth = menu.offsetWidth || 300;
  const padding = 16;
  const center = triggerRect.left - headerRect.left + triggerRect.width / 2;
  const min = menuWidth / 2 + padding;
  const max = headerRect.width - menuWidth / 2 - padding;
  const anchoredCenter = Math.max(min, Math.min(center, max));

  item.style.setProperty("--menu-x", `${anchoredCenter}px`);
}

function setPointerVars(event, target = root) {
  const rect = target === root ? { left: 0, top: 0, width: innerWidth, height: innerHeight } : target.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  target.style.setProperty("--mx", `${x}%`);
  target.style.setProperty("--my", `${y}%`);
  target.style.setProperty("--shine-x", `${x}%`);
  target.style.setProperty("--shine-y", `${y}%`);
  if (target === root) {
    target.style.setProperty("--tilt-x", ((x - 50) / 50).toFixed(3));
    target.style.setProperty("--tilt-y", ((y - 50) / 50).toFixed(3));
  }
}

function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  const progress = scrollable > 0 ? (scrollY / scrollable) * 100 : 0;
  root.style.setProperty("--scroll", `${progress}%`);
}

function playAiStackVideoForward() {
  if (!aiStackVideo || !aiStackVideo.paused) return;

  aiStackVideo.loop = true;
  aiStackVideo.playbackRate = 1;
  aiStackVideo.play().catch(() => {});
}

function driveAiStackVideo() {
  if (!aiStackVideo || !aiStackVideoState.isReady || aiStackVideoState.duration <= 0) {
    aiStackVideoFrame = requestAnimationFrame(driveAiStackVideo);
    return;
  }

  if (aiStackVideoState.isHovering) {
    if (!aiStackVideo.paused) aiStackVideo.pause();
    aiStackVideoState.smoothTime += (aiStackVideoState.targetTime - aiStackVideoState.smoothTime) * 0.09;
    aiStackVideoState.smoothTime = Math.min(Math.max(aiStackVideoState.smoothTime, 0), aiStackVideoState.duration);

    if (!aiStackVideoState.isSeeking) {
      aiStackVideo.currentTime = aiStackVideoState.smoothTime;
    }
  } else {
    aiStackVideoState.smoothTime = aiStackVideo.currentTime;
    playAiStackVideoForward();
  }

  aiStackVideoFrame = requestAnimationFrame(driveAiStackVideo);
}

function setAiStackVideoTarget(event) {
  if (!aiStackSection || !aiStackVideo || !aiStackVideoState.isReady || aiStackVideoState.duration <= 0) return;

  const progress = Math.min(Math.max(event.clientX / window.innerWidth, 0), 1);

  aiStackVideoState.targetTime = progress * aiStackVideoState.duration;
  aiStackVideoState.isHovering = true;
}

if (hero) {
  hero.addEventListener("pointermove", (event) => setPointerVars(event, root));
}

if (aiStackVideo && aiStackSection) {
  const startAiStackVideo = () => {
    aiStackVideoState.isReady = true;
    aiStackVideoState.duration = aiStackVideo.duration;
    aiStackVideoState.smoothTime = aiStackVideo.currentTime;
    playAiStackVideoForward();
    if (!aiStackVideoFrame) {
      aiStackVideoFrame = requestAnimationFrame(driveAiStackVideo);
    }
  };

  aiStackVideo.addEventListener("loadedmetadata", () => {
    aiStackVideoState.duration = aiStackVideo.duration;
  });

  aiStackVideo.addEventListener("seeking", () => {
    aiStackVideoState.isSeeking = true;
  });

  aiStackVideo.addEventListener("seeked", () => {
    aiStackVideoState.isSeeking = false;
  });

  ["canplaythrough", "canplay"].forEach((eventName) => {
    aiStackVideo.addEventListener(eventName, () => {
      if (!aiStackVideoState.isReady) {
        startAiStackVideo();
      }
    });
  });

  if (aiStackVideo.readyState >= 3) {
    startAiStackVideo();
  }

  aiStackSection.addEventListener("pointermove", setAiStackVideoTarget);
  aiStackSection.addEventListener("pointerleave", () => {
    aiStackVideoState.isHovering = false;
  });
}

interactiveItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => setPointerVars(event, item));
});

servicePillarGroups.forEach((group) => {
  const pillars = group.querySelectorAll(".service-pillar");

  const setActivePillar = (activePillar) => {
    group.classList.add("has-active");
    pillars.forEach((pillar) => {
      pillar.classList.toggle("is-active", pillar === activePillar);
    });
  };

  pillars.forEach((pillar) => {
    pillar.addEventListener("pointerenter", () => setActivePillar(pillar));
    pillar.addEventListener("focusin", () => setActivePillar(pillar));
  });

  group.addEventListener("pointerleave", () => {
    const buildPillar = group.querySelector('[data-pillar="build"]');
    if (buildPillar) setActivePillar(buildPillar);
  });

  const buildPillar = group.querySelector('[data-pillar="build"]');
  if (buildPillar) setActivePillar(buildPillar);
});

// "What we solve" — selectable list drives the cross-fading detail panel.
const solveModule = document.querySelector("[data-solve]");
if (solveModule) {
  const solveItems = solveModule.querySelectorAll(".solve-item");
  const solvePanels = solveModule.querySelectorAll(".solve-panel");

  const setActiveSolve = (key) => {
    solveItems.forEach((item) => {
      const on = item.dataset.solveItem === key;
      item.classList.toggle("is-active", on);
      item.setAttribute("aria-selected", on ? "true" : "false");
    });
    solvePanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.solvePanel === key);
    });
  };

  solveItems.forEach((item) => {
    item.addEventListener("pointerenter", () => setActiveSolve(item.dataset.solveItem));
    item.addEventListener("focusin", () => setActiveSolve(item.dataset.solveItem));
    item.addEventListener("click", () => setActiveSolve(item.dataset.solveItem));
  });
}

// Outcome Picker (archived "Composed around you") — click-driven tabs, unlike
// .solve-item's hover-preview above: a real tablist, so it also answers the
// left/right arrow keys per the ARIA tabs pattern.
const composePicker = document.querySelector("[data-compose]");
if (composePicker) {
  const tabs = [...composePicker.querySelectorAll(".compose-picker-tab")];
  const panels = composePicker.querySelectorAll(".compose-picker-panel");
  const artLayers = composePicker.querySelectorAll(".compose-picker-art-layer");

  // Each panel carries its own ledger list, pre-marked .is-active on the rows
  // that outcome uses — no per-row toggling needed, only which panel shows.
  const setActiveCompose = (key) => {
    tabs.forEach((tab) => {
      const on = tab.dataset.composeTab === key;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.composePanel === key));
    artLayers.forEach((layer) => layer.classList.toggle("is-active", layer.dataset.composeArt === key));
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => setActiveCompose(tab.dataset.composeTab));
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const next = tabs[(index + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      setActiveCompose(next.dataset.composeTab);
    });
  });
}

addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

function initNav() {
  const menuButton = document.querySelector(".menu-button");
  const navItems = document.querySelectorAll(".nav-item.has-mega");
  let closeTimer;

  if (menuButton) {
    menuButton.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("menu-open");
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      menuButton.innerHTML = `<i class="${isOpen ? "ri-close-line" : "ri-menu-line"}" aria-hidden="true"></i>`;
      if (!isOpen) {
        navItems.forEach((item) => {
          item.classList.remove("is-open", "is-hovered");
          item.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  navItems.forEach((item) => {
    const trigger = item.querySelector(".nav-trigger");

    item.addEventListener("pointerenter", () => {
      if (!desktopQuery.matches) return;
      clearTimeout(closeTimer);
      updateMenuAnchor(item);
      navItems.forEach((otherItem) => {
        if (otherItem === item) return;
        otherItem.classList.remove("is-hovered", "is-open");
        otherItem.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
      });
      item.classList.add("is-hovered");
      trigger?.setAttribute("aria-expanded", "true");
    });

    item.addEventListener("pointerleave", () => {
      if (!desktopQuery.matches) return;
      closeTimer = setTimeout(() => {
        item.classList.remove("is-hovered", "is-open");
        trigger?.setAttribute("aria-expanded", "false");
      }, 140);
    });

    trigger?.addEventListener("click", (event) => {
      if (trigger.matches("a[href]")) return;
      event.preventDefault();
      updateMenuAnchor(item);
      const shouldOpen = !item.classList.contains("is-open");
      navItems.forEach((otherItem) => {
        otherItem.classList.remove("is-open", "is-hovered");
        otherItem.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("is-open", shouldOpen);
      trigger.setAttribute("aria-expanded", String(shouldOpen));
    });
  });

  addEventListener("resize", () => {
    updateScrollProgress();
    navItems.forEach(updateMenuAnchor);
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".site-header")) return;
    navItems.forEach((item) => {
      item.classList.remove("is-open", "is-hovered");
      item.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-label", "Open navigation");
    if (menuButton) menuButton.innerHTML = '<i class="ri-menu-line" aria-hidden="true"></i>';
    navItems.forEach((item) => {
      item.classList.remove("is-open", "is-hovered");
      item.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
    });
  });

  navItems.forEach(updateMenuAnchor);
}

async function loadNav() {
  const placeholder = document.getElementById("site-nav");
  if (!placeholder) {
    initNav();
    return;
  }
  try {
    const scriptSrc = document.querySelector('script[src*="script.js"]')?.src || "";
    const root = scriptSrc ? scriptSrc.replace(/script\.js.*$/, "") : "";
    const res = await fetch(root + "components/nav.html");
    const html = await res.text();

    const temp = document.createElement("div");
    temp.innerHTML = html;

    const isRelative = (url) => url && !url.match(/^(https?:|#|mailto:|tel:|\/)/);
    temp.querySelectorAll("a[href]").forEach(el => {
      const href = el.getAttribute("href");
      if (isRelative(href)) el.setAttribute("href", root + href);
    });
    temp.querySelectorAll("img[src]").forEach(el => {
      const src = el.getAttribute("src");
      if (isRelative(src)) el.setAttribute("src", root + src);
    });

    placeholder.replaceWith(temp.firstElementChild);
  } catch (e) {
    console.warn("Could not load nav component:", e);
  }
  initNav();
}

loadNav();

function setStatFinalValue(stat) {
  stat.textContent = `${stat.dataset.statValue}${stat.dataset.statSuffix || ""}`;
}

function animateStat(stat, index) {
  const target = Number(stat.dataset.statValue);
  const suffix = stat.dataset.statSuffix || "";

  if (!Number.isFinite(target) || reducedMotionQuery.matches) {
    setStatFinalValue(stat);
    return;
  }

  const duration = 980 + index * 120;
  const start = performance.now();

  function tick(now) {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 4);
    const value = Math.round(target * eased);
    stat.textContent = `${value}${suffix}`;

    if (elapsed < 1) {
      requestAnimationFrame(tick);
    } else {
      setStatFinalValue(stat);
    }
  }

  stat.textContent = `0${suffix}`;
  requestAnimationFrame(tick);
}

function animateStats(section) {
  if (section.dataset.statsAnimated === "true") return;
  const stats = section.querySelectorAll("[data-stat-value]");
  stats.forEach((stat, index) => animateStat(stat, index));
  section.dataset.statsAnimated = "true";
}

const industryLab = document.querySelector("[data-industry-lab]");

if (industryLab) {
  const tabs = industryLab.querySelectorAll(".industry-tab");
  const photo = industryLab.querySelector("[data-industry-photo]");
  const title = industryLab.querySelector("[data-industry-title]");
  const copy = industryLab.querySelector("[data-industry-copy]");
  const meta = industryLab.querySelector("[data-industry-meta]");
  const link = industryLab.querySelector("[data-industry-link]");

  function activateIndustry(tab) {
    tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    if (photo) photo.className = `industry-stage-photo ${tab.dataset.visual}`;
    if (title) title.textContent = tab.dataset.title;
    if (copy) copy.textContent = tab.dataset.copy;
    if (meta) meta.textContent = tab.dataset.meta;
    if (link) link.setAttribute("href", tab.dataset.href);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("mouseenter", () => activateIndustry(tab));
    tab.addEventListener("focus", () => activateIndustry(tab));
    tab.addEventListener("click", () => activateIndustry(tab));
  });
}

// Hero background videos (services + partner pages) use the .services-hero-video class.
// Some source files carry an audio track, which the browser can refuse to autoplay
// even when the markup says muted — so force muted playback explicitly here.
document.querySelectorAll(".services-hero-video").forEach((video) => {
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");
  if (reducedMotionQuery.matches) return;
  const start = () => video.play().catch(() => {});
  start();
  video.addEventListener("loadeddata", start, { once: true });
  video.addEventListener("canplay", start, { once: true });
});


// Customer Stories (work page): multi-select Industry + Service checkbox
// facets, live search, and pagination over the full story library.
const storyGrid = document.querySelector("[data-story-grid]");

if (storyGrid) {
  const cards = Array.from(storyGrid.querySelectorAll(".story-card"));
  const searchInput = document.querySelector("[data-story-search]");
  const checkboxes = Array.from(document.querySelectorAll(".story-sidebar [data-facet]"));
  const clearButton = document.querySelector("[data-story-clear]");
  const emptyState = document.querySelector("[data-story-empty]");
  const pager = document.querySelector("[data-story-pager]");
  const section = storyGrid.closest(".work-customers-section");
  const PER_PAGE = 8;
  let currentPage = 1;

  const selectedValues = (facet) =>
    checkboxes.filter((box) => box.dataset.facet === facet && box.checked).map((box) => box.value);

  const getMatches = () => {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const industries = selectedValues("industry");
    const services = selectedValues("service");

    return cards.filter((card) => {
      const cardIndustries = (card.dataset.industries || "").split(" ");
      const cardServices = (card.dataset.services || "").split(" ");
      // OR within a facet group, AND across the two groups, AND the search.
      const okIndustry = industries.length === 0 || industries.some((value) => cardIndustries.includes(value));
      const okService = services.length === 0 || services.some((value) => cardServices.includes(value));
      const okQuery = !query || card.textContent.toLowerCase().includes(query);
      return okIndustry && okService && okQuery;
    });
  };

  const updateClearButton = () => {
    if (!clearButton) return;
    const hasFilters = checkboxes.some((box) => box.checked) || (searchInput?.value || "").trim() !== "";
    clearButton.hidden = !hasFilters;
  };

  const goToPage = (page, scroll) => {
    currentPage = page;
    render();
    if (scroll && section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const buildPager = (totalPages) => {
    pager.innerHTML = "";
    if (totalPages <= 1) return;

    const addButton = (label, page, { active, disabled, ariaLabel } = {}) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "story-page-btn" + (active ? " is-active" : "");
      button.innerHTML = label;
      if (disabled) button.disabled = true;
      if (ariaLabel) button.setAttribute("aria-label", ariaLabel);
      if (active) button.setAttribute("aria-current", "page");
      if (!disabled) button.addEventListener("click", () => goToPage(page, true));
      pager.appendChild(button);
    };

    const addEllipsis = () => {
      const span = document.createElement("span");
      span.className = "story-page-ellipsis";
      span.textContent = "…";
      pager.appendChild(span);
    };

    addButton('<i class="ri-arrow-left-s-line" aria-hidden="true"></i>', currentPage - 1, {
      disabled: currentPage === 1,
      ariaLabel: "Previous page"
    });

    const pages = [];
    for (let page = 1; page <= totalPages; page += 1) {
      if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
        pages.push(page);
      } else if (pages[pages.length - 1] !== "ellipsis") {
        pages.push("ellipsis");
      }
    }
    pages.forEach((page) =>
      page === "ellipsis" ? addEllipsis() : addButton(String(page), page, { active: page === currentPage })
    );

    addButton('<i class="ri-arrow-right-s-line" aria-hidden="true"></i>', currentPage + 1, {
      disabled: currentPage === totalPages,
      ariaLabel: "Next page"
    });
  };

  const render = () => {
    const matches = getMatches();
    const totalPages = Math.max(1, Math.ceil(matches.length / PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * PER_PAGE;
    const pageCards = new Set(matches.slice(start, start + PER_PAGE));
    cards.forEach((card) => card.classList.toggle("is-hidden", !pageCards.has(card)));

    if (emptyState) emptyState.hidden = matches.length > 0;
    buildPager(totalPages);
  };

  // Accordion groups: expand/collapse + per-group selected-count badge
  const accordionGroups = Array.from(document.querySelectorAll(".story-sidebar [data-acc-group]"));

  accordionGroups.forEach((group) => {
    const header = group.querySelector("[data-acc-toggle]");
    header?.addEventListener("click", () => {
      const isOpen = group.classList.toggle("is-open");
      header.setAttribute("aria-expanded", String(isOpen));
    });
  });

  const updateGroupBadges = () => {
    accordionGroups.forEach((group) => {
      const badge = group.querySelector("[data-acc-count]");
      const count = group.querySelectorAll("[data-facet]:checked").length;
      if (badge) {
        badge.textContent = String(count);
        badge.hidden = count === 0;
      }
    });
  };

  const resetAndRender = () => {
    updateClearButton();
    updateGroupBadges();
    goToPage(1, false);
  };

  searchInput?.addEventListener("input", resetAndRender);
  checkboxes.forEach((box) => box.addEventListener("change", resetAndRender));
  clearButton?.addEventListener("click", () => {
    checkboxes.forEach((box) => (box.checked = false));
    if (searchInput) searchInput.value = "";
    resetAndRender();
  });

  updateClearButton();
  updateGroupBadges();
  render();
}

// Testimonials (work page): stacked-card carousel, mouse-cycled, infinite loop.
const testimonialStack = document.querySelector("[data-testimonial-stack]");

if (testimonialStack) {
  const cards = Array.from(testimonialStack.querySelectorAll(".testimonial-card"));
  const dotsWrap = document.querySelector("[data-testimonial-dots]");
  const prevButton = document.querySelector("[data-testimonial-prev]");
  const nextButton = document.querySelector("[data-testimonial-next]");
  const count = cards.length;
  let front = 0;

  const goTo = (index) => {
    front = ((index % count) + count) % count;
    cards.forEach((card, i) => {
      card.dataset.pos = String((i - front + count) % count);
    });
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === front));
  };

  // Build the dot indicators
  const dots = cards.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "testimonial-dot";
    dot.setAttribute("aria-label", `Testimonial ${index + 1}`);
    dot.addEventListener("click", (event) => {
      event.stopPropagation();
      goTo(index);
    });
    dotsWrap?.appendChild(dot);
    return dot;
  });

  nextButton?.addEventListener("click", () => goTo(front + 1));
  prevButton?.addEventListener("click", () => goTo(front - 1));
  // Click the deck: right-side cards (pos < count/2) advance, left-side cards go back.
  testimonialStack.addEventListener("click", (event) => {
    const card = event.target.closest(".testimonial-card");
    if (!card) return;
    const pos = Number(card.dataset.pos);
    if (pos === 0) return;
    if (pos > count / 2) goTo(front - 1);
    else goTo(front + 1);
  });

  goTo(0);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        if (entry.target.classList.contains("focus-section")) {
          animateStats(entry.target);
        }
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".stats-row div").forEach((item, index) => {
  item.style.setProperty("--stat-index", index);
});

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
