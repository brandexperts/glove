import React, { useEffect, useRef } from 'react';
import { Stage as KonvaStage, Layer, Text } from 'react-konva';
import { useTextConfig } from '../UI/TextInputUI';

const KonvaCanvas = () => {
  const { textInput, textColor, scale } = useTextConfig();
  const textRef = useRef(null);

  // Force update with a unique key when textColor changes
  const uniqueKey = `${textColor}-${scale}`;

  useEffect(() => {
    console.log('Text Color Updated:', textColor);
  }, [textColor]);

  return (
    <KonvaStage
      className="text-center absolute z-40 hidden bg-transparent"
      id="konva"
      width={400}
      height={400}
    >
      <Layer>
        <Text
          key={uniqueKey} // Force remount when key changes
          ref={textRef}
          text={textInput || ''}
          fontFamily="OE1Bold"
          fill={textColor || '#000'} // Update fill dynamically
          fontSize={38 + scale}
          draggable
          x={12}
          y={324}
          align="center"
          width={400}
          height={400}
          onDragMove={(e) => {
            console.log('Dragged to:', e.target.x(), e.target.y());
          }}
        />
      </Layer>
    </KonvaStage>
  );
};

export { KonvaCanvas };
