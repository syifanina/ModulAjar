document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const startBtn = document.getElementById('start-btn');
    const homeBtn = document.getElementById('home-btn');
    const skorBtn = document.getElementById('skor-btn');
    const currentScoreEl = document.getElementById('current-score');
    const quizContainer = document.getElementById('quiz-container');
    const quizCompletion = document.getElementById('quiz-completion');
    const finalScoreText = document.getElementById('final-score-text');
    const pembahasanOverlay = document.getElementById('pembahasan-overlay');
    const pembahasanText = document.getElementById('pembahasan-text');
    const closePembahasanBtn = document.getElementById('close-pembahasan');
    const sfSubmitBtn = document.getElementById('sf-submit');
    const sfContainer = document.getElementById('sf-container');
    const sfSuccess = document.getElementById('sf-success');

    // State Variables
    let currentQuizState = [];
    let score = 0;
    let questionsAnswered = 0;
    let activeQuestionIndex = -1;

    const LETTERS = ['A', 'B', 'C', 'D'];

    // Data Soal
    const currentQuestions = [
        {
            q: "1. Tradisi Sasi di Maluku mengajarkan masyarakat untuk tidak mengambil hasil alam pada waktu tertentu. Tujuan utama tradisi Sasi adalah …",
            opts: ["membuat masyarakat takut ke laut", "menjaga alam agar tidak rusak", "melarang semua orang bekerja", "membuat hasil alam cepat habis"],
            ans: 1,
            pembahasan: "Tradisi Sasi bertujuan agar hasil alam memiliki waktu untuk berkembang biak sehingga tidak rusak atau habis."
        },
        {
            q: "2. Masyarakat desa sepakat tidak mengambil ikan di sungai selama beberapa bulan agar ikan dapat berkembang biak. Kegiatan tersebut mirip dengan nilai kearifan lokal …",
            opts: ["Ngaben", "Sasi", "Tumpengan", "Marakka Bola"],
            ans: 1,
            pembahasan: "Kegiatan tidak mengambil hasil alam untuk sementara waktu serupa dengan tradisi Sasi dari Maluku."
        },
        {
            q: "3. Upacara Ngaben berasal dari Bali. Upacara ini berkaitan dengan …",
            opts: ["penghormatan kepada orang yang sudah meninggal", "pemindahan rumah secara bersama-sama", "pengaturan air sawah", "larangan mengambil hasil laut"],
            ans: 0,
            pembahasan: "Upacara Ngaben adalah upacara pembakaran mayat umat Hindu di Bali sebagai bentuk penghormatan."
        },
        {
            q: "4. Nilai yang dapat dipelajari dari upacara Ngaben adalah …",
            opts: ["hidup boros dan bermewah-mewahan", "menghormati keluarga dan adat istiadat", "mengambil hasil alam sebanyak-banyaknya", "meninggalkan budaya daerah"],
            ans: 1,
            pembahasan: "Upacara Ngaben mengajarkan kita untuk selalu menghormati leluhur, keluarga, serta melestarikan adat istiadat."
        },
        {
            q: "5. Tradisi Marakka Bola dilakukan dengan cara memindahkan rumah panggung secara bersama-sama. Nilai utama dari tradisi ini adalah …",
            opts: ["persaingan", "gotong royong", "malas bekerja", "hidup sendiri-sendiri"],
            ans: 1,
            pembahasan: "Marakka Bola menunjukkan nilai kebersamaan dan gotong royong yang tinggi di masyarakat."
        },
        {
            q: "6. Jika warga bekerja sama mengangkat rumah tetangga yang akan dipindahkan, maka sikap yang ditunjukkan adalah …",
            opts: ["egois", "acuh tak acuh", "gotong royong", "sombong"],
            ans: 2,
            pembahasan: "Bekerja sama untuk meringankan beban orang lain adalah perwujudan sikap gotong royong."
        },
        {
            q: "7. Sistem Subak di Bali digunakan untuk mengatur …",
            opts: ["pembagian air sawah", "kegiatan menangkap ikan", "pembuatan rumah adat", "acara kelahiran bayi"],
            ans: 0,
            pembahasan: "Subak adalah sistem pengaturan tata irigasi atau pembagian air sawah yang adil di Bali."
        },
        {
            q: "8. Mengapa sistem Subak bermanfaat bagi petani?",
            opts: ["Karena petani dapat berebut air sesuka hati.", "Karena air sawah dapat dibagi secara adil.", "Karena sawah tidak perlu dirawat.", "Karena semua petani dilarang menanam padi."],
            ans: 1,
            pembahasan: "Sistem Subak memastikan setiap petani mendapatkan jatah air irigasi yang adil untuk sawahnya."
        },
        {
            q: "9. Dalihan Na Tolu merupakan falsafah masyarakat Batak yang berkaitan dengan hubungan kekerabatan dan kehidupan sosial. Nilai yang sesuai dengan Dalihan Na Tolu adalah …",
            opts: ["saling menghormati dan membantu", "saling mengejek adat lain", "hidup tanpa aturan", "bekerja hanya untuk diri sendiri"],
            ans: 0,
            pembahasan: "Falsafah Dalihan Na Tolu mengajarkan prinsip saling menghormati peran setiap anggota keluarga dalam masyarakat."
        },
        {
            q: "10. Dalam kehidupan sehari-hari, contoh penerapan nilai Dalihan Na Tolu adalah …",
            opts: ["menolak membantu keluarga saat ada acara adat", "menghormati orang tua dan bekerja sama dengan keluarga", "mengejek teman yang berbeda suku", "tidak mau ikut kegiatan masyarakat"],
            ans: 1,
            pembahasan: "Menghormati keluarga dan bekerja sama sangat mencerminkan nilai dari falsafah Dalihan Na Tolu."
        },
        {
            q: "11. Berikut ini yang termasuk kegiatan literasi kearifan lokal adalah …",
            opts: ["membaca cerita tentang tradisi daerah lalu menceritakan kembali isinya", "bermain gim sepanjang hari", "membuang sampah di sungai", "menertawakan pakaian adat teman"],
            ans: 0,
            pembahasan: "Mempelajari dan menceritakan tradisi adalah bagian dari upaya melestarikan literasi kearifan lokal."
        },
        {
            q: "12. Bu Syifa meminta siswa mewawancarai orang tua tentang tradisi daerah, lalu menuliskan hasilnya di buku. Kegiatan tersebut termasuk literasi kearifan lokal karena siswa …",
            opts: ["hanya menyalin jawaban teman", "mencari informasi, membaca, menulis, dan memahami budaya daerah", "bermain tanpa tujuan", "menghafal tanpa memahami makna budaya"],
            ans: 1,
            pembahasan: "Mewawancarai dan menulis tentang tradisi melatih siswa untuk lebih memahami akar budayanya."
        },
        {
            q: "13. Tradisi Bebie berkaitan dengan kegiatan menanam dan memanen padi secara bersama-sama. Nilai utama tradisi Bebie adalah …",
            opts: ["gotong royong dan rasa syukur", "persaingan antarpetani", "membuang hasil panen", "melarang masyarakat bertani"],
            ans: 0,
            pembahasan: "Bebie adalah wujud gotong royong sekaligus rasa syukur kepada Sang Pencipta atas hasil bumi."
        },
        {
            q: "14. Tradisi tumpengan biasanya dilakukan sebagai ungkapan rasa syukur. Contoh sikap yang sesuai dengan makna tumpengan adalah …",
            opts: ["membagikan makanan kepada orang lain saat acara syukuran", "menyimpan semua makanan sendiri", "membuang makanan karena tidak suka", "mengejek makanan tradisional"],
            ans: 0,
            pembahasan: "Tumpengan mengajarkan kita untuk berbagi keberkahan dengan membagikan makanan kepada orang lain."
        },
        {
            q: "15. Di sekolah, siswa belajar tentang Sasi, Subak, Ngaben, Marakka Bola, Dalihan Na Tolu, Bebie, dan Tumpengan. Kesimpulan yang paling tepat tentang kearifan lokal adalah …",
            opts: ["semua tradisi daerah harus dihapus agar sama", "kearifan lokal mengandung nilai baik seperti gotong royong, syukur, menjaga alam, dan menghormati sesama", "kearifan lokal hanya boleh dipelajari orang dewasa", "budaya daerah tidak berhubungan dengan kehidupan sehari-hari"],
            ans: 1,
            pembahasan: "Setiap kearifan lokal selalu membawa nilai-nilai positif untuk kebaikan hidup bermasyarakat."
        },
        {
            type: 'dnd',
            q: "16. Nilai-nilai budaya yang diwariskan secara turun-temurun disebut dengan [ __________ ].",
            opts: ["kearifan lokal", "adat baru", "teknologi modern"],
            ans: 0,
            pembahasan: "Kearifan lokal adalah kebudayaan dan nilai luhur yang diturunkan dari generasi ke generasi."
        },
        {
            type: 'dnd',
            q: "17. Kesenian beladiri dari daerah DKI Jakarta adalah [ __________ ].",
            opts: ["pencak silat", "tari saman", "karapan sapi"],
            ans: 0,
            pembahasan: "Pencak silat adalah seni beladiri tradisional khas Indonesia, yang sangat kental di budaya Betawi (Jakarta)."
        },
        {
            type: 'dnd',
            q: "18. Festival Busana Jember bertujuan untuk [ __________ ].",
            opts: ["menampilkan kreativitas busana", "menangkap ikan bersama", "memindahkan rumah"],
            ans: 0,
            pembahasan: "Jember Fashion Carnaval atau festival busana diadakan untuk menampilkan kreativitas busana yang unik."
        },
        {
            type: 'dnd',
            q: "19. Tradisi masyarakat Bugis yang dikenal juga sebagai tradisi Mappalette dan sudah berlangsung turun-temurun disebut [ __________ ].",
            opts: ["Marakka Bola", "Ngaben", "Subak"],
            ans: 0,
            pembahasan: "Marakka Bola (atau Mappalette Bola) adalah tradisi gotong royong memindahkan rumah di suku Bugis."
        },
        {
            type: 'dnd',
            q: "20. Contoh kesenian yang menceritakan kisah kehidupan dengan bantuan seorang dalang dalam pertunjukannya adalah [ __________ ].",
            opts: ["wayang", "ondel-ondel", "reog"],
            ans: 0,
            pembahasan: "Wayang adalah seni pertunjukan yang dimainkan oleh seorang dalang, menceritakan banyak pesan moral."
        }
    ];

    const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSffcSf2OttqXaxRZ0851tP3DfmVJCViMF9hhX9QeMmdhaVcUQ/formResponse';
    const SHEET_ID = '1dFdBKZRljusdWURuY_b0pqCvx5di43CtDyMrbXG2-LE';
    const ENTRIES = { name: 'entry.1213707375', kelas: 'entry.1684304480', skor: 'entry.1261566766' };

    function switchScreen(hideScreen, showScreen) {
        hideScreen.classList.remove('active');
        showScreen.classList.add('active');
    }

    startBtn.addEventListener('click', () => {
        score = 0;
        questionsAnswered = 0;
        currentScoreEl.textContent = "0";
        
        currentQuizState = currentQuestions.map(() => ({ locked: false, correct: false, attempts: 0 }));
        
        quizCompletion.style.display = 'none';
        renderQuiz();
        switchScreen(startScreen, quizScreen);
    });

    homeBtn.addEventListener('click', () => {
        if(confirm('Yakin ingin kembali ke awal? Progres kuis akan hilang.')) {
            switchScreen(quizScreen, startScreen);
        }
    });

    skorBtn.addEventListener('click', () => {
        const pass = prompt("Masukkan kode akses guru untuk melihat papan skor penuh:");
        if(pass === "1801") {
            loadHallOfFame('hof-grid', 'hof-wrapper');
            document.getElementById('hof-wrapper').style.display = 'block';
            quizCompletion.style.display = 'block';
            quizCompletion.scrollIntoView({ behavior: 'smooth' });
        } else if (pass !== null) {
            alert("Kode salah!");
        }
    });

    function renderQuiz() {
        quizContainer.innerHTML = '';
        currentQuestions.forEach((q, qi) => {
            const card = document.createElement('div');
            card.className = 'q-card';
            card.id = `q-card-${qi}`;
            
            if (q.type === 'dnd') {
                let choicesHtml = q.opts.map((opt, oi) => 
                    `<div class="dnd-choice-item" id="dnd-choice-${qi}-${oi}" draggable="true" ondragstart="dragStart(event, ${qi}, ${oi})">${opt}</div>`
                ).join('');
                
                let parts = q.q.split('[ __________ ]');
                let sentenceHtml = `${parts[0]}<div class="dnd-drop-zone" id="dnd-drop-${qi}" ondragover="allowDrop(event)" ondrop="handleDrop(event, ${qi})">Tarik jawaban ke sini</div>${parts[1] || ''}`;
                
                card.innerHTML = `
                    <div class="q-header">
                        <span class="q-num-badge" id="q-badge-${qi}">${qi + 1}</span>
                        <div class="q-text" style="width: 100%;">${sentenceHtml}</div>
                    </div>
                    <div class="dnd-container">
                        <div class="dnd-choices" id="dnd-choices-${qi}">
                            ${choicesHtml}
                        </div>
                    </div>
                    <div class="q-feedback" id="q-fb-${qi}"></div>
                `;
            } else {
                let optionsHtml = q.opts.map((opt, oi) => 
                    `<button class="q-opt" id="q-opt-${qi}-${oi}" onclick="handleAnswer(${qi}, ${oi})">
                        <span class="opt-letter">${LETTERS[oi]}</span>
                        <span class="opt-text">${opt}</span>
                    </button>`
                ).join('');
                
                card.innerHTML = `
                    <div class="q-header">
                        <span class="q-num-badge" id="q-badge-${qi}">${qi + 1}</span>
                        <div class="q-text">${q.q}</div>
                    </div>
                    <div class="q-opts" id="q-opts-${qi}">
                        ${optionsHtml}
                    </div>
                    <div class="q-feedback" id="q-fb-${qi}"></div>
                `;
            }
            quizContainer.appendChild(card);
        });
    }

    // Standard PG Handler
    window.handleAnswer = function(qi, oi) {
        const state = currentQuizState[qi];
        if (state.locked) return;
        
        state.attempts = (state.attempts || 0) + 1;
        
        const q = currentQuestions[qi];
        const isCorrect = (oi === q.ans);
        const fb = document.getElementById(`q-fb-${qi}`);
        const selectedBtn = document.getElementById(`q-opt-${qi}-${oi}`);
        
        if (isCorrect) {
            state.locked = true;
            questionsAnswered++;
            document.querySelectorAll(`#q-opts-${qi} .q-opt`).forEach(btn => btn.disabled = true);
            
            state.correct = true;
            score += 1; // PG: +1
            currentScoreEl.textContent = score;
            
            selectedBtn.classList.add('opt-correct');
            fb.className = 'q-feedback fb-correct';
            fb.textContent = '✅ Benar! Hebat!';
            
            setTimeout(() => showPembahasan(q.pembahasan, true, qi), 500);
            addReviewButton(qi);
        } else {
            selectedBtn.classList.add('opt-wrong');
            
            state.locked = true;
            questionsAnswered++;
            document.querySelectorAll(`#q-opts-${qi} .q-opt`).forEach(btn => btn.disabled = true);
            
            fb.className = 'q-feedback fb-wrong';
            fb.textContent = '❌ Kurang tepat.';
            
            const correctBtn = document.getElementById(`q-opt-${qi}-${q.ans}`);
            if(correctBtn) {
                correctBtn.classList.add('opt-correct');
                correctBtn.style.animation = 'pulse 1s infinite';
            }
            
            setTimeout(() => showPembahasan(q.pembahasan, false, qi), 1000);
            addReviewButton(qi);
        }
    };

    // Drag and Drop Handlers
    window.allowDrop = function(ev) {
        ev.preventDefault();
        ev.target.classList.add('drag-over');
    };

    window.dragStart = function(ev, qi, oi) {
        const state = currentQuizState[qi];
        if (state.locked) {
            ev.preventDefault();
            return;
        }
        ev.dataTransfer.setData("text/plain", JSON.stringify({ qi, oi }));
    };

    window.handleDrop = function(ev, dropQi) {
        ev.preventDefault();
        ev.target.classList.remove('drag-over');
        
        const state = currentQuizState[dropQi];
        if (state.locked) return;
        
        try {
            const data = JSON.parse(ev.dataTransfer.getData("text/plain"));
            const { qi: dragQi, oi } = data;
            
            if (dragQi !== dropQi) return;
            
            state.attempts = (state.attempts || 0) + 1;
            
            const q = currentQuestions[dropQi];
            const isCorrect = (oi === q.ans);
            const dropZone = document.getElementById(`dnd-drop-${dropQi}`);
            const fb = document.getElementById(`q-fb-${dropQi}`);
            const draggedItem = document.getElementById(`dnd-choice-${dropQi}-${oi}`);
            
            if (isCorrect) {
                state.locked = true;
                questionsAnswered++;
                
                dropZone.textContent = q.opts[oi];
                dropZone.className = 'dnd-drop-zone correct-drop';
                draggedItem.classList.add('hidden');
                
                state.correct = true;
                score += 3; // DND: +3
                currentScoreEl.textContent = score;
                
                fb.className = 'q-feedback fb-correct';
                fb.textContent = '✅ Benar! Hebat!';
                
                setTimeout(() => showPembahasan(q.pembahasan, true, dropQi), 500);
                addReviewButton(dropQi);
                
                const choicesContainer = document.getElementById(`dnd-choices-${dropQi}`);
                choicesContainer.style.opacity = '0.5';
                choicesContainer.style.pointerEvents = 'none';
            } else {
                dropZone.className = 'dnd-drop-zone wrong-drop';
                dropZone.textContent = q.opts[oi];
                
                if (state.attempts < 2) {
                    fb.className = 'q-feedback fb-wrong';
                    fb.textContent = '❌ Kurang tepat. Coba lagi!';
                    
                    setTimeout(() => {
                        dropZone.className = 'dnd-drop-zone';
                        dropZone.textContent = 'Tarik jawaban ke sini';
                        fb.textContent = '';
                    }, 1200);
                } else {
                    state.locked = true;
                    questionsAnswered++;
                    
                    dropZone.textContent = q.opts[q.ans];
                    dropZone.className = 'dnd-drop-zone wrong-drop';
                    dropZone.style.background = '#e74c3c';
                    
                    fb.className = 'q-feedback fb-wrong';
                    fb.textContent = '❌ Masih kurang tepat.';
                    
                    setTimeout(() => showPembahasan(q.pembahasan, false, dropQi), 1000);
                    addReviewButton(dropQi);
                    
                    const choicesContainer = document.getElementById(`dnd-choices-${dropQi}`);
                    choicesContainer.style.opacity = '0.5';
                    choicesContainer.style.pointerEvents = 'none';
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Prevent default dragover behavior
    document.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    document.addEventListener("dragleave", function(event) {
        if (event.target.classList && event.target.classList.contains('dnd-drop-zone')) {
            event.target.classList.remove('drag-over');
        }
    });

    function addReviewButton(qi) {
        const fb = document.getElementById(`q-fb-${qi}`);
        const btn = document.createElement('button');
        btn.className = 'review-btn';
        btn.innerHTML = '📖 Lihat Pembahasan';
        btn.onclick = () => showPembahasan(currentQuestions[qi].pembahasan, currentQuizState[qi].correct, qi);
        fb.appendChild(btn);
        
        if (questionsAnswered >= currentQuestions.length) {
            quizCompletion.style.display = 'block';
            let finalScore = Math.round((score / 3) * 10); // Formula: (score / 3) * 10
            finalScoreText.textContent = finalScore;
            quizCompletion.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function showPembahasan(text, isCorrect, qi) {
        activeQuestionIndex = qi;
        const resultEmoji = isCorrect ? '🌟 Luar Biasa!' : '💪 Tetap Semangat!';
        pembahasanText.innerHTML = `
            <div style="font-size: 1.3rem; margin-bottom: 10px; font-weight: bold; color: ${isCorrect ? '#27ae60' : '#e67e22'}">
                ${resultEmoji}
            </div>
            ${text}
        `;
        pembahasanOverlay.classList.add('visible');
    }

    closePembahasanBtn.addEventListener('click', () => {
        pembahasanOverlay.classList.remove('visible');
        if (activeQuestionIndex !== -1) {
            const nextCard = document.getElementById(`q-card-${activeQuestionIndex + 1}`);
            if (nextCard) {
                nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Form Submission
    if (sfSubmitBtn) {
        sfSubmitBtn.addEventListener('click', () => {
            const name = document.getElementById('sf-name').value.trim();
            const kelas = document.getElementById('sf-kelas').value;
            
            if (!name || !kelas) {
                alert('Tolong isi Nama dan Kelas terlebih dahulu ya!');
                return;
            }

            if (!FORM_URL || !SHEET_ID) {
                alert('Konfigurasi Google Form/Sheet belum diatur. Silakan masukkan link Form dan Sheet.');
                return;
            }

            sfSubmitBtn.disabled = true;
            sfSubmitBtn.textContent = 'Mengirim... ⏳';
            
            let finalScore = Math.round((score / 3) * 10);

            const body = new URLSearchParams();
            body.append(ENTRIES.name, name);
            body.append(ENTRIES.kelas, kelas);
            body.append(ENTRIES.skor, finalScore.toString());

            fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body: body })
                .then(() => {
                    sfContainer.style.display = 'none';
                    sfSuccess.style.display = 'block';
                    document.getElementById('sf-final-report').innerHTML = `Hebat <strong>${name}</strong>!<br>Kamu mendapat skor akhir <strong>${finalScore}</strong>.`;
                    
                    const hofWrapper = document.getElementById('hof-wrapper');
                    if(hofWrapper) {
                        hofWrapper.style.display = 'block';
                        loadHallOfFame('hof-grid', 'hof-wrapper');
                        hofWrapper.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert('Yaaah, gagal mengirim nilai. Cek koneksi internetmu ya.');
                    sfSubmitBtn.disabled = false;
                    sfSubmitBtn.textContent = 'Coba Lagi';
                });
        });
    }

    async function loadHallOfFame(gridId = 'hof-grid', containerId = 'hof-wrapper') {
        const GID = '0';
        if (!SHEET_ID) return;
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;

        const grid = document.getElementById(gridId);
        grid.innerHTML = '<div class="hof-loading">Mengambil data dari awan... ☁️</div>';

        try {
            const response = await fetch(url);
            const text = await response.text();
            
            const jsonStr = text.match(/(?<=.*\().*(?=\);)/s)[0];
            const data = JSON.parse(jsonStr);

            let rows = data.table.rows.map(row => {
                return {
                    timestamp: row.c[0] ? row.c[0].v : '',
                    nama: row.c[1] ? row.c[1].v : '',
                    kelas: row.c[2] ? row.c[2].v : '',
                    skor: row.c[3] ? row.c[3].v : 0
                };
            });

            // Filter out empty rows
            rows = rows.filter(r => r.nama !== '');
            // Sort by score descending
            rows.sort((a, b) => {
                const scoreA = parseFloat(a.skor) || 0;
                const scoreB = parseFloat(b.skor) || 0;
                return scoreB - scoreA;
            });

            if (rows.length === 0) {
                grid.innerHTML = '<div class="hof-empty">Belum ada nilai. Jadilah yang pertama! 🚀</div>';
                return;
            }

            grid.innerHTML = '';
            rows.forEach((r, idx) => {
                let medal = '';
                if (idx === 0) medal = '🥇 ';
                else if (idx === 1) medal = '🥈 ';
                else if (idx === 2) medal = '🥉 ';

                grid.innerHTML += `
                    <div class="hof-card">
                        <div class="hof-info">
                            <div class="hof-name">${medal}${r.nama}</div>
                            <div class="hof-kelas">${r.kelas}</div>
                        </div>
                        <div class="hof-score">${r.skor}</div>
                    </div>
                `;
            });

        } catch (e) {
            console.error('Error fetching sheet:', e);
            grid.innerHTML = '<div class="hof-empty" style="color: #e74c3c;">Gagal memuat papan skor 😢</div>';
        }
    }
});
