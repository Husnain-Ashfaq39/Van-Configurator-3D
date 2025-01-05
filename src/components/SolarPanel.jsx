import React, { useState } from 'react';
import SolarPanelInstance from './instances/SolarPanelInstance'; // Create a separate instance component
import { v4 as uuidv4 } from 'uuid';

const SolarPanel = ({ view }) => {
  const [solarPanels, setSolarPanels] = useState([{ id: uuidv4(), position: [0, 1.3, 0] }]);

  const handleCopy = (id, currentPosition) => {
    setSolarPanels((prevSolarPanels) => {
      const solarPanelToCopy = prevSolarPanels.find((panel) => panel.id === id);
      if (!solarPanelToCopy) return prevSolarPanels;

      const newPosition = [currentPosition[0] + 1, currentPosition[1], currentPosition[2]];
      return [...prevSolarPanels, { id: uuidv4(), position: newPosition }];
    });
  };

  const handleRemove = (id) => {
    setSolarPanels((prevPanels) => prevPanels.filter((panel) => panel.id !== id));
  };

  return (
    <>
      {solarPanels.map((panel) => (
        <SolarPanelInstance
          key={panel.id}
          id={panel.id}
          initialPosition={panel.position}
          view={view}
          onCopy={handleCopy}
          onRemove={handleRemove}
        />
      ))}
    </>
  );
};

export default SolarPanel;
