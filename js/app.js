/* ==========================================================================
   MTR DIGITAL MARKETING — HIGH-CRAFT UI/UX INTERACTION ENGINE
   NITSAN.AI Architecture & Physics Calibrated to MTR Official Brand Colors
   Features:
   1. Dynamic Scroll Progress Bar
   2. Interactive Bento Card Mouse Spotlight Sheen
   3. Hero 3D Parallax with Organic Ambient Floating Levitation
   4. Rotating Hero Pill Motif
   5. Stacking Sticky Cards Progression
   6. Tactile Capital Yield Simulator with Sector Benchmark Presets
   7. Real-Time Number Count-Up Statistics Engine
   8. Global Desks Live Operational Clocks (DXB, LON, NYC, BOM)
   9. Sovereign Consultation Briefing Modal
   10. Smooth Anchor Navigation
   ========================================================================== */

(function () {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. SCROLLED HEADER & PROGRESS BAR
  // ------------------------------------------------------------------------
  const header = document.getElementById('mainHeader');
  const progressBar = document.getElementById('scrollProgressBar');

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Header blur state
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Progress bar width
    if (progressBar && docHeight > 0) {
      const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      progressBar.style.width = progress + '%';
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ------------------------------------------------------------------------
  // 2. HERO ROTATING PILL TEXT (NITSAN MOTIF)
  // ------------------------------------------------------------------------
  const rotatingWords = ['First', 'Scale', 'ROAS', 'Impact', 'Global'];
  let currentWordIndex = 0;
  const rotatingTextEl = document.getElementById('rotatingText');

  if (rotatingTextEl) {
    setInterval(() => {
      rotatingTextEl.style.opacity = '0';
      rotatingTextEl.style.transform = 'translateY(-8px)';

      setTimeout(() => {
        currentWordIndex = (currentWordIndex + 1) % rotatingWords.length;
        rotatingTextEl.textContent = rotatingWords[currentWordIndex];
        rotatingTextEl.style.transform = 'translateY(8px)';

        requestAnimationFrame(() => {
          rotatingTextEl.style.transition = 'all 0.35s cubic-bezier(0.23, 0.65, 0.74, 1.09)';
          rotatingTextEl.style.opacity = '1';
          rotatingTextEl.style.transform = 'translateY(0)';
        });
      }, 250);
    }, 2500);
  }

  // ------------------------------------------------------------------------
  // 3. HERO 3D FLOATING ART (PARALLAX INERTIA + AMBIENT LEVITATION)
  // ------------------------------------------------------------------------
  const heroArtContainer = document.getElementById('heroArt');
  const floatCards = document.querySelectorAll('.float-art-card');

  if (heroArtContainer && floatCards.length > 0) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 44;
      mouseY = (e.clientY / innerHeight - 0.5) * 44;
    }, { passive: true });

    function renderParallax() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      const time = Date.now() * 0.0018;

      floatCards.forEach((card, idx) => {
        const factor = (idx + 1) * 0.55;
        const bobY = Math.sin(time + idx * 1.6) * 9;
        const bobRotate = Math.cos(time + idx * 1.2) * 1.4;
        const rotate = (idx % 2 === 0 ? 1 : -1) * (currentX * 0.1) + bobRotate;

        const totalX = currentX * factor;
        const totalY = currentY * factor + bobY;

        card.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg)`;
      });

      requestAnimationFrame(renderParallax);
    }
    renderParallax();
  }

  // ------------------------------------------------------------------------
  // 4. BENTO CARDS MOUSE SPOTLIGHT SHEEN
  // ------------------------------------------------------------------------
  const spotlightCards = document.querySelectorAll('.service-card, .case-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ------------------------------------------------------------------------
  // 5. STACKING CARDS SCROLL DYNAMICS
  // ------------------------------------------------------------------------
  const stackCards = document.querySelectorAll('.stack-card');
  if (stackCards.length > 0) {
    window.addEventListener('scroll', () => {
      stackCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= 180 && rect.top >= 80) {
          const scale = 1 - (stackCards.length - 1 - index) * 0.02;
          card.style.transform = `scale(${scale})`;
        } else {
          card.style.transform = 'scale(1)';
        }
      });
    }, { passive: true });
  }

  // ------------------------------------------------------------------------
  // 6. TACTILE CAPITAL YIELD SIMULATOR (WITH SECTOR BENCHMARK PRESETS)
  // ------------------------------------------------------------------------
  const spendSlider = document.getElementById('spendSlider');
  const spendOutput = document.getElementById('spendOutput');
  const resultRevenue = document.getElementById('resultRevenue');
  const resultRoas = document.getElementById('resultRoas');
  const resultProfit = document.getElementById('resultProfit');
  const sectorButtons = document.querySelectorAll('.sector-pill-btn');

  let activeRoasMultiplier = 5.4; // Default blended ROAS

  function calculateYield() {
    if (!spendSlider) return;
    const spend = parseInt(spendSlider.value, 10);
    const projectedRevenue = Math.round(spend * activeRoasMultiplier);
    const netProfit = Math.round(projectedRevenue - spend);

    if (spendOutput) {
      spendOutput.textContent = '$' + spend.toLocaleString() + ' /mo';
    }
    if (resultRevenue) {
      resultRevenue.textContent = '$' + projectedRevenue.toLocaleString();
    }
    if (resultRoas) {
      resultRoas.textContent = activeRoasMultiplier.toFixed(1) + '×';
    }
    if (resultProfit) {
      resultProfit.textContent = '$' + netProfit.toLocaleString();
    }
  }

  if (spendSlider) {
    spendSlider.addEventListener('input', calculateYield);
  }

  // Sector preset buttons
  sectorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sectorButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const roasVal = parseFloat(btn.getAttribute('data-roas'));
      if (!isNaN(roasVal)) {
        activeRoasMultiplier = roasVal;
        calculateYield();
      }
    });
  });

  calculateYield();

  // ------------------------------------------------------------------------
  // 7. ANIMATED NUMBER COUNT-UP STATISTICS ENGINE
  // ------------------------------------------------------------------------
  const counterElements = document.querySelectorAll('.counter-val');

  if (counterElements.length > 0 && 'IntersectionObserver' in window) {
    let animated = false;

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            if (isNaN(target)) return;

            const duration = 1600; // ms
            const startTime = performance.now();

            function updateCount(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out expo easing
              const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const currentVal = Math.floor(easeProgress * target);

              counter.textContent = currentVal.toLocaleString();

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                counter.textContent = target.toLocaleString();
              }
            }

            requestAnimationFrame(updateCount);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });

    const counterSection = document.querySelector('.mxd-counters-grid');
    if (counterSection) {
      counterObserver.observe(counterSection);
    }
  }

  // ------------------------------------------------------------------------
  // 8. GLOBAL DESKS LIVE OPERATIONAL CLOCKS (DXB, LON, NYC, BOM)
  // ------------------------------------------------------------------------
  const clockElements = document.querySelectorAll('.live-clock-time');

  function updateGlobalClocks() {
    const now = new Date();

    clockElements.forEach(el => {
      const timeZone = el.getAttribute('data-tz');
      if (!timeZone) return;

      try {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });

        // Timezone abbreviation suffix
        let tzAbbr = '';
        if (timeZone === 'Asia/Dubai') tzAbbr = 'GST';
        else if (timeZone === 'Europe/London') tzAbbr = 'LON';
        else if (timeZone === 'America/New_York') tzAbbr = 'NYC';
        else if (timeZone === 'Asia/Kolkata') tzAbbr = 'IST';

        el.textContent = `${formatter.format(now)} ${tzAbbr}`;
      } catch (err) {
        // Fallback
      }
    });
  }

  if (clockElements.length > 0) {
    updateGlobalClocks();
    setInterval(updateGlobalClocks, 1000);
  }

  // ------------------------------------------------------------------------
  // 9. SOVEREIGN CONSULTATION BRIEFING MODAL
  // ------------------------------------------------------------------------
  const modalOverlay = document.getElementById('consultModal');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTriggers = document.querySelectorAll('.open-consult-modal');
  const consultForm = document.getElementById('consultForm');
  const modalSuccessState = document.getElementById('modalSuccessState');

  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const firstInput = document.getElementById('formName');
      if (firstInput) setTimeout(() => firstInput.focus(), 150);
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      modalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = consultForm.querySelector('.modal-submit-btn');
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Transmitting...</span>';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.pointerEvents = 'none';
      }

      setTimeout(() => {
        consultForm.style.display = 'none';
        if (modalSuccessState) {
          modalSuccessState.classList.add('active');
        }

        setTimeout(() => {
          closeModal();
          setTimeout(() => {
            consultForm.reset();
            consultForm.style.display = '';
            if (modalSuccessState) modalSuccessState.classList.remove('active');
            if (submitBtn) {
              submitBtn.innerHTML = '<span>Transmit Confidential Brief</span><span class="btn-icon">↗</span>';
              submitBtn.style.opacity = '';
              submitBtn.style.pointerEvents = '';
            }
          }, 400);
        }, 3600);
      }, 700);
    });
  }

  // ------------------------------------------------------------------------
  // 10. SMOOTH ANCHOR NAVIGATION
  // ------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

})();
