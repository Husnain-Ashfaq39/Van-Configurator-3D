import React from 'react';
import Product from './Product';

const FullBed = ({ view }) => (
  <Product
    view={view}
    modelPath="/Full-Bed.glb"
    scale={[0.57, 0.57, 0.57]}
  />
);

export default FullBed;
