// src/components/ObjectInstance.jsx
import React, { useState, useMemo } from 'react';
import { a } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import RotateButton from './RotateButton';
import useDraggable from '../hooks/useDraggable';
import useHighlightOnDrag from '../hooks/useHighlightOnDrag';
import PropTypes from 'prop-types';

const ObjectInstance = ({ id, modelPath, initialPosition, view, onCopy, onRemove }) => {
  // Load the GLTF model
  const { scene } = useGLTF(modelPath);
  
  // Clone the scene to ensure each instance is unique
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Define bounds for dragging (can be customized per object if needed)
  const VAN_BOUNDS = { x: [-5, 5], y: [0, 5], z: [-5, 5] };

  const [position, setPosition] = useState(initialPosition);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [showRotateButton, setShowRotateButton] = useState(false);

  // Initialize useDraggable
  const { bind, isDragging } = useDraggable(
    position,
    VAN_BOUNDS,
    (newX, newZ) => {
      setPosition([newX, position[1], newZ]);
    },
    { enabled: view !== 'default' }
  );

  // Apply highlighting during dragging
  useHighlightOnDrag(clonedScene, isDragging); // Change color as needed

  // Handle rotation
  const handleRotate = () => {
    setRotation(([x, y, z]) => [x, y + Math.PI / 2, z]);
    setShowRotateButton(false);
  };

  // Handle double-click to show the rotate menu
  const handleDoubleClick = () => {
    if (view === 'default') return;  // Prevent double-click in default view
    setShowRotateButton(true);
  };

  // Close the rotate menu
  const handleCloseMenu = () => {
    setShowRotateButton(false);
  };

  return (
    <>
      <a.primitive
        object={clonedScene}
        position-x={position[0]}
        position-y={position[1]}
        position-z={position[2]}
        rotation={rotation}
        scale={[0.85, 0.85, 0.85]} // Adjust scale as needed
        onDoubleClick={handleDoubleClick}
        {...(view !== 'default' ? bind() : {})}  // Only apply bind if not in default view
      />
      {showRotateButton && view !== 'default' && (
        <RotateButton
          position={[position[0], position[1] + 1, position[2]]} // Adjust positioning of the menu
          onRotate={handleRotate}
          onCopy={() => onCopy(id, position)}
          onRemove={() => onRemove(id)}
        />
      )}
    </>
  );
};

ObjectInstance.propTypes = {
  id: PropTypes.string.isRequired,
  modelPath: PropTypes.string.isRequired,
  initialPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  view: PropTypes.string.isRequired,
  onCopy: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ObjectInstance;
