import { useProgress } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'



const LoadingScreen = () => {

    const { active, progress, errors, item, loaded, total } = useProgress()

    const loadingRef = useRef()

useEffect(()=>{

    if (loaded === 18) {
        loadingRef.current.style.display ="none"
    }

    console.log(loaded)

} , [loaded])

  return (
    <div ref={loadingRef}  className=' absolute z-50 w-screen h-screen flex flex-col  justify-center items-center gap-12 bg-slate-100'>
      
<div >
    <img className='w-96' src="./color-options/boxing-logos/boxing_logo_color.png" alt="" />
</div>

<progress className="progress w-56" value={progress} max="100"></progress>

<div className=' font-bold text-slate-900 text-2xl'>Loading Your Configurator...</div>

    </div>
  )
}

export default LoadingScreen
