import React from 'react';
import Product from './Product';

const Bunk = ({ view }) => (
  <Product
    view={view}
    modelPath="/Bunk.glb"
    scale={[0.4, 0.4, 0.4]}
  />
);

export default Bunk;