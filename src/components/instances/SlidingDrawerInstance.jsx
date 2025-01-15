// src/components/instances/SlidingDrawerInstance.jsx
import React from 'react';
import { a } from '@react-spring/three';
import RotateButton from '../RotateButton';
import BigDot from '../BigDot';
import useInstanceLogic from '../../hooks/useInstanceLogic';

const SlidingDrawerInstance = ({ id, initialPosition, view, onCopy, onRemove }) => {
  const {
    clonedScene,
    position,
    rotationY,
    setRotationY,
    showRotateButton,
    setShowRotateButton,
    showBigDot,
    isHovered,
    setIsHovered,
    cabinetRef,
    bind,
    handleDoubleClick,
    handleCloseMenu,
  } = useInstanceLogic('/Sliding_Drawer.glb', initialPosition, view);

  return (
    <>
      <a.primitive
        ref={cabinetRef}
        object={clonedScene}
        position-x={position[0]}
        position-y={position[1]}
        position-z={position[2]}
        rotation={[0, (rotationY * Math.PI) / 180, 0]}
        scale={[0.35, 0.35, 0.35]}
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

export default SlidingDrawerInstance;
