/* =============================================
   BAHASA INDONESIA — quiz.js
   Slide 7: PG (1-10)
   ============================================= */

// ─── DATA ─────────────────────────────────────
const pgQuestions = [
    {
        q: "<div style='background: #fff3e0; padding: 10px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #ffd54f; color: #e65100; font-size: 0.9em; text-align: left;'><b>Bacalah teks berikut untuk menjawab soal nomor 1-3!</b><br>Pada hari Minggu, Rara membantu ibunya mencuci piring dan menyapu rumah. Setelah itu, Rara merapikan mainannya. Ibu merasa bangga karena Rara rajin membantu. Rara pun merasa senang.</div>Tujuan penulis menulis cerita tersebut adalah …",
        opts: ["Menghibur pembaca", "Menceritakan kegiatan Rara membantu ibu", "Mengajak bermain", "Menjelaskan cara mencuci"],
        ans: 1,
        pembahasan: "Teks tersebut menceritakan kegiatan Rara saat membantu ibunya di rumah."
    },
    {
        q: "Pesan yang ingin disampaikan penulis pada cerita Rara sebelumnya adalah …",
        opts: ["Bermain lebih penting", "Membantu orang tua adalah perbuatan baik", "Libur untuk tidur", "Pekerjaan rumah sulit"],
        ans: 1,
        pembahasan: "Cerita menunjukkan bahwa membantu orang tua adalah sikap yang baik."
    },
    {
        q: "Perasaan ibu Rara adalah …",
        opts: ["Sedih", "Marah", "Bangga", "Takut"],
        ans: 2,
        pembahasan: "Pada teks tertulis bahwa ibu merasa bangga karena Rara rajin membantu."
    },
    {
        q: "Kata “bisa” yang berarti mampu terdapat pada kalimat …",
        opts: ["Ular itu memiliki bisa", "Saya bisa mengerjakan tugas", "Bisa ular berbahaya", "Ular itu berbisa"],
        ans: 1,
        pembahasan: "Kata “bisa” pada kalimat tersebut berarti mampu atau dapat."
    },
    {
        q: "Kata “apel” pada kalimat “Pagi ini ada apel di lapangan” berarti …",
        opts: ["Buah", "Upacara", "Makanan", "Minuman"],
        ans: 1,
        pembahasan: "Apel di lapangan berarti kegiatan upacara atau berkumpul bersama."
    },
    {
        q: "Kata “kepala” pada “Kepala sekolah memberi sambutan” berarti …",
        opts: ["Bagian tubuh", "Pemimpin", "Rambut", "Mata"],
        ans: 1,
        pembahasan: "Kepala sekolah berarti pemimpin di sekolah."
    },
    {
        q: "Dalam menulis tegak bersambung, huruf harus …",
        opts: ["Terpisah", "Saling tersambung", "Tidak rapi", "Besar semua"],
        ans: 1,
        pembahasan: "Huruf tegak bersambung ditulis dengan huruf yang saling tersambung."
    },
    {
        q: "Huruf kecil yang ditulis hingga melewati garis bawah adalah …",
        opts: ["a, c, e", "b, d, h", "g, j, p, q, y", "m, n, o"],
        ans: 2,
        pembahasan: "Huruf g, j, p, q, dan y memiliki bagian yang turun melewati garis bawah."
    },
    {
        q: "Kata “hak” dalam kalimat berikut memiliki arti kepunyaan, kecuali ….",
        opts: ["Hak setiap warga negara harus dihormati", "Hak dan kewajiban harus dilaksanakan secara seimbang", "Sofia memakai sepatu hak tinggi", "Setiap anak memiliki hak untuk bermain"],
        ans: 2,
        pembahasan: "Pada kalimat C, “hak” berarti bagian tinggi pada sepatu, bukan kepunyaan."
    },
    {
        q: "Langkah pertama saat menyampaikan pendapat tentang informasi dalam teks adalah ….",
        opts: ["Menyusun kalimat pendapat yang akan disampaikan", "Memahami topik yang dibahas", "Menyampaikan pendapat dengan sopan", "Mencari data atau fakta yang menguatkan pendapat kita"],
        ans: 1,
        pembahasan: "Sebelum menyampaikan pendapat, kita harus memahami topik atau isi teks terlebih dahulu."
    }
];

const isianQuestions = [];

const essayQuestions = [];

const dndQuestions = [];

const LETTERS = ['A', 'B', 'C', 'D'];

// ─── STATE ─────────────────────────────────────
const pgState = pgQuestions.map(q => ({ attempts: 0, locked: false, correct: false, selected: q.multi ? [] : null }));
const isianState = isianQuestions.map(() => ({ attempts: 0, locked: false, correct: false, points: 0 }));
const essayState = essayQuestions.map(() => ({ locked: false, points: 0, correct: false }));
const dndState = dndQuestions.map(() => ({ locked: false, correct: false, attempts: 0, answers: { gap0: null, gap1: null } }));

let totalDoneCount = 0;

// ─── RENDERERS ────────────────────────────────
function renderQuiz() {
    const pgContainer = document.getElementById('pgContainer');
    if (pgContainer) {
        pgContainer.innerHTML = '';
        pgQuestions.forEach((q, qi) => {
            const card = document.createElement('div');
            card.className = 'pg-card';
            card.id = `pg-card-${qi}`;
            let optionsHtml = q.multi ?
                q.opts.map((opt, oi) => `<button class="q-opt" id="q-opt-${qi}-${oi}" onclick="handleMultiAnswer(${qi}, ${oi})"><span class="opt-letter">${LETTERS[oi]}</span><span class="opt-text">${opt}</span></button>`).join('') + `<button class="check-multi-btn" id="check-multi-${qi}" onclick="checkMultiAnswer(${qi})" disabled>Cek Jawaban ✓</button>` :
                q.opts.map((opt, oi) => `<button class="q-opt" id="q-opt-${qi}-${oi}" onclick="handlePGAnswer(${qi}, ${oi})"><span class="opt-letter">${LETTERS[oi]}</span><span class="opt-text">${opt}</span></button>`).join('');
            card.innerHTML = `<div class="q-header"><span class="q-num-badge" id="q-badge-${qi}">${qi + 1}</span><div class="q-text">${q.q}</div></div><div class="q-opts" id="q-opts-${qi}">${optionsHtml}</div><div class="q-feedback" id="q-fb-${qi}"></div>`;
            pgContainer.appendChild(card);
        });
    }
    renderIsian();
    renderEssay();
    renderDnDGap();
}

