/* ================================================
   POLA GAMBAR – script.js
   Interactive Pattern Detective Exercise
   + Web Audio API Sound Engine
   ================================================ */

'use strict';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CORRECT_COUNT = 2;
const BANK_POOL     = 12;

// ─── STATE ────────────────────────────────────────────────────────────────────
const TOTAL_SLIDES = 6;
let currentSlide    = 1;
let videoReady      = { 1:true, 6:true }; // Re-lock slides for production
let dropzoneCount   = 0;
let dragSrc         = null;
let isTutorialActive = true;

// YouTube IFrame player instances
let ytPlayers = {};

// YouTube Config (Slide index mapping)
const YT_CONFIG = {
    'yt-slide3': { slide: 3, start: 13,  end: 139 },
    'yt-slide4': { slide: 4, start: 20,  end: 35  },
    'yt-slide5': { slide: 5, start: 4,   end: 92  }
};

let endTimerInterval = null;

// ─── DOM REFERENCES ───────────────────────────────────────────────────────────
const dropzoneGrid   = document.getElementById('stars-4');
const dropHint       = document.getElementById('drop-hint');
const box4El         = document.getElementById('box-4');
const starBankEl     = document.getElementById('star-bank');
const popupOverlay   = document.getElementById('popup-overlay');
const popupCard      = document.getElementById('popup-card');
const popupIcon      = document.getElementById('popup-icon');
const popupTitle     = document.getElementById('popup-title');
const popupMsg       = document.getElementById('popup-message');
const btnNext        = document.getElementById('btn-popup-next');
const btnNavNext     = document.getElementById('btnNavNext');
const btnBack        = document.getElementById('btnBack');
const progressFill   = document.getElementById('progressFill');
const dotWrapper     = document.getElementById('dotIndicator');
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx            = confettiCanvas.getContext('2d');

// ─── SOUND ENGINE (Web Audio API) ─────────────────────────────────────────────
const SFX = (() => {
  let ac = null;

  function getAC() {
    if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
    return ac;
  }

  // Resume context on first user gesture (browsers require this)
  function resume() {
    const a = getAC();
    if (a.state === 'suspended') a.resume();
  }

  /**
   * Play a simple tone
   * @param {number[]} freqs   - array of {freq, time, dur} or flat freq values
   * @param {string}   type    - oscillator type: 'sine','triangle','square','sawtooth'
   * @param {number}   vol     - gain 0..1
   */
  function tone(freq, type = 'sine', vol = 0.25, startOffset = 0, dur = 0.18) {
    try {
      const a   = getAC();
      const osc = a.createOscillator();
      const gain = a.createGain();
      osc.connect(gain);
      gain.connect(a.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, a.currentTime + startOffset);
      gain.gain.setValueAtTime(vol, a.currentTime + startOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, a.currentTime + startOffset + dur);
      osc.start(a.currentTime + startOffset);
      osc.stop(a.currentTime + startOffset + dur + 0.05);
    } catch (e) { /* silent */ }
  }

  return {
    /** Called on first interaction to unlock AudioContext */
    unlock() { resume(); },

    /** Soft "pop" when a star is dropped into box 4 */
    drop() {
      resume();
      tone(520, 'sine', 0.2, 0, 0.12);
      tone(700, 'sine', 0.15, 0.08, 0.1);
    },

    /** Click / remove star */
    click() {
      resume();
      tone(400, 'sine', 0.15, 0, 0.1);
    },

    /** ✅ Correct answer — ascending fanfare */
    correct() {
      resume();
      const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
      notes.forEach((f, i) => tone(f, 'triangle', 0.22, i * 0.13, 0.2));
    },

    /** ⬆ Too many stars — descending hint */
    tooMany() {
      resume();
      tone(600, 'sine', 0.2, 0, 0.15);
      tone(460, 'sine', 0.2, 0.15, 0.15);
    },

    /** ⬇ Too few stars — gentle nudge */
    tooFew() {
      resume();
      tone(380, 'triangle', 0.2, 0, 0.18);
      tone(430, 'triangle', 0.18, 0.2, 0.18);
    },
  };
})();

