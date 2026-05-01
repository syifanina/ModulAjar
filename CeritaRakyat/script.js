/* =============================================
   CERITA RAKYAT — script.js
   Slide navigation + video lock logic
   ============================================= */

// ─── SOUND ENGINE (Web Audio API) ────────────
window.SFX = (() => {
  let ctx = null;
  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }
  function tone(freq, type, t, dur, vol, ac) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain); gain.connect(ac.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.start(t); osc.stop(t + dur + 0.01);
  }
  return {
    click() {
      const ac = getCtx(); const t = ac.currentTime;
      tone(600, 'sine', t, 0.05, 0.1, ac);
    },
    correct() {
      const ac = getCtx(); const t = ac.currentTime;
      [523, 659, 784].forEach((f, i) => tone(f, 'triangle', t + i * 0.1, 0.15, 0.2, ac));
    },
    wrong() {
      const ac = getCtx(); const t = ac.currentTime;
      tone(250, 'sawtooth', t, 0.15, 0.15, ac);
      tone(200, 'sawtooth', t + 0.15, 0.2, 0.15, ac);
    },
    complete() {
      const ac = getCtx(); const t = ac.currentTime;
      [523, 659, 784, 659, 1047, 784, 1047].forEach((f, i) =>
        tone(f, 'triangle', t + i * 0.13, 0.2, 0.2, ac));
    },
    reveal() {
      const ac = getCtx(); const t = ac.currentTime;
      tone(440, 'sine', t, 0.07, 0.15, ac);
      tone(660, 'sine', t + 0.06, 0.1, 0.15, ac);
    }
  };
})();

// ─── STATE ───────────────────────────────────
const TOTAL_SLIDES = 10;
let currentSlide = 1;
let videoReady    = {};   // slideIndex → boolean

// YouTube IFrame player instances
let ytPlayers = {};

// ─── VIDEO CONFIG ─────────────────────────────
// Konfigurasi khusus per slide: start (detik), end (detik)
// null = putar sampai habis (default)
const YT_CONFIG = {
    'yt-slide3': { slide: 3, start: 13,  end: 139 },  // 00:13 → 2:19
    'yt-slide4': { slide: 4, start: 20,  end: 35  },  // 00:20 → 0:35
    'yt-slide5': { slide: 5, start: 4,   end: 92  },  // 00:04 → 1:32
    'yt-slide8': { slide: 8, start: null, end: 525 }, // unlock Next & popup di menit 8:45
    'yt-completion':{ slide: 9, start: 71, end: 84 }, // video penyemangat
    'yt-slide10':{ slide: 10, start: null, end: null } // full video, doa penutup
};

// Timer untuk polling waktu pada video dengan batas end
let endTimerInterval = null;

// ─── DOM REFS ────────────────────────────────
const btnBack      = document.getElementById('btnBack');
const btnNext      = document.getElementById('btnNext');
const progressFill = document.getElementById('progressFill');
const dotWrapper   = document.getElementById('dotIndicator');

// ─── BUILD DOTS ──────────────────────────────
function buildDots() {
    dotWrapper.innerHTML = '';
    for (let i = 1; i <= TOTAL_SLIDES; i++) {
        const d = document.createElement('div');
        d.className = 'dot' + (i === 1 ? ' active' : '');
        d.id = `dot-${i}`;
        dotWrapper.appendChild(d);
    }
}
buildDots();

// ─── UPDATE PROGRESS ─────────────────────────
function updateProgress(slide) {
    const pct = (slide / TOTAL_SLIDES) * 100;
    progressFill.style.width = pct + '%';
    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i + 1 === slide);
    });
}

// ─── SLIDE TRANSITION ────────────────────────
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

    // Autoplay setelah transisi selesai
    setTimeout(() => autoPlaySlide(currentSlide), 480);
}

function navigate(dir) {
    if (window.SFX) window.SFX.click();
    goToSlide(currentSlide + dir);
}

