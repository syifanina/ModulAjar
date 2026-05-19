/* ============================================================
   Spin Wheel – script.js
   Kelas Alpam
   Weighted system: 8 nama prioritas mendapat peluang 3× lebih besar
   ============================================================ */

// ── 1. DATA & BOBOT ─────────────────────────────────────────
const names = [
    "Aaliesha Shofwatunnisa Ahmad",
    "Adhyastha Prasraya Mahaputra",   // ⭐ prioritas
    "Agha Dzakwan Viero",              // ⭐ prioritas
    "Alby Kamil Ardhani",              // ⭐ prioritas
    "Arkan Rasyad Pahrul",             // ⭐ prioritas
    "Arkananta Mahardika",
    "Aydan Alarries Adidaya",
    "Ayra Salsabila Pratiwi",
    "El Ghfani Putra Aji",             // ⭐ prioritas
    "Fienna Aleesha Hadiyanto",
    "Ghaniya Kaisafara Adji",
    "Hizba Zyd Hamizan Ahmad",
    "Ibrahim Aqila Zulkarnain",
    "Kahfi Anarghya Cansera",
    "Keenan Athaya Rasyid",
    "Khairy Abimanyu Pambudi",
    "La Reina Meccafaeya Shevian",
    "Mirza Rizky Ukail",
    "Muhammad Anwar Pulungan",
    "Muhammad Athar Al-Fatih",
    "Naura Falisha Azzahra",           // ⭐ prioritas
    "Nayla Azalia Akbar",              // ⭐ prioritas
    "Olivina Putri Cahyono",
    "Rafaeyza Razka Prasetya",
    "Rafazaky Abizar Zulkarnaen",
    "Raihan Nursaad Wardhana",
    "Raka Ghailan Prhadana",
    "Sabria Nur Latifah",
    "Syatira Mampis Tuasa",
    "Thaliefya Azzahra",
    "Yumna Adelina Faldi",
    "Zavier Shafaras Azka",            // ⭐ prioritas
];

// Nama-nama prioritas (bobot = 3×, peluang ~3× lebih besar)
const PRIORITY = new Set([
    "Adhyastha Prasraya Mahaputra",
    "Agha Dzakwan Viero",
    "Alby Kamil Ardhani",
    "Arkan Rasyad Pahrul",
    "El Ghfani Putra Aji",
    "Naura Falisha Azzahra",
    "Nayla Azalia Akbar",
    "Zavier Shafaras Azka",
]);

const WEIGHT_PRIORITY = 3;   // bobot nama prioritas
const WEIGHT_NORMAL = 1;   // bobot nama biasa

// ── 2. BANGUN SEGMEN BERBOBOT ─────────────────────────────────
const segments = names.map(name => ({
    name,
    weight: PRIORITY.has(name) ? WEIGHT_PRIORITY : WEIGHT_NORMAL,
}));

const totalWeight = segments.reduce((sum, s) => sum + s.weight, 0);
// totalWeight = 8×3 + 24×1 = 48

// Hitung sudut awal & lebar busur tiap segmen
let cumWeight = 0;
segments.forEach(seg => {
    seg.startRad = (cumWeight / totalWeight) * 2 * Math.PI;
    seg.arcRad = (seg.weight / totalWeight) * 2 * Math.PI;
    seg.endRad = seg.startRad + seg.arcRad;
    cumWeight += seg.weight;
});

// ── 3. COLOUR PALETTE ─────────────────────────────────────────
const PALETTE = [
    "#e63946",
    "#f4831f",
    "#f7c948",
    "#4ecb71",
    "#00b4d8",
    "#7b2fff",
    "#ff6fca",
    "#00c2a8",
];

// ── 4. CANVAS SETUP ───────────────────────────────────────────
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const RADIUS = canvas.width / 2;   // 250

let currentAngle = 0;
let spinning = false;

