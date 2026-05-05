/* =============================================
   CERITA RAKYAT — quiz.js
   Slide 9: PG (1-9) + DnD ordering (10)
   ============================================= */

// ─── DATA ─────────────────────────────────────
const pgQuestions = [
    {
        q: "Siapakah Putri Tangguk dalam cerita tersebut?",
        opts: ["Seorang putri raja yang tinggal di istana megah", "Seorang perempuan petani yang rajin dari negeri Bunga Tanjung", "Seorang pedagang kain yang sangat kaya raya", "Seorang peri baik hati yang menjaga sawah"],
        ans: 1
    },
    {
        q: "Bagaimana watak Putri Tangguk setelah memiliki panen padi yang melimpah?",
        opts: ["Semakin rajin dan suka menolong tetangganya", "Sabar, penyayang, dan sangat ramah", "Sombong, angkuh, dan tidak menghargai rezeki", "Rendah hati dan suka berbagi dengan fakir miskin"],
        ans: 2
    },
    {
        q: "Mengapa Putri Tangguk menebar padi di jalan ketika pulang dari sawah?",
        opts: ["Untuk memberi makan burung-burung kelaparan di hutan", "Karena lumbung padinya sudah terlalu penuh dan tidak muat", "Karena padi tersebut sudah busuk dan tidak bisa dimakan lagi", "Untuk dijadikan alas jalan yang licin agar ia tidak terpeleset"],
        ans: 3
    },
    {
        q: "Mengapa lumbung padi Putri Tangguk tiba-tiba menjadi kosong dan sawahnya berubah menjadi semak belukar?",
        opts: ["Karena semua padinya dicuri oleh perampok saat malam hari", "Karena ia mendapat hukuman akibat menyia-nyiakan dan menginjak-injak padi", "Karena ada musim kemarau panjang yang melanda negerinya", "Karena ia lupa menyirami dan memanen padinya di sawah"],
        ans: 1
    },
    {
        q: "Apa isi pesan dari kakek tua (roh padi) di dalam mimpi Putri Tangguk?",
        opts: ["Padi-padi menangis karena diinjak-injak dan tidak mau lagi datang ke lumbungnya", "Putri Tangguk akan mendapatkan kotak berisi emas di tengah sawah", "Padi-padi meminta Putri Tangguk untuk segera memanennya esok hari", "Putri Tangguk harus menanam bibit padi lebih banyak lagi bersama suaminya"],
        ans: 0
    },
    {
        q: "Bagaimana akhir dari cerita \"Putri Tangguk\"?",
        opts: ["Putri Tangguk menjadi ratu yang memimpin negerinya dengan adil", "Putri Tangguk menemukan lumbung padi ajaib yang tidak pernah habis", "Ia beserta keluarganya jatuh miskin dan sangat menyesali perbuatannya", "Ia berhasil mengembalikan padinya yang hilang dengan bantuan sihir"],
        ans: 2
    },
    {
        q: "Pesan moral apa yang paling tepat dari cerita \"Putri Tangguk\"?",
        opts: ["Kita harus selalu membeli beras yang mahal agar enak dimakan", "Jangan pernah berjalan di jalan yang licin saat sedang turun hujan", "Kita harus rajin menabung uang koin setiap hari", "Jangan pernah sombong dan jangan menyia-nyiakan rezeki makanan yang kita miliki"],
        ans: 3
    }
];

const dndItemsData = [
    { id: 'A', text: "Putri Tangguk terbangun dan menangis karena lumbungnya kosong dan sawahnya berubah menjadi semak belukar." },
    { id: 'B', text: "Karena kesal sering terpeleset, Putri Tangguk dengan sombongnya membuang padi hasil panennya ke jalan sebagai alas kaki." },
    { id: 'C', text: "Putri Tangguk beserta keluarganya hidup berkecukupan karena mereka petani yang sangat rajin dan panennya selalu melimpah." },
    { id: 'D', text: "Putri Tangguk jatuh miskin, harus bekerja keras dari awal, dan sangat menyesali perbuatan buruknya." },
    { id: 'E', text: "Suatu hari, jalan pulang dari sawah menuju rumah sangat licin karena hujan deras." },
    { id: 'F', text: "Di dalam tidurnya, Putri Tangguk bermimpi didatangi kakek tua (roh padi) yang marah karena padinya tidak dihargai dan diinjak-injak." }
];
const DND_CORRECT = ['C', 'E', 'B', 'F', 'A', 'D'];
const LETTERS = ['A', 'B', 'C', 'D'];

