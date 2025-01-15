// App.jsx
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Scene from './components/Scene'; // New Scene component
import Sidebar from './components/Sidebar'; // Import the new Sidebar component
import ViewSelector from './components/ViewSelector';

const App = () => {
  const [cameraPosition, setCameraPosition] = useState([5, 2, 5]);
  const [lookAt, setLookAt] = useState([0, 0, 0]);
  const [view, setView] = useState('default');
  const [showBed, setShowBed] = useState(false);
  const [showSolarPanel, setShowSolarPanel] = useState(false);
  const [showCabinetDrawer, setShowCabinetDrawer] = useState(false);
  const [showSlidingDrawer, setShowSlidingDrawer] = useState(false);
  const [showWashroom, setShowWashroom] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Lifted state for ViewSelector
  const [isViewSelectorOpen, setIsViewSelectorOpen] = useState(false);



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

      <div
        className={`flex-grow relative transition-all duration-300 ${
          isSidebarOpen ? 'ml-72' : 'ml-0'
        }`}
      >
        {/* Toggle Sidebar Button */}
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <FiMenu />
          </button>
        )}

        {/* Scene Container */}
        <div
          className={`w-full h-full transition-all duration-300 ${
            isSidebarOpen || isViewSelectorOpen
              ? 'p-4' // Reduce padding or apply other styles when Sidebar or ViewSelector is open
              : 'p-0' // Expand when both are closed
          }`}
        >
          <Scene
           
            showBed={showBed}
            showSolarPanel={showSolarPanel}
            showCabinetDrawer={showCabinetDrawer}
            showSlidingDrawer={showSlidingDrawer}
            showWashroom={showWashroom}
            cameraPosition={cameraPosition}
            lookAt={lookAt}
            view={view}
           
          />
        </div>

        {/* View Selector */}
        <ViewSelector
          setCameraPosition={setCameraPosition}
          setLookAt={setLookAt}
          setView={setView}
         
          isOpen={isViewSelectorOpen}
          setIsOpen={setIsViewSelectorOpen}
        />
      </div>
    </div>
  );
};

export default App;
