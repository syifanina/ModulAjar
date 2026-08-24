// Global Three.js variables
let scene, camera, renderer, controls;
let raycaster, mouse;

// Scene Objects
let mainGroup;
let cubeMaterial, cubeMesh;
let edgesGroup, edgesMesh;
let verticesGroup;
let vertexSpheres = [];
let edgeTubes = [];
let volumeGroup;
let unitCubes = [];
let volumeAnimTimer = null;

// Labels & Mode config
let vertexLabels = [];
let currentMode = null; // 'sisi', 'rusuk', 'sudut', 'volume', 'jaring'
let isIdle = true;
let idleTimer;

// Jaring-jaring config
let jaringGroup;
let hinges = {};
let isFolded = true;
let foldProgress = 1.0;

// Geometry configuration (width, height, depth) for Cube
const W = 3;
const H = 3;
const D = 3;

// Initialization
function init() {
    // 1. Setup Scene
    scene = new THREE.Scene();

    // 2. Setup Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(4, 3, 5); // Digeser sedikit ke belakang agar posisinya pas di tengah layar

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

    const geometry = new THREE.BoxGeometry(W, H, D);

    // ===========================
    // 1. Sisi (Faces)
    // ===========================
    const faceColors = [
        0xff9f43, // Kanan (Oranye)
        0xee5253, // Kiri (Merah muda/merah)
        0x10ac84, // Atas (Hijau tua)
        0x0abde3, // Bawah (Biru cyan)
        0x5f27cd, // Depan (Ungu)
        0xfeca57  // Belakang (Kuning)
    ];

    cubeMaterial = faceColors.map(color => new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        shininess: 90,
        side: THREE.DoubleSide
    }));

    cubeMesh = new THREE.Mesh(geometry, cubeMaterial);
    mainGroup.add(cubeMesh);

    // ===========================
    // 2. Rusuk (Edges)
    // ===========================
    edgesGroup = new THREE.Group();
    const edgeRadius = 0.05;
    const edgeMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const edgeHoverMat = new THREE.MeshPhongMaterial({ color: 0xffd32a, emissive: 0xffa502 });

    const geoX = new THREE.CylinderGeometry(edgeRadius, edgeRadius, W + edgeRadius * 2, 8);
    const geoY = new THREE.CylinderGeometry(edgeRadius, edgeRadius, H + edgeRadius * 2, 8);
    const geoZ = new THREE.CylinderGeometry(edgeRadius, edgeRadius, D + edgeRadius * 2, 8);

    edgeTubes = [];
    let edgeCount = 1;

    function addEdge(geo, x, y, z, rotX, rotZ) {
        const mesh = new THREE.Mesh(geo, edgeMat.clone());
        mesh.position.set(x, y, z);
        mesh.rotation.set(rotX, 0, rotZ);
        mesh.userData = { id: edgeCount++, originalMat: edgeMat, hoverMat: edgeHoverMat, type: 'rusuk' };
        edgesGroup.add(mesh);
        edgeTubes.push(mesh);
    }

    const rx = Math.PI / 2;
    const rz = Math.PI / 2;

    // 4 edges along X
    addEdge(geoX, 0, H / 2, D / 2, 0, rz);
    addEdge(geoX, 0, H / 2, -D / 2, 0, rz);
    addEdge(geoX, 0, -H / 2, D / 2, 0, rz);
    addEdge(geoX, 0, -H / 2, -D / 2, 0, rz);

    // 4 edges along Y
    addEdge(geoY, W / 2, 0, D / 2, 0, 0);
    addEdge(geoY, W / 2, 0, -D / 2, 0, 0);
    addEdge(geoY, -W / 2, 0, D / 2, 0, 0);
    addEdge(geoY, -W / 2, 0, -D / 2, 0, 0);

    // 4 edges along Z
    addEdge(geoZ, W / 2, H / 2, 0, rx, 0);
    addEdge(geoZ, W / 2, -H / 2, 0, rx, 0);
    addEdge(geoZ, -W / 2, H / 2, 0, rx, 0);
    addEdge(geoZ, -W / 2, -H / 2, 0, rx, 0);

    edgesGroup.visible = false;
    mainGroup.add(edgesGroup);

    // ===========================
    // 3. Titik Sudut (Vertices)
    // ===========================
    verticesGroup = new THREE.Group();

    // Create markers for vertices
    const sphereGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const sphereMat = new THREE.MeshPhongMaterial({ color: 0xff6b6b }); // Reddish
    const hoverMat = new THREE.MeshPhongMaterial({ color: 0xffd32a, emissive: 0xffa502 });

    const posAttr = geometry.attributes.position;
    const vertexPositions = [];
    const labelsContainer = document.getElementById('labels-container');

    // BoxGeometry handles 24 vertices. We compute 8 unique:
    for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        const z = posAttr.getZ(i);
        const vec = new THREE.Vector3(x, y, z);

        let isDuplicate = false;
        for (let j = 0; j < vertexPositions.length; j++) {
            if (vertexPositions[j].distanceTo(vec) < 0.001) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            vertexPositions.push(vec);
        }
    }

    // Now we have exactly 8 unique points. Create spheres at these points
    vertexPositions.forEach((pos, index) => {
        // Sphere Mesh
        const sphere = new THREE.Mesh(sphereGeo, sphereMat.clone());
        sphere.position.copy(pos);
        sphere.userData = { id: index + 1, originalMat: sphereMat, hoverMat: hoverMat };
        verticesGroup.add(sphere);
        vertexSpheres.push(sphere);

        // HTML Label Element
        const labelDiv = document.createElement('div');
        labelDiv.className = 'vertex-label';
        labelDiv.textContent = (index + 1).toString();
        labelsContainer.appendChild(labelDiv);
        vertexLabels.push({ element: labelDiv, pos: pos });
    });

    verticesGroup.visible = false;
    mainGroup.add(verticesGroup);

    // ===========================
    // 4. Volume (Unit Cubes)
    // ===========================
    volumeGroup = new THREE.Group();
    const unitGeo = new THREE.BoxGeometry(0.95, 0.95, 0.95);
    const unitMat = new THREE.MeshPhongMaterial({ color: 0xff4d4d, shininess: 100 });

    // Create WxHxD grid of cubes
    const startX = -W / 2 + 0.5;
    const startY = -H / 2 + 0.5;
    const startZ = -D / 2 + 0.5;

    for (let y = 0; y < H; y++) {
        for (let z = 0; z < D; z++) {
            for (let x = 0; x < W; x++) {
                const mesh = new THREE.Mesh(unitGeo, unitMat);
                mesh.position.set(startX + x, startY + y, startZ + z);
                mesh.scale.set(0, 0, 0); // hidden initially
                volumeGroup.add(mesh);
                unitCubes.push(mesh);
            }
        }
    }
    volumeGroup.visible = false;
    // ===========================
    // 5. Jaring-jaring (Cube Net)
    // ===========================
    jaringGroup = new THREE.Group();
    const faceThickness = 0.02;
    const faceGeo = new THREE.BoxGeometry(3, faceThickness, 3);
    const jaringMaterials = faceColors.map(color => new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        shininess: 90,
        side: THREE.DoubleSide
    }));

    // Alas (Bottom) - mesh index 3
    const alasGroup = new THREE.Group();
    alasGroup.position.set(0, -1.5, 0);
    const alasMesh = new THREE.Mesh(faceGeo, jaringMaterials[3]);
    alasMesh.position.set(0, 0, 0);
    alasGroup.add(alasMesh);
    jaringGroup.add(alasGroup);

    // Front (Depan) - mesh index 4 (folds around z = 1.5)
    const frontHinge = new THREE.Group();
    frontHinge.position.set(0, 0, 1.5);
    const frontMesh = new THREE.Mesh(faceGeo, jaringMaterials[4]);
    frontMesh.position.set(0, 0, 1.5);
    frontHinge.add(frontMesh);
    alasGroup.add(frontHinge);
    hinges.front = frontHinge;

    // Back (Belakang) - mesh index 5 (folds around z = -1.5)
    const backHinge = new THREE.Group();
    backHinge.position.set(0, 0, -1.5);
    const backMesh = new THREE.Mesh(faceGeo, jaringMaterials[5]);
    backMesh.position.set(0, 0, -1.5);
    backHinge.add(backMesh);
    alasGroup.add(backHinge);
    hinges.back = backHinge;

    // Top (Atas) - mesh index 2 (folds around z = -3 relative to back hinge)
    const topHinge = new THREE.Group();
    topHinge.position.set(0, 0, -3);
    const topMesh = new THREE.Mesh(faceGeo, jaringMaterials[2]);
    topMesh.position.set(0, 0, -1.5);
    topHinge.add(topMesh);
    backHinge.add(topHinge);
    hinges.top = topHinge;

    // Left (Kiri) - mesh index 1 (folds around x = -1.5)
    const leftHinge = new THREE.Group();
    leftHinge.position.set(-1.5, 0, 0);
    const leftMesh = new THREE.Mesh(faceGeo, jaringMaterials[1]);
    leftMesh.position.set(-1.5, 0, 0);
    leftHinge.add(leftMesh);
    alasGroup.add(leftHinge);
    hinges.left = leftHinge;

    // Right (Kanan) - mesh index 0 (folds around x = 1.5)
    const rightHinge = new THREE.Group();
    rightHinge.position.set(1.5, 0, 0);
    const rightMesh = new THREE.Mesh(faceGeo, jaringMaterials[0]);
    rightMesh.position.set(1.5, 0, 0);
    rightHinge.add(rightMesh);
    alasGroup.add(rightHinge);
    hinges.right = rightHinge;

    jaringGroup.visible = false;
    mainGroup.add(jaringGroup);

    // ===========================
    // Lights
    // ===========================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);
}

