const fullscreenButton = document.querySelector('.fullscreen');
const fullscreenStatus = document.querySelector('#fullscreen-status');

if (!document.fullscreenEnabled) {
    fullscreenButton.hidden = true;
    fullscreenButton.style.display = 'none';
} else {
    fullscreenButton.addEventListener('click', async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else {
                await document.documentElement.requestFullscreen();
            }
        } catch {
            fullscreenStatus.textContent = 'Layar penuh tidak tersedia. Gunakan fitur layar penuh pada browser.';
        }
    });
    document.addEventListener('fullscreenchange', () => {
        const label = document.fullscreenElement ? 'Keluar dari layar penuh' : 'Tampilkan layar penuh';
        fullscreenButton.setAttribute('aria-label', label);
        fullscreenButton.title = label;
    });
}

const allScreens = [...document.querySelectorAll('main.slide')];
const slides = allScreens.filter(screen => !screen.classList.contains('quiz-slide'));
const slideNavigation = document.querySelector('.slide-navigation');
let quizIsOpen = false;
const previousSlide = document.querySelector('#previous-slide');
const nextSlide = document.querySelector('#next-slide');
const slideCounter = document.querySelector('#slide-counter');
let currentSlide = 0;

function showSlide(index) {
    currentSlide = Math.max(0, Math.min(index, slides.length - 1));
    quizIsOpen = false;
    slideNavigation.hidden = false;
    allScreens.forEach(screen => { screen.hidden = screen !== slides[currentSlide]; });
    previousSlide.disabled = currentSlide === 0;
    nextSlide.disabled = currentSlide === slides.length - 1;
    slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;
    // Keep keyboard focus on an available control at either end of the deck.
    if (document.activeElement === nextSlide && nextSlide.disabled) previousSlide.focus();
    if (document.activeElement === previousSlide && previousSlide.disabled) nextSlide.focus();
}
function openQuiz(id) {
    const quiz = allScreens.find(screen => screen.id === id && screen.classList.contains('quiz-slide'));
    if (!quiz) return;
    quizIsOpen = true;
    slideNavigation.hidden = true;
    allScreens.forEach(screen => { screen.hidden = screen !== quiz; });
}
previousSlide.addEventListener('click', () => { if (!quizIsOpen) showSlide(currentSlide - 1); });
nextSlide.addEventListener('click', () => { if (!quizIsOpen) showSlide(currentSlide + 1); });
document.addEventListener('keydown', (event) => {
    if (quizIsOpen || event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.target.isContentEditable) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        showSlide(currentSlide + (event.key === 'ArrowRight' ? 1 : -1));
    }
});
showSlide(0);

// Matching activity: every object and unit has at most one connection.
(() => {
    const board = document.querySelector('.matching-board');
    const lineLayer = board.querySelector('.matching-lines');
    const objects = [...board.querySelectorAll('[data-object]')];
    const units = [...board.querySelectorAll('[data-unit]')];
    const feedback = document.querySelector('#matching-feedback');
    const answers = { coin: 'mm', pencil: 'cm', table: 'cm-or-m', door: 'm', city: 'km' };
    const names = { coin: 'Ketebalan koin', pencil: 'Panjang pensil', table: 'Panjang meja', door: 'Tinggi pintu', city: 'Jarak antarkota' };
    const unitNames = { mm: 'mm', cm: 'cm', 'cm-or-m': 'cm atau m', m: 'm', km: 'km' };
    const colors = ['#528fc6', '#b38426', '#648e50', '#c96983', '#8b6dc2'];
    const connections = new Map();
    let selected = null;
    let checked = false;

    function drawLines() {
        const bounds = board.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        lineLayer.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
        lineLayer.replaceChildren();
        connections.forEach((unit, object) => {
            const from = objects.find(button => button.dataset.object === object).querySelector('.match-dot').getBoundingClientRect();
            const to = units.find(button => button.dataset.unit === unit).querySelector('.match-dot').getBoundingClientRect();
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', from.left + from.width / 2 - bounds.left);
            line.setAttribute('y1', from.top + from.height / 2 - bounds.top);
            line.setAttribute('x2', to.left + to.width / 2 - bounds.left);
            line.setAttribute('y2', to.top + to.height / 2 - bounds.top);
            line.setAttribute('stroke', checked ? (answers[object] === unit ? '#308158' : '#ce5967') : colors[objects.findIndex(button => button.dataset.object === object)]);
            line.setAttribute('stroke-width', Math.max(2.5, bounds.width / 300));
            line.setAttribute('stroke-linecap', 'round');
            if (checked && answers[object] !== unit) line.setAttribute('stroke-dasharray', '7 5');
            lineLayer.append(line);
        });
    }

    function renderMatches() {
        objects.forEach(button => {
            const object = button.dataset.object;
            const unit = connections.get(object);
            const result = checked && unit ? (answers[object] === unit ? 'Benar' : 'Coba lagi') : '';
            button.classList.toggle('is-selected', selected === object);
            button.classList.toggle('is-linked', Boolean(unit));
            button.classList.toggle('is-correct', result === 'Benar');
            button.classList.toggle('is-incorrect', result === 'Coba lagi');
            button.setAttribute('aria-pressed', String(selected === object));
            button.setAttribute('aria-label', `${names[object]}${unit ? ', terhubung ke ' + unitNames[unit] : ', belum terhubung'}${result ? '. ' + result : ''}`);
            button.querySelector('.match-result').textContent = result === 'Benar' ? '✓' : result ? '↺' : '';
        });
        units.forEach(button => {
            const entry = [...connections].find(([, unit]) => unit === button.dataset.unit);
            button.classList.toggle('is-linked', Boolean(entry));
            button.setAttribute('aria-label', `${unitNames[button.dataset.unit]}${entry ? ', terhubung dengan ' + names[entry[0]] : ', belum terhubung'}`);
        });
        drawLines();
    }

    objects.forEach(button => button.addEventListener('click', () => {
        selected = selected === button.dataset.object ? null : button.dataset.object;
        feedback.textContent = selected ? `${names[selected]} dipilih. Sekarang pilih satuannya!` : `${connections.size} dari 5 terhubung. Pilih benda yang ingin dicocokkan.`;
        renderMatches();
    }));
    units.forEach(button => button.addEventListener('click', () => {
        if (!selected) {
            feedback.textContent = 'Pilih bendanya di sebelah kiri dulu, ya!';
            return;
        }
        const unit = button.dataset.unit;
        let replaced = '';
        // Reassign an occupied unit so crossing lines never hide duplicate answers.
        for (const [object, value] of connections) {
            if (value === unit && object !== selected) {
                connections.delete(object);
                replaced = ` ${names[object]} perlu dipasangkan kembali.`;
            }
        }
        connections.set(selected, unit);
        selected = null;
        checked = false;
        feedback.textContent = `${connections.size} dari 5 terhubung.${replaced || (connections.size === 5 ? ' Siap? Tekan Periksa Jawaban!' : ' Yuk, lanjutkan!')}`;
        renderMatches();
    }));
    document.querySelector('#check-matches').addEventListener('click', () => {
        if (connections.size < objects.length) {
            feedback.textContent = `Masih ada ${objects.length - connections.size} benda yang belum terhubung. Lengkapi dulu, ya!`;
            return;
        }
        checked = true;
        selected = null;
        const score = [...connections].filter(([object, unit]) => answers[object] === unit).length;
        feedback.textContent = score === objects.length
            ? 'Hebat! 5 dari 5 benar. Kamu sudah bisa memilih satuan yang tepat!'
            : `${score} dari 5 benar. Tanda ✓ sudah tepat. Perbaiki tanda ↺ dan garis putus-putus, ya!`;
        renderMatches();
    });
    document.querySelector('#reset-matches').addEventListener('click', () => {
        connections.clear();
        selected = null;
        checked = false;
        feedback.textContent = '0 dari 5 terhubung. Ayo coba lagi, pilih satu benda dulu!';
        renderMatches();
    });
    // Redraw when the slide becomes visible, resizes, or enters full screen.
    new ResizeObserver(drawLines).observe(board);
    if (document.fonts) document.fonts.ready.then(drawLines);
    renderMatches();
})();