function renderIsian() {
    const isianContainer = document.getElementById('isianContainer');
    if (!isianContainer) return;
    if (isianQuestions.length === 0) {
        isianContainer.innerHTML = '';
        isianContainer.style.display = 'none';
        return;
    }
    isianContainer.style.display = 'block';
    isianContainer.innerHTML = '<div class="section-title">--- Isian Singkat ---</div>';
    isianQuestions.forEach((q, qi) => {
        const card = document.createElement('div');
        card.className = 'pg-card isian-card';
        card.id = `isian-card-${qi}`;
        card.innerHTML = `<div class="q-header"><span class="q-num-badge" id="isian-badge-${qi}">${pgQuestions.length + qi + 1}</span><div class="q-text">${q.q}</div></div><div class="isian-input-wrap"><input type="text" class="isian-input" id="isian-input-${qi}" placeholder="Ketik jawaban..." onkeypress="if(event.key==='Enter') checkIsianAnswer(${qi})"><button class="isian-check-btn" id="isian-check-${qi}" onclick="checkIsianAnswer(${qi})">Cek ✓</button></div><div class="q-feedback" id="isian-fb-${qi}"></div>`;
        isianContainer.appendChild(card);
    });
}

function renderEssay() {
    const essayContainer = document.getElementById('essayContainer');
    if (!essayContainer) return;
    essayContainer.innerHTML = '';
    essayQuestions.forEach((q, qi) => {
        const card = document.createElement('div');
        card.className = 'pg-card essay-card';
        card.id = `essay-card-${qi}`;
        card.innerHTML = `<div class="q-header"><span class="q-num-badge" id="essay-badge-${qi}">${q.number}</span><div class="q-text">${q.q}</div></div><div class="essay-input-wrap"><textarea class="essay-input" id="essay-input-${qi}" placeholder="Tuliskan jawaban lengkapmu di sini..." rows="3"></textarea><button class="essay-check-btn" id="essay-check-${qi}" onclick="checkEssayAnswer(${qi})">Kirim Jawaban ✓</button></div><div class="q-feedback" id="essay-fb-${qi}"></div>`;
        essayContainer.appendChild(card);
    });
}

function renderDnDGap() {
    const container = document.getElementById('dndGapContainer');
    if (!container) return;
    container.innerHTML = '';

    dndQuestions.forEach((q, qi) => {
        const card = document.createElement('div');
        card.className = 'pg-card dnd-gap-card';
        const num = pgQuestions.length + isianQuestions.length + essayQuestions.length + qi + 1;
        card.innerHTML = `
            <div class="q-header">
                <span class="q-num-badge" id="dnd-badge-${qi}">${num}</span>
                <div class="q-text">${q.q}</div>
            </div>
            <img src="${q.img}" class="q-img">
            <div class="dnd-sentence">
                ${q.sentence.map(part => {
            if (part.startsWith('{gap')) {
                const gapId = part.replace('{', '').replace('}', '');
                return `<div class="dnd-drop-zone" id="${qi}-${gapId}" ondragover="event.preventDefault()" ondrop="handleDrop(event, ${qi}, '${gapId}')" onclick="handleZoneClick(event, ${qi}, '${gapId}')" ontouchstart="handleZoneClick(event, ${qi}, '${gapId}')">Tarik di sini</div>`;
            }
            return `<span>${part}</span>`;
        }).join('')}
            </div>
            <div class="dnd-choices-pool" id="dndChoices-${qi}">
                ${q.choices.map((c, ci) => `
                    <div class="dnd-choice-item" id="choice-${qi}-${ci}" draggable="true" ondragstart="handleDragStart(event, '${c}')" onclick="handleChoiceClick(event, ${qi}, ${ci}, '${c}')" ontouchstart="handleChoiceClick(event, ${qi}, ${ci}, '${c}')">${c}</div>
                `).join('')}
            </div>
            <button class="dnd-check-btn" id="dndCheckBtn-${qi}" onclick="checkDnDGap(${qi})" disabled>Cek Urutan ✓</button>
            <div class="q-feedback" id="dnd-fb-${qi}"></div>
        `;
        container.appendChild(card);
    });
}

// ─── HANDLERS ─────────────────────────────────
function handlePGAnswer(qi, oi) {
    const state = pgState[qi]; if (state.locked) return;
    const btn = document.getElementById(`q-opt-${qi}-${oi}`);
    state.attempts++; const isCorrect = (oi === pgQuestions[qi].ans); const fb = document.getElementById(`q-fb-${qi}`);
    if (isCorrect) {
        state.correct = true; if (window.SFX) window.SFX.correct();
        btn.classList.add('opt-correct'); fb.className = 'q-feedback fb-correct'; fb.textContent = '✅ Benar! Hebat!';
        setTimeout(() => showPembahasan(pgQuestions[qi].pembahasan, true), 600); lockPG(qi);
    } else if (state.attempts === 1) {
        if (window.SFX) window.SFX.wrong(); btn.classList.add('opt-wrong');
        fb.className = 'q-feedback fb-wrong'; fb.textContent = '❌ Belum tepat. Coba lagi ya! (1 kesempatan lagi)';
        showTryAgain(); setTimeout(() => btn.classList.remove('opt-wrong'), 900);
    } else {
        if (window.SFX) window.SFX.wrong(); btn.classList.add('opt-wrong');
        document.getElementById(`q-opt-${qi}-${pgQuestions[qi].ans}`).classList.add('opt-correct');
        fb.className = 'q-feedback fb-wrong'; fb.textContent = '❌ Kesempatan habis.';
        setTimeout(() => showPembahasan(pgQuestions[qi].pembahasan, false), 600); lockPG(qi);
    }
}

function handleMultiAnswer(qi, oi) {
    const state = pgState[qi]; if (state.locked) return;
    const btn = document.getElementById(`q-opt-${qi}-${oi}`);
    if (state.selected.includes(oi)) { state.selected = state.selected.filter(i => i !== oi); btn.classList.remove('opt-selected'); }
    else if (state.selected.length < 2) { state.selected.push(oi); btn.classList.add('opt-selected'); }
    document.getElementById(`check-multi-${qi}`).disabled = (state.selected.length !== 2);
    if (window.SFX) window.SFX.click();
}