// Unlock AudioContext on first touch/click anywhere
document.addEventListener('pointerdown', () => SFX.unlock(), { once: true });

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
function buildDots() {
    dotWrapper.innerHTML = '';
    for (let i = 1; i <= TOTAL_SLIDES; i++) {
        const d = document.createElement('div');
        d.className = 'dot' + (i === 1 ? ' active' : '');
        d.id = `dot-${i}`;
        dotWrapper.appendChild(d);
    }
}

function updateProgress(slide) {
    const pct = (slide / TOTAL_SLIDES) * 100;
    if (progressFill) progressFill.style.width = pct + '%';
    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i + 1 === slide);
    });
}

function goToSlide(target) {
    if (target < 1 || target > TOTAL_SLIDES) return;

    const prevEl = document.getElementById(`slide-${currentSlide}`);
    const nextEl = document.getElementById(`slide-${target}`);

    if (target > currentSlide) {
        prevEl.classList.remove('active');
        prevEl.classList.add('prev');
        nextEl.classList.remove('prev');
        nextEl.classList.add('active');
    } else {
        prevEl.classList.remove('active', 'prev');
        prevEl.style.transform = 'translateX(100%)';
        void prevEl.offsetWidth; // force reflow
        prevEl.style.transform = '';
        nextEl.classList.remove('prev');
        nextEl.classList.add('active');
    }

    pauseSlideMedia(currentSlide);
    stopEndTimer();

    currentSlide = target;
    updateProgress(currentSlide);
    updateNavButtons();

    // Autoplay after transition
    setTimeout(() => autoPlaySlide(currentSlide), 480);
}

function navigate(dir) {
    SFX.click();
    goToSlide(currentSlide + dir);
}

function updateNavButtons() {
    btnBack.disabled = (currentSlide === 1);

    if (currentSlide === 1) {
        document.getElementById('navControls').style.display = 'none';
    } else {
        document.getElementById('navControls').style.display = 'flex';
        btnNavNext.disabled = !videoReady[currentSlide];
    }
}

function startExercise() {
  SFX.click();
  goToSlide(2);
}

// ─── MEDIA HANDLING ──────────────────────────────────────────────────────────
function autoPlaySlide(slide) {
    if (slide === 2) {
        const vid = document.getElementById('video-local');
        if (vid) {
            vid.currentTime = 0;
            vid.play().catch(() => {});
        }
    } else if (slide === 3) playYT('yt-slide3');
    else if (slide === 4) playYT('yt-slide4');
    else if (slide === 5) playYT('yt-slide5');
    else if (slide === 6) {
        // Show tutorial only first time slide 6 is active
        const tutorialOverlay = document.getElementById('tutorial-overlay');
        if (isTutorialActive && tutorialOverlay) {
            tutorialOverlay.style.display = 'flex';
        }
    }
}

function pauseSlideMedia(slide) {
    if (slide === 2) {
        const vid = document.getElementById('video-local');
        if (vid) vid.pause();
    } else if (slide === 3) pauseYT('yt-slide3');
    else if (slide === 4) pauseYT('yt-slide4');
    else if (slide === 5) pauseYT('yt-slide5');
}

function playYT(frameId) {
    const player = ytPlayers[frameId];
    if (player && typeof player.playVideo === 'function') {
        const cfg = YT_CONFIG[frameId];
        if (cfg && cfg.start !== null) player.seekTo(cfg.start, true);
        player.playVideo();
    }
}

function pauseYT(frameId) {
    const player = ytPlayers[frameId];
    if (player && typeof player.pauseVideo === 'function') player.pauseVideo();
}

function unlockNext(slide) {
    videoReady[slide] = true;
    if (currentSlide === slide) btnNavNext.disabled = false;
}

// ─── YOUTUBE IFRAME API ──────────────────────────────────────────────────────
function onYouTubeIframeAPIReady() {
    Object.entries(YT_CONFIG).forEach(([id, cfg]) => {
        ytPlayers[id] = new YT.Player(id, {
            events: {
                onReady: (e) => onYTReady(e, id),
                onStateChange: (e) => onYTStateChange(e, cfg.slide, id),
            }
        });
    });
}

