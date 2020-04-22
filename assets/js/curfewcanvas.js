import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
import { OBJLoader2 } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js';
import { MTLLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/MTLLoader.js';
import { MtlObjBridge } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';
import { FirstPersonControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/FirstPersonControls.js';

let camera, controls, scene, objects = [], boundingBoxes = [], renderer;
let density = 700;
var objLoaded = false;
var object1, object2, object3, object4, object5, object6;
var models = [];
//var material = new THREE.MeshPhongMaterial({ color: 0x544545 });
var material1, material2, material3, material4, material5;

function main() {
  const canvas = document.querySelector('#c');
  canvas.style.position = 'absolute';  // Right Here!
  canvas.style.left = "0px";
  canvas.style.top = "0px";  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  var textureLoader = new THREE.TextureLoader();

  {
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;  // the canvas default
    const near = 0.1;
    const far = 100000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(5000, 800, 20);

    var v3 = new THREE.Vector3(0, 0, 0)
    camera.lookAt(v3);
  }

  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 1.5;
  controls.lookSpeed = 0.001;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d001f);

  {
    const planeSize = 40000;

    const loader = new THREE.TextureLoader();
    const texture = loader.load('./assets/textures/grass.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 10;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
      reflectivity: 0
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    mesh.position.y = mesh.position.y - 10;
    scene.add(mesh);
  }

  {
    const skyColor = 0x0d001f;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 0.5;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-5000, 3000, 2000);
    light.target.position.set(0, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  {
    //var l_fogColor = 0x220052;
    var l_fogColor = 0x808080;

    scene.fog = new THREE.Fog(l_fogColor, 1000, 5000);
  }

  {
    const objLoader = new OBJLoader2();
    objLoader.load('./assets/models/building1.obj', function (object) {
      object1 = new THREE.Object3D();

      var hue = Math.random();

      object.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshPhongMaterial();
          node.material.color.setHSL(hue, 0.2, 0.3);
          var mesh = new THREE.Mesh(node.geometry, node.material);
          object1.add(mesh);
        }
      });
      models.push(object1);
    });

    const objLoader2 = new OBJLoader2();
    objLoader2.load('./assets/models/building2.obj', function (object) {
      object2 = new THREE.Object3D();

      var hue = Math.random();

      object.traverse(function (node) {

        if (node.isMesh) {
          node.material = new THREE.MeshPhongMaterial();
          node.material.color.setHSL(hue, 0.2, 0.3);
          var mesh = new THREE.Mesh(node.geometry, node.material);
          object2.add(mesh);
        }
      });
      models.push(object2);
    });

    const objLoader3 = new OBJLoader2();
    objLoader3.load('./assets/models/building3.obj', function (object) {
      object3 = new THREE.Object3D();

      var hue = Math.random();

      object.traverse(function (node) {

        if (node.isMesh) {
          node.material = new THREE.MeshPhongMaterial();
          node.material.color.setHSL(hue, 0.2, 0.3);
          var mesh = new THREE.Mesh(node.geometry, node.material);
          object3.add(mesh);
        }
      });
      models.push(object3);
    });

    const objLoader5 = new OBJLoader2();
    objLoader5.load('./assets/models/building5.obj', function (object) {
      object5 = new THREE.Object3D();

      var hue = Math.random();

      object.traverse(function (node) {

        if (node.isMesh) {
          node.material = new THREE.MeshPhongMaterial();
          node.material.color.setHSL(hue, 0.2, 0.3);
          var mesh = new THREE.Mesh(node.geometry, node.material);
          object5.add(mesh);
        }
      });
      models.push(object5);
    });

    const objLoader6 = new OBJLoader2();
    objLoader6.load('./assets/models/building6.obj', function (object) {
      object6 = new THREE.Object3D();

      var hue = Math.random();

      object.traverse(function (node) {

        if (node.isMesh) {
          node.material = new THREE.MeshPhongMaterial();
          node.material.color.setHSL(hue, 0.2, 0.3);
          var mesh = new THREE.Mesh(node.geometry, node.material);
          object6.add(mesh);
        }
      });
      models.push(object6);
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    controls.update(1);

    renderer.render(scene, camera);
    camera.position.y = 55;
    if(camera.position.y > 800) camera.position.y = 800;
    if(camera.position.y < 50) camera.position.y = 50;

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

function onKeyUp(event) {

  if (event.keyCode == 71) {
    document.getElementById("instructions").innerHTML = "";
    if (objects.length > 0) {
      objects.forEach(element => {
        var selectedObject = scene.getObjectByName(element.name);
        scene.remove(selectedObject);
      });
    }

    objects = [];
    boundingBoxes = [];

    for (var i = 0; i < density; i++) {
      var mesh = new THREE.Mesh();
      mesh = models[Math.floor(Math.random() * models.length)].valueOf();
      // Add the model to the scene.
      var clone = mesh.clone();
      clone.name = i;
      objects.push(clone);
    }

    objects.forEach(element => {
      var positionX = Math.floor((Math.random() * 40000) - 20000);
      var positionZ = Math.floor((Math.random() * 40000) - 20000);
      element.position.x = positionX.valueOf();
      element.position.z = positionZ.valueOf();

      var box = new THREE.Box3().setFromObject(element);
      boundingBoxes.push(box);
      scene.add(element);
    });
  }
  else if (event.keyCode == 16) {
    controls.movementSpeed = 1.5;
  }
  else if (event.keyCode == 77){
    gainNode.gain.value = (gainNode.gain.value * -1) + 0.5;
    if(gainNode.gain.value == 0.5){
      document.getElementById("muted").innerHTML = "";
    }
    else{
      document.getElementById("muted").innerHTML = "Music Muted";
    }
  }
}

function onKeyDown(event){
  if (event.keyCode == 16){
    controls.movementSpeed = 5;
  }
}

document.addEventListener("keyup", onKeyUp, false);
document.addEventListener("keydown", onKeyDown, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

main();