/* =============================================
   PENDIDIKAN PANCASILA — quiz.js
   Slide 7: PG (1-15) + Isian (1-5) + Essay (1-5) + DnD (1-5)
   ============================================= */

// ─── DATA ─────────────────────────────────────
const pgQuestions = [
    {
        q: "Perhatikanlah gambar di bawah ini untuk menjawab soal no 1 dan 2!<br><img src='assets/image1.png' class='q-img'><br>Gambar no 1 merupakan gambar tarian yang berasal dari daerah …",
        opts: ["Jawa Barat", "Sumatera Barat", "Kalimantan Barat", "Riau"],
        ans: 1,
        pembahasan: "Tari Piring adalah tarian tradisional khas suku Minangkabau yang berasal dari provinsi Sumatera Barat. Ciri utamanya adalah penari yang membawa piring di telapak tangannya ."
    },
    {
        q: "<img src='assets/image2.png' class='q-img'><br>Gambar no 2 merupakan rumah adat yang berasal dari …",
        opts: ["Jawa Tengah", "Sulawesi Selatan", "Sumatera Barat", "Kalimantan Barat"],
        ans: 1,
        pembahasan: "Nama Rumah: Rumah Tongkonan. Asal Daerah: Suku Toraja, provinsi Sulawesi Selatan. Ciri Khas: Memiliki atap yang melengkung menyerupai perahu atau tanduk kerbau."
    },
    {
        q: "Contoh sikap toleransi adalah ...",
        opts: ["memaksakan pendapat", "mengejek teman", "menghargai pendapat orang lain", "Bertengkar"],
        ans: 2,
        pembahasan: "Toleransi adalah sikap saling menghormati dan menghargai perbedaan antar sesama manusia. Menghargai pendapat orang lain menciptakan kerukunan meskipun memiliki pemikiran yang berbeda."
    },
    {
        q: "Di kelas terdapat siswa dari berbagai suku. Saat kerja kelompok, mereka berbeda pendapat. Sikap terbaik adalah ..",
        opts: ["memaksakan pendapat sendiri", "mencari kesepakatan bersama", "tidak ikut berdiskusi", "memilih teman yang sama suku saja"],
        ans: 1,
        pembahasan: "Mencari kesepakatan bersama artinya mendengarkan semua usulan teman, lantas mendiskusikannya dengan baik sampai menemukan jalan tengah yang disetujui semua orang. Ini menunjukkan sikap toleransi dan menjaga persatuan."
    },
    {
        q: "Jika ada teman berbeda suku, kita sebaiknya ...",
        opts: ["mengejek", "tidak berteman", "menjauhi", "berteman baik"],
        ans: 3,
        pembahasan: "Meskipun berbeda suku, kita semua adalah satu bangsa Indonesia yang harus tetap rukun. Berteman baik tanpa membedakan suku akan menciptakan suasana sekolah yang menyenangkan."
    },
    {
        q: "Di kelas terdapat siswa dari berbagai suku. Saat kerja kelompok, mereka berbeda pendapat. Sikap terbaik adalah ...",
        opts: ["memaksakan pendapat sendiri", "tidak ikut berdiskusi", "mencari kesepakatan bersama", "memilih teman yang sama suku saja"],
        ans: 2,
        pembahasan: "Diskusi dilakukan agar semua anggota kelompok merasa dihargai pendapatnya. Dengan kesepakatan bersama, tugas kelompok akan lebih cepat selesai dan hasilnya memuaskan."
    },
    {
        q: "Keberagaman budaya di Indonesia justru dapat memperkuat bangsa jika ...",
        opts: ["dijadikan bahan ejekan", "Dihargai dan dilestarikan", "dihindari", "dibanding-bandingkan"],
        ans: 1,
        pembahasan: "Budaya yang beragam akan menjadi kekuatan luar biasa jika kita saling menghormati satu sama lain. Melestarikan budaya juga berarti kita menjaga warisan berharga dari nenek moyang bangsa kita."
    },
    {
        q: "Manfaat sikap tersebut adalah ...",
        opts: ["menimbulkan konflik", "mempererat persatuan", "membuat permusuhan", "menyebabkan perpecahan"],
        ans: 1,
        pembahasan: "Sikap toleransi membuat tidak ada lagi rasa benci atau curiga antarwarga. Hal ini membuat bangsa Indonesia menjadi kokoh dan tidak mudah terpecah belah oleh masalah."
    },
    {
        q: "Sikap yang tepat saat melihat budaya daerah lain adalah ...",
        opts: ["menertawakan", "menghargai", "mengejek", "menghindari"],
        ans: 1,
        pembahasan: "Setiap budaya daerah memiliki keunikan dan keindahan tersendiri yang patut kita puji. Menghargai budaya lain adalah tanda bahwa kita memiliki sikap yang dewasa dan sopan."
    },
    {
        q: "Keberagaman budaya membuat Indonesia menjadi..",
        opts: ["lemah", "miskin", "kaya budaya", "sepi"],
        ans: 2,
        pembahasan: "Indonesia dikenal dunia karena memiliki ribuan tradisi, bahasa, dan kesenian yang berbeda-beda. Keberagaman ini merupakan kekayaan bangsa yang tidak dimiliki oleh banyak negara lain."
    },
    {
        q: "<b>BERILAH DUA TANDA PADA JAWABAN YANG TEPAT!</b><br><br>Perhatikan pernyataan berikut:<br>(1) Mengejek bahasa daerah teman<br>(2) Menghargai pakaian adat teman<br>(3) Memaksakan budaya sendiri<br>(4) Mau berteman dengan siapa saja<br><br>Sikap yang menunjukkan menghargai keberagaman adalah ...",
        opts: ["(1)", "(2)", "(3)", "(4)"],
        ans: [1, 3],
        multi: true,
        pembahasan: "Menghargai pakaian adat teman merupakan bentuk penghormatan terhadap ciri khas daerah lain. Selain itu, mau berteman dengan siapa saja tanpa membedakan latar belakang akan menciptakan kerukunan."
    },
    {
        q: "<b>BERILAH DUA TANDA PADA JAWABAN YANG TEPAT!</b><br><br><img src='assets/image3.png' class='q-img'><br>Budaya Indonesia terkait gambar di atas adalah ....",
        opts: ["Tari Pendet dari Bali", "Tari Topeng dari Jakarta", "Tari Merak dari Jawa Barat", "Tari Serimpi dari Jawa Tengah"],
        ans: [0, 3],
        multi: true,
        pembahasan: "Gambar tersebut menunjukkan keberagaman tarian daerah. Jawaban yang tepat adalah Tari Pendet dari Bali dan Tari Serimpi dari Jawa Tengah."
    },
    {
        q: "<b>BERILAH DUA TANDA PADA JAWABAN YANG TEPAT!</b><br><br>Jika di lingkungan rumah ada perayaan agama lain, sikap kita sebaiknya ...",
        opts: ["mengganggu", "menjaga ketenangan", "menghormati", "melarang"],
        ans: [1, 2],
        multi: true,
        pembahasan: "Menjaga ketenangan saat tetangga beribadah adalah cara sederhana untuk menunjukkan rasa toleransi. Kita juga harus menghormati perbedaan keyakinan agar kehidupan di lingkungan rumah tetap harmonis."
    },
    {
        q: "<b>BERILAH DUA TANDA PADA JAWABAN YANG TEPAT!</b><br><br>Sikap yang harus dihindari dalam upaya mencegah perpecahan di lingkungan sekolah, yaitu…",
        opts: ["membeda-badakan teman dalam bergaul", "menjelek-jelekan suku bangsa atau agama lain", "saling menghormati dan menghargai", "menonjolkan keunggulan"],
        ans: [0, 1],
        multi: true,
        pembahasan: "Memilih-milih teman hanya akan membuat suasana sekolah menjadi tidak nyaman dan berkelompok-kelompok. Menjelekkan identitas orang lain juga sangat dilarang karena bisa memicu pertengkaran antar siswa."
    },
    {
        q: "<b>BERILAH DUA TANDA PADA JAWABAN YANG TEPAT!</b><br><br>Jika ada teman berbeda suku, kita sebaiknya...",
        opts: ["mengejek", "berteman dengan baik", "tidak mau berteman", "rukun dengan teman"],
        ans: [1, 3],
        multi: true,
        pembahasan: "Berteman dengan baik tanpa melihat asal suku menunjukkan bahwa kita adalah pribadi yang terbuka. Sikap rukun akan membuat persahabatan di kelas menjadi lebih kuat dan menyenangkan."
    }
];

