// Global Three.js variables
let scene, camera, renderer, controls;
let raycaster, mouse;

// Scene Objects
let mainGroup;
let cylinderMaterial, cylinderMesh;
let edgesGroup;
let edgeTubes = [];

// Labels & Mode config
let currentMode = null; // 'sisi', 'rusuk', 'sudut', 'jaring'
let isIdle = true;
let idleTimer;

// Jaring-jaring config
let jaringGroup;
let jaringSelimutGeom;
let hinges = {};
let isFolded = true;
let foldProgress = 1.0;

// Geometry Dimensions
const RADIUS = 1.5;
const HEIGHT = 3.5;

// Initialization
function init() {
    // 1. Setup Scene
    scene = new THREE.Scene();

    // 2. Setup Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(4, 3, 6); 

    // 3. Setup Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // 4. Setup Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.addEventListener('start', () => { isIdle = false; clearTimeout(idleTimer); });
    controls.addEventListener('end', resetIdleTimer);

    // 5. Setup Raycasting
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    // Build the objects
    createObjects();

    resetIdleTimer();
    animate();
}

function createObjects() {
    mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ===========================
    // 1. Sisi (Faces)
    // ===========================
    // CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded)
    const geometry = new THREE.CylinderGeometry(RADIUS, RADIUS, HEIGHT, 64, 1, false);

    const faceColors = [
        0x5f27cd, // Selimut (Ungu) - Index 0
        0x10ac84, // Tutup (Hijau) - Index 1
        0x0abde3, // Alas (Biru cyan) - Index 2
    ];

    cylinderMaterial = faceColors.map(color => new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        shininess: 90,
        side: THREE.DoubleSide
    }));

    cylinderMesh = new THREE.Mesh(geometry, cylinderMaterial);
    mainGroup.add(cylinderMesh);

    // ===========================
    // 2. Rusuk (Edges)
    // ===========================
    edgesGroup = new THREE.Group();
    const edgeMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const edgeHoverMat = new THREE.MeshPhongMaterial({ color: 0xffd32a, emissive: 0xffa502 });

    // A cylinder has 2 circular edges. We can represent them using TorusGeometry
    // TorusGeometry(radius, tube, radialSegments, tubularSegments)
    const torusGeo = new THREE.TorusGeometry(RADIUS, 0.05, 16, 100);

    function addEdgeRing(yPos, id) {
        const mesh = new THREE.Mesh(torusGeo, edgeMat.clone());
        mesh.position.set(0, yPos, 0);
        mesh.rotation.x = Math.PI / 2; // Flat horizontal
        mesh.userData = { id: id, originalMat: edgeMat, hoverMat: edgeHoverMat, type: 'rusuk' };
        edgesGroup.add(mesh);
        edgeTubes.push(mesh);
    }

    addEdgeRing(HEIGHT / 2, 1);  // Rusuk Atas (1)
    addEdgeRing(-HEIGHT / 2, 2); // Rusuk Bawah (2)

    // ===========================
    // 3. Jaring-jaring (Cylinder Net)
    // ===========================
    jaringGroup = new THREE.Group();

    const jaringMaterials = faceColors.map(color => new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        shininess: 90,
        side: THREE.DoubleSide
    }));

    // Selimut (Curved Wrapper) - PlaneGeometry of width 2 * PI * R (approx 9.4248), height HEIGHT (3.5)
    // We segment it highly along the width (64 segments) to allow smooth bending.
    const selimutWidth = 2 * Math.PI * RADIUS;
    jaringSelimutGeom = new THREE.PlaneGeometry(selimutWidth, HEIGHT, 64, 1);
    
    // Save original position vector values for bending math
    const posAttr = jaringSelimutGeom.attributes.position;
    const originalPositions = [];
    for (let i = 0; i < posAttr.count; i++) {
        originalPositions.push(new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i)));
    }
    jaringSelimutGeom.userData = { originalPositions: originalPositions };

    const selimutMesh = new THREE.Mesh(jaringSelimutGeom, jaringMaterials[0]); // index 0 is Purple Selimut
    jaringGroup.add(selimutMesh);

    // Top Circle Hinge - index 1 (Green Tutup)
    const topHinge = new THREE.Group();
    topHinge.position.set(0, HEIGHT / 2, 0);
    // CylinderGeometry for a flat circle is just thin cylinder or a CircleGeometry
    // CircleGeometry is perfect! CircleGeometry(radius, segments)
    const circleGeo = new THREE.CircleGeometry(RADIUS, 32);
    // Rotate circle by 90 degrees around X locally so that at t=0 (rotation=0) it lies flat on XY plane like the selimut plane.
    // Wait, CircleGeometry by default lies on XY plane! That is perfect, no local rotation needed!
    const topMesh = new THREE.Mesh(circleGeo, jaringMaterials[1]);
    topMesh.position.set(0, RADIUS, 0); // Offset along local Y so it touches the top edge of selimut plane when flat
    topHinge.add(topMesh);
    jaringGroup.add(topHinge);
    hinges.top = topHinge;

    // Bottom Circle Hinge - index 2 (Blue Alas)
    const bottomHinge = new THREE.Group();
    bottomHinge.position.set(0, -HEIGHT / 2, 0);
    const bottomMesh = new THREE.Mesh(circleGeo, jaringMaterials[2]);
    bottomMesh.position.set(0, -RADIUS, 0); // Offset along local Y so it touches the bottom edge when flat
    bottomHinge.add(bottomMesh);
    jaringGroup.add(bottomHinge);
    hinges.bottom = bottomHinge;

    jaringGroup.visible = false;
    mainGroup.add(jaringGroup);

    // ===========================
    // Lights
    // ===========================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);
}

