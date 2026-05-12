/* =============================================
   PENDIDIKAN PANCASILA — quiz.js
   Slide 7: PG (1-15) + Isian (1-5) + Essay (1-5) + DnD (1-5)
   ============================================= */

// ─── DATA ─────────────────────────────────────
const pgQuestions = [
    {
        q: "Perhatikan teks berikut!<br><br>Tradisi memindahkan rumah secara bersama-sama masih dilakukan oleh masyarakat di Sulawesi. Kegiatan ini dilakukan dengan kerja sama tanpa imbalan.<br><br>Makna utama dari tradisi tersebut adalah …",
        opts: ["Mencari keuntungan pribadi", "Gotong royong dalam kehidupan sosial", "Perlombaan antar warga", "Kegiatan hiburan masyarakat"],
        ans: 1,
        pembahasan: "Tradisi memindahkan rumah secara gotong-royong (seperti Mappalette Bola di Sulawesi) mencerminkan nilai kebersamaan dan kerukunan masyarakat tanpa mengharapkan imbalan materi."
    },
    {
        q: "Perhatikan gambar berikut!<br><img src='assets/ondel_ondel.png' class='q-img'><br>Kesenian pada gambar berasal dari daerah …",
        opts: ["Jawa Barat", "DKI Jakarta", "Bali", "Papua"],
        ans: 1,
        pembahasan: "Ondel-ondel adalah kesenian khas Betawi (DKI Jakarta). Boneka besar ini sering ditampilkan dalam berbagai perayaan adat atau festival untuk memeriahkan suasana."
    },
    {
        q: "Tradisi yang membatasi pengambilan hasil laut dalam waktu tertentu bertujuan untuk …",
        opts: ["Mempercepat panen", "Menjaga keseimbangan alam", "Mengurangi pekerjaan nelayan", "Menambah jumlah wisatawan"],
        ans: 1,
        pembahasan: "Tradisi seperti Sasi di Maluku atau Panglima Laot di Aceh bertujuan agar ekosistem laut tetap terjaga, memberi waktu bagi ikan untuk berkembang biak, sehingga alam tetap seimbang."
    },
    {
        q: "Sistem pengairan tradisional di Bali mengajarkan tentang …",
        opts: ["Persaingan antar petani", "Pembagian air secara adil", "Penggunaan mesin modern", "Kepemilikan individu"],
        ans: 1,
        pembahasan: "Sistem Subak di Bali adalah organisasi tradisional yang mengatur pembagian air irigasi secara adil dan merata bagi seluruh petani, menekankan nilai kebersamaan dan keadilan."
    },
    {
        q: "Upacara adat yang tetap dilakukan meskipun membutuhkan biaya besar menunjukkan …",
        opts: ["Gaya hidup boros", "Nilai penghormatan terhadap leluhur", "Persaingan ekonomi", "Tradisi yang tidak penting"],
        ans: 1,
        pembahasan: "Banyak upacara adat dilakukan sebagai bentuk penghormatan tertinggi kepada leluhur dan cara masyarakat menjaga identitas serta nilai-nilai budaya yang diwariskan turun-temurun."
    },
    {
        q: "Manakah kegiatan yang menunjukkan pelestarian budaya?",
        opts: ["Menghapus bahasa daerah", "Mengajarkan tarian tradisional", "Meniru budaya luar sepenuhnya", "Menghindari budaya sendiri"],
        ans: 1,
        pembahasan: "Mengajarkan tarian tradisional kepada generasi muda adalah salah satu cara nyata untuk menjaga agar budaya bangsa tidak punah dan tetap dikenal oleh anak cucu kita."
    },
    {
        q: "Perhatikan Gambar!<br><img src='assets/rumah_tongkonan.png' class='q-img'><br>Fungsi utama bentuk rumah tersebut adalah …",
        opts: ["Hiasan saja", "Menyesuaikan kondisi alam", "Tempat wisata", "Simbol kekayaan"],
        ans: 1,
        pembahasan: "Rumah Tongkonan dari Toraja memiliki atap melengkung yang tinggi serta panggung untuk menyesuaikan dengan kondisi alam pegunungan dan melindungi diri dari gangguan hewan liar atau cuaca."
    },
    {
        q: "Sikap terbaik dalam menghadapi keberagaman budaya adalah …",
        opts: ["Membandingkan budaya", "Menghargai perbedaan", "Menolak budaya lain", "Mengutamakan budaya sendiri"],
        ans: 1,
        pembahasan: "Menghargai perbedaan adalah kunci utama persatuan. Dengan menghormati budaya orang lain, kita menciptakan suasana yang harmonis dan damai di tengah keberagaman Indonesia."
    },
    {
        q: "Festival budaya dapat meningkatkan ekonomi karena …",
        opts: ["Mengurangi pengeluaran", "Menarik wisatawan", "Menghilangkan tradisi", "Membatasi perdagangan"],
        ans: 1,
        pembahasan: "Festival budaya menarik banyak wisatawan domestik maupun mancanegara, yang kemudian memberikan dampak positif bagi UMKM, penginapan, dan jasa transportasi di sekitar lokasi festival."
    },
    {
        q: "Nilai dalam kehidupan masyarakat Batak yang menekankan hubungan sosial disebut …",
        opts: ["Subak", "Sasi", "Dalihan Natolu", "Ngaben"],
        ans: 2,
        pembahasan: "Dalihan Natolu adalah filosofi hidup masyarakat Batak yang mengatur tata krama dan hubungan kekerabatan antara tiga kelompok sosial untuk menjaga keharmonisan dalam masyarakat."
    },
    {
        q: "<b>BERILAH TANDA PADA JAWABAN YANG TEPAT!</b><br><br>Contoh kearifan lokal dalam menjaga lingkungan adalah …",
        opts: ["Menanam pohon kembali", "Menebang hutan sembarangan", "Melarang berburu di waktu tertentu", "Mengatur sistem irigasi"],
        ans: [2, 3],
        multi: true,
        pembahasan: "Kearifan lokal berfokus pada tradisi atau aturan khas masyarakat daerah. Contohnya adalah larangan berburu di waktu tertentu (seperti Sasi di Maluku) dan sistem irigasi tradisional (seperti Subak di Bali). Menanam pohon adalah aksi pelestarian umum, bukan tradisi lokal yang spesifik."
    },
    {
        q: "<b>BERILAH TANDA PADA JAWABAN YANG TEPAT!</b><br><br>Cara menjaga persatuan melalui budaya adalah …",
        opts: ["Menghargai perbedaan", "Menghindari budaya lain", "Mengikuti festival budaya", "Belajar budaya daerah lain"],
        ans: [2, 3],
        multi: true,
        pembahasan: "Melalui budaya berarti menggunakan aktivitas budaya sebagai alat persatuan. Contohnya adalah mengikuti festival budaya dan belajar budaya daerah lain. Menghargai perbedaan adalah sikap sosial yang baik, namun bersifat umum dan tidak spesifik sebagai aktivitas budaya."
    },
    {
        q: "<b>BERILAH TANDA PADA JAWABAN YANG TEPAT!</b><br><br>Upaya melestarikan budaya di era modern adalah …",
        opts: ["Mendokumentasikan budaya", "Menghapus tradisi lama", "Menggunakan pakaian adat", "Mengajarkan budaya ke generasi muda"],
        ans: [0, 3],
        multi: true,
        pembahasan: "Pelestarian budaya di era modern fokus pada cara-cara yang relevan dan berkelanjutan saat ini, seperti mendokumentasikan budaya (digitalisasi) dan mengajarkan budaya ke generasi muda. Memakai pakaian adat adalah cara tradisional yang tetap baik, namun kurang menonjolkan konteks kemajuan zaman."
    },
    {
        q: "<b>BERILAH TANDA PADA JAWABAN YANG TEPAT!</b><br><br>Nilai yang terkandung dalam kearifan lokal adalah …",
        opts: ["Gotong royong", "Keserakahan", "Keharmonisan dengan alam", "Keberlanjutan"],
        ans: [0, 2],
        multi: true,
        pembahasan: "Kearifan lokal mengajarkan nilai-nilai luhur seperti Gotong Royong (contoh: tradisi memindahkan rumah di Sulawesi) dan Keharmonisan dengan Alam (contoh: tradisi Sasi yang melarang eksploitasi alam berlebihan). Nilai-nilai ini memperkuat hubungan sosial dan keseimbangan ekosistem."
    },
    {
        q: "<b>BERILAH TANDA PADA JAWABAN YANG TEPAT!</b><br><br>Contoh budaya sebagai potensi ekonomi adalah …",
        opts: ["Pariwisata budaya", "Menghilangkan tradisi", "Menjual kerajinan daerah", "Pentas seni tradisional"],
        ans: [0, 2],
        multi: true,
        pembahasan: "Budaya memiliki potensi ekonomi jika dapat menghasilkan nilai ekonomi secara langsung, seperti melalui sektor pariwisata budaya dan penjualan kerajinan khas daerah. Pentas seni memang bisa menghasilkan uang, namun tidak selalu dirancang sebagai kegiatan ekonomi yang bersifat langsung."
    }
];

