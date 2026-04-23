const quizData = [
    {
        question: "Benda seperti kereta yang ditarik oleh hewan dapat bergerak rata-rata jika....",
        image: "<img src='gambar1.png' alt='Kuda Menarik Delman' class='soal-img'>",
        options: [
            "diberi bahan bakar",
            "dikendalikan oleh kusir",
            "mendapat tarikan dari kuda",
            "dialiri listrik"
        ],
        correct: 2, // index of correct option
        explanation: "Kereta (delman) dapat bergerak karena mendapatkan gaya tarikan dari otot kuda! 🐎💨"
    },
    {
        question: "Gaya yang dilakukan oleh pemain bola voli ketika memukul bola adalah....",
        image: "🏐 ✋",
        options: [
            "pegas",
            "otot",
            "mesin",
            "tarik"
        ],
        correct: 1,
        explanation: "Pemain voli menggunakan tenaga dari otot tangannya untuk memukul dan mendorong bola melambung tinggi! 💪✨"
    },
    {
        question: "Penunjuk arah pada kompas terbuat dari magnet, termasuk dalam jenis magnet apa penunjuk arah pada kompas....",
        image: "🧭 🧭",
        options: [
            "magnet segitiga",
            "magnet jarum",
            "magnet batang",
            "magnet pipih"
        ],
        correct: 1,
        explanation: "Kompas menggunakan magnet berbentuk jarum yang bisa berputar bebas untuk selalu menunjuk ke arah Utara dan Selatan Bumi! 🧭🌍"
    },
    {
        question: "Magnet dapat menarik benda-benda yang dibuat dari bahan tertentu. Benda-benda yang ditarik lemah oleh magnet disebut.....",
        image: "🧲 📎",
        options: [
            "diamagnetik",
            "feromagnetik",
            "paramagnetik",
            "nonmagnetik"
        ],
        correct: 2,
        explanation: "Paramagnetik ditarik lemah oleh magnet, feromagnetik ditarik kuat, sedangkan diamagnetik akan ditolak oleh magnet. 🧲✨"
    },
    {
        question: "Membuat magnet dengan cara menggesekkan magnet pada batang besi secara searah disebut cara....",
        image: "<img src='gambar_5.png' alt='Cara Menggosok Magnet' class='soal-img'>",
        options: [
            "induksi",
            "gosokan",
            "elektromagnetik",
            "imbas"
        ],
        correct: 1,
        explanation: "Ini dinamakan cara gosokan! Dengan menggosokkan kutub magnet searah pada batang besi, besi itu lama-kelamaan akan memiliki sifat magnet. 🪄"
    },
    {
        question: "Serbuk besi yang ditaburkan pada magnet batang hanya akan menempel kuat di kedua ujungnya. Mengapa?",
        image: "🧲 ❄️",
        options: [
            "ujung magnet memiliki gaya magnet yang paling kuat",
            "menaburkannya kurang merata",
            "medan magnet kurang kuat",
            "tengah magnet tidak ada gayanya"
        ],
        correct: 0,
        explanation: "Gaya tarik terkuat selalu berada di kutub-kutubnya (ujung) magnet, baik itu kutub Utara maupun Selatan! ⚡"
    },
    {
        question: "Pada saat kamu melempar bola basket, gaya apa yang kamu berikan ke bola tersebut?",
        image: "🏀 ⛹️‍♂️",
        options: [
            "dorongan",
            "gesekan",
            "tarikan",
            "pegas"
        ],
        correct: 0,
        explanation: "Saat melempar, tanganmu memberikan gaya dorongan agar bola basket melesat ke udara menuju ring! 🏀💨"
    },
    {
        question: "Manakah yang merupakan contoh gejala listrik statis?<br>1. Balon menempel di dinding setelah digosok ke rambut<br>2. Bulu badan tertarik setrika panas<br>3. Remote TV perlu baterai<br>4. Ujung sisir menarik potongan kertas",
        image: "⚡ 🎈",
        options: [
            "(1), (2), dan (3)",
            "(1), (3), dan (4)",
            "(1), (2), dan (4)",
            "(2), (3), dan (4)"
        ],
        correct: 2,
        explanation: "Baterai remote (3) adalah contoh listrik dinamis (mengalir). Sedangkan balon, setrika, dan sisir adalah listrik statis (diam) karena gosokan! ⚡"
    },
    {
        question: "Buah apel yang sudah matang akan jatuh dari pohon ke tanah. Hal ini terjadi karena gaya....",
        image: "🍎 🌳 ⬇️",
        options: [
            "gravitasi",
            "listrik",
            "magnet",
            "otot"
        ],
        correct: 0,
        explanation: "Semua benda yang berada di bumi akan ditarik jatuh ke pusat bumi akibat adanya gaya tarik bumi (gravitasi)! 🌍🍎"
    },
    {
        question: "Serpihan kertas dapat ditarik oleh penggaris plastik yang telah digosokkan ke rambut karena adanya gaya....",
        image: "📏 ⚡ 📄",
        options: [
            "dorongan udara",
            "kekuatan plastik",
            "gaya listrik",
            "gaya otot"
        ],
        correct: 2,
        explanation: "Gosokan membuat penggaris plastik menghasilkan gaya listrik statis, sehingga mampu menarik benda ringan seperti serpihan kertas! ⚡📄✨"
    },
    {
        question: "Berdasarkan jenisnya, manakah pasangan berikut yang termasuk kelompok <b>gaya sentuh</b>?",
        image: "🖐️ 📦",
        options: [
            "Gaya gesek dan gaya magnet",
            "Gaya otot dan gaya gravitasi",
            "Gaya gesek dan gaya otot",
            "Gaya magnet dan gaya gravitasi"
        ],
        correct: 2,
        explanation: "Gaya sentuh memerlukan kontak langsung! Gaya gesek dan gaya otot terjadi saat kedua benda saling bersentuhan langsung. 🖐️"
    },
    {
        question: "Selain untuk menggerakkan benda, gaya juga bisa mengubah bentuk benda! Contoh gaya yang dapat <b>mengubah bentuk benda</b> adalah...",
        image: "🧱 🧶",
        options: [
            "Menekan plastisin dan menendang bola",
            "Menarik karet gelang dan menekan plastisin",
            "Mendorong meja dan melihat benda",
            "Menendang bola dan mendorong meja"
        ],
        correct: 1,
        explanation: "Saat menekan plastisin (tanah liat) dan menarik karet gelang, gaya menyebabkan bentuk benda tersebut meregang dan berubah bentuk! 🧱💫"
    },
    {
        question: "Aktivitas mana sajakah yang menggunakan gaya yang dapat <b>menyebabkan benda diam menjadi bergerak</b>?",
        image: "🪑 🏃‍♂️",
        options: [
            "Mendorong meja dan melihat benda",
            "Menarik kursi dan mendengar suara",
            "Mendorong meja dan menarik kursi",
            "Melihat benda dan mendengar suara"
        ],
        correct: 2,
        explanation: "Gaya dorong dan gaya tarik (pada meja dan kursi) dapat membuat benda yang awalnya diam menjadi bergerak bergeser! 🏃‍♂️💨"
    },
    {
        question: "Berikut ini yang merupakan contoh dari <b>gaya tak sentuh</b> (tidak perlu menempel untuk menarik/mendorong) adalah...",
        image: "🧲 🌍",
        options: [
            "Gaya magnet dan gaya dorong",
            "Gaya otot dan gaya gesek",
            "Gaya gravitasi dan gaya tarik",
            "Gaya magnet dan gaya gravitasi"
        ],
        correct: 3,
        explanation: "Gaya magnet maupun gravitasi tetap dapat menarik benda tanpa harus bersentuhan secara langsung loh! Keren kan? 🧲✨"
    },
    {
        question: "Rani mendorong meja kayu hingga bergeser. Saat dilewati lantai kasar, meja melambat. Pernyataan yang benar adalah...",
        image: "🪵 🛹",
        options: [
            "Gaya dorong membuat bergerak, lantai kasar memperbesar gaya gesek",
            "Gaya gesek yang membuat meja tersebut bergerak lebih cepat",
            "Gaya dorong sama sekali tidak memengaruhi gerak meja",
            "Lantai kasar membuat gaya gravitasi meja menjadi hilang"
        ],
        correct: 0,
        explanation: "Gaya dorong dari Rani menyebabkan meja bergerak! Sedangkan lantai kasar memperbesar gaya gesekan yang berlawanan, sehingga meja melambat. 🛹"
    },
    {
        type: 'drag-and-drop',
        question: "Tarik atau Ketuk kata di bawah ini untuk melengkapi kalimat!",
        questions: [
            { id: "q16", prefix: "16. Perhatikan gambar berikut! Benda seperti gambar di samping dapat bergerak jika", suffix: ".", image: "gerobak.png" },
            { id: "q17", prefix: "17. Meja akan bergerak apabila ada orang yang mendorongnya. Hal ini menunjukkan bahwa tarikan dan dorongan dapat", suffix: "." },
            { id: "q18", prefix: "18. Serbuk besi yang ditaburkan di sekitar magnet akan membentuk pola yang disebut", suffix: "." },
            { id: "q19", prefix: "19. Benda yang tidak dapat ditarik oleh magnet, seperti kayu dan plastik, disebut benda", suffix: "." },
            { id: "q20", prefix: "20. Magnet yang terjadi karena aliran listrik disebut magnet", suffix: "." }
        ],
        words: [
            { id: "w1", text: "didorong atau ditarik (diberi gaya)" },
            { id: "w2", text: "menggerakkan benda" },
            { id: "w3", text: "garis gaya magnet" },
            { id: "w4", text: "diamagnetik/nonmagnetis" },
            { id: "w5", text: "elektromagnet" }
        ],
        correctMapping: {
            "q16": "w1",
            "q17": "w2",
            "q18": "w3",
            "q19": "w4",
            "q20": "w5"
        }
    }
];
const essayData = [
    {
        id: "e1",
        question: "21. Jelaskan apa yang dimaksud dengan kemagnetan?",
        answer: "Kemagnetan adalah sifat suatu benda yang dapat menarik benda lain yang terbuat dari bahan tertentu (seperti besi atau baja) di sekitarnya.",
        check: (t) => {
            let txt = t.toLowerCase();
            const hasTarik = txt.includes('tarik') || txt.includes('narik') || txt.includes('nempel');
            const hasBenda = txt.includes('benda') || txt.includes('besi') || txt.includes('logam') || txt.includes('baja');
            return hasTarik && hasBenda;
        }
    },
    {
        id: "e2",
        question: "22. Sebutkan 3 pemanfaatan gaya otot dalam kehidupan!",
        answer: "<ul style='margin-left: 20px; text-align: left;'><li>Mengangkat tas</li><li>Mendorong meja</li><li>Menarik pintu</li><li>Mengayuh sepeda</li><li>Menendang bola</li><li>Mengangkat ember berisi air</li></ul>",
        check: (t) => {
            let txt = t.toLowerCase();
            const keywords = ['tas', 'meja', 'pintu', 'sepeda', 'bola', 'ember', 'kursi', 'angkat', 'dorong', 'tarik'];
            let count = 0;
            keywords.forEach(k => { if (txt.includes(k)) count++; });
            return count >= 3;
        }
    },
    {
        id: "e3",
        question: "23. Apa pengaruh dari gaya magnet?",
        answer: "Gaya magnet dapat menarik benda tertentu (seperti besi) dan dapat menggerakkan benda tanpa disentuh langsung.",
        check: (t) => {
            let txt = t.toLowerCase();
            const keywords = ['tarik', 'gerak', 'besi', 'logam', 'benda', 'sentuh', 'paku'];
            let count = 0;
            keywords.forEach(k => { if (txt.includes(k)) count++; });
            return count >= 2;
        }
    },
    {
        id: "e4",
        question: "24. Tuliskan tiga contoh kegiatan yang menggunakan gaya dorong!",
        answer: "<ul style='margin-left: 20px; text-align: left;'><li>Mendorong meja</li><li>Mendorong gerobak</li><li>Menutup pintu</li><li>Mendorong kursi</li><li>Mendorong motor mogok</li><li>Menekan tombol</li></ul>",
        check: (t) => {
            let txt = t.toLowerCase();
            const keywords = ['meja', 'gerobak', 'pintu', 'kursi', 'motor', 'tombol', 'mobil', 'lemari'];
            let count = 0;
            keywords.forEach(k => { if (txt.includes(k)) count++; });
            return count >= 3;
        }
    },
    {
        id: "e5",
        question: "25. Benda bergerak di lantai dan karpet, mana gaya gesek lebih besar? Jelaskan!",
        answer: "Gaya gesek lebih besar pada karpet, karena permukaannya kasar sehingga menghambat gerakan benda.",
        check: (t) => {
            let txt = t.toLowerCase();
            return txt.includes('karpet') && (txt.includes('kasar') || txt.includes('hambat') || txt.includes('besar'));
        }
    }
];

