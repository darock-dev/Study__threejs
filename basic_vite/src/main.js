import * as THREE from 'three';

// Renderer
// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer(); // 렌더러 생성
// renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러 크기 설정
// document.body.appendChild(renderer.domElement);

// html에서 캔버스 가져와서 사용하기
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer( {
  canvas: canvas,
  antialias: true // 가장자리 부드럽게
} ); // 렌더러 생성
renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러 크기 설정

// Scene
const scene = new THREE.Scene(); // 씬 생성 

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // fov(시야각)
  window.innerWidth / window.innerHeight, // aspect(종횡비)
  0.1, // near
  1000 // far
);
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5; // 카메라 z 위치 조정
scene.add(camera); // 씬에 카메라 추가

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  // color: 0xff0000
  // color: '#ff0000'
  color: 'red'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); // 씬에 메쉬 추가

// 렌더러가 렌더를 해줘야 화면에 보임
renderer.render(scene, camera);