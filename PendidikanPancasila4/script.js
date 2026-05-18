/* =============================================
   PENDIDIKAN PANCASILA — script.js
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
const TOTAL_SLIDES = 9;
let currentSlide = 1;
let videoReady = {};   // slideIndex → boolean

// YouTube IFrame player instances
let ytPlayers = {};

// ─── VIDEO CONFIG ─────────────────────────────
const YT_CONFIG = {
    'yt-slide3': { slide: 3, start: 13, end: 139 },
    'yt-slide4': { slide: 4, start: 20, end: 35 },
    'yt-slide5': { slide: 5, start: 4, end: 92 },
    'yt-completion': { slide: 7, start: 71, end: 84 },
    'yt-slide9': { slide: 9, start: null, end: null }
};

let endTimerInterval = null;

// ─── DOM REFS ────────────────────────────────
const btnBack = document.getElementById('btnBack');
const btnNext = document.getElementById('btnNext');
const progressFill = document.getElementById('progressFill');
const dotWrapper = document.getElementById('dotIndicator');

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
        btnNext.style.display = 'none';
        btnBack.style.display = '';
        btnBack.disabled = false;
    } else {
        btnNext.style.display = '';
        btnBack.style.display = '';
        btnBack.disabled = false;
        btnNext.disabled = false;
    }
}

// ─── AUTO PLAY LOGIC ─────────────────────────
function autoPlaySlide(slide) {
    if (slide === 2) {
        const vid = document.getElementById('video-local');
        if (vid) {
            vid.currentTime = 0;
            vid.play().catch(() => { });
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
        resetSiap();
    } else if (slide === 8) {
        videoReady[8] = true;
        updateNavButtons();
        loadHallOfFame();
    } else if (slide === 9) {
        playYT('yt-slide9');
    }
}

function playYT(frameId) {
    const player = ytPlayers[frameId];
    if (player && typeof player.playVideo === 'function') {
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
    else if (slide === 7) pauseYT('yt-completion');
    else if (slide === 9) pauseYT('yt-slide9');
}

function pauseYT(frameId) {
    const player = ytPlayers[frameId];
    if (player && typeof player.pauseVideo === 'function') {
        player.pauseVideo();
    }
}

// ─── END TIMER ───
function startEndTimer(frameId) {
    stopEndTimer();
    const cfg = YT_CONFIG[frameId];
    if (!cfg || cfg.end === null) return;

    endTimerInterval = setInterval(() => {
        const player = ytPlayers[frameId];
        if (!player || typeof player.getCurrentTime !== 'function') return;

        const currentTime = player.getCurrentTime();
        if (currentTime >= cfg.end - 0.3) {
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

// ─── UNLOCK NEXT ─────────────
function unlockNext(slide) {
    videoReady[slide] = true;
    if (currentSlide === slide) {
        btnNext.disabled = false;
    }
}

// ─── LOCAL VIDEO EVENTS ──────────────────────
window.addEventListener('DOMContentLoaded', () => {
    const vid = document.getElementById('video-local');
    if (vid) {
        vid.addEventListener('ended', () => unlockNext(2));
        vid.addEventListener('timeupdate', () => {
            if (vid.duration && vid.currentTime >= vid.duration - 0.5) {
                unlockNext(2);
            }
        });
    }
});

// ─── YOUTUBE IFRAME API ──────────────────────
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
        if (cfg && cfg.end !== null && currentSlide === slide) startEndTimer(frameId);
    }
    if (event.data === YT.PlayerState.PAUSED) stopEndTimer();
}

// ─── INITIAL STATE ───────────────────────────
updateNavButtons();
updateProgress(1);

// ─── SLIDE 6 — SIAP BELAJAR ──────────────────
function resetSiap() {
    const content = document.getElementById('siapContent');
    const ready = document.getElementById('siapReady');
    if (content) {
        content.style.display = '';
        content.classList.remove('hiding');
    }
    if (ready) ready.classList.remove('visible');
    videoReady[6] = false;
    updateNavButtons();
}

function siapBelajar() {
    if (window.SFX) window.SFX.correct();
    const content = document.getElementById('siapContent');
    const ready = document.getElementById('siapReady');

    if (content) content.classList.add('hiding');

    setTimeout(() => {
        if (content) content.style.display = 'none';
        if (ready) ready.classList.add('visible');
    }, 360);

    unlockNext(6);
}

// ─── HALL OF FAME ─────────────────────────────────
async function loadHallOfFame() {
    const SHEET_ID = '1LImhKqqcsyqMPwmarBsefPZ4cU-uk7rX2O7eu6hY2Xw';
    const GID = '0';
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;

    const grid = document.getElementById('hofGrid');
    if (!grid) return;
    grid.innerHTML = '<div class="hof-loading">⏳ Memuat data...</div>';

    try {
        const res = await fetch(url);
        const text = await res.text();
        const jsonStr = text.replace(/^[^(]+\(/, '').replace(/\);?\s*$/, '');
        const data = JSON.parse(jsonStr);
        const rows = data?.table?.rows;

        if (!rows || rows.length === 0) {
            grid.innerHTML = '<p class="hof-empty">Belum ada yang mengumpulkan. 😊</p>';
            return;
        }

        grid.innerHTML = '';
        rows.forEach((row, i) => {
            const nama = row.c?.[1]?.v ?? '–';
            const kelas = row.c?.[2]?.v ?? '';
            const card = document.createElement('div');
            card.className = 'hof-card';
            card.style.animationDelay = `${i * 0.07}s`;
            card.innerHTML = `
                <div class="hof-rank">${i + 1}</div>
                <div class="hof-info">
                    <div class="hof-name">${nama}</div>
                    ${kelas ? `<div class="hof-kelas">${kelas}</div>` : ''}
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (e) {
        grid.innerHTML = '<p class="hof-empty">⚠️ Gagal memuat data.</p>';
    }
}
