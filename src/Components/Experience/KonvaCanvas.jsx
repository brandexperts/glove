import React from 'react'
import { Stage as KonvaStage, Layer, Rect, Text } from 'react-konva'
import { useTextConfig } from '../UI/TextInputUI'

const KonvaCanvas = () => {
  const { textInput, position, scale } = useTextConfig();

  return (
    <>
      <KonvaStage
        className="text-center absolute z-40  hidden  bg-transparent"
        id="konva"
        width={400}
        height={400}
      >


{/* 220 349 */}

        <Layer>

        {/* <Rect draggable fill={"red"} width={400} height={400}/> */}

          <Text
            text={textInput}
            fontFamily="OE1Bold"
            fill={"#FFF"}
            fontSize={38 + scale}
            draggable
            x={220 + (scale *0.7)} // Center horizontally (400 / 2)
            y={349} // Center vertically (400 / 2)
            offsetX={(textInput.length * (30 + scale)) / 2} // Adjust based on text length and font size
            offsetY={((38 + scale) / 2)} // Adjust for the height of the text (fontSize + scale)
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
