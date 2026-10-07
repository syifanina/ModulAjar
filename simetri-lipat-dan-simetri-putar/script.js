const shapesData = [
    {
        id: 'persegi',
        name: 'Persegi',
        points: [[-80, -80], [80, -80], [80, 80], [-80, 80]],
        simetriPutar: 4,
        sudutTerkecil: 90,
        kecocokanPutar: [90, 180, 270, 360],
        buttonsPutar: [90, 180, 270, 360]
    },
    {
        id: 'persegi-panjang',
        name: 'Persegi Panjang',
        points: [[-100, -60], [100, -60], [100, 60], [-100, 60]],
        simetriPutar: 2,
        sudutTerkecil: 180,
        kecocokanPutar: [180, 360],
        buttonsPutar: [90, 180, 270, 360]
    },
    {
        id: 'jajargenjang',
        name: 'Jajargenjang',
        points: [[-80, -60], [100, -60], [80, 60], [-100, 60]],
        simetriPutar: 2,
        sudutTerkecil: 180,
        kecocokanPutar: [180, 360],
        buttonsPutar: [90, 180, 270, 360]
    },
    {
        id: 'belah-ketupat',
        name: 'Belah Ketupat',
        points: [[0, -100], [70, 0], [0, 100], [-70, 0]],
        simetriPutar: 2,
        sudutTerkecil: 180,
        kecocokanPutar: [180, 360],
        buttonsPutar: [90, 180, 270, 360]
    },
    {
        id: 'layang-layang',
        name: 'Layang-layang',
        points: [[0, -80], [50, 0], [0, 100], [-50, 0]],
        simetriPutar: 1,
        sudutTerkecil: 360,
        kecocokanPutar: [360],
        buttonsPutar: [90, 180, 270, 360]
    },
    {
        id: 'trapesium',
        name: 'Trapesium Sembarang',
        points: [[-60, -60], [20, -60], [90, 60], [-100, 60]],
        simetriPutar: 1,
        sudutTerkecil: 360,
        kecocokanPutar: [360],
        buttonsPutar: [90, 180, 270, 360]
    },
    {
        id: 'segitiga-sama-sisi',
        name: 'Segitiga Sama Sisi',
        points: [[0, -86.6], [75, 43.3], [-75, 43.3]],
        simetriPutar: 3,
        sudutTerkecil: 120,
        kecocokanPutar: [120, 240, 360],
        buttonsPutar: [120, 180, 240, 360]
    },
    {
        id: 'segitiga-sama-kaki',
        name: 'Segitiga Sama Kaki',
        points: [[0, -80], [60, 60], [-60, 60]],
        simetriPutar: 1,
        sudutTerkecil: 360,
        kecocokanPutar: [360],
        buttonsPutar: [90, 180, 270, 360]
    },
    {
        id: 'segitiga-siku-siku',
        name: 'Segitiga Siku-siku',
        points: [[-60, -70], [-60, 70], [80, 70]],
        simetriPutar: 1,
        sudutTerkecil: 360,
        kecocokanPutar: [360],
        buttonsPutar: [90, 180, 270, 360]
    },
    {
        id: 'segitiga-sembarang',
        name: 'Segitiga Sembarang',
        points: [[-30, -70], [80, 10], [-70, 80]],
        simetriPutar: 1,
        sudutTerkecil: 360,
        kecocokanPutar: [360],
        buttonsPutar: [90, 180, 270, 360]
    }
];

class App {
    constructor() {
        this.appEl = document.getElementById('app');
        this.renderHome();
    }

