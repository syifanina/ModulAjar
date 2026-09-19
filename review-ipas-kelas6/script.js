document.addEventListener('DOMContentLoaded', () => {
    console.log("Web Pembelajaran Initialized");
    
    // Interactive Flow Logic for Respiratory System
    const flowBtns = document.querySelectorAll('.flow-btn');
    const flowInfoPanel = document.getElementById('respiratory-flow-info');

    if (flowBtns.length > 0 && flowInfoPanel) {
        flowBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                flowBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked
                btn.classList.add('active');
                
                // Update info text
                const info = btn.getAttribute('data-info');
                const title = btn.textContent;
                flowInfoPanel.innerHTML = `<strong>Tahap: ${title}</strong><br><br>${info}`;
            });
        });
    }

    // Navigation Logic
    const menuCards = document.querySelectorAll('.menu-card:not(.coming-soon)');
    const backBtns = document.querySelectorAll('.back-to-menu');
    const slides = document.querySelectorAll('.slide');

    function showSlide(slideId) {
        slides.forEach(slide => slide.classList.remove('active-slide'));
        document.getElementById(slideId).classList.add('active-slide');
    }

    menuCards.forEach(card => {
        card.addEventListener('click', () => {
            const target = card.getAttribute('data-target');
            showSlide(target);
        });
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showSlide('menu-slide');
        });
    });

    const comingSoonCards = document.querySelectorAll('.coming-soon');
    comingSoonCards.forEach(card => {
        card.addEventListener('click', () => {
            alert('Materi ini sedang dalam tahap pembuatan!');
        });
    });

    // Toggle Organs Section
    const toggleOrgansBtn = document.getElementById('toggle-organs-btn');
    const organPartsContainer = document.getElementById('organ-parts-container');
    const toggleOrgansIcon = document.getElementById('toggle-organs-icon');

    if (toggleOrgansBtn && organPartsContainer) {
        toggleOrgansBtn.addEventListener('click', () => {
            if (organPartsContainer.style.display === 'none') {
                organPartsContainer.style.display = 'grid';
                toggleOrgansIcon.textContent = '🔼';
            } else {
                organPartsContainer.style.display = 'none';
                toggleOrgansIcon.textContent = '🔽';
            }
        });
    }

    // Toggle Digestive Organs Section
    const toggleDigestiveOrgansBtn = document.getElementById('toggle-digestive-organs-btn');
    const digestiveOrganPartsContainer = document.getElementById('digestive-organ-parts-container');
    const toggleDigestiveOrgansIcon = document.getElementById('toggle-digestive-organs-icon');

    if (toggleDigestiveOrgansBtn && digestiveOrganPartsContainer) {
        toggleDigestiveOrgansBtn.addEventListener('click', () => {
            if (digestiveOrganPartsContainer.style.display === 'none') {
                digestiveOrganPartsContainer.style.display = 'grid';
                toggleDigestiveOrgansIcon.textContent = '🔼';
            } else {
                digestiveOrganPartsContainer.style.display = 'none';
                toggleDigestiveOrgansIcon.textContent = '🔽';
            }
        });
    }

    // Toggle Function Text Buttons
    const toggleFunctionBtns = document.querySelectorAll('.toggle-function-btn');
    toggleFunctionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const funcText = btn.nextElementSibling;
            if (funcText.style.display === 'none') {
                funcText.style.display = 'block';
                btn.textContent = '🙈 Sembunyikan Fungsi';
            } else {
                funcText.style.display = 'none';
                btn.textContent = '👁️ Tampilkan Fungsi';
            }
        });
    });

    // Image Zoom Modal Logic
    const anatomyImages = document.querySelectorAll('.anatomy-img');
    const imageModal = document.getElementById('image-modal');
    const zoomedImg = document.getElementById('zoomed-img');
    const closeBtn = document.querySelector('.close-modal-btn');

    if (anatomyImages.length > 0 && imageModal && zoomedImg) {
        anatomyImages.forEach(img => {
            img.addEventListener('click', () => {
                imageModal.style.display = "block";
                zoomedImg.src = img.src;
            });
        });

        // Close on X click
        closeBtn.addEventListener('click', () => {
            imageModal.style.display = "none";
        });

        // Close on background click
        imageModal.addEventListener('click', (e) => {
            if (e.target !== zoomedImg) {
                imageModal.style.display = "none";
            }
        });
    }
});

