import React, { useRef, useState, useEffect, Suspense } from 'react'; // Include necessary imports
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import { Gltf, ScrollControls, useScroll, useAspect, useVideoTexture, PositionalAudio, useProgress, useTexture, useGLTF, useAnimations, Billboard, Text, Html, Environment, Sky, Effects } from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import flyThroughState from "./flyThruState.json";
import { editable as e } from "@theatre/r3f";
import { SheetProvider, PerspectiveCamera, useCurrentSheet } from "@theatre/r3f";
import Iframe from 'react-iframe';
import Modal from './ModalContent';
import Modal2 from './ModalContent2';
import useModal from './useModal';
import useModal2 from './useModal2';
import Water from "./modules/Water";
import { UnrealBloomPass } from 'three-stdlib';
import { IoCloseOutline } from "react-icons/io5";
import './main.css';

extend({ UnrealBloomPass });

export default function App() {
  const sheet = getProject("Fly Through", { state: flyThroughState }).sheet("Scene");

  // Modals
  const { isShowing, toggle } = useModal2();
  
  // State for iframe URL
  const [iframeUrl, setIframeUrl] = useState("");

  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <ScrollControls pages={6} damping={0.5}>
        <SheetProvider sheet={sheet}>
          <Suspense fallback={<Loader />}>
            <Scene setIframeUrl={setIframeUrl} toggle={toggle} /> 
            <PlaySound url="/assets/watersongs.thespacebetween.m4a" />
          </Suspense>
        </SheetProvider>
      </ScrollControls>
      <Html>
        <div className="App">
          <Modal2 isShowing={isShowing} hide={toggle} iframeUrl={iframeUrl} />
        </div>
      </Html>
    </Canvas>
  );
}

// Loader component
function Loader() {
  const { progress } = useProgress();
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoadingProgress(progress);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [progress]);

  return <Html center>{loadingProgress} % loaded</Html>;
}