let currentSlideIndex = 0;
let score = 0;
let isAnswered = false;

// Variables for drag and drop
let draggedWordId = null;
let selectedWordId = null; // for click-to-drop fallback
let dropsCompleted = 0;

// Variables for routing
let currentMode = '';
let activeQuizData = [];

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
const screenEssay = document.getElementById('screen-essay');
const essayWrapper = document.getElementById('essay-wrapper');

// Audio Context
const sfxCorrect = document.getElementById('sfx-correct');
const sfxWrong = document.getElementById('sfx-wrong');
const sfxPop = document.getElementById('sfx-pop');

// Screen Routing
function hideAllScreens() {
    screenCover.classList.remove('active');
    screenMenu.classList.remove('active');
    screenQuiz.classList.remove('active');
    screenEssay.classList.remove('active');

    screenCover.style.display = 'none';
    screenMenu.style.display = 'none';
    screenQuiz.style.display = 'none';
    screenEssay.style.display = 'none';
}

function goToMenu() {
    hideAllScreens();
    screenMenu.style.display = 'flex';
    setTimeout(() => screenMenu.classList.add('active'), 10);
    playSound(sfxPop);
    setFabVisibility(false);
}

function startMode(mode) {
    currentMode = mode;
    hideAllScreens();
    playSound(sfxPop);

    if (mode === 'essay') {
        screenEssay.style.display = 'flex';
        setTimeout(() => screenEssay.classList.add('active'), 10);
        renderEssay();
        setFabVisibility(true);
    } else {
        screenQuiz.style.display = 'flex';
        setTimeout(() => screenQuiz.classList.add('active'), 10);

        const textPrefix = document.getElementById('slide-text-prefix');
        const numContainer = document.getElementById('slide-numbers-container');

        if (mode === 'pg') {
            activeQuizData = quizData.filter(q => q.type !== 'drag-and-drop');
            if (textPrefix) textPrefix.innerText = "Soal";
            if (numContainer) numContainer.style.display = "inline";
        } else if (mode === 'isian') {
            activeQuizData = quizData.filter(q => q.type === 'drag-and-drop');
            if (textPrefix) textPrefix.innerText = "Soal Isian";
            if (numContainer) numContainer.style.display = "none";
        }
        initQuiz();
        setFabVisibility(true);
    }
}