// Slide 7: click two steps or use the form to explore a conversion.
(() => {
    const slide = document.querySelector('#tangga-satuan');
    const form = slide.querySelector('#stairs-form');
    const value = slide.querySelector('#stairs-value');
    const from = slide.querySelector('#stairs-from');
    const to = slide.querySelector('#stairs-to');
    const error = slide.querySelector('#stairs-error');
    const selection = slide.querySelector('#stairs-selection');
    const explanation = slide.querySelector('#stairs-explanation');
    const calculation = slide.querySelector('#stairs-calculation');
    const steps = [...slide.querySelectorAll('[data-step]')];
    const order = steps.map(button => button.dataset.step);
    let waitingForDestination = false;
    let generation = 0;
    let exampleIndex = 0;
    const examples = [['3', 'm', 'cm'], ['500', 'cm', 'm'], ['2', 'km', 'm'], ['2,5', 'm', 'cm'], ['5', 'cm', 'mm']];

    // Gentle, locally synthesized sounds; audio is unlocked by a user action.
    const soundButton = slide.querySelector('#stairs-sound');
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    let audioContext = null;
    let soundEnabled = true;
    const voices = new Set();
    function stopSounds() {
        for (const voice of voices) {
            try { voice.oscillator.stop(); } catch { /* Already stopped. */ }
            voice.oscillator.disconnect();
            voice.gain.disconnect();
        }
        voices.clear();
    }
    async function unlockSound() {
        if (!soundEnabled || !AudioContextClass) return;
        try {
            if (!audioContext) audioContext = new AudioContextClass();
            if (audioContext.state === 'suspended') await audioContext.resume();
        } catch { /* Audio is optional; the activity remains usable. */ }
    }
    function note(frequency, delay = 0, duration = 0.14, volume = 0.07) {
        if (!soundEnabled || !audioContext || audioContext.state !== 'running') return;
        try {
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();
            const start = audioContext.currentTime + delay;
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, start);
            gain.gain.setValueAtTime(0, start);
            gain.gain.linearRampToValueAtTime(volume, start + 0.012);
            gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
            oscillator.connect(gain);
            gain.connect(audioContext.destination);
            const voice = { oscillator, gain };
            voices.add(voice);
            oscillator.onended = () => {
                oscillator.disconnect();
                gain.disconnect();
                voices.delete(voice);
            };
            oscillator.start(start);
            oscillator.stop(start + duration + 0.02);
        } catch { /* A browser audio failure must not interrupt conversion. */ }
    }
    function playStart() { note(392, 0, 0.1); note(523.25, 0.11, 0.15); }
    function playStep(index) {
        // Pitch follows physical height: higher steps have higher notes.
        note([783.99, 698.46, 659.25, 587.33, 523.25, 440, 392][index]);
    }
    function playResult() {
        [523.25, 659.25, 783.99].forEach((frequency, i) => note(frequency, 0.2 + i * 0.13, 0.24, 0.06));
    }
    soundButton.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundButton.setAttribute('aria-pressed', String(soundEnabled));
        soundButton.textContent = soundEnabled ? '♪ Suara aktif' : '♪ Suara mati';
        soundButton.setAttribute('aria-label', soundEnabled ? 'Efek suara aktif. Klik untuk mematikan' : 'Efek suara mati. Klik untuk mengaktifkan');
        if (!soundEnabled) stopSounds();
        else unlockSound();
    });
    if (!AudioContextClass) soundButton.hidden = true;

    // Shift the decimal point as text to avoid floating-point rounding artifacts.
    function convertDecimal(raw, shift) {
        const [whole, fraction = ''] = raw.replace(',', '.').split('.');
        const digits = whole + fraction;
        const point = whole.length + shift;
        let result = point <= 0 ? '0.' + '0'.repeat(-point) + digits
            : point >= digits.length ? digits + '0'.repeat(point - digits.length)
                : digits.slice(0, point) + '.' + digits.slice(point);
        let [integer, decimals = ''] = result.split('.');
        integer = integer.replace(/^0+(?=\d)/, '');
        decimals = decimals.replace(/0+$/, '');
        return integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (decimals ? ',' + decimals : '');
    }
    function clearSteps() {
        steps.forEach(button => {
            button.classList.remove('is-visited', 'is-current', 'is-endpoint');
            button.setAttribute('aria-pressed', 'false');
            button.querySelector('.step-badge').textContent = '';
        });
    }
    function markEndpoints() {
        clearSteps();
        steps.forEach(button => {
            const start = button.dataset.step === from.value;
            const end = button.dataset.step === to.value;
            button.classList.toggle('is-endpoint', start || end);
            button.setAttribute('aria-pressed', String(start || end));
            button.querySelector('.step-badge').textContent = start && end ? 'Awal = tujuan' : start ? 'Awal' : end ? 'Tujuan' : '';
        });
    }
    function cancelAnimation() {
        stopSounds();
        generation++;
        slide.setAttribute('data-animating', 'false');
    }
    function updatePreview() {
        cancelAnimation();
        waitingForDestination = false;
        error.textContent = '';
        value.removeAttribute('aria-invalid');
        markEndpoints();
        selection.textContent = `${from.value} → ${to.value}. Klik satuan awal untuk memilih jalur baru.`;
        explanation.textContent = 'Siap mencoba? Ikuti setiap tangga yang menyala.';
        calculation.textContent = 'Tekan “Jalankan tangga”.';
    }
    async function run() {
        cancelAnimation();
        waitingForDestination = false;
        markEndpoints();
        const raw = value.value.trim();
        if (!/^\d{1,9}([.,]\d{1,6})?$/.test(raw)) {
            error.textContent = 'Isi 0–999999999, maksimal 6 angka desimal; tanpa pemisah ribuan.';
            value.setAttribute('aria-invalid', 'true');
            explanation.textContent = 'Periksa angka panjang benda terlebih dahulu.';
            calculation.textContent = 'Contoh penulisan: 3 atau 2,5.';
            value.focus();
            return;
        }
        error.textContent = '';
        value.removeAttribute('aria-invalid');
        const start = order.indexOf(from.value);
        const finish = order.indexOf(to.value);
        const delta = finish - start;
        const count = Math.abs(delta);
        const direction = delta > 0 ? 'Turun' : 'Naik';
        const operator = delta > 0 ? '×' : '÷';
        const action = delta > 0 ? 'dikali' : 'dibagi';
        const targetUnit = to.value;
        const runId = generation;
        await unlockSound();
        if (runId !== generation) return;
        playStart();
        slide.setAttribute('data-animating', 'true');
        selection.textContent = `${from.value} → ${targetUnit} · Ayo hitung langkahnya!`;
        explanation.textContent = `Mulai dari ${from.value}.`;
        calculation.textContent = `${convertDecimal(raw, 0)} ${from.value}`;
        steps[start].classList.add('is-current', 'is-visited');
        const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 180 : 650;
        for (let n = 1; n <= count; n++) {
            await new Promise(resolve => setTimeout(resolve, delay));
            if (runId !== generation) return;
            const index = start + Math.sign(delta) * n;
            steps.forEach(button => button.classList.remove('is-current'));
            steps[index].classList.add('is-current', 'is-visited');
            playStep(index);
            steps[index].querySelector('.step-badge').textContent = `Langkah ${n}`;
            explanation.textContent = `${direction} · langkah ${n} dari ${count}`;
            calculation.textContent = `${convertDecimal(raw, 0)}${(` ${operator} 10`).repeat(n)} = ${convertDecimal(raw, index - start)} ${order[index]}`;
        }
        if (runId !== generation) return;
        slide.setAttribute('data-animating', 'false');
        explanation.textContent = count
            ? `${direction} ${count} tangga, berarti ${action} 10 sebanyak ${count} kali.`
            : 'Satuannya sama: 0 langkah. Nilainya tetap!';
        calculation.textContent = `${convertDecimal(raw, 0)}${(` ${operator} 10`).repeat(count)} = ${convertDecimal(raw, delta)} ${targetUnit}`;
        playResult();
        selection.textContent = `${count} langkah selesai. Klik satuan awal untuk mencoba jalur lain.`;
    }
    steps.forEach(button => button.addEventListener('click', () => {
        if (!waitingForDestination) {
            cancelAnimation();
            clearSteps();
            from.value = button.dataset.step;
            waitingForDestination = true;
            button.classList.add('is-endpoint');
            button.setAttribute('aria-pressed', 'true');
            button.querySelector('.step-badge').textContent = 'Awal';
            selection.textContent = `Mulai dari ${from.value}. Sekarang klik satuan tujuan!`;
            explanation.textContent = `Satuan awal: ${from.value}.`;
            calculation.textContent = 'Pilih satuan tujuan di tangga.';
        } else {
            to.value = button.dataset.step;
            run();
        }
    }));
    form.addEventListener('submit', event => { event.preventDefault(); run(); });
    value.addEventListener('input', updatePreview);
    from.addEventListener('change', updatePreview);
    to.addEventListener('change', updatePreview);
    slide.querySelector('#stairs-repeat').addEventListener('click', run);
    slide.querySelector('#stairs-example').addEventListener('click', () => {
        exampleIndex = (exampleIndex + 1) % examples.length;
        [value.value, from.value, to.value] = examples[exampleIndex];
        run();
    });
    // A hidden slide must not continue an old animation in the background.
    new MutationObserver(() => { if (slide.hidden) updatePreview(); }).observe(slide, { attributes: true, attributeFilter: ['hidden'] });
    markEndpoints();
})();

