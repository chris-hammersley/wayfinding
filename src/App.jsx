import { Canvas, useFrame, useLoader, extend, useThree } from "@react-three/fiber";
import { Gltf, ScrollControls, useScroll, useAspect, useVideoTexture, PositionalAudio, useProgress, useTexture, useGLTF, useAnimations, Billboard, Text, Html, Environment, Sky, Effects, Center } from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import flyThroughState from "./flyThruState.json"; // import this after creating the animation for production
import { editable as e } from "@theatre/r3f"; // remove this before deploying to production
import { React, useRef, useState, useEffect, Suspense } from 'react';  //used for marker function
import * as THREE from 'three';
import { SheetProvider, PerspectiveCamera, useCurrentSheet } from "@theatre/r3f";
import './main.css';
import Modal from './ModalContent';
import useModal from './useModal';
//import Water from "./modules/Water";
import Ocean from "./js/ocean";
import { UnrealBloomPass } from 'three-stdlib';
extend({ UnrealBloomPass });

//import RiverFlowMap from "./modules/RiverFlowMap";
// import { Water } from './modules/Water2';
// extend({ Water });
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
//import { River } from '../src/js/river.jsx';

export default function App() {
//  const sheet = getProject("Fly Through").sheet("Scene"); // used when creating keyframes/json file
  const sheet = getProject("Fly Through", {state: flyThroughState}).sheet("Scene"); // used after creating json keyframe file - needs to match the import at top of file

  // Modals
  const {isShowing, toggle} = useModal(); // connects to modalcontent.jsx

  // State for iframe URL
  const [iframeUrl, setIframeUrl] = useState("");

  //const {width, height } = useThree(state => state.viewport) // for the static menu

  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <ScrollControls pages={10} damping={0.5}>
        <SheetProvider sheet={sheet}>
          <Suspense>
            <Scene setIframeUrl={setIframeUrl} toggle={toggle} /> 
          </Suspense>
        </SheetProvider>
      </ScrollControls>
      <Html>
        <div className="App">
          <Modal isShowing={isShowing} hide={toggle} iframeUrl={iframeUrl} />
        </div>
      </Html>
    </Canvas>
  );
}

function Loader() {
  const { progress } = useProgress();
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoadingProgress(progress);
    }, 0);

    // Clean up the timeout
    return () => clearTimeout(timeoutId);
  }, [progress]);

  return <Html center>{loadingProgress} % loaded</Html>;
};

