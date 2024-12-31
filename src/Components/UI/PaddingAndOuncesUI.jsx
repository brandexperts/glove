import React from 'react';
import { create } from 'zustand';

const useSelectionStore = create((set) => ({
    paddingSelection: 'Dual ProLatX', // Default value
    ouncesSelection: '12 Oz', // Default value
  
    setPaddingSelection: (value) => set({ paddingSelection: value }),
    setOuncesSelection: (value) => set({ ouncesSelection: value }),
  }));


const PaddingUI = () => {
  const { paddingSelection, setPaddingSelection } = useSelectionStore();

  const handlePaddingChange = (value) => {
    setPaddingSelection(value);
  };

  return (
    <div className="my-6 flex flex-col gap-6">
      <div className="form-control">
        <label className="label cursor-pointer">
          
        <div className=' flex  gap-2 just-center items-center '>

<img className='  w-20' src="/color-options/steps/st7.jpg" alt="" />

          <span className="text-sm  text-gray-400 font-semibold">Dual ProLatX</span>
</div>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-blue-500"
            defaultChecked={paddingSelection === 'Dual ProLatX'}
            onChange={() => handlePaddingChange('Dual ProLatX')}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
<div className=' flex gap-2  just-center items-center '>

<img className='  w-20' src="/color-options/steps/st7.jpg" alt="" />

          <span className="text-sm  text-gray-400 font-semibold">Dual ProLatX + Horse Hair</span>
</div>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-blue-500"
            defaultChecked={paddingSelection === 'Dual ProLatX + Horse Hair'}
            onChange={() => handlePaddingChange('Dual ProLatX + Horse Hair')}
          />
        </label>
      </div>
    </div>
  );
};

const OuncesUI = () => {
  const { ouncesSelection, setOuncesSelection } = useSelectionStore();

  const handleOuncesChange = (value) => {
    setOuncesSelection(value);
  };

  const options = ['8 Oz', '10 Oz', '12 Oz', '14 Oz', '16 Oz', '18 Oz'];

  return (
    <div className="form-control flex">
      {options.map((option) => (
        <label key={option} className="label cursor-pointer">
          <span className="text-lg font-semibold">{option}</span>
          <input
            type="radio"
            name="radio-11"
            className="radio checked:bg-blue-500"
            defaultChecked={ouncesSelection === option}
            onChange={() => handleOuncesChange(option)}
          />
        </label>
      ))}
    </div>
  );
};

export { PaddingUI, OuncesUI , useSelectionStore};
