import React, { useState, createContext, useContext } from 'react';
import { create } from 'zustand';

const useDesignStore = create((set) => ({
    selectedDesign: null,
    setSelectedDesign: (design) => set({ selectedDesign: design }),
  }));

  const PopularDesignUI = () => {
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
        backLogo : ""
      },
      {
        Name: "Second",
        img : "/color-options/popular-designs/red.png",
        fist: { metalic: false, color: "red" },
        frontThumb: { metalic: false, color: "red" },
        wristColor: { metalic: false, color: "red" },
        internalPalm: { metalic: false, color: "red" },
        innerThumb: { metalic: false, color: "#FF5733" },
        insideThumbCover: { metalic: false, color: "red" },
        trim: { metalic: false, color: "red" },
        laces: { metalic: false, color: "red" },
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