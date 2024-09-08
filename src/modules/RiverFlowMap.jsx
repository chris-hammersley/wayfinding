import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { Water } from '../../src/modules/Water2.js';
extend({ Water });

const RiverFlowMap = () => {
  const [showFlowMap, setShowFlowMap] = useState(true);
  const flowMapRef = useRef();
  const textureLoader = new THREE.TextureLoader();
  const [flowMapTexture, setFlowMapTexture] = useState(null);

  useEffect(() => {
    const loadFlowMap = async () => {
      try {
        const map = await textureLoader.loadAsync('src/background/river/flowmap-river3.png');
        setFlowMapTexture(map);
      } catch (error) {
        console.error('Error loading flow map:', error);
      }
    };

    loadFlowMap();
  }, []);

  useFrame(() => {
    if (flowMapRef.current) {
      flowMapRef.current.rotation.x += 0.005;
      flowMapRef.current.rotation.y += 0.005;
    }
  });

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {flowMapTexture && (
        <Canvas
          camera={{ position: [0, 5, 11], fov: 85 }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[0, 50, 10]} intensity={1} />
          <OrbitControls />
          <group>
            <mesh visible={showFlowMap}>
              <planeGeometry args={[20, 20]} />
              <meshBasicMaterial attach="material" map={flowMapRef.current} />
            </mesh>
          </group>
          <Water
            args={[new THREE.PlaneGeometry(20, 20), {
              scale: 1,
              textureWidth: 512,
              textureHeight: 512,
              flowSpeed: 0.04,
              reflectivity: 0.07,
              flowMap: flowMapTexture,
              backgroundColor: 0x728295,
              color: textureLoader.load('/assets/textures/water/water.jpg')
            }]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 1.2, 0]}
            ref={flowMapRef}
          />
        </Canvas>
      )}
    </div>
  );
};

export default RiverFlowMap;