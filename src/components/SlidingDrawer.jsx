// components/SlidingDrawer.jsx
import { useGLTF } from '@react-three/drei';
import { useState } from 'react';
import { a } from '@react-spring/three';
import useDraggable from '../hooks/useDraggable';
import RotateButton from './RotateButton';

const SlidingDrawer = ({ view }) => {
  const { scene } = useGLTF('/Sliding_Drawer.glb');
  const VAN_BOUNDS = { x: [-0.3, 0.3], z: [-2, 0] }; // Removed y bounds

  // State to keep track of the current position for the RotateButton
  const [currentPos, setCurrentPos] = useState([0, -0.8, 0]);

  // Callback to update currentPos when x or z changes
  const handlePositionChange = (newX, newZ) => {
    setCurrentPos((prev) => [newX, prev[1], newZ]);
  };

  // Initialize useDraggable with the initial position, bounds, and onChange callback
  const { bind, position } = useDraggable(
    [0, -0.8, 0], 
    VAN_BOUNDS, 
    handlePositionChange,
    { enabled: view !== 'default' }  // Disable dragging in default view
  );
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [showRotateButton, setShowRotateButton] = useState(false);

  const handleRotate = () => {
    setRotation(([x, y, z]) => [x, y + Math.PI / 2, z]);
  };

  const handleDoubleClick = (e) => {
    if (view === 'default') return;  // Prevent double-click in default view
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
        scale={[0.35, 0.35, 0.35]}
        onDoubleClick={handleDoubleClick}
        {...(view !== 'default' ? bind() : {})}  // Only apply bind if not in default view
      />
      {showRotateButton && view !== 'default' && (
        <RotateButton
          position={[currentPos[0], -0.8, currentPos[2]]}
          onRotate={handleRotate}
          onClose={handleCloseMenu}
        />
      )}
    </>
  );
};

export default SlidingDrawer;
