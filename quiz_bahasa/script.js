const readingText = "<div style='font-size: 1.1rem; background: #FFF8E1; padding: 15px; border-radius: 10px; border-left: 5px solid #FFC107; margin-bottom: 20px; font-weight: normal; text-align: left; line-height: 1.5;'><b>Bacaan (Soal 1-3):</b><br>Pada hari Minggu, Rani pergi ke rumah nenek di desa. Di sana, Rani membantu nenek memasak di dapur. Setelah itu, Rani bermain di halaman bersama sepupunya. Mereka sangat senang karena bisa berkumpul bersama keluarga.</div>";

const quizData = [
    {
        question: readingText + "Ringkasan yang tepat dari teks di atas adalah ...",
        image: "📝 📖",
        options: [
            "Rani pergi ke sekolah dan belajar bersama teman",
            "Rani mengunjungi nenek, membantu memasak, dan bermain dengan sepupu",
            "Rani hanya bermain di halaman rumah",
            "Rani memasak sendirian di dapur"
        ],
        correct: 1,
        explanation: "Pilihan B paling tepat merangkum semua kegiatan utama Rani dari berkunjung, membantu, hingga bermain! ✨"
    },
    {
        question: readingText + "Kegiatan pertama yang dilakukan Rani adalah ...",
        image: "🏃‍♀️ 👧",
        options: [
            "Bermain dengan sepupu",
            "Memasak sendiri",
            "Pergi ke rumah nenek",
            "Pergi ke pasar"
        ],
        correct: 2,
        explanation: "Karena diceritakan seluruh kejadian berada di rumah nenek, sudah pasti kegiatan pertamanya adalah pergi ke rumah nenek! 🏡"
    },
    {
        question: readingText + "Pesan yang dapat diambil dari cerita tersebut adalah ...",
        image: "💡 👨‍👩‍👧‍👦",
        options: [
            "Bermain lebih penting daripada membantu",
            "Berkumpul bersama keluarga itu menyenangkan",
            "Pergi ke desa itu membosankan",
            "Tidak perlu membantu orang tua"
        ],
        correct: 1,
        explanation: "Cerita tersebut menggambarkan indahnya kerukunan dan kebersamaan keluarga yang menyenangkan! ❤️"
    },
    {
        question: "Kata “amblas” memiliki arti ...",
        image: "🕳️ 💧",
        options: [
            "Tenggelam",
            "Terbang",
            "Berjalan",
            "Melompat"
        ],
        correct: 0,
        explanation: "Kata 'amblas' berarti tenggelam atau amblas ke bawah hingga tidak terlihat. 🌊"
    },
    {
        question: "Kata “gadang” berarti ...",
        image: "🏠 🐘",
        options: [
            "Kecil",
            "Besar",
            "Tinggi",
            "Panjang"
        ],
        correct: 1,
        explanation: "Dalam bahasa Minang misalnya, 'gadang' berarti besar! Contohnya Rumah Gadang artinya rumah besar. 🏰"
    },
    {
        question: "Kata “pangling” berarti ...",
        image: "😲 ❓",
        options: [
            "Lupa",
            "Tidak mengenali karena berubah",
            "Marah",
            "Senang"
        ],
        correct: 1,
        explanation: "'Pangling' itu ketika kita kesulitan mengenali seseorang atau sesuatu yang penampilannya sudah berubah jauh! 🤔"
    },
    {
        question: "Kalimat efektif yang tepat adalah ...",
        image: "🗣️ ✍️",
        options: [
            "Saya pergi ke pasar bersama dengan ibu saya",
            "Saya pergi ke pasar dengan ibu",
            "Saya pergi ke pasar bersama dengan ibu saya bersama-sama",
            "Saya pergi ke pasar dengan ibu saya bersama-sama"
        ],
        correct: 1,
        explanation: "Kalimat B sangat ringkas, padat, dan jelas artinya tanpa membuang-buang kata! 💯"
    },
    {
        question: "Kalimat berikut yang tidak efektif adalah ...",
        image: "❌ 📝",
        options: [
            "Ani membaca buku di perpustakaan",
            "Budi makan nasi di dapur",
            "Rina naik ke atas ke lantai dua",
            "Sinta menulis surat"
        ],
        correct: 2,
        explanation: "Kata 'naik' pasti menuju ke tempat yang lebih tinggi (ke atas). Jadi 'naik ke atas' adalah pemborosan kata! 🚫"
    },
    {
        question: "Kalimat efektif harus ...",
        image: "🎯 💬",
        options: [
            "Panjang dan berulang",
            "Jelas dan tidak bertele-tele",
            "Menggunakan banyak kata",
            "Sulit dipahami"
        ],
        correct: 1,
        explanation: "Kalimat efektif harus singkat, padat, jelas dan tidak bertele-tele agar maknanya mudah ditangkap! 🎯"
    },
    {
        question: "Langkah pertama membuat ringkasan adalah ...",
        image: "1️⃣ 📖",
        options: [
            "Menyalin teks",
            "Membaca teks dengan teliti",
            "Menulis langsung",
            "Menghafal teks"
        ],
        correct: 1,
        explanation: "Sebelum meringkas sesuatu, kita wajib membacanya dengan teliti untuk memahami intinya terlebih dahulu! 🧠"
    }
];