// ===========================
// BANK SOAL - QUIZ LOGIC
// ===========================
const quizData = [
    {
        question: "Nama lain karbondioksida adalah ...",
        hint: null,
        options: ["zat asam", "gas", "zat asam arang", "karbonmonoksida"],
        answer: 2,
        explanation: "Karbondioksida (CO₂) secara tradisional dalam bahasa Indonesia dikenal dengan sebutan zat asam arang. Sementara zat asam adalah sebutan lama untuk oksigen (O₂)."
    },
    {
        question: "Paru-paru kiri terdiri dari ... gelambir.",
        hint: null,
        options: ["1", "2", "3", "4"],
        answer: 1,
        explanation: "Paru-paru kiri terdiri dari 2 gelambir (lobus), yaitu lobus atas dan lobus bawah. Paru-paru kanan memiliki 3 gelambir."
    },
    {
        question: "Perhatikan organ-organ berikut!\n1. hidung\n2. bronkus\n3. tenggorokan\n4. bronkiolus\n5. alveolus\n\nUrutan saluran pernapasan yang benar adalah ...",
        hint: null,
        options: ["1 – 2 – 3 – 4 – 5", "2 – 3 – 1 – 5 – 4", "1 – 3 – 2 – 4 – 5", "1 – 6 – 2 – 4 – 5"],
        answer: 2,
        explanation: "Urutan yang benar: Hidung (1) → Tenggorokan/Trakea (3) → Bronkus (2) → Bronkiolus (4) → Alveolus (5)."
    },
    {
        question: "Selaput pembungkus paru-paru disebut ...",
        hint: null,
        options: ["diafragma", "pleura", "perikardium", "trakea"],
        answer: 1,
        explanation: "Pleura adalah selaput tipis ganda yang membungkus dan melindungi paru-paru dari gesekan saat mengembang dan mengempis. Perikardium adalah selaput pembungkus jantung."
    },
    {
        question: "Pertukaran gas oksigen dan karbondioksida di paru-paru berlangsung di ...",
        hint: null,
        options: ["bronkus", "alveolus", "arteriol", "arteri"],
        answer: 1,
        explanation: "Alveolus adalah gelembung-gelembung halus di ujung bronkiolus yang kaya pembuluh kapiler. Di sinilah terjadi difusi O₂ dari udara ke darah dan CO₂ dari darah ke udara."
    },
    {
        question: "Pernapasan yang menggunakan otot diafragma disebut ...",
        hint: null,
        options: ["pernapasan dada", "pernapasan perut", "pernapasan hidung", "pernapasan mulut"],
        answer: 1,
        explanation: "Pernapasan perut terjadi karena aktivitas otot diafragma. Pernapasan dada terjadi karena aktivitas otot antar tulang rusuk (interkostal)."
    },
    {
        question: "Pada saat ekspirasi, otot antar tulang rusuk mengalami relaksasi, sehingga ....",
        hint: null,
        options: ["tulang rusuk terangkat", "tulang rusuk menurun", "volume rongga dada membesar", "tekanan udara menurun"],
        answer: 1,
        explanation: "Saat relaksasi, otot antar tulang rusuk mengendur → tulang rusuk menurun → volume rongga dada mengecil → tekanan udara dalam paru-paru meningkat → udara kaya CO₂ keluar (ekspirasi)."
    },
    {
        question: "Berikut ini yang bukan penyebab terjadinya gangguan pernapasan pada manusia adalah....",
        hint: null,
        options: ["Paparan karbon monoksida dan nikotin", "infeksi Mycobacterium tuberculosa", "infeksi Escherichia coli", "infeksi Corona virus"],
        answer: 2,
        explanation: "Escherichia coli (E. coli) adalah bakteri di usus besar yang menyebabkan gangguan pencernaan (diare), bukan gangguan pernapasan. Pilihan A, B, dan D semuanya dapat menyerang sistem pernapasan."
    },
    // --- SOAL 9-16: SISTEM PENCERNAAN ---
    {
        question: "Proses pencernaan ada dua yaitu secara kimiawi dan mekanik. Proses pencernaan secara mekanik adalah proses ....",
        hint: null,
        options: ["mengubah bentuk makanan menjadi halus", "mengubah bentuk makanan kasar menjadi padat", "mengubah bentuk makanan kasar menjadi cair", "mengubah bentuk makanan kasar menjadi halus hingga manis"],
        answer: 0,
        explanation: "Pencernaan mekanik adalah proses memecah ukuran fisik makanan dari bentuk kasar/besar menjadi lebih kecil dan halus (contoh: dikunyah gigi, diremas dinding lambung). Pencernaan kimiawi menggunakan bantuan enzim."
    },
    {
        question: "Jenis gigi yang berfungsi untuk merobek makanan adalah....",
        hint: null,
        options: ["seri", "taring", "geraham depan", "geraham belakang"],
        answer: 1,
        explanation: "Gigi taring (caninus) berujung runcing, berfungsi untuk merobek/mencabik makanan. Gigi seri memotong, gigi geraham mengunyah dan melumatkan."
    },
    {
        question: "Nasi yang kita kunyah lama akan terasa manis karena ....",
        hint: null,
        options: ["di rongga mulut ada gigi sehingga rasa manis terasa di lidah", "di rongga mulut ada air ludah yang mengandung enzim ptialin", "di rongga mulut terdapat air liur yang mengandung zat gula", "di rongga mulut terdapat zat gula sehingga manis"],
        answer: 1,
        explanation: "Nasi mengandung amilum (zat tepung). Enzim ptialin (amilase) dalam air ludah memecah amilum menjadi maltosa/glukosa (gula sederhana), sehingga nasi terasa manis saat dikunyah lama."
    },
    {
        question: "Gerakan meremas-remas makanan yang dilakukan oleh dinding kerongkongan disebut gerak ....",
        hint: null,
        options: ["Peristaltik", "Memutar", "Lurus", "Parabolik"],
        answer: 0,
        explanation: "Gerak peristaltik adalah gerakan kontraksi dan relaksasi otot polos secara bergelombang pada dinding kerongkongan yang meremas dan mendorong makanan menuju lambung."
    },
    {
        question: "Urutan organ yang dilalui oleh makanan pada proses pencernaan adalah ...",
        hint: null,
        options: ["mulut – tenggorokan – lambung – hati – usus", "mulut – tenggorokan – usus – lambung – anus", "mulut – kerongkongan – hati – lambung – usus", "mulut – kerongkongan – lambung – usus – anus"],
        answer: 3,
        explanation: "Jalur pencernaan yang benar: Mulut → Kerongkongan (esofagus) → Lambung → Usus halus → Usus besar → Anus. Catatan: tenggorokan adalah saluran pernapasan, bukan pencernaan."
    },
    {
        question: "Enzim yang dihasilkan oleh organ X beserta fungsinya yang benar adalah ....",
        hint: null,
        image: "no14.jpg",
        options: ["pepsin, mengubah protein menjadi pepton", "renin, mengubah protein susu menjadi kasein", "tripsin, mengubah protein menjadi asam amino", "asam klorida, membunuh kuman penyakit"],
        answer: 2,
        explanation: "Pankreas menghasilkan 3 enzim utama (PLT): Amilase (mengubah tepung→gula), Lipase (mengubah lemak→asam lemak), dan Tripsin (mengubah protein→asam amino). Pilihan A, B, D adalah fungsi enzim/getah yang diproduksi lambung."
    },
    {
        question: "Proses pencernaan yang terjadi pada lambung adalah penguraian ...",
        hint: null,
        options: ["protein menjadi asam amino", "lemak menjadi asam lemak", "protein menjadi pepton", "zat tepung menjadi gula"],
        answer: 2,
        explanation: "Di lambung, enzim pepsin menguraikan protein menjadi pepton. Renin mengendapkan kasein dari susu. Asam klorida membunuh kuman. Penguraian protein→asam amino terjadi di usus halus (oleh tripsin)."
    },
    {
        question: "Apa fungsi usus halus dan usus besar dalam sistem pencernaan?",
        hint: null,
        options: ["Usus halus menyerap sari-sari makanan, sedangkan usus besar menyerap air dan garam mineral.", "Usus halus menghancurkan makanan, sedangkan usus besar menghasilkan enzim.", "Usus halus menyimpan feses, sedangkan usus besar menyerap sari-sari makanan.", "Usus halus dan usus besar berfungsi untuk mengunyah makanan."],
        answer: 0,
        explanation: "Usus halus adalah tempat penyerapan sari-sari makanan (nutrisi) ke dalam darah. Usus besar bertugas menyerap kembali air dan garam mineral serta membusukkan sisa makanan oleh bakteri E. coli menjadi feses."
    },
    // --- SOAL 17-22: SISTEM PEREDARAN DARAH ---
    {
        question: "Perhatikan fungsi dari organ sistem peredaran darah berikut !\n(1) Memompa darah dari jantung ke seluruh tubuh\n(2) Memompa darah dari jantung ke paru-paru\n(3) Membawa darah yang kaya Oksigen ke seluruh tubuh\n(4) Membawa darah yang kaya Karbondioksida ke seluruh tubuh\n\nBerdasarkan data di atas, fungsi jantung dan pembuluh darah ditunjukkan oleh nomor …",
        hint: null,
        options: ["1 dan 3", "1 dan 4", "2 dan 3", "2 dan 4"],
        answer: 0,
        explanation: "Fungsi jantung adalah memompa darah ke seluruh tubuh (1) atau paru-paru (2). Fungsi pembuluh darah arteri sistemik adalah membawa darah kaya oksigen ke seluruh tubuh (3). Jadi pasangan yang tepat adalah 1 dan 3."
    },
    {
        question: "Organ manusia yang berfungsi untuk memompa darah ke seluruh tubuh yaitu...",
        hint: null,
        options: ["Hati", "Pembuluh darah", "Paru-paru", "Jantung"],
        answer: 3,
        explanation: "Jantung adalah organ utama dalam sistem sirkulasi yang berfungsi sebagai pemompa darah ke seluruh tubuh dan paru-paru melalui kontraksi otot-ototnya."
    },
    {
        question: "Bagian jantung yang berfungsi mencegah bercampurnya darah bersih dan darah kotor adalah ....",
        hint: null,
        options: ["Katup jantung", "Sekat jantung", "Aorta", "Vena"],
        answer: 1,
        explanation: "Sekat jantung (septum cordis) berfungsi memisahkan rongga jantung sebelah kanan (darah kotor) dan kiri (darah bersih). Katup jantung mencegah aliran balik darah antarruang jantung."
    },
    {
        question: "Pembuluh darah yang membawa darah dari jantung ke seluruh tubuh disebut ...",
        hint: null,
        options: ["Vena/Balik", "Arteri/Nadi", "Kapiler", "Paru-paru"],
        answer: 1,
        explanation: "Arteri (pembuluh nadi) adalah pembuluh darah yang membawa darah keluar dari jantung menuju ke seluruh tubuh atau paru-paru."
    },
    {
        question: "Pembuluh darah yang membawa darah menuju jantung disebut ...",
        hint: null,
        options: ["Arteri", "Vena", "Kapiler", "Aorta"],
        answer: 1,
        explanation: "Vena (pembuluh balik) adalah pembuluh darah yang membawa darah kembali dari seluruh tubuh atau paru-paru menuju ke jantung."
    },
    {
        question: "Perhatikan gambar berikut!\n\nProses aliran peredaran darah besar pada manusia ditunjukkan oleh nomor....",
        hint: null,
        image: "no22.jpg",
        options: ["4-7-1", "4-7-6", "3-5-2", "3-5-4"],
        answer: 0,
        explanation: "Mekanisme peredaran darah besar adalah: Bilik Kiri (4) → Seluruh Tubuh (6/7) → Serambi Kanan (1)."
    },
    {
        question: "Seseorang yang darahnya kekurangan Hb(hemoglobin) akan mengalami pusing. Penyakit tersebut dinamakan...",
        hint: null,
        options: ["Hipertensi", "Leukimia", "Anemia", "Hemofilia"],
        answer: 2,
        explanation: "Anemia: kekurangan Hb sehingga tubuh kekurangan pasokan oksigen.<br>Hipertensi: tekanan darah tinggi.<br>Leukimia: kanker darah akibat produksi sel darah putih berlebih.<br>Hemofilia: penyakit keturunan dimana darah sulit membeku saat terjadi luka."
    },
    {
        question: "Plasma darah merupakan bagian darah yang berfungsi untuk mengangkut....",
        hint: null,
        options: ["Serat-serat makanan", "Karbondioksida", "Oksigen", "Hemoglobin"],
        answer: 0,
        explanation: "Plasma darah adalah cairan berwarna kekuningan yang menyusun sekitar 55% dari volume darah. Fungsinya mengangkut sari-sari makanan (nutrisi), hormon, serta zat-zat sisa metabolisme."
    },
    {
        question: "Sel darah merah disebut juga dengan ....",
        hint: null,
        options: ["Trombosit", "Leukosit", "Eritrosit", "Semua salah"],
        answer: 2,
        explanation: "Eritrosit = Sel darah merah (mengandung hemoglobin untuk mengikat oksigen).<br>Leukosit = Sel darah putih (berfungsi untuk sistem kekebalan tubuh).<br>Trombosit = Keping darah (berfungsi dalam proses pembekuan darah)."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion(index) {
    const q = quizData[index];
    answered = false;

    document.getElementById('quiz-question-number').textContent = `SOAL ${index + 1}`;
    
    const imgEl = document.getElementById('quiz-question-image');
    if (q.image) {
        imgEl.src = q.image;
        imgEl.style.display = 'block';
    } else {
        imgEl.style.display = 'none';
        imgEl.src = '';
    }

    document.getElementById('quiz-question-text').innerHTML = q.question.replace(/\n/g, '<br>');
    document.getElementById('quiz-progress-text').textContent = `Soal ${index + 1} / ${quizData.length}`;
    document.getElementById('quiz-progress-bar').style.width = `${((index + 1) / quizData.length) * 100}%`;
    document.getElementById('quiz-explanation').style.display = 'none';
    document.getElementById('quiz-next-btn').style.display = 'none';
    const hintEl = document.getElementById('quiz-question-hint');
    if (q.hint) { hintEl.textContent = q.hint; hintEl.style.display = 'block'; }
    else { hintEl.style.display = 'none'; }

    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = '';
    const labels = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerHTML = `<span style="font-weight:800; margin-right: 0.75rem; color: #f59e0b;">${labels[i]}.</span> ${opt}`;
        btn.style.cssText = `width: 100%; text-align: left; padding: 0.9rem 1.2rem; background: rgba(255,255,255,0.07); border: 1.5px solid rgba(255,255,255,0.15); border-radius: 12px; color: white; font-family: 'Inter', sans-serif; font-size: 1rem; cursor: pointer; transition: all 0.2s;`;
        btn.addEventListener('mouseover', () => { if (!answered) btn.style.background = 'rgba(245,158,11,0.15)'; });
        btn.addEventListener('mouseout', () => { if (!answered) btn.style.background = 'rgba(255,255,255,0.07)'; });
        btn.addEventListener('click', () => selectAnswer(i, btn));
        optionsDiv.appendChild(btn);
    });
}