function checkMultiAnswer(qi) {
    const state = pgState[qi]; const q = pgQuestions[qi]; state.attempts++;
    const isCorrect = (JSON.stringify([...state.selected].sort()) === JSON.stringify([...q.ans].sort()));
    const fb = document.getElementById(`q-fb-${qi}`);
    if (isCorrect) {
        state.correct = true; if (window.SFX) window.SFX.correct();
        state.selected.forEach(oi => document.getElementById(`q-opt-${qi}-${oi}`).classList.add('opt-correct'));
        fb.className = 'q-feedback fb-correct'; fb.textContent = '✅ Benar! Hebat!';
        setTimeout(() => showPembahasan(q.pembahasan, true), 600); lockPG(qi);
    } else if (state.attempts === 1) {
        if (window.SFX) window.SFX.wrong(); fb.className = 'q-feedback fb-wrong'; fb.textContent = '❌ Belum tepat.';
        showTryAgain(); state.selected.forEach(oi => document.getElementById(`q-opt-${qi}-${oi}`).classList.remove('opt-selected'));
        state.selected = []; document.getElementById(`check-multi-${qi}`).disabled = true;
    } else {
        if (window.SFX) window.SFX.wrong(); q.ans.forEach(oi => document.getElementById(`q-opt-${qi}-${oi}`).classList.add('opt-correct'));
        fb.className = 'q-feedback fb-wrong'; fb.textContent = '❌ Kesempatan habis.';
        setTimeout(() => showPembahasan(q.pembahasan, false), 600); lockPG(qi);
    }
}

function checkIsianAnswer(qi) {
    const state = isianState[qi]; if (state.locked) return;
    const q = isianQuestions[qi]; const input = document.getElementById(`isian-input-${qi}`);
    const userVal = input.value.trim(); if (!userVal) return;
    state.attempts++;

    let points = 0;
    const cu = userVal.toLowerCase().replace(/[^\w\s]/g, '').trim();

    // Check main answer
    const validMains = q.kj_utama.split('/').map(v => v.toLowerCase().replace(/[^\w\s]/g, '').trim());
    if (validMains.some(v => cu === v)) {
        points = 2;
    } else if (q.opsi_lain && q.opsi_lain.some(a => cu === a.toLowerCase().replace(/[^\w\s]/g, '').trim())) {
        points = 1;
    } else if (q.keywords && q.keywords.some(kw => cu.includes(kw.toLowerCase()))) {
        points = 1;
    }

    const isCorrect = points > 0;
    const fb = document.getElementById(`isian-fb-${qi}`);

    if (points === 2) {
        state.correct = true;
        state.points = 2;
        if (window.SFX) window.SFX.correct();
        input.classList.add('input-correct'); fb.className = 'q-feedback fb-correct';
        fb.innerHTML = `<div class="fb-msg">✅ Benar Sempurna! (+2 Poin)</div><div class="fb-user-box">Jawabanmu: <b>${userVal}</b></div><div class="fb-kj-box-isian">Kunci Jawaban: <span>${q.kj_utama}</span></div>`;
        setTimeout(() => showPembahasan(q.pembahasan, true), 600); lockIsian(qi);
    } else if (state.attempts === 1) {
        if (window.SFX) window.SFX.wrong(); input.classList.add('input-wrong');
        fb.className = 'q-feedback fb-wrong';
        let msg = points === 1 ? '❌ Kurang tepat.' : '❌ Belum tepat.';
        fb.innerHTML = `<div class="fb-msg">${msg}</div><div class="fb-user-box">Jawabanmu: <b>${userVal}</b></div><div class="fb-hint-msg">Coba perbaiki lagi ya! (1 kesempatan lagi)</div>`;
        showTryAgain(); setTimeout(() => input.classList.remove('input-wrong'), 1500);
    } else if (points === 1) {
        state.correct = false; // set false so the review badge shows 📖 instead of 🌟
        state.points = 1;
        if (window.SFX) window.SFX.wrong();
        input.classList.add('input-wrong'); fb.className = 'q-feedback fb-wrong';
        fb.innerHTML = `<div class="fb-msg">❌ Kurang tepat. (+1 Poin)</div><div class="fb-user-box">Jawabanmu: <b>${userVal}</b></div><div class="fb-kj-box-isian">Kunci Jawaban Utama: <span>${q.kj_utama}</span></div>`;
        setTimeout(() => showPembahasan(q.pembahasan, false), 600); lockIsian(qi);
    } else {
        if (window.SFX) window.SFX.wrong(); fb.className = 'q-feedback fb-wrong';
        fb.innerHTML = `<div class="fb-msg">❌ Kesempatan habis.</div><div class="fb-user-box">Jawabanmu: <b>${userVal}</b></div><div class="fb-kj-box-isian">Kunci Jawaban Utama: <span>${q.kj_utama}</span></div>`;
        setTimeout(() => showPembahasan(q.pembahasan, false), 600); lockIsian(qi);
    }
}

