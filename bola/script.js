// Global Three.js variables
let scene, camera, renderer, controls;
let raycaster, mouse;

// Scene Objects
let mainGroup;
let sphereMaterial, sphereMesh;

// Labels & Mode config
let currentMode = null; // 'sisi', 'rusuk', 'sudut'
let isIdle = true;
let idleTimer;

// Geometry Dimensions
const RADIUS = 2;

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
    // 1. Sisi (Faces) - Sphere
    // ===========================
    const geometry = new THREE.SphereGeometry(RADIUS, 64, 64);
    sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x0abde3,
        transparent: true,
        opacity: 0.8,
        shininess: 90,
        side: THREE.DoubleSide
    });

    sphereMesh = new THREE.Mesh(geometry, sphereMaterial);
    mainGroup.add(sphereMesh);

    // Lights
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

    sphereMesh.visible = true;

    if (mode === 'sisi') {
        document.getElementById('btn-sisi').innerHTML = 'Tampilkan Sisi (1)';
        panel.innerHTML = "Bola hanya memiliki <b>1 sisi</b> melengkung tertutup. Karena itulah bola bisa menggelinding ke segala arah.";
        sphereMaterial.opacity = 0.9;
        resetViewSmoothly(0, 2, 7);
    }
    else if (mode === 'rusuk') {
        document.getElementById('btn-rusuk').innerHTML = 'Tampilkan Rusuk (0)';
        panel.innerHTML = "Bola memiliki <b>0 rusuk</b> karena permukaannya merupakan satu kesatuan lengkung tak terputus.";
        sphereMaterial.opacity = 0.3;
        resetViewSmoothly(0, 3, 7);
    }
    else if (mode === 'sudut') {
        document.getElementById('btn-sudut').innerHTML = 'Tampilkan Titik Sudut (0)';
        panel.innerHTML = "Bola memiliki <b>0 titik sudut</b>.";
        sphereMaterial.opacity = 0.3;
        resetViewSmoothly(4, 3, 5); 
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
    if (currentMode === 'sisi') intersects = raycaster.intersectObject(sphereMesh);

    if (intersects.length > 0) {
        const intersect = intersects[0];
        const object = intersect.object;

        if (hoveredObj !== object) {
            resetHover();
            hoveredObj = object;
            sphereMaterial.emissive.setHex(0x555555); // Highlight face
            tooltip.textContent = "Sisi Permukaan Bola";
            document.body.style.cursor = 'pointer';
            tooltip.style.left = event.clientX + 'px';
            tooltip.style.top = event.clientY + 'px';
            tooltip.classList.remove('hidden');

            isIdle = false;
            clearTimeout(idleTimer);
            resetIdleTimer();
        } else {
            tooltip.style.left = event.clientX + 'px';
            tooltip.style.top = event.clientY + 'px';
        }

    } else {
        resetHover();
    }
}

function resetHover() {
    if (hoveredObj) {
        sphereMaterial.emissive.setHex(0x000000);
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

    renderer.render(scene, camera);
}

window.onload = init;
