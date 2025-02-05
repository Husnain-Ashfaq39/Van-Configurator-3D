// App.jsx
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
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

  // Retrieve the products from the global product store.
  const products = useProductStore((state) => state.products);

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Navbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} isSidebarOpen={isSidebarOpen} />
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

          {/* View Selector */}
          <ViewSelector
            setCameraPosition={setCameraPosition}
            setLookAt={setLookAt}
            setView={setView}
            setFov={setFov}
            isOpen={isViewSelectorOpen}
            setIsOpen={setIsViewSelectorOpen}
          />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default App;
