/* =====================================================
   QUIZ MATEMATIKA — BANGUN RUANG KELAS 4
   SD Islam Al Azhar 15 — TP 2025/2026
   Data soal berdasarkan lembar PR yang diberikan
   ===================================================== */

// ============================================================
// DATA SOAL PILIHAN GANDA (Soal 1-10)
// ============================================================
const quizData = [
    {
        question: "Balok memiliki jumlah titik sudut sebanyak ...",
        options: [
            "4",
            "6",
            "8",
            "12"
        ],
        correct: 2,
        explanation: "Balok memiliki 8 titik sudut! Bayangkan sebuah kotak — setiap pojok adalah titik sudut. Ada 4 di atas dan 4 di bawah = 8 total! 🎯"
    },
    {
        question: "Sebuah bangun ruang memiliki ciri: alas berbentuk lingkaran dan memiliki satu titik puncak. Bangun ruang tersebut adalah ...",
        options: [
            "Tabung",
            "Bola",
            "Kerucut",
            "Kubus"
        ],
        correct: 2,
        explanation: "Kerucut! Bangun ini punya alas lingkaran di bawah dan meruncing ke titik puncak di atas — seperti topi ulang tahun! 🎉"
    },
    {
        question: "Jika sebuah ember dapat diisi penuh dengan 8 gayung, dan bak mandi dapat terisi penuh dengan 5 buah ember. Maka volume bak mandi adalah ...",
        options: [
            "24 gayung",
            "32 gayung",
            "40 gayung",
            "48 gayung"
        ],
        correct: 2,
        explanation: "5 ember × 8 gayung = 40 gayung! Kita mengalikan jumlah ember dengan kapasitas tiap ember untuk mengetahui total volume bak mandi. 🧮"
    },
    {
        question: "Kerucut memiliki ...",
        options: [
            "1 titik sudut",
            "2 titik sudut",
            "3 titik sudut",
            "Tidak memiliki sudut"
        ],
        correct: 0,
        explanation: "Kerucut memiliki 1 titik sudut, yaitu di bagian puncaknya yang runcing. Tidak seperti kubus yang punya 8! 📐"
    },
    {
        question: "Tabung memiliki sisi sebanyak ...",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correct: 2,
        explanation: "Tabung punya 3 sisi: 1 sisi lengkung di samping, 1 sisi lingkaran di atas, dan 1 sisi lingkaran di bawah! 🎯"
    },
    {
        question: "Perhatikan gambar berikut: ada 4 gelas dengan ukuran berbeda (1, 2, 3, 4). Urutan volume dari yang TERBANYAK adalah ...",
        image: "assets/nomor_6.png",
        options: [
            "1, 2, 3, 4",
            "3, 4, 2, 1",
            "1, 4, 2, 3",
            "3, 2, 4, 1"
        ],
        correct: 1,
        explanation: "Urutan yang paling banyak ke sedikit adalah 3, 4, 2, 1 karena gelas yang lebih besar dan lebar menampung lebih banyak air! 💧"
    },
    {
        question: "Ciri bangun ruang di samping adalah ...",
        image: "assets/nomor_7.png",
        options: [
            "Memiliki 6 titik sudut",
            "Memiliki 12 rusuk",
            "Memiliki 6 sisi berbentuk persegi",
            "Memiliki 6 buah sisi"
        ],
        correct: 0,
        explanation: "Bangun tersebut memiliki 6 titik sudut! 📐"
    },
    {
        question: "Bangun ruang yang tidak memiliki rusuk dan tidak memiliki titik sudut adalah ...",
        options: [
            "Kubus",
            "Balok",
            "Bola",
            "Kerucut"
        ],
        correct: 2,
        explanation: "Bola! Permukaannya mulus dan melengkung sempurna — tidak ada rusuk (garis tepi) maupun titik sudut sama sekali! ⚽"
    },
    {
        question: "Sebuah kubus memiliki panjang rusuk 5 cm. Volume kubus tersebut adalah ...",
        options: [
            "15 cm³",
            "25 cm³",
            "125 cm³",
            "625 cm³"
        ],
        correct: 2,
        explanation: "Volume Kubus = s × s × s = 5 × 5 × 5 = 125 cm³. Rusuk dikali dengan dirinya sendiri sebanyak tiga kali! 🧮"
    },
    {
        question: "Rumus volume balok adalah ...",
        options: [
            "p × l × t",
            "p + l + t",
            "2 × (p + l)",
            "p × t"
        ],
        correct: 0,
        explanation: "Volume Balok = panjang × lebar × tinggi (p × l × t). Kalikan ketiga dimensinya untuk mendapatkan volume! 📏"
    },
    {
        readingText: "<b>II. BERILAH DUA TANDA SILANG PADA JAWABAN YANG BENAR!</b><br><br>Beni memiliki dua bangun ruang:<br>Bangun A memiliki 6 sisi dan semua sisinya berbentuk persegi panjang.<br>Bangun B memiliki 6 sisi dan semua sisinya berbentuk persegi.",
        question: "Pasangan bangun A dan B adalah ...",
        isMultiple: true,
        options: [
            "A. kubus",
            "B. balok",
            "C. tabung",
            "D. kerucut"
        ],
        correct: [0, 1],
        explanation: "Bangun A (persegi panjang) adalah Balok, Bangun B (persegi) adalah Kubus. Maka jawabannya Kubus dan Balok! 🧊📦"
    },
    {
        question: "Sinta mengelompokkan bangun ruang yang tidak memiliki titik sudut. Bangun yang tepat masuk kelompok Sinta adalah ...",
        isMultiple: true,
        options: [
            "A. kubus",
            "B. tabung",
            "C. bola",
            "D. kerucut"
        ],
        correct: [1, 2],
        explanation: "Tabung dan Bola adalah bangun ruang yang memiliki sisi lengkung dan tidak memiliki titik sudut sama sekali! 🥫⚽"
    },
    {
        question: "Bangun ruang adalah ....",
        isMultiple: true,
        options: [
            "A. Kumpulan dari bangun datar yang jadi satu",
            "B. Kumpulan garis-garis",
            "C. Bangun yang mempunyai ruang",
            "D. Bangun yang mempunyai volume"
        ],
        correct: [2, 3],
        explanation: "Bangun ruang adalah bangun 3 dimensi yang mempunyai ruang (isi) dan mempunyai volume! 🌌"
    },
    {
        question: "Ciri bangun di samping (Prisma Segitiga) adalah ....",
        image: "assets/nomor_14.png",
        isMultiple: true,
        options: [
            "A. memiliki 6 titik sudut",
            "B. memiliki 9 rusuk",
            "C. memiliki 6 sisi berbentuk persegi",
            "D. tidak memiliki volume"
        ],
        correct: [0, 1],
        explanation: "Prisma segitiga memiliki 6 titik sudut (3 di atas, 3 di bawah) dan 9 rusuk (garis-garisnya)! 🔺"
    },
    {
        question: "Bangun ruang yang memiliki alas berbentuk lingkaran disebut ....",
        isMultiple: true,
        options: [
            "A. Tabung",
            "B. Kerucut",
            "C. Bola",
            "D. Balok"
        ],
        correct: [0, 1],
        explanation: "Tabung dan Kerucut adalah dua bangun ruang yang bagian bawahnya (alasnya) berbentuk lingkaran melengkung! 🥫🍦"
    }
];

