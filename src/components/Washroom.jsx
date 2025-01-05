import React, { useState } from 'react';
import WashroomInstance from './instances/WashroomInstance'; // Create a separate instance component
import { v4 as uuidv4 } from 'uuid';

const Washroom = ({ view }) => {
  const [washrooms, setWashrooms] = useState([{ id: uuidv4(), position: [0, -0.8, 0] }]);

  const handleCopy = (id, currentPosition) => {
    setWashrooms((prevWashrooms) => {
      const washroomToCopy = prevWashrooms.find((wash) => wash.id === id);
      if (!washroomToCopy) return prevWashrooms;

      const newPosition = [currentPosition[0] + 1, currentPosition[1], currentPosition[2]];
      return [...prevWashrooms, { id: uuidv4(), position: newPosition }];
    });
  };

  return (
    <>
      {washrooms.map((washroom) => (
        <WashroomInstance
          key={washroom.id}
          id={washroom.id}
          initialPosition={washroom.position}
          view={view}
          onCopy={handleCopy}
        />
      ))}
    </>
  );
};

export default Washroom;
