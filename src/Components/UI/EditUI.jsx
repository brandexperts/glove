import React, { useState } from "react";
import { create } from "zustand";

// Zustand stores
const useConfigSteps = create((set) => ({
  steps: 0,
  increaseSteps: () =>
    set((state) => {
      if ( state.steps <= 1) {
        return { steps: state.steps + 1 };
      }
      return state; // No change
    }),
  decreaseSteps: () =>
    set((state) => {
      if (state.steps >0 ) {
        return { steps: state.steps - 1 };
      }
      return state; // No change
    }),
}));


const useMaterialStore = create((set) => ({
  color: "white", // Default color
  isMetallic: false, // Default metallic property
  setColor: (color) => set({ color }),
  setMetallic: (isMetallic) => set({ isMetallic }),
}));



const EditUI = () => {
  const [isMetallic, setIsMetallic] = useState(true); // Toggle Metallic/Matte
  const steps = useConfigSteps((state) => state.steps);
  const increaseSteps = useConfigSteps((state) => state.increaseSteps);
  const { setColor, setMetallic } = useMaterialStore();
 

  const content = [
    {
      step: 1,
      title: "Fist Color",
      selection: "Select Color",
      img: "./color-options/steps/st1.jpg",
    },
    {
      step: 2,
      title: "Front Thumb Color",
      selection: "Select Color",
      img: "./color-options/steps/st2.jpg",
    },
    {
      step: 3,
      title: "Wrist Color",
      selection: "Select Color",
      img: "./color-options/steps/st3.jpg",
    },
  ];

  const colors = [
    {
      Matte: [
        { name: "aqua", color: "aqua", isMetallic: false },
        { name: "beige", color: "beige", isMetallic: false },
        { name: "black", color: "black", isMetallic: false },
        { name: "blue", color: "blue", isMetallic: false },
        { name: "brown", color: "brown", isMetallic: false },
        { name: "gray", color: "gray", isMetallic: false },
        { name: "green", color: "green", isMetallic: false },
        { name: "gold", color: "gold", isMetallic: false },
        { name: "orange", color: "orange", isMetallic: false },
        { name: "purple", color: "purple", isMetallic: false },
        { name: "red", color: "red", isMetallic: false },
        { name: "royalblue", color: "royalblue", isMetallic: false },
        { name: "white", color: "white", isMetallic: false },
      ],
      Metallic: [
        { name: "Metallic Blue", color: "#0072CE", isMetallic: true, src: "./color-options/metallic/C1.png" },
        { name: "Metallic Aqua", color: "#00B3C0", isMetallic: true, src: "./color-options/metallic/C2.png" },
        { name: "Metallic Fuchsia", color: "#CB1476", isMetallic: true, src: "./color-options/metallic/C3.png" },
        { name: "Metallic Gold", color: "#D4AF37", isMetallic: true, src: "./color-options/metallic/C4.png" },
        { name: "Metallic Silver", color: "#C0C0C0", isMetallic: true, src: "./color-options/metallic/C5.png" },
        { name: "Metallic Green", color: "#01C764", isMetallic: true, src: "./color-options/metallic/C6.png" },
        { name: "Metallic Red", color: "#EB1F00", isMetallic: true, src: "./color-options/metallic/C7.png" },
        { name: "Metallic Purple", color: "#800080", isMetallic: true, src: "./color-options/metallic/C8.png" },
        { name: "Metallic Champagne", color: "#FACEB4", isMetallic: true, src: "./color-options/metallic/C9.png" },
      ],
    },
  ];

  const handleColorClick = (color, isMetallic) => {
    setColor(color);
    setMetallic(isMetallic);



  };

  return (
    <div className="customize w-[25rem] h-[20rem] absolute left-6 top-1/2 -translate-y-1/2 bg-[#ffffff] rounded-lg shadow-md p-4">
      {/* Glove Details Header */}
      <div className="flex gap-2 justify-center items-center">
        <div className="text-center mb-4">
          <div className="text-lg font-bold font-serif text-slate-600">
            {content[steps].title}
          </div>
          <div className="text-sm text-green-500 font-semibold">
            {content[steps].selection}
          </div>
        </div>
        <div className="w-20 h-20 rounded-md">
          <img src={content[steps].img} alt="" />
        </div>
      </div>

      {/* Color Options */}
      <div className="flex items-center justify-between">
        {/* Color Tabs */}
        <div className="flex flex-col gap-2 w-full ml-4">
          <div className="flex justify-evenly my-3 text-sm">
            <button
              className={`px-2 py-1 w-1/2 shadow-lg bg-white border text-lg font-semibold rounded-sm ${
                isMetallic ? "text-blue-600" : "text-gray-500"
              }`}
              onClick={() => setIsMetallic(true)}
            >
              METALLIC
            </button>
            <button
              className={`px-2 py-1 w-1/2 shadow-lg bg-white border text-lg font-semibold rounded-sm ${
                !isMetallic ? "text-blue-600" : "text-gray-500"
              }`}
             
              onClick={() => setIsMetallic(false)}
            >
              MATTE
            </button>
          </div>

          {/* Swatches */}
          <div className={`flex flex-wrap gap-1 ${isMetallic ? "metallic-options" : "matte-options"}`}>
            {colors[0][isMetallic ? "Metallic" : "Matte"].map((color, index) => (
              <div
                key={index}
                className="w-9 h-9 shadow-lg border cursor-pointer"
                style={{
                  backgroundColor: isMetallic ? undefined : color.color,
                  backgroundImage: isMetallic ? `url(${color.src})` : undefined,
                }}
                onClick={() => handleColorClick(color.color, color.isMetallic)}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          id="gprev"
          onClick={() => useConfigSteps.getState().decreaseSteps()}
        >
          Back
        </button>
        <button
          className=""
          id="gnext"
          onClick={() => increaseSteps()}
         
        >
          Next
        </button>
      </div>
    </div>
  );
};

export {EditUI , useMaterialStore , useConfigSteps}