import * as THREE from 'three';

// Renderer
// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer(); // 렌더러 생성
// renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러 크기 설정
// document.body.appendChild(renderer.domElement);

// html에서 캔버스 가져와서 사용하기
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer( {canvas: canvas} ); // 렌더러 생성
renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러 크기 설정

// Scene
const scene = new THREE.Scene(); // 씬 생성 

// Camera
const camera = new THREE.PerspertiveCamera(
  75, // fov(시야각)
  window.innerWidth / window.innerHeight, // aspect(종횡비)
  0.1, // near
  1000 // far
);
camera.position.z = 5; // 카메라 z 위치 조정
scene.add(camera); // 씬에 카메라 추가