function renderEssay() {
    essayWrapper.innerHTML = '';
    let essaysCompleted = 0; // Pelacak jumlah soal terjawab

    essayData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'essay-card';

        const q = document.createElement('p');
        q.className = 'essay-q';
        q.innerText = item.question;

        const inputArea = document.createElement('textarea');
        inputArea.className = 'essay-textarea';
        inputArea.placeholder = "Ketik jawabanmu di sini...";

        const feedback = document.createElement('div');
        feedback.className = 'essay-feedback';

        const checkBtn = document.createElement('button');
        checkBtn.className = 'action-btn essay-check-btn';
        checkBtn.innerText = 'Periksa 🔍';
        checkBtn.style.marginRight = '10px';
        checkBtn.style.padding = '10px 15px';
        checkBtn.style.fontSize = '14px';

        const btn = document.createElement('button');
        btn.className = 'essay-ans-btn';
        btn.innerText = 'Kunci Jawaban Resmi 👁️';
        btn.style.display = 'none'; // Disembunyikan pada awalnya
        btn.style.padding = '10px 15px';
        btn.style.fontSize = '14px';

        const ans = document.createElement('div');
        ans.className = 'essay-ans';
        ans.innerHTML = "<b>Jawaban:</b><br>" + item.answer;

        checkBtn.onclick = () => {
            const val = inputArea.value.trim();
            if (!val) {
                playSound(sfxWrong);
                feedback.innerHTML = "<span style='color: #e74c3c;'>Kamu belum mengetik apa-apa! 😅</span>";
                return;
            }

            // Tampilkan tombol kunci jawaban setelah siswa mencoba menjawab
            btn.style.display = 'inline-block';

            // Kunci kolom ketik dan matikan tombol periksa agar tidak bisa direvisi
            inputArea.disabled = true;
            checkBtn.disabled = true;
            checkBtn.style.opacity = '0.6';
            checkBtn.style.cursor = 'not-allowed';

            essaysCompleted++;
            if (essaysCompleted === essayData.length) {
                finishBtnWrap.style.display = 'block';
                setTimeout(() => finishBtnWrap.scrollIntoView({ behavior: 'smooth', block: 'end' }), 500);
            }

            if (item.check(val)) {
                playSound(sfxCorrect);
                inputArea.classList.add('correct-input');
                inputArea.classList.remove('wrong-input');
                feedback.innerHTML = "<span style='color: #2ecc71; font-weight: bold;'>Hebat! Jawabanmu logis dan kata kuncinya tepat! 🎉</span>";
                score += 10; // Tambah bintang!
            } else {
                playSound(sfxWrong);
                inputArea.classList.add('wrong-input');
                inputArea.classList.remove('correct-input');
                feedback.innerHTML = "<span style='color: #e74c3c; font-weight: bold;'>Hmm, sepertinya kamu belum menyebutkan kata kunci yang tepat, coba baca lagi! 🧐</span>";
            }
        };

        btn.onclick = () => {
            ans.classList.toggle('show');
            btn.innerText = ans.classList.contains('show') ? 'Tutup Kunci 🙈' : 'Kunci 👁️';
            playSound(sfxPop);
        };

        card.appendChild(q);
        card.appendChild(inputArea);
        card.appendChild(feedback);

        const btnRow = document.createElement('div');
        btnRow.style.margin = '15px 0';
        btnRow.appendChild(checkBtn);
        btnRow.appendChild(btn);

        card.appendChild(btnRow);
        card.appendChild(ans);
        essayWrapper.appendChild(card);
    });

    // Menambahkan tombol "Selesai" untuk memunculkan Google Form pelaporan di akhir Uraian
    const finishBtnWrap = document.createElement('div');
    finishBtnWrap.style.display = 'none'; // Disembunyikan sampai semua soal terjawab
    finishBtnWrap.style.marginTop = '30px';
    finishBtnWrap.style.paddingBottom = '30px';

    const finishBtn = document.createElement('button');
    finishBtn.className = 'action-btn';
    finishBtn.style.width = '100%';
    finishBtn.style.padding = '15px';
    finishBtn.style.background = '#00BCD4'; // cyan
    finishBtn.style.boxShadow = '0 5px 0 #0097A7';
    finishBtn.innerText = 'Selesai';

    finishBtn.onclick = () => {
        playSound(sfxPop);
        showEndScreen();
    };

    finishBtnWrap.appendChild(finishBtn);
    essayWrapper.appendChild(finishBtnWrap);
}

