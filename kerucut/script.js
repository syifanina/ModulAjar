// Global Three.js variables
let scene, camera, renderer, controls;
let raycaster, mouse;

// Scene Objects
let mainGroup;
let coneMaterial, coneMesh;
let baseMaterial, baseMesh;
let edgesGroup;
let edgeTubes = [];

// Jaring-jaring config
let jaringGroup;
let jaringSelimutGeom;
let jaringBaseMesh;
let isFolded = true;
let foldProgress = 1.0;

// Labels & Mode config
let currentMode = null; // 'sisi', 'rusuk', 'sudut', 'jaring'
let isIdle = true;
let idleTimer;

// Geometry Dimensions
const RADIUS = 2;
const HEIGHT = 4;
// Slant height S = sqrt(R^2 + H^2)
const S = Math.sqrt(RADIUS*RADIUS + HEIGHT*HEIGHT);
// Sector angle in radians = 2 * PI * R / S
const THETA = (2 * Math.PI * RADIUS) / S;

// Initialization
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(4, 3, 6); 

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.addEventListener('start', () => { isIdle = false; clearTimeout(idleTimer); });
    controls.addEventListener('end', resetIdleTimer);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

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
    const coneGeom = new THREE.ConeGeometry(RADIUS, HEIGHT, 64, 1, true); // true = open ended
    coneMaterial = new THREE.MeshPhongMaterial({
        color: 0x30cfd0,
        transparent: true,
        opacity: 0.8,
        shininess: 90,
        side: THREE.DoubleSide
    });
    coneMesh = new THREE.Mesh(coneGeom, coneMaterial);
    coneMesh.position.y = HEIGHT / 2;
    coneMesh.userData = { id: 0, name: "Sisi Selimut (Melengkung)" };
    mainGroup.add(coneMesh);

    const baseGeom = new THREE.CircleGeometry(RADIUS, 64);
    baseMaterial = new THREE.MeshPhongMaterial({
        color: 0x330867,
        transparent: true,
        opacity: 0.8,
        shininess: 90,
        side: THREE.DoubleSide
    });
    baseMesh = new THREE.Mesh(baseGeom, baseMaterial);
    baseMesh.rotation.x = Math.PI / 2;
    baseMesh.userData = { id: 1, name: "Sisi Alas (Lingkaran)" };
    mainGroup.add(baseMesh);

    // ===========================
    // 2. Rusuk (Edges)
    // ===========================
    edgesGroup = new THREE.Group();
    const edgeMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const edgeHoverMat = new THREE.MeshPhongMaterial({ color: 0xffd32a, emissive: 0xffa502 });

    const torusGeo = new THREE.TorusGeometry(RADIUS, 0.05, 16, 100);
    const edgeMesh = new THREE.Mesh(torusGeo, edgeMat.clone());
    edgeMesh.rotation.x = Math.PI / 2;
    edgeMesh.userData = { id: 1, originalMat: edgeMat, hoverMat: edgeHoverMat, type: 'rusuk' };
    edgesGroup.add(edgeMesh);
    edgeTubes.push(edgeMesh);
    
    edgesGroup.visible = false;
    mainGroup.add(edgesGroup);

    // ===========================
    // 3. Jaring-jaring
    // ===========================
    jaringGroup = new THREE.Group();
    
    // Create a plane geometry with 64 segments along width and 1 along height
    jaringSelimutGeom = new THREE.PlaneGeometry(1, 1, 64, 1);
    
    // We will morph this geometry in updateJaring()
    const jaringSelimut = new THREE.Mesh(jaringSelimutGeom, coneMaterial.clone());
    jaringSelimut.material.opacity = 0.9;
    jaringGroup.add(jaringSelimut);

    // Create hinge for the base circle
    jaringBaseMesh = new THREE.Group();
    const baseMesh2 = new THREE.Mesh(baseGeom, baseMaterial.clone());
    baseMesh2.material.opacity = 0.9;
    
    // Offset the base circle so it attaches to the hinge at its edge
    baseMesh2.position.set(0, 0, -RADIUS);
    baseMesh2.rotation.x = Math.PI / 2; // Flat on XZ plane
    
    jaringBaseMesh.add(baseMesh2);
    jaringGroup.add(jaringBaseMesh);
    
    jaringGroup.visible = false;
    mainGroup.add(jaringGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);
    
    mainGroup.position.y = -HEIGHT / 2;
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