const dndQuestions = [
    {
        readingId: 1,
        num: 16,
        readingText: "Pada hari Minggu, Andi pergi ke rumah nenek di desa. Ia membantu nenek menyapu halaman dan memberi makan ayam. Setelah itu, Andi bermain bersama sepupunya. Andi merasa senang karena bisa berkumpul dengan keluarga.",
        questionHtml: "Ringkasan teks tersebut adalah Andi pergi ke rumah nenek, membantu, bermain, dan merasa [blank].",
        correctText: "senang",
        explanation: "Pilihan yang benar ada di kalimat terakhir! Andi merasa senang karena bisa berkumpul dengan keluarga. 😊"
    },
    {
        readingId: 2,
        num: 17,
        readingText: "Pada sore hari, Riko dan keluarganya berjalan-jalan di pasar tradisional. Suasana pasar cukup ramai dan sedikit rempong karena banyak orang berbelanja. Riko melihat sebuah bangunan tua yang sudah bobrok di sudut pasar. Ia juga melihat seorang penjual dengan pakaian yang nyentrik sehingga menarik perhatian. Saat bulan Ramadan, Riko biasanya datang ke pasar untuk ngabuburit bersama teman-temannya. Riko merasa senang karena bisa belajar hal baru dari lingkungan sekitarnya.",
        questionHtml: "Kata “rempong” dalam teks berarti [blank].",
        correctText: "ribet",
        explanation: "Rempong adalah kata gaul yang artinya ribet atau repot! 😅"
    },
    {
        readingId: 2,
        num: 18,
        questionHtml: "Kata “bobrok” dalam teks berarti [blank].",
        correctText: "rusak",
        explanation: "Bangunan yang bobrok berarti bangunan yang sudah rusak parah atau reot. 🏚️"
    },
    {
        readingId: 2,
        num: 19,
        questionHtml: "Kata “ngabuburit” dalam teks berarti [blank].",
        correctText: "menunggu waktu berbuka puasa",
        explanation: "Ngabuburit adalah kegiatan jalan-jalan santai sambil menunggu waktu berbuka puasa tiba. 🌇"
    },
    {
        readingId: 2,
        num: 20,
        questionHtml: "Kalimat “Riko naik ke atas ke lantai dua” termasuk kalimat [blank].",
        correctText: "tidak efektif",
        explanation: "Kata 'naik' pasti ke atas, jadi penggunaan 'naik ke atas' adalah bentuk pemborosan kata (tidak efektif). 🚫"
    }
];

const dndWordBank = [
    "senang", "ribet", "rusak", "menunggu waktu berbuka puasa", "tidak efektif",
    "marah", "efektif"
];