function onYTReady(event, frameId) {
    const cfg = YT_CONFIG[frameId];
    if (cfg && cfg.start !== null) {
        event.target.seekTo(cfg.start, true);
        event.target.pauseVideo();
    }
}

function onYTStateChange(event, slide, frameId) {
    if (event.data === YT.PlayerState.ENDED) {
        unlockNext(slide);
        stopEndTimer();
    }
    if (event.data === YT.PlayerState.PLAYING) {
        const cfg = YT_CONFIG[frameId];
        if (cfg && cfg.end !== null) startEndTimer(frameId);
    }
}

function startEndTimer(frameId) {
    stopEndTimer();
    const cfg = YT_CONFIG[frameId];
    if (!cfg || cfg.end === null) return;
    endTimerInterval = setInterval(() => {
        const player = ytPlayers[frameId];
        if (!player || typeof player.getCurrentTime !== 'function') return;
        if (player.getCurrentTime() >= cfg.end - 0.5) {
            player.stopVideo();
            unlockNext(cfg.slide);
            stopEndTimer();
        }
    }, 500);
}

function stopEndTimer() {
    if (endTimerInterval) {
        clearInterval(endTimerInterval);
        endTimerInterval = null;
    }
}

// ─── TUTORIAL LOGIC ───────────────────────────────────────────────────────────
async function startTutorial() {
  const tutorialOverlay = document.getElementById('tutorial-overlay');
  tutorialOverlay.style.display = 'none';
  
  // Make sure we have stars in the bank
  if (starBankEl.children.length === 0) {
      buildStarBank();
  }
  
  // Wait a bit before starting so the user sees the board
  await new Promise(r => setTimeout(r, 800));

  // We need to move 2 stars for this example
  for (let i = 0; i < 2; i++) {
    await animateTutorialDrag();
    await new Promise(r => setTimeout(r, 500));
  }

  // Click Periksa automatically
  await new Promise(r => setTimeout(r, 800));
  const btnCheck = document.getElementById('btn-check');
  const btnRect = btnCheck.getBoundingClientRect();
  
  // Create hand to click the button
  const hand = document.createElement('div');
  hand.textContent = '👆';
  hand.className = 'tutorial-hand';
  // Start near box 4
  const box4Rect = box4El.getBoundingClientRect();
  hand.style.left = `${box4Rect.left + box4Rect.width/2}px`;
  hand.style.top = `${box4Rect.top + box4Rect.height/2 + 30}px`;
  document.body.appendChild(hand);

  // Animate to button
  await new Promise(r => requestAnimationFrame(r));
  hand.style.left = `${btnRect.left + btnRect.width/2}px`;
  hand.style.top = `${btnRect.top + btnRect.height/2 + 15}px`;
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Press down effect
  btnCheck.style.transform = 'translateY(2px)';
  btnCheck.style.boxShadow = 'none';
  hand.style.transform = 'scale(0.85)';
  SFX.click();
  
  await new Promise(r => setTimeout(r, 250));
  
  // Release
  btnCheck.style.transform = '';
  btnCheck.style.boxShadow = '';
  hand.style.transform = '';
  
  await new Promise(r => setTimeout(r, 300));
  hand.style.opacity = '0';
  setTimeout(() => hand.remove(), 500);
  
  checkAnswer(true); // pass true to indicate tutorial check
}

