// src/components/VanModel.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import Bed from './Bed';
import SolarPanel from './SolarPanel';
import CabinetDrawer from './CabinetDrawer';
import SlidingDrawer from './SlidingDrawer';
import Washroom from './Washroom';
import PreLoader from './preLoader'; // Ensure correct casing

const VanModel = ({
  hiddenParts,
  showBed,
  showSolarPanel,
  showCabinetDrawer,
  showSlidingDrawer,
  showWashroom,
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

          if (view === 'innerZoom') {
            // When view is 'innerZoom', ensure all parts are visible
            child.visible = true;
          } else if (view !== 'roof2' && hiddenParts.includes(partName)) {
            // Hide the part if it's in hiddenParts and view === 'roof2' is false
            child.visible = false;
          } else {
            // Otherwise, make sure the part is visible
            child.visible = true;
          }
        }
      });
    }
  }, [vanScene, hiddenParts, view === 'roof2', view]);

  // Early Return if Initial Loading is True
  if (isInitialLoading) {
    return <PreLoader progress={preloaderProgress} />;
  }

  return (
    <>
      <primitive ref={vanRef} object={vanScene} />

      {showBed && <Bed view={view} />}
      {showSolarPanel && view === 'roof2' && <SolarPanel view={view} />}
      {showSlidingDrawer && <SlidingDrawer view={view} />}
      {showWashroom && <Washroom view={view} />}

      {/* Render CabinetDrawer without PreLoader */}
      {showCabinetDrawer && <CabinetDrawer view={view} />}

    </>
  );
};

export default VanModel;
