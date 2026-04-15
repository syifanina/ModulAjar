// ========================================
// 2Teks – Multi-Slide Interactive Script
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // ========== PPT VIEWPORT SCALING ==========
    const appContainer = document.querySelector('.app-container');
    function scaleToFit() {
        const scaleX = window.innerWidth / 1920;
        const scaleY = window.innerHeight / 1080;
        const scale = Math.min(scaleX, scaleY);
        appContainer.style.transform = `scale(${scale})`;
    }
    scaleToFit();
    window.addEventListener('resize', scaleToFit);

    // ========== SOUND EFFECTS ==========
    const AudioCtx = window.AudioContext || window.webkitAudioContext;

    function playCorrectSound() {
        try {
            const ctx = new AudioCtx();
            const now = ctx.currentTime;
            // Ascending happy notes: C5 → E5 → G5
            [523.25, 659.25, 783.99].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + i * 0.1);
                gain.gain.setValueAtTime(0.18, now + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.1);
                osc.stop(now + i * 0.1 + 0.3);
            });
            setTimeout(() => ctx.close(), 1000);
        } catch (e) { /* Audio not supported */ }
    }

    function playWrongSound() {
        try {
            const ctx = new AudioCtx();
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.linearRampToValueAtTime(150, now + 0.3);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.35);
            setTimeout(() => ctx.close(), 800);
        } catch (e) { /* Audio not supported */ }
    }

    function playCompleteSound() {
        try {
            const ctx = new AudioCtx();
            const now = ctx.currentTime;
            [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + i * 0.12);
                gain.gain.setValueAtTime(0.2, now + i * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.4);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.12);
                osc.stop(now + i * 0.12 + 0.4);
            });
            setTimeout(() => ctx.close(), 1500);
        } catch (e) {}
    }

    function playTickSound() {
        try {
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            gain.gain.setValueAtTime(0.06, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.05);
            setTimeout(() => ctx.close(), 200);
        } catch (e) {}
    }

    // ========== SPIN WHEEL ==========
    const wheelNames = [
        'Shofwa','Astha','Agha','Alby','Arkan','Nanta','Aydan','Ayra',
        'El','Fienna','Ghaniya','Hizba','Ibra','Kahfi','Keenan','Khairy',
        'Mecca','Mirza','Anwar','Athar','Naura','Nayla','Oliv','Eyza',
        'Rafazaky','Raihan','Raka','Biya','Syatira','Fya','Yumna','Zavier'
    ];

    const wheelColors = [
        '#ff6b6b','#feca57','#48dbfb','#ff9ff3','#55efc4','#a29bfe','#fd79a8','#fdcb6e',
        '#74b9ff','#00cec9','#e17055','#6c5ce7','#81ecec','#fab1a0','#dfe6e9','#00b894',
        '#ff6b6b','#feca57','#48dbfb','#ff9ff3','#55efc4','#a29bfe','#fd79a8','#fdcb6e',
        '#74b9ff','#00cec9','#e17055','#6c5ce7','#81ecec','#fab1a0','#dfe6e9','#00b894'
    ];

    const canvas = document.getElementById('wheel-canvas');
    const ctxW = canvas ? canvas.getContext('2d') : null;
    const numSlices = wheelNames.length;
    const sliceAngle = (2 * Math.PI) / numSlices;
    const canvasSize = 520;
    const center = canvasSize / 2;
    const radius = 240;
    let wheelRotation = 0;
    let isSpinning = false;

    function drawWheel(rotation) {
        if (!ctxW) return;
        ctxW.clearRect(0, 0, canvasSize, canvasSize);

        for (let i = 0; i < numSlices; i++) {
            const start = rotation + i * sliceAngle - Math.PI / 2;
            const end = start + sliceAngle;

            // Slice
            ctxW.beginPath();
            ctxW.moveTo(center, center);
            ctxW.arc(center, center, radius, start, end);
            ctxW.closePath();
            ctxW.fillStyle = wheelColors[i];
            ctxW.fill();
            ctxW.strokeStyle = '#fff';
            ctxW.lineWidth = 2;
            ctxW.stroke();

            // Name text
            ctxW.save();
            ctxW.translate(center, center);
            ctxW.rotate(start + sliceAngle / 2);
            ctxW.textAlign = 'right';
            ctxW.fillStyle = '#2d3436';
            ctxW.font = 'bold 13px Nunito, sans-serif';
            ctxW.fillText(wheelNames[i], radius - 14, 5);
            ctxW.restore();
        }

        // Center circle
        ctxW.beginPath();
        ctxW.arc(center, center, 32, 0, 2 * Math.PI);
        ctxW.fillStyle = '#fff';
        ctxW.fill();
        ctxW.strokeStyle = '#2d3436';
        ctxW.lineWidth = 3;
        ctxW.stroke();

        // Center dot
        ctxW.beginPath();
        ctxW.arc(center, center, 8, 0, 2 * Math.PI);
        ctxW.fillStyle = '#d63031';
        ctxW.fill();
    }

    // Initial draw
    drawWheel(0);

    function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;

        const spinBtn = document.getElementById('wheel-spin-btn');
        const closeBtn = document.getElementById('wheel-close-btn');
        const resultDiv = document.getElementById('wheel-result');

        spinBtn.classList.add('disabled');
        resultDiv.classList.add('hidden');
        closeBtn.classList.add('hidden');

        const spinDuration = 2000;
        const totalRotation = (6 + Math.random() * 6) * 2 * Math.PI;
        const startRotation = wheelRotation;
        const startTime = performance.now();
        let lastTickSlice = -1;

        function animate(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / spinDuration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            wheelRotation = startRotation + eased * totalRotation;

            drawWheel(wheelRotation);

            // Tick sound when crossing slices
            const currentSlice = Math.floor(((wheelRotation % (2 * Math.PI)) / sliceAngle));
            if (currentSlice !== lastTickSlice) {
                lastTickSlice = currentSlice;
                if (progress < 0.9) playTickSound();
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Determine winner - pointer is at top (- PI/2)
                const normalAngle = ((2 * Math.PI) - (wheelRotation % (2 * Math.PI))) % (2 * Math.PI);
                const winnerIdx = Math.floor(normalAngle / sliceAngle) % numSlices;

                isSpinning = false;
                playCompleteSound();

                resultDiv.textContent = `🎉 ${wheelNames[winnerIdx]} yang membaca!`;
                resultDiv.classList.remove('hidden');
                spinBtn.classList.remove('disabled');
                closeBtn.classList.remove('hidden');
            }
        }

        requestAnimationFrame(animate);
    }

    // Wheel modal controls
    const wheelModal = document.getElementById('wheel-modal');
    const spinTrigger = document.getElementById('spin-trigger');
    const wheelSpinBtn = document.getElementById('wheel-spin-btn');
    const wheelCloseBtn = document.getElementById('wheel-close-btn');

    if (spinTrigger) {
        spinTrigger.addEventListener('click', () => {
            wheelModal.classList.remove('hidden');
        });
    }

    if (wheelSpinBtn) {
        wheelSpinBtn.addEventListener('click', spinWheel);
    }

    if (wheelCloseBtn) {
        wheelCloseBtn.addEventListener('click', () => {
            wheelModal.classList.add('hidden');
        });
    }
    // ========== SLIDE NAVIGATION ==========
    let currentSlide = 0;
    const totalSlides = 4;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    // Track completion per slide
    const slideComplete = [true, false, false, false]; // Slide 0 is just reading

    function goToSlide(idx) {
        if (idx < 0 || idx >= totalSlides) return;
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        if (slideComplete[currentSlide]) dots[currentSlide].classList.add('done');

        currentSlide = idx;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        dots[currentSlide].classList.remove('done');

        // Prev button
        btnPrev.classList.toggle('hidden', currentSlide === 0);

        // Next button
        if (currentSlide === totalSlides - 1) {
            btnNext.classList.add('hidden');
        } else {
            btnNext.classList.remove('hidden');
            btnNext.classList.toggle('disabled', !slideComplete[currentSlide]);
        }
    }

    function updateNextBtn() {
        if (currentSlide < totalSlides - 1) {
            btnNext.classList.toggle('disabled', !slideComplete[currentSlide]);
        }
    }

    btnNext.addEventListener('click', () => {
        if (slideComplete[currentSlide] && currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentSlide > 0) goToSlide(currentSlide - 1);
    });

    // Initial state
    goToSlide(0);

    // ========== SLIDE 2: Click Important Sentence ==========
    const s2CorrectIdx = { '1': '0', '2': '3' }; // text1→sentence0, text2→sentence3
    const s2Found = { '1': false, '2': false };

    document.querySelectorAll('.s2-sentence').forEach(sentence => {
        sentence.addEventListener('click', () => {
            const textNum = sentence.dataset.text;
            if (s2Found[textNum]) return; // Already found for this text

            const idx = sentence.dataset.idx;

            if (idx === s2CorrectIdx[textNum]) {
                // CORRECT
                sentence.classList.add('correct-pick');
                s2Found[textNum] = true;
                playCorrectSound();

                // Lock other sentences in this text
                document.querySelectorAll(`.s2-sentence[data-text="${textNum}"]`).forEach(s => {
                    if (s !== sentence) s.classList.add('locked');
                });

                // Status
                const status = document.getElementById(`s2-status${textNum}`);
                status.textContent = '✅ Kalimat penting ditemukan!';
                status.classList.add('found');

                // Check if both found
                if (s2Found['1'] && s2Found['2']) {
                    slideComplete[1] = true;
                    updateNextBtn();
                }
            } else {
                // WRONG — shake
                sentence.classList.add('wrong-pick');
                playWrongSound();
                setTimeout(() => sentence.classList.remove('wrong-pick'), 500);
            }
        });
    });

    // ========== SLIDE 3: Drag & Drop ==========
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    const s3State = { 'dz-1': null, 'dz-2': null };
    let dragClone = null;
    let dragSource = null;

    // --- Desktop Drag & Drop ---
    dragItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            dragSource = item;
            item.classList.add('dragging');
            e.dataTransfer.setData('text/plain', item.dataset.answer);
            e.dataTransfer.effectAllowed = 'move';
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
            dragSource = null;
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            const answer = e.dataTransfer.getData('text/plain');
            handleDrop(zone, answer);
        });
    });

    // --- Touch Drag & Drop ---
    dragItems.forEach(item => {
        item.addEventListener('touchstart', (e) => {
            if (item.classList.contains('placed')) return;
            e.preventDefault();
            dragSource = item;
            item.classList.add('dragging');

            // Create visual clone
            dragClone = item.cloneNode(true);
            dragClone.classList.add('drag-clone');
            dragClone.style.width = item.offsetWidth + 'px';
            document.body.appendChild(dragClone);

            const touch = e.touches[0];
            dragClone.style.left = (touch.clientX - item.offsetWidth / 2) + 'px';
            dragClone.style.top = (touch.clientY - 20) + 'px';
        });

        item.addEventListener('touchmove', (e) => {
            if (!dragClone) return;
            e.preventDefault();
            const touch = e.touches[0];
            dragClone.style.left = (touch.clientX - dragClone.offsetWidth / 2) + 'px';
            dragClone.style.top = (touch.clientY - 20) + 'px';

            // Highlight drop zone under finger
            dropZones.forEach(z => z.classList.remove('drag-over'));
            const elem = document.elementFromPoint(touch.clientX, touch.clientY);
            if (elem) {
                const zone = elem.closest('.drop-zone');
                if (zone) zone.classList.add('drag-over');
            }
        });

        item.addEventListener('touchend', (e) => {
            if (!dragClone || !dragSource) return;
            item.classList.remove('dragging');

            const touch = e.changedTouches[0];
            const elem = document.elementFromPoint(touch.clientX, touch.clientY);
            if (elem) {
                const zone = elem.closest('.drop-zone');
                if (zone) {
                    zone.classList.remove('drag-over');
                    handleDrop(zone, dragSource.dataset.answer);
                }
            }

            dragClone.remove();
            dragClone = null;
            dragSource = null;
        });
    });

    function handleDrop(zone, answer) {
        const target = zone.dataset.target; // 'pengertian' or 'manfaat'
        const zoneId = zone.id; // 'dz-1' or 'dz-2'
        const dzNum = zoneId.split('-')[1];
        const placeholder = document.getElementById(`dp-${dzNum}`);
        const droppedDiv = document.getElementById(`dropped-${dzNum}`);

        if (answer === target) {
            // CORRECT
            playCorrectSound();
            zone.classList.add('drop-correct');
            placeholder.classList.add('hidden');
            droppedDiv.textContent = answer === 'pengertian'
                ? '📝 Teks ini lebih banyak menjelaskan pengertian. ✓'
                : '💡 Teks ini lebih banyak menjelaskan manfaat. ✓';
            droppedDiv.classList.add('show', 'correct');
            s3State[zoneId] = answer;

            // Mark drag item as placed
            const dragItem = document.querySelector(`.drag-item[data-answer="${answer}"]`);
            if (dragItem) dragItem.classList.add('placed');

            // Check if both placed correctly
            if (s3State['dz-1'] && s3State['dz-2']) {
                slideComplete[2] = true;
                updateNextBtn();
            }
        } else {
            // WRONG
            playWrongSound();
            zone.classList.add('drop-wrong');
            setTimeout(() => zone.classList.remove('drop-wrong'), 500);
        }
    }

    // ========== SLIDE 4: Step-by-step Table ==========
    const stepAnswers = {
        tema:    { t1: 'definisi-makanan-sehat',           t2: 'manfaat-makanan-sehat' },
        tujuan:  { t1: 'memberikan-definisi',              t2: 'menjelaskan-manfaat' },
        gagasan: { t1: 'menjelaskan-apa-itu-makanan-sehat', t2: 'menjelaskan-manfaat-makanan-sehat' },
        info:    { t1: 'jenis-nutrisi-dan-contoh-makanan',  t2: 'proses-pencernaan-dan-manfaat-kesehatan' }
    };

    const stepOrder = ['tema', 'tujuan', 'gagasan', 'info'];
    let currentStep = 0;

    document.querySelectorAll('.step-check-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const stepName = btn.dataset.step;
            const sel1 = document.getElementById(`${stepName}-t1`);
            const sel2 = document.getElementById(`${stepName}-t2`);
            const correct = stepAnswers[stepName];

            // Reset previous incorrect states
            sel1.classList.remove('select-incorrect');
            sel2.classList.remove('select-incorrect');

            const v1ok = sel1.value === correct.t1;
            const v2ok = sel2.value === correct.t2;

            if (!v1ok) {
                sel1.classList.add('select-incorrect');
                // Re-trigger animation
                sel1.style.animation = 'none';
                sel1.offsetHeight;
                sel1.style.animation = '';
            }
            if (!v2ok) {
                sel2.classList.add('select-incorrect');
                sel2.style.animation = 'none';
                sel2.offsetHeight;
                sel2.style.animation = '';
            }

            if (v1ok && v2ok) {
                // CORRECT — lock this row
                playCorrectSound();
                sel1.classList.add('select-correct');
                sel2.classList.add('select-correct');
                btn.classList.add('hidden');

                const row = document.getElementById(`step-${stepName}`);
                row.classList.add('completed');

                // Show checkmark
                const checkTd = btn.parentElement;
                checkTd.innerHTML = '<span class="row-check-icon">✅</span>';

                currentStep++;

                if (currentStep < stepOrder.length) {
                    // Reveal next row after a short delay
                    setTimeout(() => {
                        const nextRow = document.getElementById(`step-${stepOrder[currentStep]}`);
                        nextRow.classList.add('active');
                    }, 600);
                } else {
                    // ALL DONE — show completion
                    slideComplete[3] = true;
                    setTimeout(() => {
                        playCompleteSound();
                        showCompletion();
                    }, 800);
                }
            } else {
                playWrongSound();
                const fb = document.getElementById('step-feedback');
                fb.textContent = '❌ Belum tepat. Baca ulang teksnya dan coba lagi!';
                fb.style.color = '#d63031';
                fb.style.background = '#fff0ee';
                fb.style.padding = '6px 12px';
                setTimeout(() => {
                    fb.textContent = '';
                    fb.style.background = 'none';
                    fb.style.padding = '0';
                }, 2500);
            }
        });
    });

    // ========== COMPLETION ==========
    function showCompletion() {
        const overlay = document.getElementById('completion-overlay');
        overlay.classList.remove('hidden');
        spawnConfetti();
    }

    function spawnConfetti() {
        const container = document.getElementById('confetti');
        const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#55efc4', '#a29bfe', '#fd79a8'];
        for (let i = 0; i < 40; i++) {
            const span = document.createElement('span');
            span.style.left = Math.random() * 100 + '%';
            span.style.top = '-10px';
            span.style.background = colors[Math.floor(Math.random() * colors.length)];
            span.style.animationDelay = (Math.random() * 0.8) + 's';
            span.style.animationDuration = (1 + Math.random() * 1) + 's';
            container.appendChild(span);
        }
    }

    document.getElementById('restart-btn').addEventListener('click', () => {
        location.reload();
    });

});