// ============================================================
// DATA SOAL ISIAN TULIS (Soal 16-25) — Section III Worksheet
// Tiap soal punya 'keys' (kata kunci untuk auto-grading)
// dan 'answer' (kunci jawaban yang ditampilkan saat feedback)
// ============================================================
const essayData = [
    {
        num: 16,
        question: "Bangun ruang yang memiliki 6 sisi berbentuk persegi dan semua rusuk sama panjang adalah ...",
        placeholder: "Ketik jawabanmu...",
        keys: ["kubus"],
        answer: "Kubus"
    },
    {
        num: 17,
        question: "Kerucut memiliki ________ alas dan ________ sisi lengkung.",
        placeholder: "Contoh: 1 alas dan 1 sisi lengkung",
        keys: ["1"],
        answer: "1 alas dan 1 sisi lengkung"
    },
    {
        num: 18,
        question: "Bangun ruang yang mirip topi pak tani (caping) adalah ...",
        placeholder: "Ketik jawabanmu...",
        keys: ["kerucut"],
        answer: "Kerucut"
    },
    {
        num: 19,
        question: "Pertemuan antara garis-garis pada bangun ruang disebut dengan ...",
        placeholder: "Ketik jawabanmu...",
        keys: ["titik sudut", "sudut"],
        answer: "Titik Sudut"
    },
    {
        num: 20,
        question: "Perbedaan utama antara tabung dan kerucut terletak pada jumlah ...",
        placeholder: "Ketik jawabanmu...",
        keys: ["titik sudut", "sudut", "alas", "puncak"],
        answer: "Titik sudut (tabung = 0, kerucut = 1)"
    },
    {
        num: 21,
        question: "Sebuah balok volumenya 60 cm³. Jika panjangnya 5 cm dan lebarnya 4 cm, maka tingginya adalah ... cm",
        placeholder: "Ketik angkanya...",
        keys: ["3"],
        answer: "3 cm  →  V = p × l × t  →  60 = 5 × 4 × t  →  t = 3"
    },
    {
        num: 22,
        question: "Kubus memiliki jumlah rusuk sebanyak ...",
        placeholder: "Ketik angkanya...",
        keys: ["12"],
        answer: "12 rusuk"
    },
    {
        num: 23,
        question: "Bangun ruang yang memiliki alas lingkaran tetapi TIDAK memiliki titik sudut adalah ...",
        placeholder: "Ketik jawabanmu...",
        keys: ["tabung"],
        answer: "Tabung"
    },
    {
        num: 24,
        question: "Jika sebuah bangun ruang memiliki 6 sisi berbentuk persegi panjang dan 8 titik sudut, maka bangun tersebut adalah ...",
        placeholder: "Ketik jawabanmu...",
        keys: ["balok"],
        answer: "Balok"
    },
    {
        num: 25,
        question: "Hasil pengukuran menggunakan alat ukur yang tidak standar (berbeda antar orang) disebut satuan ...",
        placeholder: "Ketik jawabanmu...",
        keys: ["tidak baku", "tak baku"],
        answer: "Tidak Baku"
    }
];