const isianQuestions = [
    {
        q: "Dalam UUD 1945, secara tegas menyatakan bahwa negara Indonesia terdiri atas dasar ketuhanan. Hal ini dinyatakan dalam UUD 1945 pasal…",
        ans: "Pasal 29 ayat (1)",
        keywords: ["29", "ayat 1"],
        pembahasan: "Pasal ini berbunyi bahwa \"Negara berdasar atas Ketuhanan Yang Maha Esa.\" Hal ini menegaskan bahwa Indonesia adalah negara yang berlandaskan nilai-nilai ketuhanan."
    },
    {
        q: "Lila berasal dari suku Betawi. Siti berasal dari suku Jawa. Pernyatran di atas termasuk keberagaman…",
        ans: "Keberagaman Suku Bangsa",
        keywords: ["suku", "bangsa"],
        pembahasan: "Betawi dan Jawa merupakan nama-nama suku yang ada di Indonesia. Perbedaan asal suku antara Lila dan Siti menunjukkan kekayaan suku bangsa kita."
    },
    {
        q: "Indonesia terdiri dari berbagai macam suku, agama, dan …",
        ans: "Budaya",
        keywords: ["budaya"],
        pembahasan: "Selain suku dan agama, Indonesia juga memiliki keberagaman budaya seperti adat istiadat dan bahasa daerah. Hal ini menjadikan bangsa kita unik dan berwarna."
    },
    {
        q: "Semboyan bangsa Indonesia adalah…",
        ans: "Bhinneka Tunggal Ika",
        keywords: ["bhinneka", "tunggal", "ika"],
        pembahasan: "Semboyan Bhinneka Tunggal Ika memiliki arti \"Berbeda-beda tetapi tetap satu jua.\" Semboyan ini tertulis pada lambang negara kita, Garuda Pancasila."
    },
    {
        q: "Tarian dan pakaian adat termasuk budaya…",
        ans: "Kebudayaan Daerah / Kebudayaan Tradisional",
        keywords: ["daerah", "tradisional"],
        pembahasan: "Tarian dan pakaian adat merupakan hasil cipta karya masyarakat di suatu wilayah tertentu. Setiap daerah di Indonesia memiliki ciri khas budaya yang berbeda-beda."
    }
];