function initQuiz() {
    totalSlideNum.innerText = activeQuizData.length;
    score = 0;
    currentSlideIndex = 0;
    dropsCompleted = 0;
    updateScoreUI();
    renderSlides();
    updateUI();
}

function renderSlides() {
    slidesWrapper.innerHTML = '';
    const optionPrefixes = ['A', 'B', 'C', 'D'];

    activeQuizData.forEach((q, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.id = `slide-${index}`;

        if (q.type === 'drag-and-drop') {
            // Render Drag and Drop Slide
            const dndBox = document.createElement('div');
            dndBox.className = 'dnd-box';

            const dndTitle = document.createElement('h2');
            dndTitle.className = 'dnd-title';
            dndTitle.innerHTML = q.question;
            dndBox.appendChild(dndTitle);

            const wordBank = document.createElement('div');
            wordBank.className = 'word-bank';
            wordBank.id = `word-bank-${index}`;

            // Shuffle words for presentation
            const shuffledWords = [...q.words].sort(() => Math.random() - 0.5);
            shuffledWords.forEach(word => {
                const wordEl = document.createElement('div');
                wordEl.className = 'dnd-word';
                wordEl.draggable = true;
                wordEl.id = word.id;
                wordEl.innerText = word.text;

                // Drag events
                wordEl.addEventListener('dragstart', (e) => {
                    draggedWordId = word.id;
                    wordEl.classList.add('dragging');
                });
                wordEl.addEventListener('dragend', () => wordEl.classList.remove('dragging'));

                // Click events for touch fallback
                wordEl.addEventListener('click', () => {
                    document.querySelectorAll('.dnd-word').forEach(el => el.classList.remove('selected'));
                    if (!wordEl.classList.contains('locked')) {
                        wordEl.classList.add('selected');
                        selectedWordId = word.id;
                    }
                });

                wordBank.appendChild(wordEl);
            });

            const sentencesContainer = document.createElement('div');
            sentencesContainer.className = 'dnd-sentences';

            q.questions.forEach(question => {
                const sentenceEl = document.createElement('div');
                sentenceEl.className = 'dnd-sentence';

                if (question.image) {
                    const img = document.createElement('img');
                    img.src = question.image;
                    img.style = "max-height: 120px; display: block; margin: 10px auto; border-radius: 10px; border: 3px solid #ccc; max-width: 100%; object-fit: contain;";
                    sentenceEl.appendChild(img);
                }

                const postfixRow = document.createElement('div');
                postfixRow.style = "display: inline-block;";

                const prefixEl = document.createElement('span');
                prefixEl.innerText = question.prefix + " ";

                const dropzoneEl = document.createElement('div');
                dropzoneEl.className = 'dnd-dropzone';
                dropzoneEl.id = `dropzone-${question.id}`;
                dropzoneEl.dataset.targetId = question.id;

                const suffixEl = document.createElement('span');
                suffixEl.innerText = " " + question.suffix;

                // Drop events
                dropzoneEl.addEventListener('dragover', (e) => e.preventDefault());
                dropzoneEl.addEventListener('drop', (e) => handleDrop(e, dropzoneEl, q, index));

                // Click events for touch fallback
                dropzoneEl.addEventListener('click', (e) => handleDrop({ preventDefault: () => { } }, dropzoneEl, q, index, true));

                postfixRow.appendChild(prefixEl);
                postfixRow.appendChild(dropzoneEl);
                postfixRow.appendChild(suffixEl);

                sentenceEl.appendChild(postfixRow);
                sentencesContainer.appendChild(sentenceEl);
            });

            const contentRow = document.createElement('div');
            contentRow.className = 'dnd-content-row';
            contentRow.appendChild(sentencesContainer);
            contentRow.appendChild(wordBank);

            dndBox.appendChild(contentRow);
            slide.appendChild(dndBox);

        } else {
            // Render Standard Multiple Choice Slide
            const questionBox = document.createElement('div');
            questionBox.className = 'question-box';

            const image = document.createElement('div');
            image.className = 'question-image';
            image.innerHTML = q.image;

            const text = document.createElement('div');
            text.className = 'question-text';
            text.innerHTML = q.question;

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

            questionBox.appendChild(image);
            questionBox.appendChild(text);
            questionBox.appendChild(optionsGrid);
            slide.appendChild(questionBox);
        }

        slidesWrapper.appendChild(slide);
    });
}