// Interaksi Logic
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

function setMode(mode) {
    currentMode = mode;
    playClickSound();

    // Update Button UI
    document.querySelectorAll('.controls button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${mode}`).classList.add('active');

    // Update Text Detail Panel
    const panel = document.getElementById('info-panel');
    panel.classList.remove('hidden');

    // Default styles
    cubeMesh.visible = true;
    cubeMesh.material.forEach(mat => mat.opacity = 0.2);
    edgesGroup.visible = false;
    verticesGroup.visible = false;
    volumeGroup.visible = false;
    jaringGroup.visible = false;
    document.getElementById('btn-fold').style.display = 'none';
    vertexLabels.forEach(lbl => lbl.element.classList.remove('visible'));
    clearInterval(volumeAnimTimer); // Stop animation if running
    unitCubes.forEach(c => c.scale.set(0, 0, 0)); // Reset cubes

    if (mode === 'sisi') {
        panel.textContent = "Kubus memiliki 6 sisi berbentuk persegi. Tiap sisi diberi warna berbeda agar mudah dilihat.";
        cubeMesh.material.forEach(mat => mat.opacity = 0.9);
        mainGroup.rotation.set(0, 0, 0);
        camera.position.set(0, 0, 6);
        controls.update();
    }
    else if (mode === 'rusuk') {
        panel.textContent = "Kubus memiliki 12 rusuk (garis tepi) yang sama panjang.";
        cubeMesh.material.forEach(mat => mat.opacity = 0.15);
        edgesGroup.visible = true;
        mainGroup.rotation.set(0, 0, 0);
        camera.position.set(0, 3, 5);
        controls.update();
    }
    else if (mode === 'sudut') {
        panel.textContent = "Kubus memiliki 8 titik sudut (pertemuan 3 rusuk).";
        cubeMesh.material.forEach(mat => mat.opacity = 0.1);
        edgesGroup.visible = true;
        verticesGroup.visible = true;
        vertexLabels.forEach(lbl => lbl.element.classList.add('visible'));
    }
    else if (mode === 'volume') {
        panel.textContent = "Volume adalah isi ruangan. Kubus ini (s=3) memuat tepat 27 kubus satuan!";
        cubeMesh.material.forEach(mat => mat.opacity = 0.15);
        edgesGroup.visible = true;
        volumeGroup.visible = true;
        playVolumeAnimation();
    }
    else if (mode === 'jaring') {
        panel.innerHTML = "Jaring-jaring kubus terdiri dari 6 buah persegi. Tekan tombol <b>Buka Jaring-Jaring</b> di panel kiri untuk melihat proses membukanya secara interaktif.";
        cubeMesh.visible = false;
        jaringGroup.visible = true;
        const foldBtn = document.getElementById('btn-fold');
        foldBtn.style.display = 'block';
        foldBtn.innerHTML = isFolded ? '🔓 Buka Jaring-Jaring' : '🔒 Lipat Jaring-Jaring';
        resetViewSmoothly(0, 3, 7);
    }
}

function playVolumeAnimation() {
    let index = 0;
    // Animate one by one pop in
    volumeAnimTimer = setInterval(() => {
        if (index >= unitCubes.length) {
            clearInterval(volumeAnimTimer);
            return;
        }
        unitCubes[index].scale.set(1, 1, 1);
        playBlipSound();
        index++;
    }, 150); // 150ms delay per cube
}

// Musik Background
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
let hoveredFaceIndex = -1; // Specific for Sisi mode
const sisiNames = ["Sisi Kanan", "Sisi Kiri", "Sisi Atas", "Sisi Bawah", "Sisi Depan", "Sisi Belakang"];

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycastCheck(event);
}

