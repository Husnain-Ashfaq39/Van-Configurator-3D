// App.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import CameraButtons from './components/CameraButtons';
import Scene from './components/Scene'; // New Scene component
import Sidebar from './components/Sidebar'; // Import the new Sidebar component

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
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        toggleBed={toggleBed}
        showBed={showBed}
        toggleSolarPanel={toggleSolarPanel}
        showSolarPanel={showSolarPanel}
        toggleCabinetDrawer={toggleCabinetDrawer}
        showCabinetDrawer={showCabinetDrawer}
        toggleSlidingDrawer={toggleSlidingDrawer}
        showSlidingDrawer={showSlidingDrawer}
        toggleWashroom={toggleWashroom}
        showWashroom={showWashroom}
      />

      <div className="flex-grow relative">
        {!isSidebarOpen  && <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
           <FiMenu />
        </button>}

        <Scene
          hiddenParts={hiddenParts}
          isRoof2={view === 'roof2'}
          showBed={showBed}
          showSolarPanel={showSolarPanel}
          showCabinetDrawer={showCabinetDrawer}
          showSlidingDrawer={showSlidingDrawer}
          showWashroom={showWashroom}
          cameraPosition={cameraPosition}
          view={view}
          hideOrbitControls={hideOrbitControls}
        />

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
