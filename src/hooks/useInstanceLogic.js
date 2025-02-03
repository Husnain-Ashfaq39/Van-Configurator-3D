import { useMemo, useState, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';  // Importing Three.js for animation control
import useDraggable from './useDraggable';
import useHighlightOnDrag from './useHighlightOnDrag';
import useClickOutside from './useClickOutside';
import {  useFrame } from '@react-three/fiber';

const useInstanceLogic = (gltfPath, initialPosition, view, vanBounds, isPlaying) => {
  const { scene, animations, loading } = useGLTF(gltfPath, true, true);
  const mixer = useRef();
  const [position, setPosition] = useState(initialPosition);
  const [rotationY, setRotationY] = useState(0);
  const [showRotateButton, setShowRotateButton] = useState(false);
  const [showBigDot, setShowBigDot] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const cabinetRef = useRef();
  const [clonedScene, setClonedScene] = useState(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);


  const { bind, isDragging } = useDraggable(
    position,
    vanBounds,
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

  // Animation setup
  useEffect(() => {
    if (scene && !loading) {
      // Clone the scene and setup animation mixer
      const clone = scene.clone();
      clone.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          // Clone material for each mesh to avoid shared references between copies
          if (Array.isArray(child.material)) {
            child.material = child.material.map(material => material.clone());
          } else {
            child.material = child.material.clone();
          }
        }
      });
      setClonedScene(clone);

      mixer.current = new THREE.AnimationMixer(clone);
      animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.paused = true; // Initialize actions but do not play them
      });
    }
  }, [scene, loading, animations]);

  // Update animation on every frame
  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  useEffect(() => {
    if (isPlaying && mixer.current) {
      animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.paused = false; // Unpause the action to play
        action.reset();
        action.setLoop(THREE.LoopOnce, 0); // Set the animation to play once
        action.clampWhenFinished = true; // Stop at the last frame
        setIsAnimationComplete(true);
        action.play();
        action.onFinished = () => {
          setIsPlaying(false); // Reset isPlaying when animation finishes
         
        };
      });
    }
  }, [isPlaying, animations]);

  const resetAnimation = () => {
    if (mixer.current) {
      animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.reset();
        action.paused = true;
      });
      setIsAnimationComplete(false);
    }
  };

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
    isAnimationComplete,
    resetAnimation,
  };
};

export default useInstanceLogic;