// ─── STATE ─────────────────────────────────────
// attempts: 0=belum, 1=salah 1x, 2=selesai
const pgState = pgQuestions.map(() => ({ attempts: 0, locked: false }));
let pgDoneCount = 0;

let dndOrder = [];   // array of item IDs, current arrangement
let dndSel = null; // index of selected DnD item (null=none)
let dndLocked = false;

// ─── RENDER PG QUESTIONS ───────────────────────
function renderQuiz() {
    const container = document.getElementById('pgContainer');
    if (!container) return;
    container.innerHTML = '';

    pgQuestions.forEach((q, qi) => {
        const card = document.createElement('div');
        card.className = 'pg-card';
        card.id = `pg-card-${qi}`;
        card.innerHTML = `
            <div class="q-header">
                <span class="q-num-badge">${qi + 1}</span>
                <p class="q-text">${q.q}</p>
            </div>
            <div class="q-opts" id="q-opts-${qi}">
                ${q.opts.map((opt, oi) => `
                    <button class="q-opt" id="q-opt-${qi}-${oi}"
                        onclick="handlePGAnswer(${qi}, ${oi})">
                        <span class="opt-letter">${LETTERS[oi]}</span>
                        <span class="opt-text">${opt}</span>
                    </button>
                `).join('')}
            </div>
            <div class="q-feedback" id="q-fb-${qi}"></div>
        `;
        container.appendChild(card);
    });
}

// ─── HANDLE PG ANSWER ──────────────────────────
function handlePGAnswer(qi, oi) {
    const state = pgState[qi];
    if (state.locked) return;

    const isCorrect = (oi === pgQuestions[qi].ans);
    state.attempts++;

    const btn = document.getElementById(`q-opt-${qi}-${oi}`);
    const fb = document.getElementById(`q-fb-${qi}`);
    const correct = pgQuestions[qi].ans;

    if (isCorrect) {
        // ✅ Benar
        state.correct = true;
        if (window.SFX) window.SFX.correct();
        btn.classList.add('opt-correct');
        fb.className = 'q-feedback fb-correct';
        fb.textContent = '✅ Benar! Hebat!';
        lockPG(qi);
    } else if (state.attempts === 1) {
        // ❌ Salah, masih ada 1 kesempatan lagi
        if (window.SFX) window.SFX.wrong();
        btn.classList.add('opt-wrong');
        fb.className = 'q-feedback fb-wrong';
        fb.textContent = '❌ Belum tepat. Coba lagi ya! (1 kesempatan lagi)';
        // Reset warna tombol setelah 900ms agar bisa coba lagi
        setTimeout(() => {
            btn.classList.remove('opt-wrong');
        }, 900);
    } else {
        // ❌ Salah untuk ke-2 kalinya → tampilkan jawaban benar
        if (window.SFX) window.SFX.wrong();
        btn.classList.add('opt-wrong');
        document.getElementById(`q-opt-${qi}-${correct}`).classList.add('opt-correct');
        fb.className = 'q-feedback fb-wrong';
        fb.textContent = `❌ Jawaban yang benar adalah ${LETTERS[correct]}.`;
        lockPG(qi);
    }
}

function lockPG(qi) {
    pgState[qi].locked = true;
    const opts = document.querySelectorAll(`#q-opts-${qi} .q-opt`);
    opts.forEach(b => b.disabled = true);
    pgDoneCount++;
    checkQuizComplete();
}

// ─── DND ORDERING ──────────────────────────────
let isDragging = false;
let dragClone = null;
let draggingId = null;
let cloneOffsetX = 0;
let cloneOffsetY = 0;

function renderDnD() {
    // Acak urutan awal
    dndOrder = [...dndItemsData].sort(() => Math.random() - 0.5).map(i => i.id);
    refreshDnDList();
}

function refreshDnDList() {
    const list = document.getElementById('dndOrderList');
    if (!list) return;
    list.innerHTML = '';

    dndOrder.forEach((id, idx) => {
        const item = dndItemsData.find(d => d.id === id);
        const el = document.createElement('div');
        el.className = 'dnd-order-item';
        // Sembunyikan item asli jika sedang di-drag
        if (id === draggingId) el.style.opacity = '0';

        el.id = `dnd-item-${idx}`;
        el.innerHTML = `
            <span class="dnd-pos">${idx + 1}</span>
            <span class="dnd-text">${item.text}</span>
            <span class="dnd-drag-icon" style="color:#a0aec0; font-size:1.4rem; padding-left:10px;">≡</span>
        `;

        if (!dndLocked) setupDnDEvents(el, id);
        list.appendChild(el);
    });
}

