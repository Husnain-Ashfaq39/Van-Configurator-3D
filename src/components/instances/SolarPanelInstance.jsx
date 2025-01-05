// src/components/instances/SolarPanelInstance.jsx
import React, { useMemo, useState } from 'react';
import { a } from '@react-spring/three'; // Use animated primitive if needed
import { useGLTF } from '@react-three/drei';
import useDraggable from '../../hooks/useDraggable';
import RotateButton from '../RotateButton';
import useHighlightOnDrag from '../../hooks/useHighlightOnDrag';
import * as THREE from 'three';

const SolarPanelInstance = ({ id, initialPosition, view, onCopy, onRemove }) => {
  const { scene } = useGLTF('/solar_panel.glb');

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Clone materials to ensure each instance has unique materials
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

  const [position, setPosition] = useState(initialPosition);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [showRotateButton, setShowRotateButton] = useState(false);

  const VAN_BOUNDS = { x: [-0.3, 0.3], z: [-2, 0] };

  const { bind, isDragging } = useDraggable(position, VAN_BOUNDS, (newX, newZ) => {
    setPosition([newX, position[1], newZ]);
  }, { enabled: view !== 'default' });

  useHighlightOnDrag(clonedScene, isDragging);

  const handleRotate = () => setRotation(([x, y, z]) => [x, y + Math.PI / 2, z]);

  const handleDoubleClick = () => {
    if (view === 'default') return;
    setShowRotateButton(true);
  };

  const handleCloseMenu = () => {
    setShowRotateButton(false);
  };

  return (
    <>
      <a.primitive // Changed to animated primitive
        object={clonedScene}
        position={position}
        rotation={rotation}
        scale={[0.003, 0.003, 0.003]}
        onDoubleClick={handleDoubleClick}
        {...(view !== 'default' ? bind() : {})}
      />
      {showRotateButton && view !== 'default' && (
        <RotateButton
          position={position}
          onRotate={handleRotate}
          onCopy={() => onCopy(id, position)}
          onRemove={() => onRemove(id)}
          onClose={handleCloseMenu}
        />
      )}
    </>
  );
};

export default SolarPanelInstance;
