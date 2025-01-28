// src/components/Washroom.jsx
import React from 'react';
import Product from './Product';

const Washroom = ({ view }) => (
  <Product
    view={view}
    modelPath="/washroom2.glb"
    scale={[0.85, 0.85, 0.85]}
  />
);

export default Washroom;