const essayQuestions = [
    {
        q: "Keragaman suku bangsa menghasilkan berbagai keragaman. Apa saja keragaman tersebut, tuliskan 3 contoh keragaman yang kamu ketahui!",
        kj: "<ul><li>Keragaman bahasa daerah, pakaian adat, dan rumah adat</li><li>Perbedaan tarian daerah, makanan khas, dan bahasa daerah</li><li>Ragam budaya seperti lagu daerah, adat istiadat, dan pakaian tradisional</li><li>Perbedaan rumah adat, kesenian daerah, dan bahasa daerah</li><li>Keragaman makanan tradisional, tarian daerah, dan upacara adat</li><li>Perbedaan bahasa, pakaian adat, dan kesenian daerah</li><li>Ragam budaya seperti rumah adat, lagu daerah, dan tarian daerah</li></ul>",
        points: ["bahasa", "pakaian", "rumah", "tarian", "makanan", "kesenian", "lagu", "adat", "upacara"]
    },
    {
        q: "Mengapa kita harus menghargai perbedaan suku bangsa? Jelaskan!",
        kj: "<ul><li>Agar hidup rukun dan tidak terjadi pertengkaran</li><li>Supaya kita saling menghormati dan menjaga persatuan</li><li>Agar tercipta kedamaian di lingkungan masyarakat</li><li>Supaya tidak ada konflik antar suku</li><li>Agar persatuan dan kesatuan tetap terjaga</li><li>Supaya kehidupan menjadi damai dan harmonis</li><li>Agar tidak saling bermusuhan</li></ul>",
        points: ["rukun", "pertengkaran", "menghormati", "persatuan", "kedamaian", "konflik", "harmonis", "bermusuhan"]
    },
    {
        q: "Apa yang akan terjadi jika kita tidak menghargai keberagaman?",
        kj: "<ul><li>Akan terjadi pertengkaran dan perpecahan</li><li>Bisa menimbulkan konflik antar teman</li><li>Kehidupan menjadi tidak rukun</li><li>Persatuan akan terganggu</li><li>Bisa saling membenci dan tidak akur</li><li>Terjadi perselisihan di masyarakat</li><li>Lingkungan menjadi tidak damai</li></ul>",
        points: ["pertengkaran", "perpecahan", "konflik", "tidak rukun", "terganggu", "membenci", "akur", "perselisihan", "tidak damai"]
    },
    {
        q: "Bagaimana cara kamu menghargai teman yang berbeda budaya di sekolah?",
        kj: "<ul><li>Menghormati perbedaan budaya teman</li><li>Tidak mengejek kebiasaan teman</li><li>Berteman dengan semua tanpa membedakan</li><li>Menghargai adat dan kebiasaan teman</li><li>Bersikap sopan kepada semua teman</li><li>Tidak membully teman yang berbeda budaya</li><li>Saling menghargai dan tolong menolong</li></ul>",
        points: ["menghormati", "mengejek", "semua", "adat", "sopan", "bully", "tolong", "menolong"]
    },
    {
        q: "Bagaimana jika ada temanmu yang tidak mau menghargai keragaman budaya Indonesia?",
        kj: "<ul><li>Menasihati dengan baik agar mau menghargai</li><li>Mengajak untuk saling menghormati perbedaan</li><li>Memberi contoh sikap menghargai</li><li>Mengingatkan bahwa kita harus hidup rukun</li><li>Melaporkan kepada guru jika terus berlanjut</li><li>Menegur dengan sopan</li><li>Membantu memahami pentingnya keberagaman</li></ul>",
        points: ["nasihat", "menasihati", "mengajak", "contoh", "mengingatkan", "lapor", "guru", "menegur", "memahami"]
    }
];

