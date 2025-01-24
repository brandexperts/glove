import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { create } from "zustand";

// Create the Zustand store
const useTextConfig = create((set) => ({
  textInput: "", // Initial state for the text input
  setTextInput: (newText) => set({ textInput: newText }), // Function to update the text input
  scale: 0, // Initial scale (size)
  textColor : "#FFF",
  setTextColor: (newColor) => set({ textColor: newColor }), // Function to update the text input


  // Functions to increment and decrement scale
  increaseScale: () => set((state) => ({ scale: Math.min(14 ,state.scale + 2) })),
  decreaseScale: () => set((state) => ({ scale: Math.max(-6, state.scale - 2) })), // Prevent scale from going below 0.1
}));

const TextInputUI = () => {
  // Use the store hook to get and update the state
  const {
    textInput,
    setTextInput,
    increaseScale,
    decreaseScale,
    setTextColor
  } = useTextConfig();


const [showTextUI , setShowTextUI] = useState(false)


  return (
    <>

<div className="form-control my-4">
  <label className="label cursor-pointer">
    <span className="label-text">Add Text</span>
    <input type="checkbox" className="toggle"  onChange={(e)=>{setShowTextUI(e.target.checked)}} />
  </label>
</div>


{ showTextUI &&


      <div>
        <div className="w-full max-w-xs p-5 bg-white rounded-lg font-mono">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="unique-input"
            >
            Add Text
          </label>
          <input
            style={{
              fontFamily: "OE1Bold",
            }}
            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Enter text here"
            type="text"
            autoComplete="off"
            id="unique-input"
            value={textInput} // Bind the input value to the Zustand state
            onInput={(e) => setTextInput(e.target.value)} // Update the Zustand state on input change
            />
        </div>

        <div className="w-full flex flex-col gap-10  my-6">
    
          {/* Scale */}
          <div className="flex justify-around items-center">
            <div>Scale</div>
            <div className="flex gap-14">
              <div onClick={increaseScale} className=" cursor-pointer">
                <FaPlus color="#000" />
              </div>
              <div onClick={decreaseScale} className=" cursor-pointer">
                <FaMinus color="#000" />
              </div>
            </div>
          </div>
        </div>


        <div className="w-full flex flex-col gap-10  my-6">
    
          {/* Scale */}
          <div className="flex justify-around items-center">
            <div>Choose Color</div>
            <div className="flex gap-14">
          
          <input type="color" 
            onChange={(e) => setTextColor(e.target.value)} 
          />
          
            </div>
          </div>
        </div>





      </div>
          }
    </>
  );
};

export { TextInputUI, useTextConfig };
 