const essayData = [
    {
        num: 21,
        readingText: "Pada hari Minggu, Andi pergi ke rumah nenek di desa. Ia membantu nenek menyapu halaman dan memberi makan ayam. Setelah itu, Andi bermain bersama sepupunya. Andi merasa senang karena bisa berkumpul dengan keluarga.",
        question: "Tuliskan tiga kegiatan yang dilakukan Andi dalam cerita tersebut!",
        placeholder: "Ketik 3 kegiatan (pisahkan dengan koma/baris)...",
    },
    {
        num: 22,
        question: "Apa pesan yang dapat kamu ambil dari cerita tersebut? Jelaskan!",
        placeholder: "Pesan dari cerita adalah...",
    },
    {
        num: 23,
        question: "Buatlah satu kalimat menggunakan kata “ngabuburit”!",
        placeholder: "Tulis kalimatmu di sini...",
    },
    {
        num: 24,
        question: "Berikan satu contoh kalimat efektif dan satu contoh kalimat tidak efektif!",
        placeholder: "Kalimat efektif:\n\nKalimat tidak efektif:",
    },
    {
        num: 25,
        question: "Jelaskan perbedaan antara kalimat efektif dan tidak efektif!",
        placeholder: "Perbedaannya adalah...",
    }
];


function shuffleArr(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

let currentSlideIndex = 0;
let score = 0;
let isAnswered = false;
let activeQuizData = [];
let currentMode = 'pg';
let dndAttempts = {};
let pgAttempts = {};

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

// Audio Context
const sfxCorrect = document.getElementById('sfx-correct');
const sfxWrong = document.getElementById('sfx-wrong');
const sfxPop = document.getElementById('sfx-pop');
const sfxClick = document.getElementById('sfx-click');

// Wheel Logic
const names = [
    "Azkayra", "Syazili", "Faeyza", "Qiela", "Qania",
    "Ghafi", "Khaizan", "Alzaidan", "Andra", "Dzahab",
    "Nadhira", "Ghea", "Aisyah", "Azzam", "Arzabel",
    "Pijar", "Hafidz", "Varo", "Inara", "Syiffa",
    "Farzana", "Ziyan", "Ghaziya", "Kinar", "Abizar",
    "Afsheen", "Arfan", "Adiba"
];
let wheelNames = [...names];

function playSound(audioEl) {
    if (audioEl) {
        audioEl.currentTime = 0;
        audioEl.play().catch(e => console.log('Audio error:', e));
    }
}

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
        instText.innerHTML = "1. Baca setiap teks dan soal dengan teliti.<br>2. Pilih satu jawaban yang menurutmu paling tepat.<br>3. Jika salah, kamu punya <b>1 kesempatan lagi</b> untuk mencoba.<br>4. Kumpulkan bintang sebanyak-banyaknya!";
    } else if (mode === 'essay') {
        instTitle.innerText = "📝 Petunjuk Uraian (Essay)";
        instText.innerHTML = "1. Baca teks cerita dan setiap pertanyaan dengan teliti.<br>2. Ketik jawabanmu secara lengkap di dalam kotak yang disediakan.<br>3. Periksa kembali huruf dan ejaan kalimatmu.<br>4. Jika sudah selesai, klik tombol <b>Kumpulkan & Periksa 🚀</b>.";
    } else {
        instTitle.innerText = "📝 Petunjuk Isian (Drag & Drop)";
        instText.innerHTML = "1. Baca paragraf atau soal dengan cermat.<br>2. Lengkapi kalimat atau cocokkan pernyataan dengan pilihan jawaban yang ada.<br>3. Kamu bisa <b>menyeret (drag)</b> jawaban ke dalam kotak ATAU <b>mengklik jawaban lalu mengklik kotaknya</b>.<br>4. Kamu punya <b>3 kali kesempatan</b> untuk setiap soal.";
    }

    instOverlay.classList.add('show');
}

function startQuizTransition() {
    playSound(sfxClick);
    const instOverlay = document.getElementById('instruction-overlay');
    instOverlay.classList.remove('show');

    setTimeout(() => {
        startMode(pendingMode);
    }, 300);
}

