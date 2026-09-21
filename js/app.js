/* ==========================================================================
   MTR DIGITAL MARKETING — CYBER-LUXURY ARCHITECTURE SCRIPT
   Interactive 3D WebGL Holographic Globe, Cyber Bootloader & Telemetry
   ========================================================================== */

(function () {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. SOUND DESIGN SYNTHESIZER (WEB AUDIO API)
  // ------------------------------------------------------------------------
  let audioCtx = null;
  let soundEnabled = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }

  function playCyberBeep(freq = 880, duration = 0.06, type = 'sine') {
    if (!soundEnabled || !audioCtx) return;
    try {
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
    } catch (e) {
      // Audio context silently handled
    }
  }

  const audioToggleBtn = document.getElementById('audioToggleBtn');
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', function () {
      initAudio();
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        audioToggleBtn.innerHTML = '<span>🔊 AUDIO: ON</span>';
        audioToggleBtn.style.color = '#00f0ff';
        audioToggleBtn.style.borderColor = '#00f0ff';
        playCyberBeep(1200, 0.1);
      } else {
        audioToggleBtn.innerHTML = '<span>🔇 AUDIO: OFF</span>';
        audioToggleBtn.style.color = '#7384a2';
        audioToggleBtn.style.borderColor = 'rgba(0,240,255,0.2)';
      }
    });
  }

  // ------------------------------------------------------------------------
  // 2. THEATRICAL CYBER MATRIX BOOTLOADER PRELOADER
  // ------------------------------------------------------------------------
  const preloader = document.getElementById('cyberPreloader');
  const loadNumber = document.getElementById('loadNumber');
  const loadBar = document.getElementById('loadBar');
  const loadDiag = document.getElementById('loadDiag');

  const diagnosticStages = [
    '0x0A: INITIATING MTR PROTOCOL...',
    '0x2F: CALIBRATING 3D HOLOGRAPHIC GLOBE...',
    '0x5E: SYNCHRONIZING GLOBAL DESKS (DXB, NYC, LON, BOM)...',
    '0x8C: ENGAGING GENERATIVE AI SEARCH CORE...',
    '0xFF: TELEMETRY VERIFIED. SYSTEM DEPLOYED.'
  ];

  let currentPercent = 0;
  const loadInterval = setInterval(() => {
    currentPercent += Math.floor(Math.random() * 4) + 2;
    if (currentPercent > 100) currentPercent = 100;

    if (loadNumber) loadNumber.textContent = String(currentPercent).padStart(2, '0');
    if (loadBar) loadBar.style.width = currentPercent + '%';

    // Update diagnostic message
    const stageIdx = Math.min(
      Math.floor((currentPercent / 100) * diagnosticStages.length),
      diagnosticStages.length - 1
    );
    if (loadDiag) {
      loadDiag.innerHTML = `<span class="cyan">${diagnosticStages[stageIdx]}</span>`;
    }

    if (currentPercent % 15 === 0) {
      playCyberBeep(600 + currentPercent * 4, 0.04);
    }

    if (currentPercent >= 100) {
      clearInterval(loadInterval);
      playCyberBeep(1400, 0.2, 'triangle');
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('loaded');
        }
      }, 400);
    }
  }, 28);

  // ------------------------------------------------------------------------
  // 3. THREE.JS 3D HOLOGRAPHIC CYBER NETWORK GLOBE
  // ------------------------------------------------------------------------
  const canvasContainer = document.getElementById('threeCanvasWrap');
  if (canvasContainer && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      canvasContainer.clientWidth / canvasContainer.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 11;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 3.1 Holographic Wireframe Globe
    const globeRadius = 3.6;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 32, 32);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, wireframeMat);
    globeGroup.add(sphereMesh);

    // Inner Glowing Core Sphere
    const innerGeo = new THREE.SphereGeometry(globeRadius * 0.96, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x071533,
      transparent: true,
      opacity: 0.85
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerMesh);

    // 3.2 Atmospheric Particle Constellation (1,200 points)
    const particleCount = 1200;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = globeRadius * (1.05 + Math.random() * 0.35);
      particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    globeGroup.add(particleSystem);

    // 3.3 Lat / Long Helper to Vector3
    function latLongToVector3(lat, lon, radius) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    }

    // Global City Coordinates
    const cities = [
      { name: 'Dubai', lat: 25.2048, lon: 55.2708, isHQ: true },
      { name: 'New York', lat: 40.7128, lon: -74.0060 },
      { name: 'London', lat: 51.5074, lon: -0.1278 },
      { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
      { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
      { name: 'Singapore', lat: 1.3521, lon: 103.8198 }
    ];

    const cityPoints = [];
    cities.forEach(city => {
      const pos = latLongToVector3(city.lat, city.lon, globeRadius);
      cityPoints.push({ name: city.name, pos: pos });

      // Pinned Glowing Sprite / Dot
      const pinGeo = new THREE.SphereGeometry(city.isHQ ? 0.12 : 0.08, 12, 12);
      const pinMat = new THREE.MeshBasicMaterial({
        color: city.isHQ ? 0x00ffaa : 0x00f0ff,
        blending: THREE.AdditiveBlending
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      globeGroup.add(pinMesh);

      // Outer Pulse Ring
      const ringGeo = new THREE.RingGeometry(city.isHQ ? 0.16 : 0.12, city.isHQ ? 0.22 : 0.16, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: city.isHQ ? 0x00ffaa : 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ringMesh);
    });

    // 3.4 Connecting Flight / Data Laser Arcs
    function createArc(v1, v2) {
      const dist = v1.distanceTo(v2);
      const mid = v1.clone().add(v2).multiplyScalar(0.5);
      const midLength = mid.length();
      mid.normalize();
      mid.multiplyScalar(midLength + dist * 0.25);

      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      const points = curve.getPoints(40);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
      });
      const line = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(line);
      return curve;
    }

    const arcs = [
      createArc(cityPoints[0].pos, cityPoints[1].pos), // Dubai -> NYC
      createArc(cityPoints[0].pos, cityPoints[2].pos), // Dubai -> London
      createArc(cityPoints[0].pos, cityPoints[3].pos), // Dubai -> Mumbai
      createArc(cityPoints[2].pos, cityPoints[1].pos), // London -> NYC
      createArc(cityPoints[3].pos, cityPoints[5].pos), // Mumbai -> Singapore
      createArc(cityPoints[5].pos, cityPoints[4].pos)  // Singapore -> Tokyo
    ];

    // Data Laser Packets Traveling on Arcs
    const packetMeshes = [];
    arcs.forEach(arc => {
      const pktGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const pktMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        blending: THREE.AdditiveBlending
      });
      const pkt = new THREE.Mesh(pktGeo, pktMat);
      globeGroup.add(pkt);
      packetMeshes.push({ mesh: pkt, arc: arc, progress: Math.random() });
    });

    // Mouse Drag & Inertia Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0.0012, y: 0.0024 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationVelocity.y = deltaX * 0.002;
      rotationVelocity.x = deltaY * 0.002;

      globeGroup.rotation.y += rotationVelocity.y;
      globeGroup.rotation.x += rotationVelocity.x;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch Support for Mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      rotationVelocity.y = deltaX * 0.003;
      rotationVelocity.x = deltaY * 0.003;

      globeGroup.rotation.y += rotationVelocity.y;
      globeGroup.rotation.x += rotationVelocity.x;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    canvasContainer.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    canvasContainer.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize Handler
    window.addEventListener('resize', () => {
      if (!canvasContainer) return;
      camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });

    // 3.5 Animation Loop
    function animateGlobe() {
      requestAnimationFrame(animateGlobe);

      if (!isDragging) {
        globeGroup.rotation.y += 0.0022;
        globeGroup.rotation.x *= 0.95; // Damp vertical tilt back to normal
      }

      // Animate Laser Packets
      packetMeshes.forEach(pkt => {
        pkt.progress += 0.006;
        if (pkt.progress > 1) pkt.progress = 0;
        const pt = pkt.arc.getPoint(pkt.progress);
        pkt.mesh.position.copy(pt);
      });

      // Subtle pulse on particles
      particleSystem.rotation.y += 0.0008;

      renderer.render(scene, camera);
    }
    animateGlobe();
  }

  // ------------------------------------------------------------------------
  // 4. LIVE AD-TECH COMMAND COCKPIT TABS & DYNAMIC DATA
  // ------------------------------------------------------------------------
  const cockpitTabs = document.querySelectorAll('.cockpit-tab-btn');
  const cockpitKpis = {
    pmax: {
      spend: '$3.42M',
      roas: '5.8×',
      roasDelta: '+412%',
      cac: '$24.80',
      cacDelta: '-38%',
      pipeline: '$19.8M'
    },
    meta: {
      spend: '$4.18M',
      roas: '5.1×',
      roasDelta: '+368%',
      cac: '$28.40',
      cacDelta: '-34%',
      pipeline: '$21.3M'
    },
    aeo: {
      spend: '$1.85M',
      roas: '7.4×',
      roasDelta: '+540%',
      cac: '$14.20',
      cacDelta: '-62%',
      pipeline: '$13.7M'
    }
  };

  cockpitTabs.forEach(btn => {
    btn.addEventListener('click', function () {
      cockpitTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const targetMode = this.getAttribute('data-cockpit');
      const data = cockpitKpis[targetMode] || cockpitKpis.pmax;

      const spendEl = document.getElementById('kpiSpend');
      const roasEl = document.getElementById('kpiRoas');
      const roasDeltaEl = document.getElementById('kpiRoasDelta');
      const cacEl = document.getElementById('kpiCac');
      const cacDeltaEl = document.getElementById('kpiCacDelta');
      const pipeEl = document.getElementById('kpiPipe');

      if (spendEl) spendEl.textContent = data.spend;
      if (roasEl) roasEl.textContent = data.roas;
      if (roasDeltaEl) roasDeltaEl.textContent = data.roasDelta;
      if (cacEl) cacEl.textContent = data.cac;
      if (cacDeltaEl) cacDeltaEl.textContent = data.cacDelta;
      if (pipeEl) pipeEl.textContent = data.pipeline;

      playCyberBeep(980, 0.05);
    });
  });

  // ------------------------------------------------------------------------
  // 5. TACTILE CAPITAL YIELD ENGINE (ROI CALCULATOR)
  // ------------------------------------------------------------------------
  const spendSlider = document.getElementById('spendSlider');
  const spendDisplay = document.getElementById('spendDisplay');
  const yieldRevenue = document.getElementById('yieldRevenue');
  const yieldRoas = document.getElementById('yieldRoas');
  const yieldCacSave = document.getElementById('yieldCacSave');
  const yieldProfit = document.getElementById('yieldProfit');

  let currentMultiplier = 5.2; // Base ROAS

  function recalculateYield() {
    if (!spendSlider) return;
    const spend = parseInt(spendSlider.value, 10);
    if (spendDisplay) {
      spendDisplay.textContent = '$' + spend.toLocaleString() + ' /mo';
    }

    const projectedRevenue = Math.round(spend * currentMultiplier);
    const netProfit = Math.round(projectedRevenue - spend);

    if (yieldRevenue) {
      yieldRevenue.textContent = '$' + projectedRevenue.toLocaleString();
    }
    if (yieldRoas) {
      yieldRoas.textContent = currentMultiplier.toFixed(1) + '×';
    }
    if (yieldProfit) {
      yieldProfit.textContent = '$' + netProfit.toLocaleString();
    }
  }

  if (spendSlider) {
    spendSlider.addEventListener('input', () => {
      recalculateYield();
      playCyberBeep(700 + parseInt(spendSlider.value) / 100, 0.02);
    });
  }

  const sectorChips = document.querySelectorAll('.sector-chip-btn');
  sectorChips.forEach(chip => {
    chip.addEventListener('click', function () {
      sectorChips.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      currentMultiplier = parseFloat(this.getAttribute('data-mult')) || 5.2;
      recalculateYield();
      playCyberBeep(1100, 0.06);
    });
  });

  // Initial calculation
  recalculateYield();

  // ------------------------------------------------------------------------
  // 6. NATIONAL & INTERNATIONAL GLOBAL DESKS
  // ------------------------------------------------------------------------
  const deskTabs = document.querySelectorAll('.desk-tab-btn');
  const deskData = {
    dubai: {
      hq: 'GLOBAL HEADQUARTERS // MENA & SOVEREIGN ALLOCATIONS',
      city: 'DUBAI (DIFC)',
      address: 'Gate Precinct 4, Level 7, Dubai International Financial Centre, United Arab Emirates',
      spend: '$34.8M+',
      roas: '5.8×',
      cases: '64 Global Audits',
      latency: '2.4ms'
    },
    london: {
      hq: 'EUROPEAN GATEWAY // FTSE 100 & LUXURY MAISONS',
      city: 'LONDON (MAYFAIR)',
      address: '14 Berkeley Square, Mayfair, London W1J 6BL, United Kingdom',
      spend: '$22.4M+',
      roas: '5.2×',
      cases: '42 Enterprise Brands',
      latency: '4.1ms'
    },
    nyc: {
      hq: 'AMERICAS HEADQUARTERS // HIGH-GROWTH TECH & B2B',
      city: 'NEW YORK (HUDSON YARDS)',
      address: '30 Hudson Yards, Suite 5400, New York, NY 10001, United States',
      spend: '$28.1M+',
      roas: '5.4×',
      cases: '58 Tech Unicorns',
      latency: '3.8ms'
    },
    mumbai: {
      hq: 'ASIA-PACIFIC STRATEGY HUB // D2C EXPANSION',
      city: 'MUMBAI (BKC)',
      address: 'One BKC, G Block, Bandra Kurla Complex, Mumbai, Maharashtra 400051, India',
      spend: '$18.9M+',
      roas: '6.4×',
      cases: '71 High-Velocity D2C',
      latency: '1.9ms'
    }
  };

  deskTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      deskTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const targetKey = this.getAttribute('data-desk');
      const data = deskData[targetKey] || deskData.dubai;

      const hqEl = document.getElementById('deskHq');
      const cityEl = document.getElementById('deskCity');
      const addrEl = document.getElementById('deskAddr');
      const spendEl = document.getElementById('deskSpend');
      const roasEl = document.getElementById('deskRoas');
      const casesEl = document.getElementById('deskCases');
      const latEl = document.getElementById('deskLatency');

      if (hqEl) hqEl.textContent = data.hq;
      if (cityEl) cityEl.textContent = data.city;
      if (addrEl) addrEl.textContent = data.address;
      if (spendEl) spendEl.textContent = data.spend;
      if (roasEl) roasEl.textContent = data.roas;
      if (casesEl) casesEl.textContent = data.cases;
      if (latEl) latEl.textContent = data.latency;

      playCyberBeep(920, 0.05);
    });
  });

  // ------------------------------------------------------------------------
  // 7. LIVE WORLD CLOCKS
  // ------------------------------------------------------------------------
  function updateWorldClocks() {
    const now = new Date();
    const dxbTime = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Dubai',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(now);

    const clockBadge = document.getElementById('marketClock');
    if (clockBadge) {
      clockBadge.textContent = `DXB ${dxbTime}`;
    }
  }
  setInterval(updateWorldClocks, 1000);
  updateWorldClocks();

  // ------------------------------------------------------------------------
  // 8. CONSULTATION TERMINAL FORM SUBMIT
  // ------------------------------------------------------------------------
  const terminalForm = document.getElementById('terminalForm');
  if (terminalForm) {
    terminalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('.terminal-submit-btn');
      if (submitBtn) {
        submitBtn.innerHTML = '<span>⚡ ENCRYPTING & TRANSMITTING TELEMETRY...</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #00ffaa, #00f0ff)';
        playCyberBeep(1200, 0.15);

        setTimeout(() => {
          submitBtn.innerHTML = '<span>✔ PARAMETERS RECEIVED // BRIEF CONFIRMED</span>';
          playCyberBeep(1600, 0.3, 'triangle');
        }, 1200);
      }
    });
  }

})();
