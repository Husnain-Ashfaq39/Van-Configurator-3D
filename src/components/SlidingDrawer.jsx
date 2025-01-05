import React, { useState } from 'react';
import SlidingDrawerInstance from './instances/SlidingDrawerInstance'; // Create a separate instance component
import { v4 as uuidv4 } from 'uuid';

const SlidingDrawer = ({ view }) => {
  const [slidingDrawers, setSlidingDrawers] = useState([{ id: uuidv4(), position: [0, -0.8, 0] }]);

  const handleCopy = (id, currentPosition) => {
    setSlidingDrawers((prevDrawers) => {
      const drawerToCopy = prevDrawers.find((drawer) => drawer.id === id);
      if (!drawerToCopy) return prevDrawers;

      const newPosition = [currentPosition[0] + 1, currentPosition[1], currentPosition[2]];
      return [...prevDrawers, { id: uuidv4(), position: newPosition }];
    });
  };

  return (
    <>
      {slidingDrawers.map((drawer) => (
        <SlidingDrawerInstance
          key={drawer.id}
          id={drawer.id}
          initialPosition={drawer.position}
          view={view}
          onCopy={handleCopy}
        />
      ))}
    </>
  );
};

export default SlidingDrawer;