function startMode(mode) {
    currentMode = mode;
    hideAllScreens();
    playSound(sfxClick);

    screenQuiz.style.display = 'flex';
    setTimeout(() => screenQuiz.classList.add('active'), 10);

    const textPrefix = document.getElementById('slide-text-prefix');
    const numContainer = document.getElementById('slide-numbers-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (mode === 'pg') {
        pgAttempts = {};
        activeQuizData = quizData;
        if (textPrefix) textPrefix.innerText = "Soal PG";
        if (numContainer) numContainer.style.display = "inline";
        if (prevBtn) prevBtn.style.display = 'inline-block';
        if (nextBtn) nextBtn.style.display = 'inline-block';
    } else if (mode === 'dnd') {
        dndAttempts = {};
        activeQuizData = [{ mode: 'dnd' }];
        if (textPrefix) textPrefix.innerText = "Soal Isian";
        if (numContainer) numContainer.style.display = "none";
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
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

            const text = document.createElement('div');
            text.className = 'question-text';
            text.innerHTML = `${index + 1}. ${q.question}`;

            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'options-grid';

            q.options.forEach((optText, optIndex) => {
                const optCard = document.createElement('div');
                optCard.className = 'option-card';
                optCard.id = `opt-${index}-${optIndex}`;
                optCard.onclick = () => selectOption(index, optIndex);

                const prefix = document.createElement('div');
                prefix.className = 'option-prefix';
                prefix.innerText = optionPrefixes[optIndex];

                const textNode = document.createElement('span');
                textNode.innerHTML = optText;

                optCard.appendChild(prefix);
                optCard.appendChild(textNode);
                optionsGrid.appendChild(optCard);
            });

            questionBox.appendChild(text);
            questionBox.appendChild(optionsGrid);
            slide.appendChild(questionBox);
            slidesWrapper.appendChild(slide);
        });
    } else if (currentMode === 'dnd') {
        const slide = document.createElement('div');
        slide.className = `slide active`;
        slide.id = `slide-0`;
        // ensure it scrolls properly
        slide.style.alignItems = 'flex-start';

        const box = document.createElement('div');
        box.className = 'dnd-box';
        box.style.width = '100%';
        box.style.maxWidth = '1000px';
        box.style.margin = '20px auto';

        const contentRow = document.createElement('div');
        contentRow.className = 'dnd-content-row';

        const sentencesDiv = document.createElement('div');
        sentencesDiv.className = 'dnd-sentences';

        let lastReadingId = 0;
        dndQuestions.forEach((q, qIndex) => {
            if (q.readingId && q.readingId !== lastReadingId) {
                lastReadingId = q.readingId;
                const readingDiv = document.createElement('div');
                readingDiv.innerHTML = `<div style="text-align:left; font-size:1.1rem; line-height:1.6; color:#333; font-weight:normal; background:#FFF8E1; padding:15px; border-radius:10px; border-left:5px solid #FFC107; margin-bottom: 5px;"><b>Bacaan:</b><br>${q.readingText}</div>`;
                sentencesDiv.appendChild(readingDiv);
            }

            const sentenceCard = document.createElement('div');
            sentenceCard.className = 'dnd-sentence';

            const sentenceHtml = q.questionHtml.replace('[blank]', `<span class="dnd-dropzone" id="dz-${qIndex}" data-correct="${q.correctText}">Tarik ke sini...</span>`);
            sentenceCard.innerHTML = `<span style="font-weight:900; color:var(--primary); font-size:1.3rem;">${q.num}.</span> <span style="font-size:1.1rem;">${sentenceHtml}</span>`;
            sentencesDiv.appendChild(sentenceCard);
        });

        const wordBank = document.createElement('div');
        wordBank.className = 'word-bank';
        wordBank.style.flexDirection = 'row';
        wordBank.style.flexWrap = 'wrap';
        wordBank.style.justifyContent = 'center';
        wordBank.style.alignContent = 'flex-start';
        wordBank.style.alignItems = 'center';

        const shuffledBank = shuffleArr([...dndWordBank]);
        shuffledBank.forEach((wordText, wIndex) => {
            const word = document.createElement('div');
            word.className = 'dnd-word';
            word.innerText = wordText;
            word.id = `word-bank-${wIndex}`;
            setupDragEvents(word);
            wordBank.appendChild(word);
        });

        contentRow.appendChild(sentencesDiv);
        contentRow.appendChild(wordBank);
        box.appendChild(contentRow);
        slide.appendChild(box);
        slidesWrapper.appendChild(slide);

        document.querySelectorAll('.dnd-dropzone').forEach(dz => {
            dz.addEventListener('click', function () {
                if (window.selectedDndWord && !this.classList.contains('filled')) {
                    verifyDndDrop(window.selectedDndWord, this);
                }
            });
        });
    } else if (currentMode === 'essay') {
        const slide = document.createElement('div');
        slide.className = `slide active`;
        slide.id = `slide-0`;
        slide.style.alignItems = 'flex-start';

        const wrapper = document.createElement('div');
        wrapper.className = 'essay-wrapper';
        wrapper.style.width = '100%';

        essayData.forEach((eq, index) => {
            const card = document.createElement('div');
            card.className = 'essay-card';

            let html = ``;
            if (eq.readingText) {
                html += `<div style="font-size:1.1rem; background:#FFF8E1; padding:15px; border-radius:10px; border-left:5px solid #FFC107; margin-bottom:15px; font-weight:normal; line-height:1.6; color:#333;"><b>Cerita Pendek:</b><br>${eq.readingText}</div>`;
            }

            html += `<div style="font-weight:900; color:var(--primary); font-size:1.3rem; margin-bottom:10px;">${eq.num}. <span style="font-size:1.1rem; color:var(--dark); font-weight:700;">${eq.question}</span></div>`;
            html += `<textarea id="essay-ans-${index}" class="essay-textarea" placeholder="${eq.placeholder}"></textarea>`;

            html += `<div id="essay-feedback-${index}" class="essay-ans" style="display:none; transition: all 0.3s ease;"></div>`;

            card.innerHTML = html;
            wrapper.appendChild(card);
        });

        const submitBtn = document.createElement('button');
        submitBtn.className = 'action-btn';
        submitBtn.style.marginTop = '20px';
        submitBtn.innerText = "Kumpulkan & Periksa 🚀";
        submitBtn.id = 'essay-submit-btn';
        submitBtn.onclick = () => verifyEssayAll();
        wrapper.appendChild(submitBtn);

        slide.appendChild(wrapper);
        slidesWrapper.appendChild(slide);
    }
}

