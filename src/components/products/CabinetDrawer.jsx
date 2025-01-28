// src/components/CabinetDrawer.jsx
import React from 'react';
import Product from './Product';

const CabinetDrawer = ({ view }) => (
  <Product
    view={view}
    modelPath="/Cabinet_Drawer.glb"
    scale={[1, 1, 1]}
  />
);

export default CabinetDrawer;
