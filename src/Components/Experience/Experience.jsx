import { Environment, OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect } from 'react'
import Glove from '../Models/Glove'
import { ACESFilmicToneMapping } from 'three'
import { useConfigSteps } from '../UI/EditUI'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useControls } from 'leva'
import LogoMesh from '../Models/LogoMesh'
import {KonvaCanvas} from './KonvaCanvas'
import { useStore } from '../UI/BGToggleUI'
const Experience = () => {


  return (
    <>

<KonvaCanvas/>

    <Canvas
      className="webgl-canvas"
      shadows
      gl={{
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1,
        logarithmicDepthBuffer: true,
        antialias : true,
      }}
      >
      <Scene />
    </Canvas>
      </>
  )
}

const Scene = () => {

  const steps = useConfigSteps((state) => state.steps)

  // useFrame((state) => {
  //   console.log(state.camera.position) // Access the camera here safely
  // })

  const scene = useThree()
const camera = scene.camera



  useEffect(()=>{

if (steps === 0) {
  gsap.to(camera.position, {
    x : 0.1463215900227963,
    y  : 1.1355854332999282,
    z : 2.772911054464297,
    duration : 0.3,
    ease: "back.out(2)",
  })
} else if (steps === 1) {
  gsap.to(camera.position, {
    x: -2.7614849528628094, y: 0.8646174875717527, z: -0.7916043552794885,
    duration : 0.3,
    ease: "back.out(2)",
  })
} else if(steps === 2){
  gsap.to(camera.position, {
    x: 0.04226162418145372, y: -0.5998061671447844, z: 2.9391234266319426,
    duration : 0.3,
    ease: "back.out(2)",
  })
} 
else if(steps === 3){
  gsap.to(camera.position, {
    x : 0.1463215900227963,
    y  : 0.7355854332999282,
    z : 2.772911054464297,
    duration : 0.3,
    ease: "back.out(2)",
  })
}

else if(steps === 4){
  gsap.to(camera.position, {
    x: 0.13619212680748027, y: -0.2150213966914702, z: -2.989183417517317,
    duration : 0.3,
    ease: "back.out(2)",
  })
}

else if(steps === 5){
  gsap.to(camera.position, {
    x: 1.93689052298686, y: -0.0768010096043191, z: -2.289663011643295,
    duration : 0.3,
    ease: "back.out(2)",
  })
}

else if(steps === 6){
  gsap.to(camera.position, {
    x: 1.1972580361020264, y: 0.5949852808588245, z: -2.6856220341944006,
    duration : 0.3,
    ease: "back.out(2)",
  })
}

else if(steps === 7){
  gsap.to(camera.position, {
    x: 0.4427808940390892, y: -0.5764321738938014, z: -2.910613514153683,
    duration : 0.3,
    ease: "back.out(2)",
  })
}

else if(steps === 8){
  gsap.to(camera.position, {
    x: 0.3649433112594433, y: 0.19623266149409252, z: -2.9712475231307516,
    duration : 0.3,
    ease: "back.out(2)",
  })
}



  }, [steps])


const ringModel = useGLTF("./models/cartoon_boxing_ring.glb")


const { isChecked } = useStore();

  return (
    <>
      <Stage>
        <Glove />
        <LogoMesh/>
      </Stage>


<group position={[0, -5.2, 0]} scale={0.5} visible={ isChecked }>
<primitive object={ringModel.scene}  />
</group>

      {/* <Environment files={"./textures/hdr/basement_boxing_ring_1k.hdr"}  background /> */}

      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <spotLight
        position={[0, 5, 5]}
        angle={Math.PI / 4}
        intensity={2}
        castShadow
      />
      <pointLight position={[0, 1, 0]} intensity={0.8} />

      <OrbitControls minDistance={1.9} maxDistance={5} maxPolarAngle={Math.PI / 2 + 0.23}/>
    </>
  )
}

export default Experience
