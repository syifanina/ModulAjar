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
const TOTAL_SLIDES = 10;
let currentSlide = 1;
let videoReady = {};
for (let i = 1; i <= TOTAL_SLIDES; i++) videoReady[i] = true; // Semua slide langsung terbuka (unlocked)



// YouTube IFrame player instances
let ytPlayers = {};

// ─── VIDEO CONFIG ─────────────────────────────
// Konfigurasi khusus per slide: start (detik), end (detik)
// null = putar sampai habis (default)
const YT_CONFIG = {
    'yt-slide3': { slide: 3, start: 13, end: 139 },  // 00:13 → 2:19
    'yt-slide4': { slide: 4, start: 20, end: 35 },  // 00:20 → 0:35
    'yt-slide5': { slide: 5, start: 4, end: 92 },   // 00:04 → 1:32
    'yt-slide7': { slide: 7, start: null, end: null }, // Video Pembelajaran (Interactive)
    'yt-slide10': { slide: 10, start: null, end: null } // Doa Penutup
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
        // Tampilkan overlay tahap 2
        const paperOverlay = document.getElementById('paperConfirmOverlay');
        if (paperOverlay) paperOverlay.classList.add('visible');
    }
}

function confirmPaper() {
    if (window.SFX) window.SFX.click();
    const paperOverlay = document.getElementById('paperConfirmOverlay');
    if (paperOverlay) paperOverlay.classList.remove('visible');
    
    // Baru masuk ke slide 8
    goToSlide(8);
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
    } else if (slide === 9) {
        // Hall of Fame: tidak ada video, langsung unlock Lanjut
        videoReady[9] = true;
        updateNavButtons();
        loadHallOfFame();
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
    else if (slide === 7) pauseYT('yt-slide7');
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

// ─── INTERACTIVE POLLING (untuk YouTube Slide 7) ───
let interactiveTimer = null;
function startInteractivePolling() {
    stopInteractivePolling();
    interactiveTimer = setInterval(() => {
        const player = ytPlayers['yt-slide7'];
        if (!player || typeof player.getCurrentTime !== 'function') return;
        const time = player.getCurrentTime();



        // Cek jika hampir selesai (untuk unlock Next)
        if (typeof player.getDuration === 'function') {
            const dur = player.getDuration();
            if (dur > 0 && time >= dur - 1) {
                unlockNext(7);
            }
        }
    }, 500);
}

function stopInteractivePolling() {
    if (interactiveTimer) {
        clearInterval(interactiveTimer);
        interactiveTimer = null;
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
        // ... (Elemen ini sudah diganti YouTube, kode ini bisa dihapus)
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
        stopInteractivePolling();

        if (slide === 7) {
            setTimeout(() => {
                if (currentSlide === 7) navigate(1);
            }, 1000);
        }
        
        // Popup apresiasi khusus slide 8 (jika ada)
        if (slide === 8) showS8Popup();
    }
    if (event.data === YT.PlayerState.PLAYING) {
        const cfg = YT_CONFIG[frameId];
        if (cfg && cfg.end !== null && currentSlide === slide) startEndTimer(frameId);
        
        if (slide === 7) startInteractivePolling();
    }
    if (event.data === YT.PlayerState.PAUSED) {
        stopEndTimer();
        stopInteractivePolling();
    }
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

// ─── QUIZ DATA (PG + ISIAN) ──────────────────
// 10 Soal Pilihan Ganda
const pgData = [
    {
        q: "Perhatikan pola bilangan berikut ini.\n2, 4, 6, 8, __\nAngka berikutnya adalah …",
        options: ["a. 9", "b. 10", "c. 11", "d. 12"],
        correct: 1,
        pembahasan: "Perhatikan selisih tiap angka:<br>4 − 2 = +2<br>6 − 4 = +2<br>8 − 6 = +2<br>Jadi polanya bertambah 2 setiap langkah (bilangan genap berurutan).<br>Maka angka berikutnya:<br>8 + 2 = <strong>10</strong><br>✅ Jawaban: b. 10"
    },
    {
        q: "Perhatikan pola bilangan berikut ini.\n5, __, 15, 20, __\nAngka yang tepat adalah …",
        options: ["a. 8, 25", "b. 9, 22", "c. 10, 25", "d. 12, 25"],
        correct: 2,
        pembahasan: "Kita lihat polanya dulu: 5, __, 15, 20, __<br>Lebih tepatnya kita lihat sebagai pola bertambah tetap:<br>5, 10, 15, 20, 25<br>Selisihnya:<br>+5, +5, +5, +5 → konsisten<br>Jadi:<br>Angka yang kosong pertama = <strong>10</strong><br>Angka yang kosong terakhir = <strong>25</strong><br>✅ Jawaban: c. 10, 25"
    },
    {
        q: "Perhatikan pola bilangan berikut ini.\n100, 90, 80, __, 60\nAngka yang tepat adalah …",
        options: ["a. 65", "b. 70", "c. 75", "d. 85"],
        correct: 1,
        pembahasan: "Perhatikan selisih tiap bilangan:<br>90 − 100 = −10<br>80 − 90 = −10<br>Berarti polanya berkurang 10 setiap langkah.<br>Lanjutkan:<br>80 − 10 = <strong>70</strong><br>70 − 10 = 60 (sesuai dengan yang ada)<br>Jadi angka yang tepat adalah <strong>70</strong>.<br>✅ Jawaban: b. 70"
    },
    {
        q: "Perhatikan pola bilangan berikut ini.\n50, 45, 35, 20, …\nPola tersebut adalah …",
        options: ["a. Membesar", "b. Mengecil", "c. Tetap", "d. Campuran"],
        correct: 1,
        pembahasan: "Coba kita lihat perubahan tiap angka:<br>50 → 45 = −5<br>45 → 35 = −10<br>35 → 20 = −15<br>Memang selisihnya tidak sama, tapi semua angkanya semakin kecil (menurun).<br>Jadi jenis polanya adalah pola <strong>mengecil</strong>, bukan tetap atau campuran.<br>✅ Jawaban: b. Mengecil"
    },
    {
        q: "⭐ Soal Sulit!\n3, 5, 9, 15, 23, …\nAngka berikutnya adalah …",
        options: ["a. 30", "b. 31", "c. 33", "d. 35"],
        correct: 2,
        pembahasan: "Coba lihat selisih tiap angka:<br>5 − 3 = +2<br>9 − 5 = +4<br>15 − 9 = +6<br>23 − 15 = +8<br>Pola selisihnya: +2, +4, +6, +8, … (bertambah 2)<br>Selanjutnya: +10<br>23 + 10 = <strong>33</strong><br>✅ Jawaban: c. 33"
    },
    {
        q: "Layla punya 50 permen. Setiap hari dimakan 5 permen.\nHari ke-2 tersisa 45, hari ke-3 tersisa 40.\nHari ke-5 tersisa …",
        options: ["a. 25", "b. 30", "c. 35", "d. 40"],
        correct: 1,
        pembahasan: "Coba lihat perubahannya:<br>50 → 45 = −5<br>45 → 40 = −5<br>40 → 35 = −5<br>35 → 30 = −5<br>Setiap hari berkurang 5 permen.<br>Hari 1: 50<br>Hari 2: 45<br>Hari 3: 40<br>Hari 4: 35<br>Hari 5: <strong>30</strong><br>✅ Jawaban: b. 30"
    },
    {
        q: "Perhatikan pola bilangan berikut ini.\n60, 54, 48, 42, 36\nPola pada deret bilangan tersebut adalah …",
        options: ["a. +6", "b. −6", "c. +12", "d. −12"],
        correct: 1,
        pembahasan: "Coba lihat perubahannya:<br>60 → 54 = −6<br>54 → 48 = −6<br>48 → 42 = −6<br>42 → 36 = −6<br>Setiap langkah berkurang <strong>6</strong>.<br>✅ Jawaban: b. −6"
    },
    {
        q: "⭐ Soal Sulit!\n1, 3, 6, 10, 15, …\nUrutan ke-8 adalah …",
        options: ["a. 33", "b. 34", "c. 35", "d. 36"],
        correct: 3,
        pembahasan: "Coba lihat selisihnya:<br>3 − 1 = +2<br>6 − 3 = +3<br>10 − 6 = +4<br>15 − 10 = +5<br>Pola selisih: +2, +3, +4, +5, …<br>Lanjutkan:<br>+6 → 21 (suku ke-6)<br>+7 → 28 (suku ke-7)<br>+8 → <strong>36</strong> (suku ke-8)<br>✅ Jawaban: d. 36"
    },
    {
        q: "Perhatikan pola bilangan berikut.\n1, 3, 5, 7, 9, …\nJenis pola bilangan tersebut adalah …",
        options: ["a. Mengecil", "b. Melebar", "c. Menyempit", "d. Membesar"],
        correct: 3,
        pembahasan: "Coba lihat perubahannya:<br>1 → 3 = +2<br>3 → 5 = +2<br>5 → 7 = +2<br>7 → 9 = +2<br>Setiap langkah bertambah 2, sehingga nilainya semakin besar.<br>✅ Jawaban: d. membesar"
    },
    {
        q: "Barisan yang BUKAN merupakan pola bilangan adalah …",
        options: ["a. 30, 24, 18, 12, 6", "b. 36, 30, 22, 14, 6", "c. 52, 41, 30, 19, 8", "d. 27, 22, 17, 12, 7"],
        correct: 1,
        pembahasan: "Kita cek satu per satu:<br><br>a. 30, 24, 18, 12, 6<br>30 → 24 = −6 | 24 → 18 = −6 | 18 → 12 = −6 | 12 → 6 = −6<br>➡️ Pola jelas (−6) ✅<br><br>b. 36, 30, 22, 14, 6<br>36 → 30 = −6 | 30 → 22 = −8 | 22 → 14 = −8 | 14 → 6 = −8<br>➡️ <strong>Tidak konsisten dari awal</strong> ❌<br><br>c. 52, 41, 30, 19, 8<br>52 → 41 = −11 | 41 → 30 = −11 | 30 → 19 = −11 | 19 → 8 = −11<br>➡️ Pola jelas (−11) ✅<br><br>d. 27, 22, 17, 12, 7<br>27 → 22 = −5 | 22 → 17 = −5 | 17 → 12 = −5 | 12 → 7 = −5<br>➡️ Pola jelas (−5) ✅<br><br>Jadi yang bukan pola bilangan adalah:<br>❌ b. 36, 30, 22, 14, 6"
    }
];

// 5 Soal Isian
const isianData = [
    {
        q: "Melissa mendapat tugas berjualan pada kegiatan market day Al Azhar. Ia bertugas menjual buku-buku Islami. Melissa menyusun buku-bukunya dengan pola tertentu di atas rak buku. Rak buku itu terdiri dari 6 tingkatan. Tingkat pertama diisi 86 buku, tingkat kedua diisi 74 buku, dan tingkat ketiga diisi 62 buku. Jadi berapakah buku yang berada di tingkat keenam?",
        correct: ["26", "26 buku"],
        pembahasan: "Tingkat 1: 86 buku<br>Tingkat 2: 74 buku<br>Tingkat 3: 62 buku<br>Coba lihat perubahannya:<br>86 → 74 = -12<br>74 → 62 = -12<br>Berarti setiap tingkat berkurang 12 buku.<br>Tingkat 4: 50 buku<br>Tingkat 5: 38 buku<br>Tingkat 6: 26 buku<br>✅ Jawaban: 26 buku"
    },
    {
        q: "Tentukan bilangan yang hilang pada pola berikut:\n5, 10, __, __, 25, __, __, 40\n(Ketik semua jawaban dipisah koma, contoh: 15, 20, 30, 35)",
        correct: ["15, 20, 30, 35", "15,20,30,35"],
        pembahasan: "5, 10, 15, 20, 25, 30, 35, 40<br>Coba lihat perubahannya:<br>5 → 10 = +5<br>10 → 15 = +5<br>15 → 20 = +5<br>20 → 25 = +5<br>25 → 30 = +5<br>30 → 35 = +5<br>35 → 40 = +5<br>Setiap langkah bertambah 5.<br>Bilangan yang hilang: 15, 20, 30, 35 ✅"
    },
    {
        q: "Sebuah lapangan bola basket memiliki 12 kursi pada baris paling depan.\nSetiap baris di belakangnya memiliki 3 kursi lebih banyak dari baris di depannya. \nBerapa banyak kursi pada baris ke-7?",
        correct: ["30", "30 kursi"],
        pembahasan: "Baris 1: 12 kursi<br>Baris 2: 15 kursi<br>Baris 3: 18 kursi<br>Baris 4: 21 kursi<br>Baris 5: 24 kursi<br>Baris 6: 27 kursi<br>Baris 7: 30 kursi<br>Setiap baris bertambah 3 kursi.<br>✅ Jawaban: 30 kursi"
    },
    {
        q: "Novaria dan Miya bekerja sama menata kursi-kursi di gudang. Kursi tersebut memiliki tinggi yang sama. Pada saat hanya ada satu kursi tingginya adalah 80 cm, ketika ditumpuk dua kursi tingginya menjadi 90cm. Sedangkan kerika ditumpuk tiga kursi maka tinggi nya menjadi 100cm. Berapakah tinggi tumpukan kursi yang berisi 5 buah kursi?",
        correct: ["120", "120 cm", "120 kursi"],
        pembahasan: "Ayo kita bantu Novaria dan Miya menghitungnya dengan cara yang mudah dipahami untuk anak-anak:<br><strong>1. Lihat \"Lompatan\" Angkanya</strong><br>Kita perhatikan dulu kenaikan tingginya setiap kali kursi ditambah:<br>• 1 Kursi: 80 cm<br>• 2 Kursi: 90 cm (Berarti naik 10 cm)<br>• 3 Kursi: 100 cm (Naik lagi 10 cm)<br>Ternyata, setiap kali kita menambah satu kursi di atasnya, tingginya selalu bertambah 10 cm.<br><br><strong>2. Mari Kita Lanjutkan Hitungannya</strong><br>Karena kita sudah tahu polanya selalu bertambah 10, kita tinggal meneruskan saja tumpukannya sampai 5 kursi:<br>• Tumpukan 3 kursi: 100 cm<br>• Tumpukan 4 kursi: 100 cm + 10 cm = 110 cm<br>• Tumpukan 5 kursi: 110 cm + 10 cm = 120 cm"
    },
    {
        type: "table_tf",
        q: "Ayo bantu Nana dan teman-temannya! Beri tanda centang (✓) pada kotak untuk pola bilangan yang selalu bertambah 7 (+7):",
        items: [
            "4, 11, 18, 25, 32",
            "13, 20, 27, 34, 41",
            "19, 26, 33, 39, 46",
            "8, 15, 22, 29, 36",
            "22, 29, 36, 42, 49"
        ],
        correct: ["B", "B", "S", "B", "S"],
        pembahasan: "Nomor 1: BENAR. Dimulai dari 4 dan selalu meloncat 7 angka.<br>Nomor 2: BENAR. Pola penjumlahannya konsisten +7.<br>Nomor 3: SALAH. Jebakan di angka 33 ke 39 (hanya bertambah 6).<br>Nomor 4: BENAR. Meskipun angkanya tidak \"bulat\", selisihnya selalu 7.<br>Nomor 5: SALAH. Jebakan di angka 36 ke 42 (hanya bertambah 6)."
    }
];


// ─── QUIZ STATE ────────────────────────────────
let quizScore = 0;
const totalQuestions = pgData.length + isianData.length;
const pgState    = pgData.map(()    => ({ attempts: 0, locked: false, correct: false, chosenWrong: -1 }));
const isianState = isianData.map(() => ({ attempts: 0, locked: false, correct: false, userAns: '', userAnsTable: [] }));

// ─── SFX WRAPPERS ─────────────────────────────
function sfxCorrect()    { if (window.SFX) window.SFX.correct(); }
function sfxWrong()      { if (window.SFX) window.SFX.wrong(); }
function sfxPembahasan() { if (window.SFX) window.SFX.reveal(); }
function sfxClose()      { if (window.SFX) window.SFX.click(); }

// ─── INIT QUIZ ────────────────────────────────
function initQuiz() {
    const comp = document.getElementById('quizCompletion');
    const allLocked = pgState.every(s => s.locked) && isianState.every(s => s.locked);
    if (comp && !allLocked) comp.classList.remove('show');
    renderQuiz();
    if (allLocked) checkQuizComplete();
}

// ─── RENDER SEMUA SOAL ────────────────────────
function renderQuiz() {
    const container = document.getElementById('pgContainer');
    if (!container) return;
    container.innerHTML = '';

    // ── Pilihan Ganda Section ──
    const pgSection = document.createElement('div');
    pgSection.className = 'quiz-section';
    pgSection.innerHTML = '<h3 class="quiz-section-title">📝 Pilihan Ganda</h3>';

    pgData.forEach((data, qi) => {
        const state = pgState[qi];
        const card = document.createElement('div');
        card.className = 'pg-card' + (state.locked ? ' locked' : '');
        card.id = `pg-card-${qi}`;

        const optsHTML = data.options.map((opt, oi) => {
            let cls = 'q-opt';
            let disabled = '';
            if (state.locked) {
                disabled = 'disabled';
                if (oi === state.chosenWrong && oi !== data.correct) cls += ' opt-wrong-final';
                if (oi === data.correct) cls += ' opt-correct';
            }
            return `<button class="${cls}" id="pg-opt-${qi}-${oi}" ${disabled} onclick="handlePGAnswer(${qi},${oi})">${opt}</button>`;
        }).join('');

        card.innerHTML = `
            <div class="q-header">
                <span class="q-num-badge">${qi + 1}</span>
                <p class="q-text">${data.q.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="q-opts" id="pg-opts-${qi}">${optsHTML}</div>
            <div class="q-feedback" id="pg-fb-${qi}"></div>
        `;
        pgSection.appendChild(card);
    });
    container.appendChild(pgSection);

    // ── Soal Isian Section ──
    const isianSection = document.createElement('div');
    isianSection.className = 'quiz-section';
    isianSection.innerHTML = '<h3 class="quiz-section-title">✏️ Soal Isian</h3>';

    isianData.forEach((data, qi) => {
        const state = isianState[qi];
        const card = document.createElement('div');
        card.className = 'pg-card isian-card' + (state.locked ? ' locked' : '');
        card.id = `isian-card-${qi}`;

        const sisaAwal = 3 - state.attempts;
        let inputHTML = '';

        if (data.type === 'table_tf') {
            let rows = '';
            data.items.forEach((item, idx) => {
                const uAns = state.userAnsTable ? state.userAnsTable[idx] : '';
                const bChecked = uAns === 'B' ? 'checked' : '';
                const sChecked = uAns === 'S' ? 'checked' : '';
                const dis = state.locked ? 'disabled' : '';
                
                let mark = '';
                if (state.locked) {
                    const isC = uAns === data.correct[idx];
                    mark = isC ? '<span style="color:#059669;font-weight:bold;margin-left:5px;">✅</span>' : 
                                 `<span style="color:#dc2626;font-weight:bold;margin-left:5px;">❌ (Benar: ${data.correct[idx]})</span>`;
                }

                rows += `
                    <tr>
                        <td class="tf-item-text">${idx+1}. ${item} ${mark}</td>
                        <td class="tf-check"><label><input type="radio" name="tf-${qi}-${idx}" value="B" ${bChecked} ${dis}> Benar</label></td>
                        <td class="tf-check"><label><input type="radio" name="tf-${qi}-${idx}" value="S" ${sChecked} ${dis}> Salah</label></td>
                    </tr>
                `;
            });

            const btnHTML = state.locked ? '' : `
                <div class="isian-input-group" style="justify-content: flex-end; margin-top: 10px;">
                    <button class="isian-cek-btn" onclick="handleTableTFAnswer(${qi})">Cek ✓</button>
                </div>
                <div class="isian-sisa" id="isian-sisa-${qi}">Kesempatan: ${sisaAwal} kali lagi</div>
            `;

            inputHTML = `
                <div class="tf-table-container">
                    <table class="tf-table">
                        <tbody>${rows}</tbody>
                    </table>
                </div>
                ${btnHTML}
            `;
        } else {
            const uVal = state.userAns || '';
            const dis = state.locked ? 'disabled' : '';
            const btnHTML = state.locked ? '' : `<button class="isian-cek-btn" onclick="handleIsianAnswer(${qi})">Cek ✓</button>`;
            
            let corrHTML = '';
            if (state.locked) {
                corrHTML = `<div style="margin-top: 10px; font-size: 0.95rem; color: #059669; font-weight: bold; background: #ecfdf5; padding: 10px; border-radius: 8px; border: 1px solid #10b981;">
                    ✅ Jawaban Benar: ${data.correct[0]}
                </div>`;
            }

            inputHTML = `
                <div class="isian-input-group">
                    <input type="text" id="isian-input-${qi}" placeholder="Tulis jawabanmu..." autocomplete="off" value="${uVal}" ${dis}>
                    ${btnHTML}
                </div>
                ${corrHTML}
                ${state.locked ? '' : `<div class="isian-sisa" id="isian-sisa-${qi}">Kesempatan: ${sisaAwal} kali lagi</div>`}
            `;
        }

        card.innerHTML = `
            <div class="q-header">
                <span class="q-num-badge q-num-isian">${pgData.length + qi + 1}</span>
                <p class="q-text">${data.q.replace(/\n/g, '<br>')}</p>
            </div>
            ${inputHTML}
            <div class="q-feedback" id="isian-fb-${qi}"></div>
        `;
        isianSection.appendChild(card);
    });
    container.appendChild(isianSection);
}

// ─── HANDLE PILIHAN GANDA ─────────────────────
function handlePGAnswer(qi, oi) {
    const state = pgState[qi];
    if (state.locked) return;

    const isCorrect = (oi === pgData[qi].correct);
    state.attempts++;

    const btn = document.getElementById(`pg-opt-${qi}-${oi}`);
    const fb  = document.getElementById(`pg-fb-${qi}`);

    if (isCorrect) {
        sfxCorrect();
        state.correct = true;
        quizScore += 10;
        btn.classList.add('opt-correct');
        fb.className = 'q-feedback fb-correct';
        fb.textContent = state.attempts === 1 ? '✅ Benar! Hebat! 🌟' : '✅ Benar! Tetap semangat! 💪';
        lockPG(qi, oi);
        setTimeout(() => showPembahasan(pgData[qi].pembahasan, true, `pg-card-${qi}`), 800);
    } else if (state.attempts === 1) {
        sfxWrong();
        btn.classList.add('opt-wrong');
        fb.className = 'q-feedback fb-wrong';
        fb.textContent = '🤔 Kurang tepat... Coba sekali lagi!';
        setTimeout(() => btn.classList.remove('opt-wrong'), 900);
    } else {
        sfxWrong();
        state.chosenWrong = oi;
        btn.classList.add('opt-wrong');
        fb.className = 'q-feedback fb-wrong';
        fb.textContent = '💪 Jangan menyerah! Yuk lihat pembahasannya!';
        lockPG(qi, oi);
        setTimeout(() => showPembahasan(pgData[qi].pembahasan, false, `pg-card-${qi}`), 800);
    }
}

function lockPG(qi, chosenOi) {
    pgState[qi].locked = true;
    pgState[qi].chosenWrong = chosenOi;
    document.querySelectorAll(`#pg-opts-${qi} .q-opt`).forEach(b => b.disabled = true);
    const correctBtn = document.getElementById(`pg-opt-${qi}-${pgData[qi].correct}`);
    if (correctBtn) correctBtn.classList.add('opt-correct');
    const card = document.getElementById(`pg-card-${qi}`);
    if (card) card.classList.add('locked');
}

// ─── HANDLE ISIAN ─────────────────────────────
function handleIsianAnswer(qi) {
    const state = isianState[qi];
    if (state.locked) return;

    const input  = document.getElementById(`isian-input-${qi}`);
    const fb     = document.getElementById(`isian-fb-${qi}`);
    const sisaEl = document.getElementById(`isian-sisa-${qi}`);
    if (!input || !fb) return;

    const userAns = input.value.trim().toLowerCase().replace(/\s*,\s*/g, ',');
    state.userAns = input.value.trim(); // Simpan jawaban asli siswa
    const isCorrect = isianData[qi].correct.some(ans => userAns === ans.toLowerCase().replace(/\s*,\s*/g, ','));

    state.attempts++;
    const sisaKesempatan = 3 - state.attempts;

    if (isCorrect) {
        sfxCorrect();
        state.correct = true;
        quizScore += 10;
        fb.className = 'q-feedback fb-correct';
        fb.textContent = '✅ Benar! Luar biasa! 🌟';
        lockIsian(qi, input);
        setTimeout(() => showPembahasan(isianData[qi].pembahasan, true, `isian-card-${qi}`), 800);
    } else if (state.attempts < 3) {
        sfxWrong();
        fb.className = 'q-feedback fb-wrong';
        fb.textContent = `🤔 Belum tepat. Coba lagi! (${sisaKesempatan} kesempatan lagi)`;
        if (sisaEl) sisaEl.textContent = `Kesempatan: ${sisaKesempatan} kali lagi`;
        input.value = '';
        input.focus();
    } else {
        sfxWrong();
        fb.className = 'q-feedback fb-wrong';
        fb.textContent = '💪 Kesempatan habis. Yuk lihat pembahasannya!';
        lockIsian(qi, input);
        setTimeout(() => showPembahasan(isianData[qi].pembahasan, false, `isian-card-${qi}`), 800);
    }
}

function handleTableTFAnswer(qi) {
    const state = isianState[qi];
    if (state.locked) return;

    const data = isianData[qi];
    const fb     = document.getElementById(`isian-fb-${qi}`);
    const sisaEl = document.getElementById(`isian-sisa-${qi}`);
    
    // Kumpulkan jawaban
    let allAnswered = true;
    let isCorrect = true;
    let vals = [];
    for (let i = 0; i < data.items.length; i++) {
        const radios = document.getElementsByName(`tf-${qi}-${i}`);
        let val = '';
        for (let r of radios) {
            if (r.checked) val = r.value;
        }
        vals.push(val);
        if (!val) allAnswered = false;
        if (val !== data.correct[i]) isCorrect = false;
    }
    state.userAnsTable = vals; // Simpan jawaban siswa

    if (!allAnswered) {
        sfxWrong();
        fb.className = 'q-feedback fb-wrong';
        fb.textContent = '⚠️ Silakan isi semua pilihan Benar/Salah terlebih dahulu!';
        return;
    }

    state.attempts++;
    const sisaKesempatan = 3 - state.attempts;

    if (isCorrect) {
        sfxCorrect();
        state.correct = true;
        quizScore += 10;
        fb.className = 'q-feedback fb-correct';
        fb.textContent = '✅ Benar! Luar biasa! 🌟';
        lockIsian(qi, null);
        document.querySelectorAll(`#isian-card-${qi} input[type="radio"]`).forEach(r => r.disabled = true);
        setTimeout(() => showPembahasan(data.pembahasan, true, `isian-card-${qi}`), 800);
    } else if (state.attempts < 3) {
        sfxWrong();
        fb.className = 'q-feedback fb-wrong';
        fb.textContent = `🤔 Masih ada yang belum tepat. Coba periksa lagi! (${sisaKesempatan} kesempatan lagi)`;
        if (sisaEl) sisaEl.textContent = `Kesempatan: ${sisaKesempatan} kali lagi`;
    } else {
        sfxWrong();
        fb.className = 'q-feedback fb-wrong';
        fb.textContent = '💪 Kesempatan habis. Yuk lihat pembahasannya!';
        lockIsian(qi, null);
        document.querySelectorAll(`#isian-card-${qi} input[type="radio"]`).forEach(r => r.disabled = true);
        setTimeout(() => showPembahasan(data.pembahasan, false, `isian-card-${qi}`), 800);
    }
}

function lockIsian(qi, inputEl) {
    isianState[qi].locked = true;
    const card = document.getElementById(`isian-card-${qi}`);
    if (!card) return;
    
    card.classList.add('locked');
    const data = isianData[qi];

    if (data.type === 'table_tf') {
        const rows = card.querySelectorAll('tr');
        data.items.forEach((item, idx) => {
            const tr = rows[idx];
            const tds = tr.querySelectorAll('td');
            const uAns = isianState[qi].userAnsTable[idx];
            const isC = uAns === data.correct[idx];
            
            const mark = document.createElement('span');
            mark.style.marginLeft = '5px';
            mark.style.fontWeight = 'bold';
            if (isC) {
                mark.style.color = '#059669';
                mark.textContent = '✅';
            } else {
                mark.style.color = '#dc2626';
                mark.textContent = `❌ (Benar: ${data.correct[idx]})`;
            }
            tds[0].appendChild(mark);
        });

        // Hapus tombol cek & sisa
        const btnGrp = card.querySelector('.isian-input-group');
        if (btnGrp) btnGrp.remove();
        const sisa = card.querySelector('.isian-sisa');
        if (sisa) sisa.remove();

        // Disable semua radio
        card.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = true);

    } else {
        if (inputEl) inputEl.disabled = true;
        
        // Buat box jawaban benar
        const group = card.querySelector('.isian-input-group');
        if (group) {
            const btn = group.querySelector('.isian-cek-btn');
            if (btn) btn.remove();

            const corrHTML = document.createElement('div');
            corrHTML.style.marginTop = '10px';
            corrHTML.style.fontSize = '0.95rem';
            corrHTML.style.color = '#059669';
            corrHTML.style.fontWeight = 'bold';
            corrHTML.style.background = '#ecfdf5';
            corrHTML.style.padding = '10px';
            corrHTML.style.borderRadius = '8px';
            corrHTML.style.border = '1px solid #10b981';
            corrHTML.textContent = `✅ Jawaban Benar: ${data.correct[0]}`;
            
            group.parentNode.insertBefore(corrHTML, group.nextSibling);
        }
        
        const sisa = card.querySelector('.isian-sisa');
        if (sisa) sisa.remove();
    }
}

// ─── PEMBAHASAN OVERLAY ───────────────────────
let _curPembahasan = null; // { teks, isCorrect, cardId }

function showPembahasan(teks, isCorrect, cardId, isReview = false) {
    sfxPembahasan();
    const overlay = document.getElementById('pembahasanOverlay');
    const body    = document.getElementById('pembahasanBody');
    const icon    = document.getElementById('pembahasanIcon');
    const yesBtn  = document.getElementById('pahamYesBtn');

    if (!overlay || !body) return;

    // Simpan data pembahasan aktif HANYA jika bukan sedang review
    if (!isReview) {
        _curPembahasan = { teks, isCorrect, cardId };
    } else {
        _curPembahasan = null; // Reset agar ikon tidak dimunculkan lagi
    }

    icon.textContent = isCorrect ? '⭐' : '📖';
    body.innerHTML   = teks;
    body.scrollTop   = 0;
    if (yesBtn) { yesBtn.disabled = false; yesBtn.textContent = '✅ Sudah Paham'; }

    // Kunci scroll slide (karena slide 8 yang bisa discroll, bukan body)
    const slide8 = document.getElementById('slide-8');
    if (slide8) slide8.style.overflow = 'hidden';

    overlay.classList.add('visible');
}

function pahamYes() {
    sfxClose();
    const overlay = document.getElementById('pembahasanOverlay');
    if (overlay) overlay.classList.remove('visible');
    // Kembalikan scroll slide
    const slide8 = document.getElementById('slide-8');
    if (slide8) slide8.style.overflow = '';

    // Tambahkan ikon 📖 di badge nomor soal
    if (_curPembahasan) {
        addReviewIcon(_curPembahasan.cardId, _curPembahasan.teks, _curPembahasan.isCorrect);
    }

    checkQuizComplete();
}

function pahamNo() {
    const yesBtn = document.getElementById('pahamYesBtn');
    if (yesBtn) {
        yesBtn.textContent = '✅ Sudah Paham (klik jika siap)';
        yesBtn.style.animation = 'none';
        void yesBtn.offsetWidth;
        yesBtn.style.animation = 'unlockPop 0.5s ease';
    }
}

// Tambahkan ikon 📖 ke badge nomor soal agar siswa bisa buka ulang pembahasan
function addReviewIcon(cardId, teks, isCorrect) {
    if (!cardId) return;
    const card = document.getElementById(cardId);
    if (!card) return;
    const badge = card.querySelector('.q-num-badge');
    if (!badge || badge.querySelector('.review-pembahasan-btn')) return; // sudah ada

    const btn = document.createElement('button');
    btn.className = 'review-pembahasan-btn';
    btn.title = 'Lihat pembahasan lagi';
    btn.textContent = '📖';
    btn.onclick = (e) => {
        e.stopPropagation();
        showPembahasan(teks, isCorrect, cardId, true); // true = mode review
    };

    // Pasang ikon di sebelah kanan badge (dalam q-header)
    const header = badge.parentElement;
    if (header) header.insertBefore(btn, badge.nextSibling);
}

// ─── CEK SEMUA SELESAI ─────────────────────────
function checkQuizComplete() {
    const allLocked = pgState.every(s => s.locked) && isianState.every(s => s.locked);
    if (!allLocked) return;

    if (window.SFX) window.SFX.complete();
    const comp    = document.getElementById('quizCompletion');
    const scoreEl = document.getElementById('resultScore');
    if (scoreEl) scoreEl.textContent = `Skor kamu: ${quizScore} / ${totalQuestions * 10}`;
    if (comp) {
        comp.classList.add('show');
        setTimeout(() => comp.scrollIntoView({ behavior: 'smooth', block: 'center' }), 500);
    }
}

// ─── HALL OF FAME ─────────────────────────────
async function loadHallOfFame() {
    const SHEET_ID = '10-l547Wiz3J2JPUGiY3B15kGvGzYnaVUNGe08-oBZoQ';
    const GID = '1231297362';
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
        if (!rows || rows.length === 0) { grid.innerHTML = '<p class="hof-empty">Belum ada yang mengumpulkan. 😊</p>'; return; }
        grid.innerHTML = '';
        rows.forEach((row, i) => {
            const nama = row.c?.[1]?.v ?? '–';
            const kelas = row.c?.[2]?.v ?? '';
            const card = document.createElement('div');
            card.className = 'hof-card';
            card.style.animationDelay = `${i * 0.07}s`;
            card.innerHTML = `<div class="hof-rank">${i + 1}</div><div class="hof-info"><div class="hof-name">${nama}</div>${kelas ? `<div class="hof-kelas">${kelas}</div>` : ''}</div>`;
            grid.appendChild(card);
        });
    } catch (e) {
        grid.innerHTML = '<p class="hof-empty">⚠️ Gagal memuat. Pastikan sheet sudah dipublikasikan ke web.</p>';
        console.error('[HoF]', e);
    }
}

