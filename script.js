import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new
THREE.PerspectiveCamera( 75,
    window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new
THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});

renderer.setSize(window.innerWidth, window.innerHeight); 
renderer.setAnimationLoop(animate);
renderer.render(scene, camera);


const geometry = new THREE.BoxGeometry(
    1,1,1
);
const texture = new
THREE.TextureLoader().load('https://i.postimg.cc/0jpx2P0q/blahaj.jpg')
const material = new
THREE.MeshBasicMaterial( {map: texture});
const cube = new THREE.Mesh( geometry, material);
scene.add(cube);

const donut_geo = new
THREE.TorusGeometry(10, 3, 16, 100);
const donut_tex = new
THREE.MeshBasicMaterial({color: 0xffffff});
const donut = new THREE.Mesh(donut_geo, donut_tex);
scene.add(donut);

const crystalGeo = new THREE.DodecahedronGeometry(3,0);
const crystalMat = new THREE.MeshBasicMaterial({color: 0x3688ce});

const crystal = new THREE.Mesh(crystalGeo, crystalMat);
scene.add(crystal);

crystal.position.z = 14;
crystal.position.x = -8;


camera.position.z = 18;

function animate() {
    donut.rotation.x += 0.01;
    donut.rotation.y += 0.01;

    crystal.rotation.x += 0.005;
    crystal.rotation.y += 0.0075;

    renderer.render(scene, camera);
}

animate();

function add_star() {
    const star_geometry = new
    THREE.SphereGeometry(0.2, 10, 10);
    const star_material = new
    THREE.MeshBasicMaterial({color: 0xffffff});
    const star = new
    THREE.Mesh(star_geometry, star_material);

    const [x,y,z] = Array(3)
    .fill()
    .map(() =>
    THREE.MathUtils.randFloatSpread(200));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(add_star);

camera.position.setZ(45);

function moveCamera() {
    const t = 
    document.body.getBoundingClientRect().top;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    crystal.rotation.x += 0.05;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0000;
    camera.rotation.y = t * -0.0000;
}

document.body.onscroll = moveCamera;
moveCamera();
