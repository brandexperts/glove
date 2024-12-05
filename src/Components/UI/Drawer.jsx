import React from 'react';
import { useConfigSteps } from './EditUI'; // Assuming EditUI contains the Zustand store

const Drawer = () => {
  const content = [
    {
      step: 0,
      title: "First Color",
      selection: "Select Color",
      img: "./color-options/steps/st1.jpg",
    },
    {
      step: 1,
      title: "Front Thumb Color",
      selection: "Select Color",
      img: "./color-options/steps/st2.jpg",
    },
    {
      step: 2,
      title: "Wrist Color",
      selection: "Select Color",
      img: "./color-options/steps/st3.jpg",
    },
    {
      step: 3,
      title: "First Logo",
      selection: "Select Logo",
      img: "./color-options/steps/st1.jpg",
    },
    {
      step: 4,
      title: "Internal Palm and Wrist",
      selection: "Select Color",
      img: "./color-options/steps/st5.jpg",
    },
    {
      step: 5,
      title: "Inside Part of Thumb",
      selection: "Select Color",
      img: "./color-options/steps/st6.jpg",
    },
    {
      step: 6,
      title: "Inner Thumb Cover",
      selection: "Select Color",
      img: "./color-options/steps/st6.jpg",
    },
    {
      step: 7,
      title: "Trim",
      selection: "Select Color",
      img: "./color-options/steps/st7.jpg",
    },
    {
      step: 8,
      title: "Laces Color",
      selection: "Select Color",
      img: "./color-options/steps/st7.jpg",
    },
    {
      step: 9,
      title: "First Text",
      selection: "Add Text",
      img: "./color-options/steps/st7.jpg",
    },
  ];

  const { steps, setSteps } = useConfigSteps(); // Use steps from the Zustand store and setSteps function

  // Function to handle step change when clicking an item
  const handleStepChange = (stepValue) => {
    setSteps(stepValue); // Update the steps state
    document.getElementById('my-drawer').checked = false; // Close the drawer
  };

  return (
    <>
  <div className="drawer overflow-hidden">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-side overflow-auto"> {/* Allow scrolling in the sidebar */}
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-auto p-4">
      <div className="font-bold text-2xl text-center">Select Area</div>
      {/* Sidebar content */}
      {content.map((item) => (
        <li
          key={item.step}
          onClick={() => handleStepChange(item.step)} // Handle the click to update the step
          className={`mb-4 flex items-center justify-between p-2 cursor-pointer ${
            steps === item.step ? 'bg-gray-200' : ''
          }`}
        >
          <div className="w-full flex justify-between">
            <img src={item.img} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.selection}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>

    </>
  );
};

export default Drawer;
