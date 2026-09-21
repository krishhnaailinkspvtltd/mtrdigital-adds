/* ==========================================================================
   MTR DIGITAL MARKETING — NITSAN.AI INTERACTION SCRIPT
   Rotating Pill Text, Parallax 3D Art, Stacking Dynamics & Capital Yield Simulator
   Reference: https://nitsan.ai/
   ========================================================================== */

(function () {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. SCROLLED HEADER OBSERVER
  // ------------------------------------------------------------------------
  const header = document.getElementById('mainHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ------------------------------------------------------------------------
  // 2. HERO ROTATING PILL TEXT (NITSAN HERO MOTIF)
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
    }, 2400);
  }

  // ------------------------------------------------------------------------
  // 3. MOUSE PARALLAX MOTION FOR 3D FLOATING CARDS (MXD-MOVE)
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
      mouseX = (e.clientX / innerWidth - 0.5) * 40;
      mouseY = (e.clientY / innerHeight - 0.5) * 40;
    }, { passive: true });

    function renderParallax() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      floatCards.forEach((card, idx) => {
        const factor = (idx + 1) * 0.6;
        const rotate = (idx % 2 === 0 ? 1 : -1) * (currentX * 0.1);
        card.style.transform = `translate3d(${currentX * factor}px, ${currentY * factor}px, 0) rotate(${rotate}deg)`;
      });

      requestAnimationFrame(renderParallax);
    }
    renderParallax();
  }

  // ------------------------------------------------------------------------
  // 4. STACKING CARDS SCROLL PROGRESSION
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
  // 5. TACTILE CAPITAL YIELD SIMULATOR
  // ------------------------------------------------------------------------
  const spendSlider = document.getElementById('spendSlider');
  const spendOutput = document.getElementById('spendOutput');
  const resultRevenue = document.getElementById('resultRevenue');
  const resultRoas = document.getElementById('resultRoas');
  const resultProfit = document.getElementById('resultProfit');

  function calculateYield() {
    if (!spendSlider) return;
    const spend = parseInt(spendSlider.value, 10);
    const roasMultiplier = 5.4; // Verified MTR Average
    const projectedRevenue = Math.round(spend * roasMultiplier);
    const netProfit = Math.round(projectedRevenue - spend);

    if (spendOutput) {
      spendOutput.textContent = '$' + spend.toLocaleString() + ' /mo';
    }
    if (resultRevenue) {
      resultRevenue.textContent = '$' + projectedRevenue.toLocaleString();
    }
    if (resultRoas) {
      resultRoas.textContent = roasMultiplier.toFixed(1) + '×';
    }
    if (resultProfit) {
      resultProfit.textContent = '$' + netProfit.toLocaleString();
    }
  }

  if (spendSlider) {
    spendSlider.addEventListener('input', calculateYield);
    calculateYield();
  }

  // ------------------------------------------------------------------------
  // 6. CONTACT / CONSULTATION MODAL OR FORM
  // ------------------------------------------------------------------------
  const ctaButton = document.getElementById('primaryCta');
  if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('ctaSection');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ------------------------------------------------------------------------
  // 7. SMOOTH LINK SCROLLING
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