    renderHome() {
        window.scrollTo(0, 0);
        this.appEl.innerHTML = `
            <div style="text-align:center; padding: 3rem 1rem;">
                <h1 style="font-size:3rem; color:var(--primary-dark); margin-bottom:1rem;">LAB SIMETRI BANGUN DATAR</h1>
                <p style="font-size:1.2rem; color:var(--text-muted); max-width:800px; margin:0 auto 3rem auto;">
                    Pilih bangun datar untuk menguji simetri putarnya secara interaktif.
                </p>
                <div class="shapes-grid">
                    ${shapesData.map(s => `
                        <div class="shape-card" onclick="app.renderShapeDetail('${s.id}')">
                            <div class="shape-svg-container" style="width:150px; height:150px;">
                                <svg viewBox="-150 -150 300 300">
                                    <polygon points="${s.points.map(p => p.join(',')).join(' ')}" style="fill:var(--primary-light); stroke:var(--primary); stroke-width:4;" />
                                </svg>
                            </div>
                            <div class="shape-name" style="font-size:1.5rem;">${s.name}</div>
                            <button class="btn btn-outline" style="margin-top:1rem; width:100%;">UJI</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderShapeDetail(shapeId) {
        const shape = shapesData.find(s => s.id === shapeId);
        if (!shape) return this.renderHome();
        
        window.scrollTo(0, 0);
        this.appEl.innerHTML = `
            <div style="padding: 2rem 1rem; max-width: 1000px; margin: 0 auto;">
                <button class="btn btn-outline" style="margin-bottom: 2rem;" onclick="app.renderHome()">&larr; Kembali ke Pilihan Bangun</button>
                <div style="text-align:center; margin-bottom: 2rem;">
                    <h1 style="font-size:3rem; color:var(--primary-dark); text-transform:uppercase;">${shape.name}</h1>
                    <p style="font-size:1.2rem; color:var(--text-muted);">Yuk buktikan simetri putarnya!</p>
                </div>
                
                <div id="lab-putar-container"></div>
            </div>
        `;

        this.initLabPutar(shape);
    }

    initLabPutar(shape) {
        const container = document.getElementById('lab-putar-container');
        const pointsStr = shape.points.map(p => p.join(',')).join(' ');
        
        const referenceLabels = shape.points.map((p, i) => {
            const label = String.fromCharCode(65 + i);
            const d = Math.sqrt(p[0]*p[0] + p[1]*p[1]);
            const tx = p[0] + (p[0]/d) * 35;
            const ty = p[1] + (p[1]/d) * 35;
            return `<text x="${tx}" y="${ty}" dominant-baseline="central" text-anchor="middle" style="fill:var(--text-muted); font-weight:bold; font-size:24px; font-family:Outfit, sans-serif;">${label}</text>`;
        }).join('');

        const activeLabels = shape.points.map((p, i) => {
            const label = String.fromCharCode(65 + i);
            const d = Math.sqrt(p[0]*p[0] + p[1]*p[1]);
            const tx = p[0] + (p[0]/d) * 20;
            const ty = p[1] + (p[1]/d) * 20;
            return `<text x="${tx}" y="${ty}" dominant-baseline="central" text-anchor="middle" style="fill:#ffd700; stroke:#000000; stroke-width:1px; font-weight:900; font-size:24px; font-family:Outfit, sans-serif;">${label}</text>`;
        }).join('');
        
        container.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; gap:2rem;">
                
                <div id="putar-status-badge" style="font-weight:bold; font-size:1.5rem; padding:0.5rem 2rem; border-radius:12px; background:white; box-shadow:var(--shadow-sm); border:2px solid var(--border); text-align:center; min-width:300px; color:var(--text-main);">Posisi Awal</div>

                <!-- MAIN CANVAS -->
                <div style="position:relative; width:400px; height:400px; background:var(--bg-card); border-radius:var(--radius-lg); box-shadow:var(--shadow-md); border:1px solid var(--border); display:flex; justify-content:center; align-items:center;">
                    <svg viewBox="-200 -200 400 400" style="width:100%; height:100%; overflow:visible;">
                        <!-- Reference Outline -->
                        <polygon points="${pointsStr}" style="fill:none; stroke:var(--border); stroke-width:4; stroke-dasharray: 8 4;" />
                        ${referenceLabels}
                        
                        <!-- Rotating Shape Group -->
                        <g id="putar-active" style="transition:transform 0.8s ease-in-out; transform-origin: 0px 0px;">
                            <polygon points="${pointsStr}" style="fill:rgba(79,70,229,0.9); stroke:var(--primary-dark); stroke-width:4;" />
                            ${activeLabels}
                        </g>
                        
                        <!-- Center Point -->
                        <circle cx="0" cy="0" r="6" fill="#ef4444" />
                        <text x="15" y="5" style="fill:#ef4444; font-weight:bold; font-family:Outfit, sans-serif; font-size:16px;">Pusat Rotasi</text>
                    </svg>
                </div>

                <!-- CONTROLS -->
                <div style="width:100%; max-width:600px; background:white; padding:2rem; border-radius:var(--radius-lg); box-shadow:var(--shadow-sm); border:1px solid var(--border);">
                    <div style="text-align:center; margin-bottom:1rem;">
                        <div style="font-size:1.2rem; font-weight:bold; color:var(--text-muted);">Sudut Putaran</div>
                        <div id="putar-angle-val" style="font-size:3rem; font-weight:800; color:var(--primary);">0°</div>
                    </div>
                    
                    <div style="display:flex; align-items:center; gap:1rem; margin-bottom:2rem;">
                        <span style="font-weight:bold;">0°</span>
                        <input type="range" id="putar-slider" min="0" max="360" value="0" step="1" style="flex:1;">
                        <span style="font-weight:bold;">360°</span>
                    </div>

                    <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:0.5rem; margin-bottom:2rem;">
                        ${shape.buttonsPutar.map(a => `
                            <button class="btn btn-primary" onclick="app.animatePutar(${a})">▶ ${a}°</button>
                        `).join('')}
                    </div>

                    <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:0.5rem;">
                        <button class="btn btn-outline" onclick="app.shiftPutar(-90)">-90°</button>
                        <button class="btn btn-outline" onclick="app.shiftPutar(-45)">-45°</button>
                        <button class="btn btn-secondary" onclick="app.animatePutar(0)">RESET</button>
                        <button class="btn btn-outline" onclick="app.shiftPutar(45)">+45°</button>
                        <button class="btn btn-outline" onclick="app.shiftPutar(90)">+90°</button>
                    </div>
                </div>

                <!-- RESULTS CARD -->
                <div style="width:100%; max-width:600px; background:var(--bg-card); padding:2rem; border-radius:var(--radius-lg); box-shadow:var(--shadow-md); border:1px solid var(--border);">
                    <h3 style="text-align:center; font-size:1.5rem; margin-bottom:1.5rem; color:var(--primary-dark);">HASIL PEMBUKTIAN</h3>
                    <div style="font-size:1.2rem; margin-bottom:1rem;">
                        <strong>Simetri Putar:</strong> <span style="color:var(--primary); font-size:1.5rem; font-weight:bold;">${shape.simetriPutar}</span>
                    </div>
                    <div style="margin-bottom:1rem;">
                        <strong>Posisi berimpit:</strong>
                        <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-top:0.5rem;">
                            ${shape.kecocokanPutar.map(a => `<div class="badge" style="background:var(--success-bg); color:var(--success); border:1px solid var(--success);">✓ ${a}°</div>`).join('')}
                        </div>
                    </div>
                    <div style="margin-bottom:1.5rem;">
                        <strong>Sudut terkecil:</strong> ${shape.sudutTerkecil === 360 ? '360°' : shape.sudutTerkecil + '°'}
                    </div>
                    <div style="padding:1rem; background:var(--bg-main); border-radius:var(--radius-sm); border-left:4px solid var(--primary);">
                        <strong>Kesimpulan:</strong> ${shape.name} memiliki ${shape.simetriPutar} simetri putar.
                    </div>
                </div>

            </div>
        `;

        this.currentPutarAngle = 0;
        this.putarShapeDef = shape;
        
        // Listen to slider
        document.getElementById('putar-slider').addEventListener('input', (e) => {
            const el = document.getElementById('putar-active');
            el.style.transition = 'none'; // Instant response for slider
            this.updatePutarVisual(parseInt(e.target.value));
        });
    }

    animatePutar(targetAngle) {
        const el = document.getElementById('putar-active');
        el.style.transition = 'transform 0.8s ease-in-out';
        this.updatePutarVisual(targetAngle);
    }

    shiftPutar(delta) {
        let newAngle = this.currentPutarAngle + delta;
        newAngle = ((newAngle % 360) + 360) % 360;
        if (newAngle === 0 && this.currentPutarAngle !== 0) newAngle = 360; 
        this.animatePutar(newAngle);
    }

    updatePutarVisual(angle) {
        this.currentPutarAngle = angle;
        document.getElementById('putar-slider').value = angle;
        document.getElementById('putar-angle-val').innerText = angle + '°';
        document.getElementById('putar-active').style.transform = `rotate(${angle}deg)`;
        
        const statusEl = document.getElementById('putar-status-badge');
        
        let isMatch = false;
        for(let a of this.putarShapeDef.kecocokanPutar) {
            if(angle === a) { isMatch = true; break; }
        }

        if(angle === 0) {
            statusEl.innerText = "Posisi Awal";
            statusEl.style.color = "var(--text-main)";
            statusEl.style.borderColor = "var(--border)";
            statusEl.style.background = "white";
        } else if(isMatch) {
            if(angle === 360) statusEl.innerHTML = "✓ KEMBALI KE POSISI AWAL!";
            else statusEl.innerHTML = "✓ BERIMPIT!";
            statusEl.style.color = "var(--success)";
            statusEl.style.borderColor = "var(--success)";
            statusEl.style.background = "var(--success-bg)";
        } else {
            statusEl.innerText = "Tidak berimpit";
            statusEl.style.color = "var(--error)";
            statusEl.style.borderColor = "var(--error)";
            statusEl.style.background = "var(--error-bg)";
        }
    }
}

// Initialize App
const app = new App();