function normalizeEssayText(str) {
    if (!str) return "";
    return str
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function checkEssayAnswer(qi) {
    const state = essayState[qi];
    if (state.locked) return;

    const q = essayQuestions[qi];
    const input = document.getElementById(`essay-input-${qi}`);
    const checkBtn = document.getElementById(`essay-check-${qi}`);
    const fb = document.getElementById(`essay-fb-${qi}`);
    const userVal = input.value.trim();
    if (!userVal) return;

    if (state.attempts === undefined) {
        state.attempts = 0;
    }
    state.attempts++;

    const normUser = normalizeEssayText(userVal);
    const normMain = normalizeEssayText(q.mainAnswer);
    let exactMatch = (normUser === normMain);
    if (!exactMatch && q.alternativeAnswers) {
        for (let alt of q.alternativeAnswers) {
            if (normUser === normalizeEssayText(alt)) {
                exactMatch = true;
                break;
            }
        }
    }

    let points = 0;
    if (exactMatch) {
        points = 3;
    } else if (q.number === "23A") {
        const containsMata = normUser.includes("mata");
        if (containsMata) {
            const wordCount = userVal.split(/\s+/).filter(w => w.length > 0).length;
            if (wordCount >= 5) {
                points = 3;
            } else {
                points = 2;
            }
        } else {
            points = 0;
        }
    } else if (q.number === "23B") {
        const containsTangan = normUser.includes("tangan");
        if (containsTangan) {
            const wordCount = userVal.split(/\s+/).filter(w => w.length > 0).length;
            if (wordCount >= 5) {
                points = 3;
            } else {
                points = 2;
            }
        } else {
            points = 0;
        }
    } else if (q.number === "24") {
        const targetLetters = ["g", "j", "p", "q", "y"];
        let matchedLettersCount = 0;
        targetLetters.forEach(letter => {
            if (normUser.includes(letter)) {
                matchedLettersCount++;
            }
        });
        if (matchedLettersCount === 5) {
            points = 3;
        } else if (matchedLettersCount === 3 || matchedLettersCount === 4) {
            points = 2;
        } else {
            points = 0;
        }
    } else if (q.number === "25") {
        const acceptedPoints = [
            ["rapi", "tertata rapi"],
            ["jelas dibaca", "mudah dibaca"],
            ["proporsional", "ukuran huruf sesuai", "bentuk huruf seimbang"],
            ["tersambung dengan baik", "saling tersambung", "bersambung", "tersambung"],
            ["kemiringan tulisan konsisten", "miringnya sama", "kemiringannya tidak berubah-ubah", "kemiringan konsisten"],
            ["mengikuti garis tulisan", "sesuai garis", "tidak keluar garis", "mengikuti garis"],
            ["bersih", "tulisan bersih"],
            ["tidak banyak coretan", "tidak penuh coretan", "minim coretan"]
        ];
        let matchedPointsCount = 0;
        acceptedPoints.forEach(synonyms => {
            const matched = synonyms.some(syn => normUser.includes(syn));
            if (matched) matchedPointsCount++;
        });

        if (matchedPointsCount >= 4) {
            points = 3;
        } else if (matchedPointsCount === 2 || matchedPointsCount === 3) {
            points = 2;
        } else {
            points = 0;
        }
    } else {
        let matches3 = 0;
        q.keywords3.forEach(kw => {
            if (normUser.includes(kw.toLowerCase())) {
                matches3++;
            }
        });

        let matches2 = 0;
        q.keywords2.forEach(kw => {
            if (normUser.includes(kw.toLowerCase())) {
                matches2++;
            }
        });

        const req3 = Math.max(1, Math.ceil(q.keywords3.length * 0.6));
        if (matches3 >= req3) {
            points = 3;
        } else if (matches3 >= 1 || matches2 >= 1) {
            points = 2;
        } else {
            points = 0;
        }
    }

    if (points === 3) {
        state.points = 3;
        state.correct = true;
        state.locked = true;
        totalDoneCount++;

        if (window.SFX) window.SFX.correct();
        input.classList.add('input-correct');
        input.disabled = true;
        checkBtn.style.display = 'none';

        fb.className = 'q-feedback fb-correct';
        fb.innerHTML = `
            <div style="font-weight: 800; font-size: 1.1rem; margin-bottom: 5px;">Jawaban lengkap! Kamu mendapat 3 poin. 🌟</div>
            <div style="font-size: 0.95rem; font-weight: 700; background: rgba(255, 255, 255, 0.7); padding: 10px; border-radius: 8px; margin-top: 8px; border-left: 5px solid #22c55e; color: #15803d;">
                <strong>Pembahasan:</strong> ${q.pembahasan}
            </div>
        `;
        fb.style.display = 'block';
        checkQuizComplete();
    } else if (points === 2) {
        state.points = 2;
        state.correct = true;
        state.locked = true;
        totalDoneCount++;

        if (window.SFX) window.SFX.correct();
        input.classList.add('input-correct');
        input.disabled = true;
        checkBtn.style.display = 'none';

        fb.className = 'q-feedback fb-correct';
        fb.style.background = '#fffbeb';
        fb.style.color = '#92400e';
        fb.style.border = '1px solid #fef3c7';
        fb.innerHTML = `
            <div style="font-weight: 800; font-size: 1.1rem; margin-bottom: 5px;">Jawaban sudah cukup tepat, tetapi belum lengkap. Kamu mendapat 2 poin. 📖</div>
            <div style="font-size: 0.95rem; font-weight: 700; background: rgba(255, 255, 255, 0.7); padding: 10px; border-radius: 8px; margin-top: 8px; border-left: 5px solid #f59e0b; color: #374151;">
                <strong>Pembahasan:</strong> ${q.pembahasan}
            </div>
        `;
        fb.style.display = 'block';
        checkQuizComplete();
    } else {
        if (state.attempts === 1) {
            if (window.SFX) window.SFX.wrong();
            input.classList.add('input-wrong');
            fb.className = 'q-feedback fb-wrong';
            fb.innerHTML = `<div style="font-weight: 800;">Kurang tepat. Coba sekali lagi! 🧐</div>`;
            fb.style.display = 'block';
            showTryAgain();
            setTimeout(() => {
                const currentInput = document.getElementById(`essay-input-${qi}`);
                if (currentInput) currentInput.classList.remove('input-wrong');
            }, 1500);
        } else {
            state.points = 0;
            state.correct = false;
            state.locked = true;
            totalDoneCount++;

            if (window.SFX) window.SFX.wrong();
            input.classList.add('input-wrong');
            input.disabled = true;
            checkBtn.style.display = 'none';

            fb.className = 'q-feedback fb-wrong';
            fb.innerHTML = `
                <div style="font-weight: 800; font-size: 1.1rem; margin-bottom: 5px;">Kurang tepat. Jawaban yang benar: <strong>${q.mainAnswer}</strong>. Kamu mendapat 0 poin.</div>
                <div style="font-size: 0.95rem; font-weight: 700; background: rgba(255, 255, 255, 0.7); padding: 10px; border-radius: 8px; margin-top: 8px; border-left: 5px solid #ef4444; color: #374151;">
                    <strong>Pembahasan:</strong> ${q.pembahasan}
                </div>
            `;
            fb.style.display = 'block';
            checkQuizComplete();
        }
    }
}

let selectedChoice = null;
let lastInteractionTime = 0;

function handleDragStart(e, text) {
    e.dataTransfer.setData('text/plain', text);
    selectedChoice = { text };
    if (window.SFX) window.SFX.click();
}

function handleChoiceClick(e, qi, ci, text) {
    const now = Date.now();
    if (now - lastInteractionTime < 300) return;
    lastInteractionTime = now;

    if (dndState[qi].locked) return;
    if (window.SFX) window.SFX.click();

    // If clicking the same one, deselect
    if (selectedChoice && selectedChoice.qi === qi && selectedChoice.ci === ci) {
        selectedChoice = null;
        document.querySelectorAll(`.dnd-choice-item`).forEach(el => el.classList.remove('selected'));
        return;
    }

    selectedChoice = { qi, ci, text };
    document.querySelectorAll(`.dnd-choice-item`).forEach(el => el.classList.remove('selected'));
    const btn = document.getElementById(`choice-${qi}-${ci}`);
    if (btn) btn.classList.add('selected');
}

function handleZoneClick(e, qi, gapId) {
    const now = Date.now();
    if (now - lastInteractionTime < 300) return;
    lastInteractionTime = now;

    if (dndState[qi].locked || !selectedChoice) return;
    placeAnswer(qi, gapId, selectedChoice.text);
    selectedChoice = null;
    document.querySelectorAll(`.dnd-choice-item`).forEach(el => el.classList.remove('selected'));
}

function handleDrop(e, qi, gapId) {
    e.preventDefault();
    const text = e.dataTransfer.getData('text/plain') || (selectedChoice ? selectedChoice.text : null);
    if (!text) return;
    placeAnswer(qi, gapId, text);
    selectedChoice = null;
}

function placeAnswer(qi, gapId, text) {
    const zone = document.getElementById(`${qi}-${gapId}`);
    if (!zone) return;
    zone.textContent = text;
    zone.classList.add('dropped');
    dndState[qi].answers[gapId] = text;

    const allFilled = Object.values(dndState[qi].answers).every(v => v !== null);
    document.getElementById(`dndCheckBtn-${qi}`).disabled = !allFilled;
    if (window.SFX) window.SFX.correct();
}

function checkDnDGap(qi) {
    const state = dndState[qi]; if (state.locked) return;
    state.attempts++; const q = dndQuestions[qi];
    const isCorrect = q.gaps.every(g => state.answers[g.id] === g.ans);
    const fb = document.getElementById(`dnd-fb-${qi}`);
    if (isCorrect) {
        state.correct = true; if (window.SFX) window.SFX.correct();
        fb.className = 'q-feedback fb-correct'; fb.textContent = '✅ Benar! Kamu hebat!';
        lockDnD(qi); setTimeout(() => showPembahasan(q.pembahasan, true), 600);
    } else {
        if (window.SFX) window.SFX.wrong();
        fb.className = 'q-feedback fb-wrong'; fb.textContent = '❌ Belum tepat. Ayo coba lagi!';
        showTryAgain();

        q.gaps.forEach(g => {
            const z = document.getElementById(`${qi}-${g.id}`);
            z.textContent = 'Tarik di sini';
            z.classList.remove('dropped');
            state.answers[g.id] = null;
        });
        document.getElementById(`dndCheckBtn-${qi}`).disabled = true;
    }
}

function lockDnD(qi) {
    dndState[qi].locked = true;
    document.getElementById(`dndCheckBtn-${qi}`).style.display = 'none';
    document.getElementById(`dndChoices-${qi}`).style.display = 'none';
    totalDoneCount++; addReviewButton(`dnd-badge-${qi}`, dndQuestions[qi].pembahasan, dndState[qi].correct);
    checkQuizComplete();
}

function isAnswerSimilar(u, c, k) {
    const cu = u.toLowerCase().replace(/[^\w\s]/g, '').trim();
    // Support multiple correct answer variations separated by '/'
    const validVariants = c.split('/').map(v => v.toLowerCase().replace(/[^\w\s]/g, '').trim());
    if (validVariants.some(v => cu === v)) return true;

    // Check if user's input contains any of the keywords
    if (k && k.some(kw => cu.includes(kw.toLowerCase()))) return true;
    return false;
}

// ─── LOCKING ──────────────────────────────────
function lockPG(qi) {
    pgState[qi].locked = true;
    document.querySelectorAll(`#q-opts-${qi} .q-opt`).forEach(b => b.disabled = true);
    if (document.getElementById(`check-multi-${qi}`)) document.getElementById(`check-multi-${qi}`).style.display = 'none';
    totalDoneCount++; addReviewButton(`q-badge-${qi}`, pgQuestions[qi].pembahasan, pgState[qi].correct);
    checkQuizComplete();
}

function lockIsian(qi) {
    isianState[qi].locked = true;
    document.getElementById(`isian-input-${qi}`).disabled = true;
    document.getElementById(`isian-check-${qi}`).style.display = 'none';
    totalDoneCount++; addReviewButton(`isian-badge-${qi}`, isianQuestions[qi].pembahasan, isianState[qi].correct);
    checkQuizComplete();
}

function addReviewButton(badgeId, html, isCorrect) {
    const badge = document.getElementById(badgeId);
    if (!badge || badge.parentElement.querySelector('.review-pembahasan-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'review-pembahasan-btn'; btn.innerHTML = '📖';
    btn.onclick = () => showPembahasan(html, isCorrect);
    badge.after(btn);
}

// ─── PEMBAHASAN SYSTEM ─────────────────────────
function showPembahasan(html, isCorrect) {
    const overlay = document.getElementById('pembahasanOverlay');
    const body = document.getElementById('pembahasanBody');
    const icon = document.getElementById('pembahasanIcon');
    const btn = document.getElementById('pembahasanCloseBtn');
    if (!overlay || !body) return;
    icon.textContent = isCorrect ? '🌟' : '📖';
    body.innerHTML = html;

    const video = body.querySelector('video');

    // Tidak ada video → tombol langsung aktif
    if (!video) {
        if (btn) { btn.disabled = false; btn.textContent = 'Saya Paham! 👍'; btn.style.opacity = '1'; btn.style.cursor = 'pointer'; }
        overlay.classList.add('visible');
        return;
    }

    // ─── Parse startTime & endTime dari src#t=start,end ───
    let startTime = 0, endTime = 99999;
    try {
        const raw = video.src || video.getAttribute('src') || '';
        const frag = raw.includes('#t=') ? raw.split('#t=')[1] : '';
        if (frag) {
            const parts = frag.split(',');
            startTime = parseFloat(parts[0]) || 0;
            if (parts[1]) endTime = parseFloat(parts[1]);
        }
    } catch (e) { }

    // ─── State bersama ───
    let unlocked = false;
    let maxReached = startTime;

    function lockBtn() {
        unlocked = false;
        maxReached = startTime;
        if (!btn) return;
        btn.disabled = true;
        btn.textContent = 'Menunggu video... ⏳';
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
    }

    function unlockBtn() {
        if (unlocked) return;
        unlocked = true;
        video.pause();
        if (!btn) return;
        btn.disabled = false;
        btn.textContent = 'Saya Paham! 👍';
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    }

    // Kunci tombol di awal
    lockBtn();

    // ─── Inject tombol Suara + Ulang di bawah video ───
    const muteWrap = document.createElement('div');
    muteWrap.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:10px;';

    const muteBtn = document.createElement('button');
    muteBtn.textContent = '🔊 Suara Aktif';
    muteBtn.style.cssText = 'padding:6px 14px;border:none;border-radius:20px;background:#4CAF50;color:#fff;font-size:13px;cursor:pointer;font-family:inherit;';
    muteBtn.onclick = () => {
        video.muted = !video.muted;
        muteBtn.textContent = video.muted ? '🔇 Suara Mati' : '🔊 Suara Aktif';
        muteBtn.style.background = video.muted ? '#999' : '#4CAF50';
    };

    const replayBtn = document.createElement('button');
    replayBtn.textContent = '🔁 Ulang Video';
    replayBtn.style.cssText = 'padding:6px 14px;border:none;border-radius:20px;background:#2196F3;color:#fff;font-size:13px;cursor:pointer;font-family:inherit;';
    replayBtn.onclick = () => {
        lockBtn();                     // reset state & kunci tombol Saya Paham
        video.currentTime = startTime; // kembali ke detik awal segmen masing-masing
        video.play();
    };

    muteWrap.appendChild(muteBtn);
    muteWrap.appendChild(replayBtn);
    video.insertAdjacentElement('afterend', muteWrap);

    // ─── Event listeners ───
    video.addEventListener('loadedmetadata', function () {
        if (video.currentTime < startTime) video.currentTime = startTime;
    }, { once: true });

    video.addEventListener('timeupdate', function () {
        const t = video.currentTime;
        if (t >= endTime) { unlockBtn(); return; }
        if (t > maxReached + 3) { video.currentTime = maxReached; return; }
        if (t > maxReached) maxReached = t;
    });

    video.addEventListener('seeking', function () {
        if (!unlocked && video.currentTime > maxReached + 0.3) {
            video.currentTime = maxReached;
        }
    });

    video.addEventListener('ended', unlockBtn);
    video.addEventListener('error', unlockBtn);

    overlay.classList.add('visible');
}

function hidePembahasan() {
    const overlay = document.getElementById('pembahasanOverlay');
    if (overlay) overlay.classList.remove('visible');
    // Clear the body after a short delay so any playing video stops
    setTimeout(() => {
        const body = document.getElementById('pembahasanBody');
        if (body) body.innerHTML = '';
    }, 300);
}

function showTryAgain() {
    const overlay = document.getElementById('tryAgainOverlay');
    if (!overlay) return;
    overlay.classList.add('visible');
    setTimeout(() => { overlay.classList.remove('visible'); }, 1500);
}

function checkQuizComplete() {
    const total = pgQuestions.length + isianQuestions.length + essayQuestions.length + dndQuestions.length;
    if (totalDoneCount >= total) {
        if (window.SFX) window.SFX.complete();
        const comp = document.getElementById('quizCompletion');
        if (comp) { comp.classList.add('show'); setTimeout(() => comp.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200); }
    }
}

function initQuiz() {
    totalDoneCount = 0;
    pgState.forEach(s => { s.attempts = 0; s.locked = false; s.correct = false; if (Array.isArray(s.selected)) s.selected = []; });
    isianState.forEach(s => { s.attempts = 0; s.locked = false; s.correct = false; s.points = 0; });
    essayState.forEach(s => { s.locked = false; s.points = 0; s.correct = false; });
    dndState.forEach(s => { s.locked = false; s.correct = false; s.attempts = 0; s.answers = { gap0: null, gap1: null }; });
    renderQuiz();
    if (document.getElementById('quizCompletion')) document.getElementById('quizCompletion').classList.remove('show');
}

let quizInitialized = false;
document.addEventListener('DOMContentLoaded', () => {
    const _orig = window.autoPlaySlide;
    window.autoPlaySlide = function (slide) {
        if (typeof _orig === 'function') _orig(slide);
        if (slide === 7 && !quizInitialized) { initQuiz(); quizInitialized = true; }
    };
});

function calcScore() {
    let s = 0;
    pgState.forEach(st => { if (st.correct) s++; });
    isianState.forEach(st => { s += (st.points || 0); });
    dndState.forEach(st => { if (st.correct) s++; });
    const totalMax = pgQuestions.length + (isianQuestions.length * 2) + dndQuestions.length;
    return Math.round((s / totalMax) * 100);
}

function submitToGForm() {
    const name = document.getElementById('sfName').value.trim();
    const kelas = document.getElementById('sfClass').value;
    const feel = document.getElementById('sfFeel').value;
    if (!name || !kelas || !feel) { alert('Harap lengkapi semua data ya! 😊'); return; }

    const skor = calcScore().toString();
    const btn = document.getElementById('sfSubmitBtn');
    btn.disabled = true; btn.textContent = 'Mengirim... ⏳';
    if (window.SFX) window.SFX.click();

    const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfkotMLIO0Xzrch2ZbCcvPkLa3fUHS1Bumg0X0knwC5PnPuTQ/formResponse';
    const body = new URLSearchParams();
    body.append('entry.186291399', name);
    body.append('entry.578832626', kelas);
    body.append('entry.1048626229', skor);
    body.append('entry.222567438', feel);

    fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body: body })
        .then(() => {
            document.getElementById('submitForm').style.display = 'none';
            const succ = document.getElementById('sfSuccess');
            document.getElementById('sfSuccessMsg').innerHTML = `Kerja bagus, ${name}! 👍 Skor kamu: ${skor}`;
            succ.classList.add('show');
            const ytWrap = document.getElementById('ytCompletionWrap');
            if (ytWrap) ytWrap.style.display = 'block';
            if (typeof playYT === 'function') playYT('yt-completion');
            if (typeof videoReady !== 'undefined') { videoReady[7] = true; if (typeof updateNavButtons === 'function') updateNavButtons(); }
        })
        .catch(() => { btn.disabled = false; btn.textContent = 'Kirim Nilai ke Guru 🚀'; alert('Ups! Ada masalah saat mengirim.'); });
}

// ─── SECTION III: FILL-IN-THE-BLANK (ISIAN SINGKAT) ───
const section3Questions = [
    {
        q: "Tujuan penulis menulis teks tersebut adalah untuk menceritakan kegiatan Sinta ___________ ibu.",
        kj_utama: "membantu",
        opsi_lain: ["menolong", "membantu ibunya", "menolong ibunya", "meringankan pekerjaan ibu", "membantu pekerjaan ibu"],
        pembahasan: "Teks tersebut menceritakan Sinta yang membantu ibunya di rumah."
    },
    {
        q: "Kata “apel” pada kalimat “Pagi ini ada apel di lapangan” berarti ___________________________.",
        kj_utama: "upacara",
        opsi_lain: ["kegiatan berkumpul", "kegiatan baris-berbaris", "apel pagi", "berkumpul di lapangan"],
        pembahasan: "Kata “apel” pada kalimat tersebut bukan berarti buah, tetapi kegiatan berkumpul di lapangan."
    },
    {
        q: "Kata “kepala” pada kalimat “Kepala sekolah memberi pengumuman” berarti _________________.",
        kj_utama: "pemimpin",
        opsi_lain: ["pimpinan", "ketua", "orang yang memimpin", "pemimpin sekolah"],
        pembahasan: "Kepala sekolah berarti pemimpin di sekolah."
    },
    {
        q: "Huruf kecil yang ditulis hingga melewati garis bawah adalah ____, ____, ____, ____, dan ______.",
        kj_utama: "g, j, p, q, dan y",
        opsi_lain: ["g j p q y", "g,j,p,q,y", "gjpqy", "g, j, p, q, y"],
        pembahasan: "Huruf g, j, p, q, dan y memiliki bagian yang turun melewati garis bawah."
    },
    {
        q: "Dalam menulis huruf tegak bersambung, huruf harus saling ______________________________.",
        kj_utama: "tersambung",
        opsi_lain: ["menyambung", "bersambung", "terhubung"],
        pembahasan: "Huruf tegak bersambung ditulis dengan huruf yang saling tersambung."
    }
];

// Mutate isianQuestions and isianState so all existing functions (calcScore, checkQuizComplete, totalDoneCount) track them correctly
section3Questions.forEach((q, idx) => {
    if (isianQuestions.length < section3Questions.length) {
        isianQuestions.push(q);
        isianState.push({ attempts: 0, locked: false, correct: false, points: 0 });
    }
});

const section4Questions = [
    {
        number: "21",
        q: "Tuliskan pesan yang ingin disampaikan penulis dari cerita tersebut!",
        mainAnswer: "Membantu orang tua adalah perbuatan baik.",
        alternativeAnswers: [
            "Kita harus rajin membantu orang tua.",
            "Membantu ibu adalah sikap yang baik.",
            "Anak harus membantu pekerjaan orang tua.",
            "Kita sebaiknya meringankan pekerjaan ibu.",
            "Rajin membantu membuat orang tua bangga."
        ],
        keywords3: ["membantu", "orang tua", "baik"],
        keywords2: ["membantu", "ibu", "bangga", "meringankan"],
        pembahasan: "Cerita tersebut menyampaikan pesan bahwa membantu orang tua merupakan perbuatan baik dan membuat orang tua bangga."
    },
    {
        number: "22",
        q: "Jelaskan arti kata “bisa” pada kalimat “Saya bisa mengerjakan tugas ini”!",
        mainAnswer: "mampu",
        alternativeAnswers: [
            "dapat",
            "sanggup",
            "bisa melakukan",
            "mampu mengerjakan",
            "dapat mengerjakan"
        ],
        keywords3: ["mampu"],
        keywords2: ["dapat", "sanggup"],
        pembahasan: "Kata “bisa” pada kalimat tersebut berarti mampu atau dapat melakukan sesuatu."
    },
    {
        number: "23A",
        q: "Buatlah satu kalimat lengkap menggunakan kata “mata”!",
        mainAnswer: "Hana menutup mata saat berdoa.",
        alternativeAnswers: [
            "Hana menutup mata saat berdoa.",
            "Syifa mendapat nilai bagus pada mata pelajaran Bahasa Indonesia.",
            "Indri kesulitan memasukkan benang ke mata jarum.",
            "Hasbi melihat mata air yang jernih di kaki bukit.",
            "Adit berhati-hati saat melihat mata pisau yang tajam.",
            "Afifa memakai kalung dengan mata kecil berbentuk bunga.",
            "Zia belajar tentang delapan mata angin di kelas."
        ],
        keywords3: ["mata"],
        keywords2: ["mata"],
        pembahasan: "Kata “mata” memiliki beberapa makna, misalnya alat untuk melihat, mata pelajaran, mata jarum, mata air, mata pisau, mata kalung, dan mata angin. Contoh kalimat: 1. Hana menutup mata saat berdoa. 2. Zia belajar tentang delapan mata angin di kelas."
    },
    {
        number: "23B",
        q: "Buatlah satu kalimat lengkap menggunakan kata “tangan”!",
        mainAnswer: "Alika mengangkat tangan sebelum menjawab pertanyaan.",
        alternativeAnswers: [
            "Alika mengangkat tangan sebelum menjawab pertanyaan.",
            "Fahira memberikan uluran tangan kepada teman yang jatuh.",
            "Keberhasilan kegiatan kelas berada di tangan semua siswa.",
            "Hana memegang tangan pintu lalu membukanya perlahan.",
            "Bu Guru membutuhkan banyak tangan untuk menghias kelas.",
            "Indri memiliki tulisan tangan yang rapi dan mudah dibaca.",
            "Buku hadiah itu sampai ke tangan Hasbi melalui Adit."
        ],
        keywords3: ["tangan"],
        keywords2: ["tangan"],
        pembahasan: "Kata “tangan” memiliki beberapa makna, misalnya anggota tubuh, bantuan, kekuasaan atau kendali, pegangan pada benda, orang yang membantu bekerja, tulisan seseorang, dan pihak atau perantara. Contoh kalimat: 1. Alika mengangkat tangan sebelum menjawab pertanyaan. 2. Indri memiliki tulisan tangan yang rapi dan mudah dibaca."
    },
    {
        number: "24",
        q: "Sebutkan lima huruf kecil yang ditulis hingga melewati garis bawah dalam huruf tegak bersambung!",
        mainAnswer: "g, j, p, q, dan y",
        alternativeAnswers: [
            "g j p q y",
            "g,j,p,q,y",
            "gjpqy",
            "g, j, p, q, y"
        ],
        keywords3: ["g", "j", "p", "q", "y"],
        keywords2: ["g", "j", "p", "q", "y"],
        pembahasan: "Huruf g, j, p, q, dan y memiliki bagian yang turun hingga melewati garis bawah."
    },
    {
        number: "25",
        q: "Jelaskan kriteria penulisan huruf tegak bersambung yang baik!",
        mainAnswer: "Huruf tegak bersambung yang baik ditulis rapi, jelas dibaca, proporsional, huruf tersambung dengan baik, kemiringan tulisan konsisten, mengikuti garis tulisan, bersih, dan tidak banyak coretan.",
        alternativeAnswers: [
            "Tulisan harus rapi, bersambung, and sesuai garis.",
            "Huruf harus saling tersambung and mudah dibaca.",
            "Penulisan harus rapi, ukuran huruf sesuai, and mengikuti garis.",
            "Huruf kapital dan huruf kecil ditulis sesuai aturan garis.",
            "Tulisan tegak bersambung harus rapi, jelas, and tidak keluar aturan garis."
        ],
        keywords3: ["rapi", "tersambung", "garis", "jelas"],
        keywords2: ["rapi", "tersambung", "garis", "jelas"],
        pembahasan: "Huruf tegak bersambung yang baik harus rapi, mudah dibaca, proporsional, tersambung dengan baik, kemiringannya konsisten, mengikuti garis tulisan, bersih, dan tidak banyak coretan."
    }
];

section4Questions.forEach((q) => {
    if (essayQuestions.length < section4Questions.length) {
        essayQuestions.push(q);
        essayState.push({ locked: false, points: 0, correct: false, attempts: 0 });
    }
});

function normalizeAnswer(str) {
    if (!str) return "";
    return str
        .toLowerCase()
        .replace(/\bdan\b/g, "")
        .replace(/[^a-z0-9]/g, "")
        .trim();
}

function renderSection3() {
    const container = document.getElementById("section3Container");
    if (!container) return;

    container.style.display = "block";

    // Reset container and add title
    container.innerHTML = `<div class="section-title" style="font-family: 'Fredoka One', cursive; font-size: clamp(1.2rem, 3vw, 1.6rem); margin-top: 30px; margin-bottom: 20px; color: var(--primary); text-align: center;">--- Section III: Isian Singkat ---</div>`;

    isianQuestions.forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = 'pg-card isian-card';
        card.id = `section3-card-${idx}`;

        const currentBadgeNum = pgQuestions.length + idx + 1;

        card.innerHTML = `
            <div class="q-header">
                <span class="q-num-badge" id="section3-badge-${idx}">${currentBadgeNum}</span>
                <div class="q-text" id="section3-qtext-${idx}">${q.q}</div>
            </div>
            <div class="isian-input-wrap" style="margin-top: 15px; display: flex; gap: 10px;">
                <input type="text" class="isian-input" id="section3-input-${idx}" placeholder="Ketik jawaban..." autocomplete="off">
                <button class="isian-check-btn" id="section3-check-${idx}" style="height: auto;">Cek ✓</button>
            </div>
            <div class="q-feedback" id="section3-fb-${idx}" style="margin-top: 15px;"></div>
        `;

        container.appendChild(card);

        const inputEl = document.getElementById(`section3-input-${idx}`);
        const checkEl = document.getElementById(`section3-check-${idx}`);

        checkEl.addEventListener("click", () => submitSection3Answer(idx));
        inputEl.addEventListener("keypress", (e) => {
            if (e.key === "Enter") submitSection3Answer(idx);
        });
    });
}