function selectOption(slideIndex, optionIndex) {
    if (slideIndex !== currentSlideIndex || isAnswered) return;

    const optCard = document.getElementById(`opt-${slideIndex}-${optionIndex}`);
    if (optCard.classList.contains('wrong')) return;

    const q = activeQuizData[slideIndex];
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

// === DRAG AND DROP LOGIC ===
let currentClone = null;
let currentWord = null;
let startX = 0, startY = 0;
window.selectedDndWord = null;

function setupDragEvents(wordEl) {
    wordEl.style.touchAction = 'none';

    wordEl.addEventListener('pointerdown', function (e) {
        if (wordEl.classList.contains('locked')) return;
        if (currentWord) return; // Prevent multi-touch drag override bug

        e.preventDefault();
        currentWord = wordEl;
        startX = e.clientX;
        startY = e.clientY;

        currentClone = wordEl.cloneNode(true);
        currentClone.style.position = 'fixed';
        currentClone.style.zIndex = '9999';
        currentClone.style.margin = '0';
        currentClone.style.pointerEvents = 'none';
        currentClone.classList.add('dragging');
        document.body.appendChild(currentClone);

        moveClone(e.clientX, e.clientY);
        wordEl.style.opacity = '0.5';

        document.addEventListener('pointermove', onDragMove);
        document.addEventListener('pointerup', onDragEnd);
        document.addEventListener('pointercancel', onDragCancel);
    });
}

function moveClone(x, y) {
    if (!currentClone) return;
    const rect = currentClone.getBoundingClientRect();
    currentClone.style.left = (x - rect.width / 2) + 'px';
    currentClone.style.top = (y - rect.height / 2) + 'px';
}

function onDragMove(e) {
    moveClone(e.clientX, e.clientY);
}

function cleanupDragEvents() {
    document.removeEventListener('pointermove', onDragMove);
    document.removeEventListener('pointerup', onDragEnd);
    document.removeEventListener('pointercancel', onDragCancel);
}

function onDragCancel(e) {
    cleanupDragEvents();

    if (currentWord) currentWord.style.opacity = '1';
    if (currentClone) currentClone.remove();
    currentClone = null;
    currentWord = null;
}

function onDragEnd(e) {
    cleanupDragEvents();

    if (!currentClone || !currentWord) return;

    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);

    if (dx < 10 && dy < 10) {
        // It's a click!
        if (window.selectedDndWord) {
            window.selectedDndWord.classList.remove('selected');
        }
        if (window.selectedDndWord !== currentWord) {
            window.selectedDndWord = currentWord;
            currentWord.classList.add('selected');
        } else {
            window.selectedDndWord = null;
        }
    } else {
        const dropzones = document.querySelectorAll('.dnd-dropzone:not(.filled)');
        let targetZone = null;

        for (const dz of dropzones) {
            const dzRect = dz.getBoundingClientRect();
            const pad = 30; // forgiving drop area for kids
            const x = e.clientX;
            const y = e.clientY;

            if (x >= dzRect.left - pad && x <= dzRect.right + pad && y >= dzRect.top - pad && y <= dzRect.bottom + pad) {
                targetZone = dz;
                break;
            }
        }

        if (targetZone) {
            verifyDndDrop(currentWord, targetZone);
        }
    }

    if (currentWord) currentWord.style.opacity = '1';
    if (currentClone) currentClone.remove();

    currentClone = null;
    currentWord = null;
}