// Scene component
function Scene({ setIframeUrl, toggle }) {
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
  const { group14, group15 } = useRef();
  const texture = useLoader(THREE.TextureLoader, '/assets/frozen.jpg');
  const videoTexture = useVideoTexture('/assets/prompt12.mp4');
  const size = useAspect(16, 9);
  const box = useRef();
  const bgColor = "#000000";
  const [hovered, setHovered] = useState(false);
  const bloomPassRef = useRef();

  useFrame(() => {
    if (bloomPassRef.current) {
      bloomPassRef.current.strength = hovered ? 0.5 : 0;
    }
  });

  useFrame(() => {
    const sequenceLength = val(sheet.sequence.pointer.length);
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  useFrame(() => {
    group.current.rotation.y += Math.PI / 200;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <Environment files="./assets/mossy_forest_4k.hdr" background />
      <Effects disableGamma>
        {hovered && (
          <unrealBloomPass attachArray="passes" args={[undefined, 0.2, 0.1, 0.95]} />
        )}
      </Effects>
      <e.mesh theatreKey="Quadrant" postion={[0, 0, 0]} scale={1}>
        <Gltf src="/assets/poly-forest-river.glb" />
      </e.mesh>
      <e.mesh theatreKey="North1" postion={[37.72, -7, -165.34]} rotation={[0, 6.42, 0]} scale={1}>
        <Gltf src="/assets/poly-forest-river.glb" />
      </e.mesh>
      <e.mesh theatreKey="River" postion={[0.78, -7.95, -33.35]} scale={2}>
        <Water />
      </e.mesh>
      <e.mesh theatreKey="FrozenRiver" postion={[0, 0, 0]} scale={1}>
        <Gltf src="/assets/winter-forest-update.glb" />
      </e.mesh>
      <e.group ref={group13} theatreKey="Title" position={[-3, 0, -20]}>
        <Text color="white" anchorX={"left"} anchorY="top" fontSize={0.22} maxWidth={2.5}>wayfinding</Text>
      </e.group>
      <e.group ref={group1} theatreKey="1-BrassHammam" position={[-30.2, -3.96, 93.02]} scale={5} onClick={() => {
        setIframeUrl('prompt1.html');
        toggle();
      }}>
        <Gltf src="assets/turkish_bowl_pitcher_bronze.glb" castShadow receiveShadow />
      </e.group>
      <e.group ref={group2} theatreKey="2-PineTree" position={[-70.49, 4.77, 41.4]} scale={20} onClick={() => {
        setIframeUrl('prompt2.html');
        toggle();
      }}>
        <Gltf src="assets/snowy-pine-tree.glb" castShadow receiveShadow />
      </e.group>
      <e.group ref={group3} theatreKey="3-WoodenBoat" position={[-29.56, 6.5, 52.06]} rotation={[-0.32, -1.35, 0]} scale={10} onClick={() => {
        setIframeUrl('prompt3.html');
        toggle();
      }}>
        <Gltf src="assets/faded-wooden-rowboat.glb" castShadow receiveShadow />
      </e.group>
      <e.mesh theatreKey="4-FrozenWater" position={[-52.67, -7.97, 53.42]} rotation={[-1.57, 0, 3.84]} scale={25} onClick={() => {
        setIframeUrl('prompt4.html');
        toggle();
      }}>
        <boxGeometry args={[1, 2, .005]} />
        <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
      </e.mesh>
      <e.group ref={group5} theatreKey="5-Aphrodite" position={[-43.2, -24.78, 27.14]} rotation={[0, 0.69, 0]} scale={.25} onClick={() => {
        setIframeUrl('prompt5.html');
        toggle();
      }}>
        <Gltf src="/assets/aphrodite.glb" castShadow receiveShadow />
      </e.group>
      <e.group ref={group} theatreKey="6-EvilEye" dispose={null} position={[3.2, 0.83, -8.5]} onClick={() => {
        setIframeUrl('prompt6.html');
        toggle();
      }}>
        <Gltf src="/assets/hamsa-evil-eye-3d.glb" castShadow receiveShadow />
      </e.group>
      <e.group ref={group10} theatreKey="7-Fountain" dispose={null} position={[52.35, -4.4, -50.72]} rotation={[Math.PI, 1.45, Math.PI]} onClick={() => {
        setIframeUrl('prompt7.html');
        toggle();
      }}>
        <Gltf src="assets/fontaine.glb" castShadow receiveShadow />
      </e.group>
      <e.group ref={group11} theatreKey="8-Armillary" dispose={null} position={[-31.39, -2.53, -63.07]} rotation={[Math.PI, .79, Math.PI]} onClick={() => {
        setIframeUrl('prompt8.html');
        toggle();
      }}>
        <Gltf src="assets/armillary_sphere.glb" castShadow receiveShadow />
      </e.group>
      <e.group ref={group4} theatreKey="9-Chimes" dispose={null} position={[-31.42, -0.35, 66.09]} onClick={() => {
        setIframeUrl('prompt9.html');
        toggle();
      }}>
        <Gltf src="assets/poly-chimes.glb" castShadow receiveShadow />
      </e.group>
      <e.group ref={group8} theatreKey="10-Hercules" dispose={null} position={[0.91, 3.84, -23.22]} rotation={[Math.PI, 2.02, Math.PI]} onClick={() => {
        setIframeUrl('prompt10.html');
        toggle();
      }}>
        <Gltf src="assets/hercules.glb" castShadow receiveShadow />
      </e.group>
      <e.group ref={group7} theatreKey="11-Lovers" dispose={null} position={[-1.61, 1.36, -19.74]} rotation={[Math.PI, 2.16, Math.PI]} onClick={() => {
        setIframeUrl('prompt11.html');
        toggle();
      }}>
        <Gltf src="assets/lovers.glb" castShadow receiveShadow />
      </e.group>
      <e.mesh theatreKey="12-River" dispose={null} position={[-0.53, 6.39, -24.28]} onClick={() => {
        setIframeUrl('prompt12.html');
        toggle();
      }}>
        <boxGeometry args={size} />
        <meshBasicMaterial map={videoTexture} toneMapped={false} />
      </e.mesh>
      <e.mesh ref={box} theatreKey="prompt-box" position={[2, 0.8, -1]} rotation={[-0.1, 0, 0]} scale={0.5} onClick={() => {
        setIframeUrl('prompt13.html');
        toggle();
      }}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={bgColor} />
      </e.mesh>
    </>
  );
}

// PlaySound component
function PlaySound({ url }) {
  const sound = useRef();

  return (
    <PositionalAudio
      ref={sound}
      url={url}
      distance={1}
      loop={true}
      autoplay
    />
  );
}