// Scene.jsx
import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
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
  products,
  cameraPosition,
  lookAt,
  view,
  fov, // Receive fov as a prop
  gridSize = 4,
  spacing = 15.5,
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
      camera={{ position: cameraPosition, fov: fov }} // Set initial FOV
      className="w-full h-full"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <Suspense fallback={null}>
        <Environment files="Meadows.hdr" background />
      </Suspense>

      {/* Hemisphere Light for ambient sky and ground lighting */}
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#444444"
        intensity={0.0001}
      />

      {/* Enhanced Directional Lights */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <directionalLight
        position={[-10, 15, -10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Ambient Light for subtle illumination */}
      <ambientLight intensity={0.0003} />

      {/* Green Field */}
      {fieldPositions.map((position, index) => (
        <GreenField key={index} position={position} />
      ))}
      <VanModel
        products={products}
        cameraPosition={cameraPosition}
        view={view}
      />

      {/* Camera Updater with FOV */}
      <CameraUpdater
        cameraPosition={cameraPosition}
        cameraLookAt={lookAt}
        fov={fov} // Pass FOV to CameraUpdater
      />
    </Canvas>
  );
};

export default Scene;
