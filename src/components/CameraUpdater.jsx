import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const CameraUpdater = ({ cameraPosition, cameraLookAt }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...cameraPosition);
    camera.lookAt(...cameraLookAt);
    camera.updateProjectionMatrix();
  }, [cameraPosition, cameraLookAt, camera]);

  return null;
};

export default CameraUpdater;

