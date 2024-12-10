import React, { useEffect, useRef } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useFistLogo, useConfigSteps } from "../UI/EditUI";
import { useDesignStore } from '../UI/PopularDesignUI';

export default function LogoMesh(props) {
  const { nodes, materials } = useGLTF('./models/logo_mesh.glb');

  const logoRef = useRef(null);
  const steps = useConfigSteps((state) => state.steps);
  
  // Get both src from useFistLogo and selectedDesign from useDesignStore
  const src = useFistLogo((state) => state.src);
  const { selectedDesign } = useDesignStore();

  // Determine which texture to use, prioritizing backLogo over src
  const textureToUse = selectedDesign?.backLogo || src;

  // Load texture using useTexture hook
  const logoTexture = textureToUse ? useTexture(textureToUse) : null;

  useEffect(() => {
    if (logoRef.current && logoTexture) {
      // Ensure the texture is not flipped vertically
      logoTexture.flipY = false;
      logoTexture.needsUpdate = true;
      
      // Assign the texture to the material's map
      const material = logoRef.current.material;
      material.map = logoTexture;
      material.needsUpdate = true; // Ensure material updates
    }
  }, [logoTexture, src, selectedDesign?.backLogo]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        ref={logoRef}
        geometry={nodes.logomesh.geometry}
        material={materials.Palm}
        position={[-0.008, 0.562, 0.496]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('./models/logo_mesh.glb');