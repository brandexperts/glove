import React, { useState } from "react";
import { create } from "zustand";
import MadeForChampionsUI from "./MadeForChampionsUI";
import { BGToggleUI } from "./BGToggleUI";
import {TextInputUI} from "./TextInputUI";
import DownloadCanvasUI from "./DownloadCanvasUI";

// Zustand stores
const useConfigSteps = create((set) => ({
  steps: 0,
  increaseSteps: () =>
    set((state) => {
      if (state.steps < 10) {  // Set a max limit for the steps, for example 10
        return { steps: state.steps + 1 };
      }
      return state; // No change if steps are already 10
    }),
  decreaseSteps: () =>
    set((state) => {
      if (state.steps > 0) {  // Prevent going below step 0
        return { steps: state.steps - 1 };
      }
      return state; // No change if steps are already 0
    }),
  setSteps: (newSteps) =>
    set(() => ({
      steps: newSteps,
    })),
}));



const useMaterialStore = create((set) => ({
  color: "white", // Default color
  isMetallic: false, // Default metallic property
  setColor: (color) => set({ color }),
  setMetallic: (isMetallic) => set({ isMetallic }),
}));

const useFistLogo = create((set) => ({
  src: "./color-options/boxing-logos/boxing_logo_white.png",
  setSrc: (src) => set({ src }),
}));



const EditUI = () => {
  const [isMetallic, setIsMetallic] = useState(true); // Toggle Metallic/Matte
  const { src, setSrc } = useFistLogo(); // Access Zustand store
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
    {
      step: 4,
      title: "Fist Logo",
      selection: "Select Logo",
      img: "./color-options/steps/st1.jpg",
    },
    {
      step: 5,
      title: "Internal Palm and Wrist",
      selection: "Select Color",
      img: "./color-options/steps/st5.jpg",
    },
    {
      step: 6,
      title: "Inside Part of Thumb",
      selection: "Select Color",
      img: "./color-options/steps/st6.jpg",
    },
    {
      step: 7,
      title: "Inner Thumb Cover",
      selection: "Select Color",
      img: "./color-options/steps/st6.jpg",
    },
    {
      step: 8,
      title: "Trim",
      selection: "Select Color",
      img: "./color-options/steps/st7.jpg",
    },
    {
      step: 9,
      title: "Laces Color",
      selection: "Select Color",
      img: "./color-options/steps/st7.jpg",
    },
    {
      step: 10,
      title: "Fist Text",
      selection: "Add Text",
      img: "./color-options/steps/st7.jpg",
    },
    {
      step: 11,
      title: "Download Image",
      selection: "",
      img: "./color-options/steps/download_icon.png",
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


  const logosContent = [
    {
      name : "Negro Clasico",
      src : "./color-options/boxing-logos/boxing_logo.png"
    },
    {
      name : "Blanco Clasico",
      src : "./color-options/boxing-logos/boxing_logo_white.png"
    },
    {
      name : "Viva Mexico",
      src : "./color-options/boxing-logos/boxing_logo_color.png"
    },
  ]






  const handleColorClick = (color, isMetallic) => {
    setColor(color);
    setMetallic(isMetallic);
  };


  const handleSrcClick = (logoSrc) => {
    setSrc(logoSrc); // Update Zustand state
    console.log(logoSrc);
  };

  return (
    <>

    <div className="customize w-[full] lg:w-[25rem] h-max lg:h-auto lg:left-3 lg:top-1/2 lg:-translate-y-1/2 relative lg:absolute  bg-[#ffffff] flex flex-col justify-between rounded-lg lg:shadow-md p-4  transition-all">
      {/* Glove Details Header */}
      <div className="flex gap-2 justify-between items-center">


{/* <Drawer Button */}

<div>
<label className="btn btn-circle swap swap-rotate" htmlFor='my-drawer'>
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" />

  {/* hamburger icon */}
  <svg
    className="swap-off fill-current"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 512 512">
    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
  </svg>

  {/* close icon */}
  <svg
    className="swap-on fill-current"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 512 512">
    <polygon
      points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
  </svg>
</label>
    </div>


        <div className="text-center mb-4">
          <div className="text-xl font-bold  text-black">
            {content[steps].title}
          </div>
          <div className="text-sm text-gray-500 font-semibold">
            {content[steps].selection}
          </div>
        </div>
        <div className="w-20 h-20 rounded-md">
          <img src={content[steps].img} alt="" />
        </div>
      </div>




{steps === 3 && (
  <div className="flex justify-evenly py-10  rounded-xl items-center">
    <div className=" h-auto w-full  flex justify-evenly py-8 bg-gray-300 rounded-md">


    {logosContent.map((logo, index) => (
      <img
      key={index}
      className="w-24 cursor-pointer"
      src={logo.src}
      onClick={() => handleSrcClick(logo.src)}
      alt={`Logo ${index}`}
      />
    ))}
    </div>
  </div>
)}

 


{steps !== 3 && steps !== 9 && steps !== 10  && steps!==8 && (
  <div className="flex items-center justify-between ">

    <div className="flex flex-col gap-2 w-full ml-4">
      <div className="flex justify-evenly my-3 text-sm">
        <button
          className={`px-2 py-1 w-1/2 shadow-lg  border text-lg font-semibold rounded-sm ${
            isMetallic ? "text-white bg-black"  : "text-gray-500"
          }`}
          onClick={() => setIsMetallic(true)}
        >
          METALLIC
        </button>
        <button
          className={`px-2 py-1 w-1/2 shadow-lg border text-lg font-semibold rounded-sm ${
            !isMetallic ? "text-white bg-black": "text-gray-500"
          }`}
          onClick={() => setIsMetallic(false)}
        >
          MATTE
        </button>
      </div>

 
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
)}


{steps === 8 &&

<div className=" flex w-full justify-around my-10">

<div className=" flex flex-col justify-center items-center">

<div
            className="w-9 h-9 border cursor-pointer bg-slate-100 shadow-xl"
            onClick={() => handleColorClick( "white" , false)}
            ></div>
            <div className=" text-slate-800 font-semibold text-lg">White</div>
            </div>
            <div className=" flex flex-col justify-center items-center">

<div
            className="w-9 h-9 border cursor-pointer bg-gray-900 shadow-xl"
            onClick={() => handleColorClick( "black" , false)}
            ></div>
            <div className=" text-slate-800 font-semibold text-lg">black</div>
            </div>


            </div>
          }



{steps === 9 && <TextInputUI />}
{steps === 10 && <DownloadCanvasUI />}




      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">

        {/* <button class="btn btn-active"  onClick={() => useConfigSteps.getState().decreaseSteps()}>Prev</button> */}
        <button className="btn btn-active " onClick={() => useConfigSteps.getState().decreaseSteps()}> Prev</button>
      
      
{steps !== 10 &&
        <button className="btn btn-active btn-neutral text-white"  onClick={() => increaseSteps()} >Next</button>
}
      </div>
    </div>
          <BGToggleUI/>

          </>
  );
};

export {EditUI , useMaterialStore , useConfigSteps, useFistLogo}