// Shared offline sound effects for both quiz levels.
const quizSounds = (() => {
    const AudioEngine = window.AudioContext || window.webkitAudioContext;
    const buttons = [...document.querySelectorAll('.quiz-sound-toggle')];
    let context;
    let enabled = true;
    let version = 0;
    const voices = new Set();
    function stop() {
        version++;
        for (const voice of voices) {
            try { voice.oscillator.stop(); } catch { /* Already ended. */ }
            voice.oscillator.disconnect();
            voice.gain.disconnect();
        }
        voices.clear();
    }
    function tone(frequency, delay, duration) {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const start = context.currentTime + delay;
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, start);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.065, start + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        oscillator.connect(gain);
        gain.connect(context.destination);
        const voice = { oscillator, gain };
        voices.add(voice);
        oscillator.onended = () => {
            oscillator.disconnect();
            gain.disconnect();
            voices.delete(voice);
        };
        oscillator.start(start);
        oscillator.stop(start + duration + 0.02);
    }
    async function play(kind, score = 0) {
        stop();
        if (!enabled || !AudioEngine) return;
        const current = version;
        try {
            context ||= new AudioEngine();
            if (context.state === 'suspended') await context.resume();
            if (current !== version || !enabled || context.state !== 'running') return;
            const melody = kind === 'correct' ? [523.25, 659.25, 783.99]
                : kind === 'incorrect' ? [392, 329.63]
                    : score >= 90 ? [523.25, 659.25, 783.99, 1046.5]
                        : score >= 70 ? [523.25, 659.25, 783.99]
                            : [392, 440, 523.25];
            const spacing = kind === 'result' ? 0.18 : 0.13;
            melody.forEach((frequency, i) => tone(frequency, i * spacing, i === melody.length - 1 ? 0.32 : 0.17));
        } catch { /* Keep the quiz usable if the browser cannot play audio. */ }
    }
    buttons.forEach(button => {
        button.hidden = !AudioEngine;
        button.addEventListener('click', () => {
            enabled = !enabled;
            stop();
            buttons.forEach(toggle => {
                toggle.textContent = enabled ? '♪ Suara aktif' : '♪ Suara mati';
                toggle.setAttribute('aria-pressed', String(enabled));
                toggle.setAttribute('aria-label', enabled ? 'Matikan efek suara kuis' : 'Aktifkan efek suara kuis');
            });
        });
    });
    const observer = new MutationObserver(records => {
        if (records.some(record => record.target.hidden)) stop();
    });
    document.querySelectorAll('#quiz-level-1, #quiz-level-2, #quiz-level-3').forEach(slide => {
        observer.observe(slide, { attributes: true, attributeFilter: ['hidden'] });
    });
    return { play, stop };
})();

