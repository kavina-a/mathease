/**
 * Kavina — Math Tutor Portfolio
 * Client-side animation module — GSAP + Lenis (npm)
 * Called once from app/page.jsx inside useEffect.
 */

export function initAnimations() {
  // Dynamic imports ensure this code only ever runs in the browser
  return (async () => {
    const gsapMod = await import("gsap");
    const gsap = gsapMod.default ?? gsapMod.gsap ?? gsapMod;
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    const LenisMod = await import("lenis");
    const Lenis = LenisMod.default ?? LenisMod.Lenis ?? LenisMod;

    gsap.registerPlugin(ScrollTrigger);

    const IS_TOUCH = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const SECTIONS = document.querySelectorAll(".section");
    const DOTS = document.querySelectorAll(".dot-nav .dot");

    let lenis;

    /* ══════════════════════════════════════════════════════════
       1. PAGE LOADER — REMOVED (instant start)
       ══════════════════════════════════════════════════════════ */
    function initLoader() {
      // Loader removed - animations start immediately
      initLenis();
      initHeroAnimations();
      initScrollAnimations();
      initReviews();
      initWaCloud();
      if (!IS_TOUCH) {
        initCustomCursor();
        initMagneticButton();
      }
    }

    initLoader();

    /* ══════════════════════════════════════════════════════════
       2. LENIS SMOOTH SCROLL
       ══════════════════════════════════════════════════════════ */
    function initLenis() {
      lenis = new Lenis({
        lerp: 0.05,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.5,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      DOTS.forEach((dot) => {
        dot.addEventListener("click", (e) => {
          e.preventDefault();
          const target = document.querySelector(dot.getAttribute("href"));
          if (target) lenis.scrollTo(target, { offset: 0, duration: 1.5 });
        });
      });
    }

    /* ══════════════════════════════════════════════════════════
       3. CUSTOM CURSOR
       ══════════════════════════════════════════════════════════ */
    function initCustomCursor() {
      const cursor = document.querySelector(".cursor");
      const follower = document.querySelector(".cursor-follower");
      let mouseX = 0,
        mouseY = 0,
        cursorX = 0,
        cursorY = 0,
        followerX = 0,
        followerY = 0;

      document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      gsap.ticker.add(() => {
        cursorX += (mouseX - cursorX) * 0.25;
        cursorY += (mouseY - cursorY) * 0.25;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        gsap.set(cursor, { x: cursorX, y: cursorY });
        gsap.set(follower, { x: followerX, y: followerY });
      });

      const interactives = document.querySelectorAll(
        "a, button, .chapter-card, .cta-button, .chat-card, .hero-btn, .hero-sym",
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursor.classList.add("is-hover");
          follower.classList.add("is-hover");
        });
        el.addEventListener("mouseleave", () => {
          cursor.classList.remove("is-hover");
          follower.classList.remove("is-hover");
        });
      });
    }

    /* ══════════════════════════════════════════════════════════
       4. HERO ENTRANCE ANIMATIONS + PROXIMITY REPEL
       ══════════════════════════════════════════════════════════ */
    function initHeroAnimations() {
      const tl = gsap.timeline({ delay: 0.15 });

      /* Brand name */
      tl.to(".hero-brand__line", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      })
        .to(
          ".hero-subtitle",
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.5",
        )
        .to(
          ".hero-top",
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.4",
        )
        .to(
          ".hero-hook",
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.25",
        )
        .to(
          ".hero-actions",
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        )
        .from(
          ".hero-actions .free-sticker",
          { 
            scale: 0, 
            rotation: -20,
            duration: 0.5, 
            ease: "elastic.out(1, 0.5)" 
          },
          "-=0.3",
        )
        .to(
          ".hero-proof",
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.25",
        )
        .from(
          ".hero-proof__tag",
          {
            scale: 0,
            rotation: -12,
            duration: 0.45,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.35",
        )
        .to(
          ".hero-trust",
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.25",
        )
        .to(
          ".scroll-indicator",
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        )
        .to(
          ".dot-nav",
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        );

      /* ── Symbol pop-in ───────────────────────────────────── */
      const symbols = document.querySelectorAll(".hero-sym");

      /* ── Mobile: lay out smaller in-viewport symbols ─────── */
      if (isHeroMobile()) {
        layoutMobileHeroSymbols(symbols);
      }

      symbols.forEach((sym) => {
        const d =
          parseFloat(
            getComputedStyle(sym).getPropertyValue("--float-delay"),
          ) || 0;
        const baseRot = parseFloat(sym.dataset.rot) || 0;

        gsap.to(sym, {
          opacity: 1,
          scale: 1,
          rotation: baseRot,
          duration: isHeroMobile() ? 0.75 : 1.1,
          delay: 0.25 + d,
          ease: isHeroMobile() ? "back.out(1.6)" : "elastic.out(1, 0.5)",
        });
      });

      /* ── Mobile: particle drift after pop-in ─────────────── */
      if (isHeroMobile()) {
        gsap.delayedCall(1.1, () => startMobileParticleDrift(symbols));
      }

      /* ── Per-symbol cursor repel (desktop only) ─────────── */
      if (!isHeroMobile()) {
        const heroEl = document.getElementById("hero");
        const symStates = Array.from(symbols).map((sym) => ({
          el: sym,
          baseRot: parseFloat(sym.dataset.rot) || 0,
          active: false,
          home: null,
        }));

        const TOUCH_IN = 28;
        const TOUCH_OUT = 52;

        function distToRect(x, y, rect) {
          const cx = Math.max(rect.left, Math.min(x, rect.right));
          const cy = Math.max(rect.top, Math.min(y, rect.bottom));
          const dx = x - cx;
          const dy = y - cy;
          return Math.sqrt(dx * dx + dy * dy);
        }

        function cacheHomeRects() {
          symStates.forEach((sd) => {
            sd.home = getHomeRect(sd.el);
          });
        }

        function getHomeRect(sym) {
          const container = sym.parentElement;
          if (!container) return null;

          const cRect = container.getBoundingClientRect();
          const leftPct = parseFloat(sym.style.left) / 100;
          const topPct = parseFloat(sym.style.top) / 100;
          const w = sym.offsetWidth || parseFloat(sym.style.width) || 0;
          let h = sym.offsetHeight;
          if (!h && sym.naturalWidth && sym.naturalHeight) {
            h = w * (sym.naturalHeight / sym.naturalWidth);
          }
          if (!h) h = w;

          const left = cRect.left + leftPct * cRect.width;
          const top = cRect.top + topPct * cRect.height;

          return {
            left,
            top,
            right: left + w,
            bottom: top + h,
          };
        }

        function pushSymbol(sd, clientX, clientY) {
          const rect = sd.home;
          if (!rect) return;

          const cx = (rect.left + rect.right) / 2;
          const cy = (rect.top + rect.bottom) / 2;
          const dx = clientX - cx;
          const dy = clientY - cy;
          const angle = Math.atan2(dy, dx);
          const pushDist = 60 + Math.random() * 40;
          const pushRot = (dx > 0 ? -1 : 1) * (8 + Math.random() * 6);

          gsap.to(sd.el, {
            x: -Math.cos(angle) * pushDist,
            y: -Math.sin(angle) * pushDist,
            rotation: sd.baseRot + pushRot,
            duration: 0.4,
            ease: "power3.out",
            overwrite: true,
          });
        }

        function resetSymbol(sd) {
          gsap.to(sd.el, {
            x: 0,
            y: 0,
            rotation: sd.baseRot,
            duration: 1.2,
            ease: "elastic.out(1, 0.35)",
            overwrite: true,
          });
        }

        function handlePointerMove(clientX, clientY) {
          symStates.forEach((sd) => {
            if (!sd.home) return;

            const dist = distToRect(clientX, clientY, sd.home);

            if (!sd.active && dist <= TOUCH_IN) {
              sd.active = true;
              pushSymbol(sd, clientX, clientY);
            } else if (sd.active && dist > TOUCH_OUT) {
              sd.active = false;
              resetSymbol(sd);
            }
          });
        }

        function resetAllSymbols() {
          symStates.forEach((sd) => {
            if (!sd.active) return;
            sd.active = false;
            resetSymbol(sd);
          });
        }

        /* Cache resting positions once symbols have popped in */
        Promise.all(
          Array.from(symbols).map(
            (sym) =>
              new Promise((resolve) => {
                if (sym.complete) resolve();
                else {
                  sym.addEventListener("load", resolve, { once: true });
                  sym.addEventListener("error", resolve, { once: true });
                }
              }),
          ),
        ).then(() => {
          requestAnimationFrame(cacheHomeRects);
        });
        gsap.delayedCall(1.4, cacheHomeRects);
        window.addEventListener("resize", cacheHomeRects);

        heroEl.addEventListener("mousemove", (e) => {
          if (!symStates[0]?.home) cacheHomeRects();
          handlePointerMove(e.clientX, e.clientY);
        });
        heroEl.addEventListener("mouseleave", resetAllSymbols);
      }
    }

    function isHeroMobile() {
      return window.matchMedia("(max-width: 768px)").matches;
    }

    function layoutMobileHeroSymbols(symbols) {
      const container = document.querySelector(".hero-symbols");
      if (!container) return;

      container.classList.add("hero-symbols--mobile");

      const MOBILE_COUNT = 9;
      const slots = [
        { x: 5, y: 8 },
        { x: 76, y: 5 },
        { x: 2, y: 34 },
        { x: 80, y: 32 },
        { x: 8, y: 62 },
        { x: 74, y: 58 },
        { x: 38, y: 3 },
        { x: 52, y: 70 },
        { x: 22, y: 20 },
      ];
      const sizes = [78, 72, 84, 76, 80, 70, 68, 78, 74];

      symbols.forEach((sym, i) => {
        if (i >= MOBILE_COUNT) {
          sym.style.display = "none";
          return;
        }

        sym.style.display = "block";
        const slot = slots[i];
        sym.style.left = `${slot.x}%`;
        sym.style.top = `${slot.y}%`;
        sym.style.width = `${sizes[i]}px`;

        const baseRot = parseFloat(sym.dataset.rot) || 0;
        gsap.set(sym, { x: 0, y: 0, rotation: baseRot });
      });
    }

    function startMobileParticleDrift(symbols) {
      if (!isHeroMobile()) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      symbols.forEach((sym, i) => {
        if (sym.style.display === "none") return;

        const baseRot = parseFloat(sym.dataset.rot) || 0;

        gsap.to(sym, {
          x: () => gsap.utils.random(-26, 26),
          y: () => gsap.utils.random(-26, 26),
          rotation: () => baseRot + gsap.utils.random(-20, 20),
          duration: () => gsap.utils.random(2.8, 4.6),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          delay: i * 0.08,
        });
      });
    }

    /* ══════════════════════════════════════════════════════════
       6. SCROLL-TRIGGERED ANIMATIONS
       ══════════════════════════════════════════════════════════ */
    function initScrollAnimations() {
      // Dot nav active state
      SECTIONS.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (!self.isActive) return;
            DOTS.forEach((d) => d.classList.remove("active"));
            if (DOTS[i]) DOTS[i].classList.add("active");
            const dotNav = document.querySelector(".dot-nav");
            if (
              section.classList.contains("section--dark") ||
              section.classList.contains("section--black")
            ) {
              dotNav.classList.add("is-light");
            } else {
              dotNav.classList.remove("is-light");
            }
          },
        });
      });

      // Hide scroll indicator on scroll
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "200px top",
        onLeave: () =>
          gsap.to(".scroll-indicator", { opacity: 0, duration: 0.3 }),
        onEnterBack: () =>
          gsap.to(".scroll-indicator", { opacity: 1, duration: 0.3 }),
      });

      // Horizontal scroll chapter carousel — desktop only (pin breaks mobile scroll)
      const track = document.querySelector(".chapters-track");
      if (track && !IS_TOUCH) {
        const totalScroll = track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: ".chapters-section",
            pin: true,
            scrub: 1,
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
          },
        });
      } else if (track && IS_TOUCH) {
        // On touch: native horizontal scroll, no pin
        const wrapper = track.parentElement;
        if (wrapper) {
          wrapper.style.overflowX = "auto";
          wrapper.style.overflowY = "hidden";
          wrapper.style.webkitOverflowScrolling = "touch";
        }
      }

      // About hook — staggered reveal
      gsap.from(
        ".about-hook .section-label, .about-hook__lead, .about-hook__text, .about-hook__reasons li, .about-hook__quote, .about-hook__close",
        {
          opacity: 0,
          y: 28,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-hook",
            start: "top 78%",
            once: true,
          },
        },
      );

      // About intro
      gsap.from(".about-intro__content > *", {
        opacity: 0,
        y: 24,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-intro",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".about-photo-collage", {
        opacity: 0,
        scale: 0.92,
        rotation: -3,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-intro",
          start: "top 75%",
          once: true,
        },
      });

      // Chapter cards entrance
      if (!IS_TOUCH) {
        gsap.from(".chapter-card", {
          opacity: 0,
          y: 36,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".chapters-section",
            start: "top 72%",
            once: true,
          },
        });
      }

      gsap.from(".chapters-header", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".chapters-section",
          start: "top 80%",
          once: true,
        },
      });

      // Stats counters
      document.querySelectorAll(".stat").forEach((stat, i) => {
        const numberEl = stat.querySelector(".stat__number");
        const target = parseFloat(stat.dataset.target);
        const isDecimal = target % 1 !== 0;

        gsap.from(stat, {
          opacity: 0,
          y: 32,
          duration: 0.65,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 85%",
            once: true,
          },
        });

        ScrollTrigger.create({
          trigger: stat,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(
              { val: 0 },
              {
                val: target,
                duration: 2,
                ease: "power2.out",
                onUpdate: function () {
                  numberEl.textContent = isDecimal
                    ? this.targets()[0].val.toFixed(1)
                    : Math.floor(this.targets()[0].val);
                },
              },
            );
          },
        });
      });

      // Reviews header
      gsap.from(".reviews-header", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "#reviews", start: "top 70%" },
      });

      // Free Trial CTA words
      const ctaWords = gsap.utils.toArray(".cta-word");
      const origins = [
        { x: -100, rotation: -5 },
        { x: 100, rotation: 5 },
        { x: -80, rotation: -3 },
        { x: 0, rotation: 0 },
        { x: 0, rotation: 0, scale: 0.5 },
      ];
      ctaWords.forEach((word, i) =>
        gsap.set(word, {
          x: origins[i]?.x || 0,
          rotation: origins[i]?.rotation || 0,
          scale: origins[i]?.scale || 1,
        }),
      );

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#free-trial",
          start: "top 60%",
          end: "center center",
          scrub: 1,
        },
      });
      ctaWords.forEach((word, i) =>
        ctaTl.to(
          word,
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotation: 0,
            scale: 1,
            duration: 0.3,
            ease: "power3.out",
          },
          i * 0.1,
        ),
      );

      gsap.to(".cta-bottom", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta-bottom", start: "top 85%" },
      });

      // TikTok intro
      gsap.from(".feed-intro", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "#tiktok", start: "top 70%" },
      });

      // Floating illustrated symbols parallax (Free Trial)
      gsap.utils.toArray(".float-sym-img").forEach((sym) => {
        gsap.to(sym, {
          y: "random(-40, 40)",
          x: "random(-20, 20)",
          rotation: "random(-8, 8)",
          scrollTrigger: {
            trigger: "#free-trial",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });

      // Decorative doodle parallax (About, Footer)
      gsap.utils
        .toArray(".about-doodle, .footer-doodle")
        .forEach((doodle) => {
          gsap.to(doodle, {
            y: "random(-30, 30)",
            rotation: "random(-5, 5)",
            scrollTrigger: {
              trigger: doodle.closest(".section, .footer"),
              start: "top bottom",
              end: "bottom top",
              scrub: 3,
            },
          });
        });
    }

    /* ══════════════════════════════════════════════════════════
       7. REVIEWS — swipeable chat stack
       ══════════════════════════════════════════════════════════ */
    function initReviews() {
      const cards = gsap.utils.toArray(".chat-card");
      const dotsContainer = document.getElementById("chatDots");
      const hint = document.getElementById("chatHint");
      const total = cards.length;
      let currentIndex = 0,
        isSwiping = false,
        startX = 0,
        dragX = 0;
      let velocityX = 0,
        lastPX = 0,
        lastTime = 0,
        animating = false;
      let idleTween = null,
        labelEl = null;

      if (dotsContainer) {
        cards.forEach((_, i) => {
          const dot = document.createElement("span");
          dot.className = "chat-dot" + (i === 0 ? " is-active" : "");
          dotsContainer.appendChild(dot);
        });
      }

      function updateDots() {
        if (!dotsContainer) return;
        dotsContainer
          .querySelectorAll(".chat-dot")
          .forEach((d, i) =>
            d.classList.toggle("is-active", i === currentIndex),
          );
      }

      labelEl = document.createElement("span");
      labelEl.className = "chat-slide-label";
      const stack = document.getElementById("chatStack");
      if (stack) stack.appendChild(labelEl);

      function updateLabel(animate) {
        if (!labelEl) return;
        const card = cards[currentIndex];
        const text = card.getAttribute("data-slide-label") || "";
        const color = card.getAttribute("data-slide-color") || "#fff";
        if (animate) {
          gsap.to(labelEl, {
            opacity: 0,
            y: -6,
            duration: 0.15,
            ease: "power2.in",
            onComplete: () => {
              labelEl.textContent = text;
              labelEl.style.color = color;
              gsap.fromTo(
                labelEl,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
              );
              labelEl.classList.add("is-visible");
            },
          });
        } else {
          labelEl.textContent = text;
          labelEl.style.color = color;
          labelEl.classList.add("is-visible");
          gsap.set(labelEl, { opacity: 1, y: 0 });
        }
      }

      function layoutStack(animate) {
        cards.forEach((card, i) => {
          const offset = (i - currentIndex + total) % total;
          if (offset < 3) {
            const props = {
              x: 0,
              y: offset * 12,
              scale: 1 - offset * 0.04,
              rotation: offset * 1.2,
              opacity: 1 - offset * 0.22,
              zIndex: total - offset,
              pointerEvents: offset === 0 ? "auto" : "none",
            };
            if (animate && offset < 2) {
              gsap.to(card, {
                ...props,
                duration: offset === 0 ? 0.5 : 0.35,
                ease: offset === 0 ? "elastic.out(1, 0.6)" : "power3.out",
              });
            } else {
              gsap.set(card, props);
            }
          } else {
            gsap.set(card, {
              x: 0,
              y: 0,
              scale: 0.85,
              rotation: 0,
              opacity: 0,
              zIndex: 0,
              pointerEvents: "none",
            });
          }
        });
        updateDots();
        updateLabel(animate);
      }

      layoutStack(false);

      function startIdleFloat() {
        const card = cards[currentIndex];
        if (!card) return;
        idleTween = gsap.to(card, {
          y: "-=4",
          rotation: "-=0.6",
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
      function stopIdleFloat() {
        if (idleTween) {
          idleTween.kill();
          idleTween = null;
        }
      }
      startIdleFloat();

      function onPointerDown(e) {
        if (animating) return;
        isSwiping = true;
        startX = e.clientX;
        dragX = 0;
        lastPX = e.clientX;
        lastTime = performance.now();
        velocityX = 0;
        cards[currentIndex].setPointerCapture(e.pointerId);
        stopIdleFloat();
        if (hint) gsap.to(hint, { opacity: 0, duration: 0.3 });
      }

      function onPointerMove(e) {
        if (!isSwiping) return;
        const card = cards[currentIndex];
        dragX = e.clientX - startX;
        const now = performance.now(),
          dt = now - lastTime;
        if (dt > 0) velocityX = ((e.clientX - lastPX) / dt) * 16;
        lastPX = e.clientX;
        lastTime = now;
        gsap.set(card, {
          x: dragX,
          rotation: dragX * 0.08,
          scale: 1 - Math.min(Math.abs(dragX) / 200, 1) * 0.03,
        });
      }

      function onPointerUp() {
        if (!isSwiping) return;
        isSwiping = false;
        const card = cards[currentIndex];
        const absDrag = Math.abs(dragX),
          absVel = Math.abs(velocityX);
        if (absDrag > 60 || absVel > 4) {
          animating = true;
          const dir = dragX > 0 ? 1 : -1;
          gsap.to(card, {
            x: dir * (800 + absVel * 15),
            rotation: dir * (25 + absVel * 1.5),
            opacity: 0,
            duration: 0.45,
            ease: "power3.in",
            onComplete: () => {
              gsap.set(card, {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 0,
                scale: 0.85,
                pointerEvents: "none",
              });
              currentIndex = (currentIndex + 1) % total;
              layoutStack(true);
              animating = false;
              startIdleFloat();
            },
          });
        } else {
          gsap.to(card, {
            x: 0,
            rotation: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
            onComplete: startIdleFloat,
          });
        }
      }

      cards.forEach((card) => {
        card.addEventListener("pointerdown", onPointerDown);
        card.addEventListener("pointermove", onPointerMove);
        card.addEventListener("pointerup", onPointerUp);
        card.addEventListener("pointercancel", onPointerUp);
      });

      gsap.from("#chatArena", {
        opacity: 0,
        y: 80,
        scale: 0.92,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "#reviews", start: "top 65%", once: true },
      });
    }

    /* ══════════════════════════════════════════════════════════
       8. MAGNETIC CTA BUTTON
       ══════════════════════════════════════════════════════════ */
    function initMagneticButton() {
      const btn = document.getElementById("ctaButton");
      if (!btn) return;
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - rect.left - rect.width / 2) * 0.35,
          y: (e.clientY - rect.top - rect.height / 2) * 0.35,
          duration: 0.4,
          ease: "power2.out",
        });
      });
      btn.addEventListener("mouseleave", () =>
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)",
        }),
      );
    }

    /* ══════════════════════════════════════════════════════════
       9. WHATSAPP CLOUD BUBBLE
       ══════════════════════════════════════════════════════════ */
    function initWaCloud() {
      const cloud = document.getElementById("waCloud");
      if (!cloud) return;
      ScrollTrigger.create({
        trigger: "#about",
        start: "top 65%",
        onEnter: () => cloud.classList.add("is-visible"),
        onLeaveBack: () => cloud.classList.remove("is-visible"),
      });
    }

    // Return cleanup for React useEffect
    return () => {
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  })();
}