window.addEventListener('click', () => {
    if (hoveredObj) {
        playClickSound(); // Tembakkan suara jika diklik object tersebut!
    }
});

function raycastCheck(event) {
    const tooltip = document.getElementById('tooltip');
    raycaster.setFromCamera(mouse, camera);

    let intersects = [];
    if (currentMode === 'sudut') intersects = raycaster.intersectObjects(vertexSpheres);
    else if (currentMode === 'rusuk') intersects = raycaster.intersectObjects(edgeTubes);
    else if (currentMode === 'sisi') intersects = raycaster.intersectObject(cubeMesh);

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
                const mat = cubeMesh.material[materialIndex];
                mat.emissive.setHex(0x555555); // Highlight face
                tooltip.textContent = sisiNames[materialIndex];
                shouldUpdateHover = true;
            } else {
                shouldUpdateHover = true; // just update tooltip pos
            }
        }
        else { // sudut or rusuk
            if (hoveredObj !== object) {
                resetHover();
                hoveredObj = object;
                hoveredObj.material = hoveredObj.userData.hoverMat;
                if (currentMode === 'sudut') {
                    hoveredObj.scale.set(1.4, 1.4, 1.4);
                    tooltip.textContent = `Titik Sudut ${hoveredObj.userData.id}`;
                } else { // rusuk
                    hoveredObj.scale.set(1.15, 1, 1.15);
                    tooltip.textContent = `Rusuk ${hoveredObj.userData.id}`;
                }
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
                cubeMesh.material[hoveredFaceIndex].emissive.setHex(0x000000);
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

// Update 2D Label Position to Match 3D Perspective
function updateLabels() {
    if (currentMode !== 'sudut') return;

    vertexLabels.forEach(label => {
        // Create an updated position copy taking mesh rotation into account
        const vector = label.pos.clone();

        vector.applyMatrix4(mainGroup.matrixWorld);

        // Project to 2D
        vector.project(camera);

        // Convert to screen CSS coordinates
        const x = (vector.x * .5 + .5) * window.innerWidth;
        const y = -(vector.y * .5 - .5) * window.innerHeight;

        label.element.style.left = `${x}px`;
        label.element.style.top = `${y}px`;

        // Celing / Adjust z indexing so labels in front overlap labels in back
        label.element.style.zIndex = Math.floor((1 - vector.z) * 100);
    });
}

// Idle Animations
function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        isIdle = true;
    }, 4000); // Wait 4 seconds after interaction to resume idle
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

    const theta = foldProgress * Math.PI / 2;
    if (hinges.front) hinges.front.rotation.x = -theta;
    if (hinges.back) hinges.back.rotation.x = theta;
    if (hinges.top) hinges.top.rotation.x = theta;
    if (hinges.left) hinges.left.rotation.z = -theta;
    if (hinges.right) hinges.right.rotation.z = theta;
}

// Resize event
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Rendering Loop
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    // Idle rotation animation
    if (isIdle) {
        mainGroup.rotation.y += 0.003;
        mainGroup.rotation.x += 0.001;
    }

    // Update Jaring-jaring if active
    updateJaring();

    // Refresh overlay labels
    updateLabels();

    renderer.render(scene, camera);
}

window.onload = init;
