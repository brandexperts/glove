import React from 'react'
import { Stage as KonvaStage, Layer, Text } from 'react-konva'
import { useTextConfig } from '../UI/TextInputUI'

const KonvaCanvas = () => {
  const { textInput, position, scale } = useTextConfig();

  return (
    <>
      <KonvaStage
        className="text-center absolute z-40 hidden bg-transparent"
        id="konva"
        width={400}
        height={400}
      >
        <Layer>
          <Text
            text={textInput}
            fontFamily="OE1Bold"
            fill={"#FFF"}
            fontSize={38 + scale}
            draggable
            x={12} 
            y={324} 
            align='center'
            width={400}
            height={400}
            onDragMove={(e) => {
              console.log(e.target.x(), e.target.y());
            }}
          />
        </Layer>
      </KonvaStage>
    </>
  );
};

export { KonvaCanvas }