async function animateTutorialDrag() {
  const bankStars = starBankEl.querySelectorAll('.draggable-star');
  if (bankStars.length === 0) return;
  
  const sourceStar = bankStars[0];
  const sourceRect = sourceStar.getBoundingClientRect();
  const targetRect = box4El.getBoundingClientRect();

  // Hide the real star so it looks like we picked it up
  sourceStar.style.opacity = '0';

  // Create ghost star and hand
  const ghost = document.createElement('span');
  ghost.textContent = '⭐';
  ghost.style.cssText = `
    position: fixed; font-size: 2rem; pointer-events: none; z-index: 9998;
    left: ${sourceRect.left + sourceRect.width/2}px; 
    top: ${sourceRect.top + sourceRect.height/2}px;
    transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
    transform: translate(-50%, -50%) scale(1.3);
    filter: drop-shadow(0 6px 12px rgba(245,200,66,.7));
  `;
  
  const hand = document.createElement('div');
  hand.textContent = '👆';
  hand.className = 'tutorial-hand';
  hand.style.left = `${sourceRect.left + 10}px`;
  hand.style.top = `${sourceRect.top + 20}px`;

  document.body.appendChild(ghost);
  document.body.appendChild(hand);

  // Small delay to show hand clicking the star
  await new Promise(r => setTimeout(r, 200));

  // Animate to target
  await new Promise(r => requestAnimationFrame(r)); // next frame
  
  // Calculate center of box 4
  const targetX = targetRect.left + (targetRect.width / 2);
  const targetY = targetRect.top + (targetRect.height / 2);
  
  ghost.style.left = `${targetX}px`;
  ghost.style.top = `${targetY}px`;
  
  hand.style.left = `${targetX + 10}px`;
  hand.style.top = `${targetY + 20}px`;

  // Wait for animation to finish
  await new Promise(r => setTimeout(r, 1000));

  // Drop
  ghost.style.display = 'none';
  hand.style.display = 'none';
  
  setTimeout(() => {
      ghost.remove();
      hand.remove();
      sourceStar.remove();
  }, 100);
  
  addStarToDropzone();
  replenishBank();
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildDots();
  updateProgress(1);
  updateNavButtons();

  buildStaticBoxes();
  buildStarBank();
  setupDropzone();
  setupPointerDrag();
  
  // Local Video events
  const vid = document.getElementById('video-local');
  if (vid) {
    vid.addEventListener('ended', () => unlockNext(2));
    vid.addEventListener('timeupdate', () => {
        if (vid.duration && vid.currentTime >= vid.duration - 0.5) unlockNext(2);
    });
  }

  // Hide tutorial overlay initially
  const tutorialOverlay = document.getElementById('tutorial-overlay');
  if (tutorialOverlay) tutorialOverlay.style.display = 'none';
});

// ─── BUILD STATIC BOXES (1–3) ─────────────────────────────────────────────────
function buildStaticBoxes() {
  const config = [
    { id: 'stars-1', count: 8 },
    { id: 'stars-2', count: 6 },
    { id: 'stars-3', count: 4 },
  ];
  config.forEach(({ id, count }) => {
    const grid = document.getElementById(id);
    grid.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.textContent = '⭐';
      star.className = 'star-icon';
      star.style.animationDelay = `${i * 0.04}s`;
      grid.appendChild(star);
    }
  });
}

// ─── BUILD STAR BANK ──────────────────────────────────────────────────────────
function buildStarBank() {
  starBankEl.innerHTML = '';
  for (let i = 0; i < BANK_POOL; i++) {
    starBankEl.appendChild(createDraggableStar());
  }
}

function createDraggableStar() {
  const star = document.createElement('span');
  star.textContent = '⭐';
  star.className = 'draggable-star';
  star.setAttribute('draggable', 'true');
  star.setAttribute('role', 'img');
  star.setAttribute('aria-label', 'Bintang yang bisa diseret');
  star.setAttribute('tabindex', '0');

  // HTML5 drag events (desktop)
  star.addEventListener('dragstart', onDragStart);
  star.addEventListener('dragend',   onDragEnd);

  // Keyboard accessibility
  star.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      addStarToDropzone();
    }
  });

  return star;
}

// ─── HTML5 DRAG & DROP ────────────────────────────────────────────────────────
function onDragStart(e) {
  if (isTutorialActive) { e.preventDefault(); return; }
  dragSrc = e.currentTarget;
  dragSrc.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'copy';
  e.dataTransfer.setData('text/plain', 'star');
}

function onDragEnd() {
  if (dragSrc) dragSrc.classList.remove('dragging');
  dragSrc = null;
}

function setupDropzone() {
  box4El.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    box4El.classList.add('drag-over');
  });

  box4El.addEventListener('dragleave', (e) => {
    if (!box4El.contains(e.relatedTarget)) {
      box4El.classList.remove('drag-over');
    }
  });

  box4El.addEventListener('drop', (e) => {
    e.preventDefault();
    box4El.classList.remove('drag-over');
    if (e.dataTransfer.getData('text/plain') === 'star' || dragSrc) {
      addStarToDropzone();
      replenishBank();
    }
  });
}

