import React from 'react';
import { a } from '@react-spring/three';
import RotateButton from '../RotateButton';
import BigDot from '../BigDot';
import useInstanceLogic from '../../hooks/useInstanceLogic';

const FullBedInstance = ({ id, initialPosition, view, onCopy, onRemove }) => {
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
  } = useInstanceLogic('/Full-Bed.glb', initialPosition, view);

  return (
    <>
      <a.primitive
        ref={cabinetRef}
        object={clonedScene}
        position-x={position[0]}
        position-y={position[1]}
        position-z={position[2]}
        rotation={[0, (rotationY * Math.PI) / 180, 0]}
        scale={[0.57, 0.57, 0.57]} // Adjust scale as needed
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

export default FullBedInstance; 