function handleDrop(e, dropzoneEl, q, slideIndex, isClick = false) {
    e.preventDefault();
    const wordId = isClick ? selectedWordId : draggedWordId;
    if (!wordId || dropzoneEl.classList.contains('filled')) return;

    const questionId = dropzoneEl.dataset.targetId;

    if (q.correctMapping[questionId] === wordId) {
        // Correct match!
        const wordEl = document.getElementById(wordId);
        wordEl.classList.add('locked');
        wordEl.draggable = false;

        dropzoneEl.innerText = wordEl.innerText;
        dropzoneEl.classList.add('filled', 'correct');

        score += 10;
        dropsCompleted++;
        updateScoreUI();
        playSound(sfxCorrect);

        // Reset selection handlers
        draggedWordId = null;
        selectedWordId = null;
        document.querySelectorAll('.dnd-word').forEach(el => el.classList.remove('selected'));

        // Check if level complete
        if (dropsCompleted === Object.keys(q.correctMapping).length) {
            nextBtn.disabled = false;
            setTimeout(() => {
                showPopup(true, "Selamat! Semua pasangan isianmu tepat! Luar biasa! 🎉✨");
            }, 500);
        }
    } else {
        // Wrong match
        playSound(sfxWrong);
        dropzoneEl.classList.add('wrong');
        setTimeout(() => dropzoneEl.classList.remove('wrong'), 500);

        if (isClick && selectedWordId) {
            selectedWordId = null;
            document.querySelectorAll('.dnd-word').forEach(el => el.classList.remove('selected'));
        }
    }
}

