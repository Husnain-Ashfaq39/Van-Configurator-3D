import React, { useState } from 'react';
import FullBedInstance from '../instances/FullBedInstance'; // Create a separate instance component
import { v4 as uuidv4 } from 'uuid';

const FullBed = ({ view }) => {
  const [fullBeds, setFullBeds] = useState([{ id: uuidv4(), position: [0, -0.2, 0] }]);

  const handleCopy = (id, currentPosition) => {
    setFullBeds((prevBeds) => {
      const bedToCopy = prevBeds.find((bed) => bed.id === id);
      if (!bedToCopy) return prevBeds;

      const newPosition = [currentPosition[0] + 1, currentPosition[1], currentPosition[2]];
      return [...prevBeds, { id: uuidv4(), position: newPosition }];
    });
  };

  const handleRemove = (id) => {
    setFullBeds((prevBeds) => prevBeds.filter((bed) => bed.id !== id));
  };

  return (
    <>
      {fullBeds.map((bed) => (
        <FullBedInstance
          key={bed.id}
          id={bed.id}
          initialPosition={bed.position}
          view={view}
          onCopy={handleCopy}
          onRemove={handleRemove}
        />
      ))}
    </>
  );
};

export default FullBed;
