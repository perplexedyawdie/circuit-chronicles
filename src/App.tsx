import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import titleLogo from './assets/title.png'
import './App.css'
import Globe from './components/Globe'
import CircuitContext from './context/CircuitContext'
import CircuitData from './components/CircuitData'

function App() {
  const [count, setCount] = useState(0)
  const [currentCircuit, setCurrentCircuit] = useState<number>(0)

  useEffect(() => {
    console.log(currentCircuit, " current circuit")
  }, [currentCircuit])
  
  return (
    <CircuitContext.Provider value={{ data: { currentCircuit, setCurrentCircuit } }}>
      <div className="hero min-h-screen bg-base-200 items-start">
        <div className="hero-content w-full flex-col space-y-10">
          <img src={titleLogo} alt="Logo" className="object-contain" />
          <div className="flex flex-col items-center w-full space-y-8">
            <div className="w-full flex flex-col justify-center items-center">
              <Globe />
            </div>
            <div className="w-full">
              <CircuitData />
            </div>
          </div>
        </div>
      </div>
    </CircuitContext.Provider>
  )
}

export default App
