import React, { useState } from 'react';
import SimpleBedInstance from '../instances/SimpleBedInstance'; // Use the SimpleBedInstance component
import { v4 as uuidv4 } from 'uuid';

const SingleBed = ({ view }) => {
  const [singleBeds, setSingleBeds] = useState([{ id: uuidv4(), position: [0, -0.5, 0] }]);

  const handleCopy = (id, currentPosition) => {
    setSingleBeds((prevBeds) => {
      const bedToCopy = prevBeds.find((bed) => bed.id === id);
      if (!bedToCopy) return prevBeds;

      const newPosition = [currentPosition[0] + 1, currentPosition[1], currentPosition[2]];
      return [...prevBeds, { id: uuidv4(), position: newPosition }];
    });
  };

  const handleRemove = (id) => {
    setSingleBeds((prevBeds) => prevBeds.filter((bed) => bed.id !== id));
  };

  return (
    <>
      {singleBeds.map((bed) => (
        <SimpleBedInstance
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

export default SingleBed; 