const isianQuestions = [];

const essayQuestions = [
    {
        q: "Jelaskan secara singkat tradisi bakar batu dari Papua!",
        kj: "Tradisi bakar batu adalah tradisi masyarakat Papua memasak makanan bersama dengan batu panas secara gotong royong dalam acara adat sebagai bentuk kebersamaan dan rasa syukur.",
        points: ["papua", "memasak", "batu", "panas", "gotong royong", "bersama", "syukur"],
        minPoints: 3
    }
];

const dndQuestions = [
    {
        q: "Lengkapilah kalimat di bawah ini dengan menarik jawaban yang benar!",
        sentence: ["Larangan mengambil hasil laut sementara disebut", "{gap0}", "."],
        gaps: [{ id: 'gap0', ans: 'Sasi' }],
        choices: ['Sasi', 'Subak', 'Tradisi', 'Ritual'],
        pembahasan: "<b>Sasi</b> adalah kearifan lokal masyarakat Maluku dan Papua yang melarang pengambilan hasil alam tertentu dalam jangka waktu tertentu untuk menjaga kelestarian alam."
    },
    {
        q: "Lengkapilah kalimat di bawah ini dengan menarik jawaban yang benar!",
        sentence: ["Sistem irigasi tradisional Bali disebut", "{gap0}", "."],
        gaps: [{ id: 'gap0', ans: 'Subak' }],
        choices: ['Subak', 'Sasi', 'Sengkedan', 'Terasering'],
        pembahasan: "<b>Subak</b> adalah sistem irigasi tradisional Bali yang mengatur pembagian air sawah secara adil dan demokratis."
    },
    {
        q: "Lengkapilah kalimat di bawah ini dengan menarik jawaban yang benar!",
        sentence: ["Upacara adat bernilai spiritual disebut", "{gap0}", "."],
        gaps: [{ id: 'gap0', ans: 'Ritual adat' }],
        choices: ['Ritual adat', 'Pesta rakyat', 'Festival budaya', 'Hiburan'],
        pembahasan: "<b>Ritual adat</b> adalah upacara yang dilakukan dengan tujuan spiritual atau keagamaan untuk menghormati leluhur atau memohon keselamatan."
    },
    {
        q: "Lengkapilah kalimat di bawah ini dengan menarik jawaban yang benar!",
        sentence: ["Kesenian berupa gerakan tubuh disebut", "{gap0}", "."],
        gaps: [{ id: 'gap0', ans: 'Tarian' }],
        choices: ['Tarian', 'Nyanyian', 'Lukisan', 'Patung'],
        pembahasan: "<b>Tarian</b> atau tari tradisional adalah salah satu bentuk kebudayaan yang menggunakan gerakan tubuh sebagai media ekspresi dan seni."
    },
    {
        q: "Lengkapilah kalimat di bawah ini dengan menarik jawaban yang benar!",
        sentence: ["Jika dilanggar dapat merusak alam berkaitan dengan", "{gap0}", "."],
        gaps: [{ id: 'gap0', ans: 'Keseimbangan lingkungan' }],
        choices: ['Keseimbangan lingkungan', 'Ekonomi rakyat', 'Budaya luar', 'Gaya hidup'],
        pembahasan: "Kearifan lokal seringkali dibuat untuk menjaga <b>keseimbangan lingkungan</b> agar manusia tidak merusak alam demi kepentingan pribadi."
    },
    {
        q: "Lengkapilah kalimat di bawah ini dengan menarik jawaban yang benar!",
        sentence: ["Tradisi yang diwariskan dari generasi ke generasi disebut", "{gap0}", "."],
        gaps: [{ id: 'gap0', ans: 'Kearifan Lokal' }],
        choices: ['Kearifan Lokal', 'Modernisasi', 'Globalisasi', 'Teknologi'],
        pembahasan: "<b>Kearifan Lokal</b> adalah nilai-baru luhur, aturan, atau tradisi khas yang dimiliki oleh masyarakat daerah tertentu untuk mengatur kehidupan bersama secara bijaksana."
    },
    {
        q: "Lengkapilah kalimat di bawah ini dengan menarik jawaban yang benar!",
        sentence: ["Seni bela diri khas Betawi adalah", "{gap0}", "."],
        gaps: [{ id: 'gap0', ans: 'Pencak silat Betawi' }],
        choices: ['Pencak silat Betawi', 'Karate', 'Taekwondo', 'Kungfu'],
        pembahasan: "<b>Pencak silat Betawi</b> (seperti Maen Pukulan) adalah seni bela diri tradisional yang menjadi identitas budaya masyarakat Betawi di Jakarta."
    },
    {
        q: "Lengkapilah kalimat di bawah ini dengan menarik jawaban yang benar!",
        sentence: ["Kebiasaan atau aturan khas masyarakat di suatu daerah disebut", "{gap0}", "."],
        gaps: [{ id: 'gap0', ans: 'Tradisi' }],
        choices: ['Tradisi', 'Modernisasi', 'Budaya luar', 'Globalisasi'],
        pembahasan: "<b>Tradisi</b> adalah kebiasaan atau adat istiadat yang diteruskan secara turun-temurun dari nenek moyang kepada generasi berikutnya."
    },
    {
        q: "Lengkapilah kalimat di bawah ini dengan menarik jawaban yang benar!",
        sentence: ["Upacara pembakaran jenazah di Bali adalah", "{gap0}", "."],
        gaps: [{ id: 'gap0', ans: 'Ngaben' }],
        choices: ['Ngaben', 'Nyepi', 'Galungan', 'Kuningan'],
        pembahasan: "<b>Ngaben</b> adalah upacara kremasi atau pembakaran jenazah umat Hindu di Bali sebagai simbol pengembalian unsur tubuh ke alam semesta."
    }
];

