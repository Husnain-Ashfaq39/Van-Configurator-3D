import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiHeart } from 'react-icons/fi';
import { RiArchiveDrawerLine } from "react-icons/ri";
import { IoBedSharp } from "react-icons/io5";
import { FiSun } from 'react-icons/fi';

const products = [
  { id: 1, name: 'Bed', price: 500, icon: <IoBedSharp />, isFavorite: false },
  { id: 2, name: 'Solar Panel', price: 300, icon: <FiSun />, isFavorite: false },
  { id: 3, name: 'Cabinet Drawer', price: 200, icon: <RiArchiveDrawerLine />, isFavorite: false },
  { id: 4, name: 'Sliding Drawer', price: 150, icon: <RiArchiveDrawerLine />, isFavorite: false },
  { id: 5, name: 'Washroom', price: 400, icon: <RiArchiveDrawerLine />, isFavorite: false },
];

const Sidebar = ({ isOpen, toggleSidebar, toggleBed, showBed, toggleSolarPanel, showSolarPanel, toggleCabinetDrawer, showCabinetDrawer, toggleSlidingDrawer, showSlidingDrawer, toggleWashroom, showWashroom }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [productList, setProductList] = useState(products);

  const filteredProducts = productList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return showFavorites ? product.isFavorite && matchesSearch : matchesSearch;
  });

  const toggleFavorite = (id) => {
    const updatedProducts = productList.map(product => 
      product.id === id ? { ...product, isFavorite: !product.isFavorite } : product
    );
    setProductList(updatedProducts);
  };

  return (
    <div className="fixed top-0 left-0 h-screen z-10">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-72 bg-white p-4 overflow-auto border-r border-gray-300 h-full"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">Van Configurator</h2>

            <div className="relative flex items-center mb-4">
              <FiMenu 
                className="absolute cursor-pointer left-2 text-gray-500 text-lg" 
                onClick={toggleSidebar}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-8 p-2 border border-gray-300 rounded focus:outline-none"
              />
              <FiHeart 
                className={`absolute right-2 text-gray-500 text-lg cursor-pointer ${showFavorites ? 'text-red-500' : ''}`} 
                onClick={() => setShowFavorites(!showFavorites)} 
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {filteredProducts.map(product => (
                <div key={product.id} className="border border-gray-300 rounded-lg p-2 bg-white shadow hover:shadow-lg transition-shadow">
                  <div className="flex justify-center items-center h-16 mb-2 text-yellow-500 text-2xl">
                    {product.icon}
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-xs text-gray-600">${product.price}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => {
                        if (product.name === 'Bed') toggleBed();
                        if (product.name === 'Solar Panel') toggleSolarPanel();
                        if (product.name === 'Cabinet Drawer') toggleCabinetDrawer();
                        if (product.name === 'Sliding Drawer') toggleSlidingDrawer();
                        if (product.name === 'Washroom') toggleWashroom();
                      }}
                      className={`w-full py-1 rounded text-xs cursor-pointer font-medium ${
                        (product.name === 'Bed' && showBed) ||
                        (product.name === 'Solar Panel' && showSolarPanel) ||
                        (product.name === 'Cabinet Drawer' && showCabinetDrawer) ||
                        (product.name === 'Sliding Drawer' && showSlidingDrawer) ||
                        (product.name === 'Washroom' && showWashroom)
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-yellow-100'
                      }`}
                    >
                      Add
                    </button>
                    <FiHeart 
                      className={`ml-2 cursor-pointer ${product.isFavorite ? 'text-red-500' : 'text-gray-500'}`} 
                      onClick={() => toggleFavorite(product.id)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;