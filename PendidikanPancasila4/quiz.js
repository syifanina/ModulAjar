/* =============================================
   PENDIDIKAN PANCASILA — quiz.js
   Slide 7: PG (1-15) + Isian (1-5) + Essay (1-5) + DnD (1-5)
   ============================================= */

// ─── DATA ─────────────────────────────────────
const pgQuestions = [
    {
        q: "NKRI adalah singkatan dari …",
        opts: ["Negara Kesatuan Republik Indonesia", "Negara Kesatuan Rakyat Indonesia", "Negara Kepulauan Republik Indonesia", "Negara Kedaulatan Republik Indonesia"],
        ans: 0,
        pembahasan: "NKRI adalah singkatan dari <b>Negara Kesatuan Republik Indonesia</b>. Artinya, Indonesia adalah negara yang bersatu dari berbagai daerah, suku, budaya, dan agama."
    },
    {
        q: "Salah satu cara menjaga keutuhan NKRI adalah …",
        opts: ["Bertengkar dengan teman", "Mengejek budaya daerah lain", "Menghargai perbedaan", "Memaksakan kehendak"],
        ans: 2,
        pembahasan: "Menjaga keutuhan NKRI dapat dilakukan dengan <b>menghargai perbedaan</b>. Walaupun berbeda suku, agama, budaya, atau pendapat, kita harus tetap hidup rukun."
    },
    {
        q: "Di sekolah, ada teman yang tidak mau bekerja sama karena berbeda suku. Sikap yang tepat adalah …",
        opts: ["Membiarkannya", "Ikut tidak bekerja sama", "Menjauhinya", "Mengajak kerja sama dan hargai perbedaan"],
        ans: 3,
        pembahasan: "Perbedaan suku tidak boleh menjadi alasan untuk tidak bekerja sama. Sikap yang tepat adalah tetap mengajak teman bekerja sama dan saling menghargai."
    },
    {
        q: "Indonesia memiliki banyak budaya. Jika kita tidak saling menghargai, maka yang akan terjadi adalah …",
        opts: ["Persatuan semakin kuat", "Kehidupan menjadi damai", "Terjadi perpecahan", "Semakin banyak kerja sama"],
        ans: 2,
        pembahasan: "Jika masyarakat tidak saling menghargai, orang-orang bisa mudah bertengkar. Hal ini dapat menyebabkan <b>perpecahan</b> dan mengganggu persatuan."
    },
    {
        q: "Sikap cinta tanah air dapat ditunjukkan dengan …",
        opts: ["Tidak mau belajar", "Merusak fasilitas umum", "Mengikuti upacara bendera dengan khidmat", "Bermalas-malasan"],
        ans: 2,
        pembahasan: "Cinta tanah air dapat ditunjukkan dengan sikap yang baik, seperti mengikuti upacara bendera dengan khidmat, belajar sungguh-sungguh, dan menjaga persatuan."
    },
    {
        q: "Mengikuti upacara bendera dengan tertib merupakan contoh …",
        opts: ["Kegiatan biasa", "Kewajiban orang tua", "Sikap menjaga persatuan", "Permainan sekolah"],
        ans: 2,
        pembahasan: "Mengikuti upacara bendera dengan tertib menunjukkan rasa cinta dan hormat kepada bangsa Indonesia. Sikap ini termasuk contoh menjaga persatuan."
    },
    {
        q: "Semboyan bangsa Indonesia yang mencerminkan persatuan adalah …",
        opts: ["Tut Wuri Handayani", "Ing Ngarsa Sung Tuladha", "Bhinneka Tunggal Ika", "Sekali Merdeka Tetap Merdeka"],
        ans: 2,
        pembahasan: "Semboyan bangsa Indonesia adalah <b>Bhinneka Tunggal Ika</b>, yang berarti berbeda-beda tetapi tetap satu. Semboyan ini mengajarkan kita untuk tetap bersatu dalam perbedaan."
    },
    {
        q: "Jika masyarakat tidak menjaga persatuan, dampak yang paling mungkin terjadi adalah …",
        opts: ["Kehidupan menjadi rukun", "Kerja sama meningkat", "Terjadi perpecahan", "Negara semakin kuat"],
        ans: 2,
        pembahasan: "Jika persatuan tidak dijaga, masyarakat bisa mudah bertengkar dan sulit bekerja sama. Dampaknya adalah <b>terjadi perpecahan</b>."
    },
    {
        q: "Mengikuti kerja bakti di lingkungan merupakan contoh …",
        opts: ["Kegiatan biasa", "Kewajiban orang tua", "Sikap menjaga persatuan", "Kegiatan bermain"],
        ans: 2,
        pembahasan: "Kerja bakti menunjukkan sikap gotong royong dan peduli terhadap lingkungan. Kegiatan ini dapat mempererat hubungan antarwarga dan menjaga persatuan."
    },
    {
        q: "Menciptakan persatuan dan kesatuan merupakan perilaku yang sesuai dengan Pancasila, tepatnya sila ke ….",
        opts: ["1", "2", "3", "4"],
        ans: 2,
        pembahasan: "Menciptakan persatuan dan kesatuan sesuai dengan <b>Pancasila sila ke-3</b>, yaitu <b>Persatuan Indonesia</b>. Sila ini mengajarkan kita untuk menjaga kerukunan dan keutuhan bangsa."
    }
];

