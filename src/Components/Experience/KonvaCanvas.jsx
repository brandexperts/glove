import Konva from 'konva'
import React, { useEffect, useState } from 'react'
import { Stage as KonvaStage, Layer, Rect, Text } from 'react-konva'
import { useConfigSteps, useMaterialStore } from '../UI/EditUI'
import { create } from 'zustand'
import { useTextConfig } from '../UI/TextInputUI'



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
  const steps = useConfigSteps((state)=> state.steps)
  let color = useMaterialStore((state)=> state.color)
  const { canvasColor, setCanvasColor } = useCanvasColor();
  const { textInput ,
    position,
    scale,
    } = useTextConfig();

useEffect(()=>{
  if (steps === 0) { 
    setCanvasColor(color)
  }
},[color ])

useEffect(()=>{
console.log(scale,position)
}, [scale , position])

  return (


    <>
<KonvaStage
    className=" text-center absolute z-40 hidden "
    id="konva"
    
    width={400}
    height={400}
>
<Layer >

<Rect draggable fill={canvasColor} width={400} height={400}/>

<Text
  text={textInput}
  fontFamily="OE1Bold"
  fill={"#FFF"}
  fontSize={38 + scale}
  draggable
  x={220 + position} // Center horizontally (400 / 2)
  y={200} // Center vertically (400 / 2)
  offsetX={(textInput.length * (30 + scale)) / 2} // Adjust based on text length and font size
  offsetY={((18 + scale) / 2) - 135} // Adjust based on font size
  onDragMove={(e) => {
    console.log(e.target.x(), e.target.y());
  }}
/>


</Layer>

</KonvaStage>
 </>
  )
}

export  {KonvaCanvas , useCanvasColor}
