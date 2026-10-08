// ============================================================
// SHARED HELPER – builds a coloured polyhedron from raw faces
// ============================================================
function buildPolyhedron(faces) {
    const group = new THREE.Group();
    const meshes = [];
    faces.forEach(({ verts, color, name }) => {
        const geo = new THREE.BufferGeometry();
        const positions = [];
        for (let i = 1; i < verts.length - 1; i++) {
            positions.push(verts[0].x, verts[0].y, verts[0].z);
            positions.push(verts[i].x, verts[i].y, verts[i].z);
            positions.push(verts[i+1].x, verts[i+1].y, verts[i+1].z);
        }
        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geo.computeVertexNormals();
        const mat = new THREE.MeshPhongMaterial({
            color, transparent: true, opacity: 0.85,
            side: THREE.DoubleSide, shininess: 80
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.userData = { name, originalOpacity: 0.85 };
        group.add(mesh);
        meshes.push(mesh);
    });
    return { group, meshes };
}

function buildEdges(edgePairs, color=0x222222) {
    const group = new THREE.Group();
    const tubes = [];
    edgePairs.forEach(([A, B], idx) => {
        const dir = new THREE.Vector3().subVectors(B, A);
        const len = dir.length();
        const geo = new THREE.CylinderGeometry(0.04, 0.04, len, 8);
        const mat = new THREE.MeshPhongMaterial({ color });
        const mesh = new THREE.Mesh(geo, mat);
        const mid = new THREE.Vector3().addVectors(A, B).multiplyScalar(0.5);
        mesh.position.copy(mid);
        mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir.clone().normalize());
        mesh.userData = { id: idx+1, name: `Rusuk ${idx+1}` };
        group.add(mesh);
        tubes.push(mesh);
    });
    return { group, tubes };
}

function buildVertices(points, color=0xff4757) {
    const group = new THREE.Group();
    const spheres = [];
    const labelsContainer = document.getElementById('labels-container');
    points.forEach((pt, i) => {
        const geo = new THREE.SphereGeometry(0.12, 16, 16);
        const mat = new THREE.MeshPhongMaterial({ color });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pt);
        mesh.userData = { id: i+1, name: `Titik Sudut ${i+1}` };
        group.add(mesh);
        spheres.push(mesh);
        const lbl = document.createElement('div');
        lbl.className = 'vertex-label';
        lbl.textContent = i+1;
        labelsContainer.appendChild(lbl);
    });
    return { group, spheres };
}

