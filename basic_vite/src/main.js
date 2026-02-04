import * as THREE from 'three';
/**
 * Renderer
 */
// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer(); // 렌더러 생성
// renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러 크기 설정
// document.body.appendChild(renderer.domElement);

// html에서 캔버스 가져와서 사용하기
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer( {canvas: canvas} ); // 렌더러 생성
renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러 크기 설정