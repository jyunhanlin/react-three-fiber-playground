import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import * as canvasUtils from 'canvas-sketch-util';

import Box from './Box';

const { random } = canvasUtils;

export default function App() {
  return (
    <div className="three-fiber-playground">
      <Canvas orthographic camera={{ zoom: 30, position: [10, 10, 10] }}>
        <ambientLight />
        <directionalLight position={[0, 0, 2]} />
        {Array(20)
          .fill('')
          .map((_, index) => (
            <Box
              key={index}
              position={[random.gaussian() * 5, random.gaussian() * 5, random.gaussian() * 5]}
            />
          ))}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
