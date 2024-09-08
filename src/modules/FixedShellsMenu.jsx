import React, { useRef, useState } from 'react';
import { useThree } from "@react-three/fiber";
import { Html, Gltf } from "@react-three/drei";
import { PositionalAudio } from "@react-three/drei";

function FixedShellsMenu() {
  const { viewport } = useThree();
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Html
      as='div'
      wrapperClass="fixed-menu"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        cursor: 'pointer',
      }}
      transform
    >
      <div onClick={toggleSound}>
        <Gltf 
          src="/assets/seashell-macro.glb" 
          scale={5}
        />
      </div>
      <PositionalAudio
        ref={audioRef}
        url="/assets/watersongs.thespacebetween.m4a"
        distance={1}
        loop
      />
    </Html>
  );
}

export default FixedShellsMenu;
