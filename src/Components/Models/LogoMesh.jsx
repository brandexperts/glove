import React, { useEffect, useRef } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useConfigSteps, useFistLogo } from "../UI/EditUI";
import { useDesignStore } from '../UI/PopularDesignUI';

export default function LogoMesh(props) {
  const { nodes, materials } = useGLTF('./models/logo_mesh.glb');
  const logoRef = useRef();
  const { src, setSrc } = useFistLogo();
  const { selectedDesign } = useDesignStore();
  const steps = useConfigSteps((state) => state.steps);

  // Load texture using useTexture with error fallback
  const logoTexture = useTexture(src || './color-options/boxing-logos/boxing_logo_color.png', (texture) => {
    texture.flipY = false;
    texture.needsUpdate = true;
  });

  // Handle texture loading errors
  useEffect(() => {
    if (!src) {
      console.warn('No source provided for logo texture. Using default texture.');
    }
  }, [src]);

  // Update the source when selected design changes
  useEffect(() => {
    if (selectedDesign?.backLogo) {
      setSrc(selectedDesign.backLogo);
    }
  }, [selectedDesign?.backLogo, setSrc]);

  // Apply texture to the mesh
  useEffect(() => {
    if (logoRef.current && logoTexture) {
      const material = logoRef.current.material;

      material.map = logoTexture;
      material.needsUpdate = true;

      // Cleanup function to remove texture
      return () => {
        material.map = null;
        material.needsUpdate = true;
      };
    }
  }, [logoTexture]);

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

// Preload the model outside the component for better performance
useGLTF.preload('./models/logo_mesh.glb');
