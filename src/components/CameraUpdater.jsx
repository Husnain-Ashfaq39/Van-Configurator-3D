// CameraUpdater.jsx
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import {  useRef } from 'react';
import * as THREE from 'three';

const CameraUpdater = ({ cameraPosition, cameraLookAt }) => {
  const { camera } = useThree();

  // Define springs for position and target
  const { pos, lookAt } = useSpring({
    pos: cameraPosition,
    lookAt: cameraLookAt,
    config: { mass: 1, tension: 170, friction: 26 }, // Customize as needed
  });

  // References to store current position and lookAt
  const currentPosition = useRef(new THREE.Vector3(...cameraPosition));
  const currentLookAt = useRef(new THREE.Vector3(...cameraLookAt));

  useFrame(() => {
    // Update the current position and lookAt with spring values
    currentPosition.current.lerp(new THREE.Vector3(...pos.get()), 0.1);
    currentLookAt.current.lerp(new THREE.Vector3(...lookAt.get()), 0.1);

    // Apply the interpolated position and lookAt to the camera
    camera.position.copy(currentPosition.current);
    camera.lookAt(currentLookAt.current);
    camera.updateProjectionMatrix();
  });

  return null;
};

export default CameraUpdater;
