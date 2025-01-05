// components/Scene.jsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import VanModel from './VanModel';
import CameraUpdater from './CameraUpdater';
import useSelectionStore from '../store/selectionStore';
import PreLoader from './preLoader'; // Import the PreLoader component

const Scene = ({
  hiddenParts,
  isRoof2,
  showBed,
  showSolarPanel,
  showCabinetDrawer,
  showSlidingDrawer,
  showWashroom,
  cameraPosition,
  view,
  hideOrbitControls
}) => {
  const setSelectedObject = useSelectionStore(state => state.setSelectedObject);

  return (
    <Canvas
      onPointerMissed={() => setSelectedObject(null)} // Deselect when clicking outside
      shadows
      gl={{ powerPreference: 'high-performance', antialias: true }}
      camera={{ position: cameraPosition, fov: 50 }}
      className="w-full h-full"
    >
      {/* Lighting Setup */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, 5, 5]} intensity={0.7} castShadow />
      <directionalLight position={[0, 5, -5]} intensity={0.5} castShadow />

      {/* Suspense with PreLoader as fallback */}
      <Suspense
        fallback={
          <Html center>
            <PreLoader />
          </Html>
        }
      >
        <VanModel 
          hiddenParts={hiddenParts} 
          isRoof2={isRoof2} 
          showBed={showBed} 
          showSolarPanel={showSolarPanel} 
          showCabinetDrawer={showCabinetDrawer}
          showSlidingDrawer={showSlidingDrawer}
          showWashroom={showWashroom}
          cameraPosition={cameraPosition}
          view={view}
        />
      </Suspense>

      {/* Camera Controls */}
      <CameraUpdater cameraPosition={cameraPosition} cameraLookAt={view === 'roof2' ? [0,0,0] : [0,0,0]} />
      {!hideOrbitControls && <OrbitControls enableZoom={true} />}
    </Canvas>
  );
};

export default Scene;
