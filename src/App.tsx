import { useState } from 'react'
import reactLogo from './assets/react.svg'
import titleLogo from './assets/title.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="hero min-h-screen bg-base-200 items-start">
      <div className="hero-content w-full flex-col space-y-10">
        <img src={titleLogo} alt="Logo" />
        <div className="flex flex-row justify-center w-full">
          <div className="max-w-md px-12">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
          <div className="max-w-md px-12">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