// Quiz Level 1 — answer identity remains stable when choices are shuffled.
(() => {
    const questions = [
        {
            text: 'Apa yang dimaksud dengan satuan baku panjang?',
            choices: ['Satuan yang ukurannya selalu berubah', 'Satuan yang ukurannya tetap dan disepakati', 'Satuan yang hanya digunakan oleh guru', 'Satuan yang berbeda untuk setiap orang'],
            correct: 1,
            explanation: 'Satuan baku panjang adalah satuan yang memiliki ukuran tetap dan digunakan secara umum sehingga hasil pengukuran dapat dibandingkan.'
        },
        {
            text: 'Manakah yang merupakan satuan baku panjang?',
            choices: ['Jengkal', 'Langkah kaki', 'Depa', 'Sentimeter'],
            correct: 3,
            explanation: 'Sentimeter (cm) merupakan satuan baku panjang. Jengkal, langkah kaki, dan depa termasuk satuan tidak baku karena ukurannya dapat berbeda pada setiap orang.'
        },
        {
            text: 'Mengapa kita menggunakan satuan baku saat mengukur?',
            choices: ['Agar hasil pengukuran dapat dibandingkan', 'Agar semua benda menjadi lebih panjang', 'Agar tidak perlu menggunakan alat ukur', 'Agar setiap orang mendapat hasil berbeda'],
            correct: 0,
            explanation: 'Satuan baku digunakan agar pengukuran memiliki acuan yang sama sehingga hasilnya dapat dibandingkan dan dipahami oleh semua orang.'
        },
        {
            text: 'Alat yang paling tepat untuk mengukur panjang pensil adalah ...',
            choices: ['Meteran laser', 'Meteran roll', 'Penggaris', 'Meteran jahit'],
            correct: 2,
            explanation: 'Penggaris cocok digunakan untuk mengukur benda yang pendek dan lurus, seperti pensil, penghapus, dan buku.'
        },
        {
            text: 'Alat yang paling tepat untuk mengukur lingkar pinggang adalah ...',
            choices: ['Meteran jahit', 'Meteran lipat', 'Penggaris kayu', 'Jangka sorong'],
            correct: 0,
            explanation: 'Meteran jahit bersifat lentur sehingga dapat mengikuti bentuk tubuh dan digunakan untuk mengukur lingkar pinggang, lingkar dada, serta panjang kain.'
        },
        {
            text: 'Alat yang paling cocok untuk mengukur panjang ruangan adalah ...',
            choices: ['Mikrometer sekrup', 'Meteran roll', 'Jangka sorong', 'Penggaris 15 cm'],
            correct: 1,
            explanation: 'Meteran roll dapat digunakan untuk mengukur benda atau jarak yang cukup panjang, seperti ruangan, meja, dan dinding.'
        },
        {
            text: 'Jangka sorong digunakan untuk mengukur ...',
            choices: ['Jarak antarkota', 'Panjang jalan raya', 'Tinggi gedung', 'Diameter benda kecil'],
            correct: 3,
            explanation: 'Jangka sorong digunakan untuk mengukur diameter luar, diameter dalam, kedalaman, dan ketebalan benda kecil dengan lebih teliti.'
        },
        {
            text: 'Satuan yang paling tepat untuk menyatakan jarak Jakarta ke Bandung adalah ...',
            choices: ['Milimeter (mm)', 'Sentimeter (cm)', 'Kilometer (km)', 'Desimeter (dm)'],
            correct: 2,
            explanation: 'Kilometer (km) digunakan untuk menyatakan jarak yang jauh, seperti jarak antarkota.'
        },
        {
            text: 'Satuan yang paling tepat untuk menyatakan ketebalan koin adalah ...',
            choices: ['Milimeter (mm)', 'Meter (m)', 'Hektometer (hm)', 'Kilometer (km)'],
            correct: 0,
            explanation: 'Milimeter (mm) cocok digunakan untuk menyatakan ukuran benda yang sangat kecil atau tipis, seperti ketebalan koin.'
        },
        {
            text: 'Satuan yang paling tepat untuk menyatakan tinggi pintu kelas adalah ...',
            choices: ['Kilometer (km)', 'Meter (m)', 'Hektometer (hm)', 'Dekameter (dam)'],
            correct: 1,
            explanation: 'Meter (m) merupakan satuan yang tepat untuk mengukur tinggi benda seperti pintu, lemari, dan ruangan.'
        }
    ];
    const slide = document.querySelector('#quiz-level-1');
    const get = id => slide.querySelector('#' + id);
    const questionScreen = get('quiz-question-screen');
    const resultScreen = get('quiz-result-screen');
    const title = get('quiz-question');
    const options = get('quiz-options');
    const next = get('quiz-next');
    const letters = ['A', 'B', 'C', 'D'];
    let deck = questions.map((question, id) => ({ ...question, id, choiceOrder: [0, 1, 2, 3] }));
    let index = 0;
    let score = 0;
    let answered = false;
    let finished = false;

    function shuffled(items) {
        const result = [...items];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        // Ensure retry actually changes the displayed order, even with an unlucky shuffle.
        if (result.every((item, i) => item === items[i])) result.push(result.shift());
        return result;
    }
    function renderQuestion(focus = true) {
        quizSounds.stop();
        const question = deck[index];
        answered = false;
        questionScreen.hidden = false;
        resultScreen.hidden = true;
        title.textContent = question.text;
        get('quiz-progress-label').textContent = `Soal ${index + 1} dari ${deck.length}`;
        get('quiz-progress').value = index;
        get('quiz-score-label').textContent = `Skor: ${score}`;
        get('quiz-verdict').textContent = '';
        get('quiz-explanation').textContent = '';
        next.disabled = true;
        next.textContent = index === deck.length - 1 ? 'Lihat Skor Akhir →' : 'Soal Selanjutnya →';
        options.replaceChildren();
        question.choiceOrder.forEach((choiceId, position) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'quiz-option';
            button.dataset.choice = String(choiceId);
            const letter = document.createElement('span');
            letter.className = 'quiz-letter';
            letter.textContent = letters[position];
            const text = document.createElement('span');
            text.textContent = question.choices[choiceId];
            button.append(letter, text);
            button.addEventListener('click', () => answer(choiceId));
            options.append(button);
        });
        if (focus) title.focus({ preventScroll: true });
    }
    function answer(choiceId) {
        if (answered || finished) return;
        answered = true;
        const question = deck[index];
        const correct = choiceId === question.correct;
        quizSounds.play(correct ? 'correct' : 'incorrect');
        if (correct) score += 10;
        [...options.children].forEach(button => {
            const id = Number(button.dataset.choice);
            button.disabled = true;
            if (id === question.correct || id === choiceId) {
                const right = id === question.correct;
                button.classList.add(right ? 'is-right' : 'is-wrong');
                const marker = document.createElement('span');
                marker.className = 'quiz-answer-mark';
                marker.textContent = right ? '✓ Benar' : '✕ Pilihanmu';
                button.append(marker);
            }
        });
        const correctLetter = letters[question.choiceOrder.indexOf(question.correct)];
        get('quiz-verdict').textContent = correct ? '✓ Benar! Kamu mendapat 10 poin.' : `Belum tepat. Jawaban yang benar: ${correctLetter}.`;
        get('quiz-explanation').textContent = question.explanation;
        get('quiz-score-label').textContent = `Skor: ${score}`;
        get('quiz-progress').value = index + 1;
        next.disabled = false;
        next.focus({ preventScroll: true });
    }
    function showResult() {
        quizSounds.play('result', score);
        finished = true;
        questionScreen.hidden = true;
        resultScreen.hidden = false;
        get('quiz-final-score').textContent = String(score);
        get('quiz-result-title').textContent = score >= 90
            ? 'Luar Biasa! Kamu Ahli Pengukuran! 🏆'
            : score >= 70 ? 'Hebat! Terus Semangat! 🌟' : 'Tetap Semangat! Ayo Belajar Lagi! 💪';
        get('quiz-summary').textContent = `${score / 10} dari 10 jawaban benar. Setiap jawaban benar bernilai 10 poin.`;
        get('quiz-result-title').focus({ preventScroll: true });
    }
    next.addEventListener('click', () => {
        if (!answered || finished) return;
        if (index === deck.length - 1) showResult();
        else { index++; renderQuestion(); }
    });
    get('quiz-retry').addEventListener('click', () => {
        deck = shuffled(deck).map(question => ({ ...question, choiceOrder: shuffled(question.choiceOrder) }));
        index = 0;
        score = 0;
        finished = false;
        renderQuestion();
    });
    renderQuestion(false);
})();

