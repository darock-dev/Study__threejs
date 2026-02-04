import * as THREE from 'three';

// ---- 주제: 배경의 색, 투명도 설정

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer( {
    canvas: canvas,
    antialias: true,
  } );
  renderer.setSize(window.innerWidth, window.innerHeight);
  console.log(window.devicePixelRatio); // 디바이스 픽셀 비율
  // 고해상도로 표시하기
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);  // 픽셀 비율 설정

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000 
  );
  camera.position.z = 5;
  scene.add(camera);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 'red'
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 렌더러가 렌더를 해줘야 화면에 보임
  function draw() {
    // mesh.rotation.y += 0.1;
    mesh.rotation.y += THREE.MathUtils.degToRad(2); // 1도씩 회전
    mesh.position.y += 0.01;
    if(mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);

    window.requestAnimationFrame(draw);
  }


  function setSize() {
    // 1. 카메라 조정(종횡비 업데이트)
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // 카메라 투영 행렬 업데이트
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', setSize)
  draw();
}