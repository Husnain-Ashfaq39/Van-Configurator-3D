// src/components/VanModel.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import Bed from './Bed';
import SolarPanel from './SolarPanel';
import CabinetDrawer from './CabinetDrawer';
import SlidingDrawer from './SlidingDrawer';
import Washroom from './Washroom';
import PreLoader from './preLoader'; // Ensure correct casing
import { OrbitControls } from '@react-three/drei';

const VanModel = ({
  hiddenParts,
  isRoof2,
  showBed,
  showSolarPanel,
  showCabinetDrawer,
  showSlidingDrawer,
  showWashroom,
  cameraPosition,
  view,
}) => {
  const { scene: vanScene } = useGLTF('/parent_Setting_van/untitled.gltf');
  const vanRef = useRef();

  // State to control Initial Loading
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [preloaderProgress, setPreloaderProgress] = useState(0);

  // Initial Loading Effect
  useEffect(() => {
    // Timer to end loading after 3 seconds
    const initialTimer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 4000); // 3 seconds

    // Simulate PreLoader progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 1;
      if (progress > 100) progress = 100;
      setPreloaderProgress(progress);
      if (progress === 100) clearInterval(progressInterval);
    }, 40); // Increment every 300ms

    // Cleanup timers on unmount
    return () => {
      clearTimeout(initialTimer);
      clearInterval(progressInterval);
    };
  }, []);

  // Visibility Control for Van Parts
  useEffect(() => {
    if (vanScene) {
      vanScene.traverse((child) => {
        if (child.isMesh) {
          const partName = child.name;

          if (!isRoof2 && hiddenParts.includes(partName)) {
            child.visible = false;
          } else {
            child.visible = true;
          }
        }
      });
    }
  }, [vanScene, hiddenParts, isRoof2]);

  // Early Return if Initial Loading is True
  if (isInitialLoading) {
    return <PreLoader progress={preloaderProgress} />;
  }

  return (
    <>
      <primitive ref={vanRef} object={vanScene} />

      {showBed && <Bed view={view} />}
      {showSolarPanel && isRoof2 && <SolarPanel view={view} />}
      {showSlidingDrawer && <SlidingDrawer view={view} />}
      {showWashroom && <Washroom view={view} />}

      {/* Render CabinetDrawer without PreLoader */}
      {showCabinetDrawer && <CabinetDrawer view={view} />}

      {/* Optional: Add OrbitControls for better camera manipulation */}
      <OrbitControls />
    </>
  );
};

export default VanModel;
