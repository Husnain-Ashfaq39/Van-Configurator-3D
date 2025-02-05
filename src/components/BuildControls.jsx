import React from 'react';
import { useProductStore } from '../store/productStore';
import { useBuildStore } from '../store/buildStore';
import toast from 'react-hot-toast';

const BuildControls = ({ cameraPosition, lookAt, view, fov, setCameraPosition, setLookAt, setView, setFov }) => {
  const vanProducts = useProductStore(state => state.vanProducts);
  const productInstances = useBuildStore(state => state.productInstances);

  const handleSaveBuild = () => {
    const buildData = {
      cameraConfig: { cameraPosition, lookAt, view, fov },
      vanProducts,
      productInstances,
    };
    localStorage.setItem('savedBuild', JSON.stringify(buildData));
    toast.success("Build saved successfully!");
  };

  const handleLoadBuild = () => {
    const savedData = localStorage.getItem('savedBuild');
    if (savedData) {
      const buildData = JSON.parse(savedData);
      // update camera config
      setCameraPosition(buildData.cameraConfig.cameraPosition);
      setLookAt(buildData.cameraConfig.lookAt);
      setView(buildData.cameraConfig.view);
      setFov(buildData.cameraConfig.fov);
      // update vanProducts in productStore
      const setVanProducts = useProductStore.getState().setVanProducts;
      setVanProducts(buildData.vanProducts);
      // Ensure loaded products are visible in the Van
      const setProductVisibility = useProductStore.getState().setProductVisibility;
      buildData.vanProducts.forEach(product => setProductVisibility(product.id, true));
      // update productInstances in buildStore
      const setLoadedProductInstances = useBuildStore.getState().setLoadedProductInstances;
      setLoadedProductInstances(buildData.productInstances);
      toast.success("Build loaded successfully!");
    } else {
      toast.error("No saved build found");
    }
  };

  return (
    <div className="fixed bottom-4 right-36 z-20 space-x-2">
      <button onClick={handleSaveBuild} className="px-4 py-2 bg-green-500 text-white rounded">Save Build</button>
      <button onClick={handleLoadBuild} className="px-4 py-2 bg-blue-500 text-white rounded">Load Build</button>
    </div>
  );
};

export default BuildControls;
