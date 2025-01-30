import { useMemo, useState, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import useDraggable from './useDraggable';
import useHighlightOnDrag from './useHighlightOnDrag';
import useClickOutside from './useClickOutside';

const useInstanceLogic = (gltfPath, initialPosition, view) => {
  const { scene, loading } = useGLTF(gltfPath, true, true);
  const [position, setPosition] = useState(initialPosition);
  const [rotationY, setRotationY] = useState(0);
  const [showRotateButton, setShowRotateButton] = useState(false);
  const [showBigDot, setShowBigDot] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const cabinetRef = useRef();
  const [clonedScene, setClonedScene] = useState(null);

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
    setShowBigDot(!isDragging);
  }, [isDragging]);

  useClickOutside(cabinetRef, () => {
    setShowBigDot(true);
  });

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

  useEffect(() => {
    if (scene && !loading) {
      const clone = scene.clone();
      clone.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      setClonedScene(clone);
    }
  }, [scene, loading]);

  return {
    clonedScene,
    position,
    setPosition,
    rotationY,
    setRotationY,
    showRotateButton,
    setShowRotateButton,
    showBigDot,
    setShowBigDot,
    isHovered,
    setIsHovered,
    cabinetRef,
    bind,
    handleDoubleClick: () => {
      if (view !== 'default') {
        setShowRotateButton(true);
      }
    },
    handleCloseMenu: () => {
      setShowRotateButton(false);
    },
    isLoading: loading || !clonedScene,
  };
};

export default useInstanceLogic; 