// ── 5. GAMBAR RODA ────────────────────────────────────────────
function drawWheel(rotationAngle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    segments.forEach((seg, i) => {
        const startAngle = rotationAngle + seg.startRad;
        const endAngle = rotationAngle + seg.endRad;
        const color = PALETTE[i % PALETTE.length];
        const isPriority = PRIORITY.has(seg.name);

        // Segmen prioritas sedikit lebih cerah / berbeda border
        ctx.beginPath();
        ctx.moveTo(RADIUS, RADIUS);
        ctx.arc(RADIUS, RADIUS, RADIUS - 2, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        // Border: segmen prioritas pakai garis emas, biasa putih redup
        ctx.strokeStyle = isPriority ? "rgba(255,230,100,0.55)" : "rgba(255,255,255,0.20)";
        ctx.lineWidth = isPriority ? 2 : 1.2;
        ctx.stroke();

        // ── Label teks ──
        ctx.save();
        ctx.translate(RADIUS, RADIUS);
        ctx.rotate(startAngle + seg.arcRad / 2);

        // Font lebih besar untuk segmen prioritas (lebar)
        const fontSize = isPriority ? 10.5 : 9;
        ctx.font = `bold ${fontSize}px 'Nunito', sans-serif`;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0,0,0,0.65)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        const maxChars = isPriority ? 28 : 24;
        const label = seg.name.length > maxChars
            ? seg.name.slice(0, maxChars - 1) + "…"
            : seg.name;

        // Bintang kecil di depan nama prioritas
        const prefix = isPriority ? "★ " : "";
        ctx.fillText(prefix + label, RADIUS - 12, 0);
        ctx.restore();
    });

    // ── Hub tengah ──
    const hubGrad = ctx.createRadialGradient(RADIUS, RADIUS, 4, RADIUS, RADIUS, 28);
    hubGrad.addColorStop(0, "#ffffff");
    hubGrad.addColorStop(1, "#f7c948");

    ctx.beginPath();
    ctx.arc(RADIUS, RADIUS, 28, 0, 2 * Math.PI);
    ctx.fillStyle = hubGrad;
    ctx.shadowColor = "rgba(0,0,0,0.45)";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "#1a0533";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦", RADIUS, RADIUS);
}

drawWheel(0);

// ── 6. SPIN LOGIC ────────────────────────────────────────────
function spinWheel() {
    if (spinning) return;
    spinning = true;

    const btn = document.getElementById("spinBtn");
    btn.disabled = true;

    const extraTurns = (5 + Math.random() * 3) * 2 * Math.PI;
    const randomOffset = Math.random() * 2 * Math.PI;
    const totalDelta = extraTurns + randomOffset;

    const duration = 4500 + Math.random() * 1500;
    const startTime = performance.now();
    const startAngle = currentAngle;

    function easeOut(t) { return 1 - Math.pow(1 - t, 4); }

    function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        currentAngle = startAngle + totalDelta * easeOut(progress);
        drawWheel(currentAngle);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            btn.disabled = false;
            showWinner();
        }
    }

    requestAnimationFrame(animate);
}

canvas.addEventListener("click", spinWheel);

// ── 7. DETEKSI PEMENANG ──────────────────────────────────────
// Pointer ada di atas (sudut 270° = 3π/2 dalam koordinat canvas)
function getWinnerIndex() {
    const POINTER_ANGLE = (3 * Math.PI) / 2; // atas = –π/2 → normalise → 3π/2

    // Normalisasi rotasi saat ini
    const norm = ((currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    // Sudut relatif pointer terhadap roda
    const rel = (POINTER_ANGLE - norm + 2 * Math.PI) % (2 * Math.PI);

    // Cari segmen yang mencakup sudut rel
    for (let i = 0; i < segments.length; i++) {
        if (rel >= segments[i].startRad && rel < segments[i].endRad) {
            return i;
        }
    }
    return 0; // fallback
}

// ── 8. MODAL PEMENANG ─────────────────────────────────────────
function showWinner() {
    const idx = getWinnerIndex();
    const winner = segments[idx].name;

    document.getElementById("winnerName").textContent = winner;
    document.getElementById("overlay").classList.remove("hidden");
    launchConfetti();
}

function closeModal() {
    document.getElementById("overlay").classList.add("hidden");
    clearConfetti();
}

document.getElementById("overlay").addEventListener("click", function (e) {
    if (e.target === this) closeModal();
});

// ── 9. CONFETTI ───────────────────────────────────────────────
const CONFETTI_COLORS = ["#f7c948", "#ff6fca", "#7b2fff", "#4ecb71", "#00b4d8", "#e63946", "#ffffff"];

function launchConfetti() {
    const area = document.getElementById("confettiArea");
    for (let i = 0; i < 70; i++) {
        const el = document.createElement("div");
        el.className = "confetti-piece";
        el.style.left = Math.random() * 100 + "%";
        el.style.top = "-20px";
        el.style.width = (6 + Math.random() * 9) + "px";
        el.style.height = (6 + Math.random() * 9) + "px";
        el.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        el.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
        el.style.animationDuration = (1.2 + Math.random() * 2) + "s";
        el.style.animationDelay = (Math.random() * 0.8) + "s";
        el.style.transform = `rotate(${Math.random() * 360}deg)`;
        area.appendChild(el);
    }
}

function clearConfetti() {
    document.getElementById("confettiArea").innerHTML = "";
}
