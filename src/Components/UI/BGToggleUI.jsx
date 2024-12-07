import React from 'react';
import { create } from 'zustand';

const useStore = create((set) => ({
    isChecked: true, // Initial state for the toggle
    toggleChecked: () => set((state) => ({ isChecked: !state.isChecked })),
  }));


const BGToggleUI = () => {
  const { isChecked, toggleChecked } = useStore(); // Access state and toggle function from Zustand store

  return (
    <div className='absolute top-2 lg:top-auto lg:top-0 right-1 lg:right-8 lg:bottom-8 flex flex-col justify-center items-center'>
      {/* Label for the toggle */}
      <p className="mb-2 text-xl text-center font-semibold text-gray-400">Toggle Background</p>
      
      <label className="relative inline-flex items-center cursor-pointer">
   

        <input
        checked={isChecked} 
        onChange={toggleChecked}
        type="checkbox" class="toggle toggle-lg" />
      </label>
    </div>
  );
};

export  {BGToggleUI, useStore};
