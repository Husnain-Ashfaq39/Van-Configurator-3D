import React, { useState } from 'react';
import DoubleTableInstance from '../instances/DoubleTableInstance'; // Create a separate instance component
import { v4 as uuidv4 } from 'uuid';

const DoubleTable = ({ view }) => {
  const [doubleTables, setDoubleTables] = useState([{ id: uuidv4(), position: [0, -0.8, 0] }]);

  const handleCopy = (id, currentPosition) => {
    setDoubleTables((prevTables) => {
      const tableToCopy = prevTables.find((table) => table.id === id);
      if (!tableToCopy) return prevTables;

      const newPosition = [currentPosition[0] + 1, currentPosition[1], currentPosition[2]];
      return [...prevTables, { id: uuidv4(), position: newPosition }];
    });
  };

  const handleRemove = (id) => {
    setDoubleTables((prevTables) => prevTables.filter((table) => table.id !== id));
  };

  return (
    <>
      {doubleTables.map((table) => (
        <DoubleTableInstance
          key={table.id}
          id={table.id}
          initialPosition={table.position}
          view={view}
          onCopy={handleCopy}
          onRemove={handleRemove}
        />
      ))}
    </>
  );
};

export default DoubleTable; 