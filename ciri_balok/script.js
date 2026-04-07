// Global Three.js variables
let scene, camera, renderer, controls;
let raycaster, mouse;

// Scene Objects
let mainGroup;
let cuboidMaterial, cuboidMesh;
let edgesGroup, edgesMesh;
let verticesGroup;
let vertexSpheres = [];
let volumeGroup;
let unitCubes = [];
let volumeAnimTimer = null;

// Labels & Mode config
let vertexLabels = [];
let currentMode = null; // 'sisi', 'rusuk', 'sudut', 'volume'
let isIdle = true;
let idleTimer;

// Geometry configuration (width, height, depth)
const W = 4;
const H = 2;
const D = 2;

// Initialization
function init() {
    // 1. Setup Scene
    scene = new THREE.Scene();
    
    // 2. Setup Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 4, 6);

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

    cuboidMaterial = faceColors.map(color => new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        shininess: 90,
        side: THREE.DoubleSide
    }));

    cuboidMesh = new THREE.Mesh(geometry, cuboidMaterial);
    mainGroup.add(cuboidMesh);

    // ===========================
    // 2. Rusuk (Edges)
    // ===========================
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ 
        color: 0x222222, 
        linewidth: 3 // Note: WebGL lines are mostly 1px wide depending on platform
    });
    edgesMesh = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    
    // Grouping edge segments
    edgesGroup = new THREE.Group();
    edgesGroup.add(edgesMesh);
    edgesGroup.visible = false; // Hidden default
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
        for(let j=0; j < vertexPositions.length; j++){
            if(vertexPositions[j].distanceTo(vec) < 0.001){
                isDuplicate = true;
                break;
            }
        }
        if(!isDuplicate){
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
    
    // Create 4x2x2 grid of cubes
    // W=4, H=2, D=2 centered at 0,0,0
    const startX = -W/2 + 0.5;
    const startY = -H/2 + 0.5;
    const startZ = -D/2 + 0.5;

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
    mainGroup.add(volumeGroup);

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
function setMode(mode) {
    currentMode = mode;
    
    // Update Button UI
    document.querySelectorAll('.controls button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${mode}`).classList.add('active');

    // Update Text Detail Panel
    const panel = document.getElementById('info-panel');
    panel.classList.remove('hidden');

    // Default styles
    cuboidMesh.material.forEach(mat => mat.opacity = 0.2); 
    edgesGroup.visible = false;
    verticesGroup.visible = false;
    volumeGroup.visible = false;
    vertexLabels.forEach(lbl => lbl.element.classList.remove('visible'));
    clearInterval(volumeAnimTimer); // Stop animation if running
    unitCubes.forEach(c => c.scale.set(0, 0, 0)); // Reset cubes

    if (mode === 'sisi') {
        panel.textContent = "Balok memiliki 6 sisi berbentuk persegi panjang. Tiap sisi diberi warna berbeda agar mudah dilihat.";
        cuboidMesh.material.forEach(mat => mat.opacity = 0.9); 
    } 
    else if (mode === 'rusuk') {
        panel.textContent = "Balok memiliki 12 rusuk (garis tepi).";
        cuboidMesh.material.forEach(mat => mat.opacity = 0.15);
        edgesGroup.visible = true;
    } 
    else if (mode === 'sudut') {
        panel.textContent = "Balok memiliki 8 titik sudut (pertemuan 3 rusuk).";
        cuboidMesh.material.forEach(mat => mat.opacity = 0.1);
        edgesGroup.visible = true;
        verticesGroup.visible = true;
        vertexLabels.forEach(lbl => lbl.element.classList.add('visible'));
    }
    else if (mode === 'volume') {
        panel.textContent = "Volume adalah isi ruangan. Balok ini (p=4, l=2, t=2) memuat tepat 16 kubus satuan!";
        cuboidMesh.material.forEach(mat => mat.opacity = 0.15);
        edgesGroup.visible = true;
        volumeGroup.visible = true;
        playVolumeAnimation();
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
        index++;
    }, 150); // 150ms delay per cube
}

// Raycasting (Hover Effect pada Titik Sudut)
let hoveredSphere = null;
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    const tooltip = document.getElementById('tooltip');
    
    if (currentMode === 'sudut' && verticesGroup.visible) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(vertexSpheres);
        
        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (hoveredSphere !== object) {
                // Reset old
                if (hoveredSphere) {
                    hoveredSphere.material = hoveredSphere.userData.originalMat;
                    hoveredSphere.scale.set(1, 1, 1);
                }
                // Upgrade new
                hoveredSphere = object;
                hoveredSphere.material = hoveredSphere.userData.hoverMat;
                hoveredSphere.scale.set(1.4, 1.4, 1.4);
                document.body.style.cursor = 'pointer';
            }
            
            tooltip.textContent = `Titik Sudut ${hoveredSphere.userData.id}`;
            tooltip.style.left = event.clientX + 'px';
            tooltip.style.top = event.clientY + 'px';
            tooltip.classList.remove('hidden');

            // Set idle to false when actively interacting
            isIdle = false;
            clearTimeout(idleTimer);
            resetIdleTimer();

        } else {
            resetHover();
        }
    } else {
        resetHover();
    }
}

function resetHover() {
    if (hoveredSphere) {
        hoveredSphere.material = hoveredSphere.userData.originalMat;
        hoveredSphere.scale.set(1, 1, 1);
        hoveredSphere = null;
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

    // Refresh overlay labels
    updateLabels();

    renderer.render(scene, camera);
}

window.onload = init;
