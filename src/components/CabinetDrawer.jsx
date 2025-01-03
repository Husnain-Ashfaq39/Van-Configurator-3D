import { useGLTF } from '@react-three/drei';
import { useState, useRef } from 'react';
import useDraggable from '../hooks/useDraggable';
import RotateButton from './RotateButton'; // Import the RotateButton component
import { a } from '@react-spring/three';

const CabinetDrawer = ({ cameraPosition }) => {
  const { scene } = useGLTF('/Cabinet_Drawer.glb'); // Load the cabinet drawer model
  const VAN_BOUNDS = { x: [-0.3, 0.3], y: [0.3, 0.3], z: [-2, 0] };

  // State to keep track of the current position for the RotateButton
  const [currentPos, setCurrentPos] = useState([0, -0.8, 0]);

  // Callback to update currentPos when x or z changes
  const handlePositionChange = (newX, newZ) => {
    setCurrentPos((prev) => [newX, prev[1], newZ]);
  };

  // Initialize useDraggable with the initial position, bounds, and onChange callback
  const { bind, position } = useDraggable([0, -0.8, 0], VAN_BOUNDS, handlePositionChange);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [showRotateButton, setShowRotateButton] = useState(false);

  const handleRotate = () => {
    setRotation(([x, y, z]) => [x, y + Math.PI / 2, z]);
  };


  const handleDoubleClick = () => {
    setShowRotateButton(true);
  };

  const handleCloseMenu = () => {
    setShowRotateButton(false);
  };

  return (
    <>
      <a.primitive
        object={scene}
        position-x={position.x}
        position-z={position.z}
        position-y={-0.8}
        rotation={rotation}
        scale={[0.007, 0.007, 0.007]}
        onDoubleClick={handleDoubleClick}
        {...bind()}
      />
      {showRotateButton && (
        <RotateButton
          position={[currentPos[0], -0.8, currentPos[2]]}
          onRotate={handleRotate}
          onClose={handleCloseMenu}
        />
      )}
    </>
  );
};

export default CabinetDrawer;