// Level selection preserves the current quiz attempt when returning to the menu.
(() => {
    const openLevelOne = document.querySelector('#open-quiz-level-1');
    const backToLevels = document.querySelector('#back-to-quiz-levels');
    openLevelOne.addEventListener('click', () => {
        openQuiz('quiz-level-1');
        backToLevels.focus({ preventScroll: true });
    });
    backToLevels.addEventListener('click', () => {
        showSlide(slides.findIndex(slide => slide.id === 'quiz-level-menu'));
        openLevelOne.focus({ preventScroll: true });
    });
})();

// Quiz Level 2 — answer identity remains stable when choices are shuffled.
(() => {
    const questions = [
        {
            "text": "2 km = ... hm",
            "choices": [
                "2 hm",
                "20 hm",
                "200 hm",
                "2.000 hm"
            ],
            "correct": 1,
            "explanation": "Dari km ke hm turun 1 tangga, sehingga dikali 10.\n\n2 × 10 = 20 hm"
        },
        {
            "text": "5 m = ... dm",
            "choices": [
                "500 dm",
                "5 dm",
                "50 dm",
                "5.000 dm"
            ],
            "correct": 2,
            "explanation": "Dari m ke dm turun 1 tangga, sehingga dikali 10.\n\n5 × 10 = 50 dm"
        },
        {
            "text": "70 cm = ... dm",
            "choices": [
                "7 dm",
                "700 dm",
                "70 dm",
                "0,7 dm"
            ],
            "correct": 0,
            "explanation": "Dari cm ke dm naik 1 tangga, sehingga dibagi 10.\n\n70 ÷ 10 = 7 dm"
        },
        {
            "text": "4 dam = ... m",
            "choices": [
                "400 m",
                "4 m",
                "4000 m",
                "40 m"
            ],
            "correct": 3,
            "explanation": "Dari dam ke m turun 1 tangga, sehingga dikali 10.\n\n4 × 10 = 40 m"
        },
        {
            "text": "3 m = ... cm",
            "choices": [
                "30 cm",
                "300 cm",
                "3.000 cm",
                "3 cm"
            ],
            "correct": 1,
            "explanation": "Dari m ke cm turun 2 tangga, yaitu m → dm → cm.\n\n3 × 10 × 10 = 300 cm"
        },
        {
            "text": "600 cm = ... m",
            "choices": [
                "60 m",
                "600 m",
                "6 m",
                "0,6 m"
            ],
            "correct": 2,
            "explanation": "Dari cm ke m naik 2 tangga, yaitu cm → dm → m.\n\n600 ÷ 10 ÷ 10 = 6 m"
        },
        {
            "text": "8 hm = ... m",
            "choices": [
                "800 m",
                "80 m",
                "8.000 m",
                "8 m"
            ],
            "correct": 0,
            "explanation": "Dari hm ke m turun 2 tangga, yaitu hm → dam → m.\n\n8 × 10 × 10 = 800 m"
        },
        {
            "text": "9 cm = ... mm",
            "choices": [
                "900 mm",
                "9 mm",
                "9000 mm",
                "90 mm"
            ],
            "correct": 3,
            "explanation": "Dari cm ke mm turun 1 tangga, sehingga dikali 10.\n\n9 × 10 = 90 mm"
        },
        {
            "text": "2 km = ... m",
            "choices": [
                "200 m",
                "2.000 m",
                "20 m",
                "20.000 m"
            ],
            "correct": 1,
            "explanation": "Dari km ke m turun 3 tangga, yaitu km → hm → dam → m.\n\n2 × 10 × 10 × 10 = 2.000 m"
        },
        {
            "text": "5.000 mm = ... m",
            "choices": [
                "50 m",
                "500 m",
                "5 m",
                "0,5 m"
            ],
            "correct": 2,
            "explanation": "Dari mm ke m naik 3 tangga, yaitu mm → cm → dm → m.\n\n5.000 ÷ 10 ÷ 10 ÷ 10 = 5 m"
        }
    ];
    const slide = document.querySelector('#quiz-level-2');
    const get = id => slide.querySelector('#' + id);
    const questionScreen = get('quiz2-question-screen');
    const resultScreen = get('quiz2-result-screen');
    const title = get('quiz2-question');
    const options = get('quiz2-options');
    const next = get('quiz2-next');
    const letters = ['A', 'B', 'C', 'D'];
    let deck = questions.map((question, id) => ({ ...question, id, choiceOrder: [0, 1, 2, 3] }));
    let index = 0;
    let score = 0;
    let answered = false;
    let finished = false;

    function shuffled(items) {
        const result = [...items];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        // Ensure retry actually changes the displayed order, even with an unlucky shuffle.
        if (result.every((item, i) => item === items[i])) result.push(result.shift());
        return result;
    }
    function renderQuestion(focus = true) {
        quizSounds.stop();
        const question = deck[index];
        answered = false;
        questionScreen.hidden = false;
        resultScreen.hidden = true;
        title.textContent = question.text;
        get('quiz2-progress-label').textContent = `Soal ${index + 1}/${deck.length}`;
        get('quiz2-progress').value = index;
        get('quiz2-score-label').textContent = `Skor: ${score}`;
        get('quiz2-verdict').textContent = '';
        get('quiz2-explanation').textContent = '';
        next.disabled = true;
        next.textContent = index === deck.length - 1 ? 'Lihat Skor Akhir →' : 'Selanjutnya →';
        options.replaceChildren();
        question.choiceOrder.forEach((choiceId, position) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'quiz-option';
            button.dataset.choice = String(choiceId);
            const letter = document.createElement('span');
            letter.className = 'quiz-letter';
            letter.textContent = letters[position];
            const text = document.createElement('span');
            text.textContent = question.choices[choiceId];
            button.append(letter, text);
            button.addEventListener('click', () => answer(choiceId));
            options.append(button);
        });
        if (focus) title.focus({ preventScroll: true });
    }
    function answer(choiceId) {
        if (answered || finished) return;
        answered = true;
        const question = deck[index];
        const correct = choiceId === question.correct;
        quizSounds.play(correct ? 'correct' : 'incorrect');
        if (correct) score += 10;
        [...options.children].forEach(button => {
            const id = Number(button.dataset.choice);
            button.disabled = true;
            if (id === question.correct || id === choiceId) {
                const right = id === question.correct;
                button.classList.add(right ? 'is-right' : 'is-wrong');
                const marker = document.createElement('span');
                marker.className = 'quiz-answer-mark';
                marker.textContent = right ? '✓ Benar' : '✕ Pilihanmu';
                button.append(marker);
            }
        });
        const correctLetter = letters[question.choiceOrder.indexOf(question.correct)];
        get('quiz2-verdict').textContent = correct ? '✓ Benar! Kamu mendapat 10 poin.' : `Belum tepat. Jawaban yang benar: ${correctLetter}.`;
        get('quiz2-explanation').textContent = question.explanation;
        get('quiz2-score-label').textContent = `Skor: ${score}`;
        get('quiz2-progress').value = index + 1;
        next.disabled = false;
        next.focus({ preventScroll: true });
    }
    function showResult() {
        quizSounds.play('result', score);
        finished = true;
        questionScreen.hidden = true;
        resultScreen.hidden = false;
        get('quiz2-final-score').textContent = String(score);
        get('quiz2-result-title').textContent = score >= 90
            ? 'Luar Biasa! Kamu Jago Konversi! 🏆'
            : score >= 70 ? 'Hebat! Kamu Hampir Menguasainya! 🌟' : 'Tetap Semangat! Ayo Latihan Lagi! 💪';
        get('quiz2-summary').textContent = `${score / 10} dari 10 jawaban benar. Setiap jawaban benar bernilai 10 poin.`;
        get('quiz2-result-title').focus({ preventScroll: true });
    }
    next.addEventListener('click', () => {
        if (!answered || finished) return;
        if (index === deck.length - 1) showResult();
        else { index++; renderQuestion(); }
    });
    get('quiz2-retry').addEventListener('click', () => {
        deck = deck.map(question => ({ ...question, choiceOrder: shuffled(question.choiceOrder) }));
        index = 0;
        score = 0;
        finished = false;
        renderQuestion();
    });
    renderQuestion(false);
})();


