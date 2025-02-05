import React, { useState, useEffect } from 'react';
import { ChevronLeft, Camera, Save, ShoppingCart, X } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// Extracted button component for reusability
const IconButton = ({ icon: Icon, onClick }) => (
  <button onClick={onClick} className="p-2 rounded-full hover:bg-gray-100">
    <Icon className="h-5 w-5 text-gray-700" />
  </button>
);

// Animation configurations
const springConfig = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.8
};

const PriceTag = ({ total }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => latest.toFixed(2));
  
  useEffect(() => {
    const animation = animate(count, total, {
      duration: 0.8,
      ease: "easeOut"
    });
    return animation.stop;
  }, [total]);

  return (
    <motion.div 
      className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.3 }}
      key={total}
    >
      <span className="text-sm">$</span>
      <motion.span className="font-medium">{rounded}</motion.span>
    </motion.div>
  );
};

const Navbar = ({ total = 0, toggleSidebar, isSidebarOpen }) => {
  const [title, setTitle] = useState('Untitled Design');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full  h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 fixed top-0 left-0 z-20">
      {/* Left section */}
      <div className="flex items-center gap-6">
        <img src="/Logo/logo.svg" alt="IKEA" className="h-8 w-auto" />
        <motion.div 
          className="flex items-center gap-2"
          animate={{ paddingLeft: isSidebarOpen ? '10rem' : '1rem' }}
          transition={springConfig}
        >
          <motion.button 
            onClick={toggleSidebar} 
            className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#F5C34B] border-2 border-gray-100"
            animate={{ rotate: isSidebarOpen ? 0 : 180 }}
            transition={springConfig}
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </motion.button>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            className={`text-gray-900 font-medium bg-transparent border-b ${
              isEditing ? 'border-gray-400' : 'border-transparent'
            } focus:outline-none transition-colors duration-300`}
          />
        </motion.div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <IconButton icon={Camera} />
        <IconButton icon={Save} />
        <IconButton icon={ShoppingCart} />
        <PriceTag total={total} />
        <IconButton icon={X} />
      </div>
    </div>
  );
};

export default Navbar;