function selectOption(slideIndex, optionIndex) {
    if (slideIndex !== currentSlideIndex || isAnswered) return;

    isAnswered = true;
    const q = activeQuizData[slideIndex];
    const isCorrect = optionIndex === q.correct;

    if (isCorrect) {
        playSound(sfxCorrect);
        showPopup(true, q.explanation);
        score += 10;
        document.getElementById(`opt-${slideIndex}-${optionIndex}`).classList.add('correct');
    } else {
        playSound(sfxWrong);
        showPopup(false, "Penjelasan: " + q.explanation);
        document.getElementById(`opt-${slideIndex}-${optionIndex}`).classList.add('wrong');
        document.getElementById(`opt-${slideIndex}-${q.correct}`).classList.add('correct');
    }

    updateScoreUI();
    nextBtn.disabled = false;
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
    }, 500); // slight delay after selection
}

function closePopup() {
    playSound(sfxPop);
    overlay.classList.remove('show');
    // auto trigger next if it's not the last slide
    if (currentSlideIndex === activeQuizData.length - 1) {
        setTimeout(showEndScreen, 500);
    }
}

function updateUI() {
    const slides = document.querySelectorAll('.slide');

    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev');
        // Clear any inline styles that might block CSS classes
        slide.style.transform = '';
        slide.style.opacity = '';

        if (index === currentSlideIndex) {
            slide.classList.add('active');
        } else if (index < currentSlideIndex) {
            slide.classList.add('prev');
        }
        // Future slides will automatically fallback to .slide defaults (which is hidden to the right)
    });

    currentSlideNum.innerText = currentSlideIndex + 1;
    progressBar.style.width = `${((currentSlideIndex + 1) / activeQuizData.length) * 100}%`;

    isAnswered = false; // Reset for new slide
    nextBtn.disabled = true; // wait for answer
    prevBtn.disabled = currentSlideIndex === 0;

    // Special logic for drag and drop auto-enable check
    if (activeQuizData[currentSlideIndex].type === 'drag-and-drop') {
        const requiredDrops = Object.keys(activeQuizData[currentSlideIndex].correctMapping).length;
        if (dropsCompleted >= requiredDrops) {
            nextBtn.disabled = false;
        }
    }

    playSound(sfxPop);
}

