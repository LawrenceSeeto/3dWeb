// Import necessary modules
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.152.2/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable smooth controls
controls.dampingFactor = 0.05;

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const homePageTexture = textureLoader.load('homepage.jpg'); // Replace with your image file

// Materials for each face
const materials = [
  new THREE.MeshBasicMaterial({ color: 0xffffff }), // Right side
  new THREE.MeshBasicMaterial({ color: 0xffffff }), // Left side
  new THREE.MeshBasicMaterial({ color: 0xffffff }), // Top side
  new THREE.MeshBasicMaterial({ color: 0xffffff }), // Bottom side
  new THREE.MeshBasicMaterial({ map: homePageTexture }), // Front side (starting side)
  new THREE.MeshBasicMaterial({ color: 0xffffff }), // Back side
];

// Geometry
const geometry = new THREE.BoxGeometry(2, 2, 2);

// Mesh
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Handle Window Resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  // Update camera aspect ratio and projection matrix
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Update controls
  controls.update();

  // Render the scene
  renderer.render(scene, camera);
}

animate();