function submitSection3Answer(idx) {
    const q = isianQuestions[idx];
    const state = isianState[idx];
    if (state.locked) return;

    const inputEl = document.getElementById(`section3-input-${idx}`);
    const checkEl = document.getElementById(`section3-check-${idx}`);
    const fbEl = document.getElementById(`section3-fb-${idx}`);

    const userVal = inputEl.value.trim();
    if (!userVal) return;

    state.attempts++;

    let isCorrect = false;
    if (idx === 3) {
        // Special validation for question 4 (letters g, j, p, q, y in any order)
        const sortedUser = userVal.toLowerCase().replace(/\bdan\b/g, "").replace(/[^a-z]/g, "").split("").sort().join("");
        isCorrect = (sortedUser === "gjpqy");
    } else {
        const normUser = normalizeAnswer(userVal);
        const normMain = normalizeAnswer(q.kj_utama);

        isCorrect = (normUser === normMain);
        if (!isCorrect && q.opsi_lain) {
            for (let alt of q.opsi_lain) {
                if (normUser === normalizeAnswer(alt)) {
                    isCorrect = true;
                    break;
                }
            }
        }
    }

    if (isCorrect) {
        state.correct = true;
        state.locked = true;
        state.points = 2; // Full score (2 points)
        totalDoneCount++;

        if (window.SFX) window.SFX.correct();
        inputEl.classList.add("input-correct");
        inputEl.disabled = true;
        checkEl.style.display = "none";

        fbEl.className = "q-feedback fb-correct";
        fbEl.innerHTML = `
            <div style="font-weight: 800; font-size: 1.1rem; margin-bottom: 5px;">Benar! 🎉</div>
            <div style="font-size: 0.95rem; font-weight: 700; background: rgba(255, 255, 255, 0.7); padding: 10px; border-radius: 8px; margin-top: 8px; border-left: 5px solid #22c55e;">
                <strong>Pembahasan:</strong> ${q.pembahasan}
            </div>
        `;
        fbEl.style.display = "block";

        checkQuizComplete();
    } else {
        if (state.attempts === 1) {
            if (window.SFX) window.SFX.wrong();
            inputEl.classList.add("input-wrong");
            fbEl.className = "q-feedback fb-wrong";
            fbEl.innerHTML = `<div style="font-weight: 800;">Kurang tepat. Coba sekali lagi! 🧐</div>`;
            fbEl.style.display = "block";
            showTryAgain();
            setTimeout(() => {
                inputEl.classList.remove("input-wrong");
            }, 1500);
        } else {
            state.correct = false;
            state.locked = true;
            state.points = 0;
            totalDoneCount++;

            if (window.SFX) window.SFX.wrong();
            inputEl.classList.add("input-wrong");
            inputEl.disabled = true;
            checkEl.style.display = "none";

            fbEl.className = "q-feedback fb-wrong";
            fbEl.innerHTML = `
                <div style="font-weight: 800; font-size: 1.1rem; margin-bottom: 5px;">Kurang tepat. Jawaban yang benar: <strong>${q.kj_utama}</strong></div>
                <div style="font-size: 0.95rem; font-weight: 700; background: rgba(255, 255, 255, 0.7); padding: 10px; border-radius: 8px; margin-top: 8px; border-left: 5px solid #ef4444;">
                    <strong>Pembahasan:</strong> ${q.pembahasan}
                </div>
            `;
            fbEl.style.display = "block";

            checkQuizComplete();
        }
    }
}

// Wrap initQuiz to automatically reset/render Section III
const originalInitQuiz = window.initQuiz || initQuiz;
window.initQuiz = function () {
    originalInitQuiz();
    essayState.forEach(s => { s.attempts = 0; });
    renderSection3();
    const sec4 = document.getElementById("section4Container");
    if (sec4) sec4.style.display = "block";
};

// Override calcScore to include Section IV Essay scoring correctly
function calcScore() {
    let s = 0;
    pgState.forEach(st => { if (st.correct) s++; });
    isianState.forEach(st => { s += (st.points || 0); });
    essayState.forEach(st => { s += (st.points || 0); });
    dndState.forEach(st => { if (st.correct) s++; });
    const totalMax = pgQuestions.length + (isianQuestions.length * 2) + (essayQuestions.length * 3) + dndQuestions.length;
    return Math.round((s / totalMax) * 100);
}

// Also make sure we render Section III and IV initially when the quiz loads
if (typeof quizInitialized !== 'undefined' && quizInitialized) {
    renderSection3();
    const sec4 = document.getElementById("section4Container");
    if (sec4) sec4.style.display = "block";
}
