const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 🔊 PENGATURAN VOLUME UTAMA
// Ubah angka ini untuk membesarkan/mengecilkan volume. Contoh: 2.0 = 2x lebih keras. 0.5 = setengah suara.
const MASTER_VOLUME = 1.5; 

function playSound(type) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    const gainNode = audioCtx.createGain();
    const dest = audioCtx.destination;
    gainNode.connect(dest);

    const t = audioCtx.currentTime;

    if (type === 'click') {
        // Soft click sound
        gainNode.gain.setValueAtTime(0.2 * MASTER_VOLUME, t);
        gainNode.gain.exponentialRampToValueAtTime(0.01 * MASTER_VOLUME, t + 0.05);

        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);
        osc.connect(gainNode);
        osc.start(t);
        osc.stop(t + 0.05);
    } 
    else if (type === 'whoosh') {
        // Subtle whoosh noise for drag start
        gainNode.gain.setValueAtTime(0, t);
        gainNode.gain.linearRampToValueAtTime(0.05 * MASTER_VOLUME, t + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, t + 0.4);

        const bufferSize = audioCtx.sampleRate * 0.4; 
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noiseSource = audioCtx.createBufferSource();
        noiseSource.buffer = buffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, t);
        filter.frequency.linearRampToValueAtTime(1500, t + 0.2);
        filter.frequency.linearRampToValueAtTime(300, t + 0.4);
        
        noiseSource.connect(filter);
        filter.connect(gainNode);
        noiseSource.start(t);
    }
    else if (type === 'drop') {
        // Soft drop "thwomp"
        gainNode.gain.setValueAtTime(0.3 * MASTER_VOLUME, t);
        gainNode.gain.exponentialRampToValueAtTime(0.01 * MASTER_VOLUME, t + 0.15);

        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(250, t);
        osc.frequency.exponentialRampToValueAtTime(50, t + 0.15);
        osc.connect(gainNode);
        osc.start(t);
        osc.stop(t + 0.15);
    }
    else if (type === 'chime') {
        // Positive chime: Arpeggio up C - E - G
        gainNode.gain.setValueAtTime(0.15 * MASTER_VOLUME, t);
        gainNode.gain.linearRampToValueAtTime(0, t + 0.8);

        [523.25, 659.25, 783.99].forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;
            osc.connect(gainNode);
            osc.start(t + idx * 0.08);
            osc.stop(t + 0.8);
        });
    }
    else if (type === 'error') {
        // Soft error: Low dull tone
        gainNode.gain.setValueAtTime(0.15 * MASTER_VOLUME, t);
        gainNode.gain.linearRampToValueAtTime(0.15 * MASTER_VOLUME, t + 0.15);
        gainNode.gain.linearRampToValueAtTime(0.01 * MASTER_VOLUME, t + 0.3);

        const osc1 = audioCtx.createOscillator();
        osc1.type = 'triangle';
        osc1.frequency.value = 180;
        osc1.connect(gainNode);
        osc1.start(t);
        osc1.stop(t + 0.3);

        const osc2 = audioCtx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.value = 195; // Slight dissonance
        osc2.connect(gainNode);
        osc2.start(t);
        osc2.stop(t + 0.3);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Attach mousedown click sound to draggable items
    document.querySelectorAll('.draggable-item').forEach(item => {
        item.addEventListener('mousedown', () => playSound('click'));
        // Touch start for mobile responsiveness
        item.addEventListener('touchstart', () => playSound('click'), {passive: true});
    });
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    const targetId = ev.target.id || ev.target.closest('.draggable-item').id;
    ev.dataTransfer.setData("text", targetId);
    
    playSound('whoosh'); // play subtle whoosh sound
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    const item = document.getElementById(data);

    if (!item) return;

    let targetContainer = ev.target.closest('.drop-zone, .palette-grid');

    if (targetContainer) {
        targetContainer.appendChild(item);
        playSound('drop'); // play soft drop sound
    }
}

// Check answers sequentially
async function checkAnswers() {
    // Awaken audio context on action (iOS requirement)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const zones = ['zoneA', 'zoneB', 'zoneC'];
    const results = ['resultA', 'resultB', 'resultC'];

    // Kosongkan hasil sebelumnya
    for (let i = 0; i < results.length; i++) {
        const resultEl = document.getElementById(results[i]);
        resultEl.textContent = "";
        resultEl.className = "feedback-result";
        resultEl.style.color = "";
    }

    for (let i = 0; i < zones.length; i++) {
        const zone = document.getElementById(zones[i]);
        const resultEl = document.getElementById(results[i]);
        const items = zone.querySelectorAll('.draggable-item');

        if (items.length === 0) {
            // Jika kosong, lewat
            continue;
        }

        if (items.length === 1) {
            resultEl.innerHTML = "Belum berkelompok&#10060;"; // ❌
            resultEl.className = "feedback-result incorrect";
            resultEl.style.color = "#dc3545"; // Merah
            playSound('error');
            // Tunda 1 detik untuk zona berikutnya (sequential display)
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
        }

        let firstShape = items[0].getAttribute('data-shape');
        let isSame = true;

        for (let j = 1; j < items.length; j++) {
            if (items[j].getAttribute('data-shape') !== firstShape) {
                isSame = false;
                break;
            }
        }

        if (isSame) {
            resultEl.innerHTML = firstShape;
            resultEl.className = "feedback-result correct";
            resultEl.style.color = "#28a745"; // Hijau
            playSound('chime');
        } else {
            resultEl.innerHTML = "Bukan sejenis&#10060;"; // ❌
            resultEl.className = "feedback-result incorrect";
            resultEl.style.color = "#dc3545"; // Merah
            playSound('error');
        }

        // Tunda 1 detik untuk zona berikutnya (sequential display)
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
