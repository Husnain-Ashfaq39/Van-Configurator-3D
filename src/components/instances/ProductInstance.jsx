import React, { useState } from 'react';
import { a } from '@react-spring/three';
import RotateButton from '../RotateButton';
import BigDot from '../BigDot';
import useInstanceLogic from '../../hooks/useInstanceLogic';
import PreLoader from '../preLoader';

const ProductInstance = ({ id, initialPosition, view, onCopy, onRemove, modelPath, scale, dimensions, vanBounds, yAxisMove }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const {
    clonedScene,
    isLoading,
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
    isAnimationComplete,
    resetAnimation,
  } = useInstanceLogic(modelPath, initialPosition, view, vanBounds, isPlaying, yAxisMove);

 

  const handlePlayAnimation = () => {
    console.log('Playing animation');
   setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  if (isLoading) {
    return (
      <PreLoader 
        progress={100} 
        vanDimensions={dimensions}
        position={initialPosition}
      />
    );
  }

  return (
    <>
      <a.primitive
        ref={cabinetRef}
        object={clonedScene}
        position-x={position[0]}
        position-y={position[1]}
        position-z={position[2]}
        rotation={[0, (rotationY * Math.PI) / 180, 0]}
        scale={scale}
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
          onPlayAnimation={handlePlayAnimation}
          isAnimationComplete={isAnimationComplete}
          resetAnimation={resetAnimation}
        />
      )}
      
    </>
  );
};

export default ProductInstance;