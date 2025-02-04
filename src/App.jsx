// App.jsx
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Scene from './components/Scene';
import Sidebar from './components/Sidebar';
import ViewSelector from './components/ViewSelector';
import { productConfig } from './data/productConfig';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [cameraPosition, setCameraPosition] = useState([5, 2, 5]);
  const [lookAt, setLookAt] = useState([0, 0, 0]);
  const [view, setView] = useState('default');

  // Initialize products in state using productConfig
  const [products, setProducts] = useState(
    Object.entries(productConfig).map(([id, config]) => ({
      id,
      ...config,
      visible: false // Add visible property
    }))
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Lifted state for ViewSelector
  const [isViewSelectorOpen, setIsViewSelectorOpen] = useState(false);

  // Add fov state
  const [fov, setFov] = useState(50); // Default FOV

  const [vanProducts, setVanProducts] = useState([]);

  // Calculate total price
  const totalPrice = vanProducts.reduce((total, product) => total + product.price, 0);

  // Function to add product to van
  const addProductToVan = (product) => {
    setVanProducts((prevVanProducts) => [...prevVanProducts, product]);
  };

  // Toggle visibility of a product by id
  const toggleProductVisibility = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map(product =>
        product.id === id ? { ...product, visible: !product.visible } : product
      )
    );
  };

  // Toggle favorite status for a product by id
  const toggleFavorite = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map(product =>
        product.id === id ? { ...product, isFavorite: !product.isFavorite } : product
      )
    );
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Navbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} 
        isSidebarOpen={isSidebarOpen}
        total={totalPrice} />

        <Sidebar
          isOpen={isSidebarOpen}
          products={products}
          toggleProductVisibility={toggleProductVisibility}
          toggleFavorite={toggleFavorite}
          addProductToVan={addProductToVan}
        />

        <div
          className={`flex-grow relative transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'
            }`}
        >
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
          <div
            className={`w-full h-full transition-all duration-300 ${isSidebarOpen || isViewSelectorOpen
                ? 'p-4' // Adjust padding when Sidebar or ViewSelector is open
                : 'p-0' // Expand when both are closed
              }`}
          >
            <Scene
              products={products.filter(product => product.visible)}
              cameraPosition={cameraPosition}
              lookAt={lookAt}
              view={view}
              fov={fov} // Pass fov to Scene
            />
          </div>

          {/* View Selector */}
          <ViewSelector
            setCameraPosition={setCameraPosition}
            setLookAt={setLookAt}
            setView={setView}
            setFov={setFov} // Pass setFov to ViewSelector
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
