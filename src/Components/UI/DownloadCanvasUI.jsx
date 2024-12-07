import React, { useEffect } from 'react';

const DownloadCanvasUI = () => {


  
    function download(){
        const canvas = Array.from(document.getElementsByTagName("canvas"))[1]
        const link = document.createElement('a')
        link.setAttribute('download', 'glove-picture')
        link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
        link.click()
        console.log("Downlaod")
    }

  return (
    <div className="w-full flex justify-center items-center my-10">
      <button id="capture-btn" className="btn btn-active btn-neutral" onClick={()=>{download()}}>
        Download Image
      </button>
    </div>
  );
};

export default DownloadCanvasUI;