function nextSlide() {
    playSound(sfxPop);
    if (currentSlideIndex < activeQuizData.length - 1) {
        currentSlideIndex++;
        updateUI();
    } else {
        showEndScreen();
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateUI();
        isAnswered = true; // Prevent re-answering already answered past questions easily
        nextBtn.disabled = false;
    }
}

function updateScoreUI() {
    scoreText.innerText = (score / 10); // 1 star per correct answer
}

function showEndScreen() {
    playSound(sfxCorrect);
    const scaledScore = score / 10;
    finalScore.innerText = scaledScore;
    document.getElementById('student-name').value = ''; // Reset nama
    endScreen.classList.add('show');
}

function restartQuiz() {
    playSound(sfxPop);
    endScreen.classList.remove('show');
    goToMenu();
}

function sendToGoogleForm() {
    const studentName = document.getElementById('student-name').value.trim();
    if (!studentName) {
        playSound(sfxWrong);
        alert("Mohon ketik nama kamu dulu ya! 😊");
        document.getElementById('student-name').focus();
        return;
    }

    let modeLabel = "";
    if (currentMode === 'pg') modeLabel = "Pilihan Ganda";
    else if (currentMode === 'isian') modeLabel = "Isian (Drag & Drop)";
    else if (currentMode === 'essay') modeLabel = "Essay";
    else modeLabel = "Kuis Magnet";

    const finalBintang = score / 10;
    const maxBintang = activeQuizData.length;
    const scoreText = `${finalBintang} / ${maxBintang} Bintang`;

    // ==============================================================
    // PENGIRIMAN RAHASIA KE GOOGLE FORM SECARA BACKGROUND (Anti-Cheating)
    // ==============================================================
    // Pastikan URL diakhiri dengan /formResponse, GANTI kata viewform menjadi formResponse
    const formResponseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfDsNBTU_a5REr4KzGgulAB3n8DhQAtdnpkxPG6wK3DJNdHRw/formResponse";

    const formData = new FormData();
    formData.append("entry.2107131171", studentName); // Nama
    formData.append("entry.159700786", scoreText);    // Skor
    formData.append("entry.622091598", modeLabel);    // Mode

    // Ubah UI tombol menjadi loading
    const btn = document.querySelector('.wa-report-box .action-btn');
    const originalText = btn.innerText;
    btn.innerText = "⏳ Mengirim Nilai...";
    btn.disabled = true;

    fetch(formResponseUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData
    })
        .then(() => {
            playSound(sfxCorrect);
            btn.innerText = "✅ Nilai Sudah Masuk Buku Guru!";
            btn.style.background = "#4CAF50"; // Warna hijau sukses
            btn.style.boxShadow = "0 5px 0 #388E3C";
            document.getElementById('student-name').disabled = true;
        })
        .catch((error) => {
            playSound(sfxWrong);
            btn.innerText = originalText;
            btn.disabled = false;
            alert("Gagal mengirim nilai. Coba cek internetmu ya! 😥");
        });
}