// Level 2 menu navigation, keeping its attempt intact.
(() => {
    const open = document.querySelector('#open-quiz-level-2');
    const back = document.querySelector('#back-to-quiz2-levels');
    open.addEventListener('click', () => {
        openQuiz('quiz-level-2');
        back.focus({ preventScroll: true });
    });
    back.addEventListener('click', () => {
        showSlide(slides.findIndex(slide => slide.id === 'quiz-level-menu'));
        open.focus({ preventScroll: true });
    });
})();

// Quiz Level 3 — answer identity remains stable when choices are shuffled.
(() => {
    const questions = [
        {
            "text": "3 m + 200 cm = ... m",
            "choices": [
                "4 m",
                "5 m",
                "6 m",
                "23 m"
            ],
            "correct": 1,
            "explanation": "200 cm = 2 m\n\n3 m + 2 m = 5 m"
        },
        {
            "text": "7 m − 300 cm = ... m",
            "choices": [
                "4 m",
                "3 m",
                "5 m",
                "6 m"
            ],
            "correct": 0,
            "explanation": "300 cm = 3 m\n\n7 m − 3 m = 4 m"
        },
        {
            "text": "250 cm + 150 cm = ... m",
            "choices": [
                "40 m",
                "3 m",
                "4 m",
                "400 m"
            ],
            "correct": 2,
            "explanation": "250 cm + 150 cm = 400 cm\n\n400 cm = 4 m"
        },
        {
            "text": "2 km + 500 m = ... m",
            "choices": [
                "700 m",
                "2.050 m",
                "2.500 m",
                "5.200 m"
            ],
            "correct": 2,
            "explanation": "2 km = 2.000 m\n\n2.000 m + 500 m = 2.500 m"
        },
        {
            "text": "5 m − 125 cm = ... cm",
            "choices": [
                "375 cm",
                "425 cm",
                "475 cm",
                "625 cm"
            ],
            "correct": 0,
            "explanation": "5 m = 500 cm\n\n500 cm − 125 cm = 375 cm"
        },
        {
            "text": "3 hm + 40 m = ... m",
            "choices": [
                "70 m",
                "340 m",
                "3.040 m",
                "430 m"
            ],
            "correct": 1,
            "explanation": "3 hm = 300 m\n\n300 m + 40 m = 340 m"
        },
        {
            "text": "Ibu membeli pita sepanjang 4 m. Pita tersebut digunakan sepanjang 175 cm. Berapa sentimeter sisa pita Ibu?",
            "choices": [
                "125 cm",
                "175 cm",
                "225 cm",
                "275 cm"
            ],
            "correct": 2,
            "explanation": "4 m = 400 cm\n\n400 cm − 175 cm = 225 cm"
        },
        {
            "text": "Rani memiliki tali sepanjang 2 m 50 cm. Ia membeli lagi tali sepanjang 175 cm. Berapa panjang seluruh tali Rani?",
            "choices": [
                "325 cm",
                "375 cm",
                "400 cm",
                "425 cm"
            ],
            "correct": 3,
            "explanation": "2 m 50 cm = 250 cm\n\n250 cm + 175 cm = 425 cm"
        },
        {
            "text": "Ayah berjalan sejauh 1 km 200 m pada pagi hari dan 850 m pada sore hari. Berapa total jarak yang ditempuh Ayah?",
            "choices": [
                "1.950 m",
                "2.050 m",
                "2.150 m",
                "2.850 m"
            ],
            "correct": 1,
            "explanation": "1 km 200 m = 1.200 m\n\n1.200 m + 850 m = 2.050 m"
        },
        {
            "text": "Sebuah gulungan kain memiliki panjang 6 m 25 cm. Kain tersebut dipotong sepanjang 2 m 80 cm. Berapa sentimeter sisa kain?",
            "choices": [
                "345 cm",
                "355 cm",
                "445 cm",
                "505 cm"
            ],
            "correct": 0,
            "explanation": "6 m 25 cm = 625 cm\n\n2 m 80 cm = 280 cm\n\n625 cm − 280 cm = 345 cm"
        }
    ];
    const slide = document.querySelector('#quiz-level-3');
    const get = id => slide.querySelector('#' + id);
    const questionScreen = get('quiz3-question-screen');
    const resultScreen = get('quiz3-result-screen');
    const title = get('quiz3-question');
    const options = get('quiz3-options');
    const next = get('quiz3-next');
    const letters = ['A', 'B', 'C', 'D'];
    let deck = questions.map((question, id) => ({ ...question, id, choiceOrder: [0, 1, 2, 3] }));
    let index = 0;
    let score = 0;
    let answered = false;
    let finished = false;

    function shuffled(items) {
        const result = [...items];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        // Ensure retry actually changes the displayed order, even with an unlucky shuffle.
        if (result.every((item, i) => item === items[i])) result.push(result.shift());
        return result;
    }
    function renderQuestion(focus = true) {
        quizSounds.stop();
        const question = deck[index];
        answered = false;
        questionScreen.hidden = false;
        resultScreen.hidden = true;
        title.textContent = question.text;
        get('quiz3-progress-label').textContent = `Soal ${index + 1} dari ${deck.length}`;
        get('quiz3-progress').value = index;
        get('quiz3-score-label').textContent = `Skor: ${score}`;
        get('quiz3-verdict').textContent = '';
        get('quiz3-explanation').textContent = '';
        next.disabled = true;
        next.textContent = index === deck.length - 1 ? 'Lihat Skor Akhir →' : 'Soal Selanjutnya →';
        options.replaceChildren();
        question.choiceOrder.forEach((choiceId, position) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'quiz-option';
            button.dataset.choice = String(choiceId);
            const letter = document.createElement('span');
            letter.className = 'quiz-letter';
            letter.textContent = letters[position];
            const text = document.createElement('span');
            text.textContent = question.choices[choiceId];
            button.append(letter, text);
            button.addEventListener('click', () => answer(choiceId));
            options.append(button);
        });
        if (focus) title.focus({ preventScroll: true });
    }
    function answer(choiceId) {
        if (answered || finished) return;
        answered = true;
        const question = deck[index];
        const correct = choiceId === question.correct;
        quizSounds.play(correct ? 'correct' : 'incorrect');
        if (correct) score += 10;
        [...options.children].forEach(button => {
            const id = Number(button.dataset.choice);
            button.disabled = true;
            if (id === question.correct || id === choiceId) {
                const right = id === question.correct;
                button.classList.add(right ? 'is-right' : 'is-wrong');
                const marker = document.createElement('span');
                marker.className = 'quiz-answer-mark';
                marker.textContent = right ? '✓ Benar' : '✕ Pilihanmu';
                button.append(marker);
            }
        });
        const correctLetter = letters[question.choiceOrder.indexOf(question.correct)];
        get('quiz3-verdict').textContent = correct ? '✓ Benar! Kamu mendapat 10 poin.' : `Belum tepat. Jawaban yang benar: ${correctLetter}.`;
        get('quiz3-explanation').textContent = question.explanation;
        get('quiz3-score-label').textContent = `Skor: ${score}`;
        get('quiz3-progress').value = index + 1;
        next.disabled = false;
        next.focus({ preventScroll: true });
    }
    function showResult() {
        quizSounds.play('result', score);
        finished = true;
        questionScreen.hidden = true;
        resultScreen.hidden = false;
        get('quiz3-final-score').textContent = String(score);
        get('quiz3-result-title').textContent = score >= 90
            ? 'Luar Biasa! Kamu Master Pengukuran! 🏆'
            : score >= 70 ? 'Hebat! Sedikit Lagi Jadi Master! 🌟' : 'Tetap Semangat! Latihan Membuatmu Semakin Hebat! 💪';
        get('quiz3-summary').textContent = `${score / 10} dari 10 jawaban benar. Setiap jawaban benar bernilai 10 poin.`;
        get('quiz3-result-title').focus({ preventScroll: true });
    }
    next.addEventListener('click', () => {
        if (!answered || finished) return;
        if (index === deck.length - 1) showResult();
        else { index++; renderQuestion(); }
    });
    get('quiz3-retry').addEventListener('click', () => {
        deck = deck.map(question => ({ ...question, choiceOrder: shuffled(question.choiceOrder) }));
        index = 0;
        score = 0;
        finished = false;
        renderQuestion();
    });
    renderQuestion(false);
})();



// Level 3 menu navigation.
(() => {
    const open = document.querySelector('#open-quiz-level-3');
    const back = document.querySelector('#back-to-quiz3-levels');
    open.addEventListener('click', () => {
        openQuiz('quiz-level-3');
        back.focus({ preventScroll: true });
    });
    back.addEventListener('click', () => {
        showSlide(slides.findIndex(slide => slide.id === 'quiz-level-menu'));
        open.focus({ preventScroll: true });
    });
})();