const isianQuestions = [
    {
        q: "Jika masyarakat tidak saling menghargai, maka persatuan bangsa akan ______________.",
        kj_utama: "terpecah belah",
        opsi_lain: ["melemah", "terganggu", "rusak", "hilang", "tidak terjaga"],
        keywords: ["terpecah", "belah", "lemah", "ganggu", "rusak", "hilang", "jaga"],
        pembahasan: "<video src='Video_Pancasila_4.mp4#t=0,14.1' autoplay playsinline style='width: 100%; aspect-ratio: 1/1; border-radius: 12px; margin-bottom: 10px; object-fit: cover;'></video><br>Jika masyarakat tidak saling menghargai, maka persatuan bangsa akan <b>terpecah belah</b>."
    },
    {
        q: "Gotong royong dapat memperkuat __________________________ bangsa.",
        kj_utama: "persatuan dan kesatuan",
        opsi_lain: ["persatuan", "kesatuan", "kebersamaan", "persaudaraan", "kerukunan"],
        keywords: ["satu", "sama", "saudara", "rukun"],
        pembahasan: "<video src='Video_Pancasila_4.mp4#t=14.23,26.45' autoplay playsinline style='width: 100%; aspect-ratio: 1/1; border-radius: 12px; margin-bottom: 10px; object-fit: cover;'></video><br>Gotong royong dapat memperkuat <b>persatuan dan kesatuan</b> bangsa."
    },
    {
        q: "Jika terjadi perbedaan pendapat, sebaiknya diselesaikan dengan ____________________.",
        kj_utama: "musyawarah",
        opsi_lain: ["berdiskusi", "diskusi bersama", "berbicara baik-baik", "musyawarah mufakat", "mufakat"],
        keywords: ["musyawarah", "diskusi", "bicara", "mufakat"],
        pembahasan: "<video src='Video_Pancasila_4.mp4#t=26.93,40.3' autoplay playsinline style='width: 100%; aspect-ratio: 1/1; border-radius: 12px; margin-bottom: 10px; object-fit: cover;'></video><br>Jika terjadi perbedaan pendapat, sebaiknya diselesaikan dengan <b>musyawarah</b> untuk mencapai mufakat."
    },
    {
        q: "Sikap saling membantu disebut juga __________________________________.",
        kj_utama: "gotong royong",
        opsi_lain: ["tolong-menolong", "saling menolong", "kerja sama", "membantu sesama", "saling membantu"],
        keywords: ["gotong", "royong", "tolong", "kerja", "bantu"],
        pembahasan: "<video src='Video_Pancasila_4.mp4#t=40.67,55.3' autoplay playsinline style='width: 100%; aspect-ratio: 1/1; border-radius: 12px; margin-bottom: 10px; object-fit: cover;'></video><br>Sikap saling membantu disebut juga <b>gotong royong</b> atau tolong-menolong."
    },
    {
        q: "Perbedaan tidak boleh menjadi alasan untuk __________________________.",
        kj_utama: "bertengkar / bermusuhan / saling mengejek",
        opsi_lain: ["berkelahi", "saling membenci", "menjauhi teman", "memecah belah", "tidak bekerja sama", "menghina orang lain", "merendahkan orang lain"],
        keywords: ["tengkar", "musuh", "ejek", "kelahi", "benci", "jauh", "pecah", "hina", "rendah"],
        pembahasan: "<video src='Video_Pancasila_4.mp4#t=55.67,67.43' autoplay playsinline style='width: 100%; aspect-ratio: 1/1; border-radius: 12px; margin-bottom: 10px; object-fit: cover;'></video><br>Perbedaan tidak boleh menjadi alasan untuk <b>bertengkar</b> atau bermusuhan."
    },
    {
        q: "Kerja sama dalam keberagaman dapat membuat pekerjaan menjadi lebih ______________.",
        kj_utama: "ringan / mudah",
        opsi_lain: ["cepat selesai", "lancar", "sederhana", "tidak berat"],
        keywords: ["ringan", "mudah", "cepat", "lancar", "sederhana", "berat"],
        pembahasan: "<video src='Video_Pancasila_4.mp4#t=68.53,83.5' autoplay playsinline style='width: 100%; aspect-ratio: 1/1; border-radius: 12px; margin-bottom: 10px; object-fit: cover;'></video><br>Kerja sama dalam keberagaman dapat membuat pekerjaan menjadi lebih <b>ringan</b> dan cepat selesai."
    },
    {
        q: "Menghargai perbedaan akan menciptakan suasana yang ________________.",
        kj_utama: "rukun",
        opsi_lain: ["damai", "harmonis", "nyaman", "tenteram", "aman", "tenang"],
        keywords: ["rukun", "damai", "harmonis", "nyaman", "tenteram", "aman", "tenang"],
        pembahasan: "<video src='Video_Pancasila_4.mp4#t=84,95.0' autoplay playsinline style='width: 100%; aspect-ratio: 1/1; border-radius: 12px; margin-bottom: 10px; object-fit: cover;'></video><br>Menghargai perbedaan akan menciptakan suasana yang <b>rukun</b> dan damai."
    },
    {
        q: "Menghormati perbedaan agama disebut sikap ______________________.",
        kj_utama: "toleransi",
        opsi_lain: ["toleran", "saling menghormati", "menghargai perbedaan", "menghormati keyakinan orang lain", "menghargai agama lain"],
        keywords: ["toleran", "hormat", "hargai", "yakin", "agama"],
        pembahasan: "<video src='Video_Pancasila_4.mp4#t=95.5,107.0' autoplay playsinline style='width: 100%; aspect-ratio: 1/1; border-radius: 12px; margin-bottom: 10px; object-fit: cover;'></video><br>Menghormati perbedaan agama disebut sikap <b>toleransi</b>."
    },
    {
        q: "Cinta tanah air merupakan bentuk menjaga keutuhan ____________________.",
        kj_utama: "Negara Kesatuan Republik Indonesia",
        opsi_lain: ["NKRI", "Indonesia", "negara", "bangsa", "tanah air"],
        keywords: ["nkri", "indonesia", "negara", "bangsa", "republik", "tanah", "air"],
        pembahasan: "<video src='Video_Pancasila_4.mp4#t=108.57,120.0' autoplay playsinline style='width: 100%; aspect-ratio: 1/1; border-radius: 12px; margin-bottom: 10px; object-fit: cover;'></video><br>Cinta tanah air merupakan bentuk menjaga keutuhan <b>NKRI (Negara Kesatuan Republik Indonesia)</b>."
    },
    {
        q: "Jika tidak ada persatuan, maka kehidupan masyarakat akan menjadi ______________.",
        kj_utama: "tidak rukun / terpecah belah",
        opsi_lain: ["kacau", "tidak damai", "penuh konflik", "bermusuhan", "tidak harmonis", "sulit bekerja sama"],
        keywords: ["tidak rukun", "pecah", "belah", "kacau", "tidak damai", "konflik", "musuh", "harmonis", "sulit"],
        pembahasan: "<video src='Video_Pancasila_4.mp4#t=120.47,137.0' autoplay playsinline style='width: 100%; aspect-ratio: 1/1; border-radius: 12px; margin-bottom: 10px; object-fit: cover;'></video><br>Jika tidak ada persatuan, maka kehidupan masyarakat akan menjadi <b>tidak rukun</b> atau <b>terpecah belah</b>."
    }
];

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
        card.innerHTML = `<div class="q-header"><span class="q-num-badge" id="essay-badge-${qi}">${pgQuestions.length + isianQuestions.length + qi + 1}</span><div class="q-text">${q.q}</div></div><div class="essay-input-wrap"><textarea class="essay-input" id="essay-input-${qi}" placeholder="Tuliskan jawaban lengkapmu di sini..." rows="3"></textarea><button class="essay-check-btn" id="essay-check-${qi}" onclick="checkEssayAnswer(${qi})">Kirim Jawaban ✓</button></div><div class="q-feedback" id="essay-fb-${qi}"></div>`;
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

function checkEssayAnswer(qi) {
    const state = essayState[qi]; if (state.locked) return;
    const q = essayQuestions[qi]; const input = document.getElementById(`essay-input-${qi}`);
    const userVal = input.value.trim(); if (!userVal) return;
    state.locked = true; state.correct = true;
    const fb = document.getElementById(`essay-fb-${qi}`);
    fb.className = 'q-feedback fb-essay-done';
    fb.innerHTML = `<div class="essay-success-msg">✅ Jawaban terkirim!</div><div class="essay-kj-box"><div class="essay-kj-title">📖 Kunci Jawaban:</div><div class="essay-kj-content">${q.kj}</div></div>`;
    input.disabled = true; document.getElementById(`essay-check-${qi}`).style.display = 'none';
    totalDoneCount++; checkQuizComplete();
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

    const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScQ4oVW9ZI12oIZanQ9IUGhyZbz4sl9ZAGfQMqJReA0YlmEFw/formResponse';
    const body = new URLSearchParams();
    body.append('entry.519005274', name);
    body.append('entry.2132608900', kelas);
    body.append('entry.512228304', skor);
    body.append('entry.2076247247', feel);

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