function setupDnDEvents(el, id) {
    el.style.touchAction = 'none'; // cegah scroll saat drag di HP

    el.addEventListener('pointerdown', (e) => {
        if (dndLocked) return;
        if (window.SFX) window.SFX.click(); // sound on grab
        isDragging = true;
        draggingId = id;

        const rect = el.getBoundingClientRect();
        cloneOffsetX = e.clientX - rect.left;
        cloneOffsetY = e.clientY - rect.top;

        // Buat elemen bayangan (clone) yang mengikuti kursor/jari
        dragClone = el.cloneNode(true);
        dragClone.style.position = 'fixed';
        dragClone.style.left = rect.left + 'px';
        dragClone.style.top = rect.top + 'px';
        dragClone.style.width = rect.width + 'px';
        dragClone.style.zIndex = '9999';
        dragClone.style.pointerEvents = 'none'; // agar pointermove bisa mendeteksi elemen di bawahnya
        dragClone.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        dragClone.style.transform = 'scale(1.03)';
        dragClone.style.transition = 'none';
        dragClone.style.background = '#dbeafe';
        dragClone.style.borderColor = 'var(--blue)';

        document.body.appendChild(dragClone);

        el.style.opacity = '0';

        document.addEventListener('pointermove', onDragMove, { passive: false });
        document.addEventListener('pointerup', onDragEnd);
        document.addEventListener('pointercancel', onDragEnd);
    });
}

function onDragMove(e) {
    if (!isDragging || !dragClone) return;
    e.preventDefault(); // cegah scroll halaman

    // Gerakkan clone
    dragClone.style.left = (e.clientX - cloneOffsetX) + 'px';
    dragClone.style.top = (e.clientY - cloneOffsetY) + 'px';

    // Cari elemen mana yang sedang di-hover
    const list = document.getElementById('dndOrderList');
    const items = Array.from(list.children);

    let targetIdx = dndOrder.indexOf(draggingId);

    for (let i = 0; i < items.length; i++) {
        const rect = items[i].getBoundingClientRect();
        const midY = rect.top + rect.height / 2;

        if (i < targetIdx && e.clientY < midY) {
            targetIdx = i;
            break;
        } else if (i > targetIdx && e.clientY > midY) {
            targetIdx = i;
        }
    }

    const currentIdx = dndOrder.indexOf(draggingId);
    if (targetIdx !== currentIdx) {
        // Pindahkan item di array dan re-render
        dndOrder.splice(currentIdx, 1);
        dndOrder.splice(targetIdx, 0, draggingId);
        refreshDnDList();
    }
}

function onDragEnd() {
    if (isDragging) {
        if (window.SFX) window.SFX.click(); // sound on drop
    }

    isDragging = false;
    draggingId = null;

    if (dragClone) {
        dragClone.remove();
        dragClone = null;
    }

    document.removeEventListener('pointermove', onDragMove);
    document.removeEventListener('pointerup', onDragEnd);
    document.removeEventListener('pointercancel', onDragEnd);

    refreshDnDList(); // re-render untuk mengembalikan opacity
}

function checkDndOrder() {
    const fb = document.getElementById('dndFeedback');
    const btn = document.getElementById('checkOrderBtn');
    const isCorrect = dndOrder.join(',') === DND_CORRECT.join(',');

    if (isCorrect) {
        if (window.SFX) window.SFX.correct();
        fb.className = 'q-feedback fb-correct';
        fb.textContent = '✅ Urutan benar! Luar biasa!';
        dndLocked = true;
        btn.disabled = true;
        btn.textContent = '✅ Urutan Benar!';
        // highlight all items green
        document.querySelectorAll('.dnd-order-item').forEach(el => el.classList.add('dnd-correct'));
        pgDoneCount++;
        checkQuizComplete();
    } else {
        if (window.SFX) window.SFX.wrong();
        fb.className = 'q-feedback fb-wrong';
        fb.textContent = '❌ Belum tepat. Coba geser lagi posisinya!';
    }
}

