import React, { useEffect, useMemo, useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { Color, MeshStandardMaterial } from 'three';
import { create } from 'zustand';
import { useMaterialStore, useConfigSteps, useClosureStore } from "../UI/EditUI"
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
  const {  nodes: velcroNodes } = useGLTF('./models/velcro_mesh.glb')


  const {selectedDesign} = useDesignStore()
  const {   selectedClosure,   } = useClosureStore();



  
  const normalMap = useTexture("./textures/nleather5.png")
  const palmbackNormal = useTexture("./textures/nleather5.png")
  
  const { textInput, position, scale, textColor } = useTextConfig();
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
  
  const colorToName = (color, isMetallic) => {
    // Define the color mappings
    const colorMappings = {
      Matte: [
        { name: "Aqua", color: "aqua" },
        { name: "Beige", color: "beige" },
        { name: "Black", color: "black" },
        { name: "Blue", color: "blue" },
        { name: "Brown", color: "brown" },
        { name: "Gray", color: "gray" },
        { name: "Green", color: "green" },
        { name: "Gold", color: "gold" },
        { name: "Orange", color: "orange" },
        { name: "Purple", color: "purple" },
        { name: "Red", color: "red" },
        { name: "Royal Blue", color: "royalblue" },
        { name: "White", color: "white" }
      ],
      Metallic: [
        { name: "Metallic Blue", color: "#0072CE" },
        { name: "Metallic Aqua", color: "#00B3C0" },
        { name: "Metallic Fuchsia", color: "#CB1476" },
        { name: "Metallic Gold", color: "#D4AF37" },
        { name: "Metallic Silver", color: "#C0C0C0" },
        { name: "Metallic Green", color: "#01C764" },
        { name: "Metallic Red", color: "#EB1F00" },
        { name: "Metallic Purple", color: "#800080" },
        { name: "Metallic Champagne", color: "#FACEB4" }
      ]
    };
  
    // Convert the input color to a string
    let colorString = '';
    
    // Handle THREE.Color objects
    if (color && typeof color.getHexString === 'function') {
      // For matte colors, convert hex to standard color name
      if (!isMetallic) {
        // Get basic color value from hex
        const hex = '#' + color.getHexString();
        // Match with nearest basic color
        return findClosestBasicColor(hex, colorMappings.Matte);
      } else {
        colorString = '#' + color.getHexString();
      }
    }
    // Handle hex strings
    else if (typeof color === 'string') {
      colorString = color;
    }
    // Handle other cases
    else if (color && color.color) {
      colorString = color.color;
    }
    else {
      return "Unknown Color";
    }
  
    // Determine which color set to use
    const colorSet = isMetallic ? colorMappings.Metallic : colorMappings.Matte;
  
    // Find the matching color
    const matchingColor = colorSet.find(c => 
      c.color.toLowerCase() === colorString.toLowerCase()
    );
  
    return matchingColor ? matchingColor.name : "Unknown Color";
  };
  
  // Helper function to find the closest basic color
  function findClosestBasicColor(hex, matteColors) {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    // Simple color mapping for basic colors
    const basicColors = {
      "aqua": [0, 255, 255],
      "beige": [245, 245, 220],
      "black": [0, 0, 0],
      "blue": [0, 0, 255],
      "brown": [165, 42, 42],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "gold": [255, 215, 0],
      "orange": [255, 165, 0],
      "purple": [128, 0, 128],
      "red": [255, 0, 0],
      "royalblue": [65, 105, 225],
      "white": [255, 255, 255]
    };
  
    let closestColor = null;
    let closestDistance = Infinity;
  
    // Find the closest basic color
    for (const [colorName, [r2, g2, b2]] of Object.entries(basicColors)) {
      const distance = Math.sqrt(
        Math.pow(r - r2, 2) + 
        Math.pow(g - g2, 2) + 
        Math.pow(b - b2, 2)
      );
  
      if (distance < closestDistance) {
        closestDistance = distance;
        closestColor = colorName;
      }
    }
  
    // Find the matching color name from matteColors
    const matchingColor = matteColors.find(c => 
      c.color.toLowerCase() === closestColor.toLowerCase()
    );
  
    return matchingColor ? matchingColor.name : "Unknown Color";
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


        console.log(colorToName(currentColor, isMetallic))

        updateGlovePart(partName,  colorToName(currentColor, isMetallic), isMetallic ? 'Metallic' : 'Matte')
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

            if (color == "black") {
              mfc.color = new Color("#3d3d3d")
            } else {
              mfc.color = new Color(color)
            }

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
  
  

// Modified useEffect
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
      
      if (MadeForChampionsRef.current) {
        
        if (selectedDesign.wristColor.color === "black") {
          MadeForChampionsRef.current.material.color = new Color("#2a2a2e");
          MadeForChampionsRef.current.material.metalness = 0.5;
          MadeForChampionsRef.current.material.roughness = 0.9;
        } else {
          MadeForChampionsRef.current.material.color = new Color(selectedDesign.wristColor.color);
          MadeForChampionsRef.current.material.metalness = 0.5;
          MadeForChampionsRef.current.material.roughness = 0.9;

}


      }


      // Use the design object's color directly
      const colorName = colorToName(design.color, design.metalic);
      updateGlovePart(name, colorName, design.metalic ? 'Metallic' : 'Matte');
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
}, [ textInput, textColor, scale]);

 




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


{/* Strap  */}

<mesh
        castShadow
        receiveShadow
        visible={selectedClosure === "laces" ? false : true}
        geometry={velcroNodes.strap.geometry}
        material={wristbackMat}
        position={[0.689, -1.028, 0.066]}
        rotation={[0, 0, -Math.PI / 2]}
      />



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
        geometry={selectedClosure === "laces" ? nodes.piping.geometry : velcroNodes.piping.geometry}
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
  geometry={selectedClosure === "laces" ? nodes.Mesh_15.geometry : velcroNodes.palm.geometry}
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
        visible={selectedClosure === "laces" ? true : false}
        ref={lacesRef}
        position={[0.01, -0.76, -0.201]}
      />
      <mesh
        castShadow
        receiveShadow
        visible={selectedClosure === "laces" ? true : false}
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
        position={ selectedClosure === "laces" ?  [0.008, -0.942, 0.559] : [0.008, -0.958, 0.59]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.564}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials.Flag}
        position={ selectedClosure === "laces" ?  [0.018, -1.431, 0.373] : [0.018, -1.422, 0.416]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.786}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials['HECHO EN MEXICO']}
        position={selectedClosure === "laces" ?  [0.018, -1.431, 0.373] : [0.018, -1.422, 0.39]}
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
useGLTF.preload('./models/velcro_mesh.glb')


export {Glove , useGlovePartsStore}