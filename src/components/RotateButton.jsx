// components/RotateButton.jsx
import { FiRotateCcw } from 'react-icons/fi'; // Import the rotate icon
import { Html } from '@react-three/drei';
import React, { useRef, useState } from 'react';
import { ShoppingBag, RotateCw, Replace, Grid, Copy, Trash } from 'lucide-react';
import useClickOutside from '../hooks/useClickOutside'; // Import the custom hook
import DiscreteSlider from './DiscreteSlider'; // Import the DiscreteSlider component

const RotateButton = ({ position, onRotate, onCopy, onRemove, onClose }) => { // Added onRemove
  const buttonRef = useRef(null); // Create a ref for the button
  const [isRotateHovered, setIsRotateHovered] = useState(false); // State to track hover on Rotate button
  const [sliderVisible, setSliderVisible] = useState(false); // State to control slider visibility
  const timeoutRef = useRef(null); // Ref to store the timeout ID

  useClickOutside(buttonRef, onClose); // Use the custom hook

  const tools = [
    { icon: ShoppingBag, label: 'Add' },
    { 
      icon: RotateCw, 
      label: 'Rotate', 
      onClick: onRotate,
      isRotate: true // Flag to identify the Rotate tool
    },
    { icon: Replace, label: 'Replace' },
    { icon: Grid, label: 'Goes with' },
    { icon: Copy, label: 'Make copy', onClick: onCopy }, // Assigned onCopy
    { icon: Trash, label: 'Remove', onClick: onRemove } // Assigned onRemove
  ];
  
  const handleMouseEnter = () => {
    setIsRotateHovered(true);
    setSliderVisible(true); // Show the slider immediately
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear any existing timeout
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsRotateHovered(false);
      setSliderVisible(false); // Hide the slider after a delay
    }, 300); // Adjust the delay as needed (300ms in this case)
  };

  return (
    <Html position={[position[0], position[1] + 0.1, position[2]]} center>
      <div ref={buttonRef} className="bg-zinc-900 rounded-full px-4 py-1 inline-flex items-center gap-3 relative">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          // Check if the current tool is the Rotate tool
          if (tool.isRotate) {
            return (
              <React.Fragment key={tool.label}>
                <div 
                  className="flex flex-col items-center gap-0.5 text-gray-300 hover:text-white transition-colors relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    aria-label={tool.label}
                    onClick={tool.onClick}
                  >
                    <Icon size={16} />
                  </button>
                  <span className="text-[10px]">{tool.label}</span>
                  {sliderVisible && isRotateHovered && (
                    <div className="absolute bottom-full mb-2">
                      <DiscreteSlider />
                    </div>
                  )}
                </div>
                {index < tools.length - 1 && (
                  <div className="w-px h-6 bg-zinc-700" />
                )}
              </React.Fragment>
            );
          }

          // For other tools
          return (
            <React.Fragment key={tool.label}>
              <button
                className="flex flex-col items-center gap-0.5 text-gray-300 hover:text-white transition-colors"
                aria-label={tool.label}
                onClick={tool.onClick}
              >
                <Icon size={16} />
                <span className="text-[10px]">{tool.label}</span>
              </button>
              {index < tools.length - 1 && (
                <div className="w-px h-6 bg-zinc-700" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </Html>
  );
};

export default RotateButton;
