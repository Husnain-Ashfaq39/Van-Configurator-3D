import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import Bed from './Bed';
import SolarPanel from './SolarPanel';
import CabinetDrawer from './CabinetDrawer';
import SlidingDrawer from './SlidingDrawer';
import Washroom from './Washroom';

const VanModel = ({ hiddenParts, isRoof2, showBed, showSolarPanel, showCabinetDrawer, showSlidingDrawer, showWashroom, cameraPosition }) => {
  const { scene: vanScene } = useGLTF('/parent_Setting_van/untitled.gltf');
  const vanRef = useRef();

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

  return (
    <>
      <primitive ref={vanRef} object={vanScene} />
      {showBed && <Bed  />}
      {showSolarPanel && isRoof2 && <SolarPanel />}
      {showCabinetDrawer && <CabinetDrawer />}
      {showSlidingDrawer && <SlidingDrawer  />}
      {showWashroom && <Washroom />}
    </>
  );
};

export default VanModel;

