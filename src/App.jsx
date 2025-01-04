import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiEye, FiSun } from 'react-icons/fi';
import { RiArchiveDrawerLine } from "react-icons/ri";
import { IoBedSharp } from "react-icons/io5";
import VanModel from './components/VanModel';
import CameraButtons from './components/CameraButtons';
import CameraUpdater from './components/CameraUpdater';
import Washroom from './components/Washroom';

const App = () => {
  const [cameraPosition, setCameraPosition] = useState([5, 2, 5]);
  const [cameraLookAt, setCameraLookAt] = useState([0, 0, 0]);
  const [view, setView] = useState('default');
  const [hideOrbitControls, setHideOrbitControls] = useState(false);
  const [showBed, setShowBed] = useState(false);
  const [showSolarPanel, setShowSolarPanel] = useState(false);
  const [showCabinetDrawer, setShowCabinetDrawer] = useState(false);
  const [showSlidingDrawer, setShowSlidingDrawer] = useState(false);
  const [showWashroom, setShowWashroom] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const hiddenParts = [
    'Carrosserie_Carrosserie_0068',
    'Carrosserie_Carrosserie_0049',
    'Interieur_Interrieur_0006',
    'Carrosserie_Carrosserie_0202',
    'Carrosserie_Carrosserie_0277',
    'Interieur_Interrieur_0184',
    'Carrosserie_Carrosserie_0001',
    'Interieur_Interrieur_0161',
    'solar_panel',
  ];

  const toggleBed = () => setShowBed(prev => !prev);
  const toggleSolarPanel = () => setShowSolarPanel(prev => !prev);
  const toggleCabinetDrawer = () => setShowCabinetDrawer(prev => !prev);
  const toggleSlidingDrawer = () => setShowSlidingDrawer(prev => !prev);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleWashroom = () => setShowWashroom(prev => !prev);

  return (
    <div className="flex h-screen bg-gray-100">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-72 bg-white shadow-lg p-6 overflow-auto"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Van Configurator</h2>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={toggleBed}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                    showBed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <span className="flex items-center">
                    <IoBedSharp className="mr-2" />
                    Bed
                  </span>
                  <FiEye className={showBed ? 'text-white' : 'text-gray-500'} />
                </button>
              </li>
              <li>
                <button
                  onClick={toggleSolarPanel}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                    showSolarPanel ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <span className="flex items-center">
                    <FiSun className="mr-2" />
                    Solar Panel
                  </span>
                  <FiEye className={showSolarPanel ? 'text-white' : 'text-gray-500'} />
                </button>
              </li>
              <li>
                <button
                  onClick={toggleCabinetDrawer}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                    showCabinetDrawer ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <span className="flex items-center">
                    <RiArchiveDrawerLine className='mr-2'/>
                    Cabinet Drawer
                  </span>
                  <FiEye className={showCabinetDrawer ? 'text-white' : 'text-gray-500'} />
                </button>
              </li>
              <li>
                <button
                  onClick={toggleSlidingDrawer}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                    showSlidingDrawer ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <span className="flex items-center">
                    <RiArchiveDrawerLine className='mr-2'/>
                    Sliding Drawer
                  </span>
                  <FiEye className={showSlidingDrawer ? 'text-white' : 'text-gray-500'} />
                </button>
              </li>
              <li>
                <button
                  onClick={toggleWashroom}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                    showWashroom ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <span className="flex items-center">
                    <RiArchiveDrawerLine className='mr-2'/>
                    Washroom
                  </span>
                  <FiEye className={showWashroom ? 'text-white' : 'text-gray-500'} />
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow relative">
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>

        <Canvas
          shadows
          gl={{ powerPreference: 'high-performance', antialias: true }}
          camera={{ position: cameraPosition, fov: 50 }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-5, 5, 5]} intensity={0.7} castShadow />
          <directionalLight position={[0, 5, -5]} intensity={0.5} castShadow />

          <Suspense fallback={null}>
            <VanModel 
              hiddenParts={hiddenParts} 
              isRoof2={view === 'roof2'} 
              showBed={showBed} 
              showSolarPanel={showSolarPanel} 
              showCabinetDrawer={showCabinetDrawer}
              showSlidingDrawer={showSlidingDrawer}
              showWashroom={showWashroom}
              cameraPosition={cameraPosition}
              view={view}
            />
          </Suspense>

          <CameraUpdater cameraPosition={cameraPosition} cameraLookAt={cameraLookAt} />
          {!hideOrbitControls && <OrbitControls enableZoom={true} />}
        </Canvas>

        <CameraButtons
          setCameraPosition={setCameraPosition}
          setCameraLookAt={setCameraLookAt}
          setView={setView}
          setHideOrbitControls={setHideOrbitControls}
        />
      </div>
    </div>
  );
};

export default App;

