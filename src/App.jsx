// App.jsx
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Scene from './components/Scene';
import Sidebar from './components/Sidebar'; 
import ViewSelector from './components/ViewSelector';

const App = () => {
  const [cameraPosition, setCameraPosition] = useState([5, 2, 5]);
  const [lookAt, setLookAt] = useState([0, 0, 0]);
  const [view, setView] = useState('default');
  
  // Initialize products in state with an added 'visible' property
  const [products, setProducts] = useState([
    {
      id: 'solar_panel',
      name: 'Solar Panel',
      price: 300,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'Solar panel',
      isFavorite: false,
      visible: false
    },
    {
      id: 'cabinet_drawer',
      name: 'Cabinet Drawer',
      price: 200,
      image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'Storage drawer',
      isFavorite: false,
      visible: false
    },
    {
      id: 'sliding_drawer',
      name: 'Sliding Drawer',
      price: 150,
      image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'Sliding drawer',
      isFavorite: false,
      visible: false
    },
    {
      id: 'washroom',
      name: 'Washroom',
      price: 400,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'Compact unit',
      isFavorite: false,
      visible: false
    },
    {
      id: 'full_bed',
      name: 'Full Bed',
      price: 500,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'Comfortable full-size bed',
      isFavorite: false,
      visible: false
    },
    {
      id: 'simple_bed',
      name: 'Simple Bed',
      price: 250,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'A simple and comfortable bed',
      isFavorite: false,
      visible: false
    },
    {
      id: 'bunk',
      name: 'Bunk',
      price: 350,
      image: 'https://example.com/bunk-image.jpg', // Replace with actual image URL
      description: 'A comfortable bunk bed',
      isFavorite: false,
      visible: false
    },
    {
      id: 'double_table',
      name: 'Double Table',
      price: 250,
      image: 'https://example.com/double-table-image.jpg', // Replace with actual image URL
      description: 'A versatile double table',
      isFavorite: false,
      visible: false
    }
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Lifted state for ViewSelector
  const [isViewSelectorOpen, setIsViewSelectorOpen] = useState(false);

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
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        products={products}
        toggleProductVisibility={toggleProductVisibility}
        toggleFavorite={toggleFavorite}
      />

      <div
        className={`flex-grow relative transition-all duration-300 ${
          isSidebarOpen ? 'ml-72' : 'ml-0'
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
          className={`w-full h-full transition-all duration-300 ${
            isSidebarOpen || isViewSelectorOpen
              ? 'p-4' // Reduce padding or apply other styles when Sidebar or ViewSelector is open
              : 'p-0' // Expand when both are closed
          }`}
        >
          <Scene
            products={products.filter(product => product.visible)}
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
