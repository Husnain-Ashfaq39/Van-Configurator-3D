import { motion } from 'framer-motion';
import { FiEye } from 'react-icons/fi';

const CameraButtons = ({ setCameraPosition, setCameraLookAt, setView, setHideOrbitControls }) => (
  <motion.div 
    className="absolute bottom-10 left-10 z-10 flex flex-wrap gap-2"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
  >
    {[
      { name: 'Top View', position: [0, 8, 0], lookAt: [0, 0, 0], view: 'top' },
      { name: 'Back View', position: [0, 2, -6], lookAt: [0, 0, 0], view: 'back' },
      { name: 'Side View', position: [-6, 2, 0], lookAt: [0, 0, 0], view: 'side' },
      { name: 'Roof 2 View', position: [0, 6, 3], lookAt: [0, 0, 0], view: 'roof2' },
      { name: 'Default View', position: [5, 2, 5], lookAt: [0, 0, 0], view: 'default' },
    ].map((button) => (
      <motion.button
        key={button.name}
        className="px-4 py-2 bg-white text-gray-800 rounded-full shadow-md hover:bg-gray-100 transition-colors flex items-center"
        onClick={() => {
          setCameraPosition(button.position);
          setCameraLookAt(button.lookAt);
          setView(button.view);
          setHideOrbitControls(button.view !== 'default');
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiEye className="mr-2" />
        {button.name}
      </motion.button>
    ))}
  </motion.div>
);

export default CameraButtons;

