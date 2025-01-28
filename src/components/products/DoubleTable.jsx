import React from 'react';
import Product from './Product';

const DoubleTable = ({ view }) => (
  <Product
    view={view}
    modelPath="/Double_Table.glb"
    scale={[1, 1, 1]}
  />
);

export default DoubleTable;