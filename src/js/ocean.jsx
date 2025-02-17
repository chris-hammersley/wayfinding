import React, { useRef, useMemo } from "react";
import { extend, useThree, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { Water } from "../modules/Water2";
import { useTexture } from "@react-three/drei";
extend({ Water });

export default function Ocean() {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useTexture("/assets/textures/water/waternormals.jpg");
//  const waterNormals = useLoader(THREE.TextureLoader, "src/textures/water/waternormals.jpg");

//  console.log(ref?.current?.material);

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(30000, 30000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xeb8934,
      waterColor: 0x0064b5,
      distortionScale: 40,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );
  return (
    <>
    <water
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
      position={[0, 0, 0]}
    />
    </>
  );
}
