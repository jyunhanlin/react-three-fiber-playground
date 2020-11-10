import * as THREE from 'three';
import React, { useRef, useCallback, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

import Text from './Text';
import Particles from './Particles';
import Sparks from './Sparks';

export default function App() {
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );

  return (
    <Canvas
      camera={{ fov: 100, position: [0, 0, 30] }}
      onMouseMove={onMouseMove}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.CineonToneMapping;
        gl.setClearColor(new THREE.Color('#020207'));
      }}
    >
      <fog attach="fog" args={['white', 50, 190]} />
      <pointLight distance={100} intensity={4} color="white" />
      <Suspense fallback={null}>
        <Text position={[0, 2.5, 0]} children="Hi" />
        <Text position={[0, -2.5, 0]} children="There" />
      </Suspense>
      <Sparks
        count={20}
        mouse={mouse}
        colors={['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']}
      />

      <Particles count={10000} mouse={mouse} />
      <OrbitControls />
    </Canvas>
  );
}