// ─── NAV BUTTON STATE ────────────────────────
function updateNavButtons() {
    btnBack.disabled = (currentSlide === 1);

    if (currentSlide === 1) {
        btnNext.style.display = 'none';
        btnBack.style.display = 'none';
    } else if (currentSlide === TOTAL_SLIDES) {
        // Slide terakhir: tampilkan Kembali, sembunyikan Lanjut
        btnNext.style.display = 'none';
        btnBack.style.display = '';
        btnBack.disabled      = false;
    } else {
        btnNext.style.display = '';
        btnBack.style.display = '';
        btnBack.disabled      = false;
        btnNext.disabled      = !videoReady[currentSlide];
    }
}

// ─── AUTO PLAY LOGIC ─────────────────────────
function autoPlaySlide(slide) {
    if (slide === 2) {
        const vid = document.getElementById('video-local');
        if (vid) {
            vid.currentTime = 0;
            vid.play().catch(() => {});
        }
    } else if (slide === 3) {
        playYT('yt-slide3');
        startEndTimer('yt-slide3');
    } else if (slide === 4) {
        playYT('yt-slide4');
        startEndTimer('yt-slide4');
    } else if (slide === 5) {
        playYT('yt-slide5');
        startEndTimer('yt-slide5');
    } else if (slide === 6) {
        resetTujuan();
    } else if (slide === 7) {
        resetSiap();
    } else if (slide === 8) {
        playYT('yt-slide8');
        startEndTimer('yt-slide8'); // mulai polling → unlock di menit 8:45
    } else if (slide === 10) {
        playYT('yt-slide10');
    }
}

function playYT(frameId) {
    const player = ytPlayers[frameId];
    if (player && typeof player.playVideo === 'function') {
        // Jika ada start time, seek ke sana terlebih dahulu
        const cfg = YT_CONFIG[frameId];
        if (cfg && cfg.start !== null) {
            player.seekTo(cfg.start, true);
        }
        player.playVideo();
    }
}

// ─── PAUSE MEDIA ON LEAVE ────────────────────
function pauseSlideMedia(slide) {
    if (slide === 2) {
        const vid = document.getElementById('video-local');
        if (vid) vid.pause();
    } else if (slide === 3) pauseYT('yt-slide3');
    else if (slide === 4) pauseYT('yt-slide4');
    else if (slide === 5) pauseYT('yt-slide5');
    else if (slide === 8) pauseYT('yt-slide8');
    else if (slide === 9) pauseYT('yt-completion');
    else if (slide === 10) pauseYT('yt-slide10');
}

function pauseYT(frameId) {
    const player = ytPlayers[frameId];
    if (player && typeof player.pauseVideo === 'function') {
        player.pauseVideo();
    }
}

// ─── END TIMER: polling waktu untuk video dengan batas end ───
// YouTube kadang tidak fire 'ended' saat menggunakan parameter &end=
// Kita polling setiap 500ms untuk memastikan