// ============================================================
// UTILITY
// ============================================================
function shuffleArr(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// ============================================================
// STATE
// ============================================================
let currentSlideIndex = 0;
let score = 0;
let isAnswered = false;
let activeQuizData = [];
let currentMode = 'pg';
let pgAttempts = {};
let pgSelections = {}; // track multiple text selections for PG2
let isianAttempts = {};  // attempts per soal isian (max 2)
let isianDone = {};       // apakah soal sudah dikunci/selesai

// DOM Elements
const slidesWrapper = document.getElementById('slides-wrapper');
const progressBar = document.getElementById('progress-bar');
const currentSlideNum = document.getElementById('current-slide-num');
const totalSlideNum = document.getElementById('total-slide-num');
const scoreText = document.getElementById('score-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const overlay = document.getElementById('explanation-overlay');
const popupBox = document.getElementById('popup-box');
const popupTitle = document.getElementById('popup-title');
const popupIcon = document.getElementById('popup-icon');
const popupText = document.getElementById('popup-text');
const endScreen = document.getElementById('end-screen');
const finalScore = document.getElementById('final-score');

// Screens
const screenCover = document.getElementById('screen-cover');
const screenMenu = document.getElementById('screen-menu');
const screenQuiz = document.getElementById('screen-quiz');

// Audio
const sfxCorrect = document.getElementById('sfx-correct');
const sfxWrong = document.getElementById('sfx-wrong');
const sfxPop = document.getElementById('sfx-pop');
const sfxClick = document.getElementById('sfx-click');

// ============================================================
// AUDIO
// ============================================================
function playSound(audioEl) {
    if (audioEl) {
        audioEl.currentTime = 0;
        audioEl.play().catch(e => console.log('Audio error:', e));
    }
}

// ============================================================
// NAVIGATION / SCREEN MANAGEMENT
// ============================================================
function hideAllScreens() {
    screenCover.classList.remove('active');
    if (screenMenu) screenMenu.classList.remove('active');
    screenQuiz.classList.remove('active');
    screenCover.style.display = 'none';
    if (screenMenu) screenMenu.style.display = 'none';
    screenQuiz.style.display = 'none';
}

function goToMenu() {
    hideAllScreens();
    if (screenMenu) {
        screenMenu.style.display = 'flex';
        setTimeout(() => screenMenu.classList.add('active'), 10);
    }
    playSound(sfxClick);
}

let pendingMode = null;

function showInstructions(mode) {
    playSound(sfxClick);
    pendingMode = mode;

    const instTitle = document.getElementById('inst-title');
    const instText = document.getElementById('inst-text');
    const instOverlay = document.getElementById('instruction-overlay');

    if (mode === 'pg') {
        instTitle.innerText = "📝 Petunjuk Pilihan Ganda";
        instText.innerHTML = "1. Baca setiap soal dengan teliti.<br>2. <b>Soal 1-10:</b> Pilih 1 jawaban yang paling tepat.<br>3. <b>Soal 11-15:</b> Pilih <b>2 jawaban</b> yang paling tepat.<br>4. Untuk setiap soal jika salah, kamu punya <b>1 kesempatan lagi</b> untuk mencoba.<br><br>⭐ 1 soal benar = 10 Bintang";
    } else if (mode === 'essay') {
        instTitle.innerText = "✏️ Petunjuk Isian (Tulis)";
        instText.innerHTML = "1. Baca setiap soal dengan teliti.<br>2. Ketik jawabanmu di kotak yang tersedia.<br>3. Ada <b>10 soal isian singkat</b> (cukup 1–3 kata).<br>4. Jika sudah selesai semua, klik <b>Periksa Jawaban 🚀</b>.<br><br>⭐ 1 soal benar = 10 Bintang";
    }

    instOverlay.classList.add('show');
}

function startQuizTransition() {
    playSound(sfxClick);
    const instOverlay = document.getElementById('instruction-overlay');
    instOverlay.classList.remove('show');
    setTimeout(() => { startMode(pendingMode); }, 300);
}

function startMode(mode) {
    currentMode = mode;
    hideAllScreens();
    playSound(sfxClick);

    screenQuiz.style.display = 'flex';
    setTimeout(() => screenQuiz.classList.add('active'), 10);

    const textPrefix = document.getElementById('slide-text-prefix');
    const numContainer = document.getElementById('slide-numbers-container');
    const pb = document.getElementById('prev-btn');
    const nb = document.getElementById('next-btn');

    if (mode === 'pg') {
        pgAttempts = {};
        pgSelections = {};
        activeQuizData = quizData;
        if (textPrefix) textPrefix.innerText = "Soal PG";
        if (numContainer) numContainer.style.display = "inline";
        if (pb) pb.style.display = 'inline-block';
        if (nb) nb.style.display = 'inline-block';
    } else if (mode === 'essay') {
        isianAttempts = {};
        isianDone = {};
        activeQuizData = [{ mode: 'essay' }];
        if (textPrefix) textPrefix.innerText = "Soal Isian";
        if (numContainer) numContainer.style.display = "none";
        if (pb) pb.style.display = 'none';
        if (nb) nb.style.display = 'none';
    }

    initQuiz();
}

function initQuiz() {
    totalSlideNum.innerText = activeQuizData.length;
    score = 0;
    currentSlideIndex = 0;
    updateScoreUI();
    renderSlides();
    updateUI();
}

// ============================================================
// RENDER SLIDES
// ============================================================
function renderSlides() {
    slidesWrapper.innerHTML = '';
    const optionPrefixes = ['A', 'B', 'C', 'D'];

    if (currentMode === 'pg') {
        activeQuizData.forEach((q, index) => {
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;
            slide.id = `slide-${index}`;

            const questionBox = document.createElement('div');
            questionBox.className = 'question-box';

            // emoji or actual image
            if (q.image) {
                if (q.image.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i)) {
                    const imgEl = document.createElement('img');
                    imgEl.src = q.image;
                    imgEl.className = 'question-image';
                    imgEl.style.maxWidth = '100%';
                    imgEl.style.maxHeight = '200px';
                    imgEl.style.objectFit = 'contain';
                    imgEl.style.borderRadius = '12px';
                    imgEl.style.filter = 'none';
                    questionBox.appendChild(imgEl);
                } else {
                    const imgDiv = document.createElement('div');
                    imgDiv.className = 'question-image';
                    imgDiv.innerText = q.image;
                    questionBox.appendChild(imgDiv);
                }
            }

            // reading text untuk soal PG ganda 
            if (q.readingText) {
                const readingDiv = document.createElement('div');
                readingDiv.innerHTML = `<div style="text-align:left; font-size:0.95rem; line-height:1.65; color:#333; font-weight:normal; background:#f3e0ff; padding:14px 16px; border-radius:10px; border-left:5px solid var(--secondary); margin-bottom:15px; white-space:pre-line;"><b>📖 Perhatikan:</b><br>${q.readingText}</div>`;
                questionBox.appendChild(readingDiv);
            }

            const text = document.createElement('div');
            text.className = 'question-text';
            text.innerHTML = `${index + 1}. ${q.question}`;
            questionBox.appendChild(text);

            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'options-grid';

            q.options.forEach((optText, optIndex) => {
                const optCard = document.createElement('div');
                optCard.className = 'option-card';
                optCard.id = `opt-${index}-${optIndex}`;
                optCard.onclick = () => selectOption(index, optIndex);

                // Jika isian ganda (opsi abjad A/B ada di dalam teks tapi kita pakai prefix standard atau disembunyikan jika optText ada A.)
                // As the options string starts with A., B., we can just show it directly or keep the prefix.
                // The provided strings actually have "A. kubus" inside them for questions 11-15, but questions 1-10 have normal text.
                // It's cleaner to keep the prefix logic and let normal text flow. 
                // Wait, if optText already has "A. " inside, prefix+text will be "A A. kubus".
                // We'll strip "A. ", "B. ", "C. ", "D. " if present at start.
                let cleanOptText = optText;
                if (/^[A-D]\.\s/.test(cleanOptText)) {
                    cleanOptText = cleanOptText.substring(3);
                }

                const prefix = document.createElement('div');
                prefix.className = 'option-prefix';
                prefix.innerText = optionPrefixes[optIndex];

                const textNode = document.createElement('span');
                textNode.innerHTML = cleanOptText;

                optCard.appendChild(prefix);
                optCard.appendChild(textNode);
                optionsGrid.appendChild(optCard);
            });

            questionBox.appendChild(optionsGrid);
            slide.appendChild(questionBox);
            slidesWrapper.appendChild(slide);
        });

    } else if (currentMode === 'essay') {
        const slide = document.createElement('div');
        slide.className = 'slide active';
        slide.id = 'slide-0';
        slide.style.alignItems = 'flex-start';

        const wrapper = document.createElement('div');
        wrapper.className = 'essay-wrapper';
        wrapper.style.width = '100%';

        // Header info
        const headerInfo = document.createElement('div');
        headerInfo.innerHTML = `<div style="background: linear-gradient(135deg, #fff3e0, #ffe0c8); border: 2px solid #ffb380; border-radius: 12px; padding: 12px 16px; width:100%; max-width:780px; text-align:center; font-weight:800; color: var(--secondary); margin-bottom: 8px;">✏️ Soal Isian — Ketik jawabanmu!</div>`;
        wrapper.appendChild(headerInfo);

        essayData.forEach((eq, index) => {
            const card = document.createElement('div');
            card.className = 'essay-card';

            let html = '';
            html += `<div style="font-weight:900; color:var(--orange); font-size:1.3rem; margin-bottom:10px;">${eq.num}. <span style="font-size:1rem; color:var(--dark); font-weight:700;">${eq.question}</span></div>`;
            // Input satu baris (isian singkat)
            html += `<input type="text" id="essay-ans-${index}" class="isian-input" placeholder="${eq.placeholder}" autocomplete="off" spellcheck="false">`;
            // Tombol Cek per soal
            html += `<button id="essay-check-btn-${index}" class="cek-btn" onclick="checkIsianAnswer(${index})">Cek ✓</button>`;
            html += `<div id="essay-feedback-${index}" class="essay-ans" style="display:none; transition: all 0.3s ease;"></div>`;

            card.innerHTML = html;
            wrapper.appendChild(card);
        });

        // Tombol Lihat Nilai — muncul otomatis setelah semua soal terjawab
        const endBtn = document.createElement('button');
        endBtn.className = 'action-btn';
        endBtn.id = 'isian-end-btn';
        endBtn.style.marginTop = '20px';
        endBtn.style.marginBottom = '24px';
        endBtn.style.background = '#06D6A0';
        endBtn.style.boxShadow = '0 5px 0 #04aa80';
        endBtn.style.display = 'none';
        endBtn.innerText = "Lihat Total Nilai 🏆";
        endBtn.onclick = () => showEndScreen();
        wrapper.appendChild(endBtn);

        slide.appendChild(wrapper);
        slidesWrapper.appendChild(slide);
    }
}

// ============================================================
// SELECT OPTION (Pilihan Ganda)
// ============================================================
function selectOption(slideIndex, optionIndex) {
    if (slideIndex !== currentSlideIndex || isAnswered) return;

    const optCard = document.getElementById(`opt-${slideIndex}-${optionIndex}`);
    if (optCard.classList.contains('wrong')) return;

    const q = activeQuizData[slideIndex];
    if (q.isMultiple) {
        if (!pgSelections[slideIndex]) pgSelections[slideIndex] = [];
        if (optCard.classList.contains('pg2-selected')) return;

        pgSelections[slideIndex].push(optionIndex);
        optCard.classList.add('pg2-selected');

        if (pgSelections[slideIndex].length === 2) {
            const [sel1, sel2] = pgSelections[slideIndex];
            const isCorrect = q.correct.includes(sel1) && q.correct.includes(sel2);

            if (!pgAttempts[slideIndex]) pgAttempts[slideIndex] = 0;

            if (isCorrect) {
                isAnswered = true;
                playSound(sfxCorrect);
                showPopup(true, q.explanation);
                score += 10;
                document.getElementById(`opt-${slideIndex}-${sel1}`).classList.remove('pg2-selected');
                document.getElementById(`opt-${slideIndex}-${sel2}`).classList.remove('pg2-selected');
                document.getElementById(`opt-${slideIndex}-${sel1}`).classList.add('correct');
                document.getElementById(`opt-${slideIndex}-${sel2}`).classList.add('correct');
                updateScoreUI();
                nextBtn.disabled = false;
            } else {
                pgAttempts[slideIndex]++;
                playSound(sfxWrong);

                document.getElementById(`opt-${slideIndex}-${sel1}`).classList.remove('pg2-selected');
                document.getElementById(`opt-${slideIndex}-${sel2}`).classList.remove('pg2-selected');

                if (pgAttempts[slideIndex] >= 2) {
                    isAnswered = true;
                    q.correct.forEach(c => document.getElementById(`opt-${slideIndex}-${c}`).classList.add('correct'));
                    showPopup(false, "Kesempatan habis! \nPenjelasan: " + q.explanation);
                    updateScoreUI();
                    nextBtn.disabled = false;
                } else {
                    showPopup(false, "Kombinasi jawabanmu masih kurang tepat. \nYuk coba lagi! 😉");
                    pgSelections[slideIndex] = []; // reset for second try
                }
            }
        } else {
            playSound(sfxPop); // Give auditory feedback for the first selection
        }
        return;
    }

    const isCorrect = optionIndex === q.correct;

    if (!pgAttempts[slideIndex]) pgAttempts[slideIndex] = 0;

    if (isCorrect) {
        isAnswered = true;
        playSound(sfxCorrect);
        showPopup(true, q.explanation);
        score += 10;
        optCard.classList.add('correct');
        updateScoreUI();
        nextBtn.disabled = false;
    } else {
        pgAttempts[slideIndex]++;
        playSound(sfxWrong);
        optCard.classList.add('wrong');

        if (pgAttempts[slideIndex] >= 2) {
            isAnswered = true;
            document.getElementById(`opt-${slideIndex}-${q.correct}`).classList.add('correct');
            showPopup(false, "Kesempatan habis! \nPenjelasan: " + q.explanation);
            updateScoreUI();
            nextBtn.disabled = false;
        } else {
            showPopup(false, "Jawabanmu masih kurang tepat. \nYuk coba sekali lagi ya! 😉");
        }
    }
}



// ============================================================
// ISIAN VERIFICATION — per soal, 2 kesempatan
// ============================================================
function checkIsianAnswer(idx) {
    const eq = essayData[idx];
    const input = document.getElementById(`essay-ans-${idx}`);
    const feedback = document.getElementById(`essay-feedback-${idx}`);
    const btn = document.getElementById(`essay-check-btn-${idx}`);
    const ansRaw = input.value.toLowerCase().trim();

    // Cegah submit kosong
    if (!ansRaw) {
        feedback.innerHTML = '<b>Isi jawabannya dulu ya! ✏️</b>';
        feedback.style.display = 'block';
        feedback.style.backgroundColor = '#fff3e0';
        feedback.style.borderLeftColor = 'var(--orange)';
        feedback.style.color = '#7b3500';
        return;
    }

    if (!isianAttempts[idx]) isianAttempts[idx] = 0;

    const isCorrect = eq.keys.some(k => ansRaw.includes(k.toLowerCase()));

    if (isCorrect) {
        playSound(sfxCorrect);
        input.readOnly = true;
        btn.style.display = 'none';
        input.style.borderColor = '#06D6A0';
        input.style.backgroundColor = '#f0fff8';
        feedback.style.display = 'block';
        feedback.style.backgroundColor = '#E8F8F2';
        feedback.style.borderLeftColor = '#06D6A0';
        feedback.style.color = '#004d35';
        feedback.innerHTML = `<b>Benar! ✨</b><br>Kunci Jawaban: <b>${eq.answer}</b>`;

        if (!isianDone[idx]) {
            score += 10;
            updateScoreUI();
        }
        isianDone[idx] = true;
        checkAllIsianDone();
    } else {
        isianAttempts[idx]++;
        playSound(sfxWrong);

        if (isianAttempts[idx] >= 2) {
            // Kesempatan habis — tampilkan kunci jawaban, kunci input
            input.readOnly = true;
            btn.style.display = 'none';
            input.style.borderColor = '#EF476F';
            input.style.backgroundColor = '#fff5f7';
            feedback.style.display = 'block';
            feedback.style.backgroundColor = '#FDEDED';
            feedback.style.borderLeftColor = '#EF476F';
            feedback.style.color = '#7b0020';
            feedback.innerHTML = `<b>Belum Tepat 😅</b><br>Kunci Jawaban: <b>${eq.answer}</b>`;
            isianDone[idx] = true;
            checkAllIsianDone();
        } else {
            // Salah pertama — beri kesempatan ke-2
            const remaining = 2 - isianAttempts[idx];
            feedback.style.display = 'block';
            feedback.style.backgroundColor = '#FFF8E1';
            feedback.style.borderLeftColor = '#FFA000';
            feedback.style.color = '#7b4f00';
            feedback.innerHTML = `<b>Masih Kurang Tepat 🤔</b> — Masih ada <b>${remaining}x</b> kesempatan lagi!`;
            // Tombol berubah jadi "Coba Lagi" → klik = bersihkan input, reset tombol
            btn.innerText = 'Coba Lagi 🔄';
            btn.onclick = () => resetIsianAnswer(idx);
            input.style.borderColor = '#FFA000';
            input.style.backgroundColor = '#fffde7';
        }
    }
}

// Klik "Coba Lagi" → kosongkan input, reset tombol jadi "Cek ✓"
function resetIsianAnswer(idx) {
    const input = document.getElementById(`essay-ans-${idx}`);
    const feedback = document.getElementById(`essay-feedback-${idx}`);
    const btn = document.getElementById(`essay-check-btn-${idx}`);

    input.value = '';
    input.style.borderColor = '#E0E0E0';
    input.style.backgroundColor = '#FAFAFA';
    input.focus();
    feedback.style.display = 'none';
    btn.innerText = 'Cek ✓';
    btn.onclick = () => checkIsianAnswer(idx);
}

// Tampilkan tombol "Lihat Nilai" setelah semua 10 soal selesai
function checkAllIsianDone() {
    const allDone = essayData.every((_, idx) => isianDone[idx] === true);
    if (allDone) {
        const endBtn = document.getElementById('isian-end-btn');
        if (endBtn) {
            endBtn.style.display = 'block';
            setTimeout(() => {
                const wrapper = document.querySelector('.essay-wrapper');
                if (wrapper) wrapper.scrollTo({ top: wrapper.scrollHeight, behavior: 'smooth' });
            }, 100);
        }
    }
}

// ============================================================
// POPUP
// ============================================================
function showPopup(isCorrect, explanationText) {
    if (isCorrect) {
        popupBox.className = 'popup-box correct-style';
        popupTitle.innerText = "Benar! 🥳";
        popupIcon.innerText = "⭐";
    } else {
        popupBox.className = 'popup-box wrong-style';
        popupTitle.innerText = "Kurang Tepat 😅";
        popupIcon.innerText = "💡";
    }
    popupText.innerText = explanationText;
    setTimeout(() => { overlay.classList.add('show'); }, 500);
}

function closePopup() {
    playSound(sfxClick);
    overlay.classList.remove('show');

    if (currentMode === 'pg') {
        if (currentSlideIndex === activeQuizData.length - 1 && isAnswered) {
            setTimeout(showEndScreen, 500);
        }
    }
}

// ============================================================
// UI UPDATE
// ============================================================
function updateUI() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev');
        slide.style.transform = '';
        slide.style.opacity = '';
        if (index === currentSlideIndex) {
            slide.classList.add('active');
        } else if (index < currentSlideIndex) {
            slide.classList.add('prev');
        }
    });

    currentSlideNum.innerText = currentSlideIndex + 1;
    progressBar.style.width = `${((currentSlideIndex + 1) / activeQuizData.length) * 100}%`;
    isAnswered = false;
    nextBtn.disabled = true;
    prevBtn.disabled = currentSlideIndex === 0;
}