function verifyDndDrop(wordEl, dropzoneEl) {
    // Determine the relevant DOM options and clear selections
    if (window.selectedDndWord === wordEl) {
        wordEl.classList.remove('selected');
        window.selectedDndWord = null;
    }

    const expected = dropzoneEl.getAttribute('data-correct');
    const isCorrect = wordEl.innerText === expected;
    const qIndex = parseInt(dropzoneEl.id.split('-')[1]);
    const q = dndQuestions[qIndex];

    if (!dndAttempts[qIndex]) dndAttempts[qIndex] = 0;

    if (isCorrect) {
        playSound(sfxCorrect);
        dropzoneEl.innerText = wordEl.innerText;
        dropzoneEl.className = 'dnd-dropzone filled correct';
        wordEl.classList.add('locked');
        wordEl.style.display = 'none'; // Ensure layout does not overlap accidentally
        score += 20;
        updateScoreUI();

        showPopup(true, q.explanation);
    } else {
        dndAttempts[qIndex]++;
        playSound(sfxWrong);

        dropzoneEl.innerText = wordEl.innerText;
        dropzoneEl.className = 'dnd-dropzone wrong';
        wordEl.style.opacity = '0';

        if (dndAttempts[qIndex] >= 3) {
            setTimeout(() => {
                // Return dragged word
                wordEl.style.opacity = '1';

                // Hide the actual correct word in bank
                const correctWordEl = Array.from(document.querySelectorAll('.dnd-word:not(.locked)')).find(el => el.innerText === q.correctText);
                if (correctWordEl) {
                    correctWordEl.classList.add('locked');
                    correctWordEl.style.display = 'none';
                }

                // Auto-fill wrong marker
                dropzoneEl.innerText = q.correctText;
                dropzoneEl.className = 'dnd-dropzone filled';
                dropzoneEl.style.background = '#FFCDD2';
                dropzoneEl.style.borderColor = '#F44336';
                dropzoneEl.style.color = '#C62828';
                dropzoneEl.style.borderStyle = 'solid';

                showPopup(false, "Kesempatan habis! \nPenjelasan: " + q.explanation);
            }, 1000);
        } else {
            setTimeout(() => {
                dropzoneEl.innerText = "Tarik ke sini...";
                dropzoneEl.className = 'dnd-dropzone';
                wordEl.style.opacity = '1';

                // Visual feedback only, no popup!
                const remainingTries = 3 - dndAttempts[qIndex];
                dropzoneEl.innerText = `Coba lagi (${remainingTries}x)`;
                setTimeout(() => {
                    if (!dropzoneEl.classList.contains('filled')) {
                        dropzoneEl.innerText = "Tarik ke sini...";
                    }
                }, 1500);
            }, 1000);
        }
    }
}

