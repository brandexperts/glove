import React, { useEffect, useMemo, useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { Color, MeshStandardMaterial } from 'three';
import { create } from 'zustand';
import { useMaterialStore, useConfigSteps } from "../UI/EditUI"
import * as THREE from "three"
import { useTextConfig } from '../UI/TextInputUI';
import { useDesignStore } from '../UI/PopularDesignUI';

// Integrated Zustand Store
const useGlovePartsStore = create((set) => ({
  gloveParts: [
    { name: 'Fist', color: '#ffffff', finish: 'Matte' },
    { name: 'Thumb', color: '#ffffff', finish: 'Matte' },
    { name: 'Wrist', color: '#ffffff', finish: 'Matte' },
    { name: 'Palm Wrist', color: '#ffffff', finish: 'Matte' },
    { name: 'Inside Thumb', color: '#ffffff', finish: 'Matte' },
    { name: 'Thumb Connect', color: '#ffffff', finish: 'Matte' },
    { name: 'Trim', color: '#ffffff', finish: 'Matte' },
    { name: 'Laces', color: '#ffffff', finish: 'Matte' },
  ],
  updateGlovePart: (name, color, finish) => set((state) => ({
    gloveParts: state.gloveParts.map(part => 
      part.name === name ? { ...part, color, finish } : part
    )
  })),
  resetGloveParts: () => set({
    gloveParts: [
      { name: 'Fist', color: '#ffffff', finish: 'Matte' },
      { name: 'Thumb', color: '#ffffff', finish: 'Matte' },
      { name: 'Wrist', color: '#ffffff', finish: 'Matte' },
      { name: 'Palm Wrist', color: '#ffffff', finish: 'Matte' },
      { name: 'Inside Thumb', color: '#ffffff', finish: 'Matte' },
      { name: 'Thumb Connect', color: '#ffffff', finish: 'Matte' },
      { name: 'Trim', color: '#ffffff', finish: 'Matte' },
      { name: 'Laces', color: '#ffffff', finish: 'Matte' },
    ]
  })
}));

  function Glove(props) {
  const { nodes, materials } = useGLTF('./models/glove_text_test-v2.glb')


  const {selectedDesign} = useDesignStore()
  
  
  const normalMap = useTexture("./textures/nleather5.png")
  const palmbackNormal = useTexture("./textures/nleather5.png")
  
  const { textInput, position, scale } = useTextConfig();
  const steps = useConfigSteps((state) => state.steps)
  const color = useMaterialStore((state) => state.color)
  const isMetallic = useMaterialStore((state) => state.isMetallic)
  
  // Get the updateGlovePart function from the store
  const updateGlovePart = useGlovePartsStore((state) => state.updateGlovePart)
  
  // Refs for different parts of the glove
  const fistRef = useRef()
  const thumbRef = useRef()
  const wristRef = useRef()
  const PalmWristRef = useRef()
  const insideThumbRef = useRef()
  const trimRef = useRef()
  const lacesRef = useRef()
  const thumbConnectRef = useRef()
  const MadeForChampionsRef = useRef()
  
  // Convert Color to hex string
  const colorToHex = (color) => {
    return '#' + color.getHexString()
  }
  
  // Effect to update materials and store when color or metallic state changes
  useEffect(() => {
    palmbackNormal.wrapS = THREE.RepeatWrapping;
    palmbackNormal.WrapT = THREE.RepeatWrapping;
    palmbackNormal.needsUpdate = true;
    const updateMaterial = (ref, partName) => {
      if (ref.current) {
        const currentColor = new Color(color)
        ref.current.material.color = currentColor
        ref.current.material.roughness = isMetallic ? 0.2 : 0.4
        ref.current.material.metalness = isMetallic ? 0.8 : 0.0
        
        // Update store with current part details
        updateGlovePart(partName, colorToHex(currentColor), isMetallic ? 'Metallic' : 'Matte')
      }
    }
    
    // Update materials based on current step and apply to store
    
    // Mapping of steps to specific parts and their refs
    const stepMaterialMap = {
      0: { ref: fistRef, name: 'Fist' },
      1: { ref: thumbRef, name: 'Thumb' },
      2: { 
        refs: [
          { ref: wristRef, name: 'Wrist' },
          { ref: MadeForChampionsRef, name: 'Wrist', custom: (ref) => {
            const mfc = ref.current.material
            mfc.color = new Color(color)
            mfc.metalness = 0.5
            mfc.roughness = 0.9
          }}
        ]
      },
      4: { ref: PalmWristRef, name: 'Palm Wrist' },
      5: { ref: insideThumbRef, name: 'Inside Thumb' },
      6: { ref: thumbConnectRef, name: 'Thumb Connect' },
      7: { ref: trimRef, name: 'Trim' },
      8: { ref: lacesRef, name: 'Laces' }
    }
    
    const currentStepConfig = stepMaterialMap[steps]
    
    if (currentStepConfig) {
      if (currentStepConfig.refs) {
        // Handle multiple refs for a step
        currentStepConfig.refs.forEach(item => {
          if (item.custom) {
            item.custom(item.ref)
          } else {
            updateMaterial(item.ref, item.name)
          }
        })
      } else if (currentStepConfig.ref) {
        // Handle single ref
        updateMaterial(currentStepConfig.ref, currentStepConfig.name)
      }
    }
  }, [color , isMetallic , selectedDesign])
  
  

  useEffect(() => {
    if (!selectedDesign) return;
  
    const refs = [
      { ref: fistRef, name: 'Fist', design: selectedDesign.fist },
      { ref: thumbRef, name: 'Thumb', design: selectedDesign.frontThumb },
      { ref: wristRef, name: 'Wrist', design: selectedDesign.wristColor },
      { ref: PalmWristRef, name: 'Palm Wrist', design: selectedDesign.internalPalm },
      { ref: insideThumbRef, name: 'Inside Thumb', design: selectedDesign.innerThumb },
      { ref: thumbConnectRef, name: 'Thumb Connect', design: selectedDesign.insideThumbCover },
      { ref: trimRef, name: 'Trim', design: selectedDesign.trim },
      { ref: lacesRef, name: 'Laces', design: selectedDesign.laces },
    ];
  
    refs.forEach(({ ref, name, design }) => {
      if (ref.current && design) {
        const { color, metalic } = design;
        ref.current.material.color.set(color);
        ref.current.material.roughness = metalic ? 0.2 : 0.4;
        ref.current.material.metalness = metalic ? 0.8 : 0.0;
        
        MadeForChampionsRef.current.material.color = new Color(selectedDesign.wristColor.color)
        MadeForChampionsRef.current.material.metalness = 0.5
        MadeForChampionsRef.current.material.roughness = 0.9
  
        // Pass the correct arguments: name, color, and finish
        updateGlovePart(name, color, metalic ? 'Metallic' : 'Matte')
      }
    });
  }, [selectedDesign]);




let canvas = Array.from(document.getElementsByTagName("canvas"))[0],
ctx,
texture;

// console.log(canvas)

ctx = canvas.getContext("2d");
ctx.globalCompositeOperation = 'source-over';
texture = new THREE.CanvasTexture(ctx.canvas);
texture.flipY = false;
texture.format = THREE.RGBAFormat
texture.colorSpace = THREE.SRGBColorSpace





// Memoized material to avoid unnecessary re-creations
const palmbackMat = useMemo(() => {
  return new MeshStandardMaterial({
    normalMap: normalMap,
  });  
}, [normalMap]);  

 
const textAreaMat = useMemo(() => {
  return new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,  // Enable transparency
    opacity: 1.0,       // You can adjust this if you want partial transparency
  });
}, [ textInput, position, scale]);

 




