// https://sketchfab.com/3d-models/heart-4cfcb7d37a8e491282ab94c35c78806e

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three'

function Heart() {
  const { scene } = useGLTF('./heart.glb');
  const heartRef = useRef();
  const [hovered, setHover] = useState(false);
  const [scale, setScale] = useState(.05);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    const pulseScale = Math.sin(elapsedTime * 5) * 0.005 + scale;

    if (hovered) {
      heartRef.current.scale.lerp(new THREE.Vector3(pulseScale, pulseScale, pulseScale), 0.1);
    } else {
      heartRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  })

  const handlePointerOver = () => {
    setHover(true);
  };

  const handlePointerOut = () => {
    setHover(false);
  };

  return (
    <primitive
      object={scene}
      ref={heartRef}
      scale={scale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

export default function App() {
  return <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1.0} />
      <Heart/>
      </>
}