function selectAnswer(selected, clickedBtn) {
    if (answered) return;
    answered = true;

    const q = quizData[currentQuestion];
    const allBtns = document.getElementById('quiz-options').querySelectorAll('button');

    allBtns.forEach((btn, i) => {
        btn.style.cursor = 'default';
        if (i === q.answer) {
            btn.style.background = 'rgba(16,185,129,0.25)';
            btn.style.borderColor = '#10b981';
        } else if (i === selected && selected !== q.answer) {
            btn.style.background = 'rgba(239,68,68,0.25)';
            btn.style.borderColor = '#ef4444';
        }
    });

    if (selected === q.answer) {
        score++;
        document.getElementById('quiz-score-display').textContent = `Skor: ${score}`;
        document.getElementById('quiz-explanation').style.background = 'rgba(16,185,129,0.1)';
        document.getElementById('quiz-explanation').style.borderColor = 'rgba(16,185,129,0.4)';
        document.getElementById('quiz-explanation-text').style.color = '#a7f3d0';
        document.getElementById('quiz-explanation-text').innerHTML = `✅ <strong>Benar!</strong> ${q.explanation}`;
    } else {
        document.getElementById('quiz-explanation').style.background = 'rgba(239,68,68,0.1)';
        document.getElementById('quiz-explanation').style.borderColor = 'rgba(239,68,68,0.4)';
        document.getElementById('quiz-explanation-text').style.color = '#fca5a5';
        document.getElementById('quiz-explanation-text').innerHTML = `❌ <strong>Kurang tepat.</strong> ${q.explanation}`;
    }

    document.getElementById('quiz-explanation').style.display = 'block';

    const nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.style.display = 'inline-block';
    if (currentQuestion === quizData.length - 1) {
        nextBtn.textContent = '🏁 Lihat Hasil';
    } else {
        nextBtn.textContent = 'Soal Berikutnya ➡️';
    }
}

