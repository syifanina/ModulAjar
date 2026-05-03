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
            tone(600, 'square', t, 0.06, 0.6, ac); // Square wave lebih tajam
        },
        correct() {
            const ac = getCtx(); const t = ac.currentTime;
            [523, 659, 784].forEach((f, i) => tone(f, 'square', t + i * 0.1, 0.2, 0.8, ac));
        },
        wrong() {
            const ac = getCtx(); const t = ac.currentTime;
            tone(250, 'sawtooth', t, 0.2, 0.9, ac);
            tone(200, 'sawtooth', t + 0.2, 0.25, 0.9, ac);
        },
        complete() {
            const ac = getCtx(); const t = ac.currentTime;
            [523, 659, 784, 659, 1047, 784, 1047].forEach((f, i) =>
                tone(f, 'square', t + i * 0.13, 0.25, 0.8, ac));
        },
        reveal() {
            const ac = getCtx(); const t = ac.currentTime;
            tone(440, 'triangle', t, 0.1, 0.8, ac);
            tone(660, 'triangle', t + 0.08, 0.15, 0.8, ac);
        }
    };
})();

// ─── STATE ───────────────────────────────────
const TOTAL_SLIDES = 8;
let currentSlide = 1;
let videoReady = { 7: true };   // slideIndex → boolean

// State untuk Box Pertanyaan Interaktif di Video
let qBoxStates = {
    1: { shown: false, answered: false, closed: false, start: 68, end: 77 },   // 1:08 - 1:17
    2: { shown: false, answered: false, closed: false, start: 107, end: 115 }, // 1:47 - 1:55
    3: { shown: false, answered: false, closed: false, start: 157, end: 165 }, // 2:37 - 2:45
    4: { shown: false, answered: false, closed: false, start: 200, end: 209 } // 3:20 - 3:29
};

// YouTube IFrame player instances
let ytPlayers = {};

// ─── VIDEO CONFIG ─────────────────────────────
// Konfigurasi khusus per slide: start (detik), end (detik)
// null = putar sampai habis (default)
const YT_CONFIG = {
    'yt-slide3': { slide: 3, start: 13, end: 139 },  // 00:13 → 2:19
    'yt-slide4': { slide: 4, start: 20, end: 35 },  // 00:20 → 0:35
    'yt-slide5': { slide: 5, start: 4, end: 92 }   // 00:04 → 1:32
};

// Timer untuk polling waktu pada video dengan batas end
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

    // Autoplay setelah transisi selesai
    setTimeout(() => autoPlaySlide(currentSlide), 480);
}

function navigate(dir) {
    if (window.SFX) window.SFX.click();
    const target = currentSlide + dir;
    // Intercept: tampilkan konfirmasi sebelum masuk slide 8
    if (target === 8 && dir === 1) {
        document.getElementById('quizConfirmOverlay').classList.add('visible');
        return;
    }
    goToSlide(target);
}

function confirmQuiz(siap) {
    if (window.SFX) window.SFX.click();
    document.getElementById('quizConfirmOverlay').classList.remove('visible');
    if (siap) {
        goToSlide(8);
    }
    // Jika tidak siap: tidak ada aksi, tetap di slide saat ini
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
        btnBack.disabled = false;
    } else {
        btnNext.style.display = '';
        btnBack.style.display = '';
        btnBack.disabled = false;
        btnNext.disabled = !videoReady[currentSlide];
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
    } else if (slide === 7) {
        const vid = document.getElementById('video-pola-gambar');
        if (vid) {
            vid.currentTime = 0;
            vid.play().catch(() => { });
        }
    } else if (slide === 8) {
        initQuiz();
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
    else if (slide === 7) {
        const vid = document.getElementById('video-pola-gambar');
        if (vid) vid.pause();
    }
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
    if (vid) {
        vid.addEventListener('ended', () => {
            unlockNext(2);
        });
        vid.addEventListener('timeupdate', () => {
            if (vid.duration && vid.currentTime >= vid.duration - 0.5) {
                unlockNext(2);
            }
        });
    }

    const vidPola = document.getElementById('video-pola-gambar');
    if (vidPola) {
        vidPola.addEventListener('ended', () => {
            unlockNext(7);
            setTimeout(() => {
                if (currentSlide === 7) navigate(1); // Otomatis ke Slide 8
            }, 1000);
        });
        vidPola.addEventListener('timeupdate', () => {
            const time = vidPola.currentTime;

            // Loop untuk mengecek semua box pertanyaan
            Object.entries(qBoxStates).forEach(([id, q]) => {
                const box = document.getElementById(`qBox-${id}`);
                if (!box) return;

                if (time >= q.start && time <= q.end && !q.answered && !q.closed) {
                    box.classList.add('visible');
                } else {
                    box.classList.remove('visible');
                }
            });

            if (vidPola.duration && vidPola.currentTime >= vidPola.duration - 0.5) {
                unlockNext(7);
            }
        });
    }
});

