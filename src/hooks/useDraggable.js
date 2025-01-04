// hooks/useDraggable.js
import { useRef, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import { useSpring } from '@react-spring/three';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const useDraggable = (initialPosition, bounds, onChange, options) => {
  const { camera } = useThree(); // Access the camera from the context
  const [{ x, z }, api] = useSpring(() => ({
    x: initialPosition[0],
    z: initialPosition[2],
    config: { tension: 300, friction: 30 },
    onChange: (result) => {
      if (onChange) {
        onChange(result.value.x, result.value.z);
      }
    },
  }));

  const base = useRef([initialPosition[0], initialPosition[2]]);
  const [isDragging, setIsDragging] = useState(false); // Track dragging state

  const bind = useGesture({
    onDrag: ({ active, movement: [mx, my], last }) => {
      if (active) {
        setIsDragging(true); // Dragging started
        const sensitivity = 0.01;

        // Calculate forward and right vectors
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        forward.projectOnPlane(new THREE.Vector3(0, 1, 0)).normalize(); // Project onto XZ plane

        const right = new THREE.Vector3();
        right.crossVectors(forward, camera.up).normalize(); // Corrected Right vector

        // Calculate delta movement based on drag
        const movementRight = right.clone().multiplyScalar(mx * sensitivity);
        const movementForward = forward.clone().multiplyScalar(-my * sensitivity);
        const delta = movementRight.add(movementForward);

        let newPosX = base.current[0] + delta.x;
        let newPosZ = base.current[1] + delta.z;

        // Clamp the positions within the specified bounds
        newPosX = Math.max(bounds.x[0], Math.min(bounds.x[1], newPosX));
        newPosZ = Math.max(bounds.z[0], Math.min(bounds.z[1], newPosZ));

        // Update the spring with the new positions
        api.start({ x: newPosX, z: newPosZ });
      }

      if (!active) {
        setIsDragging(false); // Dragging ended
        if (last) {
          // Update the base position when the drag ends
          base.current = [x.get(), z.get()];
        }
      }
    },
  });

  return {
    bind,
    position: { x, z }, // Return position as an object with x and z
    isDragging, // Indicate if the object is being dragged
  };
};

export default useDraggable;
