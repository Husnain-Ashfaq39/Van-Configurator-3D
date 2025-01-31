// ViewSelector.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Video, X, ZoomIn, ZoomOut} from 'lucide-react';

const ViewSelector = ({
  setCameraPosition,
  setLookAt,
  setView,
  isOpen,
  setIsOpen
}) => {


  const views = [
    {
      name: 'Default View',
      position: [5, 2, 5],
      lookAt: [0, 0, 0],
      view: 'default',
      thumbnail: '/Views/default.png',
      defaultZoom: 1
    },
    {
      name: 'Top View',
      position: [0, 5.5, 0],
      lookAt: [0, 0, 0],
      view: 'top',
      thumbnail: '/Views/Top.png',
      defaultZoom: 1
    },
    {
      name: 'Back View',
      position: [0, 0.5, -5],
      lookAt: [0, 0, 0],
      view: 'back',
      thumbnail: '/Views/Back.png',
      defaultZoom: 1
    },
    {
      name: 'Ceiling View',
      position: [0, -1, -4],
      lookAt: [0, 2.7, 1],
      view: 'back',
      thumbnail: '/Views/Back.png',
      defaultZoom: 1
    },
    {
      name: 'Side View ',
      position: [-5, 0.3, 0],
      lookAt: [0, 0, 0],
      view: 'side',
      thumbnail: '/Views/side.png',
      defaultZoom: 1
    },
    {
      name: 'Side View Zoomed',
      position: [-3, 0.3, -1],
      lookAt: [100, 0, 0],
      view: 'side',
      thumbnail: '/Views/side.png',
      defaultZoom: 1
    },
    {
      name: 'Roof View',
      position: [0, 6, 3],
      lookAt: [0, 0, 0],
      view: 'roof2',
      thumbnail: '/Views/Roof.png',
      defaultZoom: 1
    },
    {
      name: 'Inner Zoomed View',
      position: [0, 0, 0.51], 
      lookAt: [0, 0, 0], 
      view: 'innerZoom',
      thumbnail: '/Views/InnerZoom.png',
      defaultZoom: 1
    },
    {
      name: 'Corner View',
      position: [6, 5, 2],
      lookAt: [1, 1, 0],
      view: 'corner',
      thumbnail: '/Views/Corner.png',
      defaultZoom: 0.5
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [baseCameraPosition, setBaseCameraPosition] = useState(views[0].position);
  const [baseLookAt, setBaseLookAt] = useState(views[0].lookAt);

  const minZoomLevel = 0.5;
  const maxZoomLevel = 2;

  

  const handleViewChange = (viewData) => {
    setBaseCameraPosition(viewData.position);
    setBaseLookAt(viewData.lookAt);
    setLookAt(viewData.lookAt);
    setView(viewData.view);
    setZoomLevel(viewData.defaultZoom); // Reset zoom level to default when view changes
    setIsOpen(false); // Close the ViewSelector after selecting a view
  };

  const navigateSlider = (direction) => {
    if (direction === 'next') {
      setCurrentIndex(prev => (prev + 1) % views.length);
    } else {
      setCurrentIndex(prev => (prev - 1 + views.length) % views.length);
    }
  };

  // Update camera position based on zoom level
  useEffect(() => {
    const direction = [
      baseCameraPosition[0] - baseLookAt[0],
      baseCameraPosition[1] - baseLookAt[1],
      baseCameraPosition[2] - baseLookAt[2],
    ];

    const distance = Math.sqrt(direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2);

    if (distance === 0) {
      setCameraPosition(baseCameraPosition);
      return;
    }

    const normalized = direction.map(d => d / distance);

    const newCameraPosition = [
      baseLookAt[0] + normalized[0] * distance * zoomLevel,
      baseLookAt[1] + normalized[1] * distance * zoomLevel,
      baseLookAt[2] + normalized[2] * distance * zoomLevel,
    ];

    setCameraPosition(newCameraPosition);
  }, [baseCameraPosition, baseLookAt, zoomLevel, setCameraPosition]);

  const zoomIn = () => {
    setZoomLevel(prev => Math.max(prev * 0.9, minZoomLevel));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.min(prev * 1.1, maxZoomLevel));
  };

  // Determine the currently visible views in the slider
  const visibleViews = [...views.slice(currentIndex), ...views.slice(0, currentIndex)].slice(0, 5);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="view-selector"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="max-w-6xl mx-auto p-4">
              <div className="flex items-center justify-between gap-4">
                <button 
                  onClick={() => navigateSlider('prev')}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex-1 flex justify-center gap-4 overflow-x-auto">
                  {visibleViews.map((viewData, index) => (
                    <motion.div
                      key={viewData.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group flex-shrink-0"
                      style={{ width: '192px', flexBasis: '192px' }} // Adjust width as needed
                    >
                      <button
                        onClick={() => handleViewChange(viewData)}
                        className="focus:outline-none"
                      >
                        <div className="relative w-full h-32 overflow-hidden rounded-lg border-2 border-transparent hover:border-blue-500 transition-all">
                          <img
                            src={viewData.thumbnail}
                            alt={viewData.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                            <p className="text-white text-sm font-medium">
                              {viewData.name}
                            </p>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>

                <button 
                  onClick={() => navigateSlider('next')}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex justify-center mt-4 gap-2">
                <button 
                  onClick={zoomIn}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-6 h-6" />
                </button>
                <button 
                  onClick={zoomOut}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change View Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-[#F5C34B] rounded-full shadow-md hover:bg-white transition-colors flex items-center gap-2 text-sm font-medium"
      >
        {isOpen ? <X className="w-4 h-4" /> : <Video className="w-4 h-4" />}
        {isOpen ? '' : 'Change view'}
      </button>
    </div>
  );
};

export default ViewSelector;
