import React, { useState } from 'react';
import BunkInstance from '../instances/BunkInstance'; // Create a separate instance component
import { v4 as uuidv4 } from 'uuid';

export default function Bunk ({ view }) {
  const [bunks, setBunks] = useState([{ id: uuidv4(), position: [0, -0.8, 0] }]);

  const handleCopy = (id, currentPosition) => {
    setBunks((prevBunks) => {
      const bunkToCopy = prevBunks.find((bunk) => bunk.id === id);
      if (!bunkToCopy) return prevBunks;

      const newPosition = [currentPosition[0] + 1, currentPosition[1], currentPosition[2]];
      return [...prevBunks, { id: uuidv4(), position: newPosition }];
    });
  };

  const handleRemove = (id) => {
    setBunks((prevBunks) => prevBunks.filter((bunk) => bunk.id !== id));
  };

  return (
    <>
      {bunks.map((bunk) => (
        <BunkInstance
          key={bunk.id}
          id={bunk.id}
          initialPosition={bunk.position}
          view={view}
          onCopy={handleCopy}
          onRemove={handleRemove}
        />
      ))}
    </>
  );
};
