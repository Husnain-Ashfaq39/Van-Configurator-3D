// hooks/useDraggable.js
import { useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import { useSpring } from '@react-spring/three'; // Ensure you're using the three.js version

const useDraggable = (initialPosition, bounds, onChange) => {
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

  const bind = useGesture({
    onDrag: ({ active, movement: [mx, mz], last }) => {
      if (active) {
        const sensitivity = 0.01;
        let newPosX = base.current[0] + mx * sensitivity;
        let newPosZ = base.current[1] + mz * sensitivity;

        // Clamp the positions within the specified bounds
        newPosX = Math.max(bounds.x[0], Math.min(bounds.x[1], newPosX));
        newPosZ = Math.max(bounds.z[0], Math.min(bounds.z[1], newPosZ));

        // Update the spring with the new positions
        api.start({ x: newPosX, z: newPosZ });
      }

      if (last) {
        // Update the base position when the drag ends
        base.current = [x.get(), z.get()];
      }
    },
  });

  return {
    bind,
    position: { x, z }, // Return position as an object with x and z
  };
};

export default useDraggable;
