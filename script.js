// import {OrbitControls} from './OrbitControls.js'
// import * as THREE from './three.module.js';

import * as THREE from './three/build/three.module.js';
import {OrbitControls} from './three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('canvas.webgl')

// textures loading using js
// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () =>{
//     // const texture = new THREE.Texture(image);
//     texture.needsUpdate = true;
//     console.log(texture);
// }
// image.src = './textures/door/color.jpg'

// textures loading using inbuilt threejs class
const textureLoader = new THREE.TextureLoader();
// const colorTexture = textureLoader.load('./textures/door/color.jpg')
// const heightTexture = textureLoader.load('./textures/door/height.jpg') 
// const normalTexture = textureLoader.load('./textures/door/normal.jpg') 
// const alphaTexture = textureLoader.load('./textures/door/alpha.jpg')
// const roughnessTexture = textureLoader.load('./textures/door/roughness.jpg') 
// const metalnessTexture = textureLoader.load('./textures/door/metalness.jpg') 


const matcapTexture = textureLoader.load('./matcaps/9.png');
const matcapTexture1 = textureLoader.load('./matcaps/10.png');
const matcapTexture2 = textureLoader.load('./matcaps/14.png');
const matcapTexture3 = textureLoader.load('./matcaps/19.png');



// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5


// for sharpness at far and near ends
// colorTexture.generateMipmaps = false;
// colorTexture.minFilter = THREE.NearestFilter
// colorTexture.magFilter = THREE.NearestFilter


// debug ui init
// const gui = new dat.GUI();


const cursor = {
    x: 0, 
    y: 0
} 


const parameter = {
    color: 0xff0000,
    spin : () => {
        gsap.to(cubeMesh.rotation, {duration:1, y: cubeMesh.rotation.y + Math.PI*2})
    }
}

window.addEventListener('mousemove', (e) => {
    // for value of -0.5 to 0.5 in canvas area
    cursor.x = e.clientX / sizes.width - 0.5; 
    cursor.y = - (e.clientY / sizes.height - 0.5); 

})


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const aspectRatio = sizes.width / sizes.height;


//changes on resizing the window 
window.addEventListener('resize', (e) => {

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // aspect resize
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // update renderer
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

window.addEventListener('dblclick', (e) => {
        if(!document.fullscreenElement){
            canvas.requestFullscreen();
        }
        else {
            document.exitFullscreen();
        }

})



// Scene
const scene = new THREE.Scene()

// FONTS loading
let t;
const fontLoader =  new THREE.FontLoader()
fontLoader.load(
    './helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new THREE.TextBufferGeometry(
            'mrv learns 3D',
            {
                font:font,
                size: 0.5,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset:0,
                bevelSegments:4
            }
            )
        // const textMaterial= new THREE.MeshBasicMaterial();
        const textMaterial= new THREE.MeshMatcapMaterial({matcap: matcapTexture});

        const text = new THREE.Mesh(textGeometry, textMaterial);
            
        // // for centering text
        //     textGeometry.computeBoundingBox() //by frustum culling method  
        //     textGeometry.translate(
        //         -(textGeometry.boundingBox.max.x -0.02) * 0.5,
        //         -(textGeometry.boundingBox.max.y -0.02) * 0.5,
        //         -(textGeometry.boundingBox.max.z -0.03) * 0.5,
        //     )
        textGeometry.center();
        gsap.to(text.rotation, {y: text.rotation.y + Math.PI*2, duration:15, repeat:-1, yoyo:false, ease:'none', repeatDelay:0 })
        scene.add(text);

        const cubeGeometry = new THREE.BoxBufferGeometry(0.31, 0.41, 0.41)
        const cubeMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture1})
        for(let i = 0; i< 50; i++){
       
        const cubes = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cubes.position.x = (Math.random() - 0.5) *10;
        cubes.position.y = (Math.random() - 0.5) *10;
        cubes.position.z = (Math.random() - 0.5) *10;
        scene.add(cubes);
    }
    
//     const sphereGeometry = new THREE.SphereBufferGeometry(0.25, 8, 10)
//     const sphereMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture3})
//     for(let i = 0; i< 50; i++){

//     const spheres = new THREE.Mesh(sphereGeometry, sphereMaterial)
//     spheres.position.x = (Math.random() - 0.5) *10;
//     spheres.position.y = (Math.random() - 0.5) *10;
//     spheres.position.z = (Math.random() - 0.5) *10;
//     scene.add(spheres);
// }
    const donutGeometry = new THREE.TorusBufferGeometry(0.4, 0.2, 10, 25)
    const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture2})
    for(let i = 0; i< 50; i++){
     
        const donuts = new THREE.Mesh(donutGeometry, donutMaterial)
        donuts.position.x = (Math.random() - 0.5) *10;
        donuts.position.y = (Math.random() - 0.5) *10;
        donuts.position.z = (Math.random() - 0.5) *10;
        donuts.rotation.x = Math.random() * Math.PI;
        donuts.rotation.y = Math.random() * Math.PI;
        let scale = Math.random() + 0.1
        donuts.scale.set(scale, scale, scale)

        scene.add(donuts);

    }


        }
)

// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);



// Object
// const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 1, 1)
// const cubeMaterial = new THREE.MeshBasicMaterial({
//     color: '#ff0000',
//     map: colorTexture
//     // wireframe: true
// })

// const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
// scene.add(cubeMesh); 

const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)
// scene.add(cube);


//debug
// gui.add(cubeMesh.position, 'y', -2, 2, 0.01);
// gui.add(cubeMesh.position, 'x', -2, 2, 0.01).name('red cube x');
// gui.add(cubeMesh.position, 'z', -2, 2, 0.01);
// gui.add(cubeMesh, 'visible');
// gui.add(cubeMesh.material, 'wireframe');
// gui.addColor(parameter, 'color')
//    .onChange(() =>{
//        cubeMesh.material.color.set(parameter.color);
//    })
// gui.add(parameter, 'spin')


// Camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 3000);

camera.position.z = 3
// camera.lookAt(cube.position)

scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// attributing pixel-ratio for better image render, we will use the limit of 2 to avoid performance issues in devices with higher pixelratio 
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera)

const clock = new THREE.Clock();
const tick= () => {

    const elapsedTime = clock.getElapsedTime();

  
   
        // update controls
        controls.update();
        renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick();
