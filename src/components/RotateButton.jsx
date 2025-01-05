// components/RotateButton.jsx
import { FiRotateCcw } from 'react-icons/fi'; // Import the rotate icon
import { Html } from '@react-three/drei';
import React, { useRef } from 'react';
import { ShoppingBag, RotateCw, Replace, Grid, Copy, Trash } from 'lucide-react';
import useClickOutside from '../hooks/useClickOutside'; // Import the custom hook

const RotateButton = ({ position, onRotate, onCopy, onRemove, onClose }) => { // Added onRemove
  const buttonRef = useRef(null); // Create a ref for the button

  useClickOutside(buttonRef, onClose); // Use the custom hook

  const tools = [
    { icon: ShoppingBag, label: 'Add' },
    { icon: RotateCw, label: 'Rotate', onClick: onRotate },
    { icon: Replace, label: 'Replace' },
    { icon: Grid, label: 'Goes with' },
    { icon: Copy, label: 'Make copy', onClick: onCopy }, // Assigned onCopy
    { icon: Trash, label: 'Remove', onClick: onRemove } // Assigned onRemove
  ];
  
  return (
    <Html position={[position[0], position[1] + 0.1, position[2]]} center>
      <div ref={buttonRef} className="bg-zinc-900 rounded-full px-4 py-1 inline-flex items-center gap-3">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
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
