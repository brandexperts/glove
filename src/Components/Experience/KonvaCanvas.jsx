import Konva from 'konva'
import React, { useEffect, useState } from 'react'
import { Stage as KonvaStage, Layer, Rect, Text } from 'react-konva'
import { useMaterialStore } from '../UI/EditUI'
import { create } from 'zustand'



const useCanvasColor = create((set) => ({
  canvasColor: "#ffffff",
  setCanvasColor: (color) =>
    set((state) => {
      if (state.onColorChange) state.onColorChange(color); // Trigger callback if present
      return { canvasColor: color };
    }),
  onColorChange: null, // Callback for external hooks like Three.js
  setOnColorChange: (callback) => set({ onColorChange: callback }),
}));



const KonvaCanvas = () => {
  
  let color = useMaterialStore((state)=> state.color)
  const { canvasColor, setCanvasColor } = useCanvasColor();




  return (


    <>
<KonvaStage
    className=" text-center absolute z-40  hidden"
    id="konva"
    
    width={400}
    height={400}
>
<Layer >

<Rect draggable fill={canvasColor} width={400} height={400}/>

{/* <Image
 y={380}
 x={140}
 width={400}
 height={133}
 image={image}
 /> */}

<Text text='HUNK' fill={"#FFF"} fontSize={38} offsetX={107.6 / 2} draggable x={150} y={337} onDragMove={(e)=>{
  console.log(e)
}} />

</Layer>

</KonvaStage>
 </>
  )
}

export  {KonvaCanvas , useCanvasColor}