const thumboutMat = useMemo(() => {
  return new MeshStandardMaterial({
    normalMap: normalMap,
  });
}, [normalMap]);

const wristbackMat = useMemo(() => {
  return new MeshStandardMaterial({
    normalMap: normalMap,
  });
}, [normalMap]);


const PalmWristMat = useMemo(() => {
  return new MeshStandardMaterial({
    normalMap: normalMap,
  });
}, [normalMap]);

const insideThumbMat = useMemo(() => {
  return new MeshStandardMaterial({
    normalMap: normalMap,
  });
}, [normalMap]);


const trimMat = useMemo(() => {
  return new MeshStandardMaterial({
    normalMap: normalMap,
  });
}, [normalMap]);

const lacesMat = useMemo(() => {
  return new MeshStandardMaterial({
    normalMap: normalMap,
  });
}, [normalMap]);


const thumbConnectMat = useMemo(() => {
  return new MeshStandardMaterial({
    normalMap: normalMap,
  });
}, [normalMap]);





  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.black.geometry}
        material={materials['Material.001']}
        position={[0.004, -0.57, 0.137]}
      >
        
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.palmback.geometry}
        material={palmbackMat}
        ref={fistRef}
        position={[0, 0.141, 0.173]}
      >
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wristback.geometry}
        material={wristbackMat}
        position={[0, 0.141, 0.173]}
        ref={wristRef}
      >
        {/* <meshStandardMaterial normalMap={normalMap} /> */}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.piping.geometry}
        material={trimMat}
        ref={trimRef}
        position={[0.002, -0.601, 0.1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.stitches.geometry}
        material={materials['Material.014']}
        position={[-0.013, -0.153, -0.017]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tstrip.geometry}
        material={thumbConnectMat}
        position={[0, 0, 0.209]}
      />
      <group position={[0, 0.097, 0.173]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_15.geometry}
          ref={PalmWristRef}
          material={PalmWristMat}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_15_1.geometry}
          material={materials.Holes}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.connect.geometry}
        material={thumbConnectMat}
        ref={thumbConnectRef}
        position={[-0.621, 1.295, -0.279]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.thumbin.geometry}
        material={insideThumbMat}
        ref={insideThumbRef}
        position={[-0.426, 0.593, -0.2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.thumbout.geometry}
        material={thumboutMat}
        position={[-0.799, 0.327, 0.173]}
        ref={thumbRef}
      >
         {/* <meshStandardMaterial normalMap={normalMap} /> */}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lace_left.geometry}
        material={lacesMat}
        ref={lacesRef}
        position={[0.01, -0.76, -0.201]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lace_right.geometry}
        material={lacesMat}
        position={[0.01, -0.76, -0.201]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.madeforchampions.geometry}
        material={materials.Champ}
        ref={MadeForChampionsRef}
        position={[0.008, -0.942, 0.559]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.564}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials.Flag}
        position={[0.018, -1.431, 0.373]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.786}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials['HECHO EN MEXICO']}
        position={[0.018, -1.431, 0.363]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.334, 0.648, 0.067]}
      />

<mesh
        castShadow
        receiveShadow
        geometry={nodes.textarea.geometry}
        material={textAreaMat}
        position={[0, 0.141, 0.178]}
      />

    </group>
  )
}

useGLTF.preload('./models/glove_text_test-v2.glb')


export {Glove , useGlovePartsStore}