// ============================================================
// NET COMPUTATION – auto-unfolds any polyhedron face-by-face
// ============================================================
function computeNet(faces) {
    const EPS = 0.01;
    function vEq(a, b) { return Math.abs(a.x-b.x)<EPS && Math.abs(a.y-b.y)<EPS && Math.abs(a.z-b.z)<EPS; }

    function findShared(fA, fB) {
        const s = [];
        for (let i = 0; i < fA.verts.length; i++)
            for (let j = 0; j < fB.verts.length; j++)
                if (vEq(fA.verts[i], fB.verts[j]) && !s.find(p=>p[0]===i))
                    s.push([i, j]);
        return s.length >= 2 ? s.slice(0,2) : null;
    }

    const netV = faces.map(() => null);
    // Root face: lay flat at y=0 using XZ coords
    netV[0] = faces[0].verts.map(v => new THREE.Vector3(v.x, 0, v.z));

    const visited = new Set([0]);
    const queue = [0];

    while (queue.length) {
        const pIdx = queue.shift();
        for (let cIdx = 0; cIdx < faces.length; cIdx++) {
            if (visited.has(cIdx)) continue;
            const sh = findShared(faces[pIdx], faces[cIdx]);
            if (!sh) continue;

            const [pA, cA] = sh[0];
            const [pB, cB] = sh[1];

            const H1n = netV[pIdx][pA].clone();
            const H2n = netV[pIdx][pB].clone();
            const H1_3 = faces[pIdx].verts[pA];
            const H2_3 = faces[pIdx].verts[pB];

            const hDir_n = H2n.clone().sub(H1n).normalize();
            const hDir_3 = H2_3.clone().sub(H1_3).normalize();

            // Parent center in net
            const pCen = new THREE.Vector3();
            netV[pIdx].forEach(v => pCen.add(v));
            pCen.divideScalar(netV[pIdx].length);

            // Outward direction (perpendicular to hinge, away from parent)
            const toPar = pCen.clone().sub(H1n);
            const proj = hDir_n.clone().multiplyScalar(toPar.dot(hDir_n));
            const perp = toPar.clone().sub(proj);
            const outDir = perp.clone().negate();
            outDir.y = 0;
            if (outDir.length() < 0.001) { outDir.set(0,0,1); }
            outDir.normalize();

            // Compute child net verts
            const cNet = [];
            for (let k = 0; k < faces[cIdx].verts.length; k++) {
                let np;
                if (k === cA) { np = H1n.clone(); }
                else if (k === cB) { np = H2n.clone(); }
                else {
                    const v3 = faces[cIdx].verts[k];
                    const toV = v3.clone().sub(H1_3);
                    const t = toV.dot(hDir_3);
                    const pp = H1_3.clone().add(hDir_3.clone().multiplyScalar(t));
                    const d = v3.distanceTo(pp);
                    const na = H1n.clone().add(hDir_n.clone().multiplyScalar(t));
                    np = na.add(outDir.clone().multiplyScalar(d));
                }
                cNet.push(np);
            }
            netV[cIdx] = cNet;
            visited.add(cIdx);
            queue.push(cIdx);
        }
    }

    return faces.map((f, i) => ({
        ...f,
        netVerts: netV[i] || f.verts.map(v => new THREE.Vector3(v.x, 0, v.z))
    }));
}

// ============================================================
// SCENE SETUP
// ============================================================
let scene, camera, renderer, controls, raycaster, mouse;
let mainGroup, jaringGroup;
let faceMeshes = [], edgeTubes = [], vertexSpheres = [], vertexLabels = [];
let edgesGroup, verticesGroup;
let jaringMeshData = [];
let currentMode = null;
let isIdle = true, idleTimer;
let isFolded = true, foldProgress = 1.0;

const SHAPE_INFO = window.SHAPE_INFO;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 1000);
    camera.position.set(5, 4, 7);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.addEventListener('start', () => { isIdle = false; clearTimeout(idleTimer); });
    controls.addEventListener('end', resetIdleTimer);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    buildScene();
    resetIdleTimer();
    animate();
}

function buildScene() {
    mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const { group: fg, meshes } = buildPolyhedron(SHAPE_INFO.faces);
    faceMeshes = meshes;
    mainGroup.add(fg);

    const { group: eg, tubes } = buildEdges(SHAPE_INFO.edges);
    edgesGroup = eg; edgesGroup.visible = false; edgeTubes = tubes;
    mainGroup.add(edgesGroup);

    const { group: vg, spheres } = buildVertices(SHAPE_INFO.vertices);
    verticesGroup = vg; verticesGroup.visible = false; vertexSpheres = spheres;
    vertexLabels = [...document.querySelectorAll('.vertex-label')];
    mainGroup.add(verticesGroup);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dl = new THREE.DirectionalLight(0xffffff, 0.8); dl.position.set(10,20,10); scene.add(dl);
    const dl2 = new THREE.DirectionalLight(0xffffff, 0.3); dl2.position.set(-10,-10,-10); scene.add(dl2);

    // Setup jaring-jaring meshes
    setupJaring();
}

