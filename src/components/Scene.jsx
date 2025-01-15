// Scene.jsx
import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import VanModel from './VanModel';
import CameraUpdater from './CameraUpdater';
import useSelectionStore from '../store/selectionStore';
import GreenField from './GreenField';

const generateFieldPositions = (gridSize, spacing) => {
  const positions = [];
  for (let x = -gridSize; x <= gridSize; x++) {
    for (let z = -gridSize; z <= gridSize; z++) {
      positions.push([x * spacing, -2, z * spacing]);
    }
  }
  return positions;
};

const Scene = ({
 
  showBed,
  showSolarPanel,
  showCabinetDrawer,
  showSlidingDrawer,
  showWashroom,
  cameraPosition,
  lookAt,
  view,
  gridSize = 4,
  spacing = 15.5
}) => {
  const setSelectedObject = useSelectionStore(state => state.setSelectedObject);
  const fieldPositions = generateFieldPositions(gridSize, spacing);
  const canvasRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      onPointerMissed={() => setSelectedObject(null)}
      shadows
      gl={{ powerPreference: 'high-performance', antialias: true }}
      camera={{ position: cameraPosition, fov: 50 }}
      className="w-full h-full"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, 5, 5]} intensity={0.7} castShadow />
      <directionalLight position={[0, 5, -5]} intensity={0.5} castShadow />

      <Suspense fallback={null}>
        {fieldPositions.map((position, index) => (
          <GreenField key={index} position={position} />
        ))}
        
        <VanModel 
         
          showBed={showBed} 
          showSolarPanel={showSolarPanel} 
          showCabinetDrawer={showCabinetDrawer}
          showSlidingDrawer={showSlidingDrawer}
          showWashroom={showWashroom}
          cameraPosition={cameraPosition}
          view={view}
        />
      </Suspense>

      <CameraUpdater 
        cameraPosition={cameraPosition} 
        cameraLookAt={lookAt}
      />
     
    </Canvas>
  );
};

export default Scene;