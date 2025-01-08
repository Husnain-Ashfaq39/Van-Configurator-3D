import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import VanModel from './VanModel';
import CameraUpdater from './CameraUpdater';
import useSelectionStore from '../store/selectionStore';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import GreenField from './GreenField';

const generateFieldPositions = (gridSize, spacing) => {
  const positions = [];
  for (let x = -gridSize; x <= gridSize; x++) {
    for (let z = -gridSize; z <= gridSize; z++) {
      positions.push([x * spacing, -2, z * spacing]); // Adjust height as needed
    }
  }
  return positions;
};

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
  hideOrbitControls,
  gridSize = 4, // Number of fields in each direction (total gridSize * 2 + 1 per side)
  spacing = 15.5 // Spacing between fields
}) => {
  const setSelectedObject = useSelectionStore(state => state.setSelectedObject);
  const fieldPositions = generateFieldPositions(gridSize, spacing);

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
      <Suspense fallback={null}>
        {fieldPositions.map((position, index) => (
          <GreenField key={index} position={position} />
        ))}
        
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