const dndQuestions = [
    {
        img: 'assets/No_26.png',
        q: "Geser jawaban yang benar ke kotak yang tersedia untuk melengkapi kalimat!",
        sentence: ["Aku adalah", "{gap0}", ". Aku berasal dari", "{gap1}", "."],
        gaps: [{ id: 'gap0', ans: 'Rumah Honai' }, { id: 'gap1', ans: 'Papua' }],
        choices: ['Rumah Honai', 'Papua', 'Rumah Gadang', 'Sumatera Barat', 'Rumah Joglo', 'Jawa Tengah'],
        pembahasan: "<b>Rumah Honai</b> adalah rumah tradisional dari <b>Papua</b>. Bentuknya bulat dengan atap jerami untuk menjaga kehangatan."
    },
    {
        img: 'assets/No_27.png',
        q: "Geser jawaban yang benar ke kotak yang tersedia untuk melengkapi kalimat!",
        sentence: ["Aku adalah", "{gap0}", ". Aku berasal dari", "{gap1}", "."],
        gaps: [{ id: 'gap0', ans: 'Rumah Tongkonan' }, { id: 'gap1', ans: 'Sulawesi Selatan' }],
        choices: ['Rumah Tongkonan', 'Sulawesi Selatan', 'Rumah Gadang', 'Sumatera Barat', 'Rumah Joglo', 'Jawa Tengah'],
        pembahasan: "<b>Rumah Tongkonan</b> berasal dari suku Toraja di <b>Sulawesi Selatan</b>. Atapnya melengkung menyerupai perahu atau tanduk kerbau."
    },
    {
        img: 'assets/No_28.png',
        q: "Geser jawaban yang benar ke kotak yang tersedia untuk melengkapi kalimat!",
        sentence: ["Aku adalah", "{gap0}", ". Aku berasal dari", "{gap1}", "."],
        gaps: [{ id: 'gap0', ans: 'Tari Pendet' }, { id: 'gap1', ans: 'Bali' }],
        choices: ['Tari Pendet', 'Bali', 'Tari Merak', 'Jawa Barat', 'Tari Serimpi', 'Jawa Tengah'],
        pembahasan: "<b>Tari Pendet</b> adalah tarian tradisional dari <b>Bali</b> yang awalnya merupakan tari pemujaan di Pura."
    },
    {
        img: 'assets/No.29.png',
        q: "Geser jawaban yang benar ke kotak yang tersedia untuk melengkapi kalimat!",
        sentence: ["Aku adalah", "{gap0}", ". Aku berasal dari", "{gap1}", "."],
        gaps: [{ id: 'gap0', ans: 'Suku Dayak' }, { id: 'gap1', ans: 'Kalimantan' }],
        choices: ['Suku Dayak', 'Kalimantan', 'Suku Betawi', 'Jakarta', 'Suku Asmat', 'Papua'],
        pembahasan: "<b>Suku Dayak</b> adalah salah satu suku asli yang berasal dari pulau <b>Kalimantan</b>."
    },
    {
        img: 'assets/No_30.png',
        q: "Geser jawaban yang benar ke kotak yang tersedia untuk melengkapi kalimat!",
        sentence: ["Aku adalah", "{gap0}", ". Aku berasal dari", "{gap1}", "."],
        gaps: [{ id: 'gap0', ans: 'Tari Saman' }, { id: 'gap1', ans: 'Aceh' }],
        choices: ['Tari Saman', 'Aceh', 'Tari Piring', 'Sumatera Barat', 'Tari Kecak', 'Bali'],
        pembahasan: "<b>Tari Saman</b> berasal dari suku Gayo di <b>Aceh</b>. Tarian ini dikenal dengan gerakan tangan yang sangat cepat dan sinkron."
    }
];

