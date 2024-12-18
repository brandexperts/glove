import React, { useEffect, useRef } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useFistLogo, useConfigSteps} from "../UI/EditUI"
export default function LogoMesh(props) {
  const { nodes, materials } = useGLTF('./models/logo_mesh.glb');

  const logoRef = useRef(null);
  const steps = useConfigSteps((state)=> state.steps)
  const src = useFistLogo((state)=> state.src)



  const secondlogo = useTexture(src);

  
  useEffect(() => {
      if (logoRef.current && secondlogo) {
          // Ensure the texture is not flipped vertically
          secondlogo.flipY = false;
          secondlogo.needsUpdate = true;
          
          // Assign the texture to the material's map
          const material = logoRef.current.material;
          material.map = secondlogo;
          material.needsUpdate = true; // Ensure material updates

          
          // console.log(src)
    }
  }, [secondlogo, src]);

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
