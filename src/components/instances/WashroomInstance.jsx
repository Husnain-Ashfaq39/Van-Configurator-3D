// src/components/instances/WashroomInstance.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { a } from '@react-spring/three'; // Use animated primitive if needed
import { useGLTF } from '@react-three/drei';
import useDraggable from '../../hooks/useDraggable';
import RotateButton from '../RotateButton';
import useHighlightOnDrag from '../../hooks/useHighlightOnDrag';
import '../../assets/style.css'; // Add this import
import BigDot from '../BigDot'; // Add this import

const WashroomInstance = ({ id, initialPosition, view, onCopy, onRemove }) => {
  const { scene } = useGLTF('/washroom2.glb');

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
  const [rotationY, setRotationY] = useState(0); // Manage only Y-axis rotation
  const [showRotateButton, setShowRotateButton] = useState(false);
  const [showBigDot, setShowBigDot] = useState(true); // Add this state

  const VAN_BOUNDS = { x: [-0.3, 0.3], z: [-2, 0] };

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
  }, [isDragging, view]);

  const [isHovered, setIsHovered] = useState(false);

  const handleDoubleClick = () => {
    if (view === 'default') return;
    setShowRotateButton(true);
  };

  const handleCloseMenu = () => {
    setShowRotateButton(false);
  };

  useEffect(() => {
    setShowBigDot(!isDragging); // Update BigDot visibility based on dragging
  }, [isDragging]);

  return (
    <>
      <a.primitive // Changed to animated primitive
        object={clonedScene}
        position-x={position[0]}
        position-y={position[1]}
        position-z={position[2]}
        rotation={[0, (rotationY * Math.PI) / 180, 0]}
        scale={[0.85, 0.85, 0.85]}
        onDoubleClick={handleDoubleClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        {...(view !== 'default' ? bind() : {})}
      />
      {showBigDot && (
        <BigDot position={position} onClick={() => setShowRotateButton(true)} />
      )}
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

export default WashroomInstance;
