import React, { useState } from 'react';
import ProductInstance from '../instances/ProductInstance';
import { v4 as uuidv4 } from 'uuid';

const Product = ({ view, modelPath, scale }) => {
  const [instances, setInstances] = useState([{ id: uuidv4(), position: [0, -0.8, 0] }]);

  const handleCopy = (id, currentPosition) => {
    setInstances((prev) => {
      const toCopy = prev.find(item => item.id === id);
      if (!toCopy) return prev;
      const newPosition = [currentPosition[0] + 1, currentPosition[1], currentPosition[2]];
      return [...prev, { id: uuidv4(), position: newPosition }];
    });
  };

  const handleRemove = (id) => {
    setInstances(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      {instances.map((instance) => (
        <ProductInstance
          key={instance.id}
          id={instance.id}
          initialPosition={instance.position}
          view={view}
          onCopy={handleCopy}
          onRemove={handleRemove}
          modelPath={modelPath}
          scale={scale}
        />
      ))}
    </>
  );
};

export default Product;