const LETTERS = ['A', 'B', 'C', 'D'];

// ─── STATE ─────────────────────────────────────
const pgState = pgQuestions.map(q => ({ attempts: 0, locked: false, correct: false, selected: q.multi ? [] : null }));
const isianState = isianQuestions.map(() => ({ attempts: 0, locked: false, correct: false }));
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
    essayContainer.innerHTML = '<div class="section-title">--- Jawablah Pertanyaan Berikut ---</div>';
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
    container.innerHTML = '<div class="section-title">--- Geser dan Pasangkan ---</div>';
    
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
                        return `<div class="dnd-drop-zone" id="${qi}-${gapId}" ondragover="event.preventDefault()" ondrop="handleDrop(event, ${qi}, '${gapId}')" onclick="handleZoneClick(${qi}, '${gapId}')">Tarik di sini</div>`;
                    }
                    return `<span>${part}</span>`;
                }).join('')}
            </div>
            <div class="dnd-choices-pool" id="dndChoices-${qi}">
                ${q.choices.map((c, ci) => `
                    <div class="dnd-choice-item" id="choice-${qi}-${ci}" draggable="true" ondragstart="handleDragStart(event, '${c}')" onclick="handleChoiceClick(${qi}, ${ci}, '${c}')">${c}</div>
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

function handleDragStart(e, text) { 
    e.dataTransfer.setData('text/plain', text); 
    selectedChoice = text;
    if (window.SFX) window.SFX.click(); 
}

function handleChoiceClick(qi, ci, text) {
    if (dndState[qi].locked) return;
    if (window.SFX) window.SFX.click();
    
    // Remove selected class from all items in this pool
    document.querySelectorAll(`#dndChoices-${qi} .dnd-choice-item`).forEach(el => el.classList.remove('selected'));
    
    const btn = document.getElementById(`choice-${qi}-${ci}`);
    if (selectedChoice === text) {
        selectedChoice = null;
    } else {
        selectedChoice = text;
        btn.classList.add('selected');
    }
}

function handleZoneClick(qi, gapId) {
    if (dndState[qi].locked || !selectedChoice) return;
    placeAnswer(qi, gapId, selectedChoice);
    
    // Clear selection
    selectedChoice = null;
    document.querySelectorAll(`.dnd-choice-item`).forEach(el => el.classList.remove('selected'));
}

function handleDrop(e, qi, gapId) {
    e.preventDefault(); 
    const text = e.dataTransfer.getData('text/plain') || selectedChoice;
    if (!text) return;
    placeAnswer(qi, gapId, text);
    selectedChoice = null;
}

function placeAnswer(qi, gapId, text) {
    const zone = document.getElementById(`${qi}-${gapId}`);
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
    dndState.forEach(s => { s.locked = false; s.correct = false; s.attempts = 0; s.answers = { gap0: null, gap1: null }; });
    renderQuiz();
    if (document.getElementById('quizCompletion')) document.getElementById('quizCompletion').classList.remove('show');
}

let quizInitialized = false;
document.addEventListener('DOMContentLoaded', () => {
    const _orig = window.autoPlaySlide;
    window.autoPlaySlide = function(slide) {
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

    const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeNhF9oE_vOlTvrsgl-7bilivnnIgiOgQZSDRi71iDjY8G80Q/formResponse';
    const body = new URLSearchParams();
    body.append('entry.1017546250', name); 
    body.append('entry.1096035993', kelas); 
    body.append('entry.1165900765', skor); 
    body.append('entry.664695890', feel);

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