// ─── INTERACTIVE QBOX FUNCTIONS ─────────────
function closeQBox(id) {
    if (window.SFX) window.SFX.click();
    if (qBoxStates[id]) {
        qBoxStates[id].closed = true;
        document.getElementById(`qBox-${id}`).classList.remove('visible');
    }
}

function checkQAnswer(id, correctAnswers) {
    const q = qBoxStates[id];
    const input = document.getElementById(`qInput-${id}`);
    const feedback = document.getElementById(`qFeedback-${id}`);

    if (!input || !feedback) return;

    const userAns = input.value.trim().toLowerCase();
    const isCorrect = Array.isArray(correctAnswers)
        ? correctAnswers.some(ans => userAns === ans.toLowerCase())
        : userAns === correctAnswers.toLowerCase();

    if (isCorrect) {
        if (window.SFX) window.SFX.correct();
        feedback.textContent = 'Hebat! Benar! 🌟';
        feedback.style.color = '#27ae60';
        q.answered = true;

        // Sembunyikan otomatis setelah 1.5 detik
        setTimeout(() => {
            document.getElementById(`qBox-${id}`).classList.remove('visible');
        }, 1500);
    } else {
        if (window.SFX) window.SFX.wrong();
        feedback.textContent = 'Coba lagi! 😊';
        feedback.style.color = 'var(--primary)';

        // Shake animation
        const box = document.getElementById(`qBox-${id}`);
        box.style.animation = 'none';
        void box.offsetWidth;
        box.style.animation = 'unlockPop 0.3s ease';
    }
}

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
        btn.disabled = false;
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
        btn.disabled = true;
        unlockNext(6);
    } else {
        // Masih ada yang belum — update label dengan sisa
        const sisa = TOTAL_TUJUAN - tujuanRevealed;
        btn.textContent = `Tampilkan Berikutnya (${sisa} lagi) ✨`;
    }
}

// ─── SLIDE 6 — SIAP BELAJAR ──────────────────
function resetSiap() {
    // Kembalikan ke state A (pertanyaan)
    const content = document.getElementById('siapContent');
    const ready = document.getElementById('siapReady');
    if (content) {
        content.style.display = ''; // pastikan muncul kembali
        content.classList.remove('hiding');
    }
    if (ready) ready.classList.remove('visible');
    // Kunci tombol Next di slide 6
    videoReady[6] = false;
    updateNavButtons();
}

function siapBelajar() {
    if (window.SFX) window.SFX.correct();
    const content = document.getElementById('siapContent');
    const ready = document.getElementById('siapReady');

    // Fade out state A
    if (content) content.classList.add('hiding');

    // Setelah fade out, tampilkan state B
    setTimeout(() => {
        if (content) content.style.display = 'none';
        if (ready) ready.classList.add('visible');
    }, 360);

    // Aktifkan tombol Lanjut
    unlockNext(6);

    // Langsung autoplay slide 7 setelah klik Siap?
    // Tunggu animasinya selesai (misal 1 detik) lalu pindah slide otomatis
    setTimeout(() => {
        goToSlide(7); // Pergi ke slide 7 langsung (bypass intercept)
    }, 1200);
}

// ─── QUIZ DATA ───────────────────────────────
const quizData = [
    {
        q: "Berapa banyak gambar hati pada kotak selanjutnya?",
        icon: "<img src='assets/Heart.png' style='width:25px;height:25px;object-fit:contain;pointer-events:none;'>",
        pattern: [20, 15, 10],
        options: ["5", "8", "3", "12"],
        correct: 0
    },
    {
        q: "Berapa banyak gambar Nana pada kotak selanjutnya?",
        icon: "<img src='assets/Karakter_Nana.png' style='width:60px;height:60px;object-fit:contain;pointer-events:none;'>",
        pattern: [2, 5, 8],
        options: ["11", "9", "13", "10"],
        correct: 0
    },
    {
        q: "Berapa banyak gambar Rumah Hanoi pada kotak selanjutnya?",
        icon: "<img src='assets/Hanoi.png' style='width:35px;height:35px;object-fit:contain;pointer-events:none;'>",
        pattern: [1, 2, 3],
        options: ["5", "4", "2", "8"],
        correct: 1
    },
    {
        q: "Berapa banyak gambar Planet Saturnus pada kotak selanjutnya?",
        icon: "<img src='assets/Planet_Saturnus.png' style='width:30px;height:30px;object-fit:contain;pointer-events:none;'>",
        pattern: [10, 7, 4],
        options: ["3", "4", "2", "1"],
        correct: 3
    },
    { q: "Pertanyaan 5...", options: ["A", "B", "C", "D"], correct: 0 },
    { q: "Pertanyaan 6...", options: ["A", "B", "C", "D"], correct: 1 },
    { q: "Pertanyaan 7...", options: ["A", "B", "C", "D"], correct: 2 },
    { q: "Pertanyaan 8...", options: ["A", "B", "C", "D"], correct: 3 },
    { q: "Pertanyaan 9...", options: ["A", "B", "C", "D"], correct: 0 },
    { q: "Pertanyaan 10...", options: ["A", "B", "C", "D"], correct: 1 }
];

