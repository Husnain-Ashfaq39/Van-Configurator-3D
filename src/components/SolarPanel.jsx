import { useGLTF } from '@react-three/drei';
import { useState } from 'react';
import { a } from '@react-spring/three';
import useDraggable from '../hooks/useDraggable';
import RotateButton from './RotateButton';

const SolarPanel = () => {
  const { scene: solarPanelScene } = useGLTF('/solar_panel.glb'); 
  
  const VAN_BOUNDS = { x: [-0.3, 0.3], y: [0.3, 0.3], z: [-2, 0] };

  // State to keep track of the current position for the RotateButton
  const [currentPos, setCurrentPos] = useState([0, -0.8, 0]);

  // Callback to update currentPos when x or z changes
  const handlePositionChange = (newX, newZ) => {
    setCurrentPos((prev) => [newX, prev[1], newZ]);
  };


  const { bind, position } = useDraggable([0, 1.3, 0], VAN_BOUNDS, handlePositionChange);
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
        object={solarPanelScene}
        position-x={position.x}
        position-z={position.z}
        position-y={1.3}
        rotation={rotation}
        scale={[0.003, 0.003, 0.003]}
        onDoubleClick={handleDoubleClick}
        {...bind()}
      />
      {showRotateButton && (
        <RotateButton
          position={[currentPos[0], 1.3, currentPos[2]]}
          onRotate={handleRotate}
          onClose={handleCloseMenu}
        />
      )}
    </>
  );
};

export default SolarPanel; 