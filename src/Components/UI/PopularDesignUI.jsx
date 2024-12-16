import React, { useState, createContext, useContext } from 'react';
import { create } from 'zustand';

const useDesignStore = create((set) => ({
    selectedDesign: null,
    setSelectedDesign: (design) => set({ selectedDesign: design }),
  }));

  const PopularDesignUI = () => {


const NegroClasico = "./color-options/boxing-logos/boxing_logo.png"
const BlancoClasico = "./color-options/boxing-logos/boxing_logo_white.png"
const VivaMexico = "./color-options/boxing-logos/boxing_logo_color.png"

  

    // Sample design options
    const designOptions = [
      {
        Name: "First",
        img : "/color-options/popular-designs/blue_all.png",
        fist: { metalic: true, color: "#0072CE" },
        frontThumb: { metalic: true, color: "#0072CE" },
        wristColor: { metalic: true, color: "#0072CE" },
        internalPalm: { metalic: true, color: "#0072CE" },
        innerThumb: { metalic: true, color: "#0072CE" },
        insideThumbCover: { metalic: true, color: "#0072CE" },
        trim: { metalic: true, color: "#0072CE" },
        laces: { metalic: true, color: "#0072CE" },
        backLogo : VivaMexico
      },
      {
        Name: "Second", // Name 
        img : "/color-options/popular-designs/red.png", // Thumbnail Image
        fist: { metalic: false, color: "red" }, // Fist Color
        frontThumb: { metalic: false, color: "red" }, // Front Thumb Color
        wristColor: { metalic: false, color: "red" }, // Wrist Color
        internalPalm: { metalic: false, color: "red" }, // internal Palm and Wrist Color
        innerThumb: { metalic: false, color: "red" }, //Inside Part Of Thumb Color
        insideThumbCover: { metalic: false, color: "red" }, // Inner Thumb Cover Color
        trim: { metalic: false, color: "red" }, //Trim Color 
        laces: { metalic: false, color: "red" }, // Laces Color
        backLogo : NegroClasico
      },
      {
        Name: "Third", // Name 
        img : "/color-options/popular-designs/gold.png", // Thumbnail Image
        fist: { metalic: true, color: "#D4AF37" }, // Fist Color
        frontThumb: { metalic: true, color: "#D4AF37" }, // Front Thumb Color
        wristColor: { metalic: true, color: "#D4AF37" }, // Wrist Color
        internalPalm: { metalic: true, color: "#D4AF37" }, // internal Palm and Wrist Color
        innerThumb: { metalic: true, color: "#D4AF37" }, //Inside Part Of Thumb Color
        insideThumbCover: { metalic: true, color: "#D4AF37" }, // Inner Thumb Cover Color
        trim: { metalic: true, color: "#D4AF37" }, //Trim Color 
        laces: { metalic: false, color: "gold" }, // Laces Color
        backLogo : VivaMexico // Back Logo
      },



  
    ];
  
    // Use Zustand store
    const setSelectedDesign = useDesignStore((state) => state.setSelectedDesign);
  
    return (
      <div className="drawer overflow-hidden">
        <input id="my-drawer-popular" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side overflow-auto">
          <label htmlFor="my-drawer-popular" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-auto p-4">
            <div className="font-bold text-2xl text-center mb-4">Select Design</div>
            
            {designOptions.map((design, index) => (
              <li key={index}>
                <button 
                 
                 >
                  <div
                  onClick={() => setSelectedDesign(design)}
                  >
                    <img className='w-60' src={design.img} alt="" />
                  </div>
             
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export  {PopularDesignUI, useDesignStore};