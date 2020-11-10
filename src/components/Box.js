import React, { useRef, useEffect } from 'react';
import { useFrame } from 'react-three-fiber';
import * as canvasUtils from 'canvas-sketch-util';
import palettes from 'nice-color-palettes';
import * as THREE from 'three';

const { random } = canvasUtils;


const grid = (n, gridSize) => {
  const max = gridSize - 1;
  const snapped = Math.round(n * max) / max;
  return snapped * 2 - 1;
};

const randomizeMesh = (mesh) => {
  const gridSize = random.rangeFloor(3, 11);
  // Choose a random grid point in a 3D volume between -1..1
  const point = new THREE.Vector3(
    grid(random.value(), gridSize),
    grid(random.value(), gridSize),
    grid(random.value(), gridSize)
  );

  // Stretch it vertically
  point.y *= 1.5;
  // Scale all the points closer together
  point.multiplyScalar(3);
  point.y -= 0.65;

  mesh.position.copy(point);
  mesh.originalPosition = mesh.position.clone();

  // Randomly scale each axis
  mesh.scale.set(
    random.gaussian(),
    random.gaussian(),
    random.gaussian()
  );

  // Do more random scaling on each axis
  if (random.chance(0.5)) mesh.scale.x *= random.gaussian();
  if (random.chance(0.5)) mesh.scale.y *= random.gaussian();
  if (random.chance(0.5)) mesh.scale.z *= random.gaussian();

  // Further scale each object
  mesh.scale.multiplyScalar(random.gaussian() * 5);

  // Store the scale
  mesh.originalScale = mesh.scale.clone();

  // Set some time properties on each mesh
  mesh.time = 0;
  mesh.duration = random.range(1, 4);

};

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((_, delta) => {

    mesh.current.time += delta;

    mesh.current.scale.copy(mesh.current.originalScale);
    mesh.current.scale.multiplyScalar(Math.sin(mesh.current.time / mesh.current.duration * Math.PI));

    const f = 0.5;
    mesh.current.scale.y =
      mesh.current.originalScale.y +
      0.25 *
        random.noise3D(
          mesh.current.originalPosition.x * f,
          mesh.current.originalPosition.y * f,
          mesh.current.originalPosition.z * f,
          delta * 0.25
        );

  });

  useEffect(() => {
    randomizeMesh(mesh.current)
  }, []);

  return (
    <mesh {...props} ref={mesh}>
      <boxBufferGeometry args={[1, 1, 1]} scale={[random.gaussian(), random.gaussian(), random.gaussian()]}/>
      <meshStandardMaterial metalness={0} roughness={1} color={random.pick(random.pick(palettes))} />
    </mesh>
  );
}

export default Box;