// Interaction Sound Logic
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playClickSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
}

function playBlipSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.03);

    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
}

function resetViewSmoothly(camX, camY, camZ) {
    isIdle = false; 
    clearTimeout(idleTimer);

    const startCam = camera.position.clone();
    const endCam = new THREE.Vector3(camX, camY, camZ);

    let curX = mainGroup.rotation.x % (Math.PI * 2);
    let curY = mainGroup.rotation.y % (Math.PI * 2);
    let curZ = mainGroup.rotation.z % (Math.PI * 2);

    if (curX > Math.PI) curX -= Math.PI * 2;
    if (curX < -Math.PI) curX += Math.PI * 2;
    if (curY > Math.PI) curY -= Math.PI * 2;
    if (curY < -Math.PI) curY += Math.PI * 2;

    const startRot = new THREE.Vector3(curX, curY, curZ);
    const endRot = new THREE.Vector3(0, 0, 0);

    let progress = 0;
    function anim() {
        progress += 0.04;
        if (progress > 1) progress = 1;

        const ease = 1 - Math.pow(1 - progress, 3);

        camera.position.lerpVectors(startCam, endCam, ease);
        mainGroup.rotation.set(
            startRot.x * (1 - ease) + endRot.x * ease,
            startRot.y * (1 - ease) + endRot.y * ease,
            startRot.z * (1 - ease) + endRot.z * ease
        );
        controls.update();

        if (progress < 1) {
            requestAnimationFrame(anim);
        } else {
            resetIdleTimer(); 
        }
    }
    anim();
}

function setMode(mode) {
    currentMode = mode;
    playClickSound();

    document.querySelectorAll('.controls button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${mode}`).classList.add('active');

    const panel = document.getElementById('info-panel');
    panel.classList.remove('hidden');

    cylinderMesh.visible = true;
    cylinderMaterial.forEach(mat => mat.opacity = 0.2);
    edgesGroup.visible = false;
    jaringGroup.visible = false;
    document.getElementById('btn-fold').style.display = 'none';

    if (mode === 'sisi') {
        panel.innerHTML = "Tabung memiliki <b>3 sisi</b>:<br>" +
                          "1. <b>Sisi Alas</b> (lingkaran bawah)<br>" +
                          "2. <b>Sisi Tutup</b> (lingkaran atas)<br>" +
                          "3. <b>Sisi Selimut</b> (bidang lengkung penyelimut tabung)";
        cylinderMaterial.forEach(mat => mat.opacity = 0.9);
        resetViewSmoothly(0, 2, 7);
    }
    else if (mode === 'rusuk') {
        panel.innerHTML = "Tabung memiliki <b>2 rusuk</b> melengkung yang membatasi sisi alas dan sisi tutup (rusuk atas dan rusuk bawah). Tabung tidak memiliki rusuk lurus.";
        cylinderMaterial.forEach(mat => mat.opacity = 0.15);
        edgesGroup.visible = true;
        resetViewSmoothly(0, 3, 7);
    }
    else if (mode === 'sudut') {
        panel.innerHTML = "Tabung memiliki <b>0 titik sudut</b> karena seluruh permukaan sisinya melengkung dan tidak memiliki sudut lancip / pojok.";
        cylinderMaterial.forEach(mat => mat.opacity = 0.15);
        edgesGroup.visible = true;
        resetViewSmoothly(4, 3, 5); 
    }
    else if (mode === 'jaring') {
        panel.innerHTML = "Jaring-jaring tabung terdiri dari 1 buah selimut (persegi panjang) dan 2 buah lingkaran (alas dan tutup). Tekan tombol <b>Buka Jaring-Jaring</b> di panel kiri untuk melihat proses membukanya secara interaktif.";
        cylinderMesh.visible = false;
        jaringGroup.visible = true;
        const foldBtn = document.getElementById('btn-fold');
        foldBtn.style.display = 'block';
        foldBtn.innerHTML = isFolded ? '🔓 Buka Jaring-Jaring' : '🔒 Lipat Jaring-Jaring';
        resetViewSmoothly(0, 3, 7);
    }
}

let isMusicPlaying = false;
function toggleMusic() {
    playClickSound();
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('btn-music');

    if (isMusicPlaying) {
        music.pause();
        isMusicPlaying = false;
        btn.innerHTML = '🔇 Nyalakan Musik';
    } else {
        music.play();
        isMusicPlaying = true;
        btn.innerHTML = '🎵 Matikan Musik';
    }
}

// Raycasting (Hover Effect)
let hoveredObj = null;
let hoveredFaceIndex = -1; 
const sisiNames = [
    "Sisi Selimut (Melengkung)",
    "Sisi Tutup / Atas (Lingkaran)",
    "Sisi Alas / Bawah (Lingkaran)"
];

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycastCheck(event);
}

