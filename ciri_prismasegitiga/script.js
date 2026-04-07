// Global Three.js variables
let scene, camera, renderer, controls;
let raycaster, mouse;

// Scene Objects
let mainGroup;
let prismMaterial, prismMesh;
let edgesGroup, edgesMesh;
let verticesGroup;
let vertexSpheres = [];
let edgeTubes = [];

// Labels & Mode config
let vertexLabels = [];
let currentMode = null; // 'sisi', 'rusuk', 'sudut'
let isIdle = true;
let idleTimer;

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
    const geometry = new THREE.BufferGeometry();
    const verticesArr = new Float32Array([
        // Bawah (0)
        -2, -2,  1.5,   // 0
         2, -2,  1.5,   // 1
         0, -2, -1.5,   // 2

        // Atas (1)
        -2,  2,  1.5,   // 3
         2,  2,  1.5,   // 4
         0,  2, -1.5,   // 5

        // Depan (2)
        -2, -2,  1.5,   // 6 (v0)
         2, -2,  1.5,   // 7 (v1)
         2,  2,  1.5,   // 8 (v4)
        -2,  2,  1.5,   // 9 (v3)

        // Kiri Belakang (3)
        -2, -2,  1.5,   // 10 (v0)
         0, -2, -1.5,   // 11 (v2)
         0,  2, -1.5,   // 12 (v5)
        -2,  2,  1.5,   // 13 (v3)

        // Kanan Belakang (4)
         2, -2,  1.5,   // 14 (v1)
         0, -2, -1.5,   // 15 (v2)
         0,  2, -1.5,   // 16 (v5)
         2,  2,  1.5,   // 17 (v4)
    ]);

    const indicesArr = [
        // Bawah
        0, 2, 1, 
        // Atas
        3, 4, 5, 
        // Depan
        6, 7, 8, 6, 8, 9, 
        // Kiri Belakang
        11, 10, 13, 11, 13, 12, 
        // Kanan Belakang
        14, 15, 16, 14, 16, 17
    ];

    geometry.setAttribute('position', new THREE.BufferAttribute(verticesArr, 3));
    geometry.setIndex(indicesArr);
    geometry.computeVertexNormals();

    geometry.addGroup(0, 3, 0); // Bawah
    geometry.addGroup(3, 3, 1); // Atas
    geometry.addGroup(6, 6, 2); // Depan
    geometry.addGroup(12, 6, 3); // Kiri Belakang
    geometry.addGroup(18, 6, 4); // Kanan Belakang

    const faceColors = [
        0x0abde3, // Bawah (Biru cyan)
        0x10ac84, // Atas (Hijau tua)
        0x5f27cd, // Depan (Ungu)
        0xee5253, // Kiri Belakang (Merah)
        0xff9f43, // Kanan Belakang (Oranye)
    ];

    prismMaterial = faceColors.map(color => new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        shininess: 90,
        side: THREE.DoubleSide
    }));

    prismMesh = new THREE.Mesh(geometry, prismMaterial);
    mainGroup.add(prismMesh);


    // ===========================
    // 2. Rusuk (Edges)
    // ===========================
    edgesGroup = new THREE.Group();
    const edgeMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const edgeHoverMat = new THREE.MeshPhongMaterial({ color: 0xffd32a, emissive: 0xffa502 });

    const uniqueVertices = [
        new THREE.Vector3(-2, -2, 1.5),  // 0
        new THREE.Vector3(2, -2, 1.5),   // 1
        new THREE.Vector3(0, -2, -1.5),  // 2
        new THREE.Vector3(-2, 2, 1.5),   // 3
        new THREE.Vector3(2, 2, 1.5),    // 4
        new THREE.Vector3(0, 2, -1.5)    // 5
    ];

    const edgePairs = [
        [0, 1], [1, 2], [2, 0], // Bawah
        [3, 4], [4, 5], [5, 3], // Atas
        [0, 3], [1, 4], [2, 5]  // Tegak
    ];

    let edgeCount = 1;

    function addEdge(p1, p2) {
        const distance = p1.distanceTo(p2);
        const geo = new THREE.CylinderGeometry(0.05, 0.05, distance, 8);
        const mesh = new THREE.Mesh(geo, edgeMat.clone());
        
        const pos = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        mesh.position.copy(pos);
        
        const axis = new THREE.Vector3(0, 1, 0); 
        const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
        mesh.quaternion.setFromUnitVectors(axis, dir);
        
        mesh.userData = { id: edgeCount++, originalMat: edgeMat, hoverMat: edgeHoverMat, type: 'rusuk' };
        edgesGroup.add(mesh);
        edgeTubes.push(mesh);
    }

    edgePairs.forEach(pair => {
        addEdge(uniqueVertices[pair[0]], uniqueVertices[pair[1]]);
    });

    edgesGroup.visible = false;
    mainGroup.add(edgesGroup);

    // ===========================
    // 3. Titik Sudut (Vertices)
    // ===========================
    verticesGroup = new THREE.Group();
    const sphereGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const sphereMat = new THREE.MeshPhongMaterial({ color: 0xff6b6b });
    const hoverMat = new THREE.MeshPhongMaterial({ color: 0xffd32a, emissive: 0xffa502 });
    const labelsContainer = document.getElementById('labels-container');

    uniqueVertices.forEach((pos, index) => {
        const sphere = new THREE.Mesh(sphereGeo, sphereMat.clone());
        sphere.position.copy(pos);
        sphere.userData = { id: index + 1, originalMat: sphereMat, hoverMat: hoverMat };
        verticesGroup.add(sphere);
        vertexSpheres.push(sphere);

        const labelDiv = document.createElement('div');
        labelDiv.className = 'vertex-label';
        labelDiv.textContent = (index + 1).toString();
        labelsContainer.appendChild(labelDiv);
        vertexLabels.push({ element: labelDiv, pos: pos });
    });

    verticesGroup.visible = false;
    mainGroup.add(verticesGroup);

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

    prismMesh.material.forEach(mat => mat.opacity = 0.2);
    edgesGroup.visible = false;
    verticesGroup.visible = false;
    vertexLabels.forEach(lbl => lbl.element.classList.remove('visible'));

    if (mode === 'sisi') {
        panel.textContent = "Prisma segitiga memiliki 5 sisi (2 buah segitiga pada alas dan tutup, serta 3 buah persegi panjang pada sisi tegak).";
        prismMesh.material.forEach(mat => mat.opacity = 0.9);
        resetViewSmoothly(0, 0, 8);
    }
    else if (mode === 'rusuk') {
        panel.textContent = "Prisma segitiga memiliki 9 rusuk (garis tepi) yang terdiri dari 3 rusuk alas, 3 rusuk atas, dan 3 rusuk tegak.";
        prismMesh.material.forEach(mat => mat.opacity = 0.15);
        edgesGroup.visible = true;
        resetViewSmoothly(0, 3, 7);
    }
    else if (mode === 'sudut') {
        panel.textContent = "Prisma segitiga memiliki 6 titik sudut.";
        prismMesh.material.forEach(mat => mat.opacity = 0.1);
        edgesGroup.visible = true;
        verticesGroup.visible = true;
        vertexLabels.forEach(lbl => lbl.element.classList.add('visible'));
        resetViewSmoothly(4, 4, 6); 
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
    "Sisi Bawah (Segitiga)",
    "Sisi Atas (Segitiga)",
    "Sisi Depan (Persegi Panjang)",
    "Sisi Kiri Belakang (Persegi Panjang)",
    "Sisi Kanan Belakang (Persegi Panjang)"
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
    if (currentMode === 'sudut') intersects = raycaster.intersectObjects(vertexSpheres);
    else if (currentMode === 'rusuk') intersects = raycaster.intersectObjects(edgeTubes);
    else if (currentMode === 'sisi') intersects = raycaster.intersectObject(prismMesh);

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
                const mat = prismMesh.material[materialIndex];
                mat.emissive.setHex(0x555555); // Highlight face
                tooltip.textContent = sisiNames[materialIndex];
                shouldUpdateHover = true;
            } else {
                shouldUpdateHover = true;
            }
        }
        else { 
            if (hoveredObj !== object) {
                resetHover();
                hoveredObj = object;
                hoveredObj.material = hoveredObj.userData.hoverMat;
                if (currentMode === 'sudut') {
                    hoveredObj.scale.set(1.4, 1.4, 1.4);
                    tooltip.textContent = `Titik Sudut ${hoveredObj.userData.id}`;
                } else { 
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
                prismMesh.material[hoveredFaceIndex].emissive.setHex(0x000000);
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

function updateLabels() {
    if (currentMode !== 'sudut') return;

    vertexLabels.forEach(label => {
        const vector = label.pos.clone();
        vector.applyMatrix4(mainGroup.matrixWorld);
        vector.project(camera);

        const x = (vector.x * .5 + .5) * window.innerWidth;
        const y = -(vector.y * .5 - .5) * window.innerHeight;

        label.element.style.left = `${x}px`;
        label.element.style.top = `${y}px`;

        label.element.style.zIndex = Math.floor((1 - vector.z) * 100);
    });
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        isIdle = true;
    }, 4000);
}

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

    updateLabels();

    renderer.render(scene, camera);
}

window.onload = init;
