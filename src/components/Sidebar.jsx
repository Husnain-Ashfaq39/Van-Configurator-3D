import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Heart, Plus } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Solar Panel',
    price: 300,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: 'Solar panel',
    isFavorite: false
  },
  {
    id: 2,
    name: 'Cabinet Drawer',
    price: 200,
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: 'Storage drawer',
    isFavorite: false
  },
  {
    id: 3,
    name: 'Sliding Drawer',
    price: 150,
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: 'Sliding drawer',
    isFavorite: false
  },
  {
    id: 4,
    name: 'Washroom',
    price: 400,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: 'Compact unit',
    isFavorite: false
  }
];

const Sidebar = ({
  isOpen,
  toggleSidebar,
  toggleBed,
  showBed,
  toggleSolarPanel,
  showSolarPanel,
  toggleCabinetDrawer,
  showCabinetDrawer,
  toggleSlidingDrawer,
  showSlidingDrawer,
  toggleWashroom,
  showWashroom
}) => {
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
            className="w-[300px] bg-white  overflow-auto border-r border-gray-200 h-full p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-gray-900">Van Configurator</h2>
              <Menu 
                className="cursor-pointer text-gray-500 hover:text-gray-700" 
                onClick={toggleSidebar}
              />
            </div>

            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-1.5 px-2 text-xs border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${showFavorites ? 'text-red-500' : 'text-gray-400'}`}
                onClick={() => setShowFavorites(!showFavorites)}
              >
                <Heart className="text-sm" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {filteredProducts.map(product => (
                <div key={product.id} className="relative group">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-lg bg-gray-100">
                    <img
                       src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Hover overlay with + button */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <button
                        onClick={() => {
                          switch (product.name) {
                            case 'Solar Panel':
                              toggleSolarPanel();
                              break;
                            case 'Cabinet Drawer':
                              toggleCabinetDrawer();
                              break;
                            case 'Sliding Drawer':
                              toggleSlidingDrawer();
                              break;
                            case 'Washroom':
                              toggleWashroom();
                              break;
                            default:
                              break;
                          }
                        }}
                        className="w-12 h-12 rounded-full bg-white shadow-lg transform transition-transform duration-300 hover:scale-110 flex items-center justify-center group/button"
                      >
                        <Plus className="w-6 h-6 text-gray-800 transition-colors group-hover/button:text-[#f5c34b]" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <h3 className="text-xs font-bold text-gray-900 uppercase truncate">{product.name}</h3>
                    <p className="text-xs text-gray-600 truncate">{product.description}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-bold">${product.price}</span>
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-0.25 rounded-full hover:bg-gray-100 transition-colors ${product.isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                      >
                        <Heart className="text-[10px]" />
                      </button>
                    </div>
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