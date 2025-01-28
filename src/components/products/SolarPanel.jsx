// src/components/SolarPanel.jsx
import React from 'react';
import Product from './Product';

const SolarPanel = ({ view }) => (
  <Product
    view={view}
    modelPath="/solar_panel.glb"
    scale={[0.003, 0.003, 0.003]}
  />
);

export default SolarPanel;
