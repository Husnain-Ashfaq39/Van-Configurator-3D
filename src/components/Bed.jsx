/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei';
import useDraggable from '../hooks/useDraggable';
import RotateButton from './RotateButton'; // Import the RotateButton component
import { useState, useRef } from 'react';

const Bed = () => {
  const { scene: bedScene } = useGLTF('/bed.glb'); // Load the bed model

  const VAN_BOUNDS = { x: [-0.3, 0.3], y: [0.3, 0.3], z: [-2, 0] }; // Example van boundary limits
  const { ref, position, handlePointerDown, handlePointerMove, handlePointerUp } = useDraggable([0, -0.5, 0], VAN_BOUNDS);

  const [isHovered, setIsHovered] = useState(false); // Hover state
  const [rotation, setRotation] = useState([0, 0, 0]); // Bed rotation state
  const hoverTimeout = useRef(null); // Timeout reference to prevent rapid toggling

  const handleRotate = () => {
    setRotation(([x, y, z]) => [x, y + Math.PI / 2, z]); // Rotate 90 degrees
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setIsHovered(false), 40);
  };

  return (
    <>
      <primitive
        ref={ref}
        object={bedScene}
        position={position}
        rotation={rotation}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerOver={handleMouseEnter}
        onPointerOut={handleMouseLeave}
      />
      {isHovered && (
        <RotateButton
          position={position}
          onRotate={handleRotate}
          isHovered={isHovered}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </>
  );
};

export default Bed; 