const LETTERS = ['A', 'B', 'C', 'D'];

// ─── STATE ─────────────────────────────────────
const pgState = pgQuestions.map(q => ({ attempts: 0, locked: false, correct: false, selected: q.multi ? [] : null }));
const isianState = isianQuestions.map(() => ({ attempts: 0, locked: false, correct: false }));
const essayState = essayQuestions.map(() => ({ locked: false, points: 0, correct: false }));
const dndState = dndQuestions.map(q => {
    const answers = {};
    q.gaps.forEach(g => answers[g.id] = null);
    return { locked: false, correct: false, attempts: 0, answers };
});

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
    if (essayQuestions.length === 0) {
        essayContainer.innerHTML = '';
        return;
    }
    essayContainer.innerHTML = '<div class="section-title">--- Jawablah Pertanyaan Berikut ---</div>';
    essayQuestions.forEach((q, qi) => {
        const card = document.createElement('div');
        card.className = 'pg-card essay-card';
        card.id = `essay-card-${qi}`;
        card.innerHTML = `<div class="q-header"><span class="q-num-badge" id="essay-badge-${qi}">${pgQuestions.length + isianQuestions.length + dndQuestions.length + qi + 1}</span><div class="q-text">${q.q}</div></div><div class="essay-input-wrap"><textarea class="essay-input" id="essay-input-${qi}" placeholder="Tuliskan jawaban lengkapmu di sini..." rows="3"></textarea><button class="essay-check-btn" id="essay-check-${qi}" onclick="checkEssayAnswer(${qi})">Kirim Jawaban ✓</button></div><div class="q-feedback" id="essay-fb-${qi}"></div>`;
        essayContainer.appendChild(card);
    });
}

