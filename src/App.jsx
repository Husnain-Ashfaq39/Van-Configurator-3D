// App.jsx
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { motion, animate } from 'framer-motion';
import Scene from './components/Scene';
import Sidebar from './components/Sidebar';
import ViewSelector from './components/ViewSelector';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import {useProductStore} from './store/productStore';

const App = () => {
  const [cameraPosition, setCameraPosition] = useState([5, 2, 5]);
  const [lookAt, setLookAt] = useState([0, 0, 0]);
  const [view, setView] = useState('default');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isViewSelectorOpen, setIsViewSelectorOpen] = useState(false);
  const [fov, setFov] = useState(50); // Default FOV
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZooming, setIsZooming] = useState(false);

  const minZoomLevel = 0.2;
  const maxZoomLevel = 4;

  const setCameraConfig = (config) => {
    setCameraPosition(config.cameraPosition);
    setLookAt(config.lookAt);
    setView(config.view);
    setFov(config.fov);
  };

  const handleZoom = (direction) => {
    if (isZooming) return;
    setIsZooming(true);
    
    const targetZoom = direction === 'in' 
      ? Math.max(zoomLevel * 0.9, minZoomLevel)
      : Math.min(zoomLevel * 1.1, maxZoomLevel);

    animate(zoomLevel, targetZoom, {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (latest) => setZoomLevel(latest),
      onComplete: () => setIsZooming(false)
    });
  };

  // Retrieve the products from the global product store.
  const products = useProductStore((state) => state.products);

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Navbar 
          toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} 
          isSidebarOpen={isSidebarOpen}
          cameraConfig={{ cameraPosition, lookAt, view, fov }}
          setCameraConfig={setCameraConfig}
        />
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`flex-grow relative transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
          {/* Toggle Sidebar Button */}
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="absolute top-4 left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <FiMenu />
            </button>
          )}

          {/* Scene Container */}
          <div className={`w-full h-full transition-all duration-300 ${isSidebarOpen || isViewSelectorOpen ? 'p-4' : 'p-0'}`}>
            <Scene
              products={products.filter(product => product.visible)}
              cameraPosition={cameraPosition}
              lookAt={lookAt}
              view={view}
              fov={fov}
            />
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-20 right-4 flex flex-col gap-2 z-20">
            <motion.button 
              onClick={() => handleZoom('in')}
              disabled={isZooming}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-1.5 bg-white rounded-full shadow-md transition-opacity ${
                isZooming ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </motion.button>
            <motion.button 
              onClick={() => handleZoom('out')}
              disabled={isZooming}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-1.5 bg-white rounded-full shadow-md transition-opacity ${
                isZooming ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </motion.button>
          </div>

          {/* View Selector */}
          <ViewSelector
            setCameraPosition={setCameraPosition}
            setLookAt={setLookAt}
            setView={setView}
            setFov={setFov}
            isOpen={isViewSelectorOpen}
            setIsOpen={setIsViewSelectorOpen}
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
          />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default App;
