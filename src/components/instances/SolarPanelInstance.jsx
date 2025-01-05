import React, { useMemo, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import useDraggable from '../../hooks/useDraggable';
import RotateButton from '../RotateButton';
import useHighlightOnDrag from '../../hooks/useHighlightOnDrag';

const SolarPanelInstance = ({ id, initialPosition, view, onCopy }) => {
  const { scene } = useGLTF('/solar_panel.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const [position, setPosition] = useState(initialPosition);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [showRotateButton, setShowRotateButton] = useState(false);

  const VAN_BOUNDS = { x: [-0.3, 0.3], z: [-2, 0] };

  const { bind, isDragging } = useDraggable(position, VAN_BOUNDS, (newX, newZ) => {
    setPosition([newX, position[1], newZ]);
  });

  useHighlightOnDrag(clonedScene, isDragging);

  const handleRotate = () => setRotation(([x, y, z]) => [x, y + Math.PI / 2, z]);

  return (
    <>
      <primitive
        object={clonedScene}
        position={position}
        rotation={rotation}
        scale={[0.003, 0.003, 0.003]}
        onDoubleClick={() => setShowRotateButton(true)}
        {...(view !== 'default' ? bind() : {})}
      />
      {showRotateButton && view !== 'default' && (
        <RotateButton
          position={position}
          onRotate={handleRotate}
          onCopy={() => onCopy(id, position)}
          onClose={() => setShowRotateButton(false)}
        />
      )}
    </>
  );
};

export default SolarPanelInstance;