// ─── SUBMIT KE GOOGLE FORM ────────────────────
function submitToGForm() {
    const name  = document.getElementById('sfName').value.trim();
    const kelas = document.getElementById('sfClass').value;
    const feel  = document.getElementById('sfFeel').value;
    if (!name)  { alert('Jangan lupa isi namamu dulu ya! 😊'); document.getElementById('sfName').focus(); return; }
    if (!kelas) { alert('Harap pilih kelasmu! 😊'); return; }
    if (!feel)  { alert('Ceritakan perasaanmu dulu ya! 😊'); return; }
    const skor = quizScore.toString();
    const btn  = document.getElementById('sfSubmitBtn');
    btn.disabled = true;
    btn.textContent = 'Mengirim... ⏳';
    if (window.SFX) window.SFX.click();
    const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc7yNcecQM5YBjYwZcGnR38gvVkLLAy7GrLgAhEVXYzooS9CA/formResponse';
    const body = new URLSearchParams();
    body.append('entry.525648181', name);
    body.append('entry.935428181', kelas);
    body.append('entry.814713765', skor);
    body.append('entry.358297577', feel);
    fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body })
        .then(() => {
            document.getElementById('submitForm').style.display = 'none';
            const succ = document.getElementById('sfSuccess');
            document.getElementById('sfSuccessMsg').innerHTML =
                `Kerja bagus, ${name}! 👍👍👍<br><br>Terima kasih ${name} dari kelas ${kelas}. Terus semangat belajar! 🌟🌟🌟`;
            succ.classList.add('show');
            unlockNext(8);
            updateNavButtons();
            succ.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(() => {
            btn.disabled = false;
            btn.textContent = 'Kirim Nilai ke Guru 🚀';
            alert('Ups! Ada masalah saat mengirim. Coba lagi ya!');
        });
}

// ─── INITIALIZATION ──────────────────────────
updateNavButtons();
updateProgress(1);

