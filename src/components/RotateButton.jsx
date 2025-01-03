// components/RotateButton.jsx
import { FiRotateCcw } from 'react-icons/fi'; // Import the rotate icon
import { Html } from '@react-three/drei';

const RotateButton = ({ position, onRotate, onClose }) => {
  return (
    <Html position={[position[0], position[1] + 0.1, position[2]]} center>
      <div
        className="p-1 bg-gray-100 rounded-full shadow cursor-pointer hover:bg-gray-200 transition-colors"
        onClick={() => {
          onRotate();
          onClose(); // Close the menu after rotating
        }}
      >
        <FiRotateCcw size={18} className="text-gray-800" />
      </div>
    </Html>
  );
};

export default RotateButton;