// === ESSAY LOGIC ===
function verifyEssayAll() {
    playSound(sfxCorrect);
    let totalScore = 0;

    // Disable form submission button
    document.getElementById('essay-submit-btn').style.display = 'none';

    essayData.forEach((eq, idx) => {
        const tex = document.getElementById(`essay-ans-${idx}`);
        const feedback = document.getElementById(`essay-feedback-${idx}`);
        const ansRaw = tex.value.toLowerCase().trim();
        tex.readOnly = true;

        let curScore = 0;
        let pFeedback = "";

        if (idx === 0) {
            const keys = ['pergi', 'nenek', 'bantu', 'sapu', 'makan', 'ayam', 'main', 'sepupu', 'kumpul', 'keluarga'];
            let matches = keys.filter(k => ansRaw.includes(k)).length;
            if (matches >= 3) {
                curScore = 20;
                pFeedback = "<b>Benar ✨</b> (Skor 20/20)<br>Kegiatan Andi: pergi ke rumah nenek, menyapu / memberi makan ayam, dan bermain bersama sepupu.";
            } else if (matches > 0) {
                curScore = 10;
                pFeedback = "<b>Belum Lengkap 😅</b> (Skor 10/20)<br>Kurang pas. Kegiatan Andi: pergi ke rumah nenek, menyapu / memberi makan ayam, dan bermain bersama sepupu.";
            } else {
                curScore = 0;
                if (ansRaw.length > 5) curScore = 5;
                pFeedback = "<b>Perlu Diperbaiki ❌</b> (Skor " + curScore + "/20)<br>Kegiatan Andi tidak tercakup. Kunci: pergi ke rumah nenek, menyapu halaman / memberi makan ayam, dan bermain dengan sepupu.";
            }
        }
        else if (idx === 1) {
            const keys = ['penting', 'keluarga', 'bantu', 'baik', 'sama', 'tolong'];
            let matches = keys.some(k => ansRaw.includes(k));
            if (matches && ansRaw.length > 5) {
                curScore = 20;
                pFeedback = "<b>Pesan bagus! ✨</b> (Skor 20/20)<br>Sangat tepat! Ini menunjukkan betap senangnya berkumpul dan saling membantu di keluarga.";
            } else {
                curScore = 5;
                if (ansRaw.length === 0) curScore = 0;
                pFeedback = "<b>Perlu diperbaiki 😅</b> (Skor " + curScore + "/20)<br>Kunci Pesan Moral: pentingnya kebersamaan keluarga dan mau tolong-menolong sesama saudara.";
            }
        }
        else if (idx === 2) {
            if (ansRaw.includes('ngabuburit') && ansRaw.length > 15) {
                curScore = 20;
                pFeedback = "<b>Kalimat Keren! ✨</b> (Skor 20/20)<br>Kamu berhasil merangkai kalimat dengan kata ngabuburit yang cukup panjang.";
            } else {
                curScore = 10;
                if (ansRaw.length < 5) curScore = 0;
                pFeedback = "<b>Yuk, coba lagi! 😅</b> (Skor " + curScore + "/20)<br>Pastikan kalimat buatanmu lengkap dan mempunyai kata 'ngabuburit' ya! Contoh: <i>Saya dan teman-teman ke taman untuk ngabuburit bersama.</i>";
            }
        }
        else if (idx === 3) {
            if ((ansRaw.includes('.') || ansRaw.includes('\n')) && ansRaw.length > 20) {
                curScore = 20;
                pFeedback = "<b>Telah Diperiksa ✨</b> (Skor 20/20)<br>Pastikan jawaban berpasangan ya!<br>Efektif: <i>Ani pergi ke sekolah.</i><br>Tidak Efektif: <i>Ani telah pergi naik ke atas ke sekolah.</i>";
            } else {
                curScore = 10;
                if (ansRaw.length === 0) curScore = 0;
                pFeedback = "<b>Telah Diperiksa 😅</b> (Skor " + curScore + "/20)<br>Pastikan buat 2 kalimat.<br>Efektif: <i>Ani pergi ke sekolah.</i><br>Tidak Efektif: <i>Ani turun ke bawah ke lantai bawah.</i>";
            }
        }
        else if (idx === 4) {
            const eff = ['jelas', 'singkat', 'padat', 'paham'];
            const ineff = ['panjang', 'boros', 'ulang', 'bingung'];
            if (eff.some(k => ansRaw.includes(k)) && ineff.some(k => ansRaw.includes(k))) {
                curScore = 20;
                pFeedback = "<b>Penjelasan Mantap! ✨</b> (Skor 20/20)<br>Tepat! Kalimat efektif itu jelas dan logis. Kalimat tidak efektif boros kata dan berulang-ulang.";
            } else {
                curScore = 10;
                if (ansRaw.length === 0) curScore = 0;
                pFeedback = "<b>Simak Kembali 😅</b> (Skor " + curScore + "/20)<br>Kunci Jawaban: Kalimat efektif itu lebih jelas dan padat. Sementara yang tidak efektif memboroskan kata (bertele-tele).";
            }
        }

        totalScore += curScore;

        if (curScore >= 15) {
            tex.style.borderColor = '#2ecc71';
            tex.style.backgroundColor = '#f1fdf5';
            feedback.style.borderLeftColor = '#27ae60';
            feedback.style.color = '#27ae60';
            feedback.style.backgroundColor = '#E8F5E9';
        } else {
            tex.style.borderColor = '#e74c3c';
            tex.style.backgroundColor = '#fdf5f5';
            feedback.style.borderLeftColor = '#e74c3c';
            feedback.style.color = '#c0392b';
            feedback.style.backgroundColor = '#FDEDED';
        }

        feedback.innerHTML = pFeedback;
        feedback.style.display = 'block';
        setTimeout(() => feedback.classList.add('show'), 10);
    });

    score = totalScore; // because base is 0
    updateScoreUI();

    const wrapper = document.querySelector('.essay-wrapper');
    const endBtn = document.createElement('button');
    endBtn.className = 'action-btn';
    endBtn.style.marginTop = '20px';
    endBtn.style.background = '#27ae60';
    endBtn.innerText = "Lihat Total Nilai 🏆";
    endBtn.onclick = () => showEndScreen();
    wrapper.appendChild(endBtn);

    setTimeout(() => {
        wrapper.scrollTo({ top: wrapper.scrollHeight, behavior: 'smooth' });
    }, 100);
}

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

    setTimeout(() => {
        overlay.classList.add('show');
    }, 500);
}