// ─── QUIZ PG STATE ───────────────────────────
let quizScore = 0;
let pgDoneCount = 0;
const pgState = quizData.map(() => ({ attempts: 0, locked: false, correct: false }));
const LETTERS = ['A', 'B', 'C', 'D'];

// ─── INIT QUIZ (dipanggil saat masuk slide 8) ─
function initQuiz() {
    quizScore = 0;
    pgDoneCount = 0;
    pgState.forEach(s => { s.attempts = 0; s.locked = false; s.correct = false; });

    const comp = document.getElementById('quizCompletion');
    if (comp) comp.classList.remove('show');

    renderQuiz();
}

// ─── RENDER SEMUA SOAL SEKALIGUS ─────────────
function renderQuiz() {
    const container = document.getElementById('pgContainer');
    if (!container) return;
    container.innerHTML = '';

    quizData.forEach((data, qi) => {
        const card = document.createElement('div');
        card.className = 'pg-card';
        card.id = `pg-card-${qi}`;

        // Bangun HTML pola gambar jika ada
        let patternHTML = '';
        if (data.pattern && data.icon) {
            let boxes = data.pattern.map(count => {
                let icons = '';
                for (let j = 0; j < count; j++) {
                    icons += `<span class="quiz-pattern-icon">${data.icon}</span>`;
                }
                return `<div class="quiz-pattern-box">${icons}</div>`;
            }).join('');
            boxes += `<div class="quiz-pattern-box quiz-pattern-unknown"><span class="quiz-unknown-mark">??</span></div>`;
            patternHTML = `<div class="quiz-pattern-row">${boxes}</div>`;
        }

        // Bangun HTML pilihan
        const optsHTML = data.options.map((opt, oi) => `
            <button class="q-opt" id="q-opt-${qi}-${oi}" onclick="handlePGAnswer(${qi}, ${oi})">
                <span class="opt-letter">${LETTERS[oi]}</span>
                <span class="opt-text">${opt}</span>
            </button>`).join('');

        card.innerHTML = `
            <div class="q-header">
                <span class="q-num-badge">${qi + 1}</span>
                <p class="q-text">${data.q}</p>
            </div>
            ${patternHTML}
            <div class="q-opts" id="q-opts-${qi}">${optsHTML}</div>
            <div class="q-feedback" id="q-fb-${qi}"></div>
        `;
        container.appendChild(card);
    });
}

// ─── HANDLE JAWABAN PG ────────────────────────
function handlePGAnswer(qi, oi) {
    const state = pgState[qi];
    if (state.locked) return;

    const isCorrect = (oi === quizData[qi].correct);
    state.attempts++;

    const btn = document.getElementById(`q-opt-${qi}-${oi}`);
    const fb = document.getElementById(`q-fb-${qi}`);

    if (isCorrect) {
        state.correct = true;
        if (window.SFX) window.SFX.correct();
        quizScore += 10;
        btn.classList.add('opt-correct');
        fb.className = 'q-feedback fb-correct';
        fb.textContent = state.attempts === 1
            ? '✅ Benar! Hebat! 🌟'
            : '✅ Benar! Tetap semangat! 💪';
        lockPG(qi);

    } else if (state.attempts === 1) {
        // Salah pertama → beri kesempatan lagi
        if (window.SFX) window.SFX.wrong();
        btn.classList.add('opt-wrong');
        fb.className = 'q-feedback fb-wrong';
        fb.textContent = '🤔 Kurang tepat... Coba sekali lagi!';
        setTimeout(() => btn.classList.remove('opt-wrong'), 900);

    } else {
        // Salah kedua → kunci soal, beri semangat
        if (window.SFX) window.SFX.wrong();
        btn.classList.add('opt-wrong');
        fb.className = 'q-feedback fb-wrong';
        fb.textContent = '💪 Jangan menyerah! Terus berlatih ya! 😊';
        lockPG(qi);
    }
}

function lockPG(qi) {
    pgState[qi].locked = true;
    document.querySelectorAll(`#q-opts-${qi} .q-opt`).forEach(b => b.disabled = true);
    pgDoneCount++;
    checkQuizComplete();
}

function checkQuizComplete() {
    if (pgDoneCount >= quizData.length) {
        if (window.SFX) window.SFX.complete();
        const comp = document.getElementById('quizCompletion');
        const scoreEl = document.getElementById('resultScore');
        if (scoreEl) scoreEl.textContent = `Skor kamu: ${quizScore}`;
        if (comp) {
            comp.classList.add('show');
            setTimeout(() => comp.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
        }
    }
}
// ─── INITIALIZATION ──────────────────────────
updateNavButtons();
updateProgress(1);