// Do NOT call initQuiz() automatically on load.
// Wait for user to interact with the Cover screen.

function playSound(soundElement) {
    if (soundElement) {
        soundElement.currentTime = 0;
        soundElement.play().catch(e => console.log("Audio play blocked by browser:", e));
    }
}

// --- SPIN WHEEL LOGIC ---
let isSpinning = false;
let currentRotation = 0;

function openWheel() {
    document.getElementById('wheel-overlay').style.display = 'flex';
    setTimeout(() => document.getElementById('wheel-overlay').classList.add('show'), 10);
    playSound(sfxPop);
}

function closeWheel() {
    playSound(sfxPop);
    document.getElementById('wheel-overlay').classList.remove('show');
    setTimeout(() => document.getElementById('wheel-overlay').style.display = 'none', 300);
}

function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    playSound(sfxPop);

    const wheelText = document.getElementById('wheel-text');
    const wheelRing = document.getElementById('wheel-ring');

    // Spin graphic
    currentRotation += 1440 + Math.random() * 360;
    wheelRing.style.transform = `rotate(${currentRotation}deg)`;

    // Slot machine text effect
    let spins = 0;
    const interval = setInterval(() => {
        wheelText.innerText = "Absen " + (Math.floor(Math.random() * 35) + 1);
        spins++;
        if (spins > 30) {
            clearInterval(interval);
            const winner = Math.floor(Math.random() * 35) + 1;
            wheelText.innerText = "Absen " + winner;
            wheelText.style.transform = "scale(1.3)";
            wheelText.style.color = "var(--primary)";
            playSound(sfxCorrect);
            setTimeout(() => {
                wheelText.style.transform = "scale(1)";
                wheelText.style.color = "var(--dark)";
                isSpinning = false;
            }, 1000);
        }
    }, 80);
}

// Helper: show/hide FAB
function setFabVisibility(visible) {
    const fab = document.getElementById('fab-spin-btn');
    if (fab) fab.style.display = visible ? 'block' : 'none';
}

// Hide FAB on initial load (cover screen)
window.onload = function () {
    setFabVisibility(false);
};