function renderDnDGap() {
    const container = document.getElementById('dndGapContainer');
    if (!container) return;
    container.innerHTML = '<div class="section-title">--- Geser dan Pasangkan ---</div>';

    // 1. Fixed set of 9 correct answers + 3 distractors
    const correctAnswers = [
        'Sasi', 'Subak', 'Ritual adat', 'Tarian',
        'Keseimbangan lingkungan', 'Tradisi', 'Pencak silat Betawi',
        'Kearifan Lokal', 'Ngaben'
    ];
    const distractors = ['Modernisasi', 'Keuntungan pribadi', 'Gaya hidup boros'];

    let allChoices = [...correctAnswers, ...distractors];
    // Shuffle
    allChoices.sort(() => Math.random() - 0.5);

    // 2. Render Global Pool
    const poolDiv = document.createElement('div');
    poolDiv.className = 'dnd-choices-pool global-pool';
    poolDiv.id = 'globalChoicesPool';
    poolDiv.innerHTML = `
        <div class="pool-header">Pilihan Jawaban:</div>
        <div class="pool-items">
            ${allChoices.map((c, ci) => `
                <div class="dnd-choice-item" id="global-choice-${ci}" draggable="true" ondragstart="handleDragStart(event, '${c}')" onclick="handleGlobalChoiceClick(event, ${ci}, '${c}')" ontouchstart="handleGlobalChoiceClick(event, ${ci}, '${c}')">${c}</div>
            `).join('')}
        </div>
    `;
    container.appendChild(poolDiv);

    // 3. Render Questions
    dndQuestions.forEach((q, qi) => {
        const card = document.createElement('div');
        card.className = 'pg-card dnd-gap-card';
        const num = pgQuestions.length + isianQuestions.length + essayQuestions.length + qi + 1;
        card.innerHTML = `
            <div class="q-header">
                <span class="q-num-badge" id="dnd-badge-${qi}">${num}</span>
                <div class="q-text">${q.q}</div>
            </div>
            ${q.img ? `<img src="${q.img}" class="q-img">` : ''}
            <div class="dnd-sentence">
                ${q.sentence.map(part => {
            if (part.startsWith('{gap')) {
                const gapId = part.replace('{', '').replace('}', '');
                return `<div class="dnd-drop-zone" id="${qi}-${gapId}" ondragover="event.preventDefault()" ondrop="handleDrop(event, ${qi}, '${gapId}')" onclick="handleZoneClick(event, ${qi}, '${gapId}')" ontouchstart="handleZoneClick(event, ${qi}, '${gapId}')">Tarik di sini</div>`;
            }
            return `<span>${part}</span>`;
        }).join('')}
            </div>
            <button class="dnd-check-btn" id="dndCheckBtn-${qi}" onclick="checkDnDGap(${qi})" disabled>Cek Jawaban ✓</button>
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
        if (window.SFX) window.SFX.wrong();
        // Clear selection highlights and show correct vs wrong
        q.opts.forEach((_, oi) => {
            const btn = document.getElementById(`q-opt-${qi}-${oi}`);
            btn.classList.remove('opt-selected');
            if (q.ans.includes(oi)) {
                btn.classList.add('opt-correct');
            } else if (state.selected.includes(oi)) {
                btn.classList.add('opt-wrong');
            }
        });
        fb.className = 'q-feedback fb-wrong'; fb.textContent = '❌ Kesempatan habis. Perhatikan jawaban yang benar!';
        setTimeout(() => showPembahasan(q.pembahasan, false), 600); lockPG(qi);
    }
}

function checkIsianAnswer(qi) {
    const state = isianState[qi]; if (state.locked) return;
    const q = isianQuestions[qi]; const input = document.getElementById(`isian-input-${qi}`);
    const userVal = input.value.trim(); if (!userVal) return;
    state.attempts++; const isCorrect = isAnswerSimilar(userVal, q.ans, q.keywords);
    const fb = document.getElementById(`isian-fb-${qi}`);
    if (isCorrect) {
        state.correct = true; if (window.SFX) window.SFX.correct();
        input.classList.add('input-correct'); fb.className = 'q-feedback fb-correct';
        fb.innerHTML = `<div class="fb-msg">✅ Benar! Hebat!</div><div class="fb-user-box">Jawabanmu: <b>${userVal}</b></div><div class="fb-kj-box-isian">Kunci Jawaban: <span>${q.ans}</span></div>`;
        setTimeout(() => showPembahasan(q.pembahasan, true), 600); lockIsian(qi);
    } else if (state.attempts === 1) {
        if (window.SFX) window.SFX.wrong(); input.classList.add('input-wrong');
        fb.className = 'q-feedback fb-wrong';
        fb.innerHTML = `<div class="fb-msg">❌ Belum tepat.</div><div class="fb-user-box">Jawabanmu: <b>${userVal}</b></div><div class="fb-hint-msg">Ayo coba lagi! (1 kesempatan lagi)</div>`;
        showTryAgain(); setTimeout(() => input.classList.remove('input-wrong'), 1500);
    } else {
        if (window.SFX) window.SFX.wrong(); fb.className = 'q-feedback fb-wrong';
        fb.innerHTML = `<div class="fb-msg">❌ Kesempatan habis.</div><div class="fb-user-box">Jawabanmu: <b>${userVal}</b></div><div class="fb-kj-box-isian">Kunci Jawaban: <span>${q.ans}</span></div>`;
        setTimeout(() => showPembahasan(q.pembahasan, false), 600); lockIsian(qi);
    }
}

function checkEssayAnswer(qi) {
    const state = essayState[qi]; if (state.locked) return;
    const q = essayQuestions[qi];
    const input = document.getElementById(`essay-input-${qi}`);
    const userVal = input.value.trim().toLowerCase();
    if (!userVal) { alert('Tuliskan jawabanmu dulu ya! 😊'); return; }

    // Scoring based on keywords (Scale 1-10)
    let foundPoints = 0;
    q.points.forEach(p => { if (userVal.includes(p.toLowerCase())) foundPoints++; });

    // Calculate score: (found / minPoints) * 10, capped at 10
    const score = Math.min(10, Math.max(0, Math.round((foundPoints / q.minPoints) * 10)));
    state.points = score;

    const fb = document.getElementById(`essay-fb-${qi}`);
    if (score >= 10) {
        state.locked = true; state.correct = true;
        if (window.SFX) window.SFX.correct();
        fb.className = 'q-feedback fb-essay-done';
        fb.innerHTML = `
            <div class="essay-score-badge">Skor: ${score}/10</div>
            <div class="essay-success-msg">✅ Hebat! Jawabanmu sangat lengkap dan benar!</div>
            <div class="essay-kj-box"><div class="essay-kj-title">📖 Kunci Jawaban:</div><div class="essay-kj-content">${q.kj}</div></div>
        `;
        input.disabled = true; document.getElementById(`essay-check-${qi}`).style.display = 'none';
        totalDoneCount++; checkQuizComplete();
    } else if (score > 0) {
        state.locked = true; state.correct = true;
        if (score < 10) {
            if (window.SFX) window.SFX.wrong();
        } else {
            if (window.SFX) window.SFX.correct();
        }
        fb.className = 'q-feedback fb-essay-warning';
        fb.innerHTML = `
            <div class="essay-score-badge badge-warning">Skor: ${score}/10</div>
            <div class="essay-warning-msg">⚠️ Jawabanmu sudah baik, tapi masih bisa lebih lengkap lagi.</div>
            <div class="essay-kj-box"><div class="essay-kj-title">📖 Kunci Jawaban Lengkap:</div><div class="essay-kj-content">${q.kj}</div></div>
        `;
        input.disabled = true; document.getElementById(`essay-check-${qi}`).style.display = 'none';
        totalDoneCount++; checkQuizComplete();
    } else {
        if (state.attempts === undefined) state.attempts = 0;
        state.attempts++;
        if (state.attempts < 2) {
            if (window.SFX) window.SFX.wrong();
            fb.className = 'q-feedback fb-wrong';
            fb.textContent = '❌ Jawabanmu kurang tepat atau kurang lengkap. Coba jelaskan lebih detail lagi agar poinmu maksimal!';
            showTryAgain();
        } else {
            state.locked = true; state.correct = false;
            if (window.SFX) window.SFX.wrong();
            fb.className = 'q-feedback fb-essay-done';
            fb.innerHTML = `
                <div class="essay-score-badge badge-wrong">Skor: 0/10</div>
                <div class="essay-wrong-msg">❌ Kesempatan habis. Pelajari kunci jawaban berikut ya!</div>
                <div class="essay-kj-box"><div class="essay-kj-title">📖 Kunci Jawaban:</div><div class="essay-kj-content">${q.kj}</div></div>
            `;
            input.disabled = true; document.getElementById(`essay-check-${qi}`).style.display = 'none';
            totalDoneCount++; checkQuizComplete();
        }
    }
}

let selectedChoice = null;
let lastInteractionTime = 0;

function handleDragStart(e, text) {
    // Find if this text is already used
    const pool = document.getElementById('globalChoicesPool');
    const item = Array.from(pool.querySelectorAll('.dnd-choice-item')).find(el => el.textContent === text && !el.classList.contains('used'));
    if (!item) { e.preventDefault(); return; }

    e.dataTransfer.setData('text/plain', text);
    selectedChoice = { text };
    if (window.SFX) window.SFX.click();
}

function handleGlobalChoiceClick(e, ci, text) {
    const now = Date.now();
    if (now - lastInteractionTime < 300) return;
    lastInteractionTime = now;

    const btn = document.getElementById(`global-choice-${ci}`);
    if (btn.classList.contains('used')) return; // Prevent clicking used items

    if (window.SFX) window.SFX.click();

    if (selectedChoice && selectedChoice.ci === ci) {
        selectedChoice = null;
        document.querySelectorAll(`.dnd-choice-item`).forEach(el => el.classList.remove('selected'));
        return;
    }

    selectedChoice = { ci, text };
    document.querySelectorAll(`.dnd-choice-item`).forEach(el => el.classList.remove('selected'));
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
    if (dndState[qi].locked) return;
    const text = e.dataTransfer.getData('text/plain') || (selectedChoice ? selectedChoice.text : null);
    if (!text) return;

    // Check if text is used
    const pool = document.getElementById('globalChoicesPool');
    const item = Array.from(pool.querySelectorAll('.dnd-choice-item')).find(el => el.textContent === text && !el.classList.contains('used'));
    if (!item && !(selectedChoice && selectedChoice.text === text)) return;

    placeAnswer(qi, gapId, text);
    selectedChoice = null;
    document.querySelectorAll(`.dnd-choice-item`).forEach(el => el.classList.remove('selected'));
}

function placeAnswer(qi, gapId, text) {
    const zone = document.getElementById(`${qi}-${gapId}`);
    if (!zone) return;

    // 1. If zone already has an answer, free up the old one
    const oldText = dndState[qi].answers[gapId];
    if (oldText) {
        const pool = document.getElementById('globalChoicesPool');
        const oldItem = Array.from(pool.querySelectorAll('.dnd-choice-item')).find(el => el.textContent === oldText && el.classList.contains('used'));
        if (oldItem) oldItem.classList.remove('used');
    }

    // 2. Mark the new answer as used
    const pool = document.getElementById('globalChoicesPool');
    const newItem = Array.from(pool.querySelectorAll('.dnd-choice-item')).find(el => el.textContent === text && !el.classList.contains('used'));
    if (newItem) newItem.classList.add('used');

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
            const oldText = state.answers[g.id];
            if (oldText) {
                const pool = document.getElementById('globalChoicesPool');
                const oldItem = Array.from(pool.querySelectorAll('.dnd-choice-item')).find(el => el.textContent === oldText && el.classList.contains('used'));
                if (oldItem) oldItem.classList.remove('used');
            }
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
    if (!overlay || !body) return;
    icon.textContent = isCorrect ? '🌟' : '📖';
    body.innerHTML = html; overlay.classList.add('visible');
}

function hidePembahasan() {
    const overlay = document.getElementById('pembahasanOverlay');
    if (overlay) overlay.classList.remove('visible');
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
    isianState.forEach(s => { s.attempts = 0; s.locked = false; s.correct = false; });
    essayState.forEach(s => { s.locked = false; s.points = 0; s.correct = false; });
    dndState.forEach((s, i) => {
        s.locked = false; s.correct = false; s.attempts = 0;
        s.answers = {};
        dndQuestions[i].gaps.forEach(g => s.answers[g.id] = null);
    });
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
    isianState.forEach(st => { if (st.correct) s++; });
    dndState.forEach(st => { if (st.correct) s++; });
    const total = pgQuestions.length + isianQuestions.length + dndQuestions.length;
    return Math.round((s / total) * 100);
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

    const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfMUZJWPjV5yQSlC34sDZ5d96uLU7JKe0PnE8UZ_3B0ksN4yQ/formResponse';
    const body = new URLSearchParams();
    body.append('entry.230384766', name);
    body.append('entry.427702306', kelas);
    body.append('entry.283960489', skor);
    body.append('entry.901163404', feel);

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
