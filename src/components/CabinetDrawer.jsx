// src/components/CabinetDrawer.jsx
import React, { useState } from 'react';
import CabinetInstance from './instances/CabinetInstance';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique IDs

const CabinetDrawer = ({ view }) => {
  // Initialize cabinets with a unique ID
  const [cabinets, setCabinets] = useState([
    { id: uuidv4(), position: [0, -0.8, 0] }
  ]);

  // Function to handle copying a cabinet
  const handleCopy = (id, currentPosition) => {
    setCabinets((prevCabinets) => {
      const cabinetToCopy = prevCabinets.find((cab) => cab.id === id);
      if (!cabinetToCopy) return prevCabinets;

      // Determine the new position (e.g., offset by 1 unit on the X-axis)
      const newPosition = [
        currentPosition[0] + 1, // Adjust as needed
        currentPosition[1],
        currentPosition[2]
      ];

      // Create a new cabinet with a unique ID
      const newCabinet = {
        id: uuidv4(), // Use UUID for better uniqueness
        position: newPosition
      };

      return [...prevCabinets, newCabinet];
    });
  };

  // Function to handle removing a cabinet
  const handleRemove = (id) => {
    setCabinets((prevCabinets) => prevCabinets.filter((cab) => cab.id !== id));
  };

  return (
    <>
      {cabinets.map((cabinet) => (
        <CabinetInstance
          key={cabinet.id}
          id={cabinet.id}
          initialPosition={cabinet.position}
          view={view}
          onCopy={handleCopy}
          onRemove={handleRemove}
        />
      ))}
    </>
  );
};

export default CabinetDrawer;
