import React from 'react';
import Product from './Product';

const SlidingDrawer = ({ view }) => (
  <Product
    view={view}
    modelPath="/Sliding_Drawer.glb"
    scale={[0.35, 0.35, 0.35]}
  />
);

export default SlidingDrawer;
