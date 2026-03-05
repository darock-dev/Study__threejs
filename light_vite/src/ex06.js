import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import dat from 'dat.gui';

// ----- 주제: RectAreaLight

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
	renderer.shadowMap.enabled = true; // 그림자 설정
	// renderer.shadowMap.type = THREE.PCFShadowMap; // 기본값(설정 영향 받음)
	// renderer.shadowMap.type = THREE.BasicShadowMap; // 그림자 거칠게 처리
	// renderer.shadowMap.type = THREE.PCFSoftShadowMap;	// 그림자 부드럽게 처리
	
	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);

	// Light
	// const ambientLight = new THREE.AmbientLight('white', 0.5);	// 전체적으로 은은하게 빛을 뿌려줌(위치가 의미 없음)
	// scene.add(ambientLight);

	const light = new THREE.RectAreaLight('orange', 1, 2, 2);
	// light.position.x = 0;
	light.position.y = 2;
	light.position.z = 3;
	scene.add(light);

	const lightHelper = new RectAreaLightHelper(light);
	scene.add(lightHelper);

	// 그림자 설정1
	// light.castShadow = true; // 그림자 설정(그림자를 만들 수 있는 빛)
	// light.shadow.mapSize.set(1024, 1024);	// 그림자가 그려지는 판의 크기
	// light.shadow.radius = 10; // 부드럽게 처리
	// light.shadow.camera.near = 1;
	// light.shadow.camera.far = 30;


	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	// Geometry
	const planeGeometry = new THREE.PlaneGeometry(10, 10);
	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);

	// Material
	const material1 = new THREE.MeshStandardMaterial({color: 'white'});
	const material2 = new THREE.MeshStandardMaterial({color: 'white'});
	const material3 = new THREE.MeshStandardMaterial({color: 'white'});

	// Mesh
	const plane = new THREE.Mesh(planeGeometry, material1);
	const box = new THREE.Mesh(boxGeometry, material2);
	const sphere = new THREE.Mesh(sphereGeometry, material3);

	// 플레인은 바닥이 될 것이므로 회전
	plane.rotation.x = -Math.PI / 2;
	box.position.set(1, 1, 0);
	sphere.position.set(-1, 1, 0);

	// 그림자 설정2
	plane.receiveShadow = true; // 그림자를 받아서 그림자가 그려지는 대상
	box.castShadow = true; // 그림자를 만듦
	box.receiveShadow = true;
	sphere.castShadow = true; // 그림자를 만듦
	sphere.receiveShadow = true;

	scene.add(plane, box, sphere);

	// AxesHelper
	const axesHelper = new THREE.AxesHelper(3);
	scene.add(axesHelper);

	// Dat GUI
	const gui = new dat.GUI();
	gui.add(light.position, 'x', -5, 5);
	gui.add(light.position, 'y', -5, 5);
	gui.add(light.position, 'z', -5, 5);

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();	// 프레임 간격(화면을 찍고 나서 다음 화면을 찍을 때까지의 시간)
		const time = clock.getElapsedTime();	// 누적 경과 시간(시간이 쌓임)

		// light.position.x = Math.cos(time) * 5;
		// light.position.z = Math.sin(time) * 5;

		renderer.render(scene, camera);
		window.requestAnimationFrame(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
