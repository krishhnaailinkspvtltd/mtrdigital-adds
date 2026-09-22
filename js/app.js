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
  // 0. THEME SWITCHER ENGINE (LIGHT / DARK THEME WITH PERSISTENCE)
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleIcon = document.getElementById('themeToggleIcon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('mtr-theme', theme);
    } catch (e) {}
    if (themeToggleIcon) {
      themeToggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  const savedTheme = (function () {
    try {
      return localStorage.getItem('mtr-theme') || 'light';
    } catch (e) {
      return 'light';
    }
  })();
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // ------------------------------------------------------------------------
  // 0B. WEB AUDIO API MICRO-HAPTIC AUDIO ENGINE
  // ------------------------------------------------------------------------
  let audioCtx = null;
  let soundEnabled = (function () {
    try {
      return localStorage.getItem('mtr-sound') === 'true';
    } catch (e) {
      return false;
    }
  })();

  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundToggleIcon = document.getElementById('soundToggleIcon');

  function updateSoundIcon() {
    if (soundToggleIcon) {
      soundToggleIcon.textContent = soundEnabled ? '🔊' : '🔇';
    }
  }
  updateSoundIcon();

  function playMicroHaptic(freq = 1000, duration = 0.02, type = 'sine') {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      try {
        localStorage.setItem('mtr-sound', soundEnabled ? 'true' : 'false');
      } catch (e) {}
      updateSoundIcon();
      if (soundEnabled) {
        playMicroHaptic(1200, 0.04);
      }
    });
  }

  // Hook micro-haptics to interactive clicks
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, a, .region-pill, .bench-preset-pill, .sector-pill, .tag-pill')) {
      playMicroHaptic(950, 0.025);
    }
  });

  // ------------------------------------------------------------------------
  // 1. SCROLLED HEADER & PROGRESS BAR & ACTIVE SECTION TRACKING
  // ------------------------------------------------------------------------
  const header = document.getElementById('mainHeader');
  const progressBar = document.getElementById('scrollProgressBar');
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.header-nav .nav-link');

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Header dynamic island state
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Active navigation link tracking
    let currentSectionId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 220;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

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
  // 3B. HERO MULTI-COLOUR GENERATIVE HARMONIC ORB (CANVAS ENGINE)
  // ------------------------------------------------------------------------
  const orbCanvas = document.getElementById('artOrbCanvas');
  if (orbCanvas) {
    const ctx = orbCanvas.getContext('2d');
    let width = 280;
    let height = 140;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resizeCanvas() {
      const rect = orbCanvas.getBoundingClientRect();
      width = rect.width || 280;
      height = rect.height || 140;
      orbCanvas.width = width * dpr;
      orbCanvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Orbital particles
    const microDust = Array.from({ length: 18 }, () => ({
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 70,
      radius: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
      color: ['#00f0ff', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 5)]
    }));

    let orbAngle = 0;
    function renderOrb() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      orbAngle += 0.018;

      // 1. Central Prismatic Core Glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 55);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      coreGrad.addColorStop(0, isDark ? 'rgba(2, 91, 221, 0.45)' : 'rgba(0, 162, 255, 0.28)');
      coreGrad.addColorStop(0.5, isDark ? 'rgba(139, 92, 246, 0.22)' : 'rgba(139, 92, 246, 0.15)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.fill();

      // 2. Micro Prismatic Dust Stars
      microDust.forEach(dust => {
        dust.angle += dust.speed;
        const dx = cx + Math.cos(dust.angle) * Math.abs(dust.x) * 0.7;
        const dy = cy + Math.sin(dust.angle) * Math.abs(dust.y) * 0.6;
        ctx.fillStyle = dust.color;
        ctx.shadowColor = dust.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(dx, dy, dust.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Ring Draw Helper
      function drawRing(rx, ry, rot, strokeGrad, beadColor, beadPhase) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);

        ctx.strokeStyle = strokeGrad;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = beadColor;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Orbiting glowing satellite beads
        const beadAngle = orbAngle * 1.5 + beadPhase;
        const bx = Math.cos(beadAngle) * rx;
        const by = Math.sin(beadAngle) * ry;

        ctx.fillStyle = beadColor;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Opposite trailing bead
        const bx2 = Math.cos(beadAngle + Math.PI) * rx;
        const by2 = Math.sin(beadAngle + Math.PI) * ry;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(bx2, by2, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Ring 1: Electric Blue to Cyan
      const grad1 = ctx.createLinearGradient(-90, -45, 90, 45);
      grad1.addColorStop(0, '#025bdd');
      grad1.addColorStop(1, '#00f0ff');
      drawRing(92, 38, Math.sin(orbAngle * 0.4) * 0.35 - 0.2, grad1, '#00f0ff', 0);

      // Ring 2: Quantum Violet to Magenta
      const grad2 = ctx.createLinearGradient(-80, 40, 80, -40);
      grad2.addColorStop(0, '#8b5cf6');
      grad2.addColorStop(1, '#ec4899');
      drawRing(76, 32, Math.cos(orbAngle * 0.5) * 0.45 + 0.6, grad2, '#ec4899', 2.1);

      // Ring 3: Emerald to Sunset Amber
      const grad3 = ctx.createLinearGradient(70, -35, -70, 35);
      grad3.addColorStop(0, '#10b981');
      grad3.addColorStop(1, '#f59e0b');
      drawRing(60, 26, -Math.sin(orbAngle * 0.3) * 0.5 - 0.8, grad3, '#10b981', 4.2);

      // Center Nucleus Diamond
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(orbAngle);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.rect(-3, -3, 6, 6);
      ctx.fill();
      ctx.restore();

      requestAnimationFrame(renderOrb);
    }
    renderOrb();
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
  // 10. CROSS-BORDER REGION & CURRENCY ORCHESTRATOR
  // ------------------------------------------------------------------------
  const regionPills = document.querySelectorAll('.region-pill');
  const regionMarket = document.getElementById('regionMarket');
  const regionPipeline = document.getElementById('regionPipeline');
  const regionRoas = document.getElementById('regionRoas');
  const basePipelineUSD = 1480000;

  if (regionPills.length > 0) {
    regionPills.forEach(pill => {
      pill.addEventListener('click', () => {
        regionPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const cur = pill.getAttribute('data-cur');
        const symbol = pill.getAttribute('data-symbol');
        const rate = parseFloat(pill.getAttribute('data-rate')) || 1.0;
        const market = pill.getAttribute('data-market');

        const converted = Math.round(basePipelineUSD * rate);
        const formatted = symbol + converted.toLocaleString();

        if (regionMarket) regionMarket.textContent = `Target: ${market}`;
        if (regionPipeline) {
          regionPipeline.style.opacity = '0';
          setTimeout(() => {
            regionPipeline.textContent = formatted;
            regionPipeline.style.opacity = '1';
          }, 140);
        }
        if (regionRoas) {
          regionRoas.textContent = cur === 'AED' ? '6.4× Blended' : cur === 'GBP' ? '5.9× Blended' : '5.8× Blended';
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 11. INTERACTIVE BEFORE/AFTER PERFORMANCE BENCHMARK (SPLIT SLIDER)
  // ------------------------------------------------------------------------
  const splitSliderWrap = document.getElementById('splitSliderWrap');
  const splitAfterLayer = document.getElementById('splitAfterLayer');
  const splitHandle = document.getElementById('splitHandle');
  const benchmarkPresets = document.querySelectorAll('.bench-preset-pill');

  if (splitSliderWrap && splitAfterLayer && splitHandle) {
    let isDragging = false;

    function setSplitPosition(clientX) {
      const rect = splitSliderWrap.getBoundingClientRect();
      const offsetX = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const percentage = Math.max(5, Math.min(95, (offsetX / rect.width) * 100));
      splitAfterLayer.style.width = percentage + '%';
      splitHandle.style.left = percentage + '%';
    }

    splitSliderWrap.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSplitPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSplitPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch support
    splitSliderWrap.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) setSplitPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) setSplitPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Sector Benchmark Presets
    const benchmarkData = {
      luxury: {
        before: { roas: '1.8×', cac: '$148', lag: '12-24h' },
        after: { roas: '6.2×', cac: '$42', lag: '<40ms' }
      },
      fintech: {
        before: { roas: '2.1×', cac: '$380', lag: '48h+' },
        after: { roas: '7.4×', cac: '$95', lag: '<25ms' }
      },
      biotech: {
        before: { roas: '1.9×', cac: '$84', lag: '24h' },
        after: { roas: '5.8×', cac: '$26', lag: '<35ms' }
      }
    };

    const bRoas = document.getElementById('beforeRoas');
    const bCac = document.getElementById('beforeCac');
    const bLag = document.getElementById('beforeLag');
    const aRoas = document.getElementById('afterRoas');
    const aCac = document.getElementById('afterCac');
    const aLag = document.getElementById('afterLag');

    benchmarkPresets.forEach(btn => {
      btn.addEventListener('click', () => {
        benchmarkPresets.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const presetKey = btn.getAttribute('data-preset');
        const data = benchmarkData[presetKey] || benchmarkData.luxury;

        if (bRoas) bRoas.textContent = data.before.roas;
        if (bCac) bCac.textContent = data.before.cac;
        if (bLag) bLag.textContent = data.before.lag;

        if (aRoas) aRoas.textContent = data.after.roas;
        if (aCac) aCac.textContent = data.after.cac;
        if (aLag) aLag.textContent = data.after.lag;
      });
    });
  }

  // ------------------------------------------------------------------------
  // 12. BESPOKE MAGNETIC TRAILING CURSOR
  // ------------------------------------------------------------------------
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const cursorLabel = document.getElementById('cursorLabel');

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotX = mouseX;
      dotY = mouseY;
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;
    }, { passive: true });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX.toFixed(2)}px`;
      cursorRing.style.top = `${ringY.toFixed(2)}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const hoverTargets = [
      { sel: '.btn-anim, .open-consult-modal', label: 'SELECT' },
      { sel: '.case-card', label: 'PROOF' },
      { sel: '.service-card', label: 'EXPLORE' },
      { sel: '.bench-preset-pill, .region-pill, .sector-pill', label: 'PRESET' },
      { sel: '.split-handle', label: 'DRAG' }
    ];

    hoverTargets.forEach(({ sel, label }) => {
      document.querySelectorAll(sel).forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorRing.classList.add('active');
          if (cursorLabel) cursorLabel.textContent = label;
        });
        el.addEventListener('mouseleave', () => {
          cursorRing.classList.remove('active');
          if (cursorLabel) cursorLabel.textContent = '';
        });
      });
    });
  }

  // ------------------------------------------------------------------------
  // 13. SMOOTH ANCHOR NAVIGATION
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

  // ------------------------------------------------------------------------
  // 14. INTERACTIVE MULTI-COLOUR PRISMATIC SPARKLE PARTICLES
  // ------------------------------------------------------------------------
  const sparkPalette = [
    '#00f0ff', '#025bdd', '#8b5cf6', '#ec4899',
    '#10b981', '#f59e0b', '#38bdf8', '#fbbf24'
  ];

  function spawnSpark(x, y) {
    const spark = document.createElement('span');
    spark.className = 'prismatic-spark';
    const color = sparkPalette[Math.floor(Math.random() * sparkPalette.length)];
    const tx = (Math.random() - 0.5) * 50;
    const ty = -20 - Math.random() * 35;
    const size = Math.floor(Math.random() * 4) + 5; // 5-8px

    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.background = color;
    spark.style.boxShadow = `0 0 10px ${color}`;
    spark.style.setProperty('--tx', `${tx}px`);
    spark.style.setProperty('--ty', `${ty}px`);

    document.body.appendChild(spark);
    setTimeout(() => {
      spark.remove();
    }, 850);
  }

  // Click burst
  window.addEventListener('click', (e) => {
    for (let i = 0; i < 4; i++) {
      setTimeout(() => spawnSpark(e.clientX, e.clientY), i * 40);
    }
  });

  // Throttled hover trail over interactive cards
  let lastSparkTime = 0;
  const interactiveCardSelector = '.service-card, .case-card, .stack-card, .btn-anim, .art-core';
  document.querySelectorAll(interactiveCardSelector).forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastSparkTime > 90) {
        lastSparkTime = now;
        spawnSpark(e.clientX, e.clientY);
      }
    });
  });

})();
