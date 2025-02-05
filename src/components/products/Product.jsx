import React, { useState } from 'react';
import ProductInstance from '../instances/ProductInstance';
import { v4 as uuidv4 } from 'uuid';
import { useProductStore } from '../../store/productStore';

const Product = ({ view, modelPath, scale, initialPosition, dimensions, vanBounds, yAxisMove }) => {
  const [instances, setInstances] = useState([{ 
    id: uuidv4(), 
    position: initialPosition
  }]);

  const { vanProducts, addProductToVan, removeProductFromVan } = useProductStore();
  console.log("vanProducts: " + JSON.stringify(vanProducts));
  

  const handleCopy = (id, currentPosition) => {
    setInstances((prev) => {
      const toCopy = prev.find(item => item.id === id);
      if (!toCopy) return prev;
      const newPosition = [currentPosition[0] + 1, currentPosition[1], currentPosition[2]];
      const product = vanProducts.find(p => p.modelPath === modelPath);
      if (product) {
        addProductToVan({ ...product, quantity: product.quantity + 1 });
      }
      return [...prev, { id: uuidv4(), position: newPosition }];
    });
  };

  const handleRemove = (id) => {
    const product = vanProducts.find(p => p.modelPath === modelPath);
      if (product) {
        removeProductFromVan({ ...product, quantity: product.quantity - 1 });
      }
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
          dimensions={dimensions}
          vanBounds={vanBounds}
          yAxisMove={yAxisMove}
        />
      ))}
    </>
  );
};

export default Product;