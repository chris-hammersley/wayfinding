import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import img from "../../src/background/river/flow-final.png";

import waterImg from "/assets/textures/water/water_texture.jpeg";
import * as THREE from "three";

const vertexShader = `
	uniform float time;
  varying vec2 vUv;
	uniform sampler2D flowTexture;

	#define PI 3.1415926538

  void main() {

    vUv = uv;
		vec3 p = position.xyz;
		float _Wavelength = .10;
		float _Amplitude = 0.02;
		float _Speed = .040;

		float k = 2.0 * PI / _Wavelength;
		p = vec3(p.x, _Amplitude * sin(k * (p.x - _Speed * time)), p.z);

		vec3 modifiedPosition = p;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(modifiedPosition, 1.0);
  }
`;

const fragmentShader = `
	uniform sampler2D flowTexture;
	uniform sampler2D riverTexture;
	varying vec2 vUv;
	uniform float flowSpeed;
	uniform float cycleTime;
	uniform float time; 

	void main()	{
		vec2 rawFlow = texture2D( flowTexture, vUv ).rg;

		vec2 flowDirection = ( rawFlow - 0.5) * 2.0;
		
		// Use two cycles, offset by a half so we can blend between them
		float t1 = time / cycleTime;
		float t2 = t1 + 0.5;
		float cycleTime1 = t1 - floor(t1);
		float cycleTime2 = t2 - floor(t2);
		vec2 flowDirection1 = flowDirection * cycleTime1 * flowSpeed;
		vec2 flowDirection2 = flowDirection * cycleTime2 * flowSpeed;
		vec2 uv1 = vUv + flowDirection1;
		vec2 uv2 = vUv + flowDirection2;
		vec4 color1 = texture2D( riverTexture, uv1 );
		vec4 color2 = texture2D( riverTexture, uv2 );
		
		gl_FragColor = mix( color1, color2, abs(cycleTime1-0.5)*2.0 );
}
`;

export default function River(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/flow-final.glb");

  const ref = useRef();
  const [texture] = useLoader(THREE.TextureLoader, [img]);
  const [riverTexture] = useLoader(THREE.TextureLoader, [waterImg]);

  useFrame(({ clock }) => {
    texture.flipY = false;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    riverTexture.wrapS = riverTexture.wrapT = THREE.RepeatWrapping;
    ref.current.uniforms.flowTexture.value = texture;
    ref.current.uniforms.riverTexture.value = riverTexture;
    ref.current.uniforms.flowSpeed.value = 0.5;
    ref.current.uniforms.cycleTime.value = 20.0;
    ref.current.uniforms.time.value = clock.getElapsedTime();
  });

  const uniforms = {
    flowTexture: { value: null },
    riverTexture: { value: null },
    flowSpeed: { value: null },
    cycleTime: { value: null },
    time: { value: 0 },
  };
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Plane.geometry} scale={12.17}>
        <shaderMaterial
          attach="material"
          ref={ref}
          args={[
            {
              uniforms,
              vertexShader,
              fragmentShader,
            },
          ]}
        />
      </mesh>
    </group>
  );
}