window.addEventListener('click', () => {
    if (hoveredObj) {
        playClickSound(); 
    }
});

function raycastCheck(event) {
    const tooltip = document.getElementById('tooltip');
    raycaster.setFromCamera(mouse, camera);

    let intersects = [];
    if (currentMode === 'rusuk') intersects = raycaster.intersectObjects(edgeTubes);
    else if (currentMode === 'sisi') intersects = raycaster.intersectObject(cylinderMesh);

    if (intersects.length > 0) {
        const intersect = intersects[0];
        const object = intersect.object;

        let shouldUpdateHover = false;

        if (currentMode === 'sisi') {
            const materialIndex = intersect.face.materialIndex;
            if (hoveredObj !== object || hoveredFaceIndex !== materialIndex) {
                resetHover();
                hoveredObj = object;
                hoveredFaceIndex = materialIndex;
                const mat = cylinderMesh.material[materialIndex];
                mat.emissive.setHex(0x555555); // Highlight face
                tooltip.textContent = sisiNames[materialIndex];
                shouldUpdateHover = true;
            } else {
                shouldUpdateHover = true;
            }
        }
        else if (currentMode === 'rusuk') { 
            if (hoveredObj !== object) {
                resetHover();
                hoveredObj = object;
                hoveredObj.material = hoveredObj.userData.hoverMat;
                hoveredObj.scale.set(1.05, 1.05, 1.05);
                tooltip.textContent = hoveredObj.userData.id === 1 ? "Rusuk Atas (Lengkung)" : "Rusuk Bawah (Lengkung)";
                shouldUpdateHover = true;
            } else {
                shouldUpdateHover = true;
            }
        }

        if (shouldUpdateHover) {
            document.body.style.cursor = 'pointer';
            tooltip.style.left = event.clientX + 'px';
            tooltip.style.top = event.clientY + 'px';
            tooltip.classList.remove('hidden');

            isIdle = false;
            clearTimeout(idleTimer);
            resetIdleTimer();
        }

    } else {
        resetHover();
    }
}

function resetHover() {
    if (hoveredObj) {
        if (currentMode === 'sisi') {
            if (hoveredFaceIndex !== -1) {
                cylinderMesh.material[hoveredFaceIndex].emissive.setHex(0x000000);
            }
        } else {
            hoveredObj.material = hoveredObj.userData.originalMat;
            hoveredObj.scale.set(1, 1, 1);
        }
        hoveredObj = null;
        hoveredFaceIndex = -1;
        document.body.style.cursor = 'default';
        document.getElementById('tooltip').classList.add('hidden');
    }
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        isIdle = true;
    }, 4000);
}

function toggleFold() {
    isFolded = !isFolded;
    playClickSound();
    const btn = document.getElementById('btn-fold');
    if (btn) {
        btn.innerHTML = isFolded ? '🔓 Buka Jaring-Jaring' : '🔒 Lipat Jaring-Jaring';
    }
}

function updateJaring() {
    if (currentMode !== 'jaring') return;

    const targetProgress = isFolded ? 1.0 : 0.0;
    foldProgress += (targetProgress - foldProgress) * 0.1;
    if (Math.abs(foldProgress - targetProgress) < 0.001) {
        foldProgress = targetProgress;
    }

    // 1. Bend the wrapper plane (selimut)
    const geom = jaringSelimutGeom;
    const pos = geom.attributes.position;
    const original = geom.userData.originalPositions;
    const count = pos.count;
    const t = foldProgress;

    if (t <= 0.005) {
        // Lay perfectly flat
        for (let i = 0; i < count; i++) {
            const orig = original[i];
            pos.setXYZ(i, orig.x, orig.y, orig.z);
        }
    } else {
        // Bend into a cylinder shell segment of radius Rt = RADIUS / t
        const Rt = RADIUS / t;
        for (let i = 0; i < count; i++) {
            const orig = original[i];
            const theta = t * orig.x / RADIUS;
            const xNew = Rt * Math.sin(theta);
            const zNew = Rt * (Math.cos(theta) - 1);
            pos.setXYZ(i, xNew, orig.y, zNew);
        }
    }
    pos.needsUpdate = true;
    geom.computeVertexNormals();

    // 2. Rotate top and bottom cap circles
    const angleCap = foldProgress * Math.PI / 2;
    if (hinges.top) hinges.top.rotation.x = -angleCap;
    if (hinges.bottom) hinges.bottom.rotation.x = angleCap;
}

// Resize event
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    if (isIdle) {
        mainGroup.rotation.y += 0.003;
        mainGroup.rotation.x += 0.001;
    }

    // Update Jaring-jaring if active
    updateJaring();

    renderer.render(scene, camera);
}

window.onload = init;
