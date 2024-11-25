import { Environment, OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect } from 'react'
import Glove from '../Models/Glove'
import { ACESFilmicToneMapping } from 'three'
import { useConfigSteps } from '../UI/EditUI'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useControls } from 'leva'

const Experience = () => {


  return (
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



  }, [steps])

// const groundControls = useControls("Ground Controls" , {
//   scale : 1,
//   radius : 1,
//   height : 1,
// })


const ringModel = useGLTF("./models/cartoon_boxing_ring.glb")


  return (
    <>
      <Stage>
        <Glove />
      </Stage>


<group position={[0, -5.2, 0]} scale={0.5}>
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

      <OrbitControls minDistance={3} maxDistance={10} />
    </>
  )
}

export default Experience