function setupJaring() {
    jaringGroup = new THREE.Group();
    scene.add(jaringGroup);
    jaringGroup.visible = false;

    const netData = computeNet(SHAPE_INFO.faces);
    jaringMeshData = [];

    netData.forEach(faceData => {
        const n = faceData.verts.length;
        const triCount = n - 2;
        const positions = new Float32Array(triCount * 3 * 3);

        // Fan triangulation index list
        const triIdx = [];
        for (let i = 1; i < n-1; i++) triIdx.push(0, i, i+1);

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const mat = new THREE.MeshPhongMaterial({
            color: faceData.color, transparent: true, opacity: 0.92,
            side: THREE.DoubleSide, shininess: 90
        });
        const mesh = new THREE.Mesh(geo, mat);

        // Add edge lines for jaring
        const linePts = [...faceData.verts.map(v=>new THREE.Vector3(v.x,v.y,v.z)), faceData.verts[0].clone()];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts);
        const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({color:0x000000, linewidth:2}));
        mesh.add(line);
        mesh.userData.line = line;
        mesh.userData.lineGeo = lineGeo;

        jaringGroup.add(mesh);
        jaringMeshData.push({ geo, mesh, verts3D: faceData.verts, vertsNet: faceData.netVerts, triIdx, lineGeo, n });
    });
}

function updateJaring() {
    if (currentMode !== 'jaring') return;

    const target = isFolded ? 1.0 : 0.0;
    foldProgress += (target - foldProgress) * 0.08;
    if (Math.abs(foldProgress - target) < 0.001) foldProgress = target;

    const t = foldProgress;

    jaringMeshData.forEach(({ geo, verts3D, vertsNet, triIdx, lineGeo, n }) => {
        const pos = geo.attributes.position.array;
        let idx = 0;
        for (let ti = 0; ti < triIdx.length; ti++) {
            const vi = triIdx[ti];
            const v3 = verts3D[vi], vn = vertsNet[vi];
            pos[idx++] = v3.x*t + vn.x*(1-t);
            pos[idx++] = v3.y*t + vn.y*(1-t);
            pos[idx++] = v3.z*t + vn.z*(1-t);
        }
        geo.attributes.position.needsUpdate = true;
        geo.computeVertexNormals();

        // Update line
        const lPos = lineGeo.attributes.position.array;
        for (let k = 0; k <= n; k++) {
            const vi = k % n;
            const v3 = verts3D[vi], vn = vertsNet[vi];
            lPos[k*3]   = v3.x*t + vn.x*(1-t);
            lPos[k*3+1] = v3.y*t + vn.y*(1-t);
            lPos[k*3+2] = v3.z*t + vn.z*(1-t);
        }
        lineGeo.attributes.position.needsUpdate = true;
    });
}