// ─── COMPLETION CHECK ──────────────────────────
function checkQuizComplete() {
    // Jumlah Soal PG + 1 DnD
    if (pgDoneCount >= pgQuestions.length + 1) {
        if (window.SFX) window.SFX.complete();
        const comp = document.getElementById('quizCompletion');
        if (comp) {
            comp.classList.add('show');
            // Scroll ke bawah agar terlihat
            setTimeout(() => comp.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
        }
    }
}

// ─── INIT QUIZ when entering slide 9 ───────────
function initQuiz() {
    pgDoneCount = 0;
    pgState.forEach(s => { s.attempts = 0; s.locked = false; s.correct = false; });
    dndLocked = false;
    dndSel = null;

    renderQuiz();
    renderDnD();

    const comp = document.getElementById('quizCompletion');
    if (comp) comp.classList.remove('show');

    const fb = document.getElementById('dndFeedback');
    if (fb) fb.textContent = '';

    const btn = document.getElementById('checkOrderBtn');
    if (btn) { btn.disabled = false; btn.textContent = 'Cek Urutan ✓'; }
}

let quizInitialized = false;

// Hook into autoPlaySlide from script.js (slide 9)
// Dipanggil saat slide 9 aktif
document.addEventListener('DOMContentLoaded', () => {
    // Override autoPlaySlide untuk slide 9
    const _orig = window.autoPlaySlide;
    window.autoPlaySlide = function (slide) {
        _orig && _orig(slide);
        if (slide === 9 && !quizInitialized) {
            initQuiz();
            quizInitialized = true;
        }
    };
});

// ─── HITUNG SKOR ────────────────────────────────
// Setiap soal PG = 10 poin (9 soal = 90)
// DnD = 10 poin jika benar
// Total maks = 100
function calcScore() {
    let s = 0;
    pgState.forEach((st) => {
        if (st.correct) s += 10;
    });
    if (dndLocked) s += 10;
    return s;
}

// ─── SUBMIT KE GOOGLE FORM ───────────────────────
// Entry IDs dari URL:
//   entry.880560691 = Nama
//   entry.1554735959 = Kelas
//   entry.1337140867   = Skor
//   entry.236553606 = Perasaan
function submitToGForm() {
    const name = document.getElementById('sfName').value.trim();
    const kelas = document.getElementById('sfClass').value;
    const feel = document.getElementById('sfFeel').value;

    if (!name) {
        alert('Jangan lupa isi namamu dulu ya! 😊');
        document.getElementById('sfName').focus();
        return;
    }
    if (!kelas) {
        alert('Harap pilih kelasmu! 😊');
        return;
    }
    if (!feel) {
        alert('Ceritakan perasaanmu dulu ya! 😊');
        return;
    }

    const skor = calcScore().toString();
    const btn = document.getElementById('sfSubmitBtn');
    btn.disabled = true;
    btn.textContent = 'Mengirim... ⏳';

    if (window.SFX) window.SFX.click();

    const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdo0d_ihyf6F_Sl3KBxgB8rTNhvdOLX21Hw0GTI_FsE0wK8Fg/formResponse';

    const body = new URLSearchParams();
    body.append('entry.880560691', name);   // Nama
    body.append('entry.1554735959', kelas);  // Kelas
    body.append('entry.1337140867', skor);   // Skor
    body.append('entry.236553606', feel);   // Perasaan

    fetch(FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: body
    })
        .then(() => {
            // Sembunyikan form, tampilkan pesan sukses
            document.getElementById('submitForm').style.display = 'none';
            const succ = document.getElementById('sfSuccess');
            document.getElementById('sfSuccessMsg').innerHTML =
                `Kerja bagus, ${name}! 👍👍👍<br><br>Terima kasih ${name} dari kelas ${kelas}. Terus semangat belajar! 🌟🌟🌟`;
            succ.classList.add('show');

            // Tampilkan dan mainkan video apresiasi
            const ytWrap = document.getElementById('ytCompletionWrap');
            if (ytWrap) ytWrap.style.display = 'block';
            if (typeof playYT === 'function') {
                playYT('yt-completion');
                startEndTimer('yt-completion');
            }

            succ.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Buka tombol Lanjut ke slide 10 (Doa Penutup)
            if (typeof videoReady !== 'undefined') {
                videoReady[9] = true;
                if (typeof updateNavButtons === 'function') updateNavButtons();
            }
        })
        .catch(() => {
            btn.disabled = false;
            btn.textContent = 'Kirim Nilai ke Guru 🚀';
            alert('Ups! Ada masalah saat mengirim. Coba lagi ya!');
        });
}
