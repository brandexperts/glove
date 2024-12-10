import { useState } from 'react'
import {Experience} from './Components/Experience/Experience'
import UI from './Components/UI/UI'
import './App.css'
import LoadingScreen from './Components/UI/LoadingScreen'
function App() {

  return (
    <>

<LoadingScreen/>
    
<Experience/>

<UI/>

    </>
  )
}

export default App
