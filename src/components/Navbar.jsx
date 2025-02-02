import React, { useState } from 'react';
import { ChevronLeft, Camera, Save, ShoppingCart, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ total = 1560.97, toggleSidebar, isSidebarOpen }) => {
    const [title, setTitle] = useState('Untitled Design');
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className={`w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 fixed top-0 left-0 z-20 transition-all duration-300 `}>
            {/* Left section */}
            <div className="flex items-center gap-6">
                <img
                    src="/Logo/logo.svg"
                    alt="IKEA"
                    className="h-8 w-auto"
                />
                <motion.div 
                    className="flex items-center gap-2"
                    animate={{ 
                        paddingLeft: isSidebarOpen ? '10rem' : '1rem' 
                    }}
                    transition={{ 
                        type: "spring",
                        stiffness: 100, // Reduced from 300
                        damping: 20,   // Reduced from 30
                        duration: 0.8  // Added duration
                    }}
                >
                    <motion.button 
                        onClick={toggleSidebar} 
                        className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#F5C34B] border-2 border-gray-100"
                        animate={{ 
                            rotate: isSidebarOpen ? 0 : 180 
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 100, // Reduced from 300
                            damping: 20,    // Reduced from 30
                            duration: 0.8   // Added duration
                        }}
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-700" />
                    </motion.button>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={() => setIsEditing(true)}
                        onBlur={() => setIsEditing(false)}
                        className={`text-gray-900 font-medium bg-transparent border-b ${isEditing ? 'border-gray-400' : 'border-transparent'} focus:outline-none transition-colors duration-300`}
                    />
                </motion.div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <Camera className="h-5 w-5 text-gray-700" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <Save className="h-5 w-5 text-gray-700" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <ShoppingCart className="h-5 w-5 text-gray-700" />
                </button>

                {/* Price tag */}
                <div className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="text-sm">$</span>
                    <span className="font-medium">{total.toString().split('.')[0]}</span>
                    <span className="text-sm">.{total.toString().split('.')[1]}</span>
                </div>

                <button className="p-2 rounded-full hover:bg-gray-100">
                    <X className="h-5 w-5 text-gray-700" />
                </button>
            </div>
        </div>
    );
};

export default Navbar;