function closePopup() {
    playSound(sfxClick);
    overlay.classList.remove('show');

    if (currentMode === 'pg') {
        if (currentSlideIndex === activeQuizData.length - 1 && isAnswered) {
            setTimeout(showEndScreen, 500);
        }
    } else if (currentMode === 'dnd') {
        const remaining = document.querySelectorAll('.dnd-dropzone:not(.filled)');
        if (remaining.length === 0) {
            setTimeout(showEndScreen, 500);
        }
    }
}

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

function showEndScreen() {
    playSound(sfxCorrect);
    const scaledScore = score / 10;
    finalScore.innerText = scaledScore;
    document.getElementById('student-name').value = '';
    document.getElementById('student-class').value = '';
    endScreen.classList.add('show');
}

function restartQuiz() {
    playSound(sfxClick);
    endScreen.classList.remove('show');
    goToMenu();
}

function sendToGoogleForm() {
    const studentName = document.getElementById('student-name').value.trim();
    if (!studentName) {
        playSound(sfxWrong);
        alert("Jangan lupa isi namamu dulu ya! 😊");
        return;
    }

    const studentClassElement = document.getElementById('student-class');
    const studentClass = studentClassElement ? studentClassElement.value : '';
    if (!studentClass) {
        playSound(sfxWrong);
        alert("Harap pilih kelasmu! 😊");
        return;
    }

    const modeName = currentMode === 'pg' ? "Pilihan Ganda" : currentMode === 'dnd' ? "Isian (Drag & Drop)" : "Uraian (Essay)";
    const scaledScore = (score / 10).toString();

    // =============== KONFIGURASI GOOGLE FORM BAHASA INDONESIA ===============
    const url = "https://docs.google.com/forms/d/e/1FAIpQLSezFPfC2IjlTu5fAihoQ9NxeV_EncA3tWuwYlQ3gVUnjpzm3w/formResponse";

    const body = new URLSearchParams();
    body.append("entry.1036393770", studentName);          // Asumsi Urutan 1: Nama
    body.append("entry.199319667", studentClass);          // Asumsi Urutan 2: Kelas
    body.append("entry.626532998", scaledScore);           // Asumsi Urutan 3: Skor
    body.append("entry.1134473875", modeName);             // Asumsi Urutan 4: Mode Kuis


    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: body
    }).then(() => {
        playSound(sfxCorrect);
        alert(`Bagus sekali ${studentName} dari kelas ${studentClass}! Nilai ${scaledScore} bintang kamu sudah dikirim ke Guru! 🚀`);
        restartQuiz();
    }).catch(e => {
        alert("Sepertinya ada sedikit masalah saat mengirim nilai. Coba lagi ya!");
    });
}

