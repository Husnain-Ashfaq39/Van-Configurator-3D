// src/components/instances/CabinetInstance.jsx
import React, { useState, useMemo } from 'react';
import { a } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import useDraggable from '../../hooks/useDraggable';
import useHighlightOnDrag from '../../hooks/useHighlightOnDrag';
import RotateButton from '../RotateButton';

const CabinetInstance = ({ id, initialPosition, view, onCopy, onRemove }) => {
  // Load the GLTF model
  const { scene } = useGLTF('/Cabinet_Drawer.glb');

  // Clone the scene to ensure each instance is unique
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Traverse the cloned scene and clone each material to ensure uniqueness
    clone.traverse((child) => {
      if (child.isMesh) {
        if (Array.isArray(child.material)) {
          child.material = child.material.map((mat) => mat.clone());
        } else {
          child.material = child.material.clone();
        }
      }
    });

    return clone;
  }, [scene]);

  const VAN_BOUNDS = { x: [-0.3, 0.3], y: [0.3, 0.3], z: [-2, 0] };

  const [position, setPosition] = useState(initialPosition);
  const [rotationY, setRotationY] = useState(0); // Rotation in degrees
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
  useHighlightOnDrag(clonedScene, isDragging); // Yellow outline; change to 0x0000ff for blue

  const handleDoubleClick = () => {
    if (view === 'default') return; // Prevent double-click in default view
    setShowRotateButton(true);
  };

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
        rotation={[0, (rotationY * Math.PI) / 180, 0]} // Convert degrees to radians
        scale={[0.007, 0.007, 0.007]}
        onDoubleClick={handleDoubleClick}
        {...(view !== 'default' ? bind() : {})} // Only apply bind if not in default view
      />
      {showRotateButton && view !== 'default' && (
        <RotateButton
          position={position}
          rotationY={rotationY}
          setRotationY={setRotationY}
          onCopy={() => onCopy(id, position)}
          onRemove={() => onRemove(id)}
          onClose={handleCloseMenu}
        />
      )}
    </>
  );
};

export default CabinetInstance;
