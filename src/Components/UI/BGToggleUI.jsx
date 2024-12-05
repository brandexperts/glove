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
          type="checkbox"
          checked={isChecked} // Bind the checkbox state to `isChecked`
          onChange={toggleChecked} // Call `toggleChecked` when clicked
          className="sr-only peer"
        />
        <div className="peer ring-2 ring-gray-900 bg-gradient-to-r from-rose-400 to-red-900 rounded-xl outline-none duration-300 after:duration-500 w-20 h-8 shadow-inner peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900 shadow-gray-900 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-900 after:content-[''] after:rounded-2xl after:absolute after:outline-none after:h-12 after:w-12 after:bg-gray-50 after:-top-2 after:-left-2 after:flex after:justify-center after:items-center after:border-4 after:border-gray-900 peer-checked:after:translate-x-14">
        </div>
      </label>
    </div>
  );
};

export  {BGToggleUI, useStore};