// 3D Background Scene with 3D Prompt Objects
function Scene({ setIframeUrl, toggle, margin = 0.5}) {
  const { width, height } = useThree((state) => state.viewport); // for the fixed shell menu
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const group = useRef();
  const group1 = useRef();
  const group2 = useRef();
  const group3 = useRef();
  const group4 = useRef();
  const group5 = useRef();
  const group6 = useRef();
  const group7 = useRef();
  const group8 = useRef();
  const group9 = useRef();
  const group10 = useRef();
  const group11 = useRef();
  const group12 = useRef();
  const group13 = useRef();
  const {group14, group15, group16} = useRef();
  const texture = useTexture('/assets/frozen.jpg');
  const videoTexture = useVideoTexture('/assets/prompt13.mp4');
 // const size = useAspect(16, 9);
 // const box = useRef();
 // const bgColor ="#000000";//"#84a4f4";
  const [hovered, setHovered] = useState(false); // Added
  const bloomPassRef = useRef(); // Added

  /* Shell Menu */
  const shellsRef = useRef();
  const shellModelRef = useRef();
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const { camera, size } = useThree();

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        audioRef.current.volume = 0.3;
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (shellsRef.current) {
      shellsRef.current.renderOrder = 999; // Ensure shells render on top
    }
  }, []);

  useFrame(({ clock }) => {
    if (shellsRef.current && shellModelRef.current && camera) {
      // Create a vector for the bottom right corner of the screen
      const vector = new THREE.Vector3(1.3 - margin, -1.2 + margin, -0.5);
      vector.unproject(camera);

      // Set the shells' position
      shellsRef.current.position.set(vector.x, vector.y, vector.z);

      // Make shells face the camera
      shellsRef.current.quaternion.copy(camera.quaternion);

      // Rotate the shell model
      shellModelRef.current.rotation.z = clock.getElapsedTime() * 1; // Adjust rotation speed as needed

      // Scale shells to maintain consistent screen size
      const scale = camera.position.distanceTo(shellsRef.current.position) * 0.25; // Adjust this factor as needed
      shellsRef.current.scale.set(scale, scale, scale);
    }
  });

  const handleShellClick = (event) => {
    event.stopPropagation();
    toggleSound();
  };
  /* End Shell Menu */

  // Glow Effects
  // Adjust the : 0; to toggle bloom
  useFrame(() => {
    if (bloomPassRef.current) {
      bloomPassRef.current.strength = hovered ? 0.5 : 0;
    }
  });

  /* our callback will run on every animation frame */
    /* the length of our sequence */
    /* update the "position" of the playhead in the sequence, as a fraction of its whole length */
  useFrame(() => {
    const sequenceLength = val(sheet.sequence.pointer.length);
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  // For 3D Rotating Evil Eye - we use the useFrame hook here to rotate on the x-axis.
      // rotating the group instead of the mesh
  useFrame(() => {
    group.current.rotation.y += Math.PI / 200
    });

  // For 3D Spinning Leaf - we use the useFrame hook here to rotate on the x-axis.
  useFrame(() => {
    group12.current.rotation.y += Math.PI / 500
    });

  // For 3D Spinning Shells - we use the useFrame hook here to rotate on the x-axis.
//  useFrame(() => {
  //  group4.current.rotation.y += Math.PI / 300
    //});

  return (
    <>
      /* 3D Global Scene Elements */
      /* removed fog - check Keep */
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <Environment files="./assets/mossy_forest_4k.hdr" background />

      /* Glow Effect code */
      <Effects disableGamma>
        {hovered && (
          <unrealBloomPass attachArray="passes" args={[undefined, 0.2, 0.1, 0.95]} />
        )}
      </Effects>

      <group ref={shellsRef} onClick={handleShellClick}>
        <group ref={shellModelRef}>
          <Gltf src="/assets/seashell-macro.glb" />
        </group>
      </group>

      <PositionalAudio
        ref={audioRef}
        url="/assets/watersongs.thespacebetween.m4a"
        distance={1}
        loop
      />

      /* 3D River Forest Scene - Main */
      <e.mesh theatreKey="Quadrant" postion={[0, 0, 0]} scale={1}>
      <Gltf src="/assets/poly-forest-river.glb" />
      </e.mesh>

      /* 3D River Forest Scene - North 1 */
      <e.mesh theatreKey="North1" postion={[37.72, -7, -165.34]} rotation={[0, 6.42, 0]} scale={1}>
      <Gltf src="/assets/poly-forest-river.glb" />
      </e.mesh>

      /* 3D Hill Grass Flowers Scene */
      <e.mesh theatreKey="Hill" postion={[0,0,0]} rotation={[0, 0, 0]} scale={1}>
      <Gltf src="/assets/grass-hill-flowers.glb" />
      </e.mesh>

      /* 3D Ocean */
      <e.mesh theatreKey="Ocean" postion={[0.78, -7.95, -33.35]} scale={2}>
      <Ocean />
      </e.mesh>

      // 3D Frozen River
      <e.mesh theatreKey="FrozenRiver" postion={[0, 0, 0]} scale={1}>
      <Gltf src="/assets/winter-forest-update.glb" />
      </e.mesh>

     // TEXT
     <e.group ref={group13} theatreKey="Title" position={[-3, 0, -20]}>
      <Text color="white" anchorX={"left"} anchorY="top" fontSize={0.22} maxWidth={2.5}>wayfinding</Text>
     </e.group>

      /* Prompts */

      // Prompt 1 - Brass Hammam
      <e.group ref={group1} theatreKey="1-BrassHammam" position={[-30.2,-3.96,93.02]} scale={5} onClick={() => {
        setIframeUrl('prompt1.html');
        toggle();
      }}>
          <Gltf src="assets/turkish_bowl_pitcher_bronze.glb" castShadow receiveShadow />
      </e.group>
  
      // Prompt 2 - Snowy Pine Tree
      <e.group ref={group2} theatreKey="2-PineTree" position={[-70.49,4.77,41.4]} scale={20} onClick={() => {
        setIframeUrl('prompt2.html');
        toggle();
      }}>
          <Gltf src="assets/snowy-pine-tree.glb" castShadow receiveShadow />
      </e.group>

      // Prompt 3 - Wooden Rowboat
      <e.group ref={group3} theatreKey="3-WoodenBoat" position={[-29.56,6.5,52.06]} rotation={[-0.32, -1.35, 0]} scale={10} onClick={() => {
        setIframeUrl('prompt3.html');
        toggle();
      }}>
        <Gltf src="assets/faded-wooden-rowboat.glb" castShadow receiveShadow />
      </e.group>

      // Prompt 4 - icy something - Billboard Image - Flat
      <e.mesh theatreKey="4-FrozenWater" position={[-52.67, -7.97, 53.42]} rotation={[-1.57, 0, 3.84]} scale={25} onClick={() => {
        setIframeUrl('prompt4.html');
        toggle();
      }}>
      <boxGeometry args={[1, 2, .005]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
      </e.mesh>

      // Prompt 5 - Aphrodite
      <e.group ref={group5} theatreKey="5-Aphrodite" position={[-43.2, -24.78, 27.14]} rotation={[0, 0.69, 0]} scale={.25} onClick={() => {
        setIframeUrl('prompt5.html');
        toggle();
      }}>
      <Gltf src="/assets/aphrodite.glb" castShadow receiveShadow />
      </e.group>

      // Prompt 6 - Hamsa Evil Eye - Spinning
      <e.group ref={group} theatreKey="6-EvilEye" dispose={null} position={[3.2, 0.83, -8.5]} onClick={() => {
        setIframeUrl('prompt6.html');
        toggle();
      }}>
         <Gltf src="/assets/hamsa-evil-eye-3d.glb" castShadow receiveShadow/>
      </e.group>

      // Prompt 7 - 3D fountain
      <e.group ref={group10} theatreKey="7-Fountain" position={[4.88, -6.57, -24.27]} scale={10} onClick={() => {
        setIframeUrl('prompt7.html');
        toggle();
      }}>
        <Gltf src="/assets/fountain.glb" castShadow receiveShadow />
      </e.group>

      // Prompt 8 - Leaf - Spinning
      <e.group ref={group12} theatreKey="8-GreenLeaf" dispose={null} position={[-15, 9.36, -12.33]} rotation={[-0.01, -0.76, -0.06]} scale={10} onClick={() => {
        setIframeUrl('prompt8.html');
        toggle();
      }}>
         <Gltf src="/assets/green-leaf2.glb" castShadow receiveShadow/>
      </e.group>      

      // Prompt 9 - Broken Car 
      <e.group ref={group7} theatreKey="9-Car" position={[-34.47, -7.49,-44.46]} scale={10} onClick={() => {
        setIframeUrl('prompt9.html');
        toggle();
      }}>
        <Gltf src="/assets/mercedes-benz_w123.glb" castShadow receiveShadow />
      </e.group>

      // Arch 1
      <e.group ref={group7} theatreKey="Arch1" position={[-45.81, -4.73,-59.62]} scale={2}>
        <Gltf src="/assets/archway-4k.glb" castShadow receiveShadow />
      </e.group>

      // Prompt 10 - Cookbook
      <e.group ref={group16} theatreKey="10-Cookbook" position={[-36.53, -4.61, -107.62]} rotation={[0.02, -1.4, 0.05]} scale={5} onClick={() => {
        setIframeUrl('prompt10.html');
        toggle();
      }}>
      <Gltf src="/assets/cookbook.glb" castShadow receiveShadow />
      </e.group>

      // Prompt 11 - Baubo
      <e.group ref={group6} theatreKey="11-Balbao" position={[-36.53, -4.61, -107.62]} rotation={[0.02, -1.4, 0.05]} scale={5} onClick={() => {
        setIframeUrl('prompt11.html');
        toggle();
      }}>
      <Gltf src="/assets/ancient_baubo.glb" castShadow receiveShadow />
      </e.group>

      // Prompt 12 - Sculpture
      <e.group ref={group9} theatreKey="12-Sculpture" position={[-36,-5,-100]} scale={100} onClick={() => {
        setIframeUrl('prompt12.html');
        toggle();
      }}>
        <Gltf src="/assets/ceramic_sculpture.glb" castShadow receiveShadow />
      </e.group>

      // Film Arch
      <e.group ref={group6} theatreKey="FilmArch" position={[-5.05, -8.07, -156.44]} rotation={[0, 1.4, 0]} scale={3} >
      <Gltf src="/assets/roman_old_arch_pompeii 4k.glb" castShadow receiveShadow />
      </e.group>

      // Film Snippet
      <e.mesh theatreKey="13-Film" position={[-3.08, -3.66, -156.85]} rotation={[0, 1.43, 0]} scale={[11.34, 7, 7]} onClick={() => {
        setIframeUrl('prompt13.html');
        toggle();
      }}>
      <boxGeometry args={[1, 2, .005]} />
      <meshBasicMaterial attach="material" map={videoTexture} toneMapped={false} />
      </e.mesh>

      // Melusine Medusa Mermaid
      <e.group ref={group8} theatreKey="Mermaid" position={[1,1,1]} onClick={() => {
        setIframeUrl('prompt14.html');
        toggle();
      }}>
        <Gltf src="/assets/melusine.glb" castShadow receiveShadow />
      </e.group>

      // Hygelia Statue
      <e.group ref={group11} theatreKey="HygeliaStatue" position={[1,1,1]} scale={.5} onClick={() => {
        setIframeUrl('prompt15.html');
        toggle();
      }}>
        <Gltf src="assets/hygieia.glb" castShadow receiveShadow />
      </e.group>

      // Copse of Trees 1
      <e.group ref={group14} theatreKey="Trees1" dispose={null}>
         <Gltf src="/assets/whitePoplar1.glb" castShadow receiveShadow position={[-19, 1, -5]} />
         <Gltf src="/assets/maple1.glb" castShadow receiveShadow position={[-17, 1, -4]} />
         <Gltf src="/assets/poplar1.glb" castShadow receiveShadow position={[-15, 1, -2]} />         
         <Gltf src="/assets/realistics_grass_03.glb" castShadow receiveShadow position={[-19, 1, -4]} scale={0.75} />
      </e.group>

      // Copse of Trees 2
      <e.group ref={group15} theatreKey="Trees2" dispose={null}>
         <Gltf src="/assets/whitePoplar1.glb" castShadow receiveShadow position={[-19, 1, -5]} />
         <Gltf src="/assets/maple1.glb" castShadow receiveShadow position={[-17, 1, -4]} />
         <Gltf src="/assets/poplar1.glb" castShadow receiveShadow position={[-15, 1, -2]} />         
         <Gltf src="/assets/realistics_grass_03.glb" castShadow receiveShadow position={[-19, 1, -4]} scale={0.75} />
      </e.group>

      // 3D camera
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />
    </>
  );
}

function PlaySound({ url }) {
  // This component creates a suspense block, blocking execution until
  // all async tasks (in this case PositionAudio) have been resolved.
  const sound = useRef();
  return (
    <Suspense fallback={null}>
      <PositionalAudio autoplay url={url} ref={sound} />
    </Suspense>
  );
}

// Glow Effect function


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

const modal = document.querySelector('.modal')

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    modal.style.display = 'none';
  }
})