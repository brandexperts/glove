import React, { useEffect, useRef, useState } from 'react';
import { create } from 'zustand';
import { useSelectionStore } from './PaddingAndOuncesUI';
import html2canvas from 'html2canvas-pro';
import { useGlovePartsStore } from '../Models/Glove';



const useTakeImage = create((set) => ({
  take1: false,
  take2: false,
  setTake1: (status) => set({ take1: status }),
  setTake2: (status) => set({ take2: status }),
}));





const DownloadCanvasUI = () => {


  const gloveParts = useGlovePartsStore((state) => state.gloveParts);

  const captureEl = useRef();

  const downloadResult = () => {
    if (captureEl.current) {
      html2canvas(captureEl.current , {
        scale: 3, // Increase scale for higher resolution (3x original size)
        useCORS: true, // Allow cross-origin images
      })
        .then((canvas) => {
          const dataURL = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = dataURL;
          link.download = 'captured-image.png'; // Set filename
          link.click(); // Trigger download
        })
        .catch((err) => {
          console.error('Error capturing the canvas:', err);
        });
    } else {
      console.error('captureEl is not defined');
    }
  };




  const { setTake1, setTake2 } = useTakeImage();

  const [imageOne , setImageOne] = useState(null)
  const [imageTwo , setImageTwo] = useState(null)


  function download() {
    setTake1(true);
  
    setTimeout(() => {
      const canvas = Array.from(document.getElementsByTagName("canvas"))[1]
      const canvasRender1 = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      setImageOne(canvasRender1); 
  

      setTake2(true);
  
      setTimeout(() => {
        const canvasRender2 = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        setImageTwo(canvasRender2); 
      }, 100);  
    }, 100);  
  
    console.log("Download started");
  }


  const { paddingSelection, ouncesSelection } = useSelectionStore();


  return (
    <>
    
    {/* <div className="w-full flex justify-center items-center my-10">
      <button id="capture-btn" className="btn btn-active btn-neutral" onClick={()=>{}}>
        Download Image
      </button>
    </div> */}

{/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn my-8" onClick={()=>{
  document.getElementById('my_modal_3').showModal()
  download()
  }} >See Final Result</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box w-11/12 flex flex-col justify-center items-center">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>


{/* Download Image Selection  */}




<div ref={captureEl} 
className=' w-full h-auto'
>

<div className=' flex justify-evenly items-center'>
  <div className=' text-sm text-slate-800 font-semibold '>
    Ounces : {ouncesSelection}
  </div>
  <div className=' text-sm text-slate-800 font-semibold '>
    Padding : {paddingSelection}
  </div>
</div>

    <div  className=''>
   <img src={imageOne} alt=""  width={1000} />
   <img src={imageTwo} alt=""  width={1000} />
    </div>


    <div className="p-4 bg-gray-100 rounded-md shadow-sm">
  <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
    Glove Customization Details
  </h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
    {gloveParts.map((part) => (
      <div
        key={part.name}
        className="bg-white rounded-md shadow-sm p-2 border border-gray-200 hover:shadow transition-shadow duration-300"
      >
        <div className="font-semibold text-gray-700 mb-1 text-sm">
          {part.name}
        </div>
        <div
          className="mb-1 p-1 rounded text-center text-xs font-medium"
          style={{
            backgroundColor: part.color,
            color: part.color === '#000000' ? 'white' : 'black',
          }}
        >
          {part.color}
        </div>
        <div
          className={`px-2 py-0.5 rounded-full text-xs text-center font-medium ${
            part.finish === 'Metallic'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {part.finish}
        </div>
      </div>
    ))}
  </div>
</div>




</div>


{/* Download ////////// */}

<button class="btn btn-neutral my-3" onClick={()=>{
  downloadResult()
}}>Download</button>



  </div>
</dialog>


    </>
  );
};

export  {DownloadCanvasUI , useTakeImage};
