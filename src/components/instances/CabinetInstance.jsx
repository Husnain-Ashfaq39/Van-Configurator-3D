// src/components/instances/CabinetInstance.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { a } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import useDraggable from '../../hooks/useDraggable';
import useHighlightOnDrag from '../../hooks/useHighlightOnDrag';
import RotateButton from '../RotateButton';
import '../../assets/style.css'; // Add this import

const CabinetInstance = ({ id, initialPosition, view, onCopy, onRemove }) => {
  const { scene } = useGLTF('/Cabinet_Drawer.glb');
  const [isHovered, setIsHovered] = useState(false);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
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
  const [rotationY, setRotationY] = useState(0);
  const [showRotateButton, setShowRotateButton] = useState(false);

  const { bind, isDragging } = useDraggable(
    position,
    VAN_BOUNDS,
    (newX, newZ) => {
      setPosition([newX, position[1], newZ]);
    },
    { enabled: view !== 'default' }
  );

  useHighlightOnDrag(clonedScene, isDragging);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      if (isDragging) {
        canvas.classList.add('dragging');
      } else if (isHovered && view !== 'default') {
        canvas.classList.add('draggable');
      } else {
        canvas.classList.remove('dragging', 'draggable');
      }
    }
  }, [isHovered, isDragging, view]);

  const handleDoubleClick = () => {
    if (view === 'default') return;
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
        rotation={[0, (rotationY * Math.PI) / 180, 0]}
        scale={[0.007, 0.007, 0.007]}
        onDoubleClick={handleDoubleClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        {...(view !== 'default' ? bind() : {})}
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