function nextSlide() {
    playSound(sfxClick);
    if (currentSlideIndex < activeQuizData.length - 1) {
        currentSlideIndex++;
        updateUI();
    } else {
        showEndScreen();
    }
}

function prevSlide() {
    playSound(sfxClick);
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateUI();
        isAnswered = true;
        nextBtn.disabled = false;
    }
}

function updateScoreUI() {
    scoreText.innerText = (score / 10);
}

// ============================================================
// END SCREEN
// ============================================================
function showEndScreen() {
    playSound(sfxCorrect);
    const scaledScore = score / 10;
    finalScore.innerText = scaledScore;
    document.getElementById('student-name').value = '';
    endScreen.classList.add('show');
}

function restartQuiz() {
    playSound(sfxClick);
    endScreen.classList.remove('show');
    goToMenu();
}

// ============================================================
// SEND TO GOOGLE FORM
// ============================================================
function sendToGoogleForm() {
    const studentName = document.getElementById('student-name').value.trim();
    if (!studentName) {
        playSound(sfxWrong);
        alert("Jangan lupa isi namamu dulu ya! 😊");
        return;
    }



    const modeName = currentMode === 'pg' ? "Pilihan Ganda" : "Uraian (Essay)";
    const scaledScore = (score / 10).toString();

    // ====== KONFIGURASI GOOGLE FORM MATEMATIKA ======
    const url = "https://docs.google.com/forms/d/e/1FAIpQLSdAYuFOJC010Xs29SNmRdIYxgT5L25vWBjEF0s7aHsCw98QdQ/formResponse";

    const body = new URLSearchParams();
    body.append("entry.1066178216", studentName);
    body.append("entry.27723708", "-"); // Kelas (opsional) diset '-'
    body.append("entry.584447407", scaledScore);
    body.append("entry.797222625", modeName);

    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: body
    }).then(() => {
        playSound(sfxCorrect);
        alert(`Bagus sekali ${studentName}! Nilai ${scaledScore} bintang kamu sudah dikirim ke Guru! 🚀`);
        restartQuiz();
    }).catch(() => {
        alert("Sepertinya ada sedikit masalah saat mengirim nilai. Coba lagi ya!");
    });
}