// ============================================================
// MODE SWITCHING
// ============================================================
function setMode(mode) {
    currentMode = mode;
    playClickSound();

    document.querySelectorAll('.controls button').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${mode}`);
    if (activeBtn) activeBtn.classList.add('active');

    const panel = document.getElementById('info-panel');
    panel.classList.remove('hidden');

    // Reset all
    faceMeshes.forEach(m => { m.material.opacity = 0.15; m.visible = true; });
    edgesGroup.visible = false;
    verticesGroup.visible = false;
    vertexLabels.forEach(l => l.classList.remove('visible'));
    jaringGroup.visible = false;
    const foldBtn = document.getElementById('btn-fold');
    if (foldBtn) foldBtn.style.display = 'none';

    if (mode === 'sisi') {
        document.getElementById('btn-sisi').innerHTML = `Tampilkan Sisi (${SHAPE_INFO.count.sisi})`;
        panel.innerHTML = SHAPE_INFO.info.sisi;
        faceMeshes.forEach(m => m.material.opacity = 0.85);
        resetViewSmoothly(0, 3, 7);
    } else if (mode === 'rusuk') {
        document.getElementById('btn-rusuk').innerHTML = `Tampilkan Rusuk (${SHAPE_INFO.count.rusuk})`;
        panel.innerHTML = SHAPE_INFO.info.rusuk;
        edgesGroup.visible = true;
        resetViewSmoothly(3, 4, 6);
    } else if (mode === 'sudut') {
        document.getElementById('btn-sudut').innerHTML = `Tampilkan Titik Sudut (${SHAPE_INFO.count.sudut})`;
        panel.innerHTML = SHAPE_INFO.info.sudut;
        faceMeshes.forEach(m => m.material.opacity = 0.1);
        edgesGroup.visible = true;
        verticesGroup.visible = true;
        vertexLabels.forEach(l => l.classList.add('visible'));
        resetViewSmoothly(4, 4, 6);
    } else if (mode === 'jaring') {
        panel.innerHTML = SHAPE_INFO.info.jaring;
        faceMeshes.forEach(m => m.visible = false);
        jaringGroup.visible = true;
        if (foldBtn) {
            foldBtn.style.display = 'block';
            foldBtn.innerHTML = isFolded ? '🔓 Buka Jaring-Jaring' : '🔒 Lipat Jaring-Jaring';
        }
        resetViewSmoothly(0, 5, 10);
    }
}

function toggleFold() {
    isFolded = !isFolded;
    playClickSound();
    const btn = document.getElementById('btn-fold');
    if (btn) btn.innerHTML = isFolded ? '🔓 Buka Jaring-Jaring' : '🔒 Lipat Jaring-Jaring';
}

// ============================================================
// AUDIO
// ============================================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playClickSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.05);
}

let isMusicPlaying = false;
function toggleMusic() {
    playClickSound();
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('btn-music');
    if (isMusicPlaying) { music.pause(); btn.innerHTML = '🔇 Nyalakan Musik'; }
    else { music.play(); btn.innerHTML = '🎵 Matikan Musik'; }
    isMusicPlaying = !isMusicPlaying;
}

// ============================================================
// CAMERA
// ============================================================
function resetViewSmoothly(cx, cy, cz) {
    isIdle = false; clearTimeout(idleTimer);
    const sc = camera.position.clone();
    const ec = new THREE.Vector3(cx, cy, cz);
    let p = 0;
    (function step() {
        p = Math.min(p + 0.04, 1);
        const e = 1 - Math.pow(1-p, 3);
        camera.position.lerpVectors(sc, ec, e);
        controls.update();
        if (p < 1) requestAnimationFrame(step); else resetIdleTimer();
    })();
}

// ============================================================
// HOVER / RAYCASTING
// ============================================================
let hoveredObj = null;
function onMouseMove(ev) {
    mouse.x = (ev.clientX/innerWidth)*2-1;
    mouse.y = -(ev.clientY/innerHeight)*2+1;
    const tooltip = document.getElementById('tooltip');
    raycaster.setFromCamera(mouse, camera);
    let hits = [];
    if (currentMode === 'sisi') hits = raycaster.intersectObjects(faceMeshes);
    else if (currentMode === 'rusuk') hits = raycaster.intersectObjects(edgeTubes);
    else if (currentMode === 'sudut') hits = raycaster.intersectObjects(vertexSpheres);
    if (hits.length > 0) {
        const obj = hits[0].object;
        if (hoveredObj !== obj) {
            clearHover();
            hoveredObj = obj;
            obj.material.emissive = new THREE.Color(0x444444);
            tooltip.textContent = obj.userData.name;
        }
        document.body.style.cursor = 'pointer';
        tooltip.style.left = ev.clientX+'px'; tooltip.style.top = ev.clientY+'px';
        tooltip.classList.remove('hidden');
    } else { clearHover(); }
}

function clearHover() {
    if (hoveredObj) {
        hoveredObj.material.emissive = new THREE.Color(0x000000);
        hoveredObj = null;
        document.body.style.cursor = 'default';
        document.getElementById('tooltip').classList.add('hidden');
    }
}

// ============================================================
// VERTEX LABELS
// ============================================================
function updateLabels() {
    vertexSpheres.forEach((sphere, i) => {
        const lbl = vertexLabels[i];
        if (!lbl) return;
        const pos = sphere.getWorldPosition(new THREE.Vector3());
        const proj = pos.clone().project(camera);
        lbl.style.left = ((proj.x+1)/2*innerWidth)+'px';
        lbl.style.top = (-(proj.y-1)/2*innerHeight)+'px';
    });
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { isIdle = true; }, 4000);
}

function onWindowResize() {
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    if (isIdle && currentMode !== 'jaring') {
        mainGroup.rotation.y += 0.004;
        mainGroup.rotation.x += 0.001;
    }
    updateLabels();
    updateJaring();
    renderer.render(scene, camera);
}

window.onload = init;
