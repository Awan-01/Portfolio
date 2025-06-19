// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#threejs-bg'),
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Mouse position
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Add lights
const pointLight = new THREE.PointLight(0x3a86ff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add objects
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
    color: 0x8338ec,
    wireframe: false,
    transparent: true,
    opacity: 0.2
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Interactive Particles
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 1000;
const posArray = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0x3a86ff,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    torus.rotation.x += 0.001;
    torus.rotation.y += 0.002;
    torus.rotation.z += 0.001;
    
    particlesMesh.rotation.y += 0.0005;
    
    // Make particles react to mouse
    const positions = particlesGeometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        // Create a wave effect based on mouse position
        positions[i3 + 1] = y + Math.sin(x * 0.1 + Date.now() * 0.001) * 0.2;
        positions[i3 + 0] = x + mouse.x * 0.5;
        positions[i3 + 2] = z + mouse.y * 0.5;
    }
    particlesGeometry.attributes.position.needsUpdate = true;
    
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});