// ─── POINTER/TOUCH DRAG (mobile) ──────────────────────────────────────────────
function setupPointerDrag() {
  let activeStar = null;
  let ghost      = null;

  starBankEl.addEventListener('pointerdown', (e) => {
    if (isTutorialActive) return;
    const target = e.target.closest('.draggable-star');
    if (!target) return;
    e.preventDefault();
    activeStar = target;
    target.style.opacity = '.4';

    ghost = document.createElement('span');
    ghost.textContent = '⭐';
    ghost.style.cssText = `
      position:fixed;font-size:2rem;pointer-events:none;z-index:9999;
      transform:translate(-50%,-50%) scale(1.3);
      filter:drop-shadow(0 6px 12px rgba(245,200,66,.7));
    `;
    ghost.style.left = e.clientX + 'px';
    ghost.style.top  = e.clientY + 'px';
    document.body.appendChild(ghost);
  });

  window.addEventListener('pointermove', (e) => {
    if (!ghost) return;
    ghost.style.left = e.clientX + 'px';
    ghost.style.top  = e.clientY + 'px';
    const el = document.elementFromPoint(e.clientX, e.clientY);
    box4El.classList.toggle('drag-over', !!(el && box4El.contains(el)));
  });

  window.addEventListener('pointerup', (e) => {
    if (!activeStar) return;
    if (ghost) { ghost.remove(); ghost = null; }
    activeStar.style.opacity = '1';
    box4El.classList.remove('drag-over');

    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el && box4El.contains(el)) {
      addStarToDropzone();
      replenishBank();
    }
    activeStar = null;
  });
}

// ─── ADD / REMOVE STARS ───────────────────────────────────────────────────────
function addStarToDropzone() {
  dropzoneCount++;
  SFX.drop();
  updateDropzoneDisplay();
}

function removeLastStar() {
  if (isTutorialActive) return;
  if (dropzoneCount <= 0) return;
  dropzoneCount--;
  SFX.click();
  updateDropzoneDisplay();
}

function updateDropzoneDisplay() {
  dropzoneGrid.innerHTML = '';

  if (dropzoneCount === 0) {
    dropzoneGrid.appendChild(dropHint);
    dropHint.classList.remove('hidden');
  } else {
    dropHint.classList.add('hidden');
    for (let i = 0; i < dropzoneCount; i++) {
      const star = document.createElement('span');
      star.textContent = '⭐';
      star.className = 'star-icon';
      star.style.animationDelay = `${i * 0.04}s`;
      dropzoneGrid.appendChild(star);
    }
  }

  clearGlows();
}

function clearGlows() {
  box4El.classList.remove('correct-glow', 'hint-glow');
}

// ─── REPLENISH BANK ───────────────────────────────────────────────────────────
function replenishBank() {
  const current = starBankEl.querySelectorAll('.draggable-star').length;
  const needed  = BANK_POOL - current;
  for (let i = 0; i < needed; i++) {
    starBankEl.appendChild(createDraggableStar());
  }
}

// ─── CHECK ANSWER ─────────────────────────────────────────────────────────────
function checkAnswer(isFromTutorial = false) {
  if (isTutorialActive && !isFromTutorial) return;
  
  const count = dropzoneCount;
  clearGlows();

  if (count === CORRECT_COUNT) {
    box4El.classList.add('correct-glow');
    SFX.correct();
    showPopup({
      type    : 'correct',
      icon    : '🏆',
      title   : isTutorialActive ? 'Contoh Selesai!' : 'Hebat! Kamu Benar! 🎉',
      message : isTutorialActive 
        ? 'Perhatikan polanya: <strong>dikurangi 2 setiap langkah</strong>.<br/>8 → 6 → 4 → <span style="color:#16a34a;font-weight:700;">2 ⭐</span><br/><br/>Sekarang giliranmu mengerjakan soal!' 
        : 'Polanya adalah <strong>dikurangi 2 setiap langkah</strong>.<br/>8 → 6 → 4 → <span style="color:#16a34a;font-weight:700;">2 ⭐</span>',
      showNext: true,
      isTutorialEnd: isTutorialActive
    });
    launchConfetti();

  } else if (count > CORRECT_COUNT) {
    box4El.classList.add('hint-glow');
    SFX.tooMany();
    showPopup({
      type    : 'hint',
      icon    : '😮',
      title   : 'Bintangnya Kelebihan!',
      message : 'Wah, bintangnya kelebihan! Coba hitung lagi pengurangannya. Berapa yang harus dikurangi dari 4? 🤔',
      showNext: false,
    });

  } else {
    box4El.classList.add('hint-glow');
    SFX.tooFew();
    showPopup({
      type    : 'hint',
      icon    : '🌟',
      title   : 'Bintang Masih Kurang!',
      message : 'Bintangnya masih kurang nih, ayo tambah lagi! Lihat polanya: 8, 6, 4 … kira-kira berapa ya? 💭',
      showNext: false,
    });
  }
}