function resetViewSmoothly(camX, camY, camZ) {
    isIdle = false; 
    clearTimeout(idleTimer);
    const startCam = camera.position.clone();
    const endCam = new THREE.Vector3(camX, camY, camZ);

    let curX = mainGroup.rotation.x % (Math.PI * 2);
    let curY = mainGroup.rotation.y % (Math.PI * 2);
    let curZ = mainGroup.rotation.z % (Math.PI * 2);
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
        if (progress < 1) requestAnimationFrame(anim);
        else resetIdleTimer(); 
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

    coneMesh.visible = true;
    baseMesh.visible = true;
    coneMaterial.opacity = 0.2;
    baseMaterial.opacity = 0.2;
    edgesGroup.visible = false;
    jaringGroup.visible = false;
    document.getElementById('btn-fold').style.display = 'none';

    if (mode === 'sisi') {
        document.getElementById('btn-sisi').innerHTML = 'Tampilkan Sisi (2)';
        panel.innerHTML = "Kerucut memiliki <b>2 sisi</b>:<br>" +
                          "1. <b>Sisi Alas</b> (lingkaran bawah)<br>" +
                          "2. <b>Sisi Selimut</b> (bidang lengkung penyelimut)";
        coneMaterial.opacity = 0.9;
        baseMaterial.opacity = 0.9;
        resetViewSmoothly(0, 2, 7);
    }
    else if (mode === 'rusuk') {
        document.getElementById('btn-rusuk').innerHTML = 'Tampilkan Rusuk (1)';
        panel.innerHTML = "Kerucut memiliki <b>1 rusuk</b> melengkung yang membatasi sisi alas. Kerucut tidak memiliki rusuk lurus.";
        coneMaterial.opacity = 0.15;
        baseMaterial.opacity = 0.15;
        edgesGroup.visible = true;
        resetViewSmoothly(0, 3, 7);
    }
    else if (mode === 'sudut') {
        document.getElementById('btn-sudut').innerHTML = 'Tampilkan Titik Sudut (1)';
        panel.innerHTML = "Kerucut memiliki <b>1 titik puncak</b> di bagian atas. (Titik sudut hanya ada 1).";
        coneMaterial.opacity = 0.15;
        baseMaterial.opacity = 0.15;
        resetViewSmoothly(4, 3, 5); 
    }
    else if (mode === 'jaring') {
        panel.innerHTML = "Jaring-jaring kerucut terdiri dari sebuah juring lingkaran (selimut) dan sebuah lingkaran (alas). Tekan tombol <b>Buka Jaring-Jaring</b> untuk membukanya!";
        coneMesh.visible = false;
        baseMesh.visible = false;
        jaringGroup.visible = true;
        const foldBtn = document.getElementById('btn-fold');
        foldBtn.style.display = 'block';
        foldBtn.innerHTML = isFolded ? '🔓 Buka Jaring-Jaring' : '🔒 Lipat Jaring-Jaring';
        resetViewSmoothly(0, 4, 8);
    }
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

    const pos = jaringSelimutGeom.attributes.position;
    const count = pos.count;
    const segments = 64;
    const t = foldProgress;
    
    // The slant angle of the cone
    const phi_final = Math.asin(RADIUS / S);
    // Interpolate from flat (PI/2) to folded (phi_final)
    const phi = (Math.PI / 2) * (1 - t) + phi_final * t;
    
    const sin_phi = Math.sin(phi);
    const cos_phi = Math.cos(phi);

    let vIdx = 0;
    for (let j = 0; j <= 1; j++) {
        let v = j; 
        for (let i = 0; i <= segments; i++) {
            let u = (i / segments) - 0.5;
            let gamma = u * THETA;
            let beta = gamma / sin_phi;
            
            let S_local = v * S;
            let r = S_local * sin_phi;
            let y = -S_local * cos_phi;
            
            let x = r * Math.sin(beta);
            let z = r * Math.cos(beta);
            
            pos.setXYZ(vIdx, x, y, z);
            vIdx++;
        }
    }
    pos.needsUpdate = true;
    jaringSelimutGeom.computeVertexNormals();

    // The hinge is at the center of the arc (u=0, v=1)
    // gamma = 0, beta = 0.
    // r = S * sin_phi, y = -S * cos_phi, z = r.
    jaringBaseMesh.position.set(0, -S * cos_phi, S * sin_phi);
    
    // Rotate the hinge to fold the base circle outwards when flat
    jaringBaseMesh.rotation.x = (1 - t) * Math.PI;
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

let hoveredObj = null;
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycastCheck(event);
}

window.addEventListener('click', () => {
    if (hoveredObj) playClickSound(); 
});

function raycastCheck(event) {
    const tooltip = document.getElementById('tooltip');
    raycaster.setFromCamera(mouse, camera);

    let intersects = [];
    if (currentMode === 'rusuk') intersects = raycaster.intersectObjects(edgeTubes);
    else if (currentMode === 'sisi') intersects = raycaster.intersectObjects([coneMesh, baseMesh]);

    if (intersects.length > 0) {
        const intersect = intersects[0];
        const object = intersect.object;
        let shouldUpdateHover = false;
        if (currentMode === 'sisi') {
            if (hoveredObj !== object) {
                resetHover();
                hoveredObj = object;
                object.material.emissive.setHex(0x555555);
                tooltip.textContent = object.userData.name;
                shouldUpdateHover = true;
            } else shouldUpdateHover = true;
        }
        else if (currentMode === 'rusuk') { 
            if (hoveredObj !== object) {
                resetHover();
                hoveredObj = object;
                hoveredObj.material = hoveredObj.userData.hoverMat;
                hoveredObj.scale.set(1.05, 1.05, 1.05);
                tooltip.textContent = "Rusuk Lengkung (Alas)";
                shouldUpdateHover = true;
            } else shouldUpdateHover = true;
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
            hoveredObj.material.emissive.setHex(0x000000);
        } else {
            hoveredObj.material = hoveredObj.userData.originalMat;
            hoveredObj.scale.set(1, 1, 1);
        }
        hoveredObj = null;
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

    updateJaring();
    renderer.render(scene, camera);
}

window.onload = init;
