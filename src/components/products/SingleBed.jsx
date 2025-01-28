import React from 'react';
import Product from './Product';

const SingleBed = ({ view }) => (
  <Product
    view={view}
    modelPath="/Simple-Bed.glb"
    scale={[1.09,1.09, 1.09]} // Adjust scale as needed
  />
);

export default SingleBed; 