function startEndTimer(frameId) {
    stopEndTimer();
    const cfg = YT_CONFIG[frameId];
    if (!cfg || cfg.end === null) return; // tidak ada batas akhir

    endTimerInterval = setInterval(() => {
        const player = ytPlayers[frameId];
        if (!player || typeof player.getCurrentTime !== 'function') return;

        const currentTime = player.getCurrentTime();
        if (currentTime >= cfg.end - 0.3) {
            // Video sudah mencapai batas akhir
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

// ─── UNLOCK NEXT WHEN VIDEO ENDS ─────────────
function unlockNext(slide) {
    videoReady[slide] = true;
    if (currentSlide === slide) {
        btnNext.disabled = false;
    }
}

// ─── LOCAL VIDEO EVENTS ──────────────────────
window.addEventListener('DOMContentLoaded', () => {
    const vid = document.getElementById('video-local');

    vid.addEventListener('ended', () => {
        unlockNext(2);
    });

    vid.addEventListener('timeupdate', () => {
        if (vid.duration && vid.currentTime >= vid.duration - 0.5) {
            unlockNext(2);
        }
    });
});

// ─── YOUTUBE IFRAME API ──────────────────────
function onYouTubeIframeAPIReady() {
    Object.entries(YT_CONFIG).forEach(([id, cfg]) => {
        ytPlayers[id] = new YT.Player(id, {
            events: {
                onReady:       (e) => onYTReady(e, id),
                onStateChange: (e) => onYTStateChange(e, cfg.slide, id),
            }
        });
    });
}

function onYTReady(event, frameId) {
    // Pastikan video mulai dari posisi start (jika ada)
    const cfg = YT_CONFIG[frameId];
    if (cfg && cfg.start !== null) {
        event.target.seekTo(cfg.start, true);
        event.target.pauseVideo(); // jangan autoplay dulu sebelum slide aktif
    }
}

function onYTStateChange(event, slide, frameId) {
    if (event.data === YT.PlayerState.ENDED) {
        unlockNext(slide);
        stopEndTimer();
        // Popup apresiasi khusus slide 8
        if (slide === 8) showS8Popup();
    }
    if (event.data === YT.PlayerState.PLAYING) {
        const cfg = YT_CONFIG[frameId];
        if (cfg && cfg.end !== null && currentSlide === slide) startEndTimer(frameId);
    }
    if (event.data === YT.PlayerState.PAUSED) stopEndTimer();
}

// ─── SLIDE 8 POPUP ─────────────────────────────────
function showS8Popup() {
    const popup = document.getElementById('s8Popup');
    if (popup) popup.classList.add('visible');
}

function hideS8Popup() {
    const popup = document.getElementById('s8Popup');
    if (popup) popup.classList.remove('visible');
}

// ─── INITIAL STATE ───────────────────────────
updateNavButtons();
updateProgress(1);

// ─── TUJUAN PEMBELAJARAN — SLIDE 6 ───────────
const TOTAL_TUJUAN = 4;
let tujuanRevealed = 0;

function resetTujuan() {
    tujuanRevealed = 0;
    for (let i = 1; i <= TOTAL_TUJUAN; i++) {
        const item = document.getElementById(`tujuan-${i}`);
        if (item) item.classList.add('hidden');
    }
    const btn = document.getElementById('revealBtn');
    if (btn) {
        btn.textContent = 'Tampilkan ✨';
        btn.disabled    = false;
    }
}

function revealNextTujuan() {
    if (window.SFX) window.SFX.reveal();
    if (tujuanRevealed >= TOTAL_TUJUAN) return;

    tujuanRevealed++;
    const item = document.getElementById(`tujuan-${tujuanRevealed}`);
    if (item) item.classList.remove('hidden');

    const btn = document.getElementById('revealBtn');

    if (tujuanRevealed >= TOTAL_TUJUAN) {
        // Semua sudah ditampilkan → aktifkan tombol Lanjut
        btn.textContent = 'Semua Tujuan Ditampilkan ✅';
        btn.disabled    = true;
        unlockNext(6);
    } else {
        // Masih ada yang belum — update label dengan sisa
        const sisa = TOTAL_TUJUAN - tujuanRevealed;
        btn.textContent = `Tampilkan Berikutnya (${sisa} lagi) ✨`;
    }
}

// ─── SLIDE 7 — SIAP BELAJAR ──────────────────
function resetSiap() {
    // Kembalikan ke state A (pertanyaan)
    const content = document.getElementById('siapContent');
    const ready   = document.getElementById('siapReady');
    if (content) {
        content.style.display = ''; // pastikan muncul kembali
        content.classList.remove('hiding');
    }
    if (ready) ready.classList.remove('visible');
    // Kunci tombol Next di slide 7
    videoReady[7] = false;
    updateNavButtons();
}

function siapBelajar() {
    if (window.SFX) window.SFX.correct();
    const content = document.getElementById('siapContent');
    const ready   = document.getElementById('siapReady');

    // Fade out state A
    if (content) content.classList.add('hiding');

    // Setelah fade out, tampilkan state B
    setTimeout(() => {
        if (content) content.style.display = 'none';
        if (ready)   ready.classList.add('visible');
    }, 360);

    // Aktifkan tombol Lanjut
    unlockNext(7);
}