// ─── RESET ────────────────────────────────────────────────────────────────────
function resetExercise() {
  if (isTutorialActive) return;
  SFX.click();
  dropzoneCount = 0;
  updateDropzoneDisplay();
  buildStarBank();
  clearGlows();
  closePopup();
  stopConfetti();
}

// ─── POPUP ────────────────────────────────────────────────────────────────────
let currentPopupIsTutorialEnd = false;

function showPopup({ type, icon, title, message, showNext, isTutorialEnd }) {
  currentPopupIsTutorialEnd = isTutorialEnd;
  popupCard.className = `popup-card ${type}`;
  popupIcon.textContent  = icon;
  popupTitle.textContent = title;
  popupMsg.innerHTML     = message;
  
  if (isTutorialEnd) {
    btnNext.textContent = "Mulai Latihan 🚀";
  } else {
    btnNext.textContent = "Lanjut ➜";
  }
  
  btnNext.hidden         = !showNext;
  popupOverlay.hidden    = false;
  popupOverlay.querySelector('.btn-popup-close').focus();
}

function closePopup() {
  popupOverlay.hidden = true;
}

function goNext() {
  closePopup();
  if (currentPopupIsTutorialEnd) {
    isTutorialActive = false;
    stopConfetti();
    // In the real app, this would load Question 1.
    // For now, we'll just reset and let the user play with it.
    resetExercise();
    return;
  }
  
  setTimeout(() => {
    showPopup({
      type    : 'correct',
      icon    : '🚀',
      title   : 'Level Berikutnya!',
      message : 'Selamat! Kamu sudah menyelesaikan Pola Gambar Level 1 dengan cemerlang.<br/><br/>Tanyakan Level 2 kepada gurumu! 😊',
      showNext: false,
    });
  }, 200);
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });
popupOverlay.addEventListener('click', (e) => { if (e.target === popupOverlay) closePopup(); });

// ─── CONFETTI ─────────────────────────────────────────────────────────────────
let confettiParticles = [];
let confettiRunning   = false;
let confettiRAF       = null;

function launchConfetti() {
  confettiCanvas.width  = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiParticles = [];
  const colors = ['#ffd700','#60d4f5','#ff9de2','#a8e6cf','#fdcb82','#b8d4ff'];
  for (let i = 0; i < 100; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: -10 - Math.random() * 200,
      w: 6 + Math.random() * 8,
      h: 10 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot : Math.random() * Math.PI * 2,
      rotV: (Math.random() - .5) * .2,
      vx  : (Math.random() - .5) * 4,
      vy  : 2 + Math.random() * 3,
    });
  }
  confettiRunning = true;
  animateConfetti();
}

function animateConfetti() {
  if (!confettiRunning) return;
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles = confettiParticles.filter(p => p.y < confettiCanvas.height + 20);
  confettiParticles.forEach(p => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
    p.x += p.vx; p.y += p.vy; p.rot += p.rotV; p.vy += .05;
  });
  if (confettiParticles.length > 0) {
    confettiRAF = requestAnimationFrame(animateConfetti);
  } else {
    stopConfetti();
  }
}

function stopConfetti() {
  confettiRunning = false;
  if (confettiRAF) cancelAnimationFrame(confettiRAF);
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

window.addEventListener('resize', () => {
  confettiCanvas.width  = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});
