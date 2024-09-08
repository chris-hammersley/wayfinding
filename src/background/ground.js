import * as THREE from 'three';

const tLoader = new THREE.TextureLoader();
let s = 1; // # of times the texture repeats H and V on plane (ground)

const colorMap = tLoader.load("src/background/cliff/muddy_sand_albedo.jpg"); // color map
colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping; // wrapS horiz; wrapT vert
colorMap.repeat.set( s, s ); // # of times texture is repeated on surface horiz & vert based on variable

const disMap = tLoader.load("src/background/river/heightmap-river3.png"); // height map
disMap.wrapS = disMap.wrapT = THREE.RepeatWrapping; // wrapS horiz; wrapT vert
disMap.repeat.set( s, s ); // # of times texture is repeated on surface horiz & vert based on variable

const normMap = tLoader.load("src/background/cliff/muddy_sand_normal.jpg"); // normal map
normMap.wrapS = normMap.wrapT = THREE.RepeatWrapping; // wrapS horiz; wrapT vert
normMap.repeat.set( s, s ); // # of times texture is repeated on surface horiz & vert based on variable

const roughMap = tLoader.load("src/background/cliff/muddy_sand_roughness.jpg"); // roughness map
roughMap.wrapS = roughMap.wrapT = THREE.RepeatWrapping; // wrapS horiz; wrapT vert
roughMap.repeat.set( s,s); // # of times texture is repeated on surface horiz & vert based on variable

const aoMap = tLoader.load("src/background/cliff/muddy_sand_ao.jpg"); // ambient occlusion map
aoMap.wrapS = aoMap.wrapT = THREE.RepeatWrapping; // wrapS horiz; wrapT vert
aoMap.repeat.set( s,s); // # of times texture is repeated on surface horiz & vert based on variable

//ground
const groundGeometry = new THREE.PlaneGeometry( 20, 20, 50, 50 );
groundGeometry.attributes.uv2 = groundGeometry.attributes.uv; // need 2nd set of uvs
// uv = texture coordinates to project 2nd image on 3d object

const groundMaterial = new THREE.MeshStandardMaterial( {
    map: colorMap,
    displacementMap: disMap, // height map
    displacementScale: 1.75, // how much displacement map affects mesh
    normalMap: normMap, // fake lighting of bumps, dents, scratches
    roughnessMap: roughMap, // roughness of material
    roughness: 1, // 0 to 1; 1 = rough, 0 = smooth
    aoMap: aoMap, // how exposed each point in scene is to ambient lighting
    wireframe: false,
    color: 0x373231,
});

export const ground = new THREE.Mesh( groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI/2; // rotate -90 degrees, y axis is up / down
ground.position.set(0, 0.63, 0);