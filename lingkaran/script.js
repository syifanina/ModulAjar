document.addEventListener('DOMContentLoaded', () => {
    // --- TAB NAVIGATION ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');

            // Redraw canvas if tab 1 is selected
            if (targetId === 'tab-bagian') {
                drawBaseCircle();
            }
        });
    });

    // --- TAB 1: BAGIAN LINGKARAN & SUDUT (CANVAS) ---
    const canvas = document.getElementById('circleCanvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;

    let activeMode = null; // 'part' or 'angle'
    let activePart = null;
    let activeLegendPart = null;

    const descriptions = {
        pusat: "<strong>Titik Pusat:</strong> Titik yang berada tepat di tengah-tengah lingkaran. Jaraknya ke semua titik di garis lingkaran selalu sama.",
        jari: "<strong>Jari-Jari (r):</strong> Garis lurus yang menghubungkan titik pusat dengan titik pada garis lingkaran. Panjangnya setengah diameter.",
        diameter: "<strong>Diameter (d):</strong> Garis lurus yang menghubungkan dua titik pada garis lingkaran dan melewati titik pusat. Panjangnya 2x jari-jari.",
        busur: "<strong>Busur:</strong> Garis lengkung yang merupakan bagian dari keliling lingkaran.",
        talibusur: "<strong>Tali Busur:</strong> Garis lurus yang menghubungkan dua titik pada keliling lingkaran, tapi tidak harus melewati titik pusat.",
        juring: "<strong>Juring:</strong> Daerah di dalam lingkaran yang dibatasi oleh dua jari-jari dan sebuah busur.",
        tembereng: "<strong>Tembereng:</strong> Daerah di dalam lingkaran yang dibatasi oleh tali busur dan busur lingkaran.",
        apotema: "<strong>Apotema:</strong> Garis terpendek (tegak lurus) antara titik pusat dengan tali busur.",
        semua: "<strong>Semua Bagian:</strong> Inilah seluruh bagian dari lingkaran dalam satu gambar utuh!"
    };

    function drawBaseCircle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw main circle outline
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#2D3436';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw center dot
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#2D3436';
        ctx.fill();
    }

    function drawPart(part) {
        drawBaseCircle();
        ctx.lineWidth = 5;

        switch (part) {
            case 'pusat':
                ctx.beginPath();
                ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
                ctx.fillStyle = '#e11d48';
                ctx.fill();
                drawText("Titik Pusat", centerX + 15, centerY - 15, '#e11d48');
                break;
            case 'jari':
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(centerX + radius, centerY);
                ctx.strokeStyle = '#2563eb';
                ctx.stroke();
                drawText("r", centerX + radius / 2, centerY - 10, '#2563eb');
                break;
            case 'diameter':
                ctx.beginPath();
                ctx.moveTo(centerX - radius, centerY);
                ctx.lineTo(centerX + radius, centerY);
                ctx.strokeStyle = '#16a34a';
                ctx.stroke();
                drawText("d", centerX, centerY - 10, '#16a34a');
                break;
            case 'busur':
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI / 2);
                ctx.strokeStyle = '#d946ef';
                ctx.stroke();
                drawText("Busur", centerX + radius + 10, centerY + radius / 2, '#d946ef');
                break;
            case 'talibusur':
                ctx.beginPath();
                const startAngleTB = Math.PI / 6;
                const endAngleTB = Math.PI / 2;
                const x1 = centerX + radius * Math.cos(startAngleTB);
                const y1 = centerY + radius * Math.sin(startAngleTB);
                const x2 = centerX + radius * Math.cos(endAngleTB);
                const y2 = centerY + radius * Math.sin(endAngleTB);
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = '#ea580c';
                ctx.stroke();

                // draw dashed arc for reference
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, startAngleTB, endAngleTB);
                ctx.setLineDash([5, 5]);
                ctx.strokeStyle = '#9ca3af';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.setLineDash([]);

                drawText("Tali Busur", x1 - 40, y1 + 50, '#ea580c');
                break;
            case 'juring':
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, -Math.PI / 4, Math.PI / 4);
                ctx.lineTo(centerX, centerY);
                ctx.fillStyle = 'rgba(250, 204, 21, 0.5)';
                ctx.fill();
                ctx.strokeStyle = '#eab308';
                ctx.stroke();
                drawText("Juring", centerX + radius / 2, centerY, '#ca8a04');
                break;
            case 'tembereng':
                const startAngleT = Math.PI * 0.75;
                const endAngleT = Math.PI * 1.25;
                const xt1 = centerX + radius * Math.cos(startAngleT);
                const yt1 = centerY + radius * Math.sin(startAngleT);
                const xt2 = centerX + radius * Math.cos(endAngleT);
                const yt2 = centerY + radius * Math.sin(endAngleT);

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, startAngleT, endAngleT);
                ctx.lineTo(xt1, yt1);
                ctx.fillStyle = 'rgba(14, 165, 233, 0.5)';
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(xt1, yt1);
                ctx.lineTo(xt2, yt2);
                ctx.strokeStyle = '#0284c7';
                ctx.stroke();
                drawText("Tembereng", centerX - radius + 10, centerY, '#0369a1');
                break;
            case 'apotema':
                const startAngleA = Math.PI / 4;
                const endAngleA = Math.PI * 0.75;
                const xa1 = centerX + radius * Math.cos(startAngleA);
                const ya1 = centerY + radius * Math.sin(startAngleA);
                const xa2 = centerX + radius * Math.cos(endAngleA);
                const ya2 = centerY + radius * Math.sin(endAngleA);

                // Tali busur
                ctx.beginPath();
                ctx.moveTo(xa1, ya1);
                ctx.lineTo(xa2, ya2);
                ctx.strokeStyle = '#94a3b8';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Titik tengah tali busur
                const midX = (xa1 + xa2) / 2;
                const midY = (ya1 + ya2) / 2;

                // Apotema
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(midX, midY);
                ctx.strokeStyle = '#8b5cf6';
                ctx.lineWidth = 4;
                ctx.stroke();

                // Right angle mark
                ctx.beginPath();
                ctx.moveTo(midX, midY - 10);
                ctx.lineTo(midX + 10, midY - 10);
                ctx.lineTo(midX + 10, midY);
                ctx.strokeStyle = '#cbd5e1';
                ctx.lineWidth = 1;
                ctx.stroke();

                drawText("Apotema", centerX - 10, centerY + 50, '#7c3aed');
                break;
            case 'semua':
                // Angles matching the image
                const aA = -Math.PI * 0.75;
                const aB = aA + Math.PI;
                const aC = -Math.PI * 0.15;
                const aD = Math.PI * 0.5;

                // Points
                const pA = { x: centerX + radius * Math.cos(aA), y: centerY + radius * Math.sin(aA) };
                const pB = { x: centerX + radius * Math.cos(aB), y: centerY + radius * Math.sin(aB) };
                const pC = { x: centerX + radius * Math.cos(aC), y: centerY + radius * Math.sin(aC) };
                const pD = { x: centerX + radius * Math.cos(aD), y: centerY + radius * Math.sin(aD) };

                // Midpoints for Apothems
                const pF = { x: (pA.x + pC.x) / 2, y: (pA.y + pC.y) / 2 };
                const pE = { x: (pB.x + pD.x) / 2, y: (pB.y + pD.y) / 2 };

                const applyHighlight = (partName, defaultColor) => {
                    if (activeLegendPart === partName) {
                        ctx.strokeStyle = defaultColor;
                        ctx.lineWidth = 6;
                        ctx.shadowBlur = 15;
                        ctx.shadowColor = defaultColor;
                    } else if (activeLegendPart && activeLegendPart !== 'semua') {
                        ctx.strokeStyle = '#e2e8f0'; // Dim if another is active
                        ctx.lineWidth = 2;
                        ctx.shadowBlur = 0;
                    } else {
                        ctx.strokeStyle = defaultColor;
                        ctx.lineWidth = 2;
                        ctx.shadowBlur = 0;
                    }
                };

                // Clear shadow for general use
                ctx.shadowBlur = 0;

                // For juring, if active, draw a fill
                if (activeLegendPart === 'juring') {
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.lineTo(pC.x, pC.y);
                    ctx.arc(centerX, centerY, radius, aC, aA, true); // True for counterclockwise from C to A
                    ctx.lineTo(centerX, centerY);
                    ctx.fillStyle = 'rgba(250, 204, 21, 0.5)';
                    ctx.fill();
                }

                // For tembereng, if active, draw a fill
                if (activeLegendPart === 'tembereng') {
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, aA, aC, false);
                    ctx.lineTo(pA.x, pA.y);
                    ctx.fillStyle = 'rgba(14, 165, 233, 0.5)';
                    ctx.fill();
                }

                // Radius OC, OD
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(pC.x, pC.y);
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(pD.x, pD.y);
                applyHighlight('jari', '#10b981');
                ctx.stroke();

                // Chords AC, BD
                ctx.beginPath();
                ctx.moveTo(pA.x, pA.y);
                ctx.lineTo(pC.x, pC.y);
                ctx.moveTo(pB.x, pB.y);
                ctx.lineTo(pD.x, pD.y);
                applyHighlight('talibusur', '#f59e0b');
                ctx.stroke();

                // Apothems OF, OE
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(pF.x, pF.y);
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(pE.x, pE.y);
                applyHighlight('apotema', '#9ca3af');
                ctx.stroke();

                // Diameter AB
                ctx.beginPath();
                ctx.moveTo(pA.x, pA.y);
                ctx.lineTo(pB.x, pB.y);
                applyHighlight('diameter', '#000000');
                ctx.stroke();

                // Busur (draw outline arcs)
                if (activeLegendPart === 'busur') {
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, aA, aC, false);
                    applyHighlight('busur', '#d946ef');
                    ctx.stroke();
                }

                // Reset shadow for text and points
                ctx.shadowBlur = 0;

                // Center Dot O
                ctx.beginPath();
                ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
                ctx.fillStyle = activeLegendPart === 'pusat' ? '#e11d48' : '#000000';
                if (activeLegendPart === 'pusat') {
                    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = '#e11d48';
                }
                ctx.fill();
                ctx.shadowBlur = 0;

                // Labels function
                const drawLbl = (txt, px, py, ox, oy) => {
                    ctx.font = 'bold 18px Nunito';
                    ctx.fillStyle = '#000000';
                    ctx.fillText(txt, px + ox, py + oy);
                };

                drawLbl('O', centerX, centerY, -25, 10);
                drawLbl('A', pA.x, pA.y, -20, -10);
                drawLbl('B', pB.x, pB.y, 10, 20);
                drawLbl('C', pC.x, pC.y, 10, 5);
                drawLbl('D', pD.x, pD.y, -5, 25);
                drawLbl('F', pF.x, pF.y, -5, -10);
                drawLbl('E', pE.x, pE.y, 10, -5);
                break;
        }
    }

    function drawText(text, x, y, color) {
        ctx.font = 'bold 16px Nunito';
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }

    const partBtns = document.querySelectorAll('.part-btn:not(.legend-btn)');
    const legendBtns = document.querySelectorAll('.legend-btn');
    const partDescription = document.getElementById('part-description');
    const allPartsLegend = document.getElementById('all-parts-legend');

    partBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            activeMode = 'part';
            partBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activePart = btn.getAttribute('data-part');

            if (activePart === 'semua') {
                activeLegendPart = null;
                legendBtns.forEach(b => b.classList.remove('active'));
                allPartsLegend.style.display = 'block';
            } else {
                allPartsLegend.style.display = 'none';
            }

            drawPart(activePart);
            partDescription.innerHTML = descriptions[activePart];
        });
    });

    legendBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            partDescription.innerHTML = descriptions[target];

            // Highlight active legend button
            legendBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            activeLegendPart = target;
            drawPart('semua');
        });
    });

    // Angle demonstration
    const angleSlider = document.getElementById('angleSlider');
    const angleValueDisplay = document.getElementById('angleValue');
    const btnShowAngles = document.getElementById('btn-show-angles');

    function drawAngles(centralAngleDeg) {
        drawBaseCircle();
        partBtns.forEach(b => b.classList.remove('active'));
        partDescription.innerHTML = "<strong>Hubungan Sudut:</strong><br>Sudut Pusat selalu dua kali lebih besar dari Sudut Keliling jika menghadap busur yang sama.";

        const centralAngleRad = centralAngleDeg * (Math.PI / 180);

        // Define points
        // Center: (centerX, centerY)
        // Point A (on circle): angle = 0 (right side for simplicity, rotated to bottom for better visual)
        const offset = Math.PI / 2; // start from bottom
        const p1Angle = offset - centralAngleRad / 2;
        const p2Angle = offset + centralAngleRad / 2;

        const p1X = centerX + radius * Math.cos(p1Angle);
        const p1Y = centerY + radius * Math.sin(p1Angle);
        const p2X = centerX + radius * Math.cos(p2Angle);
        const p2Y = centerY + radius * Math.sin(p2Angle);

        // Point C (Inscribed point, top of circle)
        const pCX = centerX + radius * Math.cos(-Math.PI / 2);
        const pCY = centerY + radius * Math.sin(-Math.PI / 2);

        // Draw Central Angle
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(p1X, p1Y);
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(p2X, p2Y);
        ctx.strokeStyle = '#ef4444'; // Red
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw Central Angle Arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, p1Angle, p2Angle);
        ctx.strokeStyle = '#ef4444';
        ctx.stroke();
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 14px Nunito';
        ctx.fillText(`${centralAngleDeg}°`, centerX - 10, centerY + 50);

        // Draw Inscribed Angle
        ctx.beginPath();
        ctx.moveTo(pCX, pCY);
        ctx.lineTo(p1X, p1Y);
        ctx.moveTo(pCX, pCY);
        ctx.lineTo(p2X, p2Y);
        ctx.strokeStyle = '#3b82f6'; // Blue
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Inscribed Angle Arc (approximate placement)
        ctx.fillStyle = '#3b82f6';
        ctx.fillText(`${centralAngleDeg / 2}°`, pCX - 10, pCY + 40);

        // Highlight shared arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, p1Angle, p2Angle);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 5;
        ctx.stroke();

        drawText("Busur sama", p1X + 10, p1Y + 20, '#10b981');
    }

    angleSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        angleValueDisplay.textContent = val;
        if (activeMode === 'angle') {
            drawAngles(val);
        }
    });

    btnShowAngles.addEventListener('click', () => {
        activeMode = 'angle';
        drawAngles(angleSlider.value);
    });

    // Initialize Canvas
    drawBaseCircle();

    // --- TAB 2: KELILING & LUAS ---
    const btnHitungLK = document.getElementById('btn-hitung-lk');

    btnHitungLK.addEventListener('click', () => {
        const rInput = document.getElementById('input-r-lk').value;
        if (!rInput || rInput <= 0) {
            alert("Masukkan nilai jari-jari yang valid!");
            return;
        }

        const r = parseFloat(rInput);
        // Using 22/7 if r is divisible by 7 for simpler display, else 3.14
        const usePi227 = r % 7 === 0;
        const piStr = usePi227 ? "22/7" : "3.14";
        const piVal = usePi227 ? 22 / 7 : 3.14;

        const k = 2 * piVal * r;
        const l = piVal * r * r;

        document.getElementById('result-lk').style.display = 'grid';

        document.getElementById('step-k').innerHTML = `K = 2 &times; ${piStr} &times; ${r}`;
        document.getElementById('ans-k').innerHTML = `${formatNum(k)} cm`;

        document.getElementById('step-l').innerHTML = `L = ${piStr} &times; ${r} &times; ${r}`;
        document.getElementById('ans-l').innerHTML = `${formatNum(l)} cm&sup2;`;
    });

    // --- TAB 3: JURING & BUSUR ---
    const btnHitungJB = document.getElementById('btn-hitung-jb');

    btnHitungJB.addEventListener('click', () => {
        const rInput = document.getElementById('input-r-jb').value;
        const sudutInput = document.getElementById('input-sudut-jb').value;

        if (!rInput || rInput <= 0 || !sudutInput || sudutInput <= 0 || sudutInput > 360) {
            alert("Masukkan jari-jari dan sudut yang valid (1-360)!");
            return;
        }

        const r = parseFloat(rInput);
        const sudut = parseFloat(sudutInput);

        const usePi227 = r % 7 === 0;
        const piVal = usePi227 ? 22 / 7 : 3.14;

        const keliling = 2 * piVal * r;
        const luas = piVal * r * r;

        const pBusur = (sudut / 360) * keliling;
        const lJuring = (sudut / 360) * luas;

        document.getElementById('result-jb').style.display = 'grid';

        document.getElementById('step-busur').innerHTML = `Busur = (${sudut}/360) &times; ${formatNum(keliling)}<br>= ${simplifyFraction(sudut, 360)} &times; ${formatNum(keliling)}`;
        document.getElementById('ans-busur').innerHTML = `${formatNum(pBusur)} cm`;

        document.getElementById('step-juring').innerHTML = `Juring = (${sudut}/360) &times; ${formatNum(luas)}<br>= ${simplifyFraction(sudut, 360)} &times; ${formatNum(luas)}`;
        document.getElementById('ans-juring').innerHTML = `${formatNum(lJuring)} cm&sup2;`;
    });

    // Helper functions for math
    function formatNum(num) {
        return Number.isInteger(num) ? num : parseFloat(num.toFixed(2));
    }

    function gcd(a, b) {
        return b ? gcd(b, a % b) : a;
    }

    function simplifyFraction(n, d) {
        const divisor = gcd(n, d);
        return `${n / divisor}/${d / divisor}`;
    }

    // --- TAB 4: KUIS ---
    const quizData = [
        {
            q: "Perhatikan gambar di bawah! Diketahui BD adalah garis lurus yang melalui pusat O (diameter). Jika besar sudut AOB = 40&deg;, maka besar sudut ACD adalah ....",
            svg: `<svg viewBox="0 0 200 200" width="100%" height="180">
                    <circle cx="100" cy="100" r="80" stroke="#000" stroke-width="3" fill="white"/>
                    <line x1="100" y1="100" x2="20" y2="100" stroke="#000" stroke-width="2"/>
                    <line x1="50" y1="37" x2="150" y2="163" stroke="#000" stroke-width="2"/>
                    <line x1="20" y1="100" x2="125" y2="24" stroke="#000" stroke-width="2"/>
                    <line x1="125" y1="24" x2="150" y2="163" stroke="#000" stroke-width="2"/>
                    <text x="5" y="105" font-weight="bold" font-family="Nunito">A</text>
                    <text x="35" y="30" font-weight="bold" font-family="Nunito">B</text>
                    <text x="130" y="15" font-weight="bold" font-family="Nunito">C</text>
                    <text x="155" y="175" font-weight="bold" font-family="Nunito">D</text>
                    <text x="90" y="120" font-weight="bold" font-family="Nunito">O</text>
                  </svg>`,
            options: ["70&deg;", "112&deg;", "140&deg;", "143&deg;"],
            ans: 0,
            explanation: `
                <div style="text-align:left; font-size: 1rem; margin-top: 15px; color: var(--text-color); background: #e0f2fe; padding: 15px; border-radius: 10px; border-left: 5px solid var(--secondary-color);">
                <strong>💡 Penjelasan:</strong><br><br>
                1. Garis <b>BD</b> melewati titik pusat <b>O</b>, artinya <b>BD</b> adalah <b>Diameter</b>. Sudut lurus BOD besarnya 180&deg;.<br>
                2. Kita tahu &ang;AOB = 40&deg;. Maka sudut di sebelahnya, &ang;AOD = 180&deg; - 40&deg; = <b>140&deg;</b>.<br>
                3. Sudut <b>AOD</b> adalah <b>Sudut Pusat</b> yang menghadap busur AD.<br>
                4. Sudut <b>ACD</b> adalah <b>Sudut Keliling</b> yang juga menghadap busur AD yang sama.<br>
                5. Ingat rumus: <i>Sudut Keliling = &frac12; &times; Sudut Pusat</i>.<br>
                Maka, &ang;ACD = &frac12; &times; 140&deg; = <b style="color:var(--primary-color);">70&deg;</b>.
                </div>
            `
        },
        {
            q: "Perhatikan gambar di bawah! Diketahui sudut POQ = 135&deg; dan sudut QOR tegak lurus (90&deg;). Jika panjang busur PQ = 12 cm, berapakah panjang busur QR?",
            svg: `<svg viewBox="0 0 200 200" width="100%" height="180">
                    <circle cx="100" cy="100" r="80" stroke="#000" stroke-width="3" fill="white"/>
                    <line x1="100" y1="100" x2="43" y2="43" stroke="#000" stroke-width="2"/>
                    <line x1="100" y1="100" x2="180" y2="100" stroke="#000" stroke-width="2"/>
                    <line x1="100" y1="100" x2="100" y2="180" stroke="#000" stroke-width="2"/>
                    <rect x="100" y="100" width="15" height="15" fill="none" stroke="#000" stroke-width="2"/>
                    <text x="30" y="35" font-weight="bold" font-family="Nunito">P</text>
                    <text x="185" y="105" font-weight="bold" font-family="Nunito">Q</text>
                    <text x="95" y="195" font-weight="bold" font-family="Nunito">R</text>
                    <text x="80" y="95" font-weight="bold" font-family="Nunito">O</text>
                    <text x="110" y="80" font-weight="bold" font-family="Nunito">135&deg;</text>
                  </svg>`,
            options: ["6 cm", "8 cm", "9 cm", "10 cm"],
            ans: 1,
            explanation: `
                <div style="text-align:left; font-size: 1rem; margin-top: 15px; color: var(--text-color); background: #e0f2fe; padding: 15px; border-radius: 10px; border-left: 5px solid var(--secondary-color);">
                <strong>💡 Penjelasan:</strong><br><br>
                Panjang <b>Busur</b> berbanding lurus dengan besar <b>Sudut Pusatnya</b>. Gunakan perbandingan senilai:<br>
                <div style="background:white; padding: 10px; border-radius: 8px; margin: 10px 0; text-align:center; font-weight:bold;">
                Busur QR / Busur PQ = Sudut QOR / Sudut POQ<br>
                Busur QR / 12 cm = 90&deg; / 135&deg;
                </div>
                Mari sederhanakan pecahannya:<br>
                90 / 135 = <b>2 / 3</b> (Sama-sama dibagi 45)<br>
                Jadi, Busur QR = (2 / 3) &times; 12 cm = <b style="color:var(--primary-color);">8 cm</b>.
                </div>
            `
        },
        {
            q: "Perhatikan gambar ketiga! Diketahui luas juring OBC = 16 cm&sup2;. Jika besar sudut BOC adalah 90&deg; (siku-siku) dan sudut AOB = 135&deg;, maka luas juring OAB adalah ....",
            svg: `<svg viewBox="0 0 200 200" width="100%" height="180">
                    <circle cx="100" cy="100" r="80" stroke="#000" stroke-width="3" fill="white"/>
                    <line x1="100" y1="100" x2="180" y2="100" stroke="#000" stroke-width="2"/>
                    <line x1="100" y1="100" x2="100" y2="20" stroke="#000" stroke-width="2"/>
                    <line x1="100" y1="100" x2="43" y2="157" stroke="#000" stroke-width="2"/>
                    <rect x="100" y="90" width="10" height="10" fill="none" stroke="#000" stroke-width="2"/>
                    <text x="30" y="170" font-weight="bold" font-family="Nunito">A</text>
                    <text x="95" y="15" font-weight="bold" font-family="Nunito">B</text>
                    <text x="185" y="105" font-weight="bold" font-family="Nunito">C</text>
                    <text x="85" y="115" font-weight="bold" font-family="Nunito">O</text>
                    <text x="50" y="90" font-weight="bold" font-family="Nunito">135&deg;</text>
                  </svg>`,
            options: ["24 cm&sup2;", "25 cm&sup2;", "26 cm&sup2;", "27 cm&sup2;"],
            ans: 0,
            explanation: `
                <div style="text-align:left; font-size: 1rem; margin-top: 15px; color: var(--text-color); background: #e0f2fe; padding: 15px; border-radius: 10px; border-left: 5px solid var(--secondary-color);">
                <strong>💡 Penjelasan:</strong><br><br>
                Sama seperti panjang busur, <b>Luas Juring</b> juga berbanding lurus dengan besar <b>Sudut Pusatnya</b>:<br>
                <div style="background:white; padding: 10px; border-radius: 8px; margin: 10px 0; text-align:center; font-weight:bold;">
                Luas OAB / Luas OBC = Sudut AOB / Sudut BOC<br>
                Luas OAB / 16 = 135&deg; / 90&deg;
                </div>
                Mari sederhanakan pecahannya (sama-sama dibagi 45):<br>
                135 / 90 = <b>3 / 2</b><br>
                Maka, Luas OAB = (3 / 2) &times; 16 = <b style="color:var(--primary-color);">24 cm&sup2;</b>.
                </div>
            `
        },
        {
            q: "Perhatikan gambar keempat! Jika panjang busur AB = 88 cm, besar sudut AOB = 120&deg; dan sudut COD = 30&deg;, maka panjang busur CD adalah ....",
            svg: `<svg viewBox="0 0 200 200" width="100%" height="180">
                    <circle cx="100" cy="100" r="80" stroke="#000" stroke-width="3" fill="white"/>
                    <line x1="100" y1="100" x2="31" y2="140" stroke="#000" stroke-width="2"/>
                    <line x1="100" y1="100" x2="169" y2="140" stroke="#000" stroke-width="2"/>
                    <line x1="100" y1="100" x2="100" y2="20" stroke="#000" stroke-width="2"/>
                    <line x1="100" y1="100" x2="140" y2="31" stroke="#000" stroke-width="2"/>
                    
                    <text x="15" y="155" font-weight="bold" font-family="Nunito">A</text>
                    <text x="175" y="155" font-weight="bold" font-family="Nunito">B</text>
                    <text x="95" y="15" font-weight="bold" font-family="Nunito">C</text>
                    <text x="145" y="25" font-weight="bold" font-family="Nunito">D</text>
                    <text x="105" y="115" font-weight="bold" font-family="Nunito">O</text>
                    
                    <text x="90" y="135" font-weight="bold" font-family="Nunito" font-size="14">120&deg;</text>
                    <text x="105" y="65" font-weight="bold" font-family="Nunito" font-size="14">30&deg;</text>
                  </svg>`,
            options: ["22 cm", "118 cm", "48 cm", "150 cm"],
            ans: 0,
            explanation: `
                <div style="text-align:left; font-size: 1rem; margin-top: 15px; color: var(--text-color); background: #e0f2fe; padding: 15px; border-radius: 10px; border-left: 5px solid var(--secondary-color);">
                <strong>💡 Penjelasan:</strong><br><br>
                Kembali kita gunakan perbandingan senilai untuk panjang busur dan sudut pusatnya:<br>
                <div style="background:white; padding: 10px; border-radius: 8px; margin: 10px 0; text-align:center; font-weight:bold;">
                Busur CD / Busur AB = Sudut COD / Sudut AOB<br>
                Busur CD / 88 = 30&deg; / 120&deg;
                </div>
                Mari sederhanakan perbandingannya (sama-sama dibagi 30):<br>
                30 / 120 = <b>1 / 4</b><br>
                Jadi, Busur CD = (1 / 4) &times; 88 = <b style="color:var(--primary-color);">22 cm</b>.
                </div>
            `
        },
        {
            q: "Umar pergi ke pasar dan membeli sebuah teflon. Di kemasan teflon tersebut tertulis ukuran 24 cm. Ukuran 24 cm tersebut menunjukkan...",
            svg: null,
            options: ["Diameter teflon tersebut 24 cm", "Jari-jari teflon tersebut 24 cm", "Keliling teflon tersebut 24 cm", "Luas teflon tersebut 24 cm"],
            ans: 0,
            explanation: `
                <div style="text-align:left; font-size: 1rem; margin-top: 15px; color: var(--text-color); background: #e0f2fe; padding: 15px; border-radius: 10px; border-left: 5px solid var(--secondary-color);">
                <strong>💡 Penjelasan:</strong><br><br>
                Dalam kehidupan sehari-hari, ukuran peralatan dapur berbentuk lingkaran (seperti teflon, panci, atau wajan) yang tertera di label selalu merujuk pada ukuran <b>Diameternya</b> (garis lurus dari ujung ke ujung melewati titik pusat).<br><br>
                Jadi, teflon berukuran 24 cm artinya panjang garis tengah teflon tersebut adalah <b style="color:var(--primary-color);">24 cm</b>.
                </div>
            `
        }
    ];

    let currentQuizIndex = 0;
    let score = 0;

    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizFeedback = document.getElementById('quiz-feedback');
    const btnNextQuiz = document.getElementById('btn-next-quiz');
    const scoreDisplay = document.getElementById('quiz-score');

    function loadQuiz() {
        quizFeedback.textContent = '';
        btnNextQuiz.style.display = 'none';

        if (currentQuizIndex >= quizData.length) {
            // End of quiz
            quizQuestion.textContent = `Hore! Kuis Selesai! Kamu mendapat nilai ${score * (100 / quizData.length)}`;
            quizOptions.innerHTML = '';
            btnNextQuiz.textContent = "Main Lagi 🔄";
            btnNextQuiz.style.display = 'inline-block';
            btnNextQuiz.onclick = () => {
                currentQuizIndex = 0;
                score = 0;
                scoreDisplay.textContent = score;
                btnNextQuiz.textContent = "Soal Berikutnya ➡️";
                btnNextQuiz.onclick = nextQuizHandler;
                loadQuiz();
            };

            // Confetti effect for finishing!
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
            return;
        }

        const qData = quizData[currentQuizIndex];
        const svgContainer = document.getElementById('quiz-svg-container');
        if (qData.svg) {
            svgContainer.innerHTML = qData.svg;
            svgContainer.style.display = 'block';
        } else {
            svgContainer.innerHTML = '';
            svgContainer.style.display = 'none';
        }
        quizQuestion.innerHTML = `${currentQuizIndex + 1}. ${qData.q}`;
        quizOptions.innerHTML = '';

        qData.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.classList.add('option-btn');
            btn.textContent = opt;
            btn.onclick = () => checkAnswer(idx, btn, qData.ans);
            quizOptions.appendChild(btn);
        });
    }

    function checkAnswer(selectedIdx, btnElement, correctIdx) {
        // Disable all buttons
        const allBtns = quizOptions.querySelectorAll('.option-btn');
        allBtns.forEach(b => {
            b.disabled = true;
            b.style.cursor = 'default';
        });

        if (selectedIdx === correctIdx) {
            btnElement.classList.add('correct');
            quizFeedback.innerHTML = "<span style='color:#16a34a;'>✅ Benar Sekali! Kerja bagus!</span><br>" + quizData[currentQuizIndex].explanation;
            score++;
            scoreDisplay.textContent = score;
            confetti({
                particleCount: 50,
                spread: 30,
                origin: { y: 0.8 }
            });
        } else {
            btnElement.classList.add('wrong');
            allBtns[correctIdx].classList.add('correct');
            quizFeedback.innerHTML = "<span style='color:#dc2626;'>❌ Ups, kurang tepat. Mari pelajari pembahasannya!</span><br>" + quizData[currentQuizIndex].explanation;
        }

        btnNextQuiz.style.display = 'inline-block';
    }

    const nextQuizHandler = () => {
        currentQuizIndex++;
        loadQuiz();
    };

    btnNextQuiz.addEventListener('click', nextQuizHandler);

    // Initial Load
    loadQuiz();

    // --- TAB 5: SOAL ESSAY ---
    const btnCheckEssay = document.getElementById('btn-check-essay');
    const inputEssayR = document.getElementById('essay-r');
    const inputEssayL = document.getElementById('essay-l');
    const essayFeedback = document.getElementById('essay-feedback');
    const essayExplanation = document.getElementById('essay-explanation');

    btnCheckEssay.addEventListener('click', () => {
        const ansR = parseInt(inputEssayR.value);
        const ansL = parseInt(inputEssayL.value);

        if (isNaN(ansR) || isNaN(ansL)) {
            essayFeedback.innerHTML = "<span style='color:#ea580c;'>Mohon isi kedua kotak jawaban terlebih dahulu!</span>";
            return;
        }

        const isRCorrect = ansR === 14;
        const isLCorrect = ansL === 616;

        if (isRCorrect && isLCorrect) {
            essayFeedback.innerHTML = "<span style='color:#16a34a;'>✅ Luar Biasa! Jawabanmu benar semua! (r = 14 cm, L = 616 cm&sup2;)</span>";
            inputEssayR.disabled = true;
            inputEssayL.disabled = true;
            btnCheckEssay.disabled = true;
            essayExplanation.style.display = 'block';
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else if (isRCorrect && !isLCorrect) {
            essayFeedback.innerHTML = "<span style='color:#f59e0b;'>⚠️ Jari-jari (a) sudah benar, tapi Luas (b) masih salah. Ayo coba hitung lagi!</span>";
        } else if (!isRCorrect && isLCorrect) {
            essayFeedback.innerHTML = "<span style='color:#f59e0b;'>⚠️ Jari-jari (a) masih salah, padahal Luas (b) sudah sesuai (jika r = 14). Periksa lagi ya!</span>";
        } else {
            essayFeedback.innerHTML = "<span style='color:#dc2626;'>❌ Keduanya masih kurang tepat. Ingat rumus K = 2 &times; &pi; &times; r, lalu L = &pi; &times; r &times; r.</span>";
            essayExplanation.style.display = 'block'; // Show explanation after completely wrong try
        }
    });

    // --- TAB 5: SOAL ESSAY 2 ---
    const btnCheckEssay2 = document.getElementById('btn-check-essay2');
    const inputEssay2N = document.getElementById('essay2-n');
    const essay2Feedback = document.getElementById('essay2-feedback');
    const essay2Explanation = document.getElementById('essay2-explanation');

    btnCheckEssay2.addEventListener('click', () => {
        const ansN = parseInt(inputEssay2N.value);

        if (isNaN(ansN)) {
            essay2Feedback.innerHTML = "<span style='color:#ea580c;'>Mohon isi kotak jawaban terlebih dahulu!</span>";
            return;
        }

        if (ansN === 150) {
            essay2Feedback.innerHTML = "<span style='color:#16a34a;'>✅ Hebat! Jawabanmu benar! (150 kali)</span>";
            inputEssay2N.disabled = true;
            btnCheckEssay2.disabled = true;
            essay2Explanation.style.display = 'block';
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            essay2Feedback.innerHTML = "<span style='color:#dc2626;'>❌ Masih kurang tepat. Coba hitung dulu keliling roda B, ya!</span>";
            essay2Explanation.style.display = 'block';
        }
    });

    // --- TAB 5: SOAL ESSAY 3 ---
    const btnCheckEssay3 = document.getElementById('btn-check-essay3');
    const inputEssay3 = document.getElementById('essay3-rs');
    const essay3Feedback = document.getElementById('essay3-feedback');
    const essay3Explanation = document.getElementById('essay3-explanation');

    btnCheckEssay3.addEventListener('click', () => {
        const ans = parseInt(inputEssay3.value);

        if (isNaN(ans)) {
            essay3Feedback.innerHTML = "<span style='color:#ea580c;'>Mohon isi kotak jawaban terlebih dahulu!</span>";
            return;
        }

        if (ans === 16) {
            essay3Feedback.innerHTML = "<span style='color:#16a34a;'>✅ Benar sekali! (16 cm)</span>";
            inputEssay3.disabled = true;
            btnCheckEssay3.disabled = true;
            essay3Explanation.style.display = 'block';
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        } else {
            essay3Feedback.innerHTML = "<span style='color:#dc2626;'>❌ Masih salah. Coba ingat perbandingan senilai antara busur dan sudut!</span>";
            essay3Explanation.style.display = 'block';
        }
    });

    // --- TAB 5: SOAL ESSAY 4 ---
    const btnCheckEssay4 = document.getElementById('btn-check-essay4');
    const inputEssay4 = document.getElementById('essay4-l');
    const essay4Feedback = document.getElementById('essay4-feedback');
    const essay4Explanation = document.getElementById('essay4-explanation');

    btnCheckEssay4.addEventListener('click', () => {
        const ans = parseInt(inputEssay4.value);

        if (isNaN(ans)) {
            essay4Feedback.innerHTML = "<span style='color:#ea580c;'>Mohon isi kotak jawaban terlebih dahulu!</span>";
            return;
        }

        if (ans === 100) {
            essay4Feedback.innerHTML = "<span style='color:#16a34a;'>✅ Sempurna! (100 cm)</span>";
            inputEssay4.disabled = true;
            btnCheckEssay4.disabled = true;
            essay4Explanation.style.display = 'block';
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        } else {
            essay4Feedback.innerHTML = "<span style='color:#dc2626;'>❌ Masih kurang tepat. Jangan lupa kalikan panjang lurusnya 2 kali!</span>";
            essay4Explanation.style.display = 'block';
        }
    });

    // --- TAB 5: SOAL ESSAY 5 ---
    const btnCheckEssay5 = document.getElementById('btn-check-essay5');
    const inputEssay5Text = document.getElementById('essay5-text');
    const essay5Feedback = document.getElementById('essay5-feedback');
    const essay5Explanation = document.getElementById('essay5-explanation');

    btnCheckEssay5.addEventListener('click', () => {
        if (inputEssay5Text.value.trim() === '') {
            essay5Feedback.innerHTML = "<span style='color:#ea580c;'>Mohon ketikkan pendapatmu terlebih dahulu!</span>";
            return;
        }

        essay5Feedback.innerHTML = "<span style='color:#16a34a;'>✅ Bagus! Yuk kita cocokkan pendapatmu dengan kunci jawaban!</span>";
        inputEssay5Text.disabled = true;
        btnCheckEssay5.disabled = true;
        essay5Explanation.style.display = 'block';
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    });

    // --- TAB 5: SOAL ESSAY 6 ---
    const btnCheckEssay6 = document.getElementById('btn-check-essay6');
    const inputEssay6a = document.getElementById('essay6-a');
    const inputEssay6b = document.getElementById('essay6-b');
    const essay6Feedback = document.getElementById('essay6-feedback');
    const essay6Explanation = document.getElementById('essay6-explanation');

    btnCheckEssay6.addEventListener('click', () => {
        const a = parseInt(inputEssay6a.value);
        const b = parseInt(inputEssay6b.value);
        if (isNaN(a) || isNaN(b)) { essay6Feedback.innerHTML = "<span style='color:#ea580c;'>Isi kedua kotak jawaban!</span>"; return; }
        if (a === 44 && b === 3300000) {
            essay6Feedback.innerHTML = "<span style='color:#16a34a;'>✅ Benar semua!</span>";
            inputEssay6a.disabled = true; inputEssay6b.disabled = true; btnCheckEssay6.disabled = true;
            essay6Explanation.style.display = 'block';
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        } else {
            essay6Feedback.innerHTML = "<span style='color:#dc2626;'>❌ Masih salah. Coba periksa perhitungan jari-jari jalur lari!</span>";
            essay6Explanation.style.display = 'block';
        }
    });

    // --- TAB 5: SOAL ESSAY 7 ---
    const btnCheckEssay7 = document.getElementById('btn-check-essay7');
    const inputEssay7a = document.getElementById('essay7-a');
    const inputEssay7b = document.getElementById('essay7-b');
    const essay7Feedback = document.getElementById('essay7-feedback');
    const essay7Explanation = document.getElementById('essay7-explanation');

    btnCheckEssay7.addEventListener('click', () => {
        const a = parseInt(inputEssay7a.value);
        const b = inputEssay7b.value;
        if (isNaN(a) || b === '') { essay7Feedback.innerHTML = "<span style='color:#ea580c;'>Lengkapi kedua jawaban!</span>"; return; }
        if (a === 7 && b === 'tidak') {
            essay7Feedback.innerHTML = "<span style='color:#16a34a;'>✅ Jawaban Tepat!</span>";
            inputEssay7a.disabled = true; inputEssay7b.disabled = true; btnCheckEssay7.disabled = true;
            essay7Explanation.style.display = 'block';
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        } else {
            essay7Feedback.innerHTML = "<span style='color:#dc2626;'>❌ Masih kurang tepat. Coba hitung jari-jari dari luas total yang baru!</span>";
            essay7Explanation.style.display = 'block';
        }
    });

    // --- TAB 5: SOAL ESSAY 8 ---
    const btnCheckEssay8 = document.getElementById('btn-check-essay8');
    const inputEssay8 = document.getElementById('essay8');
    const essay8Feedback = document.getElementById('essay8-feedback');
    const essay8Explanation = document.getElementById('essay8-explanation');

    btnCheckEssay8.addEventListener('click', () => {
        const val = parseFloat(inputEssay8.value);
        if (isNaN(val)) { essay8Feedback.innerHTML = "<span style='color:#ea580c;'>Isi kotak jawaban!</span>"; return; }
        // Toleransi penggunaan koma/titik 10.5
        if (val === 10.5) {
            essay8Feedback.innerHTML = "<span style='color:#16a34a;'>✅ Luar biasa!</span>";
            inputEssay8.disabled = true; btnCheckEssay8.disabled = true;
            essay8Explanation.style.display = 'block';
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        } else {
            essay8Feedback.innerHTML = "<span style='color:#dc2626;'>❌ Masih keliru. Jarak = jari-jari kolam - jari-jari tabung.</span>";
            essay8Explanation.style.display = 'block';
        }
    });

    // --- TAB 5: SOAL ESSAY 9 ---
    const btnCheckEssay9 = document.getElementById('btn-check-essay9');
    const inputEssay9 = document.getElementById('essay9');
    const essay9Feedback = document.getElementById('essay9-feedback');
    const essay9Explanation = document.getElementById('essay9-explanation');

    btnCheckEssay9.addEventListener('click', () => {
        const val = parseInt(inputEssay9.value);
        if (isNaN(val)) { essay9Feedback.innerHTML = "<span style='color:#ea580c;'>Isi kotak jawaban!</span>"; return; }
        if (val === 770) {
            essay9Feedback.innerHTML = "<span style='color:#16a34a;'>✅ Benar! Informasi soal ubin hanyalah pengecoh!</span>";
            inputEssay9.disabled = true; btnCheckEssay9.disabled = true;
            essay9Explanation.style.display = 'block';
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        } else {
            essay9Feedback.innerHTML = "<span style='color:#dc2626;'>❌ Masih kurang tepat. Area tersebut berbentuk seperti cincin (ring).</span>";
            essay9Explanation.style.display = 'block';
        }
    });

    // --- TAB 5: SOAL ESSAY 10 ---
    const btnCheckEssay10 = document.getElementById('btn-check-essay10');
    const inputEssay10a = document.getElementById('essay10-a');
    const inputEssay10b = document.getElementById('essay10-b');
    const essay10Feedback = document.getElementById('essay10-feedback');
    const essay10Explanation = document.getElementById('essay10-explanation');

    btnCheckEssay10.addEventListener('click', () => {
        const a = parseInt(inputEssay10a.value);
        const b = parseInt(inputEssay10b.value);
        if (isNaN(a) || isNaN(b)) { essay10Feedback.innerHTML = "<span style='color:#ea580c;'>Lengkapi kedua jawaban!</span>"; return; }
        if (a === 21 && b === 1232) {
            essay10Feedback.innerHTML = "<span style='color:#16a34a;'>✅ Sempurna!</span>";
            inputEssay10a.disabled = true; inputEssay10b.disabled = true; btnCheckEssay10.disabled = true;
            essay10Explanation.style.display = 'block';
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        } else {
            essay10Feedback.innerHTML = "<span style='color:#dc2626;'>❌ Masih kurang tepat. Cari r lapangan terlebih dahulu!</span>";
            essay10Explanation.style.display = 'block';
        }
    });

});