document.getElementById('quiz-next-btn').addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion(currentQuestion);
    } else {
        showResult();
    }
});

document.getElementById('quiz-restart-btn').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-score-display').textContent = 'Skor: 0';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    loadQuestion(0);
});

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('result-score').textContent = `${score} / ${quizData.length}`;
    const pct = (score / quizData.length) * 100;
    let msg = '';
    if (pct === 100) msg = '🌟 Sempurna! Kamu menguasai materi ini dengan sangat baik!';
    else if (pct >= 75) msg = '👍 Bagus sekali! Teruslah belajar untuk menjadi lebih baik!';
    else if (pct >= 50) msg = '📚 Lumayan! Coba pelajari kembali materi yang belum dipahami ya.';
    else msg = '💪 Jangan menyerah! Baca lagi materinya dan coba ulangi kuis ini.';
    document.getElementById('result-message').textContent = msg;
}

// Initialize quiz when slide-4 becomes active
const slide4 = document.getElementById('slide-4');
const observer = new MutationObserver(() => {
    if (slide4.classList.contains('active-slide')) {
        currentQuestion = 0;
        score = 0;
        document.getElementById('quiz-score-display').textContent = 'Skor: 0';
        document.getElementById('quiz-result').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        loadQuestion(0);
    }
});
observer.observe(slide4, { attributes